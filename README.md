# Central simulada (`CENTRIX_TRANSPORT=sim`)

Roda o CTI2 sem central física. O `SimulatedSerialTransport` implementa o mesmo
contrato `SerialTransport` que a porta real, então `SerialConnection`,
`PacketLengthParser` e todos os handlers funcionam sem saber que a "serial" é
falsa.

## Como ligar

Qualquer um destes liga o simulador (checados nesta ordem):

1. **Arquivo-marcador (à prova de falha, recomendado no Windows).** Crie um
   arquivo vazio chamado `USAR_SIMULADOR` na raiz do projeto e rode `npm run dev`
   normal. Não depende de variável de ambiente chegar ao Electron.
   ```bash
   # na raiz do projeto:
   ni USAR_SIMULADOR        # PowerShell
   touch USAR_SIMULADOR     # bash
   ```
2. **`.env`.** Adicione `CENTRIX_TRANSPORT=sim` ao arquivo `.env` (o `main.ts`
   carrega no boot). Depois `npm run dev`.
3. **Variável de ambiente / script.** `npm run dev:sim`, ou no PowerShell
   `$env:CENTRIX_TRANSPORT='sim'; npm run dev`.

### Desligar o simulador

`CENTRIX_TRANSPORT=real` **vence tudo** (o `--sim` e o arquivo-marcador):

```bash
# PowerShell, na mesma janela:
$env:CENTRIX_TRANSPORT='real'; npm run dev
```

Só apagar o `USAR_SIMULADOR` e comentar o `.env` **não basta se a variável
ficou grudada no terminal** — foi o que aconteceu se você rodou
`$env:CENTRIX_TRANSPORT='sim'` antes, ou se está rodando `npm run dev:sim`. Uma
variável de ambiente do processo vence o `.env`. Soluções:

- **feche essa janela do terminal e abra outra**, aí `npm run dev`; ou
- `Remove-Item Env:\CENTRIX_TRANSPORT` e `npm run dev`; ou
- `$env:CENTRIX_TRANSPORT='real'` (override forte, acima).

Confirme no log: `[CTI][APPLICATION] Transporte serial: REAL`.

Confirme no log, ao subir o app, a linha:
`[TRANSPORT] Modo resolvido: SIMULATOR` seguida de
`*** CENTRAL SIMULADA ATIVA ***`. Se aparecer `REAL`, nenhum dos sinais acima
pegou.

Na tela "Conectar PABX" clique em conectar normalmente (a porta COM escolhida é
ignorada). A central simulada responde ao handshake (`CONECTA_PABX` →
`RES_IDENTIF`, `INFO_INSTALACAO` → `INFO_INSTALA_TDI`), confirma sincronização de
data/hora e emite um quadro de relógio a cada 10s para o watchdog do CTI ficar
satisfeito.

## Disparar eventos — telinha com botões

O painel (`http://127.0.0.1:8777/`, porta em `CENTRIX_SIM_PORT`) é um **singleton
iniciado por `SerialService` no boot** e **sobrevive a desconexões** — não morre
mais quando você clica em "Desconectar". Abre sozinho no navegador.

- **Central emulada**: escolhe o modelo (todo o enum `CentraisHDL`), botões
  **Conectar / Desconectar** (handshake completo — é o que aplica o modelo novo
  e repopula "Informações do PABX") e **Salvar modelo**. O modelo só vale no
  próximo *Conectar*. Também via env `CENTRIX_SIM_MODELO=HDL32p`.
- Um selo mostra se a central está **conectada** (verde) ou **desconectada**
  (vermelho). Cenários enquanto desconectado devolvem `409`, não travam.

| Cartão | O que faz |
|--------|-----------|
| **Ligação** — origem, destino, duração(s), *Atendida* | Toca → (atende) → desliga. Atendida grava com duração; desmarcada grava como **não atendida**. |
| **Acesso pelo porteiro** — porteiro, ramal | Evento `ACESSO_PORTEIRO` + Histórico de Acesso. |
| **Alerta / Alarme** — zona/ramal | `Alerta ativado/desativado` e `Alarme disparado/normalizado` (quadro `INFO_DISCAGEM_TDI` com `FUNC_ALERTA`/`FUNC_ALARME`). Vira evento no Histórico de Eventos. |
| **Queda de conexão** | Emite `error`/`close`, exercitando a reconexão automática. |

> **Ligação só entra no Histórico de Chamadas se origem E destino forem ramais
> que EXISTEM no cadastro.** Número que o CTI não conhece é tratado como linha
> externa e descartado (`[CHAMADA_SERVICE] ... envolve linha externa - não gravada`).

Para não abrir o navegador automaticamente: `CENTRIX_SIM_OPEN_PANEL=0`.
As mesmas ações por linha de comando:

```bash
curl "http://127.0.0.1:8777/ligacao?origem=201&destino=204&atende=1&duracao=8"
curl "http://127.0.0.1:8777/ligacao?origem=201&destino=204&atende=0"   # não atendida
curl "http://127.0.0.1:8777/acesso?porteiro=200&ramal=205"
curl "http://127.0.0.1:8777/alerta?zona=205&ativado=1"
curl "http://127.0.0.1:8777/alarme?zona=205&disparado=1"
curl "http://127.0.0.1:8777/drop"
```

## Receber / Enviar programações (card "Programações" do painel)

**Receber** (`SOL_PROGRAMACAO`): a central responde `RES_OK` e então um dump —
N `PROG_RML_CATEGORIA` (ramais primeiro, senão `saveReceived` quebra) +
`PROG_CONFIGURACAO` + `PROG_FIM`. Configurável no painel (ou
`/receber-config?ramais=16&inicial=200&porteiros=2&troncos=4&senha=1234`):

| Campo | O que faz |
|-------|-----------|
| nº de ramais | quantos `PROG_RML_CATEGORIA` (1–250) |
| ramal inicial | `numeroFixo` do primeiro (flexível = fixo) |
| porteiros | os últimos N ramais viram `porteiro_fechadura` |
| troncos | quantidade de troncos no `PROG_CONFIGURACAO` |

O app é quem inicia o `SOL_PROGRAMACAO` — o painel só **pré-configura** o
próximo. **Faça um "Receber" logo após conectar**: é o que registra os ramais
no banco (sem isso, ligação entre ramais não entra no histórico).

**Enviar** (`EFE_PROGRAMACAO` / `EFE_PROG_RML`): resposta configurável no painel
(ou `/enviar-config?resposta=ok|nok|timeout`):

- `ok` — `RES_OK` a tudo (padrão). **Além disso, a central simulada GUARDA o
  efeito** dos comandos que sabe decodificar — número flexível, hotline, desvio
  e tipo de toque de ramal — e devolve esses valores no próximo *Receber*. Aí o
  **enviar → confirmar** fecha (não fica "pendente"). Ramal editado que estava
  fora da faixa do dump é incluído automaticamente. Botão **"Resetar estado
  programado"** (ou `/receber-config?resetestado=1`) zera isso. Os demais campos
  ainda ficam "pendente" na verificação.
- `nok` — `RES_NOK` a tudo: exercita o fluxo de pendência/erro do app.
- `timeout` — não responde: exercita o retry/timeout do `Command`.

> Não é o retrato fiel da central (categorias, rotas, interfones ficam nos
> defaults). Para fidelidade total, replay de um `serial.log` real no lugar de
> `cenarioReceberProgramacoes()` em `scenarios.ts`.

## "A porta foi recusada" / `ERR_CONNECTION_REFUSED` no painel

Os dois sintomas têm a mesma causa: **o app não está em modo simulador**, então
o `SimulatedSerialTransport` nunca é criado e o painel (`:8777`) nunca sobe.

1. No log do processo principal, procure `[TRANSPORT] Modo resolvido: ...`. Se
   disser `REAL`, é isso.
2. Use o **arquivo-marcador**: crie `USAR_SIMULADOR` (vazio) na raiz do projeto,
   **feche o app inteiro** e rode `npm run dev` de novo. Recarregar só o Vite
   não reinicia o Electron — o processo principal fica com a decisão antiga.
3. Só então abra `http://127.0.0.1:8777/` (ou espere abrir sozinho).

## Autoplay (sem interação)

```bash
CENTRIX_SIM_AUTOPLAY=ligacao,acesso   # cenários repetidos em loop
CENTRIX_SIM_AUTOPLAY_MS=25000         # intervalo (padrão 25s)
```

## Estrutura

| Arquivo | Papel |
|---------|-------|
| `simulated-serial-transport.ts` | Adapta a central virtual ao contrato `SerialTransport` (pipe/write/close/error). |
| `simulator/central-simulator.ts` | O "cérebro": recebe os bytes do CTI e decide o que a central responde. |
| `simulator/scenarios.ts` | Monta os quadros `INFO_RAMAL_TDI` / `INFO_DISCAGEM_TDI` dos cenários, com os offsets que os handlers reais leem. |
| `simulator/control-server.ts` | Servidor HTTP local + abre o painel no navegador. |
| `simulator/control-panel.html.ts` | A página da telinha (HTML/CSS/JS inline, sem dependências). |

## Adicionando realismo

Os frames são montados com `buildFrame()` (`../protocol/frame.ts`), que calcula
LEN + CRC igual ao firmware. Para reproduzir um fluxo real, pegue os frames
`PRODUTO ->` de um `serial.log` capturado e devolva-os de `central-simulator.ts`
(ex.: no `case ComandosPABX.SOL_PROGRAMACAO`, ainda um TODO — hoje só confirma
com `RES_OK`).
