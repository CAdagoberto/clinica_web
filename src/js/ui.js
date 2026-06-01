/**
 * UI: skeleton, loading, toast, modal
 */
const UI = {
  _toastRoot: null,

  delay(ms = 400) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  getToastRoot() {
    if (!this._toastRoot) {
      this._toastRoot = document.createElement('div');
      this._toastRoot.className = 'ui-toast-container';
      document.body.appendChild(this._toastRoot);
    }
    return this._toastRoot;
  },

  toast(mensagem, tipo = 'success', duracao = 3200) {
    const icones = { error: 'fa-circle-xmark', info: 'fa-circle-info', success: 'fa-circle-check' };
    const el = document.createElement('div');
    el.className = `ui-toast ${tipo}`;
    el.innerHTML = `<i class="fa-solid ${icones[tipo] || icones.success}"></i><span>${mensagem}</span>`;
    this.getToastRoot().appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.3s';
      setTimeout(() => el.remove(), 300);
    }, duracao);
  },

  async carregar(alvo, buscarDados, montarTela, opts = {}) {
    const el = typeof alvo === 'string' ? document.getElementById(alvo) : alvo;
    if (!el) return null;

    const { skeleton = 'card', count = 3, minMs = 450 } = opts;
    let layer = el.querySelector('.ui-skeleton-layer');

    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'ui-skeleton-layer';
      el.prepend(layer);
    }

    el.classList.add('is-loading');
    layer.innerHTML = this.htmlSkeleton(skeleton, count);
    layer.style.display = 'block';

    let dados;
    try {
      const [resultado] = await Promise.all([buscarDados(), this.delay(minMs)]);
      dados = resultado;
      montarTela(dados);
    } catch (err) {
      el.innerHTML = `<p style="padding:20px;color:#dc2626">${err.message || 'Erro ao carregar.'}</p>`;
      throw err;
    } finally {
      el.classList.remove('is-loading');
      layer.style.display = 'none';
      el.classList.add('content-reveal');
      this.animarFilhos(el);
    }
    return dados;
  },

  htmlSkeleton(tipo, qtd) {
    const bloco = {
      kpi: `<div class="skeleton skeleton-kpi"></div>`,
      list: `<div class="skeleton skeleton-list-item"></div>`,
      card: `
        <div class="skeleton-card">
          <div class="skeleton skeleton-avatar"></div>
          <div style="flex:1">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text medium"></div>
            <div class="skeleton skeleton-text short"></div>
          </div>
        </div>`,
    }[tipo] || `<div class="skeleton skeleton-list-item"></div>`;

    const itens = Array.from({ length: qtd }, () => bloco).join('');
    return tipo === 'kpi' ? `<div class="skeleton-grid cols-3">${itens}</div>` : itens;
  },

  animarFilhos(container, seletor = '.ui-animate-alvo, .card-estagiario, .historico-item, .consulta-card-paciente, .kpi-card, .card-paciente-lista, .sala-badge, .sala-card-admin') {
    container.querySelectorAll(seletor).forEach((node, i) => {
      node.classList.add('ui-animate', `ui-animate-delay-${Math.min(i + 1, 4)}`);
    });
  },

  async botaoLoading(botao, promiseFn) {
    if (!botao) return promiseFn();
    botao.disabled = true;
    const texto = botao.dataset.label || botao.textContent;
    botao.dataset.label = texto;
    botao.classList.add('is-loading');
    botao.textContent = 'Salvando...';
    try {
      return await promiseFn();
    } finally {
      botao.disabled = false;
      botao.classList.remove('is-loading');
      botao.textContent = botao.dataset.label || texto;
    }
  },

  abrirModal({ titulo, subtitulo, htmlCorpo, onConfirmar, textoConfirmar = 'Salvar' }) {
    const overlay = document.createElement('div');
    overlay.className = 'ui-modal-overlay';
    overlay.innerHTML = `
      <div class="ui-modal" role="dialog">
        <h2>${titulo}</h2>
        ${subtitulo ? `<p class="sub">${subtitulo}</p>` : ''}
        <div class="ui-modal-body">${htmlCorpo}</div>
        <div class="ui-modal-actions">
          <button type="button" class="btn-ui-sec" data-fechar>Cancelar</button>
          <button type="button" class="btn-ui-pri" data-confirmar>${textoConfirmar}</button>
        </div>
      </div>`;

    const fechar = () => overlay.remove();
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) fechar();
    });
    overlay.querySelector('[data-fechar]').addEventListener('click', fechar);

    overlay.querySelector('[data-confirmar]').addEventListener('click', async () => {
      const btn = overlay.querySelector('[data-confirmar]');
      try {
        await this.botaoLoading(btn, async () => {
          await onConfirmar(overlay, fechar);
          fechar();
        });
      } catch (err) {
        this.toast(err.message || 'Não foi possível salvar.', 'error');
      }
    });

    document.body.appendChild(overlay);
    return overlay;
  },
};
