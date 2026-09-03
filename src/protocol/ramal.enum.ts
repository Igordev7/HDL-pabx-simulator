export enum RamalStatus {
  RML_DESOCUPADO = 0x00, // Ramal desocupado
  RML_INATIVO = 0x01, // Ramal Inativo
  RML_ATIVO = 0x02, // Ramal Ativo
  RML_DISCAR = 0x03, // Ramal vai discar
  RML_INAPTO = 0x04, // Ramal inapto
  RML_CHAMA_RML = 0x05, // Ramal esta chamando outro ramal
  RML_CONV_INT = 0x06, // Ramal esta em conversa��o interna
  RML_CONV_EXT = 0x07, // Ramal esta numa liga��o externa sainte
  RML_DESOCUPAR = 0x08, // Ramal vai ser desocupado
  RML_RINGANDO = 0x09, // Ramal esta ringando
  RML_RETIDO = 0x0a, // Ramal esta retido por uma transferencia
  RML_FLASH = 0x0b, // Ramal deu um flash
  RML_TRANSFERIR = 0x0c, // Ramal esta transferindo uma liga��o
  RML_CONSULTA = 0x0d, // Ramal esta consultando outro ramal
  RML_CONSULTADO = 0x0e, // Ramal recebeu uma consulta
  RML_ESPERA = 0x0f, // Ramal esta com uma chamada em espera(chamando)
  RML_CONFERENCIA = 0x10, // Ramal esta em conferencia
  RML_INAPTO_RECH = 0x11, // Ramal esta em inapto mas permite rechamada
  RML_INTERCALADO = 0x12, // Ramal esta intercalado com outro ramal
  RML_PROGRAMA = 0x13, // Ramal esta efetuando uma programa��o
  RML_DISC_TCO = 0x14, // Ramal esta efetuando uma discagem sainte autom�tica pelo tronco (mem�ria)
  RML_VOX = 0x15, // Ramal esta efetuando recebendo um servi�o da placa de voz
  RML_RECHAMAR = 0x16, // Ramal esta iniciando rechamada
  RML_RECHAMANDO = 0x17,
  RML_INTERNET = 0x18, // Ramal esta na internet
  RML_CONSULT_EXT = 0x19, // Ramal esta em consulta externa
  RML_AUDIO = 0x1a, // Ramal esta em funcao de audio
  RML_ULTIMO_EST = 0x1b, // Ramal esta em consulta externa
  RML_SENSOR_PORTA = 0x1c,
}

export const getRamalStatusFromByte = (byte: number): string => {
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
