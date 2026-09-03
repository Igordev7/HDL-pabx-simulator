import http from 'http';
import { spawn } from 'child_process';
import { logger } from '../logger.js';
import { PAINEL_HTML } from './control-panel.html.js';
import { getRamalOverrides, limparProgEstado } from './prog-estado.js';
import { dispararQuedaSimulada, getCaminhoReplay, getConfigRecebimento, getModeloSimulado, getRespostaEnvio, getSimuladorAtivo, setCaminhoReplay, setConfigRecebimento, setModeloSimulado, setRespostaEnvio, } from './runtime.js';
const PORTA_PADRAO = 8777;
/**
 * Painel de controle do simulador (HTTP em 127.0.0.1). SINGLETON e independente
 * do ciclo de conexão: uma vez de pé, fica de pé até o processo morrer, então o
 * `/drop` e o `disconnectPABX` não derrubam o painel.
 */
export class SimulatorControlServer {
    cb;
    static instancia;
    server;
    constructor(cb) {
        this.cb = cb;
    }
    /** Sobe o painel uma única vez. Chamadas seguintes são no-op. */
    static iniciar(cb) {
        if (SimulatorControlServer.instancia) {
            return;
        }
        const inst = new SimulatorControlServer(cb);
        SimulatorControlServer.instancia = inst;
        inst.start();
    }
    start() {
        const porta = Number(process.env.CENTRIX_SIM_PORT) || PORTA_PADRAO;
        const server = http.createServer((req, res) => this.handle(req, res));
        server.on('error', (err) => {
            logger.warn(`[SIM][CTRL] Painel de controle indisponível: ${err.message}`);
            this.server = undefined;
            SimulatorControlServer.instancia = undefined;
        });
        server.listen(porta, '127.0.0.1', () => {
            const p = server.address()?.port ?? porta;
            const url = `http://127.0.0.1:${p}/`;
            logger.info(`[SIM][CTRL] Painel de controle do simulador: ${url}`);
            this.abrirNoNavegador(url);
        });
        this.server = server;
    }
    abrirNoNavegador(url) {
        if (process.env.CENTRIX_SIM_OPEN_PANEL === '0') {
            return;
        }
        try {
            // Abre no navegador padrão do SO, sem depender de electron.
            const cmd = process.platform === 'win32'
                ? { bin: 'cmd', args: ['/c', 'start', '""', url] }
                : process.platform === 'darwin'
                    ? { bin: 'open', args: [url] }
                    : { bin: 'xdg-open', args: [url] };
            spawn(cmd.bin, cmd.args, { stdio: 'ignore', detached: true }).unref();
        }
        catch {
            /* sem GUI (testes / headless) — o log com a URL já basta */
        }
    }
    handle(req, res) {
        const url = new URL(req.url ?? '/', 'http://127.0.0.1');
        const rota = url.pathname.replace(/\/+$/, '') || '/';
        const inteiro = (nome, padrao) => Number(url.searchParams.get(nome)) || padrao;
        const flag = (nome, padrao) => {
            const v = url.searchParams.get(nome);
            if (v === null)
                return padrao;
            return v === '1' || v === 'true' || v === 'sim';
        };
        const json = (status, corpo) => {
            res.writeHead(status, {
                'content-type': 'application/json; charset=utf-8',
            });
            res.end(JSON.stringify(corpo));
        };
        // Cenários precisam de uma central conectada.
        const comSimulador = (fn) => {
            const sim = getSimuladorAtivo();
            if (!sim) {
                json(409, {
                    ok: false,
                    erro: 'central desconectada — clique em "Conectar" primeiro',
                });
                return;
            }
            json(200, { ok: true, ...fn(sim) });
        };
        switch (rota) {
            case '/':
                res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
                res.end(PAINEL_HTML);
                return;
            case '/estado':
                json(200, {
                    ok: true,
                    conectado: getSimuladorAtivo() !== null,
                    modelo: getModeloSimulado(),
                    respostaEnvio: getRespostaEnvio(),
                    receber: getConfigRecebimento(),
                    replay: getCaminhoReplay(),
                    ramaisProgramados: getRamalOverrides().size,
                });
                return;
            case '/enviar-config': {
                const r = url.searchParams.get('resposta');
                if (r !== null) {
                    setRespostaEnvio(r);
                }
                json(200, {
                    ok: true,
                    cenario: 'enviar-config',
                    respostaEnvio: getRespostaEnvio(),
                });
                return;
            }
            case '/receber-config': {
                const patch = {};
                const p = url.searchParams;
                if (p.has('ramais'))
                    patch.qtdRamais = Number(p.get('ramais'));
                if (p.has('inicial'))
                    patch.ramalInicial = Number(p.get('inicial'));
                if (p.has('porteiros'))
                    patch.qtdPorteiros = Number(p.get('porteiros'));
                if (p.has('troncos'))
                    patch.troncos = Number(p.get('troncos'));
                if (p.has('senha'))
                    patch.senhaProgramador = Number(p.get('senha'));
                setConfigRecebimento(patch);
                if (p.has('replay'))
                    setCaminhoReplay(p.get('replay') ?? '');
                if (flag('resetestado', false))
                    limparProgEstado();
                json(200, {
                    ok: true,
                    cenario: 'receber-config',
                    receber: getConfigRecebimento(),
                    replay: getCaminhoReplay(),
                    ramaisProgramados: getRamalOverrides().size,
                });
                return;
            }
            case '/config': {
                const modelo = url.searchParams.get('modelo');
                if (modelo !== null) {
                    const byte = modelo.toLowerCase().startsWith('0x')
                        ? parseInt(modelo, 16)
                        : Number(modelo);
                    setModeloSimulado(byte);
                }
                json(200, {
                    ok: true,
                    cenario: 'config',
                    modelo: getModeloSimulado(),
                });
                return;
            }
            case '/conectar':
                this.cb.onConectar();
                json(200, { ok: true, cenario: 'conectar' });
                return;
            case '/desconectar':
                this.cb.onDesconectar();
                json(200, { ok: true, cenario: 'desconectar' });
                return;
            case '/drop': {
                const ok = dispararQuedaSimulada();
                json(ok ? 200 : 409, {
                    ok,
                    cenario: 'drop',
                    erro: ok ? undefined : 'central desconectada',
                });
                return;
            }
            case '/ligacao':
                comSimulador((sim) => {
                    const origem = inteiro('origem', 201);
                    const destino = inteiro('destino', 204);
                    const atende = flag('atende', true);
                    const duracao = inteiro('duracao', 5);
                    sim.simularLigacao(origem, destino, atende, duracao);
                    return { cenario: 'ligacao', origem, destino, atende, duracao };
                });
                return;
            case '/acesso':
                comSimulador((sim) => {
                    const porteiro = inteiro('porteiro', 200);
                    const ramal = inteiro('ramal', 205);
                    sim.simularAcessoPorteiro(porteiro, ramal);
                    return { cenario: 'acesso', porteiro, ramal };
                });
                return;
            case '/acesso-senha':
                comSimulador((sim) => {
                    const porteiro = inteiro('porteiro', 200);
                    const ramal = inteiro('ramal', 205);
                    sim.simularAcessoSenha(porteiro, ramal);
                    return { cenario: 'acesso-senha', porteiro, ramal };
                });
                return;
            case '/alerta':
                comSimulador((sim) => {
                    const zona = inteiro('zona', 205);
                    const ativado = flag('ativado', true);
                    sim.simularAlerta(zona, ativado);
                    return { cenario: 'alerta', zona, ativado };
                });
                return;
            case '/alarme':
                comSimulador((sim) => {
                    const zona = inteiro('zona', 205);
                    const disparado = flag('disparado', true);
                    sim.simularAlarme(zona, disparado);
                    return { cenario: 'alarme', zona, disparado };
                });
                return;
            default:
                json(404, { ok: false, erro: `rota desconhecida: ${rota}` });
        }
    }
}
//# sourceMappingURL=control-server.js.map