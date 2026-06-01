/**
 * mockApi.js — Simulação de back-end para telas_web (script clássico, sem export).
 * Persistência: localStorage `clinica_mock_state` e `clinica_sessao`
 * React Native importa de src/data/mockApi.js — mantenha a lógica alinhada entre os dois arquivos.
 */

const HOJE = '2026-06-01';
const STORAGE_STATE = 'clinica_mock_state';
const STORAGE_SESSAO = 'clinica_sessao';

const statusSalaValidos = ['disponivel', 'ocupada', 'em reforma'];

const ROTAS_WEB = {
  admin: 'views/admin/index.html',
  estagiario: 'views/estagiario/index.html',
  paciente: 'views/paciente/index.html',
};

const estadoInicial = {
  usuarios: [
    {
      id: 1,
      nome: 'Ana Admin',
      email: 'admin@clinica.com',
      senha: '123456',
      tipo: 'admin',
    },
    {
      id: 2,
      nome: 'Bruno Estagiário',
      email: 'estagiario@clinica.com',
      senha: '123456',
      tipo: 'estagiario',
      ra: '202604129',
      supervisor: 'Dr. Robson',
      horasEstagio: 45,
      horasMeta: 100,
    },
    {
      id: 3,
      nome: 'Carla Paciente',
      email: 'paciente@clinica.com',
      senha: '123456',
      tipo: 'paciente',
      responsavelEstagiarioId: 2,
      cpf: '12345678900',
      telefone: '(11) 98765-4321',
    },
    {
      id: 4,
      nome: 'Diego Paciente',
      email: 'diego@clinica.com',
      senha: '123456',
      tipo: 'paciente',
      responsavelEstagiarioId: 2,
      cpf: '98765432100',
      telefone: '(11) 91234-5678',
    },
    {
      id: 5,
      nome: 'Elisa Paciente',
      email: 'elisa@clinica.com',
      senha: '123456',
      tipo: 'paciente',
      responsavelEstagiarioId: 2,
      cpf: '11122233344',
      telefone: '(11) 99876-5432',
    },
  ],
  salas: [
    { id: 1, nome: 'Sala 01', status: 'ocupada' },
    { id: 2, nome: 'Sala 02', status: 'disponivel' },
    { id: 3, nome: 'Sala 03', status: 'ocupada' },
    { id: 4, nome: 'Sala 04', status: 'disponivel' },
    { id: 5, nome: 'Sala 05', status: 'em reforma' },
    { id: 6, nome: 'Sala 06', status: 'disponivel' },
  ],
  consultas: [
    { id: 1, pacienteId: 3, estagiarioId: 2, salaId: 2, data: '2026-06-05', horario: '14:00', status: 'pendente', tipo: 'Terapia — Sessão 4' },
    { id: 2, pacienteId: 3, estagiarioId: 2, salaId: 2, data: '2026-05-28', horario: '14:00', status: 'confirmado', tipo: 'Terapia — Sessão 3' },
    { id: 3, pacienteId: 3, estagiarioId: 2, salaId: 2, data: '2026-05-21', horario: '14:00', status: 'realizada', tipo: 'Terapia — Sessão 2' },
    { id: 4, pacienteId: 3, estagiarioId: 2, salaId: 2, data: '2026-05-14', horario: '14:00', status: 'realizada', tipo: 'Terapia — Sessão 1' },
    { id: 5, pacienteId: 3, estagiarioId: 2, salaId: 2, data: '2026-05-07', horario: '14:00', status: 'falta', tipo: 'Terapia' },
    { id: 6, pacienteId: 4, estagiarioId: 2, salaId: 1, data: HOJE, horario: '09:00', status: 'pendente', tipo: 'Primeira consulta' },
    { id: 7, pacienteId: 4, estagiarioId: 2, salaId: 2, data: HOJE, horario: '11:00', status: 'confirmado', tipo: 'Retorno' },
    { id: 8, pacienteId: 5, estagiarioId: 2, salaId: 3, data: HOJE, horario: '14:00', status: 'cancelado', tipo: 'Sessão 5' },
    { id: 9, pacienteId: 4, estagiarioId: 2, salaId: 4, data: HOJE, horario: '16:00', status: 'pendente', tipo: 'Sessão 8' },
    { id: 10, pacienteId: 5, estagiarioId: 2, salaId: 6, data: '2026-06-02', horario: '10:00', status: 'pendente', tipo: 'Agendada' },
    { id: 11, pacienteId: 3, estagiarioId: 2, salaId: 2, data: HOJE, horario: '15:30', status: 'pendente', tipo: 'Terapia — Sessão 3' },
  ],
  statusPacientes: [
    { pacienteId: 3, status: 'aguardando check-in' },
    { pacienteId: 4, status: 'exame pendente' },
    { pacienteId: 5, status: 'cancelado' },
  ],
  solicitacoesExame: [
    { id: 1, consultaId: 2, pacienteId: 3, titulo: 'Hemograma completo', descricao: 'Realizar antes da próxima sessão.', solicitadoPorId: 2, anexado: false, arquivoNome: '', data: '2026-05-20' },
    { id: 2, consultaId: 3, pacienteId: 3, titulo: 'Escala de ansiedade', descricao: 'Questionário aplicado na clínica.', solicitadoPorId: 2, anexado: true, arquivoNome: 'escala-ansiedade.pdf', data: '2026-05-18' },
    { id: 3, consultaId: 4, pacienteId: 3, titulo: 'Termo de consentimento', descricao: 'Assinado na recepção.', solicitadoPorId: 2, anexado: true, arquivoNome: 'consentimento.pdf', data: '2026-05-10' },
    { id: 4, consultaId: 6, pacienteId: 4, titulo: 'Encaminhamento psiquiatra', descricao: 'Aguardando retorno do especialista.', solicitadoPorId: 2, anexado: false, arquivoNome: '', data: '2026-04-28' },
  ],
  materiais: [
    { id: 1, titulo: 'Guia de relaxamento', categoria: 'Bem-estar', paginas: 12, disponivel: true },
    { id: 2, titulo: 'Diário de humor', categoria: 'Autocuidado', paginas: 8, disponivel: true },
    { id: 3, titulo: 'Técnicas de respiração', categoria: 'Exercícios', paginas: 6, disponivel: true },
    { id: 4, titulo: 'Orientações pós-consulta', categoria: 'Informativo', paginas: 4, disponivel: true },
    { id: 5, titulo: 'Material sobre sono', categoria: 'Educação', paginas: 15, disponivel: false },
    { id: 6, titulo: 'Cartilha família', categoria: 'Apoio', paginas: 20, disponivel: true },
    { id: 7, titulo: 'Lista de recursos SOS', categoria: 'Emergência', paginas: 2, disponivel: true },
    { id: 8, titulo: 'Planner semanal', categoria: 'Organização', paginas: 10, disponivel: true },
  ],
  prontuarios: [
    { id: 1, pacienteId: 3, estagiarioId: 2, sessao: '08/10', ultimo: '12/05/2026', supervisor: 'Dr. Robson', status: 'pendente' },
    { id: 2, pacienteId: 4, estagiarioId: 2, sessao: '03/10', ultimo: '01/06/2026', supervisor: 'Dr. Robson', status: 'andamento' },
    { id: 3, pacienteId: 5, estagiarioId: 2, sessao: '07/10', ultimo: '28/05/2026', supervisor: 'Dra. Helena', status: 'enviado' },
  ],
};

let usuarios = [];
let salas = [];
let consultas = [];
let statusPacientes = [];
let solicitacoesExame = [];
let materiais = [];
let prontuarios = [];

function isBrowser() {
  return typeof globalThis !== 'undefined' && typeof globalThis.document !== 'undefined';
}

function carregarEstadoPersistido() {
  if (!isBrowser()) {
    aplicarEstado(estadoInicial);
    return;
  }
  try {
    const raw = localStorage.getItem(STORAGE_STATE);
    if (raw) {
      aplicarEstado(JSON.parse(raw));
      return;
    }
  } catch (e) {
    /* estado inicial */
  }
  aplicarEstado(estadoInicial);
  persistirEstado();
}

function aplicarEstado(estado) {
  usuarios = estado.usuarios || [];
  salas = estado.salas || [];
  consultas = estado.consultas || [];
  statusPacientes = estado.statusPacientes || [];
  solicitacoesExame = estado.solicitacoesExame || [];
  materiais = estado.materiais || estadoInicial.materiais;
  prontuarios = estado.prontuarios || estadoInicial.prontuarios;
}

function persistirEstado() {
  if (!isBrowser()) return;
  localStorage.setItem(
    STORAGE_STATE,
    JSON.stringify({
      usuarios,
      salas,
      consultas,
      statusPacientes,
      solicitacoesExame,
      materiais,
      prontuarios,
    })
  );
}

function resetarDadosLocal() {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_STATE);
  aplicarEstado(estadoInicial);
  persistirEstado();
}

carregarEstadoPersistido();

function simularResposta(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 200);
  });
}

function getProximoId(lista) {
  return Math.max(...lista.map((item) => item.id), 0) + 1;
}

function getHoje() {
  return HOJE;
}

function formatarDataBR(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-');
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const dt = new Date(Number(y), Number(m) - 1, Number(d));
  const nomeDia = dias[dt.getDay()];
  return `${nomeDia}, ${d}/${m}/${y}`;
}

function formatarDataCurta(isoDate) {
  if (!isoDate) return '';
  const [, m, d] = isoDate.split('-');
  return `${d}/${m}`;
}

function usuarioPorId(id) {
  return usuarios.find((u) => u.id === Number(id));
}

function statusPacientePorConsultaStatus(statusConsulta) {
  if (statusConsulta === 'confirmado' || statusConsulta === 'realizada') {
    return 'exame pendente';
  }
  if (statusConsulta === 'cancelado' || statusConsulta === 'falta') {
    return 'cancelado';
  }
  return 'aguardando check-in';
}

function atualizarStatusPaciente(pacienteId, statusConsulta) {
  const novoStatus = statusPacientePorConsultaStatus(statusConsulta);
  const index = statusPacientes.findIndex((item) => item.pacienteId === pacienteId);
  if (index >= 0) {
    statusPacientes[index] = { ...statusPacientes[index], status: novoStatus };
  } else {
    statusPacientes.push({ pacienteId, status: novoStatus });
  }
  persistirEstado();
}

function getResponsavelPacienteId(pacienteId) {
  const paciente = usuarios.find((u) => u.id === Number(pacienteId) && u.tipo === 'paciente');
  return paciente?.responsavelEstagiarioId || null;
}

function enriquecerConsulta(consulta) {
  const paciente = usuarioPorId(consulta.pacienteId);
  const estagiario = usuarioPorId(consulta.estagiarioId);
  const sala = salas.find((item) => item.id === consulta.salaId);

  return {
    ...consulta,
    pacienteNome: paciente?.nome || 'Paciente não encontrado',
    estagiarioNome: estagiario?.nome || 'Estagiário não encontrado',
    salaNome: sala?.nome || 'Sala não encontrada',
    salaStatus: sala?.status || 'indefinido',
    dataLabel: formatarDataBR(consulta.data),
    dataCurta: formatarDataCurta(consulta.data),
  };
}

function mapStatusAdmin(status) {
  const map = {
    pendente: { texto: 'Aguardando Início', classe: 'status-aguardando', chave: 'aguardando' },
    confirmado: { texto: 'Em Atendimento', classe: 'status-andamento', chave: 'andamento' },
    realizada: { texto: 'Finalizado', classe: 'status-finalizada', chave: 'finalizada' },
    cancelado: { texto: 'Cancelada', classe: 'status-cancelado', chave: 'cancelado' },
    falta: { texto: 'Falta', classe: 'status-cancelado', chave: 'falta' },
  };
  return map[status] || { texto: status, classe: 'status-pendente', chave: status };
}

function mapStatusPaciente(status) {
  const map = {
    pendente: { texto: 'Aguardando confirmação', classe: 'status-pendente' },
    confirmado: { texto: 'Confirmada', classe: 'status-confirmado' },
    realizada: { texto: 'Realizada', classe: 'status-realizada' },
    falta: { texto: 'Falta', classe: 'status-falta' },
    cancelado: { texto: 'Cancelada', classe: 'status-cancelado' },
  };
  return map[status] || { texto: status, classe: 'status-pendente' };
}

function salaStatusWeb(status) {
  if (status === 'disponivel') return { label: 'Livre', classe: 'livre' };
  if (status === 'ocupada') return { label: 'Ocupada', classe: 'ocupada' };
  return { label: 'Manutenção', classe: 'manutencao' };
}

/* ========== Autenticação e sessão (web) ========== */

async function login(email, senha) {
  const usuario = usuarios.find(
    (item) => item.email.toLowerCase() === email.toLowerCase().trim() && item.senha === senha
  );

  if (!usuario) {
    throw new Error('Email ou senha inválidos.');
  }

  const sessao = sanitizarUsuarioSessao(usuario);
  if (isBrowser()) {
    localStorage.setItem(STORAGE_SESSAO, JSON.stringify(sessao));
    localStorage.setItem('usuarioNome', sessao.nome);
  }

  return simularResposta(sessao);
}

function sanitizarUsuarioSessao(usuario) {
  const { senha, ...resto } = usuario;
  return { ...resto };
}

function getSessao() {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_SESSAO);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSessao(usuario) {
  if (!isBrowser()) return;
  const sessao = sanitizarUsuarioSessao(usuario);
  localStorage.setItem(STORAGE_SESSAO, JSON.stringify(sessao));
  localStorage.setItem('usuarioNome', sessao.nome);
}

function clearSessao() {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_SESSAO);
  localStorage.removeItem('usuarioNome');
}

function getRotaPorPerfil(tipo) {
  return ROTAS_WEB[tipo] || ROTAS_WEB.paciente;
}

async function buscarPacientePorCpf(cpf) {
  const limpo = String(cpf).replace(/\D/g, '');
  const paciente = usuarios.find((u) => u.tipo === 'paciente' && u.cpf === limpo);
  if (!paciente) {
    throw new Error('CPF não encontrado. Procure a recepção da clínica.');
  }
  return simularResposta(sanitizarUsuarioSessao(paciente));
}

async function cadastrarEmailPaciente(pacienteId, email, novaSenha) {
  const index = usuarios.findIndex((u) => u.id === Number(pacienteId) && u.tipo === 'paciente');
  if (index < 0) throw new Error('Paciente não encontrado.');
  const emailLimpo = email.toLowerCase().trim();
  if (usuarios.some((u) => u.email === emailLimpo && u.id !== Number(pacienteId))) {
    throw new Error('E-mail já cadastrado.');
  }
  usuarios[index] = { ...usuarios[index], email: emailLimpo, senha: novaSenha };
  persistirEstado();
  const atualizado = sanitizarUsuarioSessao(usuarios[index]);
  setSessao(atualizado);
  return simularResposta(atualizado);
}

/* ========== API existente (mobile) ========== */

async function cadastrarUsuario(novoUsuario, contexto = {}) {
  const atorTipo = contexto.atorTipo;
  const atorId = Number(contexto.atorId);
  const tipoNovoUsuario = novoUsuario.tipo;

  if (!atorTipo) throw new Error('Cadastro público não é permitido.');
  if (tipoNovoUsuario === 'admin') throw new Error('Não é permitido cadastrar administrador por esta tela.');
  if (atorTipo === 'estagiario' && tipoNovoUsuario !== 'paciente') {
    throw new Error('Estagiário só pode cadastrar pacientes.');
  }
  if (atorTipo !== 'admin' && atorTipo !== 'estagiario') throw new Error('Sem permissão para cadastro.');

  const emailExistente = usuarios.some(
    (u) => u.email.toLowerCase() === novoUsuario.email.toLowerCase().trim()
  );
  if (emailExistente) throw new Error('Esse email já está cadastrado.');

  const estagiarioPadrao = usuarios.find((u) => u.tipo === 'estagiario');
  const responsavelPacienteId =
    tipoNovoUsuario === 'paciente'
      ? atorTipo === 'estagiario'
        ? atorId
        : Number(novoUsuario.responsavelEstagiarioId) || estagiarioPadrao?.id || null
      : undefined;

  if (tipoNovoUsuario === 'paciente' && !responsavelPacienteId) {
    throw new Error('Paciente precisa de um estagiário responsável.');
  }

  const usuarioCriado = {
    id: getProximoId(usuarios),
    nome: novoUsuario.nome.trim(),
    email: novoUsuario.email.toLowerCase().trim(),
    senha: novoUsuario.senha,
    tipo: tipoNovoUsuario,
    responsavelEstagiarioId: responsavelPacienteId,
  };

  if (tipoNovoUsuario === 'paciente') {
    const cpfLimpo = String(novoUsuario.cpf || '').replace(/\D/g, '');
    if (cpfLimpo.length !== 11) throw new Error('CPF deve ter 11 dígitos.');
    if (usuarios.some((u) => u.cpf === cpfLimpo)) throw new Error('CPF já cadastrado.');
    usuarioCriado.cpf = cpfLimpo;
    usuarioCriado.telefone = novoUsuario.telefone?.trim() || '';
    statusPacientes.push({ pacienteId: usuarioCriado.id, status: 'aguardando check-in' });
  }

  if (tipoNovoUsuario === 'estagiario') {
    usuarioCriado.ra = novoUsuario.ra?.trim() || '';
    usuarioCriado.supervisor = novoUsuario.supervisor?.trim() || 'A definir';
    usuarioCriado.horasEstagio = 0;
    usuarioCriado.horasMeta = Number(novoUsuario.horasMeta) || 100;
  }

  usuarios.push(usuarioCriado);
  persistirEstado();
  return simularResposta(sanitizarUsuarioSessao(usuarioCriado));
}

async function cadastrarEstagiario(dados, contexto = {}) {
  return cadastrarUsuario(
    {
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha || '123456',
      tipo: 'estagiario',
      ra: dados.ra,
      supervisor: dados.supervisor,
      horasMeta: dados.horasMeta,
    },
    { atorTipo: contexto.atorTipo || 'admin', atorId: contexto.atorId }
  );
}

async function cadastrarPaciente(dados, contexto = {}) {
  return cadastrarUsuario(
    {
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha || '123456',
      tipo: 'paciente',
      cpf: dados.cpf,
      telefone: dados.telefone,
      responsavelEstagiarioId: dados.responsavelEstagiarioId,
    },
    {
      atorTipo: contexto.atorTipo || 'admin',
      atorId: contexto.atorId,
      responsavelEstagiarioId: dados.responsavelEstagiarioId,
    }
  );
}

async function getEstagiarios(filtroNome = '') {
  const filtro = filtroNome.trim().toLowerCase();
  const lista = usuarios.filter((u) => u.tipo === 'estagiario' && u.nome.toLowerCase().includes(filtro));
  return simularResposta(lista);
}

async function getPacientes(estagiarioId = null) {
  let lista = usuarios.filter((u) => u.tipo === 'paciente');
  if (estagiarioId) {
    lista = lista.filter((p) => p.responsavelEstagiarioId === Number(estagiarioId));
  }
  return simularResposta(lista);
}

async function getPacientesComStatus(estagiarioId = null) {
  const pacientes = await getPacientes(estagiarioId);
  const resultado = pacientes.map((paciente) => {
    const statusAtual = statusPacientes.find((item) => item.pacienteId === paciente.id);
    const responsavel = usuarioPorId(paciente.responsavelEstagiarioId);
    return {
      ...paciente,
      statusPaciente: statusAtual?.status || 'aguardando check-in',
      estagiarioResponsavelNome: responsavel?.nome || 'Sem responsável',
    };
  });
  return simularResposta(resultado);
}

async function getConsultasByUsuario(userId) {
  const usuario = usuarioPorId(userId);
  if (!usuario) return simularResposta([]);

  let resultado = [];
  if (usuario.tipo === 'admin') resultado = consultas;
  else if (usuario.tipo === 'estagiario') {
    resultado = consultas.filter((c) => c.estagiarioId === userId);
  } else {
    resultado = consultas.filter((c) => c.pacienteId === userId);
  }

  return simularResposta(resultado.map(enriquecerConsulta));
}

async function getConsultaById(consultaId) {
  const consulta = consultas.find((item) => item.id === Number(consultaId));
  if (!consulta) throw new Error('Consulta não encontrada.');
  return simularResposta(enriquecerConsulta(consulta));
}

async function getConsultasDisponiveis() {
  const lista = consultas
    .filter((c) => c.data === HOJE && c.status === 'pendente')
    .map(enriquecerConsulta);
  return simularResposta(lista);
}

async function fazerCheckIn(consultaId) {
  consultas = consultas.map((c) => (c.id === Number(consultaId) ? { ...c, status: 'confirmado' } : c));
  const atualizada = consultas.find((c) => c.id === Number(consultaId));
  if (atualizada) atualizarStatusPaciente(atualizada.pacienteId, atualizada.status);
  persistirEstado();
  return simularResposta(enriquecerConsulta(atualizada));
}

async function atualizarStatusConsulta(consultaId, novoStatus) {
  consultas = consultas.map((c) =>
    c.id === Number(consultaId) ? { ...c, status: novoStatus } : c
  );
  const atualizada = consultas.find((c) => c.id === Number(consultaId));
  if (atualizada) atualizarStatusPaciente(atualizada.pacienteId, atualizada.status);
  persistirEstado();
  return simularResposta(enriquecerConsulta(atualizada));
}

async function getSolicitacoesExameByConsulta(consultaId) {
  const lista = solicitacoesExame.filter((item) => item.consultaId === Number(consultaId));
  return simularResposta(lista);
}

async function getSolicitacoesExameByPaciente(pacienteId) {
  const lista = solicitacoesExame
    .filter((item) => item.pacienteId === Number(pacienteId))
    .sort((a, b) => (b.data || '').localeCompare(a.data || ''));
  return simularResposta(lista);
}

async function solicitarExame({ consultaId, titulo, descricao, solicitadoPorId }) {
  const tituloLimpo = titulo?.trim();
  const descricaoLimpa = descricao?.trim();
  if (!tituloLimpo || !descricaoLimpa) throw new Error('Preencha título e descrição do exame.');

  const consulta = consultas.find((c) => c.id === Number(consultaId));
  if (!consulta) throw new Error('Consulta não encontrada para solicitar exame.');

  const novaSolicitacao = {
    id: getProximoId(solicitacoesExame),
    consultaId: Number(consultaId),
    pacienteId: consulta.pacienteId,
    titulo: tituloLimpo,
    descricao: descricaoLimpa,
    solicitadoPorId: Number(solicitadoPorId),
    anexado: false,
    arquivoNome: '',
    data: HOJE,
  };

  solicitacoesExame = [novaSolicitacao, ...solicitacoesExame];
  persistirEstado();
  return simularResposta(novaSolicitacao);
}

async function anexarExame(solicitacaoId, arquivoNome = 'exame-anexado.pdf') {
  const existe = solicitacoesExame.some((item) => item.id === Number(solicitacaoId));
  if (!existe) throw new Error('Solicitação de exame não encontrada.');

  solicitacoesExame = solicitacoesExame.map((item) =>
    item.id === Number(solicitacaoId) ? { ...item, anexado: true, arquivoNome } : item
  );
  persistirEstado();
  const atualizada = solicitacoesExame.find((item) => item.id === Number(solicitacaoId));
  return simularResposta(atualizada);
}

function enriquecerSala(sala) {
  const consultasSala = consultas.filter((c) => c.salaId === sala.id);
  const consultasHoje = consultasSala.filter(
    (c) => c.data === HOJE && (c.status === 'pendente' || c.status === 'confirmado')
  );
  const temConsultasAtivas = consultasSala.some(
    (c) => c.status === 'pendente' || c.status === 'confirmado'
  );

  return {
    ...sala,
    ...salaStatusWeb(sala.status),
    consultasHoje: consultasHoje.length,
    totalConsultas: consultasSala.length,
    podeExcluir: !temConsultasAtivas,
  };
}

async function getSalas() {
  return simularResposta(salas.map(enriquecerSala));
}

async function getResumoSalas() {
  const lista = salas.map(enriquecerSala);
  return simularResposta({
    total: lista.length,
    disponivel: lista.filter((s) => s.status === 'disponivel').length,
    ocupada: lista.filter((s) => s.status === 'ocupada').length,
    emReforma: lista.filter((s) => s.status === 'em reforma').length,
    consultasHoje: consultas.filter(
      (c) => c.data === HOJE && (c.status === 'pendente' || c.status === 'confirmado')
    ).length,
  });
}

async function criarSala(nome, status = 'disponivel') {
  const nomeLimpo = nome.trim();
  const statusLimpo = (status || 'disponivel').trim().toLowerCase();
  if (!nomeLimpo) throw new Error('Informe um nome para a sala.');
  if (!statusSalaValidos.includes(statusLimpo)) throw new Error('Status inválido para a sala.');
  if (salas.some((s) => s.nome.toLowerCase() === nomeLimpo.toLowerCase())) {
    throw new Error(`A sala "${nomeLimpo}" já existe.`);
  }

  const novaSala = { id: getProximoId(salas), nome: nomeLimpo, status: statusLimpo };
  salas = [novaSala, ...salas];
  persistirEstado();
  return simularResposta(enriquecerSala(novaSala));
}

async function criarSalasEmLote(textoNomes, statusPadrao = 'disponivel') {
  const nomes = [...new Set(textoNomes.split('\n').map((n) => n.trim()).filter(Boolean))];
  if (!nomes.length) throw new Error('Informe ao menos um nome de sala.');

  const criadas = [];
  const ignoradas = [];

  for (const nome of nomes) {
    try {
      const sala = await criarSala(nome, statusPadrao);
      criadas.push(sala);
    } catch (err) {
      ignoradas.push({ nome, motivo: err.message });
    }
  }

  if (!criadas.length) {
    throw new Error(ignoradas[0]?.motivo || 'Nenhuma sala foi cadastrada.');
  }

  return simularResposta({ criadas, ignoradas });
}

async function atualizarSala(salaId, dados) {
  const id = Number(salaId);
  const index = salas.findIndex((s) => s.id === id);
  if (index < 0) throw new Error('Sala não encontrada.');

  const nomeLimpo = dados.nome?.trim();
  const statusLimpo = dados.status?.trim().toLowerCase();

  if (nomeLimpo) {
    const duplicada = salas.some(
      (s) => s.id !== id && s.nome.toLowerCase() === nomeLimpo.toLowerCase()
    );
    if (duplicada) throw new Error(`Já existe outra sala com o nome "${nomeLimpo}".`);
    salas[index] = { ...salas[index], nome: nomeLimpo };
  }

  if (statusLimpo) {
    if (!statusSalaValidos.includes(statusLimpo)) throw new Error('Status inválido para a sala.');
    salas[index] = { ...salas[index], status: statusLimpo };
  }

  persistirEstado();
  return simularResposta(enriquecerSala(salas[index]));
}

async function atualizarStatusSala(salaId, novoStatus) {
  return atualizarSala(salaId, { status: novoStatus });
}

async function excluirSala(salaId) {
  const id = Number(salaId);
  const sala = salas.find((s) => s.id === id);
  if (!sala) throw new Error('Sala não encontrada.');

  const temConsultas = consultas.some(
    (c) => c.salaId === id && (c.status === 'pendente' || c.status === 'confirmado')
  );
  if (temConsultas) {
    throw new Error('Não é possível excluir: existem consultas ativas nesta sala.');
  }

  salas = salas.filter((s) => s.id !== id);
  persistirEstado();
  return simularResposta({ ok: true });
}

async function criarConsulta({ pacienteId, estagiarioId, salaId, data, horario, status = 'pendente', tipo = 'Consulta' }) {
  const paciente = usuarios.find((u) => u.id === Number(pacienteId) && u.tipo === 'paciente');
  if (!paciente) throw new Error('Paciente não encontrado.');

  const responsavelEstagiarioId = getResponsavelPacienteId(pacienteId);
  if (!responsavelEstagiarioId) throw new Error('Paciente sem estagiário responsável.');
  if (Number(estagiarioId) !== responsavelEstagiarioId) {
    throw new Error('Esse paciente pertence a outro estagiário responsável.');
  }

  const novaConsulta = {
    id: getProximoId(consultas),
    pacienteId: Number(pacienteId),
    estagiarioId: responsavelEstagiarioId,
    salaId: Number(salaId),
    data: data?.trim() || HOJE,
    horario: horario?.trim() || '08:00',
    status,
    tipo,
  };

  consultas = [novaConsulta, ...consultas];
  atualizarStatusPaciente(novaConsulta.pacienteId, novaConsulta.status);
  persistirEstado();
  return simularResposta(enriquecerConsulta(novaConsulta));
}

async function getUsuarios() {
  return simularResposta([...usuarios]);
}

async function getMateriais() {
  return simularResposta([...materiais]);
}

async function getProntuarios(estagiarioId = null) {
  let lista = prontuarios.map((p) => {
    const paciente = usuarioPorId(p.pacienteId);
    const estagiario = usuarioPorId(p.estagiarioId);
    return {
      ...p,
      paciente: paciente?.nome || '—',
      estagiario: estagiario?.nome || '—',
    };
  });
  if (estagiarioId) lista = lista.filter((p) => p.estagiarioId === Number(estagiarioId));
  return simularResposta(lista);
}

/* ========== Agregados para dashboards web ========== */

async function getDashboardAdmin() {
  const consultasHoje = consultas.filter((c) => c.data === HOJE).map(enriquecerConsulta);
  const estagiarios = usuarios.filter((u) => u.tipo === 'estagiario');

  const estagiariosResumo = estagiarios.map((est) => {
    const consultasEst = consultas.filter((c) => c.estagiarioId === est.id);
    const pacientesEst = usuarios.filter(
      (u) => u.tipo === 'paciente' && u.responsavelEstagiarioId === est.id
    );
    return {
      id: est.id,
      nome: est.nome,
      email: est.email,
      pacientesAtivos: pacientesEst.length,
      consultasHoje: consultasEst.filter((c) => c.data === HOJE).length,
      horasEstagio: `${est.horasEstagio || 0}h / ${est.horasMeta || 100}h`,
      status: 'ativo',
    };
  });

  return simularResposta({
    kpis: {
      consultasHoje: consultasHoje.length,
      pacientesTotal: usuarios.filter((u) => u.tipo === 'paciente').length,
      estagiariosAtivos: estagiarios.length,
    },
    consultasHoje,
    estagiarios: estagiariosResumo,
    salas: salas.map((s) => ({ ...s, ...salaStatusWeb(s.status) })),
  });
}

async function getEstagiarioDetalhe(estagiarioId) {
  const est = usuarioPorId(estagiarioId);
  if (!est || est.tipo !== 'estagiario') throw new Error('Estagiário não encontrado.');

  const pacientesVinculados = usuarios
    .filter((u) => u.tipo === 'paciente' && u.responsavelEstagiarioId === est.id)
    .map((paciente) => {
      const consultasPac = consultas
        .filter((c) => c.pacienteId === paciente.id)
        .sort((a, b) => b.data.localeCompare(a.data));
      const proxima = consultasPac.find((c) => c.status === 'pendente' || c.status === 'confirmado');
      const realizadas = consultasPac.filter((c) => c.status === 'realizada').length;
      const total = consultasPac.length || 12;
      return {
        id: paciente.id,
        nome: paciente.nome,
        progresso: `${realizadas}/${total}`,
        proxima: proxima ? `${formatarDataCurta(proxima.data)} ${proxima.horario}` : '—',
      };
    });

  const consultasEst = consultas
    .filter((c) => c.estagiarioId === est.id)
    .map(enriquecerConsulta);

  return simularResposta({
    estagiario: est,
    pacientes: pacientesVinculados,
    consultas: consultasEst,
  });
}

async function getDashboardPaciente(pacienteId) {
  const paciente = usuarioPorId(pacienteId);
  if (!paciente || paciente.tipo !== 'paciente') throw new Error('Paciente não encontrado.');

  const estagiario = usuarioPorId(paciente.responsavelEstagiarioId);
  const minhasConsultas = consultas
    .filter((c) => c.pacienteId === paciente.id)
    .map(enriquecerConsulta)
    .sort((a, b) => b.data.localeCompare(a.data) || b.horario.localeCompare(a.horario));

  const proxima =
    minhasConsultas.find((c) => c.status === 'pendente' || c.status === 'confirmado') ||
    minhasConsultas[0];

  const exames = solicitacoesExame
    .filter((e) => e.pacienteId === paciente.id)
    .sort((a, b) => (b.data || '').localeCompare(a.data || ''));

    return simularResposta({
    perfil: {
      id: paciente.id,
      nome: paciente.nome,
      email: paciente.email,
      cpf: paciente.cpf,
      telefone: paciente.telefone,
      estagiario: estagiario?.nome || '—',
      salaPadrao: proxima?.salaNome || '—',
    },
    proximaConsulta: proxima,
    consultas: minhasConsultas,
    exames,
    materiais,
    checkInDisponivel: {
      consultaId: minhasConsultas.find((c) => c.data === HOJE && c.status === 'pendente')?.id,
      mensagem: 'Check-in liberado para sua consulta de hoje.',
    },
  });
}

async function getDashboardEstagiario(estagiarioId) {
  const estagiario = usuarioPorId(estagiarioId);
  const consultasEst = await getConsultasByUsuario(estagiarioId);
  const pacientes = await getPacientes(estagiarioId);

  const agendaHoje = consultasEst
    .filter((c) => c.data === HOJE)
    .sort((a, b) => a.horario.localeCompare(b.horario));

  const proxima =
    agendaHoje.find((c) => c.status === 'pendente' || c.status === 'confirmado') ||
    consultasEst.find((c) => c.status === 'pendente' || c.status === 'confirmado');

  const futuras = consultasEst.filter((c) => c.status === 'pendente' || c.status === 'confirmado');
  const concluidas = consultasEst.filter((c) => c.status === 'realizada').length;
  const horasPct = estagiario?.horasMeta
    ? Math.round(((estagiario.horasEstagio || 0) / estagiario.horasMeta) * 100)
    : 0;

  return simularResposta({
    estagiario: {
      nome: estagiario?.nome,
      ra: estagiario?.ra,
      supervisor: estagiario?.supervisor,
      horasEstagio: estagiario?.horasEstagio,
      horasMeta: estagiario?.horasMeta,
    },
    consultas: consultasEst,
    agendaHoje,
    pacientes,
    proxima,
    stats: {
      proximasSessoes: futuras.length,
      sessoesConcluidas: concluidas,
      horasPercentual: horasPct,
      pacientes: pacientes.length,
    },
  });
}

/* ========== Global browser (telas_web) ========== */

if (isBrowser()) {
  globalThis.ClinicaAPI = {
    login,
    getSessao,
    setSessao,
    clearSessao,
    getRotaPorPerfil,
    buscarPacientePorCpf,
    cadastrarEmailPaciente,
    cadastrarUsuario,
    cadastrarEstagiario,
    cadastrarPaciente,
    resetarDadosLocal,
    getEstagiarios,
    getPacientes,
    getPacientesComStatus,
    getConsultasByUsuario,
    getConsultaById,
    getConsultasDisponiveis,
    fazerCheckIn,
    atualizarStatusConsulta,
    getSolicitacoesExameByConsulta,
    getSolicitacoesExameByPaciente,
    solicitarExame,
    anexarExame,
    getSalas,
    getResumoSalas,
    criarSala,
    criarSalasEmLote,
    atualizarSala,
    atualizarStatusSala,
    excluirSala,
    criarConsulta,
    getUsuarios,
    getMateriais,
    getProntuarios,
    getDashboardAdmin,
    getEstagiarioDetalhe,
    getDashboardPaciente,
    getDashboardEstagiario,
    hoje: HOJE,
    formatarDataBR,
    formatarDataCurta,
    mapStatusAdmin,
    mapStatusPaciente,
    salaStatusWeb,
    ROTAS_WEB,
  };
}
