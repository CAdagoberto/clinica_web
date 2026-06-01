/**
 * Helpers compartilhados das telas_web (requer ClinicaAPI em window)
 */
const WebApp = {
  /** Raiz do site (Live Server com pasta telas_web como root) */
  loginPath: '/index.html',
  _uiCarregado: false,

  incluirCss(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  },

  carregarScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  },

  async carregarUi() {
    ['/src/css/shared/animations.css', '/src/css/shared/skeleton.css', '/src/css/shared/components.css'].forEach(
      (href) => this.incluirCss(href)
    );
    if (this._uiCarregado) return;
    await this.carregarScript('/src/js/templates.js');
    await this.carregarScript('/src/js/ui.js');
    this._uiCarregado = true;
  },

  exigirSessao(tiposPermitidos = null) {
    const sessao = window.ClinicaAPI?.getSessao();
    if (!sessao) {
      window.location.href = this.loginPath;
      return null;
    }
    if (tiposPermitidos && !tiposPermitidos.includes(sessao.tipo)) {
      alert('Você não tem permissão para acessar esta página.');
      window.location.href = window.ClinicaAPI.getRotaPorPerfil(sessao.tipo);
      return null;
    }
    return sessao;
  },

  carregarHeaderUsuario() {
    const sessao = window.ClinicaAPI?.getSessao();
    if (!sessao) return;
    const nomeEl = document.getElementById('nome-usuario');
    const avatarEl = document.getElementById('avatar-letra');
    if (nomeEl) nomeEl.textContent = sessao.nome;
    if (avatarEl) avatarEl.textContent = sessao.nome.charAt(0).toUpperCase();
  },

  marcarNavAtivo(arquivo) {
    document.querySelectorAll('.sidebar nav a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href.includes(arquivo));
    });
  },

  sair() {
    window.ClinicaAPI?.clearSessao();
    const destino = this.loginPath.includes('?')
      ? this.loginPath
      : `${this.loginPath}?logout=1`;
    window.location.href = destino;
  },

  vincularLogout() {
    document.querySelectorAll('.sidebar-footer a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.sair();
      });
    });
  },

  async initPagina({ tipos = null, navAtivo = '', ui = true } = {}) {
    if (!window.ClinicaAPI) {
      console.error('ClinicaAPI não carregada. Inclua mockApi.js antes de web-common.js');
      return null;
    }
    if (ui) {
      document.body.classList.add('ui-page-enter');
      await this.carregarUi();
    }
    const sessao = this.exigirSessao(tipos);
    if (!sessao) return null;
    this.carregarHeaderUsuario();
    this.vincularLogout();
    if (navAtivo) this.marcarNavAtivo(navAtivo);
    return sessao;
  },
};
