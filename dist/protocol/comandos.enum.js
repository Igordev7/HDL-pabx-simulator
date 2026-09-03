export var ComandosPABX;
(function (ComandosPABX) {
    ComandosPABX[ComandosPABX["SOL_IDENTIF"] = 128] = "SOL_IDENTIF";
    ComandosPABX[ComandosPABX["RES_IDENTIF"] = 129] = "RES_IDENTIF";
    ComandosPABX[ComandosPABX["INFO_DATAHORA"] = 130] = "INFO_DATAHORA";
    ComandosPABX[ComandosPABX["INFO_RESPOSTA"] = 131] = "INFO_RESPOSTA";
    ComandosPABX[ComandosPABX["INFO_CENTRAL"] = 132] = "INFO_CENTRAL";
    ComandosPABX[ComandosPABX["INFO_PLANONUM"] = 133] = "INFO_PLANONUM";
    ComandosPABX[ComandosPABX["SOL_QTDLOG"] = 140] = "SOL_QTDLOG";
    ComandosPABX[ComandosPABX["RES_QTDLOG"] = 141] = "RES_QTDLOG";
    ComandosPABX[ComandosPABX["SOL_LOG"] = 142] = "SOL_LOG";
    ComandosPABX[ComandosPABX["RES_LOG"] = 143] = "RES_LOG";
    ComandosPABX[ComandosPABX["SOL_PROGRAMACAO"] = 144] = "SOL_PROGRAMACAO";
    ComandosPABX[ComandosPABX["INF_PROGRAMACAO"] = 145] = "INF_PROGRAMACAO";
    ComandosPABX[ComandosPABX["EFE_PROGRAMACAO"] = 146] = "EFE_PROGRAMACAO";
    ComandosPABX[ComandosPABX["INFO_BINA"] = 147] = "INFO_BINA";
    ComandosPABX[ComandosPABX["INFO_INSTALA_TDI"] = 148] = "INFO_INSTALA_TDI";
    ComandosPABX[ComandosPABX["INFO_TRONCOS_TDI"] = 149] = "INFO_TRONCOS_TDI";
    ComandosPABX[ComandosPABX["INFO_RAMAL_TDI"] = 150] = "INFO_RAMAL_TDI";
    ComandosPABX[ComandosPABX["INFO_RAMAL_TDI_2"] = 0] = "INFO_RAMAL_TDI_2";
    ComandosPABX[ComandosPABX["DISCA_FUNCAO"] = 151] = "DISCA_FUNCAO";
    ComandosPABX[ComandosPABX["INFO_CHAMA_ESPERA"] = 152] = "INFO_CHAMA_ESPERA";
    ComandosPABX[ComandosPABX["INFO_VOX_TDI"] = 153] = "INFO_VOX_TDI";
    ComandosPABX[ComandosPABX["INFO_DISCAGEM_TDI"] = 154] = "INFO_DISCAGEM_TDI";
    ComandosPABX[ComandosPABX["INFO_ENCAMINHAR"] = 155] = "INFO_ENCAMINHAR";
    ComandosPABX[ComandosPABX["EFE_PROG_RML"] = 156] = "EFE_PROG_RML";
    ComandosPABX[ComandosPABX["SOL_ATUALIZACAO"] = 157] = "SOL_ATUALIZACAO";
    ComandosPABX[ComandosPABX["INFO_TESTE"] = 158] = "INFO_TESTE";
    ComandosPABX[ComandosPABX["INFO_INSTALACAO"] = 159] = "INFO_INSTALACAO";
    ComandosPABX[ComandosPABX["INFO_MIX"] = 160] = "INFO_MIX";
    ComandosPABX[ComandosPABX["SOL_VOICE_MAIL"] = 161] = "SOL_VOICE_MAIL";
    ComandosPABX[ComandosPABX["FINALIZA_CHAMADA"] = 162] = "FINALIZA_CHAMADA";
    ComandosPABX[ComandosPABX["INFO_INVERSAO"] = 163] = "INFO_INVERSAO";
    ComandosPABX[ComandosPABX["INFO_COMANDO"] = 164] = "INFO_COMANDO";
    ComandosPABX[ComandosPABX["INFO_BILHETE"] = 165] = "INFO_BILHETE";
    ComandosPABX[ComandosPABX["INFO_CAMERA"] = 166] = "INFO_CAMERA";
    ComandosPABX[ComandosPABX["ACIONA_CAMERA"] = 167] = "ACIONA_CAMERA";
    ComandosPABX[ComandosPABX["CONECTA_PABX"] = 168] = "CONECTA_PABX";
    ComandosPABX[ComandosPABX["ACIONA_PORTEIRO"] = 169] = "ACIONA_PORTEIRO";
    ComandosPABX[ComandosPABX["INFO_GIGA"] = 170] = "INFO_GIGA";
    ComandosPABX[ComandosPABX["INFO_DEPURAR"] = 171] = "INFO_DEPURAR";
    ComandosPABX[ComandosPABX["INFO_DESCONECTAR"] = 172] = "INFO_DESCONECTAR";
    ComandosPABX[ComandosPABX["SOL_BILHETE"] = 173] = "SOL_BILHETE";
    ComandosPABX[ComandosPABX["INFO_PROG_AGENDA"] = 174] = "INFO_PROG_AGENDA";
    ComandosPABX[ComandosPABX["INFO_PROG_VOICE"] = 175] = "INFO_PROG_VOICE";
    // código de bytes duplicado com o INFO_PROG_VOICE
    // INFO_MINI_BINA = 0xAF, // Informação de Mini Bina
    ComandosPABX[ComandosPABX["INFO_ENLACES"] = 176] = "INFO_ENLACES";
    ComandosPABX[ComandosPABX["INFO_GRAVACAO"] = 177] = "INFO_GRAVACAO";
    ComandosPABX[ComandosPABX["INFO_TX_SERIAL_BUS"] = 224] = "INFO_TX_SERIAL_BUS";
    ComandosPABX[ComandosPABX["INFO_RX_SERIAL_BUS"] = 225] = "INFO_RX_SERIAL_BUS";
})(ComandosPABX || (ComandosPABX = {}));
export const getCommandNameFromEnum = (cmd) => {
    switch (cmd) {
        case ComandosPABX.SOL_IDENTIF:
            return 'SOL_IDENTIF';
        case ComandosPABX.RES_IDENTIF:
            return 'RES_IDENTIF';
        case ComandosPABX.INFO_DATAHORA:
            return 'INFO_DATAHORA';
        case ComandosPABX.INFO_RESPOSTA:
            return 'INFO_RESPOSTA';
        case ComandosPABX.INFO_CENTRAL:
            return 'INFO_CENTRAL';
        case ComandosPABX.INFO_PLANONUM:
            return 'INFO_PLANONUM';
        case ComandosPABX.SOL_QTDLOG:
            return 'SOL_QTDLOG';
        case ComandosPABX.RES_QTDLOG:
            return 'RES_QTDLOG';
        case ComandosPABX.SOL_LOG:
            return 'SOL_LOG';
        case ComandosPABX.RES_LOG:
            return 'RES_LOG';
        case ComandosPABX.SOL_PROGRAMACAO:
            return 'SOL_PROGRAMACAO';
        case ComandosPABX.INF_PROGRAMACAO:
            return 'INF_PROGRAMACAO';
        case ComandosPABX.EFE_PROGRAMACAO:
            return 'EFE_PROGRAMACAO';
        case ComandosPABX.INFO_BINA:
            return 'INFO_BINA';
        case ComandosPABX.INFO_INSTALA_TDI:
            return 'INFO_INSTALA_TDI';
        case ComandosPABX.INFO_TRONCOS_TDI:
            return 'INFO_TRONCOS_TDI';
        case ComandosPABX.INFO_RAMAL_TDI:
            return 'INFO_RAMAL_TDI';
        case ComandosPABX.INFO_RAMAL_TDI_2:
            return 'INFO_RAMAL_TDI_2';
        case ComandosPABX.DISCA_FUNCAO:
            return 'DISCA_FUNCAO';
        case ComandosPABX.INFO_CHAMA_ESPERA:
            return 'INFO_CHAMA_ESPERA';
        case ComandosPABX.INFO_VOX_TDI:
            return 'INFO_VOX_TDI';
        case ComandosPABX.INFO_DISCAGEM_TDI:
            return 'INFO_DISCAGEM_TDI';
        case ComandosPABX.INFO_ENCAMINHAR:
            return 'INFO_ENCAMINHAR';
        case ComandosPABX.EFE_PROG_RML:
            return 'EFE_PROG_RML';
        case ComandosPABX.SOL_ATUALIZACAO:
            return 'SOL_ATUALIZACAO';
        case ComandosPABX.INFO_TESTE:
            return 'INFO_TESTE';
        case ComandosPABX.INFO_INSTALACAO:
            return 'INFO_INSTALACAO';
        case ComandosPABX.INFO_MIX:
            return 'INFO_MIX';
        case ComandosPABX.SOL_VOICE_MAIL:
            return 'SOL_VOICE_MAIL';
        case ComandosPABX.FINALIZA_CHAMADA:
            return 'FINALIZA_CHAMADA';
        case ComandosPABX.INFO_INVERSAO:
            return 'INFO_INVERSAO';
        case ComandosPABX.INFO_COMANDO:
            return 'INFO_COMANDO';
        case ComandosPABX.INFO_BILHETE:
            return 'INFO_BILHETE';
        case ComandosPABX.INFO_CAMERA:
            return 'INFO_CAMERA';
        case ComandosPABX.ACIONA_CAMERA:
            return 'ACIONA_CAMERA';
        case ComandosPABX.CONECTA_PABX:
            return 'CONECTA_PABX';
        case ComandosPABX.ACIONA_PORTEIRO:
            return 'ACIONA_PORTEIRO';
        case ComandosPABX.INFO_GIGA:
            return 'INFO_GIGA';
        case ComandosPABX.INFO_DEPURAR:
            return 'INFO_DEPURAR';
        case ComandosPABX.INFO_DESCONECTAR:
            return 'INFO_DESCONECTAR';
        case ComandosPABX.SOL_BILHETE:
            return 'SOL_BILHETE';
        case ComandosPABX.INFO_PROG_AGENDA:
            return 'INFO_PROG_AGENDA';
        case ComandosPABX.INFO_PROG_VOICE:
            return 'INFO_PROG_VOICE';
        case ComandosPABX.INFO_ENLACES:
            return 'INFO_ENLACES';
        case ComandosPABX.INFO_GRAVACAO:
            return 'INFO_GRAVACAO';
        case ComandosPABX.INFO_TX_SERIAL_BUS:
            return 'INFO_TX_SERIAL_BUS';
        case ComandosPABX.INFO_RX_SERIAL_BUS:
            return 'INFO_RX_SERIAL_BUS';
        default:
            return 'UNKNOWN';
    }
};
//# sourceMappingURL=comandos.enum.js.map