import { describe, expect, it } from 'vitest';
import {
  CRC_SIZE,
  appendCrc,
  ckCRC_HDL,
  crcToBytes,
  isCrcValid,
} from './crc.js';

// Valores "golden" derivados do algoritmo ckCRC_HDL do próprio projeto
// (movido de util.ts sem alteração) aplicado aos frames que a aplicação
// realmente monta em Command.prepareMessage(). Servem para travar o
// comportamento; ao capturar tráfego real da central, confirme-os byte-a-byte.
describe('ckCRC_HDL', () => {
  it('calcula o CRC do frame CONECTA_PABX (FA 08 A8 00 01 02)', () => {
    expect(ckCRC_HDL([0xfa, 0x08, 0xa8, 0x00, 0x01, 0x02])).toBe(0xf858);
  });

  it('trata a sequência vazia (complemento de 0)', () => {
    expect(ckCRC_HDL([])).toBe(0xffff);
  });

  it('trata um único byte zero', () => {
    expect(ckCRC_HDL([0x00])).toBe(0xff00);
  });

  it('é determinístico', () => {
    const bytes = [0xfa, 0x06, 0x90, 0x00];
    expect(ckCRC_HDL(bytes)).toBe(ckCRC_HDL(bytes));
  });
});

describe('crcToBytes', () => {
  it('serializa em big-endian [hi, lo]', () => {
    expect(crcToBytes(0xf858)).toEqual([0xf8, 0x58]);
    expect(crcToBytes(0x00ff)).toEqual([0x00, 0xff]);
  });
});

describe('appendCrc', () => {
  it('anexa 2 bytes de CRC ao final', () => {
    const out = appendCrc([0xfa, 0x08, 0xa8, 0x00, 0x01, 0x02]);
    expect(out.slice(-CRC_SIZE)).toEqual([0xf8, 0x58]);
    expect(out.length).toBe(6 + CRC_SIZE);
  });
});

describe('isCrcValid', () => {
  const validFrame = [0xfa, 0x08, 0xa8, 0x00, 0x01, 0x02, 0xf8, 0x58];

  it('aceita um frame com CRC correto', () => {
    expect(isCrcValid(validFrame)).toBe(true);
  });

  it('rejeita um frame com CRC adulterado', () => {
    const bad = [...validFrame];
    bad[bad.length - 1] ^= 0xff;
    expect(isCrcValid(bad)).toBe(false);
  });

  it('rejeita um frame com um byte de dado adulterado', () => {
    const bad = [...validFrame];
    bad[3] ^= 0x01;
    expect(isCrcValid(bad)).toBe(false);
  });

  it('rejeita sequências curtas demais para conter CRC', () => {
    expect(isCrcValid([0xfa])).toBe(false);
    expect(isCrcValid([])).toBe(false);
  });
});
