import { buildFrame, parseFrame, validateFrame, } from '../protocol/frame.js';
import { ComandosPABX, getCommandNameFromEnum, } from '../protocol/comandos.enum.js';
import { InfoRespostaPABX } from '../protocol/info-resposta.enum.js';
import { CentraisHDL } from '../protocol/centrais.enum.js';
import { logger } from '../logger.js';
import { cenarioAcessoPorteiro, cenarioAcessoSenha, cenarioAcionamentoFechadura, cenarioAlarme, cenarioAlerta, cenarioLigacao, cenarioReceberProgramacoes, cenarioReceberReal, frameLigacaoConversa, frameLigacaoDesliga, frameLigacaoToca, } from './scenarios.js';
import { getRamalOverrides } from './prog-estado.js';
import { RES_IDENTIF_HDL32P, STATUS_HEARTBEAT_HDL32P, } from './capturas-reais.js';
import { getCaminhoReplay, getChamadaAtiva, getConfigRecebimento, getModeloSimulado, getRespostaEnvio, setChamadaAtiva, } from './runtime.js';
import { cenarioReplayCaptura } from './replay.js';
import { aplicarEfe } from './prog-estado.js';
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
    push;
    clockTimer;
    autoplayTimer;
    timers = new Set();
    running = false;
    constructor(push) {
        this.push = push;
    }
    start() {
        if (this.running) {
            return;
        }
        this.running = true;
        // A central real está sempre "conversando": manda a capacidade de enlaces
        // e o relógio sem o CTI pedir. Isso mantém o watchdog do CTI satisfeito.
        this.push(buildFrame(ComandosPABX.INFO_ENLACES, [20]));
        this.enviarAmbiente();
        this.clockTimer = setInterval(() => this.enviarAmbiente(), AMBIENT_CLOCK_MS);
        this.configurarAutoplay();
        logger.info('[SIM][CENTRAL] Central simulada iniciada (relógio a cada ' +
            `${AMBIENT_CLOCK_MS / 1000}s).`);
    }
    stop() {
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
    onBytesFromCti(bytes) {
        const erro = validateFrame(bytes);
        if (erro) {
            logger.warn(`[SIM][CENTRAL] Frame recebido do CTI é inválido (${erro}): ${hex(bytes)}`);
            return;
        }
        const frame = parseFrame(bytes);
        logger.info(`[SIM][CENTRAL] <- ${getCommandNameFromEnum(frame.command)} ` +
            `(0x${frame.command.toString(16)})`);
        this.responder(frame.command, frame.data);
    }
    // -------------------------------------------------------------------------
    // Cenários acionáveis pelo painel de controle (control-server.ts)
    // -------------------------------------------------------------------------
    simularLigacao(origemFixo = 201, destinoFixo = 204, atende = true, duracaoSeg = 5) {
        this.executarCenario(cenarioLigacao(origemFixo, destinoFixo, atende, duracaoSeg), `ligação ${origemFixo} -> ${destinoFixo} ` +
            `(${atende ? 'atendida' : 'não atendida'}, ${duracaoSeg}s)`);
    }
    simularAcessoPorteiro(porteiroFixo = 200, ramalFixo = 205) {
        this.executarCenario(cenarioAcessoPorteiro(porteiroFixo, ramalFixo), `acesso pelo porteiro ${porteiroFixo} (ramal ${ramalFixo})`);
    }
    simularAcessoSenha(porteiroFixo = 200, ramalFixo = 205) {
        this.executarCenario(cenarioAcessoSenha(porteiroFixo, ramalFixo), `acesso com senha correta no porteiro ${porteiroFixo} (ramal ${ramalFixo})`);
    }
    simularAlerta(zonaFixo = 205, ativado = true) {
        this.executarCenario(cenarioAlerta(zonaFixo, ativado), `alerta ${ativado ? 'ativado' : 'desativado'} na zona ${zonaFixo}`);
    }
    simularAlarme(zonaFixo = 205, disparado = true) {
        this.executarCenario(cenarioAlarme(zonaFixo, disparado), `alarme ${disparado ? 'disparado' : 'normalizado'} na zona ${zonaFixo}`);
    }
    simularAcionamentoFechadura(porteiroFixo = 200, ramalFixo = 205, fechadura = 1) {
        this.executarCenario(cenarioAcionamentoFechadura(porteiroFixo, ramalFixo, fechadura), `fechadura ${fechadura === 3 ? '1+2' : fechadura} do porteiro ` +
            `${porteiroFixo} (ramal ${ramalFixo})`);
    }
    /**
     * Sessão de discagem imersiva do painel — o morador está "no telefone/
     * interfone" (ramal `origemFixo`) e disca uma ação:
     *
     * - `alerta_on/off`, `alarme_on/off` — códigos `*190`..`*193`;
     * - `ligar_ramal` — envia só o "toca" e fica aguardando `atender` /
     *   `nao_atender` / `desligar`;
     * - `ligar_porteiro` — entra em conversa com o porteiro; habilita
     *   `fechadura` (`*1`/`*2`/`*3`);
     * - `atender` / `nao_atender` / `desligar` — encerram/avançam a chamada
     *   de ramal em andamento;
     * - `fechadura` — aciona a fechadura durante a conversa com o porteiro.
     */
    simularDiscagem(origemFixo, acao, alvoFixo = 200, fechadura = 1) {
        switch (acao) {
            case 'alerta_on':
                this.simularAlerta(origemFixo, true);
                break;
            case 'alerta_off':
                this.simularAlerta(origemFixo, false);
                break;
            case 'alarme_on':
                this.simularAlarme(origemFixo, true);
                break;
            case 'alarme_off':
                this.simularAlarme(origemFixo, false);
                break;
            case 'ligar_ramal':
                this.responderEm(0, frameLigacaoToca(origemFixo, alvoFixo));
                setChamadaAtiva({
                    origem: origemFixo,
                    alvo: alvoFixo,
                    tipo: 'ramal',
                    estado: 'tocando',
                });
                break;
            case 'ligar_porteiro':
                setChamadaAtiva({
                    origem: origemFixo,
                    alvo: alvoFixo,
                    tipo: 'porteiro',
                    estado: 'conversa',
                });
                break;
            case 'atender': {
                const c = getChamadaAtiva();
                if (c?.tipo === 'ramal') {
                    this.responderEm(0, frameLigacaoConversa(c.origem, c.alvo));
                    setChamadaAtiva({ ...c, estado: 'conversa' });
                }
                break;
            }
            case 'nao_atender':
            case 'desligar': {
                const c = getChamadaAtiva();
                if (c?.tipo === 'ramal') {
                    this.responderEm(0, frameLigacaoDesliga(c.alvo));
                }
                setChamadaAtiva(null);
                break;
            }
            case 'fechadura': {
                const c = getChamadaAtiva();
                const porteiro = c?.tipo === 'porteiro' ? c.alvo : alvoFixo;
                this.simularAcionamentoFechadura(porteiro, origemFixo, fechadura);
                break;
            }
            default:
                logger.warn(`[SIM][DISCAGEM] ação desconhecida: "${acao}"`);
        }
        const chamada = getChamadaAtiva();
        return { estado: chamada ? chamada.estado : 'livre', chamada };
    }
    // -------------------------------------------------------------------------
    // Respostas a comandos do CTI
    // -------------------------------------------------------------------------
    responder(cmd, data = []) {
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
                // 1º: replay de um serial.log apontado pelo painel.
                // 2º: dump REAL embutido da HDL32p — só se o modelo for HDL32p e não
                //     houver override pendente (o dump real é estático e não reflete
                //     "Enviar"; com override, o sintético é quem aplica a edição).
                // 3º: dump sintético configurável pelo painel.
                const replay = getCaminhoReplay();
                const passosReplay = replay ? cenarioReplayCaptura(replay) : null;
                if (passosReplay) {
                    this.executarCenario(passosReplay, `receber (replay de ${replay})`);
                }
                else if (getModeloSimulado().byte === CentraisHDL.HDL32p &&
                    getRamalOverrides().size === 0) {
                    this.executarCenario(cenarioReceberReal(), 'receber (dump real HDL32p capturado)');
                }
                else {
                    this.executarCenario(cenarioReceberProgramacoes(getConfigRecebimento()), 'receber programações (dump sintético)');
                }
                break;
            }
            default:
                logger.debug(`[SIM][CENTRAL] Sem resposta programada para 0x${cmd.toString(16)} ` +
                    '— ignorado.');
        }
    }
    executarCenario(passos, nome) {
        if (!this.running) {
            logger.warn(`[SIM][CENTRAL] Cenário "${nome}" ignorado — central simulada parada.`);
            return;
        }
        logger.info(`[SIM][CENTRAL] Executando cenário: ${nome}`);
        for (const passo of passos) {
            this.responderEm(passo.emMs, passo.frame);
        }
    }
    frameResposta(status) {
        return buildFrame(ComandosPABX.INFO_RESPOSTA, [status]);
    }
    /**
     * Quadro RES_IDENTIF (0x81). Layout lido por
     * `CommandConectaPABX.decodeIdentifResponse` — precisa de pelo menos 19
     * bytes e do byte 11 (ctiSuportado) diferente de zero para o CTI seguir com
     * o handshake de instalação.
     */
    frameIdentificacao() {
        const modelo = getModeloSimulado().byte;
        // HDL32p: devolve o RES_IDENTIF real capturado (traz versão/build que o
        // builder sintético não preenche). Ver capturas-reais.ts.
        if (modelo === CentraisHDL.HDL32p) {
            return [...RES_IDENTIF_HDL32P];
        }
        const data = new Array(15).fill(0);
        data[0] = modelo; // view[3]  modelo antigo (usado se versão nível 1 < 2)
        data[1] = 2; // view[4]  versão nível 1 >= 2 => usa o "modelo novo" (view[12])
        data[2] = 20; // view[5]  versão nível 2
        data[8] = 1; // view[11] ctiSuportado
        data[9] = modelo; // view[12] modelo novo
        return buildFrame(ComandosPABX.RES_IDENTIF, data);
    }
    /**
     * Quadros que a central emite sozinha, periodicamente. Numa HDL32p real são
     * dois: o relógio (INFO_DATAHORA) e um heartbeat de status
     * (INFO_RAMAL_TDI_2 — o `fa 16 00 …` capturado). Nos outros modelos, só o
     * relógio (não há captura do heartbeat deles).
     */
    enviarAmbiente() {
        this.enviarDataHora();
        if (getModeloSimulado().byte === CentraisHDL.HDL32p) {
            this.push([...STATUS_HEARTBEAT_HDL32P]);
        }
    }
    enviarDataHora() {
        const now = new Date();
        this.push(buildFrame(ComandosPABX.INFO_DATAHORA, [
            now.getDate(),
            now.getMonth() + 1,
            now.getFullYear() % 100,
            now.getDay() + 1,
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
        ]));
    }
    responderEm(ms, frame) {
        const t = setTimeout(() => {
            this.timers.delete(t);
            if (this.running) {
                this.push(frame);
            }
        }, ms);
        this.timers.add(t);
    }
    configurarAutoplay() {
        const alvo = (process.env.CENTRIX_SIM_AUTOPLAY ?? '').trim().toLowerCase();
        if (!alvo) {
            return;
        }
        const intervalo = Number(process.env.CENTRIX_SIM_AUTOPLAY_MS) || AUTOPLAY_PADRAO_MS;
        logger.info(`[SIM][CENTRAL] Autoplay "${alvo}" a cada ${intervalo}ms.`);
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
function hex(bytes) {
    return bytes.map((b) => b.toString(16).padStart(2, '0')).join(' ');
}
//# sourceMappingURL=central-simulator.js.map