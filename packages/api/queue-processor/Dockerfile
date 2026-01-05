# Optimized Dockerfile for Omnivore Queue Processor
# Uses turbo prune + pnpm for minimal dependencies and fast installs

# Stage 1: Prune monorepo to only needed packages
FROM node:22.12-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@2.7.2
WORKDIR /app
COPY . .
RUN turbo prune @omnivore/api --docker

# Stage 2: Install dependencies with pnpm
FROM node:22.12-alpine AS deps
WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apk add --no-cache g++ make python3 py3-setuptools
RUN npm install -g pnpm@9

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

# Stage 3: Build
FROM node:22.12-alpine AS builder
WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN npm install -g pnpm@9

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=pruner /app/out/full/ .
COPY tsconfig.json .prettierrc .eslintrc ./

RUN pnpm --filter @omnivore/utils build && \
    pnpm --filter @omnivore/text-to-speech-handler build && \
    pnpm --filter @omnivore/content-handler build && \
    pnpm --filter @omnivore/liqe build && \
    pnpm --filter @omnivore/api build

# Stage 4: Production dependencies only
FROM node:22.12-alpine AS prod-deps
WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV NODE_ENV=production

RUN apk add --no-cache g++ make python3 py3-setuptools
RUN npm install -g pnpm@9

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile --prod

# Stage 5: Runner
FROM node:22.12-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/omnivore-app/omnivore"

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN apk add --no-cache netcat-openbsd && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 omnivore

COPY --from=prod-deps --chown=omnivore:nodejs /app/node_modules ./node_modules
COPY --from=prod-deps --chown=omnivore:nodejs /app/package.json ./

COPY --from=builder --chown=omnivore:nodejs /app/packages/api/dist ./packages/api/dist
COPY --from=builder --chown=omnivore:nodejs /app/packages/api/package.json ./packages/api/
COPY --from=builder --chown=omnivore:nodejs /app/packages/readabilityjs ./packages/readabilityjs
COPY --from=builder --chown=omnivore:nodejs /app/packages/text-to-speech/build ./packages/text-to-speech/build
COPY --from=builder --chown=omnivore:nodejs /app/packages/text-to-speech/package.json ./packages/text-to-speech/
COPY --from=builder --chown=omnivore:nodejs /app/packages/content-handler/build ./packages/content-handler/build
COPY --from=builder --chown=omnivore:nodejs /app/packages/content-handler/package.json ./packages/content-handler/
COPY --from=builder --chown=omnivore:nodejs /app/packages/liqe/dist ./packages/liqe/dist
COPY --from=builder --chown=omnivore:nodejs /app/packages/liqe/package.json ./packages/liqe/
COPY --from=builder --chown=omnivore:nodejs /app/packages/utils/build ./packages/utils/build
COPY --from=builder --chown=omnivore:nodejs /app/packages/utils/package.json ./packages/utils/

USER omnivore

CMD ["node", "packages/api/dist/src/queue-processor.js"]
