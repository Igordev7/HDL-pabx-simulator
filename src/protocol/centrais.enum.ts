export enum CentraisHDL {
  NENHUM_PABX = 0,
  // centrais hdl
  HDL4_12 = 0x10,
  HDL80p = 0x11,
  HDL128p = 0x12,
  HDL256p = 0x13,
  HDL368p = 0x14,
  HDL496p = 0x15,
  HDL744p = 0x16,
  HDL992p = 0x17,
  // novas centrais hdl
  HDL412 = 0x20,
  HDL72p = 0x21,
  HDL152p = 0x22,
  HDL312p = 0x23,
  HDL32p = 0x24,
  HDL28 = 0x25,
  HDL48p = 0x26,
}

/**
 * ATENÇÃO: alguns modelos e o número de ramais correspondentes não foram conferido contra o manual de - apenas inferidos pelo nome
 * Testar apenas os modelos que forem utilizados, e caso algum modelo não esteja correto, favor reportar para correção.
 * TODO: Investigar a utilização de gabinetes nos casos para número de ramais a partir da HDL368P. 
 */
export const CAPACIDADE_RAMAIS_POR_MODELO: Record<CentraisHDL, number | null> =
  {
    [CentraisHDL.NENHUM_PABX]: null,
    [CentraisHDL.HDL4_12]: 12,
    [CentraisHDL.HDL80p]: 80,
    [CentraisHDL.HDL128p]: 128,
    [CentraisHDL.HDL256p]: 256,
    [CentraisHDL.HDL368p]: 368,
    [CentraisHDL.HDL496p]: 496,
    [CentraisHDL.HDL744p]: 744,
    [CentraisHDL.HDL992p]: 992,
    [CentraisHDL.HDL412]: 12,
    [CentraisHDL.HDL72p]: 72,
    [CentraisHDL.HDL152p]: 152,
    [CentraisHDL.HDL312p]: 312,
    [CentraisHDL.HDL32p]: 32,
    [CentraisHDL.HDL28]: 8,
    [CentraisHDL.HDL48p]: 48,
  };

export const getRamaisCapacidadeFromByte = (byte: number): number | null => {
  return CAPACIDADE_RAMAIS_POR_MODELO[byte as CentraisHDL] ?? null;
};

export const getCentralNameFromByte = (byte: number): string => {
  switch (byte) {
    case CentraisHDL.HDL4_12:
      return 'HDL4_12';
    case CentraisHDL.HDL80p:
      return 'HDL80p';
    case CentraisHDL.HDL128p:
      return 'HDL128p';
    case CentraisHDL.HDL256p:
      return 'HDL256p';
    case CentraisHDL.HDL368p:
      return 'HDL368p';
    case CentraisHDL.HDL496p:
      return 'HDL496p';
    case CentraisHDL.HDL744p:
      return 'HDL744p';
    case CentraisHDL.HDL992p:
      return 'HDL992p';
    case CentraisHDL.HDL412:
      return 'HDL412';
    case CentraisHDL.HDL72p:
      return 'HDL72p';
    case CentraisHDL.HDL152p:
      return 'HDL152p';
    case CentraisHDL.HDL312p:
      return 'HDL312p';
    case CentraisHDL.HDL32p:
      return 'HDL32p';
    case CentraisHDL.HDL28:
      return 'HDL28';
    case CentraisHDL.HDL48p:
      return 'HDL48p';
    default:
      return 'Unknown';
  }
};
