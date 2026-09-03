import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CentralSimulator } from './central-simulator.js';
import { buildFrame, parseFrame, validateFrame } from '../protocol/frame.js';
import { ComandosPABX } from '../protocol/comandos.enum.js';
import { InfoRespostaPABX } from '../protocol/info-resposta.enum.js';
import { RamalStatus } from '../protocol/ramal.enum.js';
import { FuncaoPABX } from '../protocol/funcao.enum.js';
import { ProgramacaoPABX } from '../protocol/programacao.enum.js';
import {
  setModeloSimulado,
  getModeloSimulado,
  setRespostaEnvio,
  setConfigRecebimento,
  setChamadaAtiva,
} from './runtime.js';
import { limparProgEstado } from './prog-estado.js';

vi.mock('../logger.js', () => ({
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

// Frames "golden" — o que Command.prepareMessage() monta de verdade.
const CONECTA_PABX = [0xfa, 0x08, 0xa8, 0x00, 0x01, 0x02, 0xf8, 0x58];

function novoSimulador() {
  const emitidos: number[][] = [];
  const sim = new CentralSimulator((frame) => emitidos.push(frame));
  return { sim, emitidos };
}

function framesDoComando(emitidos: number[][], cmd: number) {
  return emitidos.filter((f) => f.length > 2 && f[2] === cmd);
}

describe('CentralSimulator — handshake', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('responde CONECTA_PABX com um RES_IDENTIF íntegro e com CTI suportado', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    sim.onBytesFromCti(CONECTA_PABX);
    await vi.advanceTimersByTimeAsync(50);

    const [identif] = framesDoComando(emitidos, ComandosPABX.RES_IDENTIF);
    expect(identif).toBeDefined();
    expect(validateFrame(identif)).toBeNull();
    expect(identif.length).toBeGreaterThanOrEqual(19);
    // byte 11 (ctiSuportado) precisa ser != 0 pra o CTI seguir o handshake.
    expect(identif[11]).not.toBe(0);

    sim.stop();
  });

  it('setModeloSimulado troca o byte de modelo no RES_IDENTIF (view[3] e view[12])', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    setModeloSimulado(0x25); // HDL28
    sim.onBytesFromCti(CONECTA_PABX);
    await vi.advanceTimersByTimeAsync(50);

    const [identif] = framesDoComando(emitidos, ComandosPABX.RES_IDENTIF);
    expect(validateFrame(identif)).toBeNull();
    expect(identif[3]).toBe(0x25); // modelo antigo
    expect(identif[12]).toBe(0x25); // modelo novo
    expect(getModeloSimulado().byte).toBe(0x25);

    setModeloSimulado(0x13); // volta pro default pra não vazar entre testes
    sim.stop();
  });

  it('INFO_INSTALACAO: ecoa de volta o Código/Ramal que o CTI mandou (nada inventado)', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    // sentinelas 0xFF/0xFFFF = primeira conexão
    sim.onBytesFromCti(
      buildFrame(ComandosPABX.INFO_INSTALACAO, [0xff, 0xff, 0xff])
    );
    await vi.advanceTimersByTimeAsync(50);

    const [resp] = framesDoComando(emitidos, ComandosPABX.INFO_INSTALA_TDI);
    expect(resp).toBeDefined();
    expect(validateFrame(resp)).toBeNull();
    expect([resp[3], resp[4], resp[5]]).toEqual([0xff, 0xff, 0xff]);

    sim.stop();
  });

  it('responde INFO_DATAHORA do CTI com INFO_RESPOSTA RES_OK', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    sim.onBytesFromCti(buildFrame(ComandosPABX.INFO_DATAHORA, [1, 1, 26, 5, 12, 0, 0]));
    await vi.advanceTimersByTimeAsync(50);

    const respostas = framesDoComando(emitidos, ComandosPABX.INFO_RESPOSTA);
    expect(respostas.length).toBeGreaterThan(0);
    expect(respostas.at(-1)?.[3]).toBe(InfoRespostaPABX.RES_OK);

    sim.stop();
  });

  it('ignora frame do CTI com CRC inválido', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    const corrompido = [...CONECTA_PABX];
    corrompido[corrompido.length - 1] ^= 0xff;
    sim.onBytesFromCti(corrompido);
    await vi.advanceTimersByTimeAsync(50);

    expect(framesDoComando(emitidos, ComandosPABX.RES_IDENTIF)).toHaveLength(0);
    sim.stop();
  });
});

describe('CentralSimulator — cenário de ligação', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('atendida: emite toca -> atende -> desliga em quadros INFO_RAMAL_TDI válidos', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    sim.simularLigacao(201, 202, true, 2);
    await vi.advanceTimersByTimeAsync(10000);

    const quadros = framesDoComando(emitidos, ComandosPABX.INFO_RAMAL_TDI);
    expect(quadros).toHaveLength(3);
    for (const q of quadros) {
      expect(validateFrame(q)).toBeNull();
    }

    // byte 4 = status do ramal (ver ramal.handler.ts / enlaces.handle.ts)
    expect(quadros.map((q) => q[4])).toEqual([
      RamalStatus.RML_RINGANDO,
      RamalStatus.RML_CONV_INT,
      RamalStatus.RML_DESOCUPADO,
    ]);

    // ramal que reporta (bytes 12/13): fixo = 200 + hi*256 + lo => 202
    const ring = parseFrame(quadros[0]);
    expect(200 + quadros[0][12] * 256 + quadros[0][13]).toBe(202);
    // RAMAL_A (bytes 6/7) no toque = origem 201
    expect(200 + quadros[0][6] * 256 + quadros[0][7]).toBe(201);
    expect(ring.command).toBe(ComandosPABX.INFO_RAMAL_TDI);

    sim.stop();
  });

  it('não atendida: só toca e desliga, sem quadro de conversação', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    sim.simularLigacao(201, 202, false, 2);
    await vi.advanceTimersByTimeAsync(10000);

    const quadros = framesDoComando(emitidos, ComandosPABX.INFO_RAMAL_TDI);
    expect(quadros.map((q) => q[4])).toEqual([
      RamalStatus.RML_RINGANDO,
      RamalStatus.RML_DESOCUPADO,
    ]);

    sim.stop();
  });

  it('não emite cenário depois de stop()', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    sim.stop();
    const antes = emitidos.length;
    sim.simularLigacao();
    await vi.advanceTimersByTimeAsync(10000);
    expect(emitidos.length).toBe(antes);
  });
});

describe('CentralSimulator — discagem imersiva', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setChamadaAtiva(null);
  });
  afterEach(() => {
    setChamadaAtiva(null);
    vi.useRealTimers();
  });

  it('ligar_ramal toca e só vira conversa ao atender; desligar encerra', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();

    let r = sim.simularDiscagem(201, 'ligar_ramal', 202);
    await vi.advanceTimersByTimeAsync(10);
    expect(r.chamada).toMatchObject({ tipo: 'ramal', estado: 'tocando' });
    let q = framesDoComando(emitidos, ComandosPABX.INFO_RAMAL_TDI);
    expect(q.map((f) => f[4])).toEqual([RamalStatus.RML_RINGANDO]);

    r = sim.simularDiscagem(201, 'atender');
    await vi.advanceTimersByTimeAsync(10);
    expect(r.chamada?.estado).toBe('conversa');
    q = framesDoComando(emitidos, ComandosPABX.INFO_RAMAL_TDI);
    expect(q.map((f) => f[4])).toEqual([
      RamalStatus.RML_RINGANDO,
      RamalStatus.RML_CONV_INT,
    ]);

    r = sim.simularDiscagem(201, 'desligar');
    await vi.advanceTimersByTimeAsync(10);
    expect(r.chamada).toBeNull();
    q = framesDoComando(emitidos, ComandosPABX.INFO_RAMAL_TDI);
    expect(q[q.length - 1][4]).toBe(RamalStatus.RML_DESOCUPADO);

    sim.stop();
  });

  it('ligar_porteiro entra em conversa e *1/*2/*3 emitem INFO_DISCAGEM_TDI FUNC_PORTEIRO', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();

    const r = sim.simularDiscagem(205, 'ligar_porteiro', 200);
    expect(r.chamada).toMatchObject({ tipo: 'porteiro', estado: 'conversa' });

    sim.simularDiscagem(205, 'fechadura', 200, 2);
    await vi.advanceTimersByTimeAsync(10);

    const [disc] = framesDoComando(emitidos, ComandosPABX.INFO_DISCAGEM_TDI);
    expect(disc).toBeDefined();
    expect(validateFrame(disc)).toBeNull();
    expect(disc[7]).toBe(FuncaoPABX.FUNC_PORTEIRO); // frame[7] = função
    expect(disc[10]).toBe(2); // sub-estado = fechadura 2

    sim.simularDiscagem(205, 'desligar');
    sim.stop();
  });

  it('*190/*191/*193/*192 disparam alerta/alarme sem abrir chamada', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();

    for (const acao of ['alerta_on', 'alerta_off', 'alarme_on', 'alarme_off']) {
      const r = sim.simularDiscagem(207, acao);
      expect(r.chamada).toBeNull();
    }
    await vi.advanceTimersByTimeAsync(10);

    const disc = framesDoComando(emitidos, ComandosPABX.INFO_DISCAGEM_TDI);
    expect(disc.length).toBe(4);
    expect(disc.every((f) => validateFrame(f) === null)).toBe(true);

    sim.stop();
  });
});

describe('CentralSimulator — alerta / alarme / programações', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('alerta e alarme emitem INFO_DISCAGEM_TDI com a função certa (byte 7)', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    sim.simularAlerta(205, true);
    sim.simularAlarme(205, true);
    await vi.advanceTimersByTimeAsync(50);

    const discagens = framesDoComando(emitidos, ComandosPABX.INFO_DISCAGEM_TDI);
    expect(discagens).toHaveLength(2);
    for (const d of discagens) {
      expect(validateFrame(d)).toBeNull();
    }
    // byte 7 = função da discagem (ver discagem.handler.ts)
    expect(discagens[0][7]).toBe(FuncaoPABX.FUNC_ALERTA);
    expect(discagens[1][7]).toBe(FuncaoPABX.FUNC_ALARME);

    sim.stop();
  });

  it('acesso por senha: FUNC_ACESSO (byte 7) + byte 10 = 0xBB', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    sim.simularAcessoSenha(200, 205);
    await vi.advanceTimersByTimeAsync(50);

    const [d] = framesDoComando(emitidos, ComandosPABX.INFO_DISCAGEM_TDI);
    expect(validateFrame(d)).toBeNull();
    expect(d[7]).toBe(FuncaoPABX.FUNC_ACESSO);
    expect(d[10]).toBe(0xbb);

    sim.stop();
  });

  it('SOL_PROGRAMACAO responde RES_OK + dump (config, ramais) terminando em PROG_FIM', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();
    sim.onBytesFromCti(buildFrame(ComandosPABX.SOL_PROGRAMACAO, [0x00]));
    await vi.advanceTimersByTimeAsync(3000);

    const respostas = framesDoComando(emitidos, ComandosPABX.INFO_RESPOSTA);
    expect(respostas.at(-1)?.[3]).toBe(InfoRespostaPABX.RES_OK);

    const progs = framesDoComando(emitidos, ComandosPABX.INF_PROGRAMACAO);
    for (const f of progs) {
      expect(validateFrame(f)).toBeNull();
    }
    // 11 ramais + 1 config + 1 fim (ramais primeiro: ver comentário em scenarios.ts)
    expect(progs.length).toBe(13);
    expect(progs[0][3]).toBe(ProgramacaoPABX.PROG_RML_CATEGORIA);
    expect(progs.at(-2)?.[3]).toBe(ProgramacaoPABX.PROG_CONFIGURACAO);
    expect(progs.at(-1)?.[3]).toBe(ProgramacaoPABX.PROG_FIM);
    // ramal físico do 1º PROG_RML_CATEGORIA (bytes 4/5) => 200
    expect(200 + progs[0][4] * 256 + progs[0][5]).toBe(200);

    sim.stop();
  });

  it('config de Receber: muda quantidade e faixa dos ramais no dump', async () => {
    const { sim, emitidos } = novoSimulador();
    setConfigRecebimento({ qtdRamais: 4, ramalInicial: 300, qtdPorteiros: 1 });
    sim.start();
    sim.onBytesFromCti(buildFrame(ComandosPABX.SOL_PROGRAMACAO, [0x00]));
    await vi.advanceTimersByTimeAsync(3000);

    const progs = framesDoComando(emitidos, ComandosPABX.INF_PROGRAMACAO);
    const cats = progs.filter((f) => f[3] === ProgramacaoPABX.PROG_RML_CATEGORIA);
    expect(cats.length).toBe(4);
    expect(200 + cats[0][4] * 256 + cats[0][5]).toBe(300);
    // último ramal marcado como porteiro (bit 0x40 no byte 12)
    expect(cats[3][12] & 0x40).toBe(0x40);
    expect(cats[0][12] & 0x40).toBe(0);

    setConfigRecebimento({ qtdRamais: 11, ramalInicial: 200, qtdPorteiros: 0 });
    sim.stop();
  });

  it('round-trip: EFE_PROGRAMACAO PROG_RML_FLEXIVEL reflete no dump do Receber seguinte', async () => {
    limparProgEstado();
    const { sim, emitidos } = novoSimulador();
    sim.start();

    // ramal 209 -> flexível 291 (payload BCD real)
    sim.onBytesFromCti(
      buildFrame(ComandosPABX.EFE_PROGRAMACAO, [0x37, 0x20, 0x92, 0x91, 0xff])
    );
    await vi.advanceTimersByTimeAsync(50);
    sim.onBytesFromCti(buildFrame(ComandosPABX.SOL_PROGRAMACAO, [0x00]));
    await vi.advanceTimersByTimeAsync(3000);

    const cats = framesDoComando(emitidos, ComandosPABX.INF_PROGRAMACAO).filter(
      (f) => f[3] === ProgramacaoPABX.PROG_RML_CATEGORIA
    );
    const r209 = cats.find((f) => 200 + f[4] * 256 + f[5] === 209);
    expect(r209).toBeDefined();
    // combineBytesToWordRamalFlexivel: hex([data8,data9,data6,data7]) -> parseInt
    const hexFlex = [r209![8], r209![9], r209![6], r209![7]]
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    expect(parseInt(hexFlex, 16)).toBe(291);

    limparProgEstado();
    sim.stop();
  });

  it('Enviar programação: resposta configurável (ok / nok / timeout)', async () => {
    const { sim, emitidos } = novoSimulador();
    sim.start();

    setRespostaEnvio('nok');
    sim.onBytesFromCti(buildFrame(ComandosPABX.EFE_PROGRAMACAO, [0x37, 0x20]));
    await vi.advanceTimersByTimeAsync(50);
    let respostas = framesDoComando(emitidos, ComandosPABX.INFO_RESPOSTA);
    expect(respostas.at(-1)?.[3]).toBe(InfoRespostaPABX.RES_NOK);

    setRespostaEnvio('timeout');
    const antes = emitidos.length;
    sim.onBytesFromCti(buildFrame(ComandosPABX.EFE_PROG_RML, [0xa0, 0x00]));
    await vi.advanceTimersByTimeAsync(200);
    expect(emitidos.length).toBe(antes); // nenhuma resposta

    setRespostaEnvio('ok');
    sim.onBytesFromCti(buildFrame(ComandosPABX.EFE_PROGRAMACAO, [0x37, 0x20]));
    await vi.advanceTimersByTimeAsync(50);
    respostas = framesDoComando(emitidos, ComandosPABX.INFO_RESPOSTA);
    expect(respostas.at(-1)?.[3]).toBe(InfoRespostaPABX.RES_OK);

    sim.stop();
  });
});
