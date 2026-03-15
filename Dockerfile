FROM node:20-alpine

WORKDIR /app

RUN corepack enable

# copiar arquivos de workspace primeiro
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# copiar apps e packages
COPY apps ./apps
COPY packages ./packages

# instalar dependências
RUN pnpm install

EXPOSE 5000 5001 5002 6006

CMD ["pnpm", "dev"]