import { describe, it, expect, vi, beforeEach } from 'vitest';
import { aplicarEfe, limparProgEstado, getRamalOverrides, } from './prog-estado.js';
import { ProgramacaoPABX } from '../protocol/programacao.enum.js';
vi.mock('../logger.js', () => ({
    logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));
// Payloads reais (miolo após o byte de tipo de programação), capturados no
// serial.log ao editar o ramal 209.
describe('prog-estado — decodifica EFE_* no estado da central', () => {
    beforeEach(() => limparProgEstado());
    it('PROG_RML_FLEXIVEL: ramal 209 -> flexível 291', () => {
        aplicarEfe(ProgramacaoPABX.PROG_RML_FLEXIVEL, [0x20, 0x92, 0x91, 0xff]);
        expect(getRamalOverrides().get(209)).toEqual({ flexivel: 291 });
    });
    it('PROG_RML_HOTLINE: ramal 202 -> hotline 214', () => {
        aplicarEfe(ProgramacaoPABX.PROG_RML_HOTLINE, [0x20, 0x22, 0x21, 0x4c, 0xff]);
        expect(getRamalOverrides().get(202)).toEqual({ hotline: 214 });
    });
    it('PROG_RML_HOTLINE tipo 0: remove a hotline (null)', () => {
        aplicarEfe(ProgramacaoPABX.PROG_RML_HOTLINE, [0x20, 0x90, 0xcf, 0xff]);
        expect(getRamalOverrides().get(209)).toEqual({ hotline: null });
    });
    it('PROG_RAMAL_DESVIO: ramal 209 (físico 9) -> sempre, destino 202', () => {
        aplicarEfe(ProgramacaoPABX.PROG_RAMAL_DESVIO, [0x00, 0x09, 0x51, 0x20, 0x2c, 0xff]);
        expect(getRamalOverrides().get(209)).toEqual({
            desvioModo: 'sempre',
            desvioDestinoFixo: 202,
        });
    });
    it('PROG_RAMAL_TOQUES: ramal 209 -> "03" (curto) => byte 2', () => {
        aplicarEfe(ProgramacaoPABX.PROG_RAMAL_TOQUES, [0x00, 0x09, 0x03, 0xcf, 0xff]);
        expect(getRamalOverrides().get(209)).toEqual({ toqueByte: 2 });
    });
    it('acumula vários campos no mesmo ramal', () => {
        aplicarEfe(ProgramacaoPABX.PROG_RML_FLEXIVEL, [0x20, 0x92, 0x91, 0xff]);
        aplicarEfe(ProgramacaoPABX.PROG_RAMAL_TOQUES, [0x00, 0x09, 0x03, 0xcf, 0xff]);
        expect(getRamalOverrides().get(209)).toEqual({
            flexivel: 291,
            toqueByte: 2,
        });
    });
});
//# sourceMappingURL=prog-estado.test.js.map