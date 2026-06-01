# Design System — Clínica Psiquiátrica (telas_web)

> **Estrutura:** entrada `index.html` (login) · views em `views/{admin,paciente,estagiario}/` · CSS/JS em `src/css` e `src/js` · ver `README.md`.

Documento extraído do código em `src/telas_web`. Descreve identidade visual, estrutura de layout, componentes reutilizáveis e organização das telas por perfil de usuário.

---

## 1. Visão geral do produto

| Item | Valor |
|------|--------|
| **Nome** | Clínica Psiquiátrica |
| **Sigla / logo** | `CP` (avatar textual) |
| **Idioma** | `pt-BR` |
| **Stack UI** | HTML estático + CSS (sem framework CSS) |
| **Ícones** | [Font Awesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/) (versões 6.0.0 a 6.5.1 conforme a tela) |
| **Fonte** | [Inter](https://fonts.google.com/specimen/Inter) — pesos 400, 500, 600, 700 |

### Perfis e pastas

```
telas_web/
├── login/                          # Autenticação
├── tela_inicial/
│   ├── tela_inicial_atendente/     # Estagiário / atendente (maior conjunto de telas)
│   ├── tela_inicial_paciente/       # Dashboard do paciente
│   └── tela_inicial_admin/         # Gestão administrativa
└── design.md                       # Este arquivo
```

Cada perfil tem **tema visual próprio** na sidebar e no fundo da página; o fluxo do atendente é o mais completo e usa `global.css` como base compartilhada.

---

## 2. Arquitetura de estilos

### 2.1 Padrão de inclusão CSS

| Contexto | Arquivos |
|----------|----------|
| **Login** | `login.css` apenas |
| **Dashboard atendente (início)** | `tela_inicial_atendente.css` (layout duplicado, sem `global.css`) |
| **Demais telas do atendente** | `global.css` + CSS específico da página |
| **Paciente** | `tela_inicial.css` |
| **Admin** | `tela_inicial_admin.css` |

### 2.2 `global.css` (atendente)

Arquivo central para telas internas do atendente. Define:

- Reset (`box-sizing`, margin/padding zero)
- `body`, `.app-container`, `.sidebar`, `.main-content`
- Navegação lateral e item ativo (inclui bolinha indicadora)
- `.linha-menu` (separador horizontal)
- `.sidebar-footer` (link Sair)

Telas que importam `global.css`: agendar consulta, avaliação, meus pacientes, notificações, perfil, prontuário, prontuários (lista), relatório.

### 2.3 Observação: duplicação

` tela_inicial_atendente.css` repete grande parte de `global.css` + componentes do dashboard. Alterações de layout base devem ser feitas em **dois lugares** ou unificadas futuramente.

---

## 3. Tokens de design (cores)

### 3.1 Paleta principal — Atendente e Paciente

| Token | Hex | Uso |
|-------|-----|-----|
| **Fundo da app** | `#e8efff` | `body` (azul claro lavanda) |
| **Primária** | `#2a75f3` | Botões, links, item ativo, card destaque |
| **Primária hover** | `#1e62d0` / `#1a61d6` / `#2563eb` | Estados hover de botões |
| **Logo / avatar marca** | `#72a1f8` | `.logo`, `.logo-avatar` |
| **Superfície** | `#ffffff` | Cards, sidebar, inputs |
| **Borda suave** | `#dbeafe` | Sidebar, cards de formulário |
| **Borda neutra** | `#e2e8f0`, `#cbd5e1` | Inputs, divisores |
| **Texto principal** | `#1a202c`, `#1e293b`, `#334155` | Títulos e corpo |
| **Texto secundário** | `#64748b`, `#475569` | Labels, subtítulos |
| **Texto placeholder** | `#94a3b8` | Inputs |
| **Destrutivo / Sair** | `#e53e3e` | Link na sidebar |
| **Avatar usuário** | `#2c3e50` | Atendente (círculo escuro) |
| **Avatar paciente (lista)** | `#40E0D0` | Turquesa (turquoise) |
| **Acento título de seção** | `#40E0D0` | Barra lateral em títulos (`border-left`) |
| **Acento título alternativo** | `#1a568b` | Azul petróleo em alguns cabeçalhos |
| **Barra de progresso (KPI)** | `#40E0D0` | Ícones e preenchimento em cards de progresso |

### 3.2 Estados semânticos

| Estado | Cor | Classes típicas |
|--------|-----|-----------------|
| Sucesso / realizada | `#10b981` | `.status-realizada`, `.status-ativo` |
| Aviso / aguardando | `#f59e0b` | `.status-aguardando` |
| Info / futuro | `#3b82f6` | `.status-futuro`, `.status-andamento` |
| Erro / falta | `#ef4444` | `.status-falta` |
| Sala livre | `#dcfce7` / `#166534` | `.sala-badge.livre` |
| Sala ocupada | `#fee2e2` / `#991b1b` | `.sala-badge.ocupada` |
| Manutenção | `#fef9c3` / `#854d0e` | `.sala-badge.manutencao` |

### 3.3 Paleta — Admin

| Token | Hex | Uso |
|-------|-----|-----|
| **Fundo** | `#f1f5f9` | Cinza claro (diferente do atendente) |
| **Sidebar** | `#1e293b` | Escuro (slate) |
| **Sidebar hover/ativo** | `#334155` | Fundo do item ativo |
| **Texto sidebar** | `#94a3b8` | Links inativos |
| **Logo admin** | `#3b82f6` | `.logo-admin` |
| **KPI azul** | `#e0f2fe` / `#0284c7` | `.kpi-icon.blue` |
| **KPI verde** | `#dcfce7` / `#16a34a` | `.kpi-icon.green` |
| **KPI roxo** | `#f3e8ff` / `#9333ea` | `.kpi-icon.purple` |
| **Sair** | `#f87171` | Footer sidebar |

### 3.4 Gradientes (prontuário)

- **Card paciente topo:** `linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)`
- **Avatar paciente:** `linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`

---

## 4. Tipografia

| Elemento | Tamanho | Peso | Cor típica |
|----------|---------|------|------------|
| `body` | 16px | 400 | `#334155` / `#1a202c` |
| `line-height` global | 1.5 | — | — |
| Título página (h1) | 26px | 700 | `#1e293b`, `#2c3e50` |
| Título seção (h2/h3) | 18–24px | 600–700 | `#334155`, `#2c3e50` |
| Subtítulo / label nav | 14–15px | 500–600 | `#64748b` |
| Texto card / lista | 14–16px | 400–600 | Variável |
| Número KPI | 24–26px | 700 | `#1e293b`, `#0f172a` |
| Login h1 | 22px | 700 | `#1a202c` |
| Login h2 | 18px | 500 | `#64748b` |
| Label formulário | 13–14px | 600 | `#334155`, `#475569` |

**Padrão de título com acento:** barra vertical à esquerda (`border-left: 5px–6px solid #40E0D0` ou `#2a75f3`) + `padding-left: 15px`.

---

## 5. Espaçamento e dimensões

| Elemento | Valor |
|----------|--------|
| Sidebar (atendente/admin) | `280px` |
| Sidebar (paciente) | `260px` |
| Padding sidebar | `30px 20px` |
| Padding main | `40px` |
| Logo quadrado | `50×50px`, `border-radius: 15px` |
| Logo login (circular) | `60×60px`, `border-radius: 50%` |
| Avatar header | `55×55px` |
| Avatar grande (perfil) | `90×90px` |
| Avatar lista paciente | `65×65px` |
| Botão ícone header | `45×45px`, circular |
| Grid dashboard | `gap: 30px`, 2 colunas |
| Grid KPI / progresso | `gap: 20px`, 3 colunas |
| Largura máxima formulários | `650px` |
| Largura máxima prontuário | `850px` |
| Largura máxima tabelas/relatórios | `865px` |

---

## 6. Raios de borda e sombras

| Uso | Valor |
|-----|--------|
| Cards grandes | `24px` (às vezes `20px` no admin) |
| Cards médios | `16px`–`18px` |
| Cards lista | `15px`–`16px` |
| Inputs / nav item | `12px` |
| Botões pill | `25px`–`30px` |
| Tags / badges | `6px`–`20px` |
| Login container | `24px` |
| Sombra login | `0 10px 25px rgba(0,0,0,0.05)` |
| Sombra cards leve | `0 4px 6px -1px rgba(0,0,0,0.02)` |
| Sombra dropdown | `0 10px 30px rgba(0,0,0,0.08)` |
| Focus input | `box-shadow: 0 0 0 3px rgba(42, 117, 243, 0.15)` |

---

## 7. Layout estrutural

### 7.1 Shell da aplicação (autenticado)

```text
┌─────────────────────────────────────────────────────────┐
│ .app-container (flex, height: 100vh)                    │
│ ┌──────────────┬──────────────────────────────────────┐ │
│ │ .sidebar     │ .main-content (flex:1, overflow-y)   │ │
│ │  .logo       │  .top-header                         │ │
│ │  <hr>        │  [conteúdo da página]                │ │
│ │  nav         │                                      │ │
│ │  <hr>        │                                      │ │
│ │  .sidebar-   │                                      │ │
│ │   footer     │                                      │ │
│ └──────────────┴──────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Header superior (`.top-header`)

- Flex: espaço entre perfil do usuário e ações
- **Atendente:** dropdown de perfil (`.perfil-topo-container`) com menu suspenso animado
- **Paciente / Admin:** `.user-info` + `.header-actions` (botões `.icon-btn`)

### 7.3 Dashboard (grid)

```text
.dashboard-grid (2 colunas)
├── .section-container
│   ├── .card-proxima-consulta (destaque azul primário)
│   ├── .materiais-flex > .card-material
│   └── .historico-lista > .historico-item
└── .full-width (span 2 colunas quando necessário)
```

**Admin adicional:** `.kpi-row` (3 KPIs) acima do grid; `.salas-grid` com badges de status.

### 7.4 Login (centrado)

```text
body (flex center, min-height 100vh)
└── .login-container (max-width 380px)
    ├── .logo-avatar
    ├── .header-text
    ├── formulário (.input-group)
    └── .login-btn / .toggle-link
```

---

## 8. Componentes UI

### 8.1 Navegação lateral

| Classe | Comportamento |
|--------|----------------|
| `nav a` | Padding 15px, `border-radius: 12px`, cor `#64748b` |
| `nav a:hover`, `nav a.active` | Fundo `#e8efff`, texto `#2a75f3` |
| `nav a.active::after` | Bolinha 8px à direita (apenas atendente com `global.css` / dashboard) |
| `.linha-menu` | `border-top: 1px solid #dbeafe`, margem vertical 20px |

**Menu atendente:** Início, Minha Agenda, Meus Pacientes, Prontuários, Avaliação Acadêmica, Sair.

**Menu paciente:** Início, Check-in, Consultas, Configurações, Sair.

**Menu admin:** Visão Geral, Gestão de Usuários, Controle de Salas, Todos os Atendimentos, Avaliações e Relatórios, Sair.

### 8.2 Botões

| Classe | Estilo |
|--------|--------|
| `.login-btn` | Primário cheio, largura 100%, `border-radius: 30px` |
| `.btn-outline` | Transparente, borda branca (sobre card azul) |
| `.btn-fill` | Fundo branco, texto primário |
| `.btn-visualizar` | Secundário: fundo `#e8efff`, texto `#2a75f3`, pill |
| `.btn-visualizar:hover` | Inverte para primário cheio |
| `.btn-visualizar.disabled` | `#f1f5f9` / `#94a3b8`, sem interação |
| `.btn-confirmar` | Primário + sombra azul |
| `.btn-cancelar` | Neutro `#f1f5f9` |
| `.btn-voltar` | Link estilo ghost, hover azul |
| `.btn-iniciar-atendimento` | `#3b82f6`, sombra leve |
| `.btn-pdf-prontuario` | Ação largura total, `#3b82f6` |
| `.icon-btn` | Circular, borda `#cbd5e1` |

### 8.3 Cards

| Classe | Descrição |
|--------|-----------|
| `.card-proxima-consulta` | Hero azul `#2a75f3`, grid 2 colunas + botões |
| `.card-material` | Branco, ícone `.icone-destaque`, CTA visualizar |
| `.card-progresso` | KPI com barra `.barra-fundo` / `.barra-nivel` |
| `.card-paciente-lista` | Lista horizontal com avatar turquesa |
| `.card-sessao` | Histórico de sessões; borda esquerda por estado |
| `.card-formulario` | Formulário em painel branco com borda `#dbeafe` |
| `.kpi-card` | Admin: ícone colorido + métrica |

### 8.4 Formulários

| Classe | Detalhe |
|--------|---------|
| `.input-group` | Label + input (login) |
| `.grupo-input` | Label + campo (telas internas) |
| `input`, `select` | Padding ~12–14px, `border-radius: 12px`, focus `#2a75f3` |
| `input[readonly]` | Fundo `#f1f5f9`, cursor not-allowed |
| `.wrapper-input-icone` | Ícone de select à direita |

### 8.5 Tags, badges e status

- `.tag-cargo`, `.tag-status`, `.filtro-tag`, `.badge-status`, `.badge-contador`
- Cores de fundo/texto pareadas por estado (concluída, pendente, agendada, etc.)
- `.tag-status` com pseudo-elemento circular verde (`::before`)

### 8.6 Dropdown de perfil (atendente)

- `.perfil-dropdown-suspensa` — oculto por padrão; `.active` exibe com animação `surgirSuave`
- `.opcao-destaque` — fundo `#f0f4ff`, título `#2a75f3`
- `.icone-wrapper-dropdown.azul-claro` / `.cinza-claro`

### 8.7 Tabelas

- `.caixa-tabela-relatorio` — container branco `border-radius: 24px`
- `.header-tabela` — grid de colunas, fundo `#f8fafc`

### 8.8 Alertas

- `.alerta-supervisor` — amarelo `#fef9c3`, borda `#fef08a`

---

## 9. Animações e transições

| Propriedade | Valor típico |
|-------------|--------------|
| Hover links / nav | `transition: 0.3s` |
| Botões | `0.2s`–`0.3s` |
| Card hover lista | `translateY(-5px)` ou `-2px` |
| Dropdown seta | `rotate(180deg)` quando `.open` |
| `@keyframes surgirSuave` | opacity 0→1, translateY -8px→0 |

---

## 10. Mapa de telas (atendente)

| Arquivo HTML | CSS específico | Função |
|--------------|----------------|--------|
| `tela_inicial_atendente.html` | `tela_inicial_atendente.css` | Dashboard: consulta, materiais, histórico, progresso |
| `agendar_consulta.html` | `agendar_consulta.css` | Formulário agendamento |
| `meus_pacientes.html` | `meu_pacientes.css` | Lista de pacientes ativos/finalizados |
| `prontuarios.html` | `prontuariosbtn.css` | Tabela/listagem de prontuários |
| `prontuario.html` | `prontuarios.css` | Detalhe do prontuário e sessões |
| `relatorio.html` | `escrever_relat.css` | Escrita de relatório |
| `avaliacao.html` | `avaliacao.css` | Horas de estágio / avaliação acadêmica |
| `notificacoes.html` | `notificacoes.css` | Central de notificações |
| `perfil_estagiario.html` | `perfil.css` | Perfil do estagiário |

**Fluxo de navegação:** todas as telas internas mantêm a mesma sidebar e linkam entre si; retorno ao login via `../../login/login.html`.

---

## 11. Responsividade

Implementação **limitada**:

- `perfil.css`: `@media (max-width: 1024px)` — grid de perfil em 1 coluna
- Demais telas assumem desktop (`100vh`, sidebars fixas)
- `viewport` meta presente, mas sem breakpoints globais

---

## 12. Acessibilidade e boas práticas (estado atual)

- Uso de `<label for="...">` nos formulários de login
- Contraste razoável em texto sobre fundos claros
- Estados `:hover` e `.disabled` definidos em botões
- **Pontos de atenção:** HTML admin com placeholders de classe (`class="----"`); versões mistas do Font Awesome; pouca semântica ARIA nos dropdowns e modais

---

## 13. Relação com o app mobile (`src/services/theme.js`)

O projeto React Native usa paleta **diferente** (verde-água):

| Token mobile | Hex |
|--------------|-----|
| primary | `#117d6c` |
| surface | `#f3faf8` |
| text | `#1d1d1d` |

As **telas_web** priorizam azul (`#2a75f3`) e fundo lavanda (`#e8efff`). Unificar tokens exigiria alinhar web e mobile em um único arquivo de tema compartilhado.

---

## 14. Checklist para novas telas (atendente)

1. Importar `global.css` + CSS da feature + Font Awesome 6.4+
2. Replicar estrutura: `.app-container` > `.sidebar` + `.main-content`
3. Marcar item ativo com `class="active"` no `nav`
4. Usar `.btn-voltar` para retorno quando aplicável
5. Respeitar larguras máximas (`650px` forms, `850px` prontuário)
6. Títulos de seção: barra `#40E0D0` ou padrão `cabecalho-tela` com `#2a75f3`
7. Botões primários: `#2a75f3`, pill `border-radius: 25px–30px`
8. Cards: fundo branco, `border-radius: 20px–24px`, sombra leve

---

## 15. Referência rápida — variáveis sugeridas (consolidação futura)

```css
:root {
  /* Marca */
  --color-primary: #2a75f3;
  --color-primary-hover: #1e62d0;
  --color-logo: #72a1f8;
  --color-accent: #40E0D0;
  --color-accent-dark: #1a568b;

  /* Superfícies */
  --color-bg-app: #e8efff;
  --color-bg-admin: #f1f5f9;
  --color-surface: #ffffff;
  --color-border: #dbeafe;
  --color-border-neutral: #e2e8f0;

  /* Texto */
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-danger: #e53e3e;

  /* Layout */
  --sidebar-width: 280px;
  --radius-card: 24px;
  --radius-button: 30px;
  --spacing-main: 40px;

  /* Tipografia */
  --font-family: 'Inter', sans-serif;
  --font-size-base: 16px;
}
```

*Nota: `:root` ainda não existe no projeto; esta seção serve como proposta de padronização.*

---

*Documento gerado a partir dos arquivos CSS/HTML em `src/telas_web`. Última revisão alinhada ao estado atual do repositório.*
