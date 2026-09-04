/**
 * Um passo de cenário: um frame que a central simulada "fala" `emMs`
 * milissegundos depois do início do cenário.
 */
export interface PassoCenario {
    emMs: number;
    frame: number[];
}
/** Quadro "destino tocando, chamado por origem". */
export declare function frameLigacaoToca(origemFixo: number, destinoFixo: number): number[];
/** Quadro "destino em conversa com origem" (chamada atendida). */
export declare function frameLigacaoConversa(origemFixo: number, destinoFixo: number): number[];
/** Quadro "destino desocupado" (chamada encerrada). */
export declare function frameLigacaoDesliga(destinoFixo: number): number[];
export declare function cenarioLigacao(origemFixo?: number, destinoFixo?: number, atende?: boolean, duracaoSeg?: number): PassoCenario[];
/**
 * Acionamento de fechadura durante uma chamada com o porteiro (o morador
 * disca `*1` / `*2` / `*3`). Um quadro INFO_DISCAGEM_TDI com FUNC_PORTEIRO,
 * como o acesso pelo porteiro; `fechadura` (1 = fech.1, 2 = fech.2, 3 = ambas)
 * vai no byte de sub-estado.
 *
 * NOTA: o byte de sub-estado por fechadura é um palpite — confirmar com um
 * `serial.log` real de `*1`/`*2`/`*3`.
 */
export declare function cenarioAcionamentoFechadura(porteiroFixo?: number, ramalFixo?: number, fechadura?: 1 | 2 | 3): PassoCenario[];
/**
 * Acesso liberado pelo porteiro — um único quadro INFO_DISCAGEM_TDI. Gera um
 * evento ACESSO_PORTEIRO e alimenta o Histórico de Acesso.
 */
export declare function cenarioAcessoPorteiro(porteiroFixo?: number, ramalFixo?: number): PassoCenario[];
/**
 * Acesso liberado por SENHA CORRETA no porteiro (FUNC_ACESSO + byte 10 = 0xBB).
 * O `discagem.handler.ts` marca o evento como `senha_correta`.
 */
export declare function cenarioAcessoSenha(porteiroFixo?: number, ramalFixo?: number): PassoCenario[];
/**
 * Alerta (FUNC_ALERTA). `ativado` controla o nibble alto do byte 10:
 * 0 = ativado, !=0 = desativado (ver discagem.handler.ts).
 */
export declare function cenarioAlerta(zonaFixo?: number, ativado?: boolean): PassoCenario[];
/**
 * Alarme (FUNC_ALARME). `disparado` controla o nibble alto do byte 10:
 * 3 = disparado, !=3 = normalizado.
 */
export declare function cenarioAlarme(zonaFixo?: number, disparado?: boolean): PassoCenario[];
/** Descrição enxuta de um ramal para o dump de "Receber programações". */
export interface RamalSimulado {
    fixo: number;
    flexivel?: number;
    porteiro?: boolean;
}
/** Config do dump de "Receber programações" (ver runtime.ts). */
export interface ConfigDump {
    qtdRamais: number;
    ramalInicial: number;
    qtdPorteiros: number;
    troncos: number;
    senhaProgramador: number;
}
/** Monta a lista de ramais do dump a partir da config. */
export declare function ramaisDoDump(cfg: ConfigDump): RamalSimulado[];
/**
 * Resposta ao SOL_PROGRAMACAO: um dump mínimo mas COMPLETO o suficiente para o
 * modal concluir e o "Salvar" popular o banco — PROG_RML_CATEGORIA por ramal,
 * PROG_CONFIGURACAO e o PROG_FIM.
 *
 * Não é o retrato fiel da central (interfones, categorias, rotas... ficam nos
 * defaults). Para fidelidade total, replay de um `serial.log` real — ver
 * SIMULADOR.md.
 */
/**
 * "Receber programações" a partir do dump REAL capturado de uma HDL32p física
 * (`capturas-reais.ts`). É um retrato ESTÁTICO da central no momento da captura:
 * não aplica os overrides de "Enviar". O chamador (central-simulator.ts) só
 * escolhe este caminho quando o modelo é HDL32p e não há override pendente —
 * caso contrário cai no dump sintético, que reflete as edições.
 */
export declare function cenarioReceberReal(): PassoCenario[];
export declare function cenarioReceberProgramacoes(cfg?: ConfigDump): PassoCenario[];
