# Optimized Dockerfile for Omnivore DB migrations
# Uses turbo prune + pnpm for minimal dependencies

# Stage 1: Prune monorepo
FROM node:22.12-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@2.7.2
WORKDIR /app
COPY . .
RUN turbo prune @omnivore/db --docker

# Stage 2: Install and prepare
FROM node:22.12-alpine AS builder
WORKDIR /app

RUN apk add --no-cache postgresql-client util-linux bash
RUN npm install -g pnpm@9

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

# Stage 3: Runner
FROM node:22.12-alpine AS runner
WORKDIR /app

RUN apk add --no-cache postgresql-client util-linux bash
RUN npm install -g pnpm@9

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/db ./packages/db

CMD ["pnpm", "--filter", "@omnivore/db", "migrate"]
