/**
 * Frames REAIS capturados de uma central HDL32p física (firmware V5.2.4, prog
 * nível 3), via o assistente CAPTURA-FASE-B do CTI2. Substituem os equivalentes
 * sintéticos onde a captura ficou limpa.
 *
 * Cada array é o frame INTEIRO — `0xFA`, LEN, comando, dados e os 2 bytes de
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
export declare const RES_IDENTIF_HDL32P: readonly number[];
/**
 * Heartbeat espontâneo que a central solta sozinha ~a cada 10s, além do relógio
 * (INFO_RAMAL_TDI_2, comando 0x00 — o firmware alterna 0x96 com 0x00 durante o
 * registro de chamadas). O contador interno (`0f cf c1`) fica congelado nesta
 * amostra; é um frame válido, só não avança.
 */
export declare const STATUS_HEARTBEAT_HDL32P: readonly number[];
/**
 * Dump completo de "Receber programações": a resposta real da HDL32p ao
 * SOL_PROGRAMACAO, do `91 01` (INF_PROG_CENTRAL) ao `91 fe` (PROG_FIM),
 * passando por `91 30` (categoria por ramal), `91 44` (desvios), `91 51`,
 * `91 61`, `91 73`, `91 70..76`, `91 80/90/92/93/94`, `91 0a/0b`,
 * `91 99/98`. 96 frames.
 *
 * É um retrato ESTÁTICO da central no momento da captura — não reflete os
 * overrides de "Enviar". Quando há overrides pendentes, o simulador cai no dump
 * sintético (que os aplica). Ver central-simulator.ts.
 */
export declare const RECEBER_HDL32P: readonly (readonly number[])[];
