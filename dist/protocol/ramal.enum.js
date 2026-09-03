export var RamalStatus;
(function (RamalStatus) {
    RamalStatus[RamalStatus["RML_DESOCUPADO"] = 0] = "RML_DESOCUPADO";
    RamalStatus[RamalStatus["RML_INATIVO"] = 1] = "RML_INATIVO";
    RamalStatus[RamalStatus["RML_ATIVO"] = 2] = "RML_ATIVO";
    RamalStatus[RamalStatus["RML_DISCAR"] = 3] = "RML_DISCAR";
    RamalStatus[RamalStatus["RML_INAPTO"] = 4] = "RML_INAPTO";
    RamalStatus[RamalStatus["RML_CHAMA_RML"] = 5] = "RML_CHAMA_RML";
    RamalStatus[RamalStatus["RML_CONV_INT"] = 6] = "RML_CONV_INT";
    RamalStatus[RamalStatus["RML_CONV_EXT"] = 7] = "RML_CONV_EXT";
    RamalStatus[RamalStatus["RML_DESOCUPAR"] = 8] = "RML_DESOCUPAR";
    RamalStatus[RamalStatus["RML_RINGANDO"] = 9] = "RML_RINGANDO";
    RamalStatus[RamalStatus["RML_RETIDO"] = 10] = "RML_RETIDO";
    RamalStatus[RamalStatus["RML_FLASH"] = 11] = "RML_FLASH";
    RamalStatus[RamalStatus["RML_TRANSFERIR"] = 12] = "RML_TRANSFERIR";
    RamalStatus[RamalStatus["RML_CONSULTA"] = 13] = "RML_CONSULTA";
    RamalStatus[RamalStatus["RML_CONSULTADO"] = 14] = "RML_CONSULTADO";
    RamalStatus[RamalStatus["RML_ESPERA"] = 15] = "RML_ESPERA";
    RamalStatus[RamalStatus["RML_CONFERENCIA"] = 16] = "RML_CONFERENCIA";
    RamalStatus[RamalStatus["RML_INAPTO_RECH"] = 17] = "RML_INAPTO_RECH";
    RamalStatus[RamalStatus["RML_INTERCALADO"] = 18] = "RML_INTERCALADO";
    RamalStatus[RamalStatus["RML_PROGRAMA"] = 19] = "RML_PROGRAMA";
    RamalStatus[RamalStatus["RML_DISC_TCO"] = 20] = "RML_DISC_TCO";
    RamalStatus[RamalStatus["RML_VOX"] = 21] = "RML_VOX";
    RamalStatus[RamalStatus["RML_RECHAMAR"] = 22] = "RML_RECHAMAR";
    RamalStatus[RamalStatus["RML_RECHAMANDO"] = 23] = "RML_RECHAMANDO";
    RamalStatus[RamalStatus["RML_INTERNET"] = 24] = "RML_INTERNET";
    RamalStatus[RamalStatus["RML_CONSULT_EXT"] = 25] = "RML_CONSULT_EXT";
    RamalStatus[RamalStatus["RML_AUDIO"] = 26] = "RML_AUDIO";
    RamalStatus[RamalStatus["RML_ULTIMO_EST"] = 27] = "RML_ULTIMO_EST";
    RamalStatus[RamalStatus["RML_SENSOR_PORTA"] = 28] = "RML_SENSOR_PORTA";
})(RamalStatus || (RamalStatus = {}));
export const getRamalStatusFromByte = (byte) => {
    switch (byte) {
        case RamalStatus.RML_DESOCUPADO: {
            return 'RML_DESOCUPADO';
        }
        case RamalStatus.RML_INATIVO: {
            return 'RML_INATIVO';
        }
        case RamalStatus.RML_ATIVO: {
            return 'RML_ATIVO';
        }
        case RamalStatus.RML_DISCAR: {
            return 'RML_DISCAR';
        }
        case RamalStatus.RML_INAPTO: {
            return 'RML_INAPTO';
        }
        case RamalStatus.RML_CHAMA_RML: {
            return 'RML_CHAMA_RML';
        }
        case RamalStatus.RML_CONV_INT: {
            return 'RML_CONV_INT';
        }
        case RamalStatus.RML_CONV_EXT: {
            return 'RML_CONV_EXT';
        }
        case RamalStatus.RML_DESOCUPAR: {
            return 'RML_DESOCUPAR';
        }
        case RamalStatus.RML_RINGANDO: {
            return 'RML_RINGANDO';
        }
        case RamalStatus.RML_RETIDO: {
            return 'RML_RETIDO';
        }
        case RamalStatus.RML_FLASH: {
            return 'RML_FLASH';
        }
        case RamalStatus.RML_TRANSFERIR: {
            return 'RML_TRANSFERIR';
        }
        case RamalStatus.RML_CONSULTA: {
            return 'RML_CONSULTA';
        }
        case RamalStatus.RML_CONSULTADO: {
            return 'RML_CONSULTADO';
        }
        case RamalStatus.RML_ESPERA: {
            return 'RML_ESPERA';
        }
        case RamalStatus.RML_CONFERENCIA: {
            return 'RML_CONFERENCIA';
        }
        case RamalStatus.RML_INAPTO_RECH: {
            return 'RML_INAPTO_RECH';
        }
        case RamalStatus.RML_INTERCALADO: {
            return 'RML_INTERCALADO';
        }
        case RamalStatus.RML_PROGRAMA: {
            return 'RML_PROGRAMA';
        }
        case RamalStatus.RML_DISC_TCO: {
            return 'RML_DISC_TCO';
        }
        case RamalStatus.RML_VOX: {
            return 'RML_VOX';
        }
        case RamalStatus.RML_RECHAMAR: {
            return 'RML_RECHAMAR';
        }
        case RamalStatus.RML_RECHAMANDO: {
            return 'RML_RECHAMANDO';
        }
        case RamalStatus.RML_INTERNET: {
            return 'RML_INTERNET';
        }
        case RamalStatus.RML_CONSULT_EXT: {
            return 'RML_CONSULT_EXT';
        }
        case RamalStatus.RML_AUDIO: {
            return 'RML_AUDIO';
        }
        case RamalStatus.RML_ULTIMO_EST: {
            return 'RML_ULTIMO_EST';
        }
        case RamalStatus.RML_SENSOR_PORTA: {
            return 'RML_SENSOR_PORTA';
        }
        default:
            return 'Unknown';
    }
};
//# sourceMappingURL=ramal.enum.js.map