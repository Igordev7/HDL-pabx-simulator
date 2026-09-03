import { readFileSync } from 'fs';
import { validateFrame } from '../protocol/frame.js';
import { ComandosPABX } from '../protocol/comandos.enum.js';
import { logger } from '../logger.js';
/**
 * Extrai frames de um `serial.log` capturado. Cada linha "PRODUTO -> fa .."
 * (ou só uma sequência de bytes hex começando por `fa`) vira um frame.
 * Mantém só os `INF_PROGRAMACAO` (0x91) íntegros — é o que o "Receber" precisa.
 */
export function lerFramesDaCaptura(caminho) {
    let texto;
    try {
        texto = readFileSync(caminho, 'utf8');
    }
    catch (err) {
        logger.warn(`[SIM][REPLAY] Não consegui ler "${caminho}": ${err.message}`);
        return [];
    }
    const frames = [];
    for (const linha of texto.split(/\r?\n/)) {
        // pega a última ocorrência de "fa <hex...>" na linha
        const m = linha.match(/\bfa(?:\s+[0-9a-fA-F]{2})+\s*$/);
        const alvo = m ? m[0] : linha.includes('->') ? linha.split('->').pop() : '';
        const bytes = alvo
            .trim()
            .split(/\s+/)
            .map((h) => parseInt(h, 16))
            .filter((n) => Number.isInteger(n) && n >= 0 && n <= 0xff);
        if (bytes.length < 5 || bytes[0] !== 0xfa) {
            continue;
        }
        if (bytes[2] !== ComandosPABX.INF_PROGRAMACAO) {
            continue;
        }
        if (validateFrame(bytes) !== null) {
            continue;
        }
        frames.push(bytes);
    }
    return frames;
}
/**
 * Cenário de "Receber" a partir de uma captura real. `null` se o arquivo não
 * rende nenhum frame utilizável (o chamador cai no dump sintético).
 */
export function cenarioReplayCaptura(caminho) {
    const frames = lerFramesDaCaptura(caminho);
    if (frames.length === 0) {
        return null;
    }
    const temFim = frames.some((f) => f[3] === 0xfe); // PROG_FIM
    const passos = frames.map((frame, i) => ({
        emMs: 200 + i * 30,
        frame,
    }));
    if (!temFim) {
        // garante o encerramento do modal mesmo se a captura não incluiu o PROG_FIM
        passos.push({
            emMs: 200 + frames.length * 30,
            frame: [0xfa, 0x07, 0x91, 0xfe, 0x00, 0xf8, 0x74],
        });
    }
    logger.info(`[SIM][REPLAY] ${frames.length} frames de programação da captura "${caminho}".`);
    return passos;
}
//# sourceMappingURL=replay.js.map