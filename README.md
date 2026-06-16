# Projeto Cervejaria

> Site convertido para Vite + React + Tailwind — projeto de exemplo/portfólio.

---

## Visão Geral

Aplicação de e-commerce de cervejaria desenvolvida com React e Vite. O projeto oferece uma interface responsiva para navegar pelas páginas da loja, fazer login/registro, simular carrinho de compras e registrar pedidos via backend local.

---

## Principais funcionalidades

- Página inicial com navegação clara entre seções.
- Verificação de idade antes de liberar o conteúdo.
- Autenticação básica com registro, login e logout.
- Dashboard de perfil para atualizar nome e email.
- Catálogo de bebidas com seleção e carrinho.
- Persistência de usuários e pedidos em JSON no backend local.
- Busca de pedidos do usuário autenticado.

---

## Tecnologias

- **Framework:** React 19
- **Bundler / Dev Server:** Vite
- **CSS:** Tailwind CSS, PostCSS, Autoprefixer
- **Linguagem:** JavaScript (ESModules)
- **Backend local:** Node.js HTTP nativo com persistência JSON

---

## Badges

![Vite](https://img.shields.io/badge/bundler-vite-blue)
![React](https://img.shields.io/badge/framework-react-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/css-tailwind-blue)
![License](https://img.shields.io/badge/license-ISC-green)

---

## Pré-requisitos

- Node.js (recomenda-se v18+)
- npm ou yarn

---

## Instalação

1. Clone o repositório:

```bash
git clone https://seu-repositorio.git
cd N2-AT2-ProgWeb
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

---

## Scripts úteis

Os scripts disponíveis em `package.json` são:

- `npm run dev` — inicia o frontend com Vite.
- `npm run build` — gera a build de produção.
- `npm run preview` — serve a build de produção localmente.
- `npm start` — mesmo que `npm run dev`.
- `npm run api` — inicia o backend local (`server.js`).

Exemplo:

```bash
npm run dev
```

---

## Executando localmente

1. Em um terminal, inicie o backend local:

```bash
npm run api
```

2. Em outro terminal, inicie o frontend:

```bash
npm run dev
```

3. Abra o navegador em `http://localhost:5173`.

---

## API local

O servidor backend usa `server.js` para persistir dados em `data/users.json` e `data/orders.json`.

Endpoints disponíveis:

- `POST /api/login` — autenticar usuário.
- `POST /api/users` — registrar novo usuário.
- `GET /api/users/:uid` — obter dados do usuário.
- `PUT/PATCH /api/users/:uid` — atualizar dados do usuário.
- `GET /api/orders` — listar pedidos. Pode receber `?userId=<uid>`.
- `POST /api/orders` — criar novo pedido.

A autenticação é simulada, e o frontend mantém o usuário atual em `localStorage`.

---

## Estrutura do projeto

- `index.html` — ponto de entrada HTML.
- `src/main.jsx` — inicializa a aplicação React.
- `src/App.jsx` — componente raiz que gerencia rotas internas e autenticação.
- `src/index.css` — estilos globais e importações Tailwind.
- `src/components/` — componentes de interface reutilizáveis.
  - `Header.jsx` — navegação principal.
  - `AgeVerificationModal.jsx` — modal de confirmação de idade.
- `src/pages/` — páginas da aplicação.
  - `Inicio.jsx` — home.
  - `Adquira.jsx` — catálogo e carrinho.
  - `Contatos.jsx` — contatos e mapa.
  - `Sobre.jsx` — informações institucionais.
  - `Login.jsx` — formulário de login.
  - `Register.jsx` — formulário de registro.
  - `UserDashboard.jsx` — perfil do usuário.
  - `Nao.jsx` — mensagem de acesso negado para menores.
- `src/services/authService.js` — abstração de chamadas à API.
- `server.js` — backend local leve.
- `data/` — persistência JSON gerenciada pelo backend.
- `public/` — ativos estáticos e seed data.

---

## Observações

- O backend local salva as alterações diretamente em `data/users.json` e `data/orders.json`.
- A aplicação utiliza `localStorage` apenas para manter a sessão do usuário no frontend.
- Em produção, recomenda-se substituir a persistência JSON por uma API real e um banco de dados.

---

## Boas práticas

- Mantenha commits pequenos e descritivos.
- Use branches separados para cada funcionalidade.
- Deixe os componentes simples e fáceis de testar.
