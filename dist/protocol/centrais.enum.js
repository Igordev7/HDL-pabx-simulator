export var CentraisHDL;
(function (CentraisHDL) {
    CentraisHDL[CentraisHDL["NENHUM_PABX"] = 0] = "NENHUM_PABX";
    // centrais hdl
    CentraisHDL[CentraisHDL["HDL4_12"] = 16] = "HDL4_12";
    CentraisHDL[CentraisHDL["HDL80p"] = 17] = "HDL80p";
    CentraisHDL[CentraisHDL["HDL128p"] = 18] = "HDL128p";
    CentraisHDL[CentraisHDL["HDL256p"] = 19] = "HDL256p";
    CentraisHDL[CentraisHDL["HDL368p"] = 20] = "HDL368p";
    CentraisHDL[CentraisHDL["HDL496p"] = 21] = "HDL496p";
    CentraisHDL[CentraisHDL["HDL744p"] = 22] = "HDL744p";
    CentraisHDL[CentraisHDL["HDL992p"] = 23] = "HDL992p";
    // novas centrais hdl
    CentraisHDL[CentraisHDL["HDL412"] = 32] = "HDL412";
    CentraisHDL[CentraisHDL["HDL72p"] = 33] = "HDL72p";
    CentraisHDL[CentraisHDL["HDL152p"] = 34] = "HDL152p";
    CentraisHDL[CentraisHDL["HDL312p"] = 35] = "HDL312p";
    CentraisHDL[CentraisHDL["HDL32p"] = 36] = "HDL32p";
    CentraisHDL[CentraisHDL["HDL28"] = 37] = "HDL28";
    CentraisHDL[CentraisHDL["HDL48p"] = 38] = "HDL48p";
})(CentraisHDL || (CentraisHDL = {}));
/**
 * ATENÇÃO: alguns modelos e o número de ramais correspondentes não foram conferido contra o manual de - apenas inferidos pelo nome
 * Testar apenas os modelos que forem utilizados, e caso algum modelo não esteja correto, favor reportar para correção.
 * TODO: Investigar a utilização de gabinetes nos casos para número de ramais a partir da HDL368P.
 */
export const CAPACIDADE_RAMAIS_POR_MODELO = {
    [CentraisHDL.NENHUM_PABX]: null,
    [CentraisHDL.HDL4_12]: 12,
    [CentraisHDL.HDL80p]: 80,
    [CentraisHDL.HDL128p]: 128,
    [CentraisHDL.HDL256p]: 256,
    [CentraisHDL.HDL368p]: 368,
    [CentraisHDL.HDL496p]: 496,
    [CentraisHDL.HDL744p]: 744,
    [CentraisHDL.HDL992p]: 992,
    [CentraisHDL.HDL412]: 12,
    [CentraisHDL.HDL72p]: 72,
    [CentraisHDL.HDL152p]: 152,
    [CentraisHDL.HDL312p]: 312,
    [CentraisHDL.HDL32p]: 32,
    [CentraisHDL.HDL28]: 8,
    [CentraisHDL.HDL48p]: 48,
};
export const getRamaisCapacidadeFromByte = (byte) => {
    return CAPACIDADE_RAMAIS_POR_MODELO[byte] ?? null;
};
export const getCentralNameFromByte = (byte) => {
    switch (byte) {
        case CentraisHDL.HDL4_12:
            return 'HDL4_12';
        case CentraisHDL.HDL80p:
            return 'HDL80p';
        case CentraisHDL.HDL128p:
            return 'HDL128p';
        case CentraisHDL.HDL256p:
            return 'HDL256p';
        case CentraisHDL.HDL368p:
            return 'HDL368p';
        case CentraisHDL.HDL496p:
            return 'HDL496p';
        case CentraisHDL.HDL744p:
            return 'HDL744p';
        case CentraisHDL.HDL992p:
            return 'HDL992p';
        case CentraisHDL.HDL412:
            return 'HDL412';
        case CentraisHDL.HDL72p:
            return 'HDL72p';
        case CentraisHDL.HDL152p:
            return 'HDL152p';
        case CentraisHDL.HDL312p:
            return 'HDL312p';
        case CentraisHDL.HDL32p:
            return 'HDL32p';
        case CentraisHDL.HDL28:
            return 'HDL28';
        case CentraisHDL.HDL48p:
            return 'HDL48p';
        default:
            return 'Unknown';
    }
};
//# sourceMappingURL=centrais.enum.js.map