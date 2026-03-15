FROM node:22-alpine

WORKDIR /app

# Install dependencies for Node/Alpine
RUN apk add --no-cache git libc6-compat

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy source code
COPY apps apps/
COPY packages packages/

# Install dependencies
RUN pnpm install

# Expose ports
EXPOSE 5000 5001 5002

# Start development command
CMD ["pnpm", "dev"]
