# Projeto Cervejaria

> Site convertido para Vite + React + Tailwind — projeto de exemplo/portfólio.

---

## Visão Geral

Projeto front-end simples que apresenta a interface de uma Cervejaria. Desenvolvido com foco em:
- Código limpo e organizado com React (JSX) e Vite.
- Estilização responsiva com Tailwind CSS.
- Estrutura de páginas simples e navegação entre seções.

---

## Tecnologias

- **Framework:** React
- **Bundler / Dev Server:** Vite
- **CSS:** Tailwind CSS, PostCSS, Autoprefixer
- **Linguagem:** JavaScript (ESModules)

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

2. Instale dependências:

```bash
npm install
# ou
yarn
```

---

## Scripts úteis

Os scripts disponíveis (definidos em `package.json`):

- **`npm run dev`** — inicia o servidor de desenvolvimento (Vite).
- **`npm run build`** — gera a versão otimizada para produção.
- **`npm run preview`** — serve a build de produção localmente para testes.
- **`npm start`** — alias para `vite` (servidor de desenvolvimento).

Exemplo:

```bash
npm run dev
```

---

## Estrutura do projeto (resumo)

- `index.html` — ponto de entrada HTML.
- `src/main.jsx` — inicialização do React / Router.
- `src/App.jsx` — componente raiz.
- `src/index.css` — estilos globais (Tailwind imports).
- `src/components/Header.jsx` — cabeçalho / navegação.
- `src/pages/` — páginas da aplicação:
  - `Inicio.jsx` (home)
  - `Adquira.jsx`
  - `Contatos.jsx`
  - `Sobre.jsx`
  - `SimOuNao.jsx`
  - `Nao.jsx`
- `public/imgs/` e `public/logos/` — ativos estáticos.

---

## Boas práticas de desenvolvimento

- Use commits pequenos e descritivos.
- Abra um branch por feature: `feature/nome-da-feature`.
- Mantenha componentes pequenos e reutilizáveis.

---
