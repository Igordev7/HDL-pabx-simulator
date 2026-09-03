/**
 * CRC do protocolo HDL (16 bits).
 *
 * Algoritmo acumula para cada byte,
 [[* `b + (b XOR i%256) + (b XOR ~(i%256))`, reduz a 16 bits e aplica complemento. Resultado serializado em big-endian (hi, lo), igual ao restante do frame.
 */
export declare const CRC_SIZE = 2;
export declare function ckCRC_HDL(bytes: number[]): number;
/** Serializa um CRC de 16 bits em [hi, lo] (big-endian). */
export declare function crcToBytes(crc: number): [number, number];
/**
 * Anexa o CRC (2 bytes, big-endian) calculado sobre `bytes` ao final de
 * `bytes`. Espelha `SerialConnection.appendCheckSum`.
 */
export declare function appendCrc(bytes: number[]): number[];
/**
 * Valida o CRC de um frame COMPLETO (cabeçalho..CRC). Recalcula o CRC sobre
 * todos os bytes exceto os 2 últimos e compara com os 2 últimos (big-endian).
 * Retorna false se o frame for curto demais para conter um CRC.
 */
export declare function isCrcValid(frameBytes: number[]): boolean;
