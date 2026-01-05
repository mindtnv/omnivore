# Optimized Dockerfile for Omnivore Content Fetch
# Uses turbo prune + pnpm for minimal dependencies

# Stage 1: Prune monorepo
FROM node:22.12-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@2.7.2
WORKDIR /app
COPY . .
RUN turbo prune @omnivore/content-fetch --docker

# Stage 2: Install and build
FROM node:22.12-alpine AS builder
WORKDIR /app

RUN apk add --no-cache g++ make python3 py3-setuptools
RUN npm install -g pnpm@9

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY tsconfig.json .prettierrc .eslintrc ./

RUN pnpm --filter @omnivore/utils build && \
    pnpm --filter @omnivore/content-handler build && \
    pnpm --filter @omnivore/puppeteer-parse build && \
    pnpm --filter @omnivore/content-fetch build

# Remove dev deps and reinstall production only
RUN rm -rf node_modules packages/*/node_modules && \
    pnpm install --frozen-lockfile --prod

# Stage 3: Runner with browsers
FROM node:22.12-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/omnivore-app/omnivore"

RUN echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories \
    && echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories \
    && apk -U upgrade \
    && apk add --no-cache \
        chromium@edge \
        firefox@edge \
        firefox-esr@edge \
        freetype@edge \
        ttf-freefont@edge \
        nss@edge \
        libstdc++@edge \
        sqlite-libs@edge \
        ca-certificates@edge \
    && rm -rf /var/cache/apk/*

WORKDIR /app

ENV NODE_ENV=production
ENV CHROMIUM_PATH=/usr/bin/chromium
ENV FIREFOX_PATH=/usr/bin/firefox
ENV LAUNCH_HEADLESS=true

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 omnivore

COPY --from=builder --chown=omnivore:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=omnivore:nodejs /app/package.json ./
COPY --from=builder --chown=omnivore:nodejs /app/packages ./packages

COPY packages/content-fetch/start.sh .
RUN wget -q https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts && \
    chmod +x start.sh && \
    chown omnivore:nodejs start.sh hosts

USER omnivore

EXPOSE 8080

CMD ["./start.sh"]
