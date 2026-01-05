# Optimized Dockerfile for Next.js with standalone output + pnpm
# Reduces image size significantly using Next.js standalone mode

# Stage 1: Prune monorepo
FROM node:22.12-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@2.7.2
WORKDIR /app
COPY . .
RUN turbo prune @omnivore/web --docker

# Stage 2: Install dependencies
FROM node:22.12-alpine AS deps
WORKDIR /app

RUN apk add --no-cache g++ make python3 py3-setuptools
RUN npm install -g pnpm@9

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

# Stage 3: Build
FROM node:22.12-alpine AS builder
WORKDIR /app

ENV NODE_OPTIONS=--max-old-space-size=8192
ARG APP_ENV
ARG BASE_URL
ARG SERVER_BASE_URL
ARG HIGHLIGHTS_BASE_URL
ENV NEXT_PUBLIC_APP_ENV=$APP_ENV
ENV NEXT_PUBLIC_BASE_URL=$BASE_URL
ENV NEXT_PUBLIC_SERVER_BASE_URL=$SERVER_BASE_URL
ENV NEXT_PUBLIC_HIGHLIGHTS_BASE_URL=$HIGHLIGHTS_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm install -g pnpm@9

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=pruner /app/out/full/ .
COPY tsconfig.json .prettierrc .eslintrc ./

RUN pnpm --filter @omnivore/web build

# Stage 4: Runner (standalone - very small)
FROM node:22.12-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/omnivore-app/omnivore"

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output (much smaller than full node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/packages/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/web/.next/static ./packages/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/packages/web/public ./packages/web/public

USER nextjs

EXPOSE 8080

CMD ["node", "packages/web/server.js"]
