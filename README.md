# Clínica Psiquiátrica — Telas Web

## Como iniciar

Abra a pasta **`telas_web`** no Live Server (ou servidor estático). A entrada do app é:

**`index.html`** — login (redireciona automaticamente se já houver sessão).

## Estrutura

```
telas_web/
├── index.html              # Login (página inicial)
├── data/
│   └── mockApi.js          # Mock de API + ClinicaAPI (navegador)
├── src/
│   ├── css/
│   │   ├── login.css
│   │   ├── admin/
│   │   ├── paciente/
│   │   └── estagiario/
│   └── js/
│       ├── web-common.js   # Sessão, header, logout
│       ├── login.js
│       └── paginacao.js    # Paciente — listas paginadas
└── views/
    ├── admin/              # index.html = painel admin
    ├── paciente/           # index.html = painel paciente
    └── estagiario/         # index.html = painel estagiário
```

## Perfis de teste

| E-mail | Senha | Painel |
|--------|-------|--------|
| admin@clinica.com | 123456 | `views/admin/` |
| estagiario@clinica.com | 123456 | `views/estagiario/` |
| paciente@clinica.com | 123456 | `views/paciente/` |

## Persistência local (teste)

Todos os cadastros e alterações vão para **`localStorage`** (`clinica_mock_state`):

- Novos estagiários, pacientes, consultas, salas
- Confirmações, check-in, anexos de exame

Para resetar os dados de teste no console do navegador:

```javascript
ClinicaAPI.resetarDadosLocal();
location.reload();
```

## UI (animações e skeleton)

Carregado automaticamente nas páginas com `WebApp.initPagina()`:

- Animações de entrada e hover (`src/css/shared/animations.css`)
- Skeleton loading (`src/css/shared/skeleton.css`)
- Toasts e modais (`src/js/ui.js`)
- **Templates HTML** (`src/js/templates.js`) — `Tpl.cardEstagiario()`, `Tpl.val('id')`, formulários, etc.

Exemplo simples:

```javascript
document.getElementById('lista').innerHTML = itens
  .map((item) => Tpl.cardEstagiario(item))
  .join('');

const nome = Tpl.val('campo-nome');
```

## React Native

O app mobile continua importando **`src/data/mockApi.js`** (com `export`). Ao alterar regras de negócio, alinhe com **`telas_web/data/mockApi.js`**.
