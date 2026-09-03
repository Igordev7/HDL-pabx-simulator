type PushFrame = (frameBytes: number[]) => void;
/**
 * O "cérebro" da central simulada. Puro: não conhece stream, porta serial nem
 * IPC — só recebe os bytes que o CTI mandou e devolve frames pela função
 * `push`. Toda a decisão de "o que a central responde" mora aqui.
 *
 * Os frames são montados com `buildFrame` (protocol/frame.ts), que já calcula
 * LEN e CRC igual ao firmware — os mesmos frames "golden" cobertos por
 * frame.test.ts.
 */
export declare class CentralSimulator {
    private readonly push;
    private clockTimer?;
    private autoplayTimer?;
    private readonly timers;
    private running;
    constructor(push: PushFrame);
    start(): void;
    stop(): void;
    /** Bytes que o CTI enviou pela "serial". */
    onBytesFromCti(bytes: number[]): void;
    simularLigacao(origemFixo?: number, destinoFixo?: number, atende?: boolean, duracaoSeg?: number): void;
    simularAcessoPorteiro(porteiroFixo?: number, ramalFixo?: number): void;
    simularAcessoSenha(porteiroFixo?: number, ramalFixo?: number): void;
    simularAlerta(zonaFixo?: number, ativado?: boolean): void;
    simularAlarme(zonaFixo?: number, disparado?: boolean): void;
    private responder;
    private executarCenario;
    private frameResposta;
    /**
     * Quadro RES_IDENTIF (0x81). Layout lido por
     * `CommandConectaPABX.decodeIdentifResponse` — precisa de pelo menos 19
     * bytes e do byte 11 (ctiSuportado) diferente de zero para o CTI seguir com
     * o handshake de instalação.
     */
    private frameIdentificacao;
    private enviarDataHora;
    private responderEm;
    private configurarAutoplay;
}
export {};
