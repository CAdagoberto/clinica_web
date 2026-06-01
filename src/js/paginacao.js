/**
 * Componente de paginação reutilizável — painel paciente
 */
const Paginacao = {
    ITENS_POR_PAGINA: 5,

    fatiar(lista, paginaAtual) {
        const pagina = Math.max(1, paginaAtual || 1);
        const inicio = (pagina - 1) * this.ITENS_POR_PAGINA;
        return lista.slice(inicio, inicio + this.ITENS_POR_PAGINA);
    },

    totalPaginas(totalItens) {
        return Math.max(1, Math.ceil(totalItens / this.ITENS_POR_PAGINA));
    },

    /**
     * @param {string} containerId - id do elemento onde renderizar
     * @param {object} opcoes
     * @param {number} opcoes.totalItens
     * @param {number} opcoes.paginaAtual
     * @param {function} opcoes.onMudarPagina - callback(novaPagina)
     * @param {string} [opcoes.rotulo='registros']
     */
    renderizar(containerId, opcoes) {
        const el = document.getElementById(containerId);
        if (!el) return;

        const { totalItens, paginaAtual, onMudarPagina, rotulo = 'registros' } = opcoes;
        const total = Math.max(0, totalItens);
        const totalPag = this.totalPaginas(total || 1);
        const pagina = Math.min(Math.max(1, paginaAtual), totalPag);

        if (total === 0) {
            el.innerHTML = '';
            return;
        }

        const inicio = (pagina - 1) * this.ITENS_POR_PAGINA + 1;
        const fim = Math.min(pagina * this.ITENS_POR_PAGINA, total);

        const numeros = this._numerosPaginas(pagina, totalPag);

        el.innerHTML = `
            <div class="paginacao-wrapper">
                <p class="paginacao-info">
                    Exibindo <strong>${inicio}–${fim}</strong> de <strong>${total}</strong> ${rotulo}
                </p>
                <div class="paginacao-controles">
                    <button type="button" class="btn-pagina nav" data-pagina="prev" ${pagina <= 1 ? 'disabled' : ''}>
                        <i class="fa-solid fa-chevron-left"></i> Anterior
                    </button>
                    ${numeros.map((n) =>
                        n === '...'
                            ? '<span class="paginacao-ellipsis">…</span>'
                            : `<button type="button" class="btn-pagina ${n === pagina ? 'ativa' : ''}" data-pagina="${n}">${n}</button>`
                    ).join('')}
                    <button type="button" class="btn-pagina nav" data-pagina="next" ${pagina >= totalPag ? 'disabled' : ''}>
                        Próxima <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;

        el.querySelectorAll('.btn-pagina[data-pagina]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const alvo = btn.getAttribute('data-pagina');
                let nova = pagina;
                if (alvo === 'prev') nova = pagina - 1;
                else if (alvo === 'next') nova = pagina + 1;
                else nova = Number(alvo);
                if (nova >= 1 && nova <= totalPag && nova !== pagina) {
                    onMudarPagina(nova);
                }
            });
        });
    },

    _numerosPaginas(atual, total) {
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        const nums = [1];
        if (atual > 3) nums.push('...');
        for (let i = Math.max(2, atual - 1); i <= Math.min(total - 1, atual + 1); i++) {
            nums.push(i);
        }
        if (atual < total - 2) nums.push('...');
        nums.push(total);
        return nums;
    },
};
