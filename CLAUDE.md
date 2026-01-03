# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Full Stack (Docker)
```bash
docker compose up                    # Start all services (postgres, redis, api, web, content-fetch)
# Access: http://localhost:3000, login: demo@omnivore.work / demo_password
```

### Individual Services
```bash
make api                             # Run API server (port 4000)
make web                             # Run web frontend (port 3000)
make qp                              # Run queue processor
make content_fetch                   # Build and run content-fetch service
```

### Package Commands (yarn workspaces)
```bash
yarn workspace @omnivore/api dev     # API dev server with hot reload
yarn workspace @omnivore/api dev_qp  # Queue processor dev mode
yarn workspace @omnivore/web dev     # Next.js dev server
yarn workspace @omnivore/db migrate  # Run database migrations
```

### Testing
```bash
yarn test                                    # Run all tests (parallel)
yarn workspace @omnivore/api test            # API tests (Mocha + NYC coverage)
yarn workspace @omnivore/content-fetch test  # Content-fetch tests
```

### Code Quality
```bash
yarn lint                            # Lint all packages
yarn gql-typegen                     # Generate GraphQL types
```

## Architecture

### Monorepo Structure (Lerna + Yarn Workspaces)

**Core Packages:**
- `packages/api` - Apollo GraphQL server (Express), TypeORM, BullMQ jobs
- `packages/web` - Next.js 14 frontend, TanStack Query, Radix UI, Stitches CSS-in-JS
- `packages/db` - PostgreSQL migrations (Postgrator)

**Content Processing:**
- `packages/content-fetch` - URL content fetching orchestration
- `packages/puppeteer-parse` - Headless browser content extraction
- `packages/content-handler` - Content parsing and sanitization
- `packages/pdf-handler` - PDF processing
- `packages/readabilityjs` - Mozilla Readability fork

**Background Services:**
- `packages/rss-handler` - RSS feed processing
- `packages/export-handler` / `packages/import-handler` - Data portability
- `packages/text-to-speech` - Audio generation
- `packages/inbound-email-handler` - Email ingestion

### API Package Structure
```
packages/api/src/
├── schema.ts              # GraphQL schema definition
├── entity/                # TypeORM entities (37 files)
├── resolvers/             # GraphQL resolvers by domain
├── services/              # Business logic layer
├── jobs/                  # BullMQ background jobs
├── routers/               # Express REST routes
└── repository/            # Data access layer
```

### Request Flow
1. GraphQL mutation → Resolver → Service → Job queue (BullMQ/Redis)
2. Job processor fetches content → Stores in GCS/S3 → Updates PostgreSQL
3. Pub/Sub notifies client → TanStack Query refetches → UI updates

### AI Integration
- LangChain with OpenAI (`gpt-4o-mini`) and Anthropic (`claude-3-sonnet`)
- Used for: article summarization, digest creation, text explanation
- AI jobs in `packages/api/src/jobs/ai/`

## Code Style

- **No semicolons** - enforced by Prettier
- **Single quotes** for strings
- **TypeScript strict mode** enabled
- Run `yarn lint` before committing

## Key Technologies

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 14, React 18, TanStack Query, Radix UI |
| API | Apollo Server 3, Express, GraphQL, TypeORM |
| Database | PostgreSQL + pgvector |
| Queue | BullMQ + Redis |
| AI | LangChain, OpenAI, Anthropic |
| Storage | Google Cloud Storage / S3 |
