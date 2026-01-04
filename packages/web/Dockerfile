# Optimized Dockerfile for Next.js with standalone output
# Reduces image size from ~1GB to ~150MB

FROM node:22.12-alpine AS deps
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache g++ make python3 py3-setuptools

# Copy package files first for better caching
COPY package.json yarn.lock ./
COPY packages/web/package.json ./packages/web/

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout=300000


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

# Copy package.json for yarn workspace to work
COPY package.json yarn.lock ./

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/web/node_modules ./packages/web/node_modules

# Copy source files
COPY tsconfig.json .prettierrc .eslintrc ./
COPY packages/web ./packages/web

# Empty next.config.js for docker builds (removes CSP and Sentry)
RUN echo "module.exports = { output: 'standalone', transpilePackages: ['antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-notification', 'rc-tooltip', 'rc-tree', 'rc-table'] }" > ./packages/web/next.config.js

# Build the application
RUN yarn workspace @omnivore/web build


FROM node:22.12-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/omnivore-app/omnivore"

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output (much smaller than full node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/packages/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/web/.next/static ./packages/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/packages/web/public ./packages/web/public

USER nextjs

EXPOSE 8080

# Use the standalone server
CMD ["node", "packages/web/server.js"]
