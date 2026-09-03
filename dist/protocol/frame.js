import { CRC_SIZE, ckCRC_HDL, crcToBytes, isCrcValid } from './crc.js';
/** Byte de cabeçalho/delimitador do frame. */
export const HEADER_BYTE = 0xfa;
/** Índices fixos dentro do frame. */
export const HEADER_INDEX = 0;
export const LENGTH_INDEX = 1;
export const COMMAND_INDEX = 2;
export const DATA_START_INDEX = 3;
/**
 * Overhead fixo de um frame (cabeçalho + LEN + CMD + CRC). Frame mínimo válido
 * = overhead + 0 bytes de dados.
 */
export const FRAME_OVERHEAD = DATA_START_INDEX + CRC_SIZE; // 5
/** Motivos de frame inválido (úteis para o simulador decidir a resposta). */
export var FrameError;
(function (FrameError) {
    FrameError["TOO_SHORT"] = "TOO_SHORT";
    FrameError["BAD_HEADER"] = "BAD_HEADER";
    FrameError["LENGTH_MISMATCH"] = "LENGTH_MISMATCH";
    FrameError["BAD_CRC"] = "BAD_CRC";
})(FrameError || (FrameError = {}));
export function buildFrame(command, data = []) {
    const length = DATA_START_INDEX + data.length + CRC_SIZE;
    const preCrc = [HEADER_BYTE, length, command, ...data];
    const [crcHi, crcLo] = crcToBytes(ckCRC_HDL(preCrc));
    return [...preCrc, crcHi, crcLo];
}
export function checkFrameStructure(bytes) {
    if (bytes.length < FRAME_OVERHEAD) {
        return FrameError.TOO_SHORT;
    }
    if (bytes[HEADER_INDEX] !== HEADER_BYTE) {
        return FrameError.BAD_HEADER;
    }
    if (bytes[LENGTH_INDEX] !== bytes.length) {
        return FrameError.LENGTH_MISMATCH;
    }
    return null;
}
export function validateFrame(bytes) {
    const structural = checkFrameStructure(bytes);
    if (structural) {
        return structural;
    }
    if (!isCrcValid(bytes)) {
        return FrameError.BAD_CRC;
    }
    return null;
}
export function parseFrame(bytes) {
    const structural = checkFrameStructure(bytes);
    if (structural === FrameError.TOO_SHORT ||
        structural === FrameError.BAD_HEADER) {
        throw new Error(`[FRAME] Frame não interpretável: ${structural}`);
    }
    const length = bytes[LENGTH_INDEX];
    const command = bytes[COMMAND_INDEX];
    const data = bytes.slice(DATA_START_INDEX, bytes.length - CRC_SIZE);
    const crc = (bytes[bytes.length - CRC_SIZE] << 8) | bytes[bytes.length - CRC_SIZE + 1];
    return {
        header: bytes[HEADER_INDEX],
        length,
        command,
        data,
        crc,
        crcValid: isCrcValid(bytes),
    };
}
//# sourceMappingURL=frame.js.map