/** Byte de cabeçalho/delimitador do frame. */
export declare const HEADER_BYTE = 250;
/** Índices fixos dentro do frame. */
export declare const HEADER_INDEX = 0;
export declare const LENGTH_INDEX = 1;
export declare const COMMAND_INDEX = 2;
export declare const DATA_START_INDEX = 3;
/**
 * Overhead fixo de um frame (cabeçalho + LEN + CMD + CRC). Frame mínimo válido
 * = overhead + 0 bytes de dados.
 */
export declare const FRAME_OVERHEAD: number;
/** Motivos de frame inválido (úteis para o simulador decidir a resposta). */
export declare enum FrameError {
    TOO_SHORT = "TOO_SHORT",
    BAD_HEADER = "BAD_HEADER",
    LENGTH_MISMATCH = "LENGTH_MISMATCH",
    BAD_CRC = "BAD_CRC"
}
/** Frame decodificado. */
export interface ParsedFrame {
    header: number;
    length: number;
    command: number;
    data: number[];
    crc: number;
    crcValid: boolean;
}
export declare function buildFrame(command: number, data?: number[]): number[];
export declare function checkFrameStructure(bytes: number[]): FrameError | null;
export declare function validateFrame(bytes: number[]): FrameError | null;
export declare function parseFrame(bytes: number[]): ParsedFrame;
