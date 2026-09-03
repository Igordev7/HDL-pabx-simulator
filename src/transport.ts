// Interface de transporte de bytes, espelhada do CTI2
// (src/electron/connection/serial/transport/serial-transport.ts). O
// SimulatedSerialTransport a implementa; o CTI2 consome via createTransport.

export interface SerialTransport {
  /** Abre o transporte. */
  open(callback: (err: Error | null) => void): void;

  /** Fecha o transporte. */
  close(callback: (err: Error | null) => void): void;

  /** Envia bytes pelo transporte. */
  write(data: Buffer, callback: (err?: Error | null) => void): void;

  /**
   * Encaminha o fluxo de bytes recebidos para um destino gravável (o
   * `PacketLengthParser` do lado do CTI2). Retorna o próprio destino,
   * igual a `stream.pipe`.
   */
  pipe<T extends NodeJS.WritableStream>(destination: T): T;

  /**
   * Eventos de queda do transporte. O CTI2 (`SerialConnection`) só consome
   * `close` e `error`; o simulador emite os mesmos dois.
   */
  on(event: 'close', listener: (err: Error | null) => void): void;
  on(event: 'error', listener: (err: Error) => void): void;

  /** Verdadeiro enquanto o transporte estiver aberto. */
  readonly isOpen: boolean;

  /** Verdadeiro enquanto o transporte estiver em processo de fechamento. */
  readonly closing: boolean;
}
