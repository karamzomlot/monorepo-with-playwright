# E2E (Playwright)

End-to-end tests for the monorepo apps using [Playwright](https://playwright.dev/).

## Setup

From the repo root:

```sh
pnpm install
pnpm exec playwright install
```

Or from `apps/e2e`:

```sh
cd apps/e2e && pnpm exec playwright install
```

## Run tests

From the repo root:

```sh
pnpm test:e2e
```

Or only the e2e app:

```sh
pnpm --filter e2e test
```

By default, Playwright starts the `web` app (`http://localhost:3000`) via `webServer` in `playwright.config.ts`. To use a different app or URL, set `PLAYWRIGHT_BASE_URL` or run the app yourself and tests will reuse it.

## Scripts

- `test` – run all e2e tests
- `test:ui` – run with Playwright UI
- `test:headed` – run in headed browser
- `test:debug` – run in debug mode

## CI

In CI, set `CI=1`. Playwright will not start a dev server; start the app under test yourself (e.g. after `turbo run build`, run `pnpm --filter web start`) and set `PLAYWRIGHT_BASE_URL` if it’s not `http://localhost:3000`.
