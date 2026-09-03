export enum InfoRespostaPABX {
  RES_NOK = 0x00,
  RES_OK = 0x01,
  RES_ERRO = 0x02,
  RES_NENTENDI = 0x03,
}

export const getInfoRespostaNameFromByte = (byte: number): string => {
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
