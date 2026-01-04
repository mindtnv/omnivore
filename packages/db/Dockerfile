# Optimized Dockerfile for Omnivore DB migrations

FROM node:22.12-alpine
WORKDIR /app

# Install dependencies (bash required for setup.sh, postgresql-client for psql, util-linux for uuidgen)
RUN apk add --no-cache postgresql-client util-linux bash

# Copy package files
COPY package.json yarn.lock tsconfig.json ./
COPY packages/db/package.json ./packages/db/

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout=300000

# Copy migration files
COPY packages/db ./packages/db

CMD ["yarn", "workspace", "@omnivore/db", "migrate"]
