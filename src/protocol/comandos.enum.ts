export enum ComandosPABX {
  SOL_IDENTIF = 0x80, // Solitação de Identificação
  RES_IDENTIF = 0x81,
  INFO_DATAHORA = 0x82, // Atualização de Data e Hora
  INFO_RESPOSTA = 0x83, // Resposta padrão de comando
  INFO_CENTRAL = 0x84, //Informações da Central
  INFO_PLANONUM = 0x85,
  SOL_QTDLOG = 0x8c, // Controle dos Logs do Pabx
  RES_QTDLOG = 0x8d,
  SOL_LOG = 0x8e,
  RES_LOG = 0x8f,
  SOL_PROGRAMACAO = 0x90, // Solicitação das programações
  INF_PROGRAMACAO = 0x91, // Informação das programações
  EFE_PROGRAMACAO = 0x92, // Efetua uma programação através da serial
  INFO_BINA = 0x93, // Informa o número de bina de um tronco
  INFO_INSTALA_TDI = 0x94, // Informa o número de bina de um tronco
  INFO_TRONCOS_TDI = 0x95, // Informa o estado dos troncos do Pabx
  INFO_RAMAL_TDI = 0x96, // Informa o estado dos ramais do Pabx
  INFO_RAMAL_TDI_2 = 0x00, // Criamos porque a central fica alternando o byte 0x96 com 0x00 durante o registro das chamadas
  DISCA_FUNCAO = 0x97,
  INFO_CHAMA_ESPERA = 0x98,
  INFO_VOX_TDI = 0x99,
  INFO_DISCAGEM_TDI = 0x9a,
  INFO_ENCAMINHAR = 0x9b, // Informação do ramal de encaminhamento
  EFE_PROG_RML = 0x9c, // Informação da programação de ramal
  SOL_ATUALIZACAO = 0x9d, // Solicita a atualização dos estados dos ramais
  INFO_TESTE = 0x9e,
  INFO_INSTALACAO = 0x9f, // Solicita a informação de instalação da central
  INFO_MIX = 0xa0, // Informações do Software de Troca de Mensagens
  SOL_VOICE_MAIL = 0xa1, // Solicitação de VoiceMail
  FINALIZA_CHAMADA = 0xa2, // Envia finalização de chamada
  INFO_INVERSAO = 0xa3, // Informação de Inversão de Polaridade
  INFO_COMANDO = 0xa4, // Comando de intercomunicação entre as centrais
  INFO_BILHETE = 0xa5, // Bilhete da central em formato compactado
  INFO_CAMERA = 0xa6, // Informação das cameras que estão sendo exibidas
  ACIONA_CAMERA = 0xa7, // Permite acionar uma camera pela serial
  CONECTA_PABX = 0xa8, // Informação para conectar o cti
  ACIONA_PORTEIRO = 0xa9, // Permite acionar um porteiro pela serial
  INFO_GIGA = 0xaa, // Envia informação de status da giga de teste
  INFO_DEPURAR = 0xab, // Informação para depuração
  INFO_DESCONECTAR = 0xac, // Informação para desconectar o CTI
  SOL_BILHETE = 0xad, // Solicita os bilhetes armazenados no PABX
  INFO_PROG_AGENDA = 0xae, // Envia um numero para a agenda coletiva
  INFO_PROG_VOICE = 0xaf, // Informação Prog Voice
  // código de bytes duplicado com o INFO_PROG_VOICE
  // INFO_MINI_BINA = 0xAF, // Informação de Mini Bina
  INFO_ENLACES = 0xb0, // Informação de Enlaces
  INFO_GRAVACAO = 0xb1, // Gravação de Mensagens
  INFO_TX_SERIAL_BUS = 0xe0, // Mensagems de BUS via UART
  INFO_RX_SERIAL_BUS = 0xe1, // Mensagems de BUS via UART
}

export const getCommandNameFromEnum = (cmd: ComandosPABX) => {
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
