/**
 * Página única servida em `GET /` pelo SimulatorControlServer. String isolada
 * só para não poluir o servidor. Sem dependências: HTML + CSS + JS inline.
 */
export const PAINEL_HTML = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Central Simulada CTI2</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #eef1f5;
    --card: #ffffff;
    --line: #e2e6ec;
    --text: #1c2430;
    --muted: #6b7787;
    --accent: #2f6fed;
    --accent-press: #2456c0;
    --danger: #e0463b;
    --ok: #1f9d57;
    --field: #f5f7fa;
    --shadow: 0 1px 2px rgba(20,30,45,.06), 0 6px 18px rgba(20,30,45,.06);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #14171c; --card: #1e222a; --line: #2c313b; --text: #e7ebf0;
      --muted: #93a0b1; --accent: #4d86f7; --accent-press: #3b6fd8;
      --field: #171b21; --shadow: 0 1px 2px rgba(0,0,0,.3), 0 8px 24px rgba(0,0,0,.28);
    }
  }
  * { box-sizing: border-box; }
  html, body { background: var(--bg); }
  body {
    margin: 0; padding: 28px 22px 40px; color: var(--text);
    font: 14px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif;
  }
  .wrap { max-width: 980px; margin: 0 auto; }

  header { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
  header h1 { font-size: 17px; font-weight: 650; margin: 0; letter-spacing: -.01em; }
  .pill {
    display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600;
    color: var(--ok); background: color-mix(in srgb, var(--ok) 14%, transparent);
    border-radius: 999px; padding: 3px 10px;
  }
  .pill::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--ok); }
  .pill.off { color: var(--danger); background: color-mix(in srgb, var(--danger) 14%, transparent); }
  .pill.off::before { background: var(--danger); }
  .lede { color: var(--muted); margin: 0 0 22px; font-size: 13px; }

  .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
  .card {
    background: var(--card); border: 1px solid var(--line); border-radius: 14px;
    padding: 18px; box-shadow: var(--shadow);
  }
  .card h2 {
    font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
    color: var(--muted); margin: 0 0 14px;
  }
  .fields { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
  .field { flex: 1 1 84px; display: flex; flex-direction: column; gap: 4px; }
  .field span { font-size: 11px; color: var(--muted); font-weight: 600; }
  .field input[type=number], .field input[type=text] {
    width: 100%; padding: 8px 10px; font-size: 14px; font-variant-numeric: tabular-nums;
    background: var(--field); color: var(--text);
    border: 1px solid var(--line); border-radius: 9px; outline: none;
  }
  .field input[type=text] { font-variant-numeric: normal; }
  .field input:focus, .field select:focus { border-color: var(--accent); }
  code { font: 11.5px ui-monospace, Menlo, Consolas, monospace; background: var(--field); padding: 1px 4px; border-radius: 4px; }
  .field select {
    width: 100%; padding: 8px 10px; font-size: 14px; background: var(--field); color: var(--text);
    border: 1px solid var(--line); border-radius: 9px; outline: none;
  }
  .toggle { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--muted); margin-bottom: 12px; }
  .toggle input { width: 16px; height: 16px; accent-color: var(--accent); }
  .card.span2 { grid-column: 1 / -1; }

  .btns { display: flex; flex-wrap: wrap; gap: 8px; }
  button {
    appearance: none; border: 0; cursor: pointer; font: inherit; font-weight: 600; font-size: 13px;
    padding: 9px 14px; border-radius: 9px; color: #fff; background: var(--accent);
    transition: filter .12s ease, transform .04s ease;
  }
  button:hover { filter: brightness(1.06); }
  button:active { transform: translateY(1px); }
  button.full { width: 100%; }
  button.ghost { background: transparent; color: var(--text); border: 1px solid var(--line); }
  button.ok { background: var(--ok); }
  button.danger { background: var(--danger); }
  .note { font-size: 11.5px; color: var(--muted); margin: 10px 0 0; }

  .logwrap { margin-top: 20px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; box-shadow: var(--shadow); overflow: hidden; }
  .logbar { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid var(--line); }
  .logbar span { font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--muted); }
  .logbar button { background: transparent; color: var(--muted); padding: 4px 8px; font-size: 12px; }
  #log {
    margin: 0; padding: 12px 16px; height: 170px; overflow: auto; white-space: pre-wrap;
    font: 12px/1.6 ui-monospace, "SF Mono", Menlo, Consolas, monospace; color: var(--muted);
  }
  #log b { color: var(--text); font-weight: 600; }
  #toast {
    position: fixed; left: 50%; bottom: 26px; transform: translateX(-50%) translateY(20px);
    background: var(--text); color: var(--card); padding: 10px 18px; border-radius: 10px;
    font-size: 13px; font-weight: 600; opacity: 0; pointer-events: none; transition: all .2s ease;
    box-shadow: 0 8px 30px rgba(0,0,0,.25); max-width: 90vw;
  }
  #toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  #toast.err { background: var(--danger); color: #fff; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>Central Simulada CTI2</h1>
    <span class="pill">simulador ativo</span>
  </header>
  <p class="lede">A central física não está ligada. Os botões abaixo injetam os pacotes direto no CTI.</p>

  <div class="grid">
    <div class="card span2">
      <h2>Central emulada <span id="conn-pill" class="pill" style="margin-left:8px">…</span></h2>
      <div class="fields">
        <label class="field" style="flex:2 1 240px">
          <span>Modelo (byte do RES_IDENTIF)</span>
          <select id="modelo">
            <option value="0x10">HDL 4/12</option>
            <option value="0x11">HDL 80p</option>
            <option value="0x12">HDL 128p</option>
            <option value="0x13">HDL 256p</option>
            <option value="0x14">HDL 368p</option>
            <option value="0x15">HDL 496p</option>
            <option value="0x16">HDL 744p</option>
            <option value="0x17">HDL 992p</option>
            <option value="0x20">HDL 412</option>
            <option value="0x21">HDL 72p</option>
            <option value="0x22">HDL 152p</option>
            <option value="0x23">HDL 312p</option>
            <option value="0x24">HDL 32p</option>
            <option value="0x25">HDL 28</option>
            <option value="0x26">HDL 48p</option>
          </select>
        </label>
      </div>
      <div class="btns">
        <button class="ghost" data-go="modelo">Salvar modelo</button>
        <button class="ok" data-go="conectar">Conectar</button>
        <button class="ghost" data-go="desconectar">Desconectar</button>
      </div>
      <p class="note" id="modelo-atual">modelo: …</p>
      <p class="note">O modelo só entra em vigor no próximo <b>Conectar</b> (é o handshake que relê o RES_IDENTIF).</p>
    </div>

    <div class="card span2">
      <h2>Programações</h2>
      <div class="fields">
        <label class="field"><span>Receber: nº de ramais</span><input id="rc-ramais" type="number" value="11" min="1" max="250" /></label>
        <label class="field"><span>Ramal inicial (fixo)</span><input id="rc-inicial" type="number" value="200" /></label>
        <label class="field"><span>Porteiros (últimos N)</span><input id="rc-porteiros" type="number" value="0" min="0" /></label>
        <label class="field"><span>Troncos</span><input id="rc-troncos" type="number" value="4" min="0" /></label>
      </div>
      <div class="fields" style="margin-top:6px">
        <label class="field" style="flex:3 1 340px">
          <span>Replay de captura real (opcional) — caminho de um serial.log</span>
          <input id="rc-replay" type="text" placeholder="ex.: C:\\...\\dist-electron\\logs\\serial.log" />
        </label>
      </div>
      <div class="btns">
        <button class="ghost" data-go="receber-config">Salvar config de Receber</button>
      </div>
      <p class="note">Aplica no próximo <b>Receber programações</b> do app (o app é quem inicia o SOL_PROGRAMACAO). Com um caminho de replay preenchido, o "Receber" reproduz os frames <code>91</code> daquele arquivo — é a única forma do <b>enviar → confirmar</b> bater 100% (o dump sintético não reflete o que você acabou de enviar, então a confirmação marca "Rejeitado").</p>
      <div class="fields" style="margin-top:14px">
        <label class="field" style="flex:2 1 220px">
          <span>Enviar: resposta da central ao EFE_*</span>
          <select id="en-resposta">
            <option value="ok">RES_OK (aceita tudo)</option>
            <option value="nok">RES_NOK (rejeita tudo — testa pendência/erro)</option>
            <option value="timeout">Timeout (não responde — testa retry)</option>
          </select>
        </label>
      </div>
      <div class="btns">
        <button class="ghost" data-go="enviar-config">Salvar resposta de Envio</button>
        <button class="ghost" data-go="reset-estado">Resetar estado programado</button>
      </div>
      <p class="note">Com <b>RES_OK</b>, o simulador guarda o que você enviou (flexível, hotline, desvio, toque) e devolve no próximo <b>Receber</b> — aí o <b>enviar → confirmar</b> bate. Os outros campos ainda ficam "pendente".</p>
      <p class="note" id="prog-atual">…</p>
    </div>

    <div class="card">
      <h2>Ligação</h2>
      <div class="fields">
        <label class="field"><span>Origem</span><input id="lig-origem" type="number" value="201" /></label>
        <label class="field"><span>Destino</span><input id="lig-destino" type="number" value="204" /></label>
        <label class="field"><span>Duração (s)</span><input id="lig-dur" type="number" value="5" min="1" /></label>
      </div>
      <label class="toggle"><input id="lig-atende" type="checkbox" checked /> Atendida <span style="opacity:.7">(desmarque = não atendida)</span></label>
      <div class="btns">
        <button class="full" data-go="ligacao">Simular ligação</button>
      </div>
      <p class="note">Origem e destino precisam existir no cadastro de ramais — senão o CTI trata como linha externa e não grava.</p>
    </div>

    <div class="card">
      <h2>Acesso pelo porteiro</h2>
      <div class="fields">
        <label class="field"><span>Porteiro</span><input id="ac-porteiro" type="number" value="200" /></label>
        <label class="field"><span>Ramal / visitante</span><input id="ac-ramal" type="number" value="205" /></label>
      </div>
      <div class="btns">
        <button data-go="acesso">Liberado pelo porteiro</button>
        <button class="ok" data-go="acesso-senha">Liberado por senha</button>
      </div>
    </div>

    <div class="card">
      <h2>Alerta / Alarme</h2>
      <div class="fields">
        <label class="field"><span>Zona / ramal</span><input id="ev-zona" type="number" value="205" /></label>
      </div>
      <div class="btns">
        <button data-go="alerta-on">Alerta ativado</button>
        <button class="ghost" data-go="alerta-off">Alerta desativado</button>
        <button class="danger" data-go="alarme-on">Alarme disparado</button>
        <button class="ghost" data-go="alarme-off">Alarme normalizado</button>
      </div>
    </div>

    <div class="card span2">
      <h2>Discagem <span id="disc-estado" class="pill" style="margin-left:8px">livre</span></h2>
      <p class="note" style="margin:0 0 12px">O ramal <b>Origem</b> está no telefone/interfone. Escolha uma ação e disque.</p>
      <div class="fields">
        <label class="field"><span>Origem (ramal)</span><input id="disc-origem" type="number" value="201" /></label>
        <label class="field"><span>Ação</span>
          <select id="disc-acao">
            <option value="ligar_ramal">Ligar para ramal</option>
            <option value="ligar_porteiro">Ligar para porteiro</option>
            <option value="alerta_on">Alerta ativar (*190)</option>
            <option value="alerta_off">Alerta desativar (*191)</option>
            <option value="alarme_on">Alarme disparar (*193)</option>
            <option value="alarme_off">Alarme normalizar (*192)</option>
          </select>
        </label>
        <label class="field" id="disc-alvo-wrap"><span>Alvo (ramal / porteiro)</span><input id="disc-alvo" type="number" value="204" /></label>
      </div>
      <div class="btns">
        <button class="ok" data-go="discar">Discar</button>
      </div>
      <div class="btns" id="disc-ramal-toca" style="display:none">
        <button class="ok" data-go="disc-atender">Atender (*)</button>
        <button class="ghost" data-go="disc-nao-atender">Não atender</button>
      </div>
      <div class="btns" id="disc-ramal-conversa" style="display:none">
        <button class="danger" data-go="disc-desligar">Desligar</button>
      </div>
      <div class="btns" id="disc-porteiro" style="display:none">
        <button class="ok" data-go="disc-fech-1">Abrir fechadura 1 (*1)</button>
        <button class="ok" data-go="disc-fech-2">Abrir fechadura 2 (*2)</button>
        <button class="ghost" data-go="disc-fech-3">Abrir ambas (*3)</button>
        <button class="danger" data-go="disc-desligar">Desligar</button>
      </div>
    </div>

    <div class="card">
      <h2>Conexão</h2>
      <p class="note" style="margin:0 0 12px">Derruba a conexão para exercitar a reconexão automática do CTI.</p>
      <div class="btns">
        <button class="danger full" data-go="drop">Simular queda de conexão</button>
      </div>
    </div>
  </div>

  <div class="logwrap">
    <div class="logbar"><span>Log</span><button id="clear">limpar</button></div>
    <pre id="log"></pre>
  </div>
</div>
<div id="toast"></div>

<script>
  var logEl = document.getElementById('log');
  var toastEl = document.getElementById('toast');
  var toastTimer;

  function n(id) { return document.getElementById(id).value; }
  function ck(id) { return document.getElementById(id).checked ? 1 : 0; }
  function hhmmss() { return new Date().toTimeString().slice(0, 8); }

  function log(txt, strong) {
    var l = document.createElement('span');
    l.innerHTML = '[' + hhmmss() + '] ' + (strong ? '<b>' + txt + '</b>' : txt) + '\\n';
    logEl.appendChild(l);
    logEl.scrollTop = logEl.scrollHeight;
  }
  function toast(msg, isErr) {
    toastEl.textContent = msg;
    toastEl.className = 'show' + (isErr ? ' err' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.className = ''; }, 2200);
  }

  function hit(path, params, label) {
    var qs = Object.keys(params).map(function (k) { return k + '=' + encodeURIComponent(params[k]); }).join('&');
    var url = path + (qs ? '?' + qs : '');
    log('→ ' + label, true);
    fetch(url).then(function (r) { return r.json(); }).then(function (j) {
      log('   ' + JSON.stringify(j));
      toast(label + ' ✓');
    }).catch(function (e) {
      log('   ERRO: ' + e.message);
      toast('Falhou: ' + e.message, true);
    });
  }

  var actions = {
    'modelo': function () {
      var m = document.getElementById('modelo');
      hit('/config', { modelo: m.value }, 'Modelo salvo → ' + m.options[m.selectedIndex].text);
      setTimeout(carregarEstado, 300);
    },
    'conectar': function () {
      hit('/conectar', {}, 'Conectar central');
      setTimeout(carregarEstado, 1500);
    },
    'desconectar': function () {
      hit('/desconectar', {}, 'Desconectar central');
      setTimeout(carregarEstado, 600);
    },
    'receber-config': function () {
      hit('/receber-config', {
        ramais: n('rc-ramais'), inicial: n('rc-inicial'),
        porteiros: n('rc-porteiros'), troncos: n('rc-troncos'),
        replay: document.getElementById('rc-replay').value
      }, 'Config de Receber salva');
      setTimeout(carregarEstado, 300);
    },
    'enviar-config': function () {
      var s = document.getElementById('en-resposta');
      hit('/enviar-config', { resposta: s.value }, 'Resposta de Envio → ' + s.value);
      setTimeout(carregarEstado, 300);
    },
    'reset-estado': function () {
      hit('/receber-config', { resetestado: 1 }, 'Estado programado zerado');
      setTimeout(carregarEstado, 300);
    },
    'ligacao': function () {
      var atende = ck('lig-atende');
      hit('/ligacao', { origem: n('lig-origem'), destino: n('lig-destino'), duracao: n('lig-dur'), atende: atende },
        'Ligação ' + n('lig-origem') + ' → ' + n('lig-destino') + (atende ? ' (atendida ' + n('lig-dur') + 's)' : ' (não atendida)'));
    },
    'acesso': function () {
      hit('/acesso', { porteiro: n('ac-porteiro'), ramal: n('ac-ramal') },
        'Acesso pelo porteiro ' + n('ac-porteiro') + ' / ramal ' + n('ac-ramal'));
    },
    'acesso-senha': function () {
      hit('/acesso-senha', { porteiro: n('ac-porteiro'), ramal: n('ac-ramal') },
        'Acesso por senha ' + n('ac-porteiro') + ' / ramal ' + n('ac-ramal'));
    },
    'alerta-on':  function () { hit('/alerta',  { zona: n('ev-zona'), ativado: 1 },   'Alerta ativado — zona ' + n('ev-zona')); },
    'alerta-off': function () { hit('/alerta',  { zona: n('ev-zona'), ativado: 0 },   'Alerta desativado — zona ' + n('ev-zona')); },
    'alarme-on':  function () { hit('/alarme',  { zona: n('ev-zona'), disparado: 1 }, 'Alarme disparado — zona ' + n('ev-zona')); },
    'alarme-off': function () { hit('/alarme',  { zona: n('ev-zona'), disparado: 0 }, 'Alarme normalizado — zona ' + n('ev-zona')); },
    'discar': function () {
      var acao = document.getElementById('disc-acao').value;
      hit('/discar', { origem: n('disc-origem'), acao: acao, alvo: n('disc-alvo') },
        'Discar: ' + acao + ' (origem ' + n('disc-origem') + ')');
      setTimeout(carregarEstado, 250);
    },
    'disc-atender':     function () { hit('/discar', { origem: n('disc-origem'), acao: 'atender' },     'Atender'); setTimeout(carregarEstado, 250); },
    'disc-nao-atender': function () { hit('/discar', { origem: n('disc-origem'), acao: 'nao_atender' }, 'Não atender'); setTimeout(carregarEstado, 250); },
    'disc-desligar':    function () { hit('/discar', { origem: n('disc-origem'), acao: 'desligar' },    'Desligar'); setTimeout(carregarEstado, 250); },
    'disc-fech-1': function () { hit('/discar', { origem: n('disc-origem'), acao: 'fechadura', fech: 1 }, 'Abrir fechadura 1 (*1)'); },
    'disc-fech-2': function () { hit('/discar', { origem: n('disc-origem'), acao: 'fechadura', fech: 2 }, 'Abrir fechadura 2 (*2)'); },
    'disc-fech-3': function () { hit('/discar', { origem: n('disc-origem'), acao: 'fechadura', fech: 3 }, 'Abrir ambas (*3)'); },
    'drop':       function () { hit('/drop', {}, 'Queda de conexão'); }
  };

  // Alvo só faz sentido pras duas ações "Ligar para ...".
  document.getElementById('disc-acao').addEventListener('change', function () {
    var lig = this.value === 'ligar_ramal' || this.value === 'ligar_porteiro';
    document.getElementById('disc-alvo-wrap').style.display = lig ? '' : 'none';
  });

  document.querySelectorAll('button[data-go]').forEach(function (b) {
    b.addEventListener('click', function () { actions[b.dataset.go](); });
  });
  document.getElementById('clear').addEventListener('click', function () { logEl.textContent = ''; });

  function carregarEstado() {
    fetch('/estado').then(function (r) { return r.json(); }).then(function (j) {
      if (!j) return;
      var pill = document.getElementById('conn-pill');
      pill.textContent = j.conectado ? 'conectada' : 'desconectada';
      pill.className = 'pill' + (j.conectado ? '' : ' off');
      if (j.modelo) {
        document.getElementById('modelo-atual').textContent =
          'modelo: ' + j.modelo.nome + ' (0x' + j.modelo.byte.toString(16) + ')';
        var sel = document.getElementById('modelo');
        var alvo = '0x' + j.modelo.byte.toString(16);
        for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].value === alvo) { sel.selectedIndex = i; break; }
        }
      }
      if (j.receber) {
        document.getElementById('rc-ramais').value = j.receber.qtdRamais;
        document.getElementById('rc-inicial').value = j.receber.ramalInicial;
        document.getElementById('rc-porteiros').value = j.receber.qtdPorteiros;
        document.getElementById('rc-troncos').value = j.receber.troncos;
      }
      if (typeof j.replay === 'string' && document.activeElement.id !== 'rc-replay') {
        document.getElementById('rc-replay').value = j.replay;
      }
      if (j.respostaEnvio) {
        document.getElementById('en-resposta').value = j.respostaEnvio;
        var origem = j.replay ? 'replay (' + j.replay + ')'
          : (j.receber ? j.receber.qtdRamais + ' ramais a partir de ' + j.receber.ramalInicial + ' (' + j.receber.qtdPorteiros + ' porteiros)' : '?');
        document.getElementById('prog-atual').textContent =
          'receber: ' + origem + '  •  enviar: ' + j.respostaEnvio +
          '  •  ramais programados na sessão: ' + (j.ramaisProgramados || 0);
      }
      renderChamada(j.chamada);
    }).catch(function () {});
  }

  function renderChamada(c) {
    var pill = document.getElementById('disc-estado');
    var toca = document.getElementById('disc-ramal-toca');
    var conv = document.getElementById('disc-ramal-conversa');
    var port = document.getElementById('disc-porteiro');
    toca.style.display = conv.style.display = port.style.display = 'none';
    if (!c) { pill.textContent = 'livre'; pill.className = 'pill off'; return; }
    pill.className = 'pill';
    if (c.tipo === 'porteiro') {
      pill.textContent = 'porteiro ' + c.alvo;
      port.style.display = '';
    } else if (c.estado === 'tocando') {
      pill.textContent = 'tocando ' + c.origem + ' → ' + c.alvo;
      toca.style.display = '';
    } else {
      pill.textContent = 'em conversa ' + c.origem + ' → ' + c.alvo;
      conv.style.display = '';
    }
  }
  setInterval(carregarEstado, 4000);

  log('painel pronto — ' + location.host);
  carregarEstado();
</script>
</body>
</html>`;
