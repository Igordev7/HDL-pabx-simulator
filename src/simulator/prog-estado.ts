import { ProgramacaoPABX } from '../protocol/programacao.enum.js';
import { logger } from '../logger.js';

/**
 * Estado de programação que a central simulada acumula a partir dos comandos
 * `EFE_*` do CTI, para que o "Receber" seguinte devolva o que foi enviado —
 * senão o app marca tudo como "pendente"/"rejeitado" na verificação.
 *
 * Cobre os 4 campos de ramal que o app mais edita (flexível, hotline, desvio,
 * tipo de toque). Outros `EFE_*` continuam só recebendo `RES_OK`.
 */

export type DesvioModo = 'desativado' | 'sempre' | 'ocupado' | 'externo';

export interface RamalOverride {
  flexivel?: number;
  /** número flexível da hotline; `null` = hotline removida. */
  hotline?: number | null;
  desvioModo?: DesvioModo;
  /** numeroFixo do destino do desvio (sempre/ocupado); `null` nos demais. */
  desvioDestinoFixo?: number | null;
  /** valor pronto para o byte 29 do PROG_RML_CATEGORIA. */
  toqueByte?: number;
}

const overrides = new Map<number, RamalOverride>();

export function limparProgEstado(): void {
  overrides.clear();
}

export function getRamalOverrides(): Map<number, RamalOverride> {
  return overrides;
}

function merge(fixo: number, patch: RamalOverride): void {
  overrides.set(fixo, { ...overrides.get(fixo), ...patch });
  logger.info(
    `[SIM][CENTRAL] estado: ramal ${fixo} <- ${JSON.stringify(patch)}`
  );
}

/** Bytes DTMF-BCD (terminados por 0xFF) -> string de dígitos hex. */
function bcdParaString(bytes: number[]): string {
  let s = '';
  for (const b of bytes) {
    if (b === 0xff) break;
    s += b.toString(16).padStart(2, '0');
  }
  return s;
}

const semTerminador = (s: string): string => s.replace(/[cf]+$/i, '');

/**
 * Aplica um `EFE_PROGRAMACAO` / `EFE_PROG_RML`. `progByte` = 1º byte de dados
 * (o tipo de programação); `payload` = o resto (o miolo BCD, com 0xFF no fim).
 */
export function aplicarEfe(progByte: number, payload: number[]): void {
  const s = bcdParaString(payload);
  try {
    switch (progByte) {
      // "ramalDec(3) + flexDec"  (CommandEfeProgRamalFlexivel — sem terminador)
      case ProgramacaoPABX.PROG_RML_FLEXIVEL: {
        const fixo = parseInt(s.slice(0, 3), 10);
        const flex = parseInt(semTerminador(s.slice(3)), 10);
        if (Number.isFinite(fixo) && Number.isFinite(flex)) {
          merge(fixo, { flexivel: flex });
        }
        break;
      }

      // "ramalDec(3) + tipo(1) + [hotDec] + c"  (CommandEfeProgRamalHotline)
      case ProgramacaoPABX.PROG_RML_HOTLINE: {
        const fixo = parseInt(s.slice(0, 3), 10);
        const tipo = s[3];
        if (!Number.isFinite(fixo)) break;
        if (tipo === '0') {
          merge(fixo, { hotline: null });
        } else if (tipo === '2') {
          const hot = parseInt(semTerminador(s.slice(4)), 10);
          if (Number.isFinite(hot)) merge(fixo, { hotline: hot });
        }
        break;
      }

      // "fisicoHex(4) + '5' + modo(1) + [destDec] + c"  (CommandEfeProgRamalDesvio)
      case ProgramacaoPABX.PROG_RAMAL_DESVIO: {
        const fixo = parseInt(s.slice(0, 4), 16) + 200;
        const modo = s[5];
        const resto = semTerminador(s.slice(6));
        if (modo === '0') {
          merge(fixo, { desvioModo: 'desativado', desvioDestinoFixo: null });
        } else if (modo === '1') {
          merge(fixo, {
            desvioModo: 'sempre',
            desvioDestinoFixo: parseInt(resto, 10),
          });
        } else if (modo === '2') {
          merge(fixo, {
            desvioModo: 'ocupado',
            desvioDestinoFixo: parseInt(resto, 10),
          });
        } else if (modo === '4') {
          merge(fixo, { desvioModo: 'externo', desvioDestinoFixo: null });
        }
        break;
      }

      // "fisicoHex(4) + '0' + digito(1) + c"  (CommandEfeProgRamalTipoToque)
      case ProgramacaoPABX.PROG_RAMAL_TOQUES: {
        const fixo = parseInt(s.slice(0, 4), 16) + 200;
        const code = parseInt(semTerminador(s.slice(4, 6)), 10); // "0X" -> X
        if (Number.isFinite(code)) {
          merge(fixo, { toqueByte: Math.max(0, code - 1) });
        }
        break;
      }

      // PROG_RML_PORTEIRO, PROG_RML_CATEGORIA, senha... : só RES_OK, sem eco.
      default:
        break;
    }
  } catch {
    logger.warn(
      `[SIM][CENTRAL] EFE 0x${progByte.toString(16)} com payload estranho: ${s}`
    );
  }
}
