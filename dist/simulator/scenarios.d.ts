/**
 * Um passo de cenário: um frame que a central simulada "fala" `emMs`
 * milissegundos depois do início do cenário.
 */
export interface PassoCenario {
    emMs: number;
    frame: number[];
}
/**
 * Ligação interna: toca -> (atende) -> desliga. Gera um registro no Histórico
 * de Chamadas e acende/apaga um enlace.
 *
 * IMPORTANTE: `origemFixo` e `destinoFixo` precisam ser ramais que EXISTEM no
 * cadastro — senão o `ChamadaService` trata como "linha externa" e não grava.
 *
 * @param atende      `true` = chamada atendida (com duração de conversa);
 *                    `false` = não atendida (só toca e cai).
 * @param duracaoSeg  atendida: tempo de conversa; não atendida: tempo tocando.
 */
export declare function cenarioLigacao(origemFixo?: number, destinoFixo?: number, atende?: boolean, duracaoSeg?: number): PassoCenario[];
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
export declare function cenarioReceberProgramacoes(cfg?: ConfigDump): PassoCenario[];
