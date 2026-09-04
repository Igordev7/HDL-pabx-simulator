// Regenera src/simulator/capturas-reais.ts a partir de uma captura de serial da
// central real (o CAPTURA-FASE-B.saida.md do CTI2, ou qualquer serial.log).
//
//   node scripts/gerar-capturas-reais.mjs <caminho-da-captura>
//
// Extrai o dump de "Receber programações": o bloco de frames INF_PROGRAMACAO
// (0x91) de `91 01` (INF_PROG_CENTRAL) até `91 fe` (PROG_FIM). RES_IDENTIF e o
// heartbeat continuam fixos no arquivo gerado (raramente mudam) — ajuste à mão
// se trocar de firmware.
import { readFileSync, writeFileSync } from 'node:fs';

const entrada = process.argv[2];
if (!entrada) {
  console.error('uso: node scripts/gerar-capturas-reais.mjs <captura.md|serial.log>');
  process.exit(1);
}

// ckCRC_HDL — cópia de src/protocol/crc.ts.
function ckCRC_HDL(bytes) {
  let liCheck = 0;
  for (let i = 0; i < bytes.length; i++) {
    const lbb = bytes[i];
    const c = i % 256;
    liCheck += lbb + (lbb ^ c) + (lbb ^ (~c & 0xff));
  }
  return ~(liCheck % 65536) & 0xffff;
}
const frameOk = (f) => {
  if (f[0] !== 0xfa || f.length < 5 || f[1] !== f.length) return false;
  const c = ckCRC_HDL(f.slice(0, -2));
  return ((c >> 8) & 0xff) === f[f.length - 2] && (c & 0xff) === f[f.length - 1];
};

const fmt = (a) =>
  '[' + a.map((b) => '0x' + b.toString(16).padStart(2, '0')).join(', ') + ']';

// pega, por linha, o último "fa <hex> <hex> ..." — cobre tanto
// "17:03:24: PRODUTO -> fa .." quanto uma linha só de bytes.
const todos = [];
for (const linha of readFileSync(entrada, 'utf8').split(/\r?\n/)) {
  const m = linha.match(/fa(?:\s+[0-9a-fA-F]{2})+\s*$/);
  if (!m) continue;
  const f = m[0].trim().split(/\s+/).map((h) => parseInt(h, 16));
  if (frameOk(f)) todos.push(f);
}

const prog = todos.filter((f) => f[2] === 0x91);
const ini = prog.findIndex((f) => f[3] === 0x01);
const fim = prog.findIndex((f, i) => i >= ini && f[3] === 0xfe);
if (ini < 0 || fim < 0) {
  console.error('não achei um dump 0x91 completo (de 91 01 a 91 fe) na captura.');
  process.exit(1);
}
const dump = prog.slice(ini, fim + 1);
console.log(`${dump.length} frames de dump (91 01 .. 91 fe).`);

const corpo = dump.map((f) => '  ' + fmt(f) + ',').join('\n');

const ts = `/**
 * Frames REAIS capturados de uma central HDL32p física (firmware V5.2.4, prog
 * nível 3), via o assistente CAPTURA-FASE-B do CTI2. Substituem os equivalentes
 * sintéticos onde a captura ficou limpa.
 *
 * Cada array é o frame INTEIRO — \`0xFA\`, LEN, comando, dados e os 2 bytes de
 * CRC "HDL". Nada é remontado em runtime: são exatamente os bytes que a central
 * mandou pela serial. Conferidos por capturas-reais.test.ts.
 *
 * NÃO EDITAR À MÃO — regenerar com scripts/gerar-capturas-reais.mjs.
 */

/**
 * RES_IDENTIF (0x81) real da HDL32p: modelo novo 0x24 (HDL32p), CTI suportado,
 * versão de programações 3. O builder sintético só preenche modelo + flags; este
 * traz os bytes de versão/build que o firmware realmente devolve.
 */
export const RES_IDENTIF_HDL32P: readonly number[] = [
  0xfa, 0x13, 0x81, 0x12, 0x05, 0x18, 0x20, 0x00, 0x12, 0x00, 0x03, 0x01, 0x24,
  0x63, 0x00, 0x00, 0xff, 0xeb, 0x97,
];

/**
 * Heartbeat espontâneo que a central solta sozinha ~a cada 10s, além do relógio
 * (INFO_RAMAL_TDI_2, comando 0x00 — o firmware alterna 0x96 com 0x00 durante o
 * registro de chamadas). O contador interno (\`0f cf c1\`) fica congelado nesta
 * amostra; é um frame válido, só não avança.
 */
export const STATUS_HEARTBEAT_HDL32P: readonly number[] = [
  0xfa, 0x16, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00,
  0x0f, 0xcf, 0xc1, 0xff, 0xff, 0xff, 0xff, 0xdf, 0x6e,
];

/**
 * Dump completo de "Receber programações": a resposta real da HDL32p ao
 * SOL_PROGRAMACAO, do \`91 01\` (INF_PROG_CENTRAL) ao \`91 fe\` (PROG_FIM),
 * passando por \`91 30\` (categoria por ramal), \`91 44\` (desvios), \`91 51\`,
 * \`91 61\`, \`91 73\`, \`91 70..76\`, \`91 80/90/92/93/94\`, \`91 0a/0b\`,
 * \`91 99/98\`. ${dump.length} frames.
 *
 * É um retrato ESTÁTICO da central no momento da captura — não reflete os
 * overrides de "Enviar". Quando há overrides pendentes, o simulador cai no dump
 * sintético (que os aplica). Ver central-simulator.ts.
 */
export const RECEBER_HDL32P: readonly (readonly number[])[] = [
${corpo}
];
`;

writeFileSync('src/simulator/capturas-reais.ts', ts);
console.log('src/simulator/capturas-reais.ts regenerado.');
