import type { CentralSimulator } from './central-simulator.js';
/** Modelo (byte) que o RES_IDENTIF vai devolver no PRÓXIMO handshake. */
export declare function getModeloSimulado(): {
    byte: number;
    nome: string;
};
export declare function setModeloSimulado(byte: number): void;
export type RespostaEnvio = 'ok' | 'nok' | 'timeout';
export declare function getCaminhoReplay(): string;
export declare function setCaminhoReplay(p: string): void;
export declare function getRespostaEnvio(): RespostaEnvio;
export declare function setRespostaEnvio(v: string): void;
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
export declare function getConfigRecebimento(): ConfigRecebimento;
export declare function setConfigRecebimento(patch: Partial<ConfigRecebimento>): void;
/** Registrado pelo transporte simulado enquanto está aberto. */
export declare function registrarSimuladorAtivo(sim: CentralSimulator | null, queda: (() => void) | null): void;
export declare function getSimuladorAtivo(): CentralSimulator | null;
export declare function dispararQuedaSimulada(): boolean;
