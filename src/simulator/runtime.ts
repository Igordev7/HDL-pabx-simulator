import {
  CentraisHDL,
  getCentralNameFromByte,
} from '../protocol/centrais.enum.js';
import { logger } from '../logger.js';
import type { CentralSimulator } from './central-simulator.js';

/**
 * Estado do simulador que vive fora de qualquer instância de transporte —
 * porque o painel de controle (HTTP) precisa alcançá-lo mesmo enquanto o CTI
 * está desconectado, e o `SerialConnector` cria/descarta várias instâncias de
 * `SerialConnection`/transporte por sessão.
 */

/** Resolve `CENTRIX_SIM_MODELO` (byte "0x13"/"19" ou nome "HDL256p"). */
function resolverModeloDoEnv(): number {
  const raw = (process.env.CENTRIX_SIM_MODELO ?? '').trim();
  if (!raw) {
    return CentraisHDL.HDL256p;
  }
  const comoNumero = raw.toLowerCase().startsWith('0x')
    ? parseInt(raw, 16)
    : Number(raw);
  if (Number.isInteger(comoNumero) && comoNumero > 0) {
    return comoNumero & 0xff;
  }
  const porNome = (Object.entries(CentraisHDL) as [string, number][]).find(
    ([nome]) => nome.toLowerCase() === raw.toLowerCase()
  );
  return porNome ? porNome[1] : CentraisHDL.HDL256p;
}

let modelo = resolverModeloDoEnv();

/** Modelo (byte) que o RES_IDENTIF vai devolver no PRÓXIMO handshake. */
export function getModeloSimulado(): { byte: number; nome: string } {
  return { byte: modelo, nome: getCentralNameFromByte(modelo) };
}

export function setModeloSimulado(byte: number): void {
  if (!Number.isInteger(byte) || byte <= 0) {
    return;
  }
  modelo = byte & 0xff;
  logger.info(
    `[SIM][CENTRAL] Modelo definido para 0x${modelo.toString(16)} ` +
      `(${getCentralNameFromByte(modelo)}). Vale no próximo "Conectar".`
  );
}

/* ------------------------------------------------------------------ *
 * Config de "Enviar programações" — como a central responde ao EFE_* *
 * ------------------------------------------------------------------ */

export type RespostaEnvio = 'ok' | 'nok' | 'timeout';
let respostaEnvio: RespostaEnvio = 'ok';

/**
 * Caminho de um `serial.log` capturado da central REAL. Se apontar para um
 * arquivo legível, o "Receber programações" replica os frames `PRODUTO -> 91`
 * dele em vez do dump sintético — a única forma de o send→confirmar bater 100%.
 */
let caminhoReplay = (process.env.CENTRIX_SIM_REPLAY ?? '').trim();
export function getCaminhoReplay(): string {
  return caminhoReplay;
}
export function setCaminhoReplay(p: string): void {
  caminhoReplay = (p ?? '').trim();
  logger.info(
    caminhoReplay
      ? `[SIM][CENTRAL] "Receber" vai replicar a captura: ${caminhoReplay}`
      : '[SIM][CENTRAL] "Receber" volta ao dump sintético (replay desligado).'
  );
}

export function getRespostaEnvio(): RespostaEnvio {
  return respostaEnvio;
}
export function setRespostaEnvio(v: string): void {
  if (v === 'ok' || v === 'nok' || v === 'timeout') {
    respostaEnvio = v;
    logger.info(`[SIM][CENTRAL] Resposta de "Enviar programação": ${v}`);
  }
}

/* ------------------------------------------------------------- *
 * Config de "Receber programações" — o dump que o SOL_ devolve  *
 * ------------------------------------------------------------- */

export interface ConfigRecebimento {
  /** Quantos ramais (PROG_RML_CATEGORIA). */
  qtdRamais: number;
  /** numeroFixo do primeiro ramal (flexível = fixo). */
  ramalInicial: number;
  /** Quantos dos últimos ramais são porteiro/fechadura. */
  qtdPorteiros: number;
  troncos: number;
  senhaProgramador: number;
}

let configRecebimento: ConfigRecebimento = {
  qtdRamais: 11,
  ramalInicial: 200,
  qtdPorteiros: 0,
  troncos: 4,
  senhaProgramador: 1234,
};

export function getConfigRecebimento(): ConfigRecebimento {
  return { ...configRecebimento };
}
export function setConfigRecebimento(patch: Partial<ConfigRecebimento>): void {
  const limpo: Partial<ConfigRecebimento> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (typeof v === 'number' && Number.isFinite(v) && v >= 0) {
      limpo[k as keyof ConfigRecebimento] = v;
    }
  }
  configRecebimento = { ...configRecebimento, ...limpo };
  // qtdRamais 1..250, porteiros não passa da quantidade
  configRecebimento.qtdRamais = Math.min(
    250,
    Math.max(1, configRecebimento.qtdRamais)
  );
  configRecebimento.qtdPorteiros = Math.min(
    configRecebimento.qtdPorteiros,
    configRecebimento.qtdRamais
  );
  logger.info(
    `[SIM][CENTRAL] Config "Receber": ${JSON.stringify(configRecebimento)}`
  );
}

let simuladorAtivo: CentralSimulator | null = null;
let acaoQueda: (() => void) | null = null;

// ---------------------------------------------------------------------------
// Chamada em andamento no card "Discagem" — só pro painel mostrar o estado e
// os botões contextuais (Atender / Desligar / Abrir fechadura).
// ---------------------------------------------------------------------------

export interface ChamadaAtiva {
  origem: number;
  alvo: number;
  tipo: 'ramal' | 'porteiro';
  estado: 'tocando' | 'conversa';
}

let chamadaAtiva: ChamadaAtiva | null = null;

export function getChamadaAtiva(): ChamadaAtiva | null {
  return chamadaAtiva;
}

export function setChamadaAtiva(c: ChamadaAtiva | null): void {
  chamadaAtiva = c;
  if (c) {
    logger.info(
      `[SIM][DISCAGEM] chamada ${c.origem} -> ${c.alvo} ` +
        `(${c.tipo}, ${c.estado})`
    );
  } else {
    logger.info('[SIM][DISCAGEM] chamada encerrada');
  }
}

/** Registrado pelo transporte simulado enquanto está aberto. */
export function registrarSimuladorAtivo(
  sim: CentralSimulator | null,
  queda: (() => void) | null
): void {
  simuladorAtivo = sim;
  acaoQueda = queda;
}

export function getSimuladorAtivo(): CentralSimulator | null {
  return simuladorAtivo;
}

export function dispararQuedaSimulada(): boolean {
  if (!acaoQueda) {
    return false;
  }
  acaoQueda();
  return true;
}
