import { buildFrame } from '../protocol/frame.js';
import { ComandosPABX } from '../protocol/comandos.enum.js';
import { RamalStatus } from '../protocol/ramal.enum.js';
import { FuncaoPABX } from '../protocol/funcao.enum.js';
import { ProgramacaoPABX } from '../protocol/programacao.enum.js';
import { getRamalOverrides } from './prog-estado.js';
/**
 * numeroFixo <-> par de bytes, do jeito que os handlers reais decodificam:
 * `numeroFixo = 200 + hi * 256 + lo` (ver ramal.handler.ts / discagem.handler.ts).
 */
function ramalParaBytes(numeroFixo) {
    const base = Math.max(0, numeroFixo - 200);
    return [(base >> 8) & 0xff, base & 0xff];
}
const RAMAL_NENHUM = 0xff;
/**
 * Monta um quadro INFO_RAMAL_TDI (0x96) com os offsets que `ramal.handler.ts`
 * e `enlaces.handle.ts` leem do frame completo:
 *
 * - frame[4]  = status do ramal (RamalStatus)
 * - frame[6]  = RAMAL_A hi   (a "outra ponta" — origem quando ringando)
 * - frame[7]  = RAMAL_A lo
 * - frame[11] = via de comutação (enlace)
 * - frame[12] = RAMAL hi      (o ramal que reporta o próprio status)
 * - frame[13] = RAMAL lo
 * - frame[16] = função (FuncaoPABX) — alerta/alarme aqui não é chamada
 */
function frameRamalTdi(opts) {
    // data[i] = frame[3 + i]; precisa alcançar frame[16] => data[13].
    const data = new Array(15).fill(0);
    data[1] = opts.status; // frame[4]
    if (opts.ramalFixoA === null) {
        data[3] = RAMAL_NENHUM; // frame[6]
        data[4] = RAMAL_NENHUM; // frame[7]
    }
    else {
        const [aHi, aLo] = ramalParaBytes(opts.ramalFixoA);
        data[3] = aHi;
        data[4] = aLo;
    }
    data[8] = opts.via; // frame[11]
    const [hi, lo] = ramalParaBytes(opts.ramalFixo);
    data[9] = hi; // frame[12]
    data[10] = lo; // frame[13]
    data[13] = opts.funcao; // frame[16]
    return buildFrame(ComandosPABX.INFO_RAMAL_TDI, data);
}
/**
 * Monta um quadro INFO_DISCAGEM_TDI (0x9A), com os offsets de
 * `discagem.handler.ts`:
 *
 * - frame[3]/[4] = RAMAL_A  (origem / quem passou / zona)
 * - frame[5]/[6] = RAMAL    (destino / porteiro)
 * - frame[7]     = função (FuncaoPABX)
 * - frame[10]    = byte de sub-estado (nibble alto: alerta 0=ativado;
 *                  alarme 3=disparado; 0xBB = acesso com senha correta)
 */
function frameDiscagem(opts) {
    const data = new Array(8).fill(0); // alcança frame[10] => data[7]
    const [rHi, rLo] = ramalParaBytes(opts.ramalFixo);
    if (opts.ramalFixoA == null) {
        data[0] = RAMAL_NENHUM;
        data[1] = RAMAL_NENHUM;
    }
    else {
        const [aHi, aLo] = ramalParaBytes(opts.ramalFixoA);
        data[0] = aHi; // frame[3]
        data[1] = aLo; // frame[4]
    }
    data[2] = rHi; // frame[5]
    data[3] = rLo; // frame[6]
    data[4] = opts.funcao; // frame[7]
    data[7] = opts.subEstadoByte ?? 0x00; // frame[10]
    return buildFrame(ComandosPABX.INFO_DISCAGEM_TDI, data);
}
/**
 * Ligação interna: toca -> (atende) -> desliga. Gera um registro no Histórico
 * de Chamadas e acende/apaga um enlace.
 *
 * IMPORTANTE: `origemFixo` e `destinoFixo` precisam ser ramais que EXISTEM no
 * cadastro — senão o `ChamadaService` trata como "linha externa" e não grava.
 *
 * @param atende      `true` = chamada atendida (com duração de conversa);
 *                    `false` = não atendida (só toca e cai).
 * @param duracaoSeg  atendida: tempo de conversa; não atendida: tempo tocando.
 */
export function cenarioLigacao(origemFixo = 201, destinoFixo = 204, atende = true, duracaoSeg = 5) {
    const via = 1;
    const dur = Math.max(1, Math.round(duracaoSeg)) * 1000;
    const funcao = FuncaoPABX.FUNC_INTERNA;
    const toca = {
        emMs: 0,
        frame: frameRamalTdi({
            status: RamalStatus.RML_RINGANDO,
            ramalFixo: destinoFixo,
            ramalFixoA: origemFixo,
            via,
            funcao,
        }),
    };
    const desliga = (emMs) => ({
        emMs,
        frame: frameRamalTdi({
            status: RamalStatus.RML_DESOCUPADO,
            ramalFixo: destinoFixo,
            ramalFixoA: null,
            via: RAMAL_NENHUM,
            funcao,
        }),
    });
    if (!atende) {
        return [toca, desliga(dur)];
    }
    return [
        toca,
        {
            emMs: 1200,
            frame: frameRamalTdi({
                status: RamalStatus.RML_CONV_INT,
                ramalFixo: destinoFixo,
                ramalFixoA: origemFixo,
                via,
                funcao,
            }),
        },
        desliga(1200 + dur),
    ];
}
/**
 * Acesso liberado pelo porteiro — um único quadro INFO_DISCAGEM_TDI. Gera um
 * evento ACESSO_PORTEIRO e alimenta o Histórico de Acesso.
 */
export function cenarioAcessoPorteiro(porteiroFixo = 200, ramalFixo = 205) {
    return [
        {
            emMs: 0,
            frame: frameDiscagem({
                funcao: FuncaoPABX.FUNC_PORTEIRO,
                ramalFixo: porteiroFixo,
                ramalFixoA: ramalFixo,
            }),
        },
    ];
}
/**
 * Acesso liberado por SENHA CORRETA no porteiro (FUNC_ACESSO + byte 10 = 0xBB).
 * O `discagem.handler.ts` marca o evento como `senha_correta`.
 */
export function cenarioAcessoSenha(porteiroFixo = 200, ramalFixo = 205) {
    return [
        {
            emMs: 0,
            frame: frameDiscagem({
                funcao: FuncaoPABX.FUNC_ACESSO,
                ramalFixo: porteiroFixo,
                ramalFixoA: ramalFixo,
                subEstadoByte: 0xbb,
            }),
        },
    ];
}
/**
 * Alerta (FUNC_ALERTA). `ativado` controla o nibble alto do byte 10:
 * 0 = ativado, !=0 = desativado (ver discagem.handler.ts).
 */
export function cenarioAlerta(zonaFixo = 205, ativado = true) {
    return [
        {
            emMs: 0,
            frame: frameDiscagem({
                funcao: FuncaoPABX.FUNC_ALERTA,
                ramalFixo: zonaFixo,
                subEstadoByte: ativado ? 0x00 : 0x10,
            }),
        },
    ];
}
/**
 * Alarme (FUNC_ALARME). `disparado` controla o nibble alto do byte 10:
 * 3 = disparado, !=3 = normalizado.
 */
export function cenarioAlarme(zonaFixo = 205, disparado = true) {
    return [
        {
            emMs: 0,
            frame: frameDiscagem({
                funcao: FuncaoPABX.FUNC_ALARME,
                ramalFixo: zonaFixo,
                subEstadoByte: disparado ? 0x30 : 0x00,
            }),
        },
    ];
}
/**
 * Quadro INF_PROGRAMACAO / PROG_CONFIGURACAO (0x91 0x02). Offsets conforme
 * `prog-configuracao.handle.ts` (data = frame completo; data[3+i] = payload[i]).
 */
function frameProgConfiguracao(opts) {
    const p = new Array(30).fill(0);
    p[0] = ProgramacaoPABX.PROG_CONFIGURACAO;
    p[2] = opts.troncos & 0xff; // data[5]
    p[3] = (opts.qtdRamais >> 8) & 0xff; // data[6]
    p[4] = opts.qtdRamais & 0xff; // data[7]
    p[5] = (opts.senhaProgramador >> 8) & 0xff; // data[8]
    p[6] = opts.senhaProgramador & 0xff; // data[9]
    p[7] = 0xff; // data[10] \ portaria = nenhum (0xFFFF)
    p[8] = 0xff; // data[11] /
    p[11] = 0x00; // data[14] \ programador raw 0 -> numeroFixo 200
    p[12] = 0x00; // data[15] /
    p[25] = 0xff; // data[28] \ síndico = nenhum
    p[26] = 0xff; // data[29] /
    return buildFrame(ComandosPABX.INF_PROGRAMACAO, p);
}
/**
 * Quadro INF_PROGRAMACAO / PROG_RML_CATEGORIA (0x91 0x30). Offsets conforme
 * `programacao-ramal-categoria.handle.ts`:
 *
 * - data[4]/[5] = ramal físico (word); numeroFixo = word + 200
 * - data[6]/[7] = numeroFlexível  (ver combineBytesToWordRamalFlexivel)
 * - data[10]    = desvio: 0xF0 = SEM_DESVIO
 * - data[12]    = flags; bit 0x40 = porteiro
 * - data[22]    = hotline: nibble alto 0xF = SEM_HOT_LINE
 * - data[29]    = tipo de toque (1 = médio)
 * - precisa de pelo menos 47 bytes no frame
 */
function frameProgRamalCategoria(r, ov) {
    const flex = ov?.flexivel ?? r.flexivel ?? r.fixo;
    const wordFisico = Math.max(0, r.fixo - 200);
    const p = new Array(44).fill(0); // frame 49 bytes >= 47
    p[0] = ProgramacaoPABX.PROG_RML_CATEGORIA;
    p[1] = (wordFisico >> 8) & 0xff; // data[4]
    p[2] = wordFisico & 0xff; // data[5]
    p[3] = (flex >> 8) & 0xff; // data[6]
    p[4] = flex & 0xff; // data[7]
    // p[5],p[6] = 0 (data[8],data[9])
    // data[10]/[11] — desvio (aplicaDesvio em programacao-ramal-categoria.handle)
    p[7] = 0xf0; // SEM_DESVIO
    p[8] = 0xff;
    if (ov?.desvioModo && ov.desvioModo !== 'desativado') {
        const tipo = ov.desvioModo === 'sempre'
            ? 0x00
            : ov.desvioModo === 'ocupado'
                ? 0x10
                : 0x30; // externo
        const destFisico = ov.desvioDestinoFixo != null ? Math.max(0, ov.desvioDestinoFixo - 200) : 0;
        p[7] = tipo | ((destFisico >> 8) & 0x0f);
        p[8] = destFisico & 0xff;
    }
    p[9] = r.porteiro ? 0x40 : 0x00; // data[12]
    // data[22]/[23] — hotline (nibble alto 0xF = SEM_HOT_LINE; 0 = HOT_LINE_RAMAL)
    p[19] = 0xf0;
    p[20] = 0x00;
    if (ov?.hotline != null) {
        p[19] = (ov.hotline >> 8) & 0x0f;
        p[20] = ov.hotline & 0xff;
    }
    p[26] = ov?.toqueByte ?? 0x01; // data[29] tipo de toque (default = médio)
    return buildFrame(ComandosPABX.INF_PROGRAMACAO, p);
}
const CONFIG_DUMP_PADRAO = {
    qtdRamais: 11,
    ramalInicial: 200,
    qtdPorteiros: 0,
    troncos: 4,
    senhaProgramador: 1234,
};
/** Monta a lista de ramais do dump a partir da config. */
export function ramaisDoDump(cfg) {
    const lista = [];
    const primeiroPorteiro = cfg.qtdRamais - cfg.qtdPorteiros;
    for (let i = 0; i < cfg.qtdRamais; i++) {
        const fixo = cfg.ramalInicial + i;
        lista.push({ fixo, porteiro: i >= primeiroPorteiro });
    }
    return lista;
}
/**
 * Resposta ao SOL_PROGRAMACAO: um dump mínimo mas COMPLETO o suficiente para o
 * modal concluir e o "Salvar" popular o banco — PROG_RML_CATEGORIA por ramal,
 * PROG_CONFIGURACAO e o PROG_FIM.
 *
 * Não é o retrato fiel da central (interfones, categorias, rotas... ficam nos
 * defaults). Para fidelidade total, replay de um `serial.log` real — ver
 * SIMULADOR.md.
 */
export function cenarioReceberProgramacoes(cfg = CONFIG_DUMP_PADRAO) {
    const ramais = ramaisDoDump(cfg);
    // Inclui no dump qualquer ramal que o CTI programou mas que ficou fora da
    // faixa configurada — senão a edição dele nunca é confirmada.
    const overrides = getRamalOverrides();
    const jaTem = new Set(ramais.map((r) => r.fixo));
    for (const fixo of overrides.keys()) {
        if (!jaTem.has(fixo)) {
            ramais.push({ fixo });
        }
    }
    ramais.sort((a, b) => a.fixo - b.fixo);
    const passos = [];
    let t = 250;
    const passo = 40;
    // Ordem importa: o PRIMEIRO quadro é quem cria o esqueleto de
    // `programacaoRecebida` (com `interfoneFechadura`, `ramais`, ...). Se
    // PROG_CONFIGURACAO viesse primeiro, o objeto nasceria sem
    // `interfoneFechadura` e o `saveReceived` quebraria ao lê-lo. Por isso os
    // PROG_RML_CATEGORIA vêm antes.
    for (const r of ramais) {
        passos.push({ emMs: t, frame: frameProgRamalCategoria(r, overrides.get(r.fixo)) });
        t += passo;
    }
    passos.push({
        emMs: t,
        frame: frameProgConfiguracao({
            troncos: cfg.troncos,
            qtdRamais: ramais.length,
            senhaProgramador: cfg.senhaProgramador,
        }),
    });
    t += passo;
    passos.push({
        emMs: t,
        frame: buildFrame(ComandosPABX.INF_PROGRAMACAO, [ProgramacaoPABX.PROG_FIM]),
    });
    return passos;
}
//# sourceMappingURL=scenarios.js.map