import {
  buildFrame,
  parseFrame,
  validateFrame,
} from '../protocol/frame.js';
import {
  ComandosPABX,
  getCommandNameFromEnum,
} from '../protocol/comandos.enum.js';
import { InfoRespostaPABX } from '../protocol/info-resposta.enum.js';
import { logger } from '../logger.js';
import {
  cenarioAcessoPorteiro,
  cenarioAcessoSenha,
  cenarioAlarme,
  cenarioAlerta,
  cenarioLigacao,
  cenarioReceberProgramacoes,
  PassoCenario,
} from './scenarios.js';
import {
  getCaminhoReplay,
  getConfigRecebimento,
  getModeloSimulado,
  getRespostaEnvio,
} from './runtime.js';
import { cenarioReplayCaptura } from './replay.js';
import { aplicarEfe } from './prog-estado.js';

type PushFrame = (frameBytes: number[]) => void;

/** De quanto em quanto tempo a central simulada emite um quadro de relógio. */
const AMBIENT_CLOCK_MS = 10_000;

const AUTOPLAY_PADRAO_MS = 25_000;

/**
 * O "cérebro" da central simulada. Puro: não conhece stream, porta serial nem
 * IPC — só recebe os bytes que o CTI mandou e devolve frames pela função
 * `push`. Toda a decisão de "o que a central responde" mora aqui.
 *
 * Os frames são montados com `buildFrame` (protocol/frame.ts), que já calcula
 * LEN e CRC igual ao firmware — os mesmos frames "golden" cobertos por
 * frame.test.ts.
 */
export class CentralSimulator {
  private readonly push: PushFrame;

  private clockTimer?: NodeJS.Timeout;
  private autoplayTimer?: NodeJS.Timeout;
  private readonly timers = new Set<NodeJS.Timeout>();
  private running = false;

  constructor(push: PushFrame) {
    this.push = push;
  }

  start(): void {
    if (this.running) {
      return;
    }
    this.running = true;

    // A central real está sempre "conversando": manda a capacidade de enlaces
    // e o relógio sem o CTI pedir. Isso mantém o watchdog do CTI satisfeito.
    this.push(buildFrame(ComandosPABX.INFO_ENLACES, [20]));
    this.enviarDataHora();
    this.clockTimer = setInterval(
      () => this.enviarDataHora(),
      AMBIENT_CLOCK_MS
    );

    this.configurarAutoplay();
    logger.info(
      '[SIM][CENTRAL] Central simulada iniciada (relógio a cada ' +
        `${AMBIENT_CLOCK_MS / 1000}s).`
    );
  }

  stop(): void {
    this.running = false;
    if (this.clockTimer) {
      clearInterval(this.clockTimer);
      this.clockTimer = undefined;
    }
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
    for (const t of this.timers) {
      clearTimeout(t);
    }
    this.timers.clear();
  }

  /** Bytes que o CTI enviou pela "serial". */
  onBytesFromCti(bytes: number[]): void {
    const erro = validateFrame(bytes);
    if (erro) {
      logger.warn(
        `[SIM][CENTRAL] Frame recebido do CTI é inválido (${erro}): ${hex(bytes)}`
      );
      return;
    }

    const frame = parseFrame(bytes);
    logger.info(
      `[SIM][CENTRAL] <- ${getCommandNameFromEnum(frame.command)} ` +
        `(0x${frame.command.toString(16)})`
    );
    this.responder(frame.command, frame.data);
  }

  // -------------------------------------------------------------------------
  // Cenários acionáveis pelo painel de controle (control-server.ts)
  // -------------------------------------------------------------------------

  simularLigacao(
    origemFixo = 201,
    destinoFixo = 204,
    atende = true,
    duracaoSeg = 5
  ): void {
    this.executarCenario(
      cenarioLigacao(origemFixo, destinoFixo, atende, duracaoSeg),
      `ligação ${origemFixo} -> ${destinoFixo} ` +
        `(${atende ? 'atendida' : 'não atendida'}, ${duracaoSeg}s)`
    );
  }

  simularAcessoPorteiro(porteiroFixo = 200, ramalFixo = 205): void {
    this.executarCenario(
      cenarioAcessoPorteiro(porteiroFixo, ramalFixo),
      `acesso pelo porteiro ${porteiroFixo} (ramal ${ramalFixo})`
    );
  }

  simularAcessoSenha(porteiroFixo = 200, ramalFixo = 205): void {
    this.executarCenario(
      cenarioAcessoSenha(porteiroFixo, ramalFixo),
      `acesso com senha correta no porteiro ${porteiroFixo} (ramal ${ramalFixo})`
    );
  }

  simularAlerta(zonaFixo = 205, ativado = true): void {
    this.executarCenario(
      cenarioAlerta(zonaFixo, ativado),
      `alerta ${ativado ? 'ativado' : 'desativado'} na zona ${zonaFixo}`
    );
  }

  simularAlarme(zonaFixo = 205, disparado = true): void {
    this.executarCenario(
      cenarioAlarme(zonaFixo, disparado),
      `alarme ${disparado ? 'disparado' : 'normalizado'} na zona ${zonaFixo}`
    );
  }

  // -------------------------------------------------------------------------
  // Respostas a comandos do CTI
  // -------------------------------------------------------------------------

  private responder(cmd: number, data: number[] = []): void {
    switch (cmd) {
      case ComandosPABX.CONECTA_PABX:
        this.responderEm(30, this.frameIdentificacao());
        break;

      case ComandosPABX.INFO_INSTALACAO: {
        // Ecoa de volta o Código/Ramal que o CTI mandou (sentinelas
        // 0xFF/0xFFFF na primeira conexão). NUNCA inventa valores próprios:
        // se inventasse, o CTI2 os persistiria e, ao conectar depois numa
        // central REAL, mandaria esse lixo e levaria RES_NOK.
        const eco = data.length >= 3 ? data.slice(0, 3) : [0xff, 0xff, 0xff];
        this.responderEm(30, buildFrame(ComandosPABX.INFO_INSTALA_TDI, eco));
        break;
      }

      case ComandosPABX.INFO_DATAHORA:
      case ComandosPABX.ACIONA_PORTEIRO:
      case ComandosPABX.FINALIZA_CHAMADA:
      case ComandosPABX.SOL_VOICE_MAIL:
        this.responderEm(20, this.frameResposta(InfoRespostaPABX.RES_OK));
        break;

      // "Enviar programações": a resposta é configurável pelo painel
      // (ok / nok / timeout) para exercitar os fluxos de erro/pendência.
      case ComandosPABX.EFE_PROGRAMACAO:
      case ComandosPABX.EFE_PROG_RML: {
        const modo = getRespostaEnvio();
        if (modo === 'timeout') {
          logger.info('[SIM][CENTRAL] EFE_* — sem resposta (simulando timeout)');
          break;
        }
        if (modo === 'nok') {
          this.responderEm(20, this.frameResposta(InfoRespostaPABX.RES_NOK));
          break;
        }
        // RES_OK: a central "aplicou" — guarda o efeito para o próximo Receber
        // (data[0] = tipo de programação; o resto é o miolo BCD).
        aplicarEfe(data[0], data.slice(1));
        this.responderEm(20, this.frameResposta(InfoRespostaPABX.RES_OK));
        break;
      }

      case ComandosPABX.SOL_PROGRAMACAO: {
        this.responderEm(20, this.frameResposta(InfoRespostaPABX.RES_OK));
        // 1º: replay de uma captura real, se configurada e legível.
        // 2º (fallback): o dump sintético configurável pelo painel.
        const replay = getCaminhoReplay();
        const passos = replay ? cenarioReplayCaptura(replay) : null;
        if (passos) {
          this.executarCenario(passos, `receber (replay de ${replay})`);
        } else {
          this.executarCenario(
            cenarioReceberProgramacoes(getConfigRecebimento()),
            'receber programações (dump sintético)'
          );
        }
        break;
      }

      default:
        logger.debug(
          `[SIM][CENTRAL] Sem resposta programada para 0x${cmd.toString(16)} ` +
            '— ignorado.'
        );
    }
  }

  private executarCenario(passos: PassoCenario[], nome: string): void {
    if (!this.running) {
      logger.warn(
        `[SIM][CENTRAL] Cenário "${nome}" ignorado — central simulada parada.`
      );
      return;
    }
    logger.info(`[SIM][CENTRAL] Executando cenário: ${nome}`);
    for (const passo of passos) {
      this.responderEm(passo.emMs, passo.frame);
    }
  }

  private frameResposta(status: InfoRespostaPABX): number[] {
    return buildFrame(ComandosPABX.INFO_RESPOSTA, [status]);
  }

  /**
   * Quadro RES_IDENTIF (0x81). Layout lido por
   * `CommandConectaPABX.decodeIdentifResponse` — precisa de pelo menos 19
   * bytes e do byte 11 (ctiSuportado) diferente de zero para o CTI seguir com
   * o handshake de instalação.
   */
  private frameIdentificacao(): number[] {
    const modelo = getModeloSimulado().byte;
    const data = new Array<number>(15).fill(0);
    data[0] = modelo; // view[3]  modelo antigo (usado se versão nível 1 < 2)
    data[1] = 2; // view[4]  versão nível 1 >= 2 => usa o "modelo novo" (view[12])
    data[2] = 20; // view[5]  versão nível 2
    data[8] = 1; // view[11] ctiSuportado
    data[9] = modelo; // view[12] modelo novo
    return buildFrame(ComandosPABX.RES_IDENTIF, data);
  }

  private enviarDataHora(): void {
    const now = new Date();
    this.push(
      buildFrame(ComandosPABX.INFO_DATAHORA, [
        now.getDate(),
        now.getMonth() + 1,
        now.getFullYear() % 100,
        now.getDay() + 1,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
      ])
    );
  }

  private responderEm(ms: number, frame: number[]): void {
    const t = setTimeout(() => {
      this.timers.delete(t);
      if (this.running) {
        this.push(frame);
      }
    }, ms);
    this.timers.add(t);
  }

  private configurarAutoplay(): void {
    const alvo = (process.env.CENTRIX_SIM_AUTOPLAY ?? '').trim().toLowerCase();
    if (!alvo) {
      return;
    }
    const intervalo =
      Number(process.env.CENTRIX_SIM_AUTOPLAY_MS) || AUTOPLAY_PADRAO_MS;
    logger.info(
      `[SIM][CENTRAL] Autoplay "${alvo}" a cada ${intervalo}ms.`
    );
    this.autoplayTimer = setInterval(() => {
      if (alvo.includes('ligacao')) {
        this.simularLigacao();
      }
      if (alvo.includes('acesso')) {
        this.simularAcessoPorteiro();
      }
    }, intervalo);
  }
}

function hex(bytes: number[]): string {
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join(' ');
}
