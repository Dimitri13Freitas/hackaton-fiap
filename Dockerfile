FROM node:20-alpine

# Habilitar o pnpm globalmente
RUN corepack enable && corepack prepare pnpm@10.29.3 --activate

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de lock e manifestos primeiro para otimizar caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copiar todo o restante do código-fonte (incluindo .env das pastas, se existirem)
COPY . .

# Instalar as dependências do monorepo
RUN pnpm install

# Expor as portas dos microfrontends
# 5000: web-shell
# 5001: mfe-login
# 5002: mfe-settings
EXPOSE 5000 5001 5002

# Comando padrão para iniciar todos os microfrontends
CMD ["pnpm", "dev"]
