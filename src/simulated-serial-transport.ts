import { EventEmitter } from 'events';
import { PassThrough } from 'stream';
import { SerialTransport } from './transport.js';
import { CentralSimulator } from './simulator/central-simulator.js';
import { registrarSimuladorAtivo } from './simulator/runtime.js';
import { logger } from './logger.js';

/**
 * Transporte serial simulado (Etapa 3). Implementa o mesmo contrato
 * `SerialTransport` que `RealSerialTransport`, mas em vez de uma porta física
 * há uma central virtual em processo (`CentralSimulator`).
 *
 * - `pipe()` devolve o fluxo por onde a central "fala" (um PassThrough), então
 *   `PacketLengthParser` e `SerialConnection` funcionam sem saber que a porta
 *   é falsa.
 * - `write()` entrega os bytes do CTI ao simulador, que decide a resposta.
 * - `close`/`error` são emitidos de verdade, então a detecção de queda e o job
 *   de reconexão do CTI podem ser exercitados (rota `/drop` do painel).
 *
 * O **painel de controle HTTP** NÃO vive aqui — é um singleton iniciado por
 * `SerialService` (sobrevive a desconexões). Este transporte só se registra
 * como "simulador ativo" enquanto está aberto, via `registrarSimuladorAtivo`.
 *
 * Ative com `CENTRIX_TRANSPORT=sim` (ver `resolveTransportMode`).
 */

// Só o que o simulador realmente lê dos parâmetros de conexão do CTI2 — o
// resto (baudRate, parity, etc.) não se aplica a uma central em processo.
export type SerialConnectionParams = { comPort: string };

export class SimulatedSerialTransport implements SerialTransport {
  private readonly rx = new PassThrough();
  private readonly events = new EventEmitter();
  private readonly simulator: CentralSimulator;

  private _isOpen = false;
  private _closing = false;

  // A central simulada não tem baudRate/parity; a porta pedida só é registrada
  // no log, para deixar claro que nada físico foi aberto.
  constructor(params: SerialConnectionParams) {
    logger.info(
      `[TRANSPORT][SIM] Modo simulador — porta "${params.comPort}" NÃO será aberta.`
    );
    this.simulator = new CentralSimulator((frame) =>
      this.emitirDaCentral(frame)
    );
  }

  private emitirDaCentral(frameBytes: number[]): void {
    if (!this._isOpen) {
      return;
    }
    this.rx.write(Buffer.from(frameBytes));
  }

  open(callback: (err: Error | null) => void): void {
    if (this._isOpen) {
      queueMicrotask(() => callback(null));
      return;
    }
    this._isOpen = true;
    this._closing = false;

    this.simulator.start();
    registrarSimuladorAtivo(this.simulator, () =>
      this.simulateDrop(
        'Queda de conexão solicitada pelo painel do simulador (/drop).'
      )
    );

    logger.info('[TRANSPORT][SIM] Central simulada aberta.');
    queueMicrotask(() => callback(null));
  }

  close(callback: (err: Error | null) => void): void {
    this._closing = true;
    this._isOpen = false;
    this.simulator.stop();
    registrarSimuladorAtivo(null, null);
    this._closing = false;

    logger.info('[TRANSPORT][SIM] Central simulada fechada.');
    this.events.emit('close', null);
    queueMicrotask(() => callback(null));
  }

  write(data: Buffer, callback: (err?: Error | null) => void): void {
    // Devolve o controle ANTES de a central responder, para que
    // `Command.send` já tenha registrado o handler da resposta quando o frame
    // simulado chegar.
    process.nextTick(() => callback(null));
    this.simulator.onBytesFromCti(Array.from(data));
  }

  pipe<T extends NodeJS.WritableStream>(destination: T): T {
    return this.rx.pipe(destination);
  }

  on(event: 'close', listener: (err: Error | null) => void): void;
  on(event: 'error', listener: (err: Error) => void): void;
  on(
    event: 'close' | 'error',
    listener: (err: Error & (Error | null)) => void
  ): void {
    this.events.on(event, listener);
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  get closing(): boolean {
    return this._closing;
  }

  /**
   * Simula a perda física da conexão: emite os mesmos eventos que o driver da
   * porta emitiria se o cabo fosse removido. `SerialConnection` trata como
   * queda não intencional e o job de reconexão do CTI entra em ação.
   */
  simulateDrop(motivo: string): void {
    if (!this._isOpen) {
      return;
    }
    this._isOpen = false;
    this.simulator.stop();
    logger.warn(`[TRANSPORT][SIM] Simulando queda de conexão: ${motivo}`);
    this.events.emit('error', new Error(motivo));
    this.events.emit('close', new Error(motivo));
  }
}
