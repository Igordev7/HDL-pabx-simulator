import { describe, it, expect, vi } from 'vitest';
import { writeFileSync, mkdtempSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { lerFramesDaCaptura, cenarioReplayCaptura } from './replay.js';
import { buildFrame } from '../protocol/frame.js';
import { ComandosPABX } from '../protocol/comandos.enum.js';
import { ProgramacaoPABX } from '../protocol/programacao.enum.js';

vi.mock('../logger.js', () => ({
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

function arqTmp(conteudo: string): string {
  const dir = mkdtempSync(join(tmpdir(), 'sim-replay-'));
  const p = join(dir, 'serial.log');
  writeFileSync(p, conteudo, 'utf8');
  return p;
}

const hex = (b: number[]) =>
  b.map((x) => x.toString(16).padStart(2, '0')).join(' ');

describe('replay de captura', () => {
  it('extrai só os frames INF_PROGRAMACAO (0x91) íntegros de um serial.log', () => {
    const cat = buildFrame(ComandosPABX.INF_PROGRAMACAO, [
      ProgramacaoPABX.PROG_RML_CATEGORIA,
      ...new Array(43).fill(0),
    ]);
    const fim = buildFrame(ComandosPABX.INF_PROGRAMACAO, [
      ProgramacaoPABX.PROG_FIM,
    ]);
    const ramalTdi = buildFrame(ComandosPABX.INFO_RAMAL_TDI, [0, 0, 0]);

    const log = [
      `08:46:48:167: PRODUTO -> ${hex(cat)}`,
      `08:46:48:200: CTI -> fa 06 90 00 fa 73`, // comando do CTI, ignora
      `[2026-08-31 08:46:48][info]: [MSG] cmd: INFO_RAMAL_TDI: ${hex(ramalTdi)}`, // 0x96, ignora
      `lixo aleatório sem hex`,
      `08:46:50:833: PRODUTO -> ${hex(fim)}`,
    ].join('\n');

    const frames = lerFramesDaCaptura(arqTmp(log));
    expect(frames).toHaveLength(2);
    expect(frames[0][2]).toBe(ComandosPABX.INF_PROGRAMACAO);
    expect(frames[0][3]).toBe(ProgramacaoPABX.PROG_RML_CATEGORIA);
    expect(frames[1][3]).toBe(ProgramacaoPABX.PROG_FIM);
  });

  it('cenarioReplayCaptura devolve passos cronológicos; null se o arquivo não rende nada', () => {
    expect(cenarioReplayCaptura(arqTmp('nada aqui'))).toBeNull();

    const fim = buildFrame(ComandosPABX.INF_PROGRAMACAO, [
      ProgramacaoPABX.PROG_FIM,
    ]);
    const passos = cenarioReplayCaptura(arqTmp(`PRODUTO -> ${hex(fim)}`));
    expect(passos).not.toBeNull();
    expect(passos![0].frame[3]).toBe(ProgramacaoPABX.PROG_FIM);
  });

  it('acrescenta um PROG_FIM se a captura não tiver', () => {
    const cat = buildFrame(ComandosPABX.INF_PROGRAMACAO, [
      ProgramacaoPABX.PROG_CONFIGURACAO,
      ...new Array(28).fill(0),
    ]);
    const passos = cenarioReplayCaptura(arqTmp(`PRODUTO -> ${hex(cat)}`))!;
    expect(passos.at(-1)!.frame[3]).toBe(ProgramacaoPABX.PROG_FIM);
  });
});
