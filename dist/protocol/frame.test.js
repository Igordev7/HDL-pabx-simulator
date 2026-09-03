import { describe, expect, it } from 'vitest';
import { DATA_START_INDEX, FrameError, HEADER_BYTE, LENGTH_INDEX, buildFrame, checkFrameStructure, parseFrame, validateFrame, } from './frame.js';
// Frames "golden" — exatamente o que Command.prepareMessage() monta para os
// comandos reais da aplicação.
const CONECTA_PABX = [0xfa, 0x08, 0xa8, 0x00, 0x01, 0x02, 0xf8, 0x58];
const SOL_PROGRAMACAO = [0xfa, 0x06, 0x90, 0x00, 0xfa, 0x73];
const INFO_INSTALACAO = [0xfa, 0x08, 0x9f, 0xff, 0xff, 0xff, 0xf5, 0x67];
describe('buildFrame', () => {
    it('monta o frame CONECTA_PABX (0xA8) igual ao Command.prepareMessage', () => {
        expect(buildFrame(0xa8, [0x00, 0x01, 0x02])).toEqual(CONECTA_PABX);
    });
    it('monta o frame SOL_PROGRAMACAO (0x90) com 1 byte de dado', () => {
        expect(buildFrame(0x90, [0x00])).toEqual(SOL_PROGRAMACAO);
    });
    it('monta o frame INFO_INSTALACAO (0x9F) com sentinelas 0xFF', () => {
        expect(buildFrame(0x9f, [0xff, 0xff, 0xff])).toEqual(INFO_INSTALACAO);
    });
    it('o byte LEN é o tamanho total do frame', () => {
        const f = buildFrame(0xa8, [0x00, 0x01, 0x02]);
        expect(f[LENGTH_INDEX]).toBe(f.length);
        expect(f[0]).toBe(HEADER_BYTE);
    });
    it('suporta frame sem dados', () => {
        const f = buildFrame(0x80, []);
        expect(f[LENGTH_INDEX]).toBe(f.length);
        expect(f.length).toBe(DATA_START_INDEX + 2); // overhead: header+len+cmd+crc
    });
});
describe('parseFrame (round-trip)', () => {
    it('decodifica os campos de um frame montado', () => {
        const parsed = parseFrame(CONECTA_PABX);
        expect(parsed.header).toBe(0xfa);
        expect(parsed.command).toBe(0xa8);
        expect(parsed.data).toEqual([0x00, 0x01, 0x02]);
        expect(parsed.length).toBe(CONECTA_PABX.length);
        expect(parsed.crcValid).toBe(true);
    });
    it('build → parse → build é idempotente', () => {
        const original = buildFrame(0x9f, [0xff, 0xff, 0xff]);
        const parsed = parseFrame(original);
        expect(buildFrame(parsed.command, parsed.data)).toEqual(original);
    });
});
describe('validateFrame', () => {
    it('aceita um frame íntegro', () => {
        expect(validateFrame(CONECTA_PABX)).toBeNull();
    });
    it('detecta cabeçalho inválido', () => {
        const bad = [...CONECTA_PABX];
        bad[0] = 0x00;
        expect(validateFrame(bad)).toBe(FrameError.BAD_HEADER);
    });
    it('detecta divergência de tamanho (LEN != bytes.length)', () => {
        const bad = [...CONECTA_PABX];
        bad[LENGTH_INDEX] = 0x09;
        expect(validateFrame(bad)).toBe(FrameError.LENGTH_MISMATCH);
    });
    it('detecta CRC inválido', () => {
        const bad = [...CONECTA_PABX];
        bad[bad.length - 1] ^= 0xff;
        expect(validateFrame(bad)).toBe(FrameError.BAD_CRC);
    });
    it('detecta frame curto demais', () => {
        expect(validateFrame([0xfa, 0x02])).toBe(FrameError.TOO_SHORT);
    });
});
describe('checkFrameStructure', () => {
    it('ignora o CRC (só valida estrutura)', () => {
        const badCrc = [...CONECTA_PABX];
        badCrc[badCrc.length - 1] ^= 0xff;
        expect(checkFrameStructure(badCrc)).toBeNull();
    });
});
//# sourceMappingURL=frame.test.js.map