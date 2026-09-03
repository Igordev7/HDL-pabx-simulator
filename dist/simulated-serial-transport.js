import { EventEmitter } from 'events';
import { PassThrough } from 'stream';
import { CentralSimulator } from './simulator/central-simulator.js';
import { registrarSimuladorAtivo } from './simulator/runtime.js';
import { logger } from './logger.js';
export class SimulatedSerialTransport {
    rx = new PassThrough();
    events = new EventEmitter();
    simulator;
    _isOpen = false;
    _closing = false;
    // A central simulada não tem baudRate/parity; a porta pedida só é registrada
    // no log, para deixar claro que nada físico foi aberto.
    constructor(params) {
        logger.info(`[TRANSPORT][SIM] Modo simulador — porta "${params.comPort}" NÃO será aberta.`);
        this.simulator = new CentralSimulator((frame) => this.emitirDaCentral(frame));
    }
    emitirDaCentral(frameBytes) {
        if (!this._isOpen) {
            return;
        }
        this.rx.write(Buffer.from(frameBytes));
    }
    open(callback) {
        if (this._isOpen) {
            queueMicrotask(() => callback(null));
            return;
        }
        this._isOpen = true;
        this._closing = false;
        this.simulator.start();
        registrarSimuladorAtivo(this.simulator, () => this.simulateDrop('Queda de conexão solicitada pelo painel do simulador (/drop).'));
        logger.info('[TRANSPORT][SIM] Central simulada aberta.');
        queueMicrotask(() => callback(null));
    }
    close(callback) {
        this._closing = true;
        this._isOpen = false;
        this.simulator.stop();
        registrarSimuladorAtivo(null, null);
        this._closing = false;
        logger.info('[TRANSPORT][SIM] Central simulada fechada.');
        this.events.emit('close', null);
        queueMicrotask(() => callback(null));
    }
    write(data, callback) {
        // Devolve o controle ANTES de a central responder, para que
        // `Command.send` já tenha registrado o handler da resposta quando o frame
        // simulado chegar.
        process.nextTick(() => callback(null));
        this.simulator.onBytesFromCti(Array.from(data));
    }
    pipe(destination) {
        return this.rx.pipe(destination);
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    get isOpen() {
        return this._isOpen;
    }
    get closing() {
        return this._closing;
    }
    /**
     * Simula a perda física da conexão: emite os mesmos eventos que o driver da
     * porta emitiria se o cabo fosse removido. `SerialConnection` trata como
     * queda não intencional e o job de reconexão do CTI entra em ação.
     */
    simulateDrop(motivo) {
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
//# sourceMappingURL=simulated-serial-transport.js.map