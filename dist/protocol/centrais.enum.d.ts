export declare enum CentraisHDL {
    NENHUM_PABX = 0,
    HDL4_12 = 16,
    HDL80p = 17,
    HDL128p = 18,
    HDL256p = 19,
    HDL368p = 20,
    HDL496p = 21,
    HDL744p = 22,
    HDL992p = 23,
    HDL412 = 32,
    HDL72p = 33,
    HDL152p = 34,
    HDL312p = 35,
    HDL32p = 36,
    HDL28 = 37,
    HDL48p = 38
}
/**
 * ATENÇÃO: alguns modelos e o número de ramais correspondentes não foram conferido contra o manual de - apenas inferidos pelo nome
 * Testar apenas os modelos que forem utilizados, e caso algum modelo não esteja correto, favor reportar para correção.
 * TODO: Investigar a utilização de gabinetes nos casos para número de ramais a partir da HDL368P.
 */
export declare const CAPACIDADE_RAMAIS_POR_MODELO: Record<CentraisHDL, number | null>;
export declare const getRamaisCapacidadeFromByte: (byte: number) => number | null;
export declare const getCentralNameFromByte: (byte: number) => string;
