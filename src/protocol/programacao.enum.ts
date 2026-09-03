export enum ProgramacaoPABX {
  // Programações do Pabx
  PROG_RESET = 0x00,
  PROG_PERFIL = 0x01,
  PROG_CONFIGURACAO = 0x02,
  PROG_SENHA = 0x03,
  PROG_ATENDEDOR = 0x04,
  PROG_PROGRAMADOR = 0x05,
  PROG_BILHETAGEM = 0x06,
  PROG_CALENDARIO = 0x07,
  PROG_MUSICA = 0x08,
  PROG_TEMPO_LOOP = 0x09,
  PROG_IOT_CHAVE = 0x0a,
  PROG_SEVENTH_SITUATOR = 0x0b,
  PROG_SENHA_TCO = 0x10,
  PROG_SIGAME_EXTERNO = 0x11,
  PROG_T_LIG_REMOTA = 0x12,
  PROG_T_ABRE_IPX = 0x13,
  PROG_NOTURNO = 0x15,
  PROG_ENLACES = 0x16,
  PROG_T_FLASH_EXT = 0x17,
  PROG_ALARMES = 0x19,
  PROG_TCO_CATEGORIA = 0x20,
  PROG_TCO_MULTIFREQ = 0x21,
  PROG_TCO_BLOQ_COBRAR = 0x22,
  PROG_TCO_ATEND_AUTO = 0x23,
  PROG_TCO_BINA = 0x24,
  PROG_TCO_INVERSAO = 0x25,
  PROG_TCO_TOQUE = 0x26,
  PROG_TCO_FSK = 0x27,
  PROG_TCO_SECR_ELET = 0x28, //novo-(!receber,novo,ler,gravar,editar,mostrar,reprog)
  PROG_TCO_ROTAS = 0x29,
  PROG_RML_CATEGORIA = 0x30,
  PROG_RML_CAT_DIURNA = 0x31,
  PROG_RML_CAT_NOTURNA = 0x32,
  PROG_RML_ROTAS = 0x33,
  PROG_RML_BLOQUEIOS = 0x34,
  PROG_RML_CHEFE_SEC = 0x35,
  PROG_RML_HOTLINE = 0x36,
  PROG_RML_FLEXIVEL = 0x37,
  PROG_RML_TELEFONE = 0x38,
  PROG_RML_FLASH = 0x39,
  PROG_RML_USUARIO = 0x40,
  PROG_RML_CAMERA = 0x41,
  PROG_RML_PERMISSAO = 0x42,
  PROG_RML_PLANO = 0x43,
  PROG_RML_PORTEIRO = 0x44,
  PROG_RML_INTERLIGADO = 0x4f,
  PROG_RAMAL_TOQUES = 0xa0,
  //adicionado
  PROG_RAMAL_DESVIO = 0xa5,

  PROG_RAMAL_SENHA_FECH1 = 0xa8,
  PROG_RAMAL_SENHA_FECH2 = 0xa9,
  PROG_GRUPO_APAGA = 0x50,
  PROG_GRUPO_CRIA = 0x51,
  PROG_GRUPO_ALTERA = 0x52,
  PROG_GRUPO_ADICIONA = 0x53,
  PROG_GRUPO_RETIRA = 0x54,
  PROG_TRANSB_CANCELA_GER = 0x60,
  PROG_TRANSB_FILA_GER = 0x61,
  PROG_TRANSB_TEMPO_GER = 0x62,
  PROG_TRANSB_CANCELA_TCO = 0x63,
  PROG_TRANSB_FILA_TCO = 0x64,
  PROG_TRANSB_TEMPO_TCO = 0x65,
  PROG_TRANSB_CANCELA_POR = 0x66,
  PROG_TRANSB_FILA_POR = 0x67,
  PROG_TRANSB_TEMPO_POR = 0x68,
  PROG_TRANSB_TIPO = 0x69,
  PROG_PREFIXOS = 0x70,
  PROG_OPERADORA = 0x71,
  PROG_NUMERO_ESPECIAL = 0x72,
  PROG_USUARIOS = 0x73,
  PROG_ENCAMINHAMENTO = 0x74,
  PROG_CALL_BACK = 0x75,
  PROG_ACIONAMENTOS = 0x76,
  PROG_VOX = 0x80,
  PROG_SERVICOS = 0x81,
  PROG_SEN_ATU_EXT = 0x82,
  PROG_EXT_ENLACES = 0x83,
  PROG_SEN_INVERSAO = 0x84,
  PROG_PLACAS_VIDEO = 0x85,
  PROG_SAIDAS_VIDEO = 0x86,
  PROG_T_CHAVEA_VIDEO = 0x87,
  PROG_T_AMOSTRAGEM_VIDEO = 0x88,
  PROG_BLOQ_VIDEO = 0x89,
  PROG_ROTAS_INTELIG = 0x90,
  PROG_INTERFONES = 0x92,
  PROG_SD_CARD = 0x93, //novo-(receber,novo,ler,gravar,editar,mostrar,reprog)
  PROG_REDE = 0x94, //Novo
  PROG_VALORES = 0x98,
  PROG_ESPECIAIS = 0x99,
  PROG_FIM = 0xfe,
}

export const getProgramacaoFromByte = (byte: number): string => {
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
