export var ProgramacaoPABX;
(function (ProgramacaoPABX) {
    // Programações do Pabx
    ProgramacaoPABX[ProgramacaoPABX["PROG_RESET"] = 0] = "PROG_RESET";
    ProgramacaoPABX[ProgramacaoPABX["PROG_PERFIL"] = 1] = "PROG_PERFIL";
    ProgramacaoPABX[ProgramacaoPABX["PROG_CONFIGURACAO"] = 2] = "PROG_CONFIGURACAO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_SENHA"] = 3] = "PROG_SENHA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_ATENDEDOR"] = 4] = "PROG_ATENDEDOR";
    ProgramacaoPABX[ProgramacaoPABX["PROG_PROGRAMADOR"] = 5] = "PROG_PROGRAMADOR";
    ProgramacaoPABX[ProgramacaoPABX["PROG_BILHETAGEM"] = 6] = "PROG_BILHETAGEM";
    ProgramacaoPABX[ProgramacaoPABX["PROG_CALENDARIO"] = 7] = "PROG_CALENDARIO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_MUSICA"] = 8] = "PROG_MUSICA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TEMPO_LOOP"] = 9] = "PROG_TEMPO_LOOP";
    ProgramacaoPABX[ProgramacaoPABX["PROG_IOT_CHAVE"] = 10] = "PROG_IOT_CHAVE";
    ProgramacaoPABX[ProgramacaoPABX["PROG_SEVENTH_SITUATOR"] = 11] = "PROG_SEVENTH_SITUATOR";
    ProgramacaoPABX[ProgramacaoPABX["PROG_SENHA_TCO"] = 16] = "PROG_SENHA_TCO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_SIGAME_EXTERNO"] = 17] = "PROG_SIGAME_EXTERNO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_T_LIG_REMOTA"] = 18] = "PROG_T_LIG_REMOTA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_T_ABRE_IPX"] = 19] = "PROG_T_ABRE_IPX";
    ProgramacaoPABX[ProgramacaoPABX["PROG_NOTURNO"] = 21] = "PROG_NOTURNO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_ENLACES"] = 22] = "PROG_ENLACES";
    ProgramacaoPABX[ProgramacaoPABX["PROG_T_FLASH_EXT"] = 23] = "PROG_T_FLASH_EXT";
    ProgramacaoPABX[ProgramacaoPABX["PROG_ALARMES"] = 25] = "PROG_ALARMES";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_CATEGORIA"] = 32] = "PROG_TCO_CATEGORIA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_MULTIFREQ"] = 33] = "PROG_TCO_MULTIFREQ";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_BLOQ_COBRAR"] = 34] = "PROG_TCO_BLOQ_COBRAR";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_ATEND_AUTO"] = 35] = "PROG_TCO_ATEND_AUTO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_BINA"] = 36] = "PROG_TCO_BINA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_INVERSAO"] = 37] = "PROG_TCO_INVERSAO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_TOQUE"] = 38] = "PROG_TCO_TOQUE";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_FSK"] = 39] = "PROG_TCO_FSK";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_SECR_ELET"] = 40] = "PROG_TCO_SECR_ELET";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TCO_ROTAS"] = 41] = "PROG_TCO_ROTAS";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_CATEGORIA"] = 48] = "PROG_RML_CATEGORIA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_CAT_DIURNA"] = 49] = "PROG_RML_CAT_DIURNA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_CAT_NOTURNA"] = 50] = "PROG_RML_CAT_NOTURNA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_ROTAS"] = 51] = "PROG_RML_ROTAS";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_BLOQUEIOS"] = 52] = "PROG_RML_BLOQUEIOS";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_CHEFE_SEC"] = 53] = "PROG_RML_CHEFE_SEC";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_HOTLINE"] = 54] = "PROG_RML_HOTLINE";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_FLEXIVEL"] = 55] = "PROG_RML_FLEXIVEL";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_TELEFONE"] = 56] = "PROG_RML_TELEFONE";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_FLASH"] = 57] = "PROG_RML_FLASH";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_USUARIO"] = 64] = "PROG_RML_USUARIO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_CAMERA"] = 65] = "PROG_RML_CAMERA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_PERMISSAO"] = 66] = "PROG_RML_PERMISSAO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_PLANO"] = 67] = "PROG_RML_PLANO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_PORTEIRO"] = 68] = "PROG_RML_PORTEIRO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RML_INTERLIGADO"] = 79] = "PROG_RML_INTERLIGADO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RAMAL_TOQUES"] = 160] = "PROG_RAMAL_TOQUES";
    //adicionado
    ProgramacaoPABX[ProgramacaoPABX["PROG_RAMAL_DESVIO"] = 165] = "PROG_RAMAL_DESVIO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RAMAL_SENHA_FECH1"] = 168] = "PROG_RAMAL_SENHA_FECH1";
    ProgramacaoPABX[ProgramacaoPABX["PROG_RAMAL_SENHA_FECH2"] = 169] = "PROG_RAMAL_SENHA_FECH2";
    ProgramacaoPABX[ProgramacaoPABX["PROG_GRUPO_APAGA"] = 80] = "PROG_GRUPO_APAGA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_GRUPO_CRIA"] = 81] = "PROG_GRUPO_CRIA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_GRUPO_ALTERA"] = 82] = "PROG_GRUPO_ALTERA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_GRUPO_ADICIONA"] = 83] = "PROG_GRUPO_ADICIONA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_GRUPO_RETIRA"] = 84] = "PROG_GRUPO_RETIRA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_CANCELA_GER"] = 96] = "PROG_TRANSB_CANCELA_GER";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_FILA_GER"] = 97] = "PROG_TRANSB_FILA_GER";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_TEMPO_GER"] = 98] = "PROG_TRANSB_TEMPO_GER";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_CANCELA_TCO"] = 99] = "PROG_TRANSB_CANCELA_TCO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_FILA_TCO"] = 100] = "PROG_TRANSB_FILA_TCO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_TEMPO_TCO"] = 101] = "PROG_TRANSB_TEMPO_TCO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_CANCELA_POR"] = 102] = "PROG_TRANSB_CANCELA_POR";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_FILA_POR"] = 103] = "PROG_TRANSB_FILA_POR";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_TEMPO_POR"] = 104] = "PROG_TRANSB_TEMPO_POR";
    ProgramacaoPABX[ProgramacaoPABX["PROG_TRANSB_TIPO"] = 105] = "PROG_TRANSB_TIPO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_PREFIXOS"] = 112] = "PROG_PREFIXOS";
    ProgramacaoPABX[ProgramacaoPABX["PROG_OPERADORA"] = 113] = "PROG_OPERADORA";
    ProgramacaoPABX[ProgramacaoPABX["PROG_NUMERO_ESPECIAL"] = 114] = "PROG_NUMERO_ESPECIAL";
    ProgramacaoPABX[ProgramacaoPABX["PROG_USUARIOS"] = 115] = "PROG_USUARIOS";
    ProgramacaoPABX[ProgramacaoPABX["PROG_ENCAMINHAMENTO"] = 116] = "PROG_ENCAMINHAMENTO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_CALL_BACK"] = 117] = "PROG_CALL_BACK";
    ProgramacaoPABX[ProgramacaoPABX["PROG_ACIONAMENTOS"] = 118] = "PROG_ACIONAMENTOS";
    ProgramacaoPABX[ProgramacaoPABX["PROG_VOX"] = 128] = "PROG_VOX";
    ProgramacaoPABX[ProgramacaoPABX["PROG_SERVICOS"] = 129] = "PROG_SERVICOS";
    ProgramacaoPABX[ProgramacaoPABX["PROG_SEN_ATU_EXT"] = 130] = "PROG_SEN_ATU_EXT";
    ProgramacaoPABX[ProgramacaoPABX["PROG_EXT_ENLACES"] = 131] = "PROG_EXT_ENLACES";
    ProgramacaoPABX[ProgramacaoPABX["PROG_SEN_INVERSAO"] = 132] = "PROG_SEN_INVERSAO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_PLACAS_VIDEO"] = 133] = "PROG_PLACAS_VIDEO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_SAIDAS_VIDEO"] = 134] = "PROG_SAIDAS_VIDEO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_T_CHAVEA_VIDEO"] = 135] = "PROG_T_CHAVEA_VIDEO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_T_AMOSTRAGEM_VIDEO"] = 136] = "PROG_T_AMOSTRAGEM_VIDEO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_BLOQ_VIDEO"] = 137] = "PROG_BLOQ_VIDEO";
    ProgramacaoPABX[ProgramacaoPABX["PROG_ROTAS_INTELIG"] = 144] = "PROG_ROTAS_INTELIG";
    ProgramacaoPABX[ProgramacaoPABX["PROG_INTERFONES"] = 146] = "PROG_INTERFONES";
    ProgramacaoPABX[ProgramacaoPABX["PROG_SD_CARD"] = 147] = "PROG_SD_CARD";
    ProgramacaoPABX[ProgramacaoPABX["PROG_REDE"] = 148] = "PROG_REDE";
    ProgramacaoPABX[ProgramacaoPABX["PROG_VALORES"] = 152] = "PROG_VALORES";
    ProgramacaoPABX[ProgramacaoPABX["PROG_ESPECIAIS"] = 153] = "PROG_ESPECIAIS";
    ProgramacaoPABX[ProgramacaoPABX["PROG_FIM"] = 254] = "PROG_FIM";
})(ProgramacaoPABX || (ProgramacaoPABX = {}));
export const getProgramacaoFromByte = (byte) => {
    switch (byte) {
        case 0x00:
            return 'PROG_RESET';
        case 0x01:
            return 'PROG_PERFIL';
        case 0x02:
            return 'PROG_CONFIGURACAO';
        case 0x03:
            return 'PROG_SENHA';
        case 0x04:
            return 'PROG_ATENDEDOR';
        case 0x05:
            return 'PROG_PROGRAMADOR';
        case 0x06:
            return 'PROG_BILHETAGEM';
        case 0x07:
            return 'PROG_CALENDARIO';
        case 0x08:
            return 'PROG_MUSICA';
        case 0x09:
            return 'PROG_TEMPO_LOOP';
        case 0x0a:
            return 'PROG_IOT_CHAVE';
        case 0x0b:
            return 'PROG_SEVENTH_SITUATOR';
        case 0x10:
            return 'PROG_SENHA_TCO';
        case 0x11:
            return 'PROG_SIGAME_EXTERNO';
        case 0x12:
            return 'PROG_T_LIG_REMOTA';
        case 0x13:
            return 'PROG_T_ABRE_IPX';
        case 0x15:
            return 'PROG_NOTURNO';
        case 0x16:
            return 'PROG_ENLACES';
        case 0x17:
            return 'PROG_T_FLASH_EXT';
        case 0x19:
            return 'PROG_ALARMES';
        case 0x20:
            return 'PROG_TCO_CATEGORIA';
        case 0x21:
            return 'PROG_TCO_MULTIFREQ';
        case 0x22:
            return 'PROG_TCO_BLOQ_COBRAR';
        case 0x23:
            return 'PROG_TCO_ATEND_AUTO';
        case 0x24:
            return 'PROG_TCO_BINA';
        case 0x25:
            return 'PROG_TCO_INVERSAO';
        case 0x26:
            return 'PROG_TCO_TOQUE';
        case 0x27:
            return 'PROG_TCO_FSK';
        case 0x28:
            return 'PROG_TCO_SECR_ELET';
        case 0x29:
            return 'PROG_TCO_ROTAS';
        case 0x30:
            return 'PROG_RML_CATEGORIA';
        case 0x31:
            return 'PROG_RML_CAT_DIURNA';
        case 0x32:
            return 'PROG_RML_CAT_NOTURNA';
        case 0x33:
            return 'PROG_RML_ROTAS';
        case 0x34:
            return 'PROG_RML_BLOQUEIOS';
        case 0x35:
            return 'PROG_RML_CHEFE_SEC';
        case 0x36:
            return 'PROG_RML_HOTLINE';
        case 0x37:
            return 'PROG_RML_FLEXIVEL';
        case 0x38:
            return 'PROG_RML_TELEFONE';
        case 0x39:
            return 'PROG_RML_FLASH';
        case 0x40:
            return 'PROG_RML_USUARIO';
        case 0x41:
            return 'PROG_RML_CAMERA';
        case 0x42:
            return 'PROG_RML_PERMISSAO';
        case 0x43:
            return 'PROG_RML_PLANO';
        case 0x44:
            return 'PROG_RML_PORTEIRO';
        case 0x4f:
            return 'PROG_RML_INTERLIGADO';
        // adicionado
        case 0xa0:
            return 'PROG_RAMAL_TOQUES';
        case 0xa5:
            return 'PROG_RAMAL_DESVIO';
        case 0xa8:
            return 'PROG_RAMAL_SENHA_FECH1';
        case 0xa9:
            return 'PROG_RAMAL_SENHA_FECH2';
        //
        case 0x50:
            return 'PROG_GRUPO_APAGA';
        case 0x51:
            return 'PROG_GRUPO_CRIA';
        case 0x52:
            return 'PROG_GRUPO_ALTERA';
        case 0x53:
            return 'PROG_GRUPO_ADICIONA';
        case 0x54:
            return 'PROG_GRUPO_RETIRA';
        case 0x60:
            return 'PROG_TRANSB_CANCELA_GER';
        case 0x61:
            return 'PROG_TRANSB_FILA_GER';
        case 0x62:
            return 'PROG_TRANSB_TEMPO_GER';
        case 0x63:
            return 'PROG_TRANSB_CANCELA_TCO';
        case 0x64:
            return 'PROG_TRANSB_FILA_TCO';
        case 0x65:
            return 'PROG_TRANSB_TEMPO_TCO';
        case 0x66:
            return 'PROG_TRANSB_CANCELA_POR';
        case 0x67:
            return 'PROG_TRANSB_FILA_POR';
        case 0x68:
            return 'PROG_TRANSB_TEMPO_POR';
        case 0x69:
            return 'PROG_TRANSB_TIPO';
        case 0x70:
            return 'PROG_PREFIXOS';
        case 0x71:
            return 'PROG_OPERADORA';
        case 0x72:
            return 'PROG_NUMERO_ESPECIAL';
        case 0x73:
            return 'PROG_USUARIOS';
        case 0x74:
            return 'PROG_ENCAMINHAMENTO';
        case 0x75:
            return 'PROG_CALL_BACK';
        case 0x76:
            return 'PROG_ACIONAMENTOS';
        case 0x80:
            return 'PROG_VOX';
        case 0x81:
            return 'PROG_SERVICOS';
        case 0x82:
            return 'PROG_SEN_ATU_EXT';
        case 0x83:
            return 'PROG_EXT_ENLACES';
        case 0x84:
            return 'PROG_SEN_INVERSAO';
        case 0x85:
            return 'PROG_PLACAS_VIDEO';
        case 0x86:
            return 'PROG_SAIDAS_VIDEO';
        case 0x87:
            return 'PROG_T_CHAVEA_VIDEO';
        case 0x88:
            return 'PROG_T_AMOSTRAGEM_VIDEO';
        case 0x89:
            return 'PROG_BLOQ_VIDEO';
        case 0x90:
            return 'PROG_ROTAS_INTELIG';
        case 0x92:
            return 'PROG_INTERFONES';
        case 0x93:
            return 'PROG_SD_CARD';
        case 0x94:
            return 'PROG_REDE';
        case 0x98:
            return 'PROG_VALORES';
        case 0x99:
            return 'PROG_ESPECIAIS';
        case 0xfe:
            return 'PROG_FIM';
        default:
            return 'Unknown';
    }
};
//# sourceMappingURL=programacao.enum.js.map