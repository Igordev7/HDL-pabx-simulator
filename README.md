# pabx-hdl-simulator

Simulador **em processo** da central telefônica PABX HDL. Faz o papel da central
física: implementa o transporte serial que o CTI2 usa e devolve os mesmos
pacotes que uma HDL de verdade enviaria — handshake, relógio, ligações,
acessos de porteiro, alertas/alarmes e o envio/recebimento de programações.
Vem com um **painel de controle no navegador** para você disparar cada cenário
clicando num botão.

Serve para **rodar e testar o CTI2 sem hardware** — sem cabo serial, sem
central emprestada, sem esperar.

Repositório **independente**: o protocolo HDL (enums de comando/programação +
montagem/validação de frame + CRC) está copiado em `src/protocol/`, a interface
`SerialTransport` e o logger são próprios. Não depende de `electron` nem do
código do CTI2.

---

## Passo a passo — primeira vez

O CTI2 consome o simulador como dependência local (`"pabx-hdl-simulator":
"file:../pabx-hdl-simulator"` no `package.json`). Então este repositório
precisa estar **clonado na mesma pasta que o CTI2** (irmãos):

```
CTI/
├─ CTI2/                  ← o app
└─ pabx-hdl-simulator/    ← este repositório
```

1. **Clone este repositório ao lado do CTI2** (o `dist/` já vem versionado —
   não precisa buildar):
   ```bash
   cd ..    # a pasta que contém CTI2/
   git clone https://github.com/Igordev7/HDL-pabx-simulator.git pabx-hdl-simulator
   ```

2. **Instale no CTI2** (repita sempre que atualizar o simulador — `file:` é
   cópia, não link):
   ```bash
   cd CTI2
   yarn install
   ```

3. **Ligue o modo simulador.** Crie um arquivo vazio chamado `USAR_SIMULADOR`
   na raiz do CTI2 (é o jeito mais à prova de falha):
   ```bash
   # dentro de CTI2/
   ni USAR_SIMULADOR       # PowerShell
   touch USAR_SIMULADOR    # bash
   ```

4. **Suba o app:**
   ```bash
   yarn dev
   ```

5. **Confirme no log do terminal** (processo Electron):
   ```
   [CTI][APPLICATION] Transporte serial: SIMULATOR — CENTRAL SIMULADA ...
   [TRANSPORT] Modo resolvido: SIMULATOR
   [SIM][CTRL] Painel de controle do simulador: http://127.0.0.1:8777/
   ```
   Se disser `REAL`, o modo simulador não pegou — veja *Solução de problemas*.

6. **O painel abre sozinho no navegador** (`http://127.0.0.1:8777/`). Se não
   abrir, acesse a URL à mão.

7. **Na tela "Conectar PABX" do app, clique em Conectar** normalmente. A porta
   COM escolhida é ignorada; a central simulada responde ao handshake e passa a
   mandar o relógio a cada 10s.

8. **Clique em "Receber programações" no painel** (card *Programações*). Isso
   registra os ramais no banco do CTI2 — **sem esse passo, ligação entre ramais
   não entra no Histórico de Chamadas** (o CTI2 trata número desconhecido como
   linha externa e descarta).

Pronto. Agora é só clicar nos botões do painel para simular ligações, acessos,
alarmes, etc.

---

## Ligar e desligar

**Ligar o simulador** — qualquer um destes, checados nesta ordem:

| Forma | Como |
|---|---|
| Arquivo-marcador *(recomendado)* | `USAR_SIMULADOR` vazio na raiz do CTI2 + `yarn dev` |
| `.env` | linha `CENTRIX_TRANSPORT=sim` no `.env` do CTI2 + `yarn dev` |
| Script | `yarn dev:sim` |
| Flag | `yarn dev -- --sim` |
| Env na hora | `$env:CENTRIX_TRANSPORT='sim'; yarn dev` (PowerShell) |

**Desligar** — `CENTRIX_TRANSPORT=real` **vence tudo** (ignora `--sim` e o
arquivo-marcador):

```powershell
$env:CENTRIX_TRANSPORT='real'; yarn dev
```

⚠️ Só apagar o `USAR_SIMULADOR` **não basta se a variável ficou grudada no
terminal** (você rodou `dev:sim` ou setou `$env:CENTRIX_TRANSPORT` antes).
Nesse caso: feche a janela do terminal e abra outra, ou
`Remove-Item Env:\CENTRIX_TRANSPORT`, ou use o override `='real'` acima.
Confirme no log: `Transporte serial: REAL`.

Para o painel **não** abrir sozinho no navegador: `CENTRIX_SIM_OPEN_PANEL=0`.

---

## O painel de controle

`http://127.0.0.1:8777/` (porta em `CENTRIX_SIM_PORT`). É um **singleton** que o
`SerialService` sobe no boot e **sobrevive a desconexões** — não morre quando
você clica em "Desconectar".

Um selo mostra se a central está **conectada** (verde) ou **desconectada**
(vermelho). Cenário disparado enquanto desconectado devolve `409` e não trava
nada.

| Card | O que faz | Comando equivalente |
|---|---|---|
| **Central emulada** | Escolhe o modelo (todo o enum `CentraisHDL`), **Conectar / Desconectar** (handshake completo — é o que aplica o modelo e repopula "Informações do PABX"), **Salvar modelo** (só vale no próximo *Conectar*). | `/config?modelo=HDL32p` · `/conectar` · `/desconectar` |
| **Ligação** | origem, destino, duração(s), *Atendida*. Toca → (atende) → desliga. Atendida grava com duração; desmarcada grava como **não atendida**. | `/ligacao?origem=201&destino=204&atende=1&duracao=8` |
| **Acesso pelo porteiro** | porteiro, ramal → evento `ACESSO_PORTEIRO` + Histórico de Acesso. | `/acesso?porteiro=200&ramal=205` |
| **Acesso por senha** | ramal → acesso liberado por senha. | `/acesso-senha?ramal=205` |
| **Alerta / Alarme** | zona/ramal → `Alerta ativado/desativado`, `Alarme disparado/normalizado`. Vira evento no Histórico de Eventos. | `/alerta?zona=205&ativado=1` · `/alarme?zona=205&disparado=1` |
| **Queda de conexão** | Emite `error`/`close` — exercita a reconexão automática do CTI2. | `/drop` |
| **Programações** | pré-configura o próximo *Receber* e a resposta do *Enviar* (ver abaixo). | `/receber-config` · `/enviar-config` |

> **Ligação só entra no Histórico de Chamadas se origem E destino forem ramais
> que existem no cadastro** (registrados por um *Receber*). Número desconhecido
> vira "linha externa" e é descartado.

**Autoplay** (sem clicar em nada):
```bash
CENTRIX_SIM_AUTOPLAY=ligacao,acesso    # repete em loop
CENTRIX_SIM_AUTOPLAY_MS=25000          # intervalo (padrão 25s)
```

---

## Receber / Enviar programações

### Receber (`SOL_PROGRAMACAO`)

O **app** é quem inicia; o painel só **pré-configura** o próximo dump. A central
responde `RES_OK` e manda: N × `PROG_RML_CATEGORIA` (ramais primeiro) +
`PROG_CONFIGURACAO` + `PROG_FIM`.

Config no painel ou `/receber-config?ramais=16&inicial=200&porteiros=2&troncos=4&senha=1234`:

| Campo | O que faz |
|---|---|
| nº de ramais | quantos `PROG_RML_CATEGORIA` (1–250) |
| ramal inicial | `numeroFixo` do primeiro (flexível = fixo) |
| porteiros | os últimos N ramais viram `porteiro_fechadura` |
| troncos | quantidade de troncos no `PROG_CONFIGURACAO` |

### Enviar (`EFE_PROGRAMACAO` / `EFE_PROG_RML`)

Resposta configurável no painel ou `/enviar-config?resposta=ok|nok|timeout`:

- **`ok`** *(padrão)* — `RES_OK` a tudo. Além disso a central simulada **guarda
  o efeito** dos comandos que sabe decodificar (número flexível, hotline,
  desvio, tipo de toque) e devolve esses valores no próximo *Receber* — aí o
  fluxo **enviar → confirmar** fecha, não fica "pendente". Botão **"Resetar
  estado programado"** (`/receber-config?resetestado=1`) zera isso.
- **`nok`** — `RES_NOK` a tudo: exercita o fluxo de erro/pendência do app.
- **`timeout`** — não responde: exercita o retry/timeout do `Command`.

### Replay de um `serial.log` real

Para fidelidade total num *Receber*, aponte um `serial.log` capturado de uma
central de verdade (campo no painel ou
`/receber-config?replay=C:/caminho/serial.log`). O simulador extrai os frames
`PRODUTO ->` do arquivo e reenvia exatamente eles no lugar do dump sintético.
Ver `src/simulator/replay.ts`.

---

## Como funciona por dentro

```
 CTI2 (SerialConnection)                     pabx-hdl-simulator
 ─────────────────────────                   ──────────────────
 createTransport(params,'simulator')  ─────► new SimulatedSerialTransport(params)
        │                                            │
        │  .pipe(PacketLengthParser)  ◄────────────  rx: PassThrough  (a central "fala" por aqui)
        │  .write(bytesDoCTI)         ─────────────►  CentralSimulator.onBytesFromCti()
        │  .on('close'|'error')       ◄────────────  simulateDrop()  (rota /drop)
```

1. **`SimulatedSerialTransport`** (`src/simulated-serial-transport.ts`) — a casca
   que implementa `SerialTransport`. Não tem lógica de protocolo: `pipe()`
   devolve um `PassThrough` por onde a central emite bytes; `write()` entrega os
   bytes do CTI2 ao `CentralSimulator`; `close`/`error` são emitidos de verdade.
   O CTI2 não sabe que a "serial" é falsa.

2. **`CentralSimulator`** (`src/simulator/central-simulator.ts`) — o cérebro.
   Valida e faz o parse do frame recebido (`0xFA <len> <cmd> <dados> <crc>`) e,
   pelo `cmd`, decide a resposta:
   - `CONECTA_PABX` → frame de identificação (usa o modelo simulado);
   - `INFO_INSTALACAO` → ecoa os sentinelas que o CTI2 mandou;
   - `EFE_PROGRAMACAO` / `EFE_PROG_RML` → `RES_OK`/`NOK`/timeout + registra o
     efeito (`src/simulator/prog-estado.ts`);
   - `SOL_PROGRAMACAO` → `RES_OK` + o dump de programações
     (`src/simulator/scenarios.ts`, ou replay).
   Também expõe `simularLigacao`, `simularAcessoPorteiro`, `simularAlerta`, etc.,
   chamados pelo painel.

3. **`scenarios.ts`** — monta os quadros `INFO_RAMAL_TDI` / `INFO_DISCAGEM_TDI`
   dos cenários com os **offsets exatos** que os handlers do CTI2 leem.
   `buildFrame()` (`src/protocol/frame.ts`) calcula LEN + CRC igual ao firmware.

4. **`runtime.ts`** — estado global do simulador (modelo, resposta do envio,
   config de recebimento, simulador ativo). O painel e o CTI2 leem/escrevem
   aqui.

5. **`control-server.ts`** — servidor HTTP 127.0.0.1:8777, roteia as ações do
   painel para o `CentralSimulator` ativo. `control-panel.html.ts` é a página
   inteira (HTML/CSS/JS inline, zero dependência).

---

## Integração no CTI2

A "cola" fica **só do lado do CTI2** (~10 linhas), commitada em
`feature/simulador-transport`:

1. **Dependência** no `package.json` do CTI2:
   ```jsonc
   "dependencies": {
     "pabx-hdl-simulator": "file:../pabx-hdl-simulator"
   }
   ```
   `file:` (não `github:`): pra atualizar basta `git pull` neste repositório e
   `yarn install` no CTI2 — sem bumpar tag nem editar o `package.json`. O custo
   é que **cada dev precisa clonar este repo ao lado do CTI2** (o CI também, se
   for rodar o modo simulador).

   É `dependencies`, não `devDependencies`: um `import` estático do pacote
   precisa resolver também nos builds `--omit=dev`. Em produção o código fica
   inerte porque `resolveTransportMode()` devolve `real`.

2. **`createTransport`** (`src/electron/connection/serial/transport/create-transport.ts`):
   ```ts
   import { SimulatedSerialTransport } from 'pabx-hdl-simulator';
   // ...
   case 'simulator':
     return new SimulatedSerialTransport(params);
   ```

3. **`SerialService`** sobe o painel uma vez, no `register()`:
   ```ts
   import { SimulatorControlServer } from 'pabx-hdl-simulator';
   // iniciarSimulador(): if (resolveTransportMode() === 'simulator') { ... }
   SimulatorControlServer.iniciar({ onConectar, onDesconectar });
   ```

4. `resolveTransportMode` (env `CENTRIX_TRANSPORT` / `--sim` / arquivo
   `USAR_SIMULADOR`), o log de boot em `main.ts` e o script `dev:sim`
   **permanecem no CTI2**.

---

## Deixar o simulador mais imersivo com logs reais

O simulador de hoje é funcional mas não é o retrato fiel de uma central (as
categorias, rotas e interfones ficam nos defaults). Para aproximar:

1. Com a central **física** conectada no CTI2, faça **todo tipo de operação**:
   receber programações, enviar cada tipo (número flexível, hotline, desvio,
   categoria/porteiro, senha de fechadura, bloco, tempos, abertura de
   apartamento, portaria/síndico/programador, troncos…), uma ligação, um
   acesso, um alarme.
2. Guarde o **`serial.log`** inteiro dessa sessão (fica em
   `dist-electron/.../logs/` — o caminho aparece no log de boot). Cada linha tem
   o sentido (`CTI ->` / `PRODUTO ->`) e os bytes em hexa.
3. Manda o arquivo. Com ele dá para: (a) usar como **replay** direto; e (b)
   extrair os frames `PRODUTO ->` reais por comando e embutir em
   `central-simulator.ts` / `scenarios.ts`, para o dump sintético e as respostas
   de `EFE_*` baterem byte a byte com o firmware.

---

## Solução de problemas

**"A porta foi recusada" / `ERR_CONNECTION_REFUSED` no painel** — o app **não
está em modo simulador**, então o `SimulatedSerialTransport` nunca é criado e o
`:8777` nunca sobe.
1. No log, procure `[TRANSPORT] Modo resolvido: ...`. Se disser `REAL`, é isso.
2. Crie `USAR_SIMULADOR` (vazio) na raiz do CTI2, **feche o app inteiro** e
   `yarn dev` de novo. Recarregar só o Vite não reinicia o Electron.
3. Só então abra `http://127.0.0.1:8777/`.

**Ligação não aparece no Histórico de Chamadas** — origem e/ou destino não são
ramais cadastrados. Clique em **Receber programações** no painel primeiro.

**"enviar → confirmar" fica pendente** — a resposta do envio está em `nok`/
`timeout`, ou o campo alterado não é dos que o simulador decodifica (só número
flexível, hotline, desvio, tipo de toque fecham sozinhos). Ponha em `ok` e
clique em *Receber* de novo.

---

## Estrutura

```
src/
├─ protocol/              vendorizado do CTI2 — não editar aqui
│  ├─ crc.ts  frame.ts    montagem/validação de frame + CRC HDL
│  └─ *.enum.ts           comandos, programação, função, ramal, resposta, centrais
├─ transport.ts           interface SerialTransport
├─ logger.ts              logger de console mínimo
├─ simulated-serial-transport.ts
├─ simulator/
│  ├─ central-simulator.ts   o cérebro (recebe bytes, decide a resposta)
│  ├─ scenarios.ts           monta os quadros dos cenários
│  ├─ runtime.ts             estado global (modelo, config, ativo)
│  ├─ prog-estado.ts         guarda o efeito dos EFE_* pro próximo Receber
│  ├─ replay.ts              replay de serial.log real
│  ├─ control-server.ts      HTTP 127.0.0.1:8777
│  └─ control-panel.html.ts  a página do painel (inline)
└─ index.ts               API pública do pacote
```

---

## Desenvolvimento

```bash
npm run build       # tsc -> dist/
npm run typecheck   # tsc --noEmit
npm test            # vitest (46 testes: crc, frame, prog-estado, replay, central-simulator)
npm run test:watch
```

### Publicar uma mudança

O `dist/` é **versionado** (pra o `git pull` já trazer o build pronto). Então:

```bash
# neste repositório:
npm run build
git add -A && git commit -m "..."
git push
```

Nas máquinas que usam o simulador:

```bash
cd ../pabx-hdl-simulator && git pull
cd ../CTI2 && yarn install        # file: é cópia — precisa reinstalar
```

Não esqueça o `npm run build` antes do commit — sem ele o `dist/` fica velho e
o `git pull` traz código-fonte novo com build antigo.
