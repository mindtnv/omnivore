# Repository Guidelines

## Project Structure & Module Organization
- `packages/` houses the core TypeScript services (API, web, content pipeline, handlers, and shared libs) managed as a pnpm + Turbo monorepo.
- `pkg/` contains browser extensions and ancillary tooling (e.g., Chrome/Firefox extensions, admin UI).
- `apple/` and `android/` contain the native clients.
- `self-hosting/` provides Docker, Helm, and deployment guides; `imageproxy/` and `ml/` are standalone services.
- `docs/` contains end‑user guides and onboarding material.

## Build, Test, and Development Commands
- `docker compose up` starts the full stack (db, api, web, content-fetch).
- `make api`, `make web`, `make qp` run API, web, and queue processor in dev mode.
- `pnpm --filter @omnivore/web dev` runs the Next.js app locally (often alongside Docker services).
- `pnpm lint` runs ESLint across all packages; `pnpm gql-typegen` regenerates GraphQL types.
- `pnpm build` builds all workspaces; `pnpm test` runs all tests.

## Coding Style & Naming Conventions
- TypeScript is the default for backend and frontend packages.
- Prettier enforces no semicolons and single quotes; ESLint is the primary linter.
- Keep new files consistent with existing naming in the target package; most tests live in `test/` with `*.test.ts` names.

## Testing Guidelines
- Run focused tests when possible: `pnpm --filter @omnivore/api test` (Mocha + NYC coverage), `pnpm --filter @omnivore/content-fetch test`, etc.
- Add tests alongside the package you change; prefer `*.test.ts` under `packages/*/test`.

## Commit & Pull Request Guidelines
- Follow conventional commits with optional scopes (examples: `feat(api): …`, `fix(web): …`, `chore: …`).
- PRs should include a clear summary, testing notes, and linked issues; add screenshots for UI/extension changes.

## Security & Configuration Tips
- Local config is typically via `.env` files (e.g., `packages/web/.env.local` from `.env.template`, `packages/puppeteer-parse/.env.example`).
- For self‑hosting and deployment details, see `self-hosting/GUIDE.md`.
