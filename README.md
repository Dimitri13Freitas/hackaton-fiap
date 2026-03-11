# Hackaton FIAP

Bem-vindo ao projeto **Hackaton FIAP**, uma aplicação moderna desenvolvida com uma arquitetura de **Microfrontends**. Para garantir uma estrutura flexível, escalável e organizada, o projeto utiliza o **Turborepo** e **PNPM** para a gestão eficiente do monorepo.

---

## 🚀 Começando

Estas instruções vão te ajudar a rodar o projeto localmente e explorar as funcionalidades implementadas.

### Funcionalidades do Projeto
- Estrutura de Microfrontends (Web Shell + MFEs).
- Autenticação via Firebase.
- Aplicação Mobile integrada.
- Design System compartilhado.
- Gestão de estado em camadas (Domain, Application, Infra, Stores).

---

## ⚙️ Configuração Importante (.env)

> [!IMPORTANT]
> É **extremamente necessário** que cada subprojeto dentro da pasta `apps/` possua o seu próprio arquivo `.env`.
> 
> Como cada aplicação (mfe-login, mfe-settings, web-shell, mobile) roda de forma independente, elas precisam carregar as variáveis de ambiente (como credenciais do Firebase e URLs de API) localmente.
> 
> Certifique-se de que o arquivo `.env` esteja presente em:
> - `apps/web-shell/.env`
> - `apps/mfe-login/.env`
> - `apps/mfe-settings/.env`
> - `apps/mobile/.env`

---

## 🛠️ Requisitos e Instalação

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão LTS recomendada).
- [PNPM](https://pnpm.io/) instalado globalmente.

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd hackaton-fiap
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

---

## 🚀 Execução

### Rodar o projeto em desenvolvimento
Execute o comando abaixo na raiz para iniciar os microfrontends principais e o shell:

```bash
pnpm dev
```

### Build de Produção
Para compilar todos os projetos do monorepo:

```bash
pnpm build
```

---

## 🏗️ Arquitetura do Monorepo

O projeto segue a estrutura padrão do Turborepo:

### Aplicações (`apps/`)
- **web-shell**: Host principal que orquestra os microfrontends.
- **mfe-login**: Microfrontend de autenticação.
- **mfe-settings**: Microfrontend de configurações de perfil.
- **mobile**: Aplicativo mobile (Expo/React Native).

### Pacotes Compartilhados (`packages/`)
- **ui**: Componentes visuais e Design System.
- **domain**: Entidades e lógica de negócio central.
- **application**: Casos de uso e serviços.
- **infra**: Clientes HTTP, adaptadores Firebase e drivers.
- **stores**: Gerenciamento de estado (Zustand/Context).

---

## 🎨 Links Úteis

- [Turborepo Docs](https://turborepo.com/docs)
- [PNPM Docs](https://pnpm.io/docs)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
