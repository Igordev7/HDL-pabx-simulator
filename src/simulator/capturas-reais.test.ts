import { describe, it, expect } from 'vitest';
import { validateFrame } from '../protocol/frame.js';
import { ComandosPABX } from '../protocol/comandos.enum.js';
import { ProgramacaoPABX } from '../protocol/programacao.enum.js';
import {
  RECEBER_HDL32P,
  RES_IDENTIF_HDL32P,
  STATUS_HEARTBEAT_HDL32P,
} from './capturas-reais.js';

/**
 * Os frames de `capturas-reais.ts` são bytes literais capturados da serial —
 * se um deles não bate LEN/CRC, foi erro de transcrição.
 */
describe('capturas-reais — frames capturados da HDL32p', () => {
  it('RES_IDENTIF real é um frame íntegro (comando 0x81)', () => {
    const f = [...RES_IDENTIF_HDL32P];
    expect(validateFrame(f)).toBeNull();
    expect(f[2]).toBe(ComandosPABX.RES_IDENTIF);
  });

  it('heartbeat real é um frame íntegro (comando 0x00 / INFO_RAMAL_TDI_2)', () => {
    const f = [...STATUS_HEARTBEAT_HDL32P];
    expect(validateFrame(f)).toBeNull();
    expect(f[2]).toBe(ComandosPABX.INFO_RAMAL_TDI_2);
  });

  it('todos os frames do dump de "Receber" são íntegros e são INF_PROGRAMACAO', () => {
    expect(RECEBER_HDL32P.length).toBeGreaterThan(80);
    for (const frame of RECEBER_HDL32P) {
      const f = [...frame];
      expect(validateFrame(f), `frame inválido: ${hex(f)}`).toBeNull();
      expect(f[2]).toBe(ComandosPABX.INF_PROGRAMACAO);
    }
  });

  it('o dump abre com PROG central (0x01) e fecha com PROG_FIM (0xfe)', () => {
    expect(RECEBER_HDL32P[0][3]).toBe(0x01);
    expect(RECEBER_HDL32P[RECEBER_HDL32P.length - 1][3]).toBe(
      ProgramacaoPABX.PROG_FIM
    );
  });
});

function hex(bytes: number[]): string {
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join(' ');
}
