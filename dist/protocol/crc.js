/**
 * CRC do protocolo HDL (16 bits).
 *
 * Algoritmo acumula para cada byte,
 [[* `b + (b XOR i%256) + (b XOR ~(i%256))`, reduz a 16 bits e aplica complemento. Resultado serializado em big-endian (hi, lo), igual ao restante do frame.
 */
export const CRC_SIZE = 2;
export function ckCRC_HDL(bytes) {
    let liCheck = 0;
    for (let i = 0; i < bytes.length; i++) {
        const lbb = bytes[i];
        const lbCount = i % 256;
        liCheck += lbb + (lbb ^ lbCount) + (lbb ^ (~lbCount & 0xff));
    }
    const lwCheck = liCheck % 65536;
    return ~lwCheck & 0xffff;
}
/** Serializa um CRC de 16 bits em [hi, lo] (big-endian). */
export function crcToBytes(crc) {
    return [(crc >> 8) & 0xff, crc & 0xff];
}
/**
 * Anexa o CRC (2 bytes, big-endian) calculado sobre `bytes` ao final de
 * `bytes`. Espelha `SerialConnection.appendCheckSum`.
 */
export function appendCrc(bytes) {
    return [...bytes, ...crcToBytes(ckCRC_HDL(bytes))];
}
/**
 * Valida o CRC de um frame COMPLETO (cabeçalho..CRC). Recalcula o CRC sobre
 * todos os bytes exceto os 2 últimos e compara com os 2 últimos (big-endian).
 * Retorna false se o frame for curto demais para conter um CRC.
 */
export function isCrcValid(frameBytes) {
    if (frameBytes.length < CRC_SIZE + 1) {
        return false;
    }
    const payload = frameBytes.slice(0, frameBytes.length - CRC_SIZE);
    const [hi, lo] = crcToBytes(ckCRC_HDL(payload));
    const gotHi = frameBytes[frameBytes.length - CRC_SIZE];
    const gotLo = frameBytes[frameBytes.length - CRC_SIZE + 1];
    return gotHi === hi && gotLo === lo;
}
//# sourceMappingURL=crc.js.map