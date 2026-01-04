# Optimized Dockerfile for Omnivore API
# Uses 3-stage build for better caching and smaller images

FROM node:22.12-alpine AS deps
WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install build dependencies
RUN apk add --no-cache g++ make python3 py3-setuptools

# Copy package files for better caching
COPY package.json yarn.lock ./
COPY packages/readabilityjs/package.json ./packages/readabilityjs/
COPY packages/api/package.json ./packages/api/
COPY packages/text-to-speech/package.json ./packages/text-to-speech/
COPY packages/content-handler/package.json ./packages/content-handler/
COPY packages/liqe/package.json ./packages/liqe/
COPY packages/utils/package.json ./packages/utils/

# Install all dependencies
RUN yarn install --frozen-lockfile --network-timeout=300000


FROM node:22.12-alpine AS builder
WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install build dependencies for native modules
RUN apk add --no-cache g++ make python3 py3-setuptools

# Copy package.json for yarn workspace
COPY package.json yarn.lock ./

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY tsconfig.json .prettierrc .eslintrc ./
COPY packages/readabilityjs ./packages/readabilityjs
COPY packages/api ./packages/api
COPY packages/text-to-speech ./packages/text-to-speech
COPY packages/content-handler ./packages/content-handler
COPY packages/liqe ./packages/liqe
COPY packages/utils ./packages/utils

# Build all workspaces in order
RUN yarn workspace @omnivore/utils build && \
    yarn workspace @omnivore/text-to-speech-handler build && \
    yarn workspace @omnivore/content-handler build && \
    yarn workspace @omnivore/liqe build && \
    yarn workspace @omnivore/api build

# Remove dev dependencies and reinstall production only
RUN rm -rf node_modules packages/*/node_modules && \
    yarn install --frozen-lockfile --production --network-timeout=300000


FROM node:22.12-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/omnivore-app/omnivore"

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV PORT=8080

# Install runtime dependencies
RUN apk add --no-cache netcat-openbsd && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 omnivore

# Copy built artifacts
COPY --from=builder --chown=omnivore:nodejs /app/package.json ./
COPY --from=builder --chown=omnivore:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=omnivore:nodejs /app/packages/api/dist ./packages/api/dist
COPY --from=builder --chown=omnivore:nodejs /app/packages/api/package.json ./packages/api/
COPY --from=builder --chown=omnivore:nodejs /app/packages/api/node_modules ./packages/api/node_modules
COPY --from=builder --chown=omnivore:nodejs /app/packages/readabilityjs ./packages/readabilityjs
COPY --from=builder --chown=omnivore:nodejs /app/packages/text-to-speech/dist ./packages/text-to-speech/dist
COPY --from=builder --chown=omnivore:nodejs /app/packages/text-to-speech/package.json ./packages/text-to-speech/
COPY --from=builder --chown=omnivore:nodejs /app/packages/content-handler/dist ./packages/content-handler/dist
COPY --from=builder --chown=omnivore:nodejs /app/packages/content-handler/package.json ./packages/content-handler/
COPY --from=builder --chown=omnivore:nodejs /app/packages/liqe/dist ./packages/liqe/dist
COPY --from=builder --chown=omnivore:nodejs /app/packages/liqe/package.json ./packages/liqe/
COPY --from=builder --chown=omnivore:nodejs /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder --chown=omnivore:nodejs /app/packages/utils/package.json ./packages/utils/

USER omnivore

EXPOSE 8080

CMD ["yarn", "workspace", "@omnivore/api", "start"]
