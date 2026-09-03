export enum FuncaoPABX {
  // {Fun��es do Pabx}
  FUNC_EXTERNA = 0x00, // Fun��o Externa
  FUNC_INTERNA = 0x01, // Fun��o Interna Geral
  FUNC_INTERNA_FIXA = 0x02, // Fun��o Interna Fixa
  FUNC_INTERNA_FLEXIVEL = 0x03, // Fun��o Interna Flexivel
  FUNC_FLASH = 0x04, // Fun��o Flash
  FUNC_TRANSFERIR = 0x05, // Transfer�ncia Geral
  FUNC_TRANSF_FIXA = 0x06, // Transfer�ncia Interna Fixa
  FUNC_TRANSF_FLEXIVEL = 0x07, // Transfer�ncia Interna Flexivel
  FUNC_TRANSF_ATENDEDOR = 0x08, // Transfer�ncia Interna para o ramal atendedor
  FUNC_TRANSF_CHEFE_SEC = 0x09, // Transfer�ncia Interna para o ramal chefe/sec
  FUNC_TRANSF_PEGA_TROTE = 0x0a, // Transfer�ncia Interna para o ramal chamador(ultimo)
  FUNC_TRANSF_GRUPO = 0x0b, // Transfer�ncia para um grupo de ramais
  FUNC_RETORNO = 0x0c, // Retorno de Transferencia
  FUNC_CONFERENCIA = 0x0d, // Confer�ncia
  FUNC_CAPTURA_GERAL = 0x0e, // Captura Geral
  FUNC_CAPTURA_FIXA = 0x0f, // Captura um ramal interno
  FUNC_CAPTURA_FLEXIVEL = 0x10, // Captura um ramal flexivel
  FUNC_CAPTURA_ATENDEDOR = 0x11, // Captura o ramal atendedor
  FUNC_CAPTURA_CHEFE_SEC = 0x12, // Captura o ramal chefe secretaria
  FUNC_CAPTURA_GRUPO = 0x13, // Captura uma chamada de um grupo
  FUNC_ROTA_EXECUTIVA = 0x14, // Rota executiva
  FUNC_CHAMA_ATENDEDOR = 0x15, // Chama ramal atendedor
  FUNC_CHEFE_SECRETARIA = 0x16, // Chama ramal chefe secretaria
  FUNC_PEGA_TROTE = 0x17, // Funcao pega trote
  FUNC_GRUPO = 0x18, // Funcao grupo - Faz uma chamada para um grupo de ramais
  FUNC_PENDULO_GERAL = 0x19, // Pendulo Geral
  FUNC_PENDULO_FIXA = 0x1a, // Pendulo para um ramal interno
  FUNC_PENDULO_FLEXIVEL = 0x1b, // Pendulo para um ramal flexivel
  FUNC_PENDULO_ATENDEDOR = 0x1c, // Pendulo para o ramal atendedor
  FUNC_PENDULO_CHEFE_SEC = 0x1d, // Pendulo para o ramal chefe secretaria
  FUNC_PENDULO_GRUPO = 0x1e, // Pendulo de uma chamada de um grupo
  FUNC_RETENCAO = 0x1f, // Pendulo para a retencao em uma posicao
  FUNC_CAPTURA_RETENCAO = 0x20, // Captura a chamada retida em uma posicao
  FUNC_RECHAMADA = 0x21, // Faz uma rechamada para um ramal ou tronco
  FUNC_MUTE = 0x22, // Permite colocar uma chamada em interna ou extena em MUTE
  FUNC_MEM_ULTIMO_NUMERO = 0x23, // Funcao memoria do ultimo numero discado
  FUNC_INTERCALACAO = 0x24, // Funcao intercalacao de ramal ocupado
  FUNC_ROTA_ESPECIAL = 0x25, // Funcao intercalacao de ramal ocupado
  FUNC_SIGAME_FIXA = 0x26, // Funcao para programacao do Siga-me  (Numeracao Fixa)
  FUNC_SIGAME_FLEXIVEL = 0x27, // Funcao para programacao do Siga-me  (Numeracao Flexivel)
  FUNC_PROGRAMA_RAMAL = 0x28, // Funcao para programacao do Ramal
  FUNC_PROGRAMA_PABX = 0x29, // Funcao para programacao do Pabx
  FUNC_PROG_RAMAL_TERC = 0x2a, // Funcao para programacao de um Ramal de um Terceiro
  FUNC_PROG_DISPOSITIVO = 0x2b, // Funcao para programacao de um Dispositivo
  FUNC_PROGRAMA_AGENDA = 0x2c, // Fun��o de programa��o das agendas
  FUNC_AGENDA = 0x2d, // Fun��o de acesso as agendas
  FUNC_ABRE_PORTEIRO = 0x2e, // Fun��o de abertura do porteiro PA ou interface
  FUNC_VOX = 0x2f,
  FUNC_ALERTA = 0x30,
  FUNC_MONITORAR_AMBIENTE = 0x31, // Fun��o permitir monitorar um ambiente
  FUNC_TDI = 0x32, // Fun��es especiais para o TDI (instala��o desinstala��o)
  FUNC_FLASH_EXTERNO = 0x33, // Fun��es especiais para o TDI (instala��o desinstala��o)
  FUNC_PROG_RAMAL_ABREV = 0x34, // Programa��es de ramal abreviadas
  FUNC_REFLASH = 0x35, // Fun��o de rediscagem do flash (FLASH+FLASH) ou (FLASH+1)
  FUNC_BUSCA_TRONCO = 0x36,
  FUNC_CONF_FLASH = 0x37,
  FUNC_DESPERTADOR = 0x38,
  FUNC_VIDEO1 = 0x39,
  FUNC_VIDEO2 = 0x3a,
  FUNC_CHAMA_SINDICO = 0x3b,
  FUNC_USUARIO = 0x3c,
  FUNC_PONTO_ENTRADA = 0x3d,
  FUNC_PONTO_SAIDA = 0x3e,
  FUNC_RONDA = 0x3f,
  FUNC_ACESSO = 0x40,
  FUNC_CONSUMO = 0x41,
  FUNC_CONSULT_EXT = 0x42,
  FUNC_NOTURNO = 0x43,
  FUNC_ALARME = 0x44,
  FUNC_ABRE_COM_SENHA = 0x45,
  FUNC_PORTEIRO = 0x46,
  FUNC_EXTENSAO = 0x47, // Fun��o para a captura qualquer chamada em andamento como intercala��o
  FUNC_TESTE_TEC = 0x48, // Fun��o de teste de teclado e telefone
  FUNC_MUSICA = 0x49, // Fun��o teste de musica
  FUNC_ALTA_VOZ = 0x4a, // Fun��o de alta voz
  FUNC_ATUADOR = 0x4b, // Fun��o de bate papo (145)
  FUNC_BATE_PAPO = 0x4c, // Fun��o de bate papo (145)
  FUNC_ARMAR_ALA = 0x4d, // Fun��o para armar alarme

  FUNC_ABRE_COM_TAG = 0x57, // Funcao para registro de TAG RFID
  FUNC_SENSOR_PORTA = 0x58, // Funcao para sensor de porta
  FUNC_ULTIMA = 0x4e, // sempre definir FUNC_ULTIMA(�ltima fun��o do sistema)

  // Fun��es n�o discadas
  FUNC_HOTLINE = 0x80,
  FUNC_SIGAME_EXT = 0x81,
  FUNC_CALL_BACK = 0x82,
  FUNC_CONFIRMA = 0x83,
  FUNC_DIFUSAO = 0x84,
  FUNC_XAL = 0x85,
  FUNC_VOICE_MAIL = 0x86,
  FUNC_ENTRANTE = 0xfc,
  FUNC_PARCIAL = 0xfd,
  FUNC_INVALIDA = 0xfe,
  FUNC_NENHUMA = 0xff,
}

export const getFuncaoPABXFromByte = (byte: number): string => {
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
