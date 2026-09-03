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
export declare function limparProgEstado(): void;
export declare function getRamalOverrides(): Map<number, RamalOverride>;
/**
 * Aplica um `EFE_PROGRAMACAO` / `EFE_PROG_RML`. `progByte` = 1º byte de dados
 * (o tipo de programação); `payload` = o resto (o miolo BCD, com 0xFF no fim).
 */
export declare function aplicarEfe(progByte: number, payload: number[]): void;
