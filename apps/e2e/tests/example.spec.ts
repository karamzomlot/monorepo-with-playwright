import { test, expect } from "@playwright/test";

test.describe("web app", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Playwright Monorepo/i);
  });

  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("main")).toBeVisible({ timeout: 10000 });
  });

  test("shows hero and stack description", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /E2E testing with Playwright/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /What’s in this stack/i })
    ).toBeVisible();
  });

  test("has auth or dashboard link", async ({ page }) => {
    await page.goto("/");
    const signIn = page.getByRole("link", { name: /Sign in/i });
    const signUp = page.getByRole("link", { name: /Sign up/i });
    const dashboard = page.getByRole("link", { name: /Dashboard/i });
    await expect(signIn.or(signUp).or(dashboard).first()).toBeVisible();
  });
});
