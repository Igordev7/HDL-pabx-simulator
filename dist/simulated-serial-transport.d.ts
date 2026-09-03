import { SerialTransport } from './transport.js';
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
export type SerialConnectionParams = {
    comPort: string;
};
export declare class SimulatedSerialTransport implements SerialTransport {
    private readonly rx;
    private readonly events;
    private readonly simulator;
    private _isOpen;
    private _closing;
    constructor(params: SerialConnectionParams);
    private emitirDaCentral;
    open(callback: (err: Error | null) => void): void;
    close(callback: (err: Error | null) => void): void;
    write(data: Buffer, callback: (err?: Error | null) => void): void;
    pipe<T extends NodeJS.WritableStream>(destination: T): T;
    on(event: 'close', listener: (err: Error | null) => void): void;
    on(event: 'error', listener: (err: Error) => void): void;
    get isOpen(): boolean;
    get closing(): boolean;
    /**
     * Simula a perda física da conexão: emite os mesmos eventos que o driver da
     * porta emitiria se o cabo fosse removido. `SerialConnection` trata como
     * queda não intencional e o job de reconexão do CTI entra em ação.
     */
    simulateDrop(motivo: string): void;
}
