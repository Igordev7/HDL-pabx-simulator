import type { PassoCenario } from './scenarios.js';
/**
 * Extrai frames de um `serial.log` capturado. Cada linha "PRODUTO -> fa .."
 * (ou só uma sequência de bytes hex começando por `fa`) vira um frame.
 * Mantém só os `INF_PROGRAMACAO` (0x91) íntegros — é o que o "Receber" precisa.
 */
export declare function lerFramesDaCaptura(caminho: string): number[][];
/**
 * Cenário de "Receber" a partir de uma captura real. `null` se o arquivo não
 * rende nenhum frame utilizável (o chamador cai no dump sintético).
 */
export declare function cenarioReplayCaptura(caminho: string): PassoCenario[] | null;
