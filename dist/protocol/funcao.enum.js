export var FuncaoPABX;
(function (FuncaoPABX) {
    // {Fun��es do Pabx}
    FuncaoPABX[FuncaoPABX["FUNC_EXTERNA"] = 0] = "FUNC_EXTERNA";
    FuncaoPABX[FuncaoPABX["FUNC_INTERNA"] = 1] = "FUNC_INTERNA";
    FuncaoPABX[FuncaoPABX["FUNC_INTERNA_FIXA"] = 2] = "FUNC_INTERNA_FIXA";
    FuncaoPABX[FuncaoPABX["FUNC_INTERNA_FLEXIVEL"] = 3] = "FUNC_INTERNA_FLEXIVEL";
    FuncaoPABX[FuncaoPABX["FUNC_FLASH"] = 4] = "FUNC_FLASH";
    FuncaoPABX[FuncaoPABX["FUNC_TRANSFERIR"] = 5] = "FUNC_TRANSFERIR";
    FuncaoPABX[FuncaoPABX["FUNC_TRANSF_FIXA"] = 6] = "FUNC_TRANSF_FIXA";
    FuncaoPABX[FuncaoPABX["FUNC_TRANSF_FLEXIVEL"] = 7] = "FUNC_TRANSF_FLEXIVEL";
    FuncaoPABX[FuncaoPABX["FUNC_TRANSF_ATENDEDOR"] = 8] = "FUNC_TRANSF_ATENDEDOR";
    FuncaoPABX[FuncaoPABX["FUNC_TRANSF_CHEFE_SEC"] = 9] = "FUNC_TRANSF_CHEFE_SEC";
    FuncaoPABX[FuncaoPABX["FUNC_TRANSF_PEGA_TROTE"] = 10] = "FUNC_TRANSF_PEGA_TROTE";
    FuncaoPABX[FuncaoPABX["FUNC_TRANSF_GRUPO"] = 11] = "FUNC_TRANSF_GRUPO";
    FuncaoPABX[FuncaoPABX["FUNC_RETORNO"] = 12] = "FUNC_RETORNO";
    FuncaoPABX[FuncaoPABX["FUNC_CONFERENCIA"] = 13] = "FUNC_CONFERENCIA";
    FuncaoPABX[FuncaoPABX["FUNC_CAPTURA_GERAL"] = 14] = "FUNC_CAPTURA_GERAL";
    FuncaoPABX[FuncaoPABX["FUNC_CAPTURA_FIXA"] = 15] = "FUNC_CAPTURA_FIXA";
    FuncaoPABX[FuncaoPABX["FUNC_CAPTURA_FLEXIVEL"] = 16] = "FUNC_CAPTURA_FLEXIVEL";
    FuncaoPABX[FuncaoPABX["FUNC_CAPTURA_ATENDEDOR"] = 17] = "FUNC_CAPTURA_ATENDEDOR";
    FuncaoPABX[FuncaoPABX["FUNC_CAPTURA_CHEFE_SEC"] = 18] = "FUNC_CAPTURA_CHEFE_SEC";
    FuncaoPABX[FuncaoPABX["FUNC_CAPTURA_GRUPO"] = 19] = "FUNC_CAPTURA_GRUPO";
    FuncaoPABX[FuncaoPABX["FUNC_ROTA_EXECUTIVA"] = 20] = "FUNC_ROTA_EXECUTIVA";
    FuncaoPABX[FuncaoPABX["FUNC_CHAMA_ATENDEDOR"] = 21] = "FUNC_CHAMA_ATENDEDOR";
    FuncaoPABX[FuncaoPABX["FUNC_CHEFE_SECRETARIA"] = 22] = "FUNC_CHEFE_SECRETARIA";
    FuncaoPABX[FuncaoPABX["FUNC_PEGA_TROTE"] = 23] = "FUNC_PEGA_TROTE";
    FuncaoPABX[FuncaoPABX["FUNC_GRUPO"] = 24] = "FUNC_GRUPO";
    FuncaoPABX[FuncaoPABX["FUNC_PENDULO_GERAL"] = 25] = "FUNC_PENDULO_GERAL";
    FuncaoPABX[FuncaoPABX["FUNC_PENDULO_FIXA"] = 26] = "FUNC_PENDULO_FIXA";
    FuncaoPABX[FuncaoPABX["FUNC_PENDULO_FLEXIVEL"] = 27] = "FUNC_PENDULO_FLEXIVEL";
    FuncaoPABX[FuncaoPABX["FUNC_PENDULO_ATENDEDOR"] = 28] = "FUNC_PENDULO_ATENDEDOR";
    FuncaoPABX[FuncaoPABX["FUNC_PENDULO_CHEFE_SEC"] = 29] = "FUNC_PENDULO_CHEFE_SEC";
    FuncaoPABX[FuncaoPABX["FUNC_PENDULO_GRUPO"] = 30] = "FUNC_PENDULO_GRUPO";
    FuncaoPABX[FuncaoPABX["FUNC_RETENCAO"] = 31] = "FUNC_RETENCAO";
    FuncaoPABX[FuncaoPABX["FUNC_CAPTURA_RETENCAO"] = 32] = "FUNC_CAPTURA_RETENCAO";
    FuncaoPABX[FuncaoPABX["FUNC_RECHAMADA"] = 33] = "FUNC_RECHAMADA";
    FuncaoPABX[FuncaoPABX["FUNC_MUTE"] = 34] = "FUNC_MUTE";
    FuncaoPABX[FuncaoPABX["FUNC_MEM_ULTIMO_NUMERO"] = 35] = "FUNC_MEM_ULTIMO_NUMERO";
    FuncaoPABX[FuncaoPABX["FUNC_INTERCALACAO"] = 36] = "FUNC_INTERCALACAO";
    FuncaoPABX[FuncaoPABX["FUNC_ROTA_ESPECIAL"] = 37] = "FUNC_ROTA_ESPECIAL";
    FuncaoPABX[FuncaoPABX["FUNC_SIGAME_FIXA"] = 38] = "FUNC_SIGAME_FIXA";
    FuncaoPABX[FuncaoPABX["FUNC_SIGAME_FLEXIVEL"] = 39] = "FUNC_SIGAME_FLEXIVEL";
    FuncaoPABX[FuncaoPABX["FUNC_PROGRAMA_RAMAL"] = 40] = "FUNC_PROGRAMA_RAMAL";
    FuncaoPABX[FuncaoPABX["FUNC_PROGRAMA_PABX"] = 41] = "FUNC_PROGRAMA_PABX";
    FuncaoPABX[FuncaoPABX["FUNC_PROG_RAMAL_TERC"] = 42] = "FUNC_PROG_RAMAL_TERC";
    FuncaoPABX[FuncaoPABX["FUNC_PROG_DISPOSITIVO"] = 43] = "FUNC_PROG_DISPOSITIVO";
    FuncaoPABX[FuncaoPABX["FUNC_PROGRAMA_AGENDA"] = 44] = "FUNC_PROGRAMA_AGENDA";
    FuncaoPABX[FuncaoPABX["FUNC_AGENDA"] = 45] = "FUNC_AGENDA";
    FuncaoPABX[FuncaoPABX["FUNC_ABRE_PORTEIRO"] = 46] = "FUNC_ABRE_PORTEIRO";
    FuncaoPABX[FuncaoPABX["FUNC_VOX"] = 47] = "FUNC_VOX";
    FuncaoPABX[FuncaoPABX["FUNC_ALERTA"] = 48] = "FUNC_ALERTA";
    FuncaoPABX[FuncaoPABX["FUNC_MONITORAR_AMBIENTE"] = 49] = "FUNC_MONITORAR_AMBIENTE";
    FuncaoPABX[FuncaoPABX["FUNC_TDI"] = 50] = "FUNC_TDI";
    FuncaoPABX[FuncaoPABX["FUNC_FLASH_EXTERNO"] = 51] = "FUNC_FLASH_EXTERNO";
    FuncaoPABX[FuncaoPABX["FUNC_PROG_RAMAL_ABREV"] = 52] = "FUNC_PROG_RAMAL_ABREV";
    FuncaoPABX[FuncaoPABX["FUNC_REFLASH"] = 53] = "FUNC_REFLASH";
    FuncaoPABX[FuncaoPABX["FUNC_BUSCA_TRONCO"] = 54] = "FUNC_BUSCA_TRONCO";
    FuncaoPABX[FuncaoPABX["FUNC_CONF_FLASH"] = 55] = "FUNC_CONF_FLASH";
    FuncaoPABX[FuncaoPABX["FUNC_DESPERTADOR"] = 56] = "FUNC_DESPERTADOR";
    FuncaoPABX[FuncaoPABX["FUNC_VIDEO1"] = 57] = "FUNC_VIDEO1";
    FuncaoPABX[FuncaoPABX["FUNC_VIDEO2"] = 58] = "FUNC_VIDEO2";
    FuncaoPABX[FuncaoPABX["FUNC_CHAMA_SINDICO"] = 59] = "FUNC_CHAMA_SINDICO";
    FuncaoPABX[FuncaoPABX["FUNC_USUARIO"] = 60] = "FUNC_USUARIO";
    FuncaoPABX[FuncaoPABX["FUNC_PONTO_ENTRADA"] = 61] = "FUNC_PONTO_ENTRADA";
    FuncaoPABX[FuncaoPABX["FUNC_PONTO_SAIDA"] = 62] = "FUNC_PONTO_SAIDA";
    FuncaoPABX[FuncaoPABX["FUNC_RONDA"] = 63] = "FUNC_RONDA";
    FuncaoPABX[FuncaoPABX["FUNC_ACESSO"] = 64] = "FUNC_ACESSO";
    FuncaoPABX[FuncaoPABX["FUNC_CONSUMO"] = 65] = "FUNC_CONSUMO";
    FuncaoPABX[FuncaoPABX["FUNC_CONSULT_EXT"] = 66] = "FUNC_CONSULT_EXT";
    FuncaoPABX[FuncaoPABX["FUNC_NOTURNO"] = 67] = "FUNC_NOTURNO";
    FuncaoPABX[FuncaoPABX["FUNC_ALARME"] = 68] = "FUNC_ALARME";
    FuncaoPABX[FuncaoPABX["FUNC_ABRE_COM_SENHA"] = 69] = "FUNC_ABRE_COM_SENHA";
    FuncaoPABX[FuncaoPABX["FUNC_PORTEIRO"] = 70] = "FUNC_PORTEIRO";
    FuncaoPABX[FuncaoPABX["FUNC_EXTENSAO"] = 71] = "FUNC_EXTENSAO";
    FuncaoPABX[FuncaoPABX["FUNC_TESTE_TEC"] = 72] = "FUNC_TESTE_TEC";
    FuncaoPABX[FuncaoPABX["FUNC_MUSICA"] = 73] = "FUNC_MUSICA";
    FuncaoPABX[FuncaoPABX["FUNC_ALTA_VOZ"] = 74] = "FUNC_ALTA_VOZ";
    FuncaoPABX[FuncaoPABX["FUNC_ATUADOR"] = 75] = "FUNC_ATUADOR";
    FuncaoPABX[FuncaoPABX["FUNC_BATE_PAPO"] = 76] = "FUNC_BATE_PAPO";
    FuncaoPABX[FuncaoPABX["FUNC_ARMAR_ALA"] = 77] = "FUNC_ARMAR_ALA";
    FuncaoPABX[FuncaoPABX["FUNC_ABRE_COM_TAG"] = 87] = "FUNC_ABRE_COM_TAG";
    FuncaoPABX[FuncaoPABX["FUNC_SENSOR_PORTA"] = 88] = "FUNC_SENSOR_PORTA";
    FuncaoPABX[FuncaoPABX["FUNC_ULTIMA"] = 78] = "FUNC_ULTIMA";
    // Fun��es n�o discadas
    FuncaoPABX[FuncaoPABX["FUNC_HOTLINE"] = 128] = "FUNC_HOTLINE";
    FuncaoPABX[FuncaoPABX["FUNC_SIGAME_EXT"] = 129] = "FUNC_SIGAME_EXT";
    FuncaoPABX[FuncaoPABX["FUNC_CALL_BACK"] = 130] = "FUNC_CALL_BACK";
    FuncaoPABX[FuncaoPABX["FUNC_CONFIRMA"] = 131] = "FUNC_CONFIRMA";
    FuncaoPABX[FuncaoPABX["FUNC_DIFUSAO"] = 132] = "FUNC_DIFUSAO";
    FuncaoPABX[FuncaoPABX["FUNC_XAL"] = 133] = "FUNC_XAL";
    FuncaoPABX[FuncaoPABX["FUNC_VOICE_MAIL"] = 134] = "FUNC_VOICE_MAIL";
    FuncaoPABX[FuncaoPABX["FUNC_ENTRANTE"] = 252] = "FUNC_ENTRANTE";
    FuncaoPABX[FuncaoPABX["FUNC_PARCIAL"] = 253] = "FUNC_PARCIAL";
    FuncaoPABX[FuncaoPABX["FUNC_INVALIDA"] = 254] = "FUNC_INVALIDA";
    FuncaoPABX[FuncaoPABX["FUNC_NENHUMA"] = 255] = "FUNC_NENHUMA";
})(FuncaoPABX || (FuncaoPABX = {}));
export const getFuncaoPABXFromByte = (byte) => {
    switch (byte) {
        case FuncaoPABX.FUNC_EXTERNA:
            return 'FUNC_EXTERNA';
        case FuncaoPABX.FUNC_INTERNA:
            return 'FUNC_INTERNA';
        case FuncaoPABX.FUNC_INTERNA_FIXA:
            return 'FUNC_INTERNA_FIXA';
        case FuncaoPABX.FUNC_INTERNA_FLEXIVEL:
            return 'FUNC_INTERNA_FLEXIVEL';
        case FuncaoPABX.FUNC_FLASH:
            return 'FUNC_FLASH';
        case FuncaoPABX.FUNC_TRANSFERIR:
            return 'FUNC_TRANSFERIR';
        case FuncaoPABX.FUNC_TRANSF_FIXA:
            return 'FUNC_TRANSF_FIXA';
        case FuncaoPABX.FUNC_TRANSF_FLEXIVEL:
            return 'FUNC_TRANSF_FLEXIVEL';
        case FuncaoPABX.FUNC_TRANSF_ATENDEDOR:
            return 'FUNC_TRANSF_ATENDEDOR';
        case FuncaoPABX.FUNC_TRANSF_CHEFE_SEC:
            return 'FUNC_TRANSF_CHEFE_SEC';
        case FuncaoPABX.FUNC_TRANSF_PEGA_TROTE:
            return 'FUNC_TRANSF_PEGA_TROTE';
        case FuncaoPABX.FUNC_TRANSF_GRUPO:
            return 'FUNC_TRANSF_GRUPO';
        case FuncaoPABX.FUNC_RETORNO:
            return 'FUNC_RETORNO';
        case FuncaoPABX.FUNC_CONFERENCIA:
            return 'FUNC_CONFERENCIA';
        case FuncaoPABX.FUNC_CAPTURA_GERAL:
            return 'FUNC_CAPTURA_GERAL';
        case FuncaoPABX.FUNC_CAPTURA_FIXA:
            return 'FUNC_CAPTURA_FIXA';
        case FuncaoPABX.FUNC_CAPTURA_FLEXIVEL:
            return 'FUNC_CAPTURA_FLEXIVEL';
        case FuncaoPABX.FUNC_CAPTURA_ATENDEDOR:
            return 'FUNC_CAPTURA_ATENDEDOR';
        case FuncaoPABX.FUNC_CAPTURA_CHEFE_SEC:
            return 'FUNC_CAPTURA_CHEFE_SEC';
        case FuncaoPABX.FUNC_CAPTURA_GRUPO:
            return 'FUNC_CAPTURA_GRUPO';
        case FuncaoPABX.FUNC_ROTA_EXECUTIVA:
            return 'FUNC_ROTA_EXECUTIVA';
        case FuncaoPABX.FUNC_CHAMA_ATENDEDOR:
            return 'FUNC_CHAMA_ATENDEDOR';
        case FuncaoPABX.FUNC_CHEFE_SECRETARIA:
            return 'FUNC_CHEFE_SECRETARIA';
        case FuncaoPABX.FUNC_PEGA_TROTE:
            return 'FUNC_PEGA_TROTE';
        case FuncaoPABX.FUNC_GRUPO:
            return 'FUNC_GRUPO';
        case FuncaoPABX.FUNC_PENDULO_GERAL:
            return 'FUNC_PENDULO_GERAL';
        case FuncaoPABX.FUNC_PENDULO_FIXA:
            return 'FUNC_PENDULO_FIXA';
        case FuncaoPABX.FUNC_PENDULO_FLEXIVEL:
            return 'FUNC_PENDULO_FLEXIVEL';
        case FuncaoPABX.FUNC_PENDULO_ATENDEDOR:
            return 'FUNC_PENDULO_ATENDEDOR';
        case FuncaoPABX.FUNC_PENDULO_CHEFE_SEC:
            return 'FUNC_PENDULO_CHEFE_SEC';
        case FuncaoPABX.FUNC_PENDULO_GRUPO:
            return 'FUNC_PENDULO_GRUPO';
        case FuncaoPABX.FUNC_RETENCAO:
            return 'FUNC_RETENCAO';
        case FuncaoPABX.FUNC_CAPTURA_RETENCAO:
            return 'FUNC_CAPTURA_RETENCAO';
        case FuncaoPABX.FUNC_RECHAMADA:
            return 'FUNC_RECHAMADA';
        case FuncaoPABX.FUNC_MUTE:
            return 'FUNC_MUTE';
        case FuncaoPABX.FUNC_MEM_ULTIMO_NUMERO:
            return 'FUNC_MEM_ULTIMO_NUMERO';
        case FuncaoPABX.FUNC_INTERCALACAO:
            return 'FUNC_INTERCALACAO';
        case FuncaoPABX.FUNC_ROTA_ESPECIAL:
            return 'FUNC_ROTA_ESPECIAL';
        case FuncaoPABX.FUNC_SIGAME_FIXA:
            return 'FUNC_SIGAME_FIXA';
        case FuncaoPABX.FUNC_SIGAME_FLEXIVEL:
            return 'FUNC_SIGAME_FLEXIVEL';
        case FuncaoPABX.FUNC_PROGRAMA_RAMAL:
            return 'FUNC_PROGRAMA_RAMAL';
        case FuncaoPABX.FUNC_PROGRAMA_PABX:
            return 'FUNC_PROGRAMA_PABX';
        case FuncaoPABX.FUNC_PROG_RAMAL_TERC:
            return 'FUNC_PROG_RAMAL_TERC';
        case FuncaoPABX.FUNC_PROG_DISPOSITIVO:
            return 'FUNC_PROG_DISPOSITIVO';
        case FuncaoPABX.FUNC_PROGRAMA_AGENDA:
            return 'FUNC_PROGRAMA_AGENDA';
        case FuncaoPABX.FUNC_AGENDA:
            return 'FUNC_AGENDA';
        case FuncaoPABX.FUNC_ABRE_PORTEIRO:
            return 'FUNC_ABRE_PORTEIRO';
        case FuncaoPABX.FUNC_VOX:
            return 'FUNC_VOX';
        case FuncaoPABX.FUNC_ALERTA:
            return 'FUNC_ALERTA';
        case FuncaoPABX.FUNC_MONITORAR_AMBIENTE:
            return 'FUNC_MONITORAR_AMBIENTE';
        case FuncaoPABX.FUNC_TDI:
            return 'FUNC_TDI';
        case FuncaoPABX.FUNC_FLASH_EXTERNO:
            return 'FUNC_FLASH_EXTERNO';
        case FuncaoPABX.FUNC_PROG_RAMAL_ABREV:
            return 'FUNC_PROG_RAMAL_ABREV';
        case FuncaoPABX.FUNC_REFLASH:
            return 'FUNC_REFLASH';
        case FuncaoPABX.FUNC_BUSCA_TRONCO:
            return 'FUNC_BUSCA_TRONCO';
        case FuncaoPABX.FUNC_CONF_FLASH:
            return 'FUNC_CONF_FLASH';
        case FuncaoPABX.FUNC_DESPERTADOR:
            return 'FUNC_DESPERTADOR';
        case FuncaoPABX.FUNC_VIDEO1:
            return 'FUNC_VIDEO1';
        case FuncaoPABX.FUNC_VIDEO2:
            return 'FUNC_VIDEO2';
        case FuncaoPABX.FUNC_CHAMA_SINDICO:
            return 'FUNC_CHAMA_SINDICO';
        case FuncaoPABX.FUNC_USUARIO:
            return 'FUNC_USUARIO';
        case FuncaoPABX.FUNC_PONTO_ENTRADA:
            return 'FUNC_PONTO_ENTRADA';
        case FuncaoPABX.FUNC_PONTO_SAIDA:
            return 'FUNC_PONTO_SAIDA';
        case FuncaoPABX.FUNC_RONDA:
            return 'FUNC_RONDA';
        case FuncaoPABX.FUNC_ACESSO:
            return 'FUNC_ACESSO';
        case FuncaoPABX.FUNC_CONSUMO:
            return 'FUNC_CONSUMO';
        case FuncaoPABX.FUNC_CONSULT_EXT:
            return 'FUNC_CONSULT_EXT';
        case FuncaoPABX.FUNC_NOTURNO:
            return 'FUNC_NOTURNO';
        case FuncaoPABX.FUNC_ALARME:
            return 'FUNC_ALARME';
        case FuncaoPABX.FUNC_ABRE_COM_SENHA:
            return 'FUNC_ABRE_COM_SENHA';
        case FuncaoPABX.FUNC_PORTEIRO:
            return 'FUNC_PORTEIRO';
        case FuncaoPABX.FUNC_EXTENSAO:
            return 'FUNC_EXTENSAO';
        case FuncaoPABX.FUNC_TESTE_TEC:
            return 'FUNC_TESTE_TEC';
        case FuncaoPABX.FUNC_MUSICA:
            return 'FUNC_MUSICA';
        case FuncaoPABX.FUNC_ALTA_VOZ:
            return 'FUNC_ALTA_VOZ';
        case FuncaoPABX.FUNC_ATUADOR:
            return 'FUNC_ATUADOR';
        case FuncaoPABX.FUNC_BATE_PAPO:
            return 'FUNC_BATE_PAPO';
        case FuncaoPABX.FUNC_ARMAR_ALA:
            return 'FUNC_ARMAR_ALA';
        case FuncaoPABX.FUNC_ABRE_COM_TAG:
            return 'FUNC_ABRE_COM_TAG';
        case FuncaoPABX.FUNC_SENSOR_PORTA:
            return 'FUNC_SENSOR_PORTA';
        case FuncaoPABX.FUNC_ULTIMA:
            return 'FUNC_ULTIMA';
        case FuncaoPABX.FUNC_HOTLINE:
            return 'FUNC_HOTLINE';
        case FuncaoPABX.FUNC_SIGAME_EXT:
            return 'FUNC_SIGAME_EXT';
        case FuncaoPABX.FUNC_CALL_BACK:
            return 'FUNC_CALL_BACK';
        case FuncaoPABX.FUNC_CONFIRMA:
            return 'FUNC_CONFIRMA';
        case FuncaoPABX.FUNC_DIFUSAO:
            return 'FUNC_DIFUSAO';
        case FuncaoPABX.FUNC_XAL:
            return 'FUNC_XAL';
        case FuncaoPABX.FUNC_VOICE_MAIL:
            return 'FUNC_VOICE_MAIL';
        case FuncaoPABX.FUNC_ENTRANTE:
            return 'FUNC_ENTRANTE';
        case FuncaoPABX.FUNC_PARCIAL:
            return 'FUNC_PARCIAL';
        case FuncaoPABX.FUNC_INVALIDA:
            return 'FUNC_INVALIDA';
        case FuncaoPABX.FUNC_NENHUMA:
            return 'FUNC_NENHUMA';
        default:
            return 'Unknown';
    }
};
//# sourceMappingURL=funcao.enum.js.map