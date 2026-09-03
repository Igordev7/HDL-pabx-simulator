export var InfoRespostaPABX;
(function (InfoRespostaPABX) {
    InfoRespostaPABX[InfoRespostaPABX["RES_NOK"] = 0] = "RES_NOK";
    InfoRespostaPABX[InfoRespostaPABX["RES_OK"] = 1] = "RES_OK";
    InfoRespostaPABX[InfoRespostaPABX["RES_ERRO"] = 2] = "RES_ERRO";
    InfoRespostaPABX[InfoRespostaPABX["RES_NENTENDI"] = 3] = "RES_NENTENDI";
})(InfoRespostaPABX || (InfoRespostaPABX = {}));
export const getInfoRespostaNameFromByte = (byte) => {
    switch (byte) {
        case InfoRespostaPABX.RES_NOK:
            return 'RES_NOK';
        case InfoRespostaPABX.RES_OK:
            return 'RES_OK';
        case InfoRespostaPABX.RES_ERRO:
            return 'RES_ERRO';
        case InfoRespostaPABX.RES_NENTENDI:
            return 'RES_NENTENDI';
        default:
            return 'RES_UNKNOWN';
    }
};
//# sourceMappingURL=info-resposta.enum.js.map