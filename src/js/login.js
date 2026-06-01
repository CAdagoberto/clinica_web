/**
 * Fluxo de login e primeiro acesso (requer ClinicaAPI)
 */
(function () {
  const telaLogin = document.getElementById('tela-login');
  const telaPrimeiroAcesso = document.getElementById('tela-primeiro-acesso');
  const btnPrimeiroAcesso = document.getElementById('btn-primeiro-acesso');
  const btnVoltarLogin = document.getElementById('btn-voltar-login');
  const saudacao = document.getElementById('saudacao');
  const inputCpf = document.getElementById('cpf');
  const inputNome = document.getElementById('nome');
  let pacientePrimeiroAcesso = null;

  btnPrimeiroAcesso.addEventListener('click', (e) => {
    e.preventDefault();
    telaLogin.style.display = 'none';
    telaPrimeiroAcesso.style.display = 'block';
    saudacao.innerText = 'Primeiro Acesso';
  });

  btnVoltarLogin.addEventListener('click', (e) => {
    e.preventDefault();
    telaPrimeiroAcesso.style.display = 'none';
    telaLogin.style.display = 'block';
    saudacao.innerText = 'Bem-vindo(a)!';
    pacientePrimeiroAcesso = null;
  });

  inputCpf.addEventListener('input', async function () {
    const cpf = this.value.replace(/\D/g, '');
    if (cpf.length !== 11) {
      inputNome.value = '';
      pacientePrimeiroAcesso = null;
      return;
    }
    inputNome.value = 'Buscando paciente...';
    try {
      pacientePrimeiroAcesso = await ClinicaAPI.buscarPacientePorCpf(cpf);
      inputNome.value = pacientePrimeiroAcesso.nome;
    } catch (err) {
      pacientePrimeiroAcesso = null;
      inputNome.value = '';
      alert(err.message);
    }
  });

  document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const btn = document.getElementById('btn-entrar');
    btn.disabled = true;
    btn.textContent = 'Entrando...';

    try {
      const usuario = await ClinicaAPI.login(email, senha);
      window.location.href = ClinicaAPI.getRotaPorPerfil(usuario.tipo);
    } catch (err) {
      alert(err.message || 'Falha no login.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Entrar';
    }
  });

  document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!pacientePrimeiroAcesso) {
      alert('Informe um CPF válido cadastrado na clínica.');
      return;
    }
    try {
      const usuario = await ClinicaAPI.cadastrarEmailPaciente(
        pacientePrimeiroAcesso.id,
        document.getElementById('novo-email').value,
        document.getElementById('nova-senha').value
      );
      window.location.href = ClinicaAPI.getRotaPorPerfil(usuario.tipo);
    } catch (err) {
      alert(err.message);
    }
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('logout') === '1') {
    ClinicaAPI.clearSessao();
    window.history.replaceState({}, '', window.location.pathname);
  }

  const sessao = ClinicaAPI.getSessao();
  if (sessao) {
    window.location.href = ClinicaAPI.getRotaPorPerfil(sessao.tipo);
  }
})();
