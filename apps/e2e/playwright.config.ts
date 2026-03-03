import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests for the monorepo apps.
 * Start the app under test first: pnpm --filter web dev (or use webServer below).
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  // Start the web app when running tests (optional; or run `pnpm --filter web dev` yourself)
  webServer: process.env.CI
    ? undefined
    : {
        command: "pnpm --filter web dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
      },
});
