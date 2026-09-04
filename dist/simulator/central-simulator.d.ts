import { getChamadaAtiva } from './runtime.js';
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
    simularAcionamentoFechadura(porteiroFixo?: number, ramalFixo?: number, fechadura?: 1 | 2 | 3): void;
    /**
     * Sessão de discagem imersiva do painel — o morador está "no telefone/
     * interfone" (ramal `origemFixo`) e disca uma ação:
     *
     * - `alerta_on/off`, `alarme_on/off` — códigos `*190`..`*193`;
     * - `ligar_ramal` — envia só o "toca" e fica aguardando `atender` /
     *   `nao_atender` / `desligar`;
     * - `ligar_porteiro` — entra em conversa com o porteiro; habilita
     *   `fechadura` (`*1`/`*2`/`*3`);
     * - `atender` / `nao_atender` / `desligar` — encerram/avançam a chamada
     *   de ramal em andamento;
     * - `fechadura` — aciona a fechadura durante a conversa com o porteiro.
     */
    simularDiscagem(origemFixo: number, acao: string, alvoFixo?: number, fechadura?: 1 | 2 | 3): {
        estado: string;
        chamada: ReturnType<typeof getChamadaAtiva>;
    };
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
    /**
     * Quadros que a central emite sozinha, periodicamente. Numa HDL32p real são
     * dois: o relógio (INFO_DATAHORA) e um heartbeat de status
     * (INFO_RAMAL_TDI_2 — o `fa 16 00 …` capturado). Nos outros modelos, só o
     * relógio (não há captura do heartbeat deles).
     */
    private enviarAmbiente;
    private enviarDataHora;
    private responderEm;
    private configurarAutoplay;
}
export {};
