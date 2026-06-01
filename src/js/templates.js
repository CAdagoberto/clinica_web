/**
 * Templates HTML simples (template strings)
 */
const Tpl = {
  vazio(texto = 'Nenhum registro encontrado.') {
    return `<p class="msg-vazia">${texto}</p>`;
  },

  val(id) {
    return document.getElementById(id).value;
  },

  num(id) {
    return Number(Tpl.val(id));
  },

  iniciais(nome) {
    return nome
      .split(' ')
      .filter(Boolean)
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  },

  opcoes(lista, campoValor = 'id', campoTexto = 'nome') {
    return lista.map((item) => `<option value="${item[campoValor]}">${item[campoTexto]}</option>`).join('');
  },

  input(label, id, tipo = 'text', extra = '') {
    return `
      <div class="grupo-input">
        <label for="${id}">${label}</label>
        <input id="${id}" type="${tipo}" ${extra}>
      </div>`;
  },

  select(label, id, opcoesHtml) {
    return `
      <div class="grupo-input">
        <label for="${id}">${label}</label>
        <select id="${id}">${opcoesHtml}</select>
      </div>`;
  },

  formNovoEstagiario() {
    return `
      ${Tpl.input('Nome', 'm-est-nome', 'text', 'required')}
      ${Tpl.input('E-mail', 'm-est-email', 'email', 'required')}
      ${Tpl.input('RA', 'm-est-ra', 'text', 'placeholder="202600001"')}
      ${Tpl.input('Supervisor', 'm-est-sup', 'text', 'placeholder="Dr. Robson"')}`;
  },

  formNovoPaciente(opcoesEstagiarios) {
    return `
      ${Tpl.input('Nome', 'm-pac-nome', 'text', 'required')}
      ${Tpl.input('E-mail', 'm-pac-email', 'email', 'required')}
      ${Tpl.input('CPF (11 dígitos)', 'm-pac-cpf', 'text', 'maxlength="11" required')}
      ${Tpl.input('Telefone', 'm-pac-tel', 'text', 'placeholder="(11) 99999-9999"')}
      ${Tpl.select('Estagiário responsável', 'm-pac-est', opcoesEstagiarios)}`;
  },

  formNovoPacienteEstagiario() {
    return `
      ${Tpl.input('Nome', 'np-nome', 'text', 'required')}
      ${Tpl.input('E-mail', 'np-email', 'email', 'required')}
      ${Tpl.input('CPF', 'np-cpf', 'text', 'maxlength="11" required')}
      ${Tpl.input('Telefone', 'np-tel', 'text', '')}`;
  },

  kpi(icone, cor, titulo, valor) {
    return `
      <div class="kpi-card">
        <div class="kpi-icon ${cor}"><i class="fa-solid ${icone}"></i></div>
        <div class="kpi-info"><span>${titulo}</span><h3>${valor}</h3></div>
      </div>`;
  },

  kpisAdmin(kpis) {
    return `
      ${Tpl.kpi('fa-calendar-day', 'blue', 'Consultas Hoje', kpis.consultasHoje)}
      ${Tpl.kpi('fa-users', 'green', 'Pacientes em Acompanhamento', kpis.pacientesTotal)}
      ${Tpl.kpi('fa-user-graduate', 'purple', 'Estagiários Ativos', kpis.estagiariosAtivos)}`;
  },

  consultaHojeAdmin(c) {
    const st = ClinicaAPI.mapStatusAdmin(c.status);
    return `
      <div class="historico-item">
        <div class="hist-info">
          <strong>${c.salaNome} • ${c.pacienteNome}</strong>
          <span>Estagiário(a): ${c.estagiarioNome} • ${c.horario} • <em class="${st.classe}">${st.texto}</em></span>
        </div>
        <a href="estagiario_detalhe.html?id=${c.estagiarioId}" class="btn-admin-secundario">Ver estagiário</a>
      </div>`;
  },

  estagiarioResumo(e) {
    return `
      <div class="item-estagiario-resumo">
        <div>
          <strong>${e.nome}</strong><br>
          <span>${e.consultasHoje} consultas hoje • ${e.pacientesAtivos} pacientes</span>
        </div>
        <a href="estagiario_detalhe.html?id=${e.id}" class="btn-admin-secundario">Detalhes</a>
      </div>`;
  },

  cardEstagiario(e) {
    return `
      <article class="card-estagiario">
        <div class="avatar-estagiario">${Tpl.iniciais(e.nome)}</div>
        <div class="corpo-estagiario">
          <span class="tag-ativo">Ativo</span>
          <h3>${e.nome}</h3>
          <p class="email"><i class="fa-solid fa-envelope"></i> ${e.email}</p>
          <div class="metricas-estagiario">
            <span class="metrica-mini"><strong>${e.pacientesAtivos}</strong> pacientes</span>
            <span class="metrica-mini"><strong>${e.consultasHoje}</strong> hoje</span>
            <span class="metrica-mini">Estágio: <strong>${e.horasEstagio}</strong></span>
          </div>
        </div>
        <div class="acoes-estagiario">
          <a href="estagiario_detalhe.html?id=${e.id}" class="btn-admin-primario">Gerenciar</a>
          <a href="consultas.html?estagiario=${e.id}" class="btn-admin-secundario">Consultas</a>
        </div>
      </article>`;
  },

  salaBadge(nome, classe, label) {
    return `<span class="sala-badge ${classe}">${nome} · ${label}</span>`;
  },

  kpisSalas(r) {
    return `
      ${Tpl.kpi('fa-door-open', 'blue', 'Total de salas', r.total)}
      ${Tpl.kpi('fa-circle-check', 'green', 'Disponíveis', r.disponivel)}
      ${Tpl.kpi('fa-user-clock', 'amber', 'Ocupadas', r.ocupada)}
      ${Tpl.kpi('fa-screwdriver-wrench', 'purple', 'Em manutenção', r.emReforma)}`;
  },

  opcoesStatusSala(valorAtual = '') {
    const lista = [
      { id: 'disponivel', nome: 'Disponível' },
      { id: 'ocupada', nome: 'Ocupada' },
      { id: 'em reforma', nome: 'Em manutenção' },
    ];
    return lista
      .map((s) => `<option value="${s.id}" ${s.id === valorAtual ? 'selected' : ''}>${s.nome}</option>`)
      .join('');
  },

  botoesStatusSala(sala) {
    const itens = [
      { status: 'disponivel', label: 'Livre', classe: 'livre' },
      { status: 'ocupada', label: 'Ocupada', classe: 'ocupada' },
      { status: 'em reforma', label: 'Manutenção', classe: 'manutencao' },
    ];
    return itens
      .map(
        (item) => `
        <button type="button" class="btn-status-sala ${item.classe} ${sala.status === item.status ? 'ativo' : ''}"
          data-sala-id="${sala.id}" data-status="${item.status}" title="Marcar como ${item.label}">
          ${item.label}
        </button>`
      )
      .join('');
  },

  salaAdmin(s) {
    const avisoConsulta =
      s.consultasHoje > 0
        ? `<p class="sala-aviso"><i class="fa-solid fa-calendar-day"></i> ${s.consultasHoje} consulta(s) hoje</p>`
        : '';

    const btnExcluir = s.podeExcluir
      ? `<button type="button" class="btn-sala-excluir" data-excluir="${s.id}" title="Excluir sala"><i class="fa-solid fa-trash"></i></button>`
      : `<span class="sala-nao-exclui" title="Há consultas ativas vinculadas">Não pode excluir</span>`;

    return `
      <article class="sala-card-admin ui-animate-alvo" data-status="${s.status}">
        <header class="sala-card-topo">
          <div>
            <span class="sala-badge ${s.classe}">${s.label}</span>
            <h3>${s.nome}</h3>
          </div>
          ${btnExcluir}
        </header>
        ${avisoConsulta}
        <div class="sala-status-botoes">${Tpl.botoesStatusSala(s)}</div>
        <footer class="sala-card-rodape">
          <button type="button" class="btn-admin-secundario btn-editar-sala" data-editar="${s.id}">Editar</button>
          <a href="agendar_consulta.html?sala=${s.id}" class="btn-admin-primario">Agendar aqui</a>
        </footer>
      </article>`;
  },

  formNovaSala() {
    return `
      ${Tpl.input('Nome da sala', 'nome-sala', 'text', 'placeholder="Ex: Sala 07" required')}
      ${Tpl.select('Status inicial', 'status-sala', Tpl.opcoesStatusSala('disponivel'))}
      <div class="grupo-input" style="flex:1;min-width:100%">
        <label for="nomes-lote">Cadastrar várias (uma por linha)</label>
        <textarea id="nomes-lote" rows="3" placeholder="Sala 07&#10;Sala 08&#10;Sala 09"></textarea>
      </div>`;
  },

  formEditarSala(s) {
    return `
      ${Tpl.input('Nome', 'edit-nome', 'text', `value="${s.nome}" required`)}
      ${Tpl.select('Status', 'edit-status', Tpl.opcoesStatusSala(s.status))}`;
  },

  consultaPaciente(c) {
    const st = ClinicaAPI.mapStatusPaciente(c.status);
    const btnConfirmar =
      c.status === 'pendente'
        ? `<button type="button" class="btn-paciente" data-confirmar="${c.id}">Confirmar</button>`
        : '';

    return `
      <div class="consulta-card-paciente">
        <div>
          <strong>${c.dataLabel} — ${c.horario}</strong>
          <span>${c.estagiarioNome} • ${c.salaNome} • ${c.tipo || 'Consulta'} • <em class="${st.classe}">${st.texto}</em></span>
        </div>
        <div class="consulta-acoes-paciente">
          <a href="consulta_detalhe.html?id=${c.id}" class="btn-paciente-sec">Detalhes</a>
          ${btnConfirmar}
        </div>
      </div>`;
  },

  cardPacienteEstagiario(p) {
    const finalizado = p.statusPaciente === 'cancelado';
    return `
      <div class="card-paciente-lista ${finalizado ? 'finalizados' : ''}">
        <div class="avatar-lista">${Tpl.iniciais(p.nome)}</div>
        <div class="corpo-card">
          <div class="card-topo">
            <h3>${p.nome}</h3>
            <span class="email-paciente"><i class="fa-solid fa-envelope"></i> ${p.email}</span>
            ${p.telefone ? `<span class="telefone-curto"><i class="fa-solid fa-phone"></i> ${p.telefone}</span>` : ''}
          </div>
          <hr class="divisor-card">
          <div class="card-base"><span class="status-badge">${p.statusPaciente}</span></div>
        </div>
        <div class="acoes-card">
          <a href="prontuario.html" class="btn-ver-prontuario">Prontuário</a>
          <a href="agendar_consulta.html" class="btn-principal">Agendar</a>
        </div>
      </div>`;
  },

  progressoEstagiario(label, valor, icone, largura) {
    return `
      <div class="card-progresso">
        <span class="label-progresso">${label}</span>
        <div class="info-progresso">
          <span class="numero-progresso">${valor}</span>
          <i class="fas ${icone} icon-mini"></i>
        </div>
        <div class="barra-fundo"><div class="barra-nivel" style="width:${largura}%"></div></div>
      </div>`;
  },

  proximoPacienteEstagiario(c) {
    return `
      <div class="card-info">
        <p><strong>Paciente:</strong> ${c.pacienteNome}</p>
        <p><strong>Horário:</strong> ${c.horario}</p>
        <p><strong>Tipo:</strong> ${c.tipo || 'Consulta'}</p>
      </div>
      <div class="card-sala"><p>${c.salaNome}</p></div>
      <div class="card-buttons">
        <a href="prontuario.html" class="btn-outline" style="text-decoration:none;display:inline-flex;align-items:center;gap:8px">
          <i class="fa-solid fa-folder-open"></i> Prontuário
        </a>
        <button id="btn-presenca" class="btn-fill" type="button"><i class="fa-solid fa-check"></i> Registrar Presença</button>
      </div>`;
  },

  agendaItemEstagiario(c) {
    const st = ClinicaAPI.mapStatusAdmin(c.status);
    let acao = `<a href="prontuario.html" class="btn-visualizar" style="text-decoration:none">Prontuário</a>`;
    if (c.status === 'realizada') acao = `<button class="btn-visualizar" type="button">Ver Relatório</button>`;
    if (c.status === 'pendente' || c.status === 'confirmado') {
      acao = `<button class="btn-visualizar disabled" type="button">Aguardando...</button>`;
    }

    return `
      <div class="historico-item">
        <div class="hist-info">
          <strong>${c.horario} — ${c.pacienteNome}</strong>
          <span>${c.tipo || 'Consulta'} • <em class="${st.classe}">${st.texto}</em></span>
        </div>
        ${acao}
      </div>`;
  },

  proximaConsultaPaciente(c) {
    const confirmada = c.status === 'confirmado';
    return `
      <div class="card-info">
        <p><strong>Estagiário:</strong> ${c.estagiarioNome}</p>
        <p><strong>Data:</strong> ${c.dataLabel}</p>
        <p><strong>Horário:</strong> ${c.horario}</p>
        <p><strong>Tipo:</strong> ${c.tipo || 'Consulta'}</p>
      </div>
      <div class="card-sala"><p>${c.salaNome}</p></div>
      <div class="card-buttons">
        <button type="button" class="btn-outline" id="btn-cancelar">Cancelar / Reagendar</button>
        <button type="button" class="btn-fill ${confirmada ? 'sucesso' : ''}" id="btn-confirmar" ${confirmada ? 'disabled' : ''}>
          ${confirmada ? '✓ Confirmada' : 'Confirmar presença'}
        </button>
      </div>`;
  },

  historicoPaciente(c) {
    const st = ClinicaAPI.mapStatusPaciente(c.status);
    return `
      <div class="historico-item">
        <div class="hist-info">
          <strong>${c.dataLabel} — ${c.horario}</strong>
          <span>${c.tipo || 'Consulta'} • <em class="${st.classe}">${st.texto}</em></span>
        </div>
        <a href="consulta_detalhe.html?id=${c.id}" class="btn-paciente-sec">Detalhes</a>
      </div>`;
  },

  materialCard(m) {
    return `
      <div class="card-material">
        <div class="icone-material"><i class="fa-solid fa-file-pdf"></i></div>
        <h4>${m.titulo}</h4>
        <a href="materiais.html" class="btn-paciente-sec" style="justify-content:center">Visualizar</a>
      </div>`;
  },
};
