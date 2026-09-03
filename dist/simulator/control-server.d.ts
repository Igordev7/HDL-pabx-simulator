export interface PainelCallbacks {
    /** Conecta o CTI à central simulada (handshake completo). */
    onConectar: () => void;
    /** Desconecta o CTI. */
    onDesconectar: () => void;
}
/**
 * Painel de controle do simulador (HTTP em 127.0.0.1). SINGLETON e independente
 * do ciclo de conexão: uma vez de pé, fica de pé até o processo morrer, então o
 * `/drop` e o `disconnectPABX` não derrubam o painel.
 */
export declare class SimulatorControlServer {
    private readonly cb;
    private static instancia?;
    private server?;
    private constructor();
    /** Sobe o painel uma única vez. Chamadas seguintes são no-op. */
    static iniciar(cb: PainelCallbacks): void;
    private start;
    private abrirNoNavegador;
    private handle;
}
