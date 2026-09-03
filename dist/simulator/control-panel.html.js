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
    --line: #e3e7ee;
    --line-strong: #cdd4de;
    --text: #1b2330;
    --muted: #66717f;
    --accent: #2f6fed;
    --accent-weak: color-mix(in srgb, var(--accent) 10%, transparent);
    --danger: #dc4438;
    --danger-weak: color-mix(in srgb, var(--danger) 12%, transparent);
    --ok: #128a4c;
    --ok-weak: color-mix(in srgb, var(--ok) 12%, transparent);
    --warn: #b7791f;
    --field: #f4f6f9;
    --radius: 12px;
    --shadow: 0 1px 2px rgba(20,30,45,.05), 0 8px 24px rgba(20,30,45,.06);
    --sp: 8px;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #12151a; --card: #1c2027; --line: #2b313b; --line-strong: #3a414d;
      --text: #e8ecf1; --muted: #98a4b3; --accent: #5088f6;
      --danger: #ef5a4e; --ok: #26a862; --warn: #d99a3a;
      --field: #161a20;
      --shadow: 0 1px 2px rgba(0,0,0,.3), 0 10px 28px rgba(0,0,0,.3);
    }
  }
  * { box-sizing: border-box; }
  html, body { background: var(--bg); }
  body {
    margin: 0; padding: 28px 20px 48px; color: var(--text);
    font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 1000px; margin: 0 auto; }

  /* ---- header ---- */
  header { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
  header h1 { font-size: 17px; font-weight: 660; margin: 0; letter-spacing: -.01em; }
  .lede { color: var(--muted); margin: 6px 0 24px; font-size: 13px; }

  /* ---- status pill ---- */
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 600; line-height: 1;
    color: var(--ok); background: var(--ok-weak);
    border-radius: 999px; padding: 5px 11px 5px 9px;
  }
  .pill::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
  .pill.off  { color: var(--danger); background: var(--danger-weak); }
  .pill.warn { color: var(--warn); background: color-mix(in srgb, var(--warn) 14%, transparent); }

  /* ---- grid + cards ---- */
  .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
  .card {
    background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
    padding: 18px; box-shadow: var(--shadow); display: flex; flex-direction: column;
  }
  .card.span2 { grid-column: 1 / -1; }
  .card-head {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }
  .card-head h2 {
    font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
    color: var(--muted); margin: 0;
  }
  .card-head .pill { margin-left: auto; }

  /* ---- fields ---- */
  .fields { display: flex; gap: 12px; flex-wrap: wrap; }
  .fields + .fields { margin-top: 12px; }
  .field { flex: 1 1 120px; display: flex; flex-direction: column; gap: 5px; min-width: 0; }
  .field > span { font-size: 11px; color: var(--muted); font-weight: 600; }
  .field input, .field select {
    width: 100%; padding: 9px 11px; font-size: 14px; font-family: inherit;
    background: var(--field); color: var(--text);
    border: 1px solid var(--line-strong); border-radius: 9px; outline: none;
    transition: border-color .12s ease, box-shadow .12s ease;
  }
  .field input[type=number] { font-variant-numeric: tabular-nums; }
  .field input:focus, .field select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-weak);
  }
  .toggle { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--muted); }
  .toggle input { width: 16px; height: 16px; accent-color: var(--accent); }
  code {
    font: 11.5px ui-monospace, Menlo, Consolas, monospace;
    background: var(--field); padding: 1px 5px; border-radius: 4px; border: 1px solid var(--line);
  }

  /* ---- buttons: um estilo = um significado ---- */
  .btns { display: flex; flex-wrap: wrap; gap: var(--sp); margin-top: 14px; }
  .btn {
    appearance: none; cursor: pointer; font: inherit; font-weight: 600; font-size: 13px;
    min-height: 38px; padding: 0 16px; border-radius: 9px;
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    border: 1px solid transparent; color: #fff; background: var(--accent);
    transition: filter .12s ease, transform .04s ease;
  }
  .btn:hover { filter: brightness(1.07); }
  .btn:active { transform: translateY(1px); }
  .btn.full { width: 100%; }
  .btn.ok     { background: var(--ok); }
  .btn.danger { background: var(--danger); }
  .btn.ghost  { background: transparent; color: var(--text); border-color: var(--line-strong); }
  .btn.ghost:hover { background: var(--field); filter: none; }
  .btn:disabled { opacity: .4; cursor: not-allowed; filter: none; transform: none; }

  /* segmented: escolhas irmãs coladas (ex.: fechaduras) */
  .segmented { display: inline-flex; border: 1px solid var(--line-strong); border-radius: 9px; overflow: hidden; }
  .segmented .btn { border: 0; border-radius: 0; background: var(--card); color: var(--text); min-height: 40px; }
  .segmented .btn + .btn { border-left: 1px solid var(--line-strong); }
  .segmented .btn:hover { background: var(--field); filter: none; }

  .note { font-size: 11.5px; line-height: 1.5; color: var(--muted); margin: 12px 0 0; }
  .note b { color: var(--text); font-weight: 600; }
  .grow { flex: 1; }

  /* ---- Discagem: zona de chamada contextual ---- */
  .callbox {
    margin-top: 14px; border: 1px dashed var(--line-strong); border-radius: 10px;
    padding: 14px; background: var(--field);
    display: flex; flex-direction: column; gap: 12px;
  }
  .callbox[data-tipo="porteiro"] { border-color: color-mix(in srgb, var(--ok) 45%, var(--line-strong)); background: var(--ok-weak); }
  .callbox[data-tipo="tocando"]  { border-color: color-mix(in srgb, var(--warn) 45%, var(--line-strong)); background: color-mix(in srgb, var(--warn) 8%, transparent); }
  .callbox[data-tipo="conversa"] { border-color: color-mix(in srgb, var(--accent) 40%, var(--line-strong)); background: var(--accent-weak); }
  .callbox-line { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .callbox-title { font-weight: 650; font-size: 13px; }
  .callbox-sub { color: var(--muted); font-size: 12px; }
  .callbox .btns { margin-top: 0; }
  .muted-hint { color: var(--muted); font-size: 12.5px; }

  /* ---- log ---- */
  .logwrap { margin-top: 20px; background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
  .logbar { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid var(--line); }
  .logbar span { font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--muted); }
  .logbar button { background: transparent; border: 0; color: var(--muted); padding: 4px 8px; font: inherit; font-size: 12px; cursor: pointer; border-radius: 6px; }
  .logbar button:hover { background: var(--field); }
  #log {
    margin: 0; padding: 12px 16px; height: 180px; overflow: auto; white-space: pre-wrap;
    font: 12px/1.65 ui-monospace, "SF Mono", Menlo, Consolas, monospace; color: var(--muted);
  }
  #log b { color: var(--text); font-weight: 600; }

  #toast {
    position: fixed; left: 50%; bottom: 26px; transform: translateX(-50%) translateY(20px);
    background: var(--text); color: var(--card); padding: 11px 18px; border-radius: 10px;
    font-size: 13px; font-weight: 600; opacity: 0; pointer-events: none; transition: all .2s ease;
    box-shadow: 0 10px 34px rgba(0,0,0,.28); max-width: 90vw;
  }
  #toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  #toast.err { background: var(--danger); color: #fff; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>Central Simulada CTI2</h1>
    <span id="conn-pill" class="pill off" style="margin-left:auto">verificando…</span>
  </header>
  <p class="lede">A central física não está ligada. As ações abaixo injetam os pacotes direto no CTI2.</p>

  <div class="grid">

    <!-- ============ CENTRAL ============ -->
    <div class="card span2">
      <div class="card-head"><h2>Central emulada</h2></div>
      <div class="fields">
        <label class="field" style="flex:2 1 260px">
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
        <button class="btn" data-go="conectar">Conectar</button>
        <button class="btn ghost" data-go="desconectar">Desconectar</button>
        <span class="grow"></span>
        <button class="btn ghost" data-go="modelo">Salvar modelo</button>
      </div>
      <p class="note" id="modelo-atual">modelo: …</p>
      <p class="note">O modelo entra em vigor no próximo <b>Conectar</b> (é o handshake que relê o RES_IDENTIF).</p>
    </div>

    <!-- ============ PROGRAMAÇÕES ============ -->
    <div class="card span2">
      <div class="card-head"><h2>Programações</h2></div>

      <div class="fields">
        <label class="field"><span>Receber — nº de ramais</span><input id="rc-ramais" type="number" value="11" min="1" max="250" /></label>
        <label class="field"><span>Ramal inicial (fixo)</span><input id="rc-inicial" type="number" value="200" /></label>
        <label class="field"><span>Porteiros (últimos N)</span><input id="rc-porteiros" type="number" value="0" min="0" /></label>
        <label class="field"><span>Troncos</span><input id="rc-troncos" type="number" value="4" min="0" /></label>
      </div>
      <div class="fields">
        <label class="field" style="flex:3 1 340px">
          <span>Replay (opcional) — caminho de um serial.log real</span>
          <input id="rc-replay" type="text" placeholder="ex.: C:\\...\\dist-electron\\logs\\serial.log" />
        </label>
      </div>
      <div class="btns">
        <button class="btn ghost" data-go="receber-config">Salvar config de Receber</button>
      </div>
      <p class="note">Aplica no próximo <b>Receber programações</b> do app (o app é quem inicia o SOL_PROGRAMACAO). Com um caminho de replay preenchido, o "Receber" reproduz os frames <code>91</code> daquele arquivo — é a única forma do <b>enviar → confirmar</b> bater 100%.</p>

      <div class="fields" style="margin-top:16px">
        <label class="field" style="flex:2 1 260px">
          <span>Enviar — resposta da central ao EFE_*</span>
          <select id="en-resposta">
            <option value="ok">RES_OK — aceita tudo</option>
            <option value="nok">RES_NOK — rejeita tudo (testa pendência/erro)</option>
            <option value="timeout">Timeout — não responde (testa retry)</option>
          </select>
        </label>
      </div>
      <div class="btns">
        <button class="btn ghost" data-go="enviar-config">Salvar resposta de Envio</button>
        <button class="btn ghost" data-go="reset-estado">Resetar estado programado</button>
      </div>
      <p class="note">Com <b>RES_OK</b> o simulador guarda o que você enviou (flexível, hotline, desvio, toque) e devolve no próximo <b>Receber</b> — aí o <b>enviar → confirmar</b> bate.</p>
      <p class="note" id="prog-atual">…</p>
    </div>

    <!-- ============ DISCAGEM ============ -->
    <div class="card span2">
      <div class="card-head">
        <h2>Discagem</h2>
        <span id="disc-estado" class="pill off">livre</span>
      </div>
      <p class="muted-hint" style="margin:-4px 0 4px">O ramal <b>Origem</b> está no telefone/interfone. Escolha uma ação e disque.</p>

      <div class="fields">
        <label class="field"><span>Origem (ramal)</span><input id="disc-origem" type="number" value="201" /></label>
        <label class="field" style="flex:2 1 200px"><span>Ação</span>
          <select id="disc-acao">
            <option value="ligar_ramal">Ligar para ramal</option>
            <option value="ligar_porteiro">Ligar para porteiro</option>
            <option value="alerta_on">Ativar alerta (*190)</option>
            <option value="alerta_off">Desativar alerta (*191)</option>
            <option value="alarme_on">Disparar alarme (*193)</option>
            <option value="alarme_off">Normalizar alarme (*192)</option>
          </select>
        </label>
        <label class="field" id="disc-alvo-wrap"><span>Alvo (ramal / porteiro)</span><input id="disc-alvo" type="number" value="204" /></label>
      </div>
      <div class="btns">
        <button class="btn" data-go="discar">Discar</button>
      </div>

      <div class="callbox" id="disc-callbox" hidden>
        <div class="callbox-line">
          <span class="callbox-title" id="disc-cb-title">—</span>
          <span class="callbox-sub" id="disc-cb-sub"></span>
        </div>
        <div id="disc-cb-actions"></div>
      </div>
    </div>

    <!-- ============ LIGAÇÃO (rápida) ============ -->
    <div class="card">
      <div class="card-head"><h2>Ligação rápida</h2></div>
      <div class="fields">
        <label class="field"><span>Origem</span><input id="lig-origem" type="number" value="201" /></label>
        <label class="field"><span>Destino</span><input id="lig-destino" type="number" value="204" /></label>
        <label class="field"><span>Duração (s)</span><input id="lig-dur" type="number" value="5" min="1" /></label>
      </div>
      <label class="toggle" style="margin-top:12px"><input id="lig-atende" type="checkbox" checked /> Atendida</label>
      <div class="btns"><button class="btn full" data-go="ligacao">Simular ligação completa</button></div>
      <p class="note">Toca → (atende) → desliga num passo só. Origem e destino precisam existir no cadastro de ramais.</p>
    </div>

    <!-- ============ ACESSO ============ -->
    <div class="card">
      <div class="card-head"><h2>Acesso pelo porteiro</h2></div>
      <div class="fields">
        <label class="field"><span>Porteiro</span><input id="ac-porteiro" type="number" value="200" /></label>
        <label class="field"><span>Ramal / visitante</span><input id="ac-ramal" type="number" value="205" /></label>
      </div>
      <div class="btns">
        <button class="btn" data-go="acesso">Liberado pelo porteiro</button>
        <button class="btn ok" data-go="acesso-senha">Liberado por senha</button>
      </div>
    </div>

    <!-- ============ ALERTA / ALARME ============ -->
    <div class="card">
      <div class="card-head"><h2>Alerta / Alarme</h2></div>
      <div class="fields">
        <label class="field"><span>Zona / ramal</span><input id="ev-zona" type="number" value="205" /></label>
      </div>
      <div class="btns">
        <button class="btn" data-go="alerta-on">Ativar alerta</button>
        <button class="btn ghost" data-go="alerta-off">Desativar</button>
      </div>
      <div class="btns" style="margin-top:8px">
        <button class="btn danger" data-go="alarme-on">Disparar alarme</button>
        <button class="btn ghost" data-go="alarme-off">Normalizar</button>
      </div>
    </div>

    <!-- ============ CONEXÃO ============ -->
    <div class="card">
      <div class="card-head"><h2>Conexão</h2></div>
      <p class="muted-hint">Derruba a conexão para exercitar a reconexão automática do CTI2.</p>
      <div class="btns"><button class="btn danger full" data-go="drop">Simular queda de conexão</button></div>
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

  function hit(path, params, label, then) {
    var qs = Object.keys(params).map(function (k) { return k + '=' + encodeURIComponent(params[k]); }).join('&');
    var url = path + (qs ? '?' + qs : '');
    log('→ ' + label, true);
    fetch(url).then(function (r) { return r.json(); }).then(function (j) {
      log('   ' + JSON.stringify(j));
      toast(label + (j && j.ok === false ? ' — ' + (j.erro || 'falhou') : ' ✓'), j && j.ok === false);
      if (then) then(j);
    }).catch(function (e) {
      log('   ERRO: ' + e.message);
      toast('Falhou: ' + e.message, true);
    });
  }
  function discar(params, label) {
    params.origem = n('disc-origem');
    hit('/discar', params, label, function () { setTimeout(carregarEstado, 200); });
  }

  var actions = {
    'modelo': function () {
      var m = document.getElementById('modelo');
      hit('/config', { modelo: m.value }, 'Modelo → ' + m.options[m.selectedIndex].text, function () { setTimeout(carregarEstado, 300); });
    },
    'conectar':    function () { hit('/conectar', {}, 'Conectar central', function () { setTimeout(carregarEstado, 1500); }); },
    'desconectar': function () { hit('/desconectar', {}, 'Desconectar central', function () { setTimeout(carregarEstado, 600); }); },
    'receber-config': function () {
      hit('/receber-config', {
        ramais: n('rc-ramais'), inicial: n('rc-inicial'),
        porteiros: n('rc-porteiros'), troncos: n('rc-troncos'),
        replay: document.getElementById('rc-replay').value
      }, 'Config de Receber salva', function () { setTimeout(carregarEstado, 300); });
    },
    'enviar-config': function () {
      var s = document.getElementById('en-resposta');
      hit('/enviar-config', { resposta: s.value }, 'Resposta de Envio → ' + s.value, function () { setTimeout(carregarEstado, 300); });
    },
    'reset-estado': function () { hit('/receber-config', { resetestado: 1 }, 'Estado programado zerado', function () { setTimeout(carregarEstado, 300); }); },
    'ligacao': function () {
      var atende = ck('lig-atende');
      hit('/ligacao', { origem: n('lig-origem'), destino: n('lig-destino'), duracao: n('lig-dur'), atende: atende },
        'Ligação ' + n('lig-origem') + ' → ' + n('lig-destino') + (atende ? ' (atendida ' + n('lig-dur') + 's)' : ' (não atendida)'));
    },
    'acesso':       function () { hit('/acesso', { porteiro: n('ac-porteiro'), ramal: n('ac-ramal') }, 'Acesso pelo porteiro ' + n('ac-porteiro')); },
    'acesso-senha': function () { hit('/acesso-senha', { porteiro: n('ac-porteiro'), ramal: n('ac-ramal') }, 'Acesso por senha ' + n('ac-porteiro')); },
    'alerta-on':  function () { hit('/alerta', { zona: n('ev-zona'), ativado: 1 },   'Alerta ativado — zona ' + n('ev-zona')); },
    'alerta-off': function () { hit('/alerta', { zona: n('ev-zona'), ativado: 0 },   'Alerta desativado — zona ' + n('ev-zona')); },
    'alarme-on':  function () { hit('/alarme', { zona: n('ev-zona'), disparado: 1 }, 'Alarme disparado — zona ' + n('ev-zona')); },
    'alarme-off': function () { hit('/alarme', { zona: n('ev-zona'), disparado: 0 }, 'Alarme normalizado — zona ' + n('ev-zona')); },
    'discar': function () {
      var acao = document.getElementById('disc-acao').value;
      discar({ acao: acao, alvo: n('disc-alvo') }, 'Discar: ' + document.getElementById('disc-acao').selectedOptions[0].text);
    },
    'disc-atender':     function () { discar({ acao: 'atender' }, 'Atender'); },
    'disc-nao-atender': function () { discar({ acao: 'nao_atender' }, 'Recusar'); },
    'disc-desligar':    function () { discar({ acao: 'desligar' }, 'Desligar'); },
    'disc-fech-1': function () { discar({ acao: 'fechadura', fech: 1 }, 'Abrir fechadura 1 (*1)'); },
    'disc-fech-2': function () { discar({ acao: 'fechadura', fech: 2 }, 'Abrir fechadura 2 (*2)'); },
    'disc-fech-3': function () { discar({ acao: 'fechadura', fech: 3 }, 'Abrir ambas (*3)'); },
    'drop': function () { hit('/drop', {}, 'Queda de conexão'); }
  };

  // "Alvo" só aparece nas duas ações "Ligar para ...".
  document.getElementById('disc-acao').addEventListener('change', function () {
    var lig = this.value === 'ligar_ramal' || this.value === 'ligar_porteiro';
    document.getElementById('disc-alvo-wrap').style.display = lig ? '' : 'none';
  });

  document.body.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-go]');
    if (b && actions[b.dataset.go]) actions[b.dataset.go]();
  });
  document.getElementById('clear').addEventListener('click', function () { logEl.textContent = ''; });

  // ---- render da chamada em andamento (card Discagem) ----
  function renderChamada(c) {
    var pill = document.getElementById('disc-estado');
    var box = document.getElementById('disc-callbox');
    var title = document.getElementById('disc-cb-title');
    var sub = document.getElementById('disc-cb-sub');
    var acts = document.getElementById('disc-cb-actions');

    if (!c) {
      pill.textContent = 'livre'; pill.className = 'pill off';
      box.hidden = true; box.removeAttribute('data-tipo'); acts.innerHTML = '';
      return;
    }

    if (c.tipo === 'porteiro') {
      pill.textContent = 'no porteiro ' + c.alvo; pill.className = 'pill';
      box.dataset.tipo = 'porteiro';
      title.textContent = 'Em conversa com o porteiro ' + c.alvo;
      sub.textContent = 'ramal ' + c.origem + ' — disque *1 / *2 / *3 para abrir';
      acts.innerHTML =
        '<div class="callbox-line">' +
          '<div class="segmented">' +
            '<button class="btn" data-go="disc-fech-1">Fechadura 1 · *1</button>' +
            '<button class="btn" data-go="disc-fech-2">Fechadura 2 · *2</button>' +
            '<button class="btn" data-go="disc-fech-3">Ambas · *3</button>' +
          '</div>' +
          '<span class="grow"></span>' +
          '<button class="btn danger" data-go="disc-desligar">Desligar</button>' +
        '</div>';
    } else if (c.estado === 'tocando') {
      pill.textContent = 'tocando'; pill.className = 'pill warn';
      box.dataset.tipo = 'tocando';
      title.textContent = 'Chamando ' + c.alvo;
      sub.textContent = 'de ' + c.origem + ' — o ramal ' + c.alvo + ' está tocando';
      acts.innerHTML =
        '<div class="btns">' +
          '<button class="btn ok" data-go="disc-atender">Atender</button>' +
          '<button class="btn ghost" data-go="disc-nao-atender">Recusar</button>' +
        '</div>';
    } else {
      pill.textContent = 'em conversa'; pill.className = 'pill';
      box.dataset.tipo = 'conversa';
      title.textContent = 'Em conversa ' + c.origem + ' → ' + c.alvo;
      sub.textContent = 'chamada atendida';
      acts.innerHTML =
        '<div class="btns"><button class="btn danger" data-go="disc-desligar">Desligar</button></div>';
    }
    box.hidden = false;
  }

  function carregarEstado() {
    fetch('/estado').then(function (r) { return r.json(); }).then(function (j) {
      if (!j) return;
      var pill = document.getElementById('conn-pill');
      pill.textContent = j.conectado ? 'central conectada' : 'central desconectada';
      pill.className = 'pill' + (j.conectado ? '' : ' off');

      if (j.modelo) {
        document.getElementById('modelo-atual').textContent =
          'modelo atual: ' + j.modelo.nome + ' (0x' + j.modelo.byte.toString(16) + ')';
        var sel = document.getElementById('modelo');
        var alvo = '0x' + j.modelo.byte.toString(16);
        for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].value === alvo) { sel.selectedIndex = i; break; }
        }
      }
      if (j.receber && document.activeElement.tagName !== 'INPUT') {
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
          'receber: ' + origem + '   •   enviar: ' + j.respostaEnvio +
          '   •   ramais programados na sessão: ' + (j.ramaisProgramados || 0);
      }
      renderChamada(j.chamada);
    }).catch(function () {});
  }
  setInterval(carregarEstado, 4000);

  log('painel pronto — ' + location.host);
  carregarEstado();
</script>
</body>
</html>`;
//# sourceMappingURL=control-panel.html.js.map