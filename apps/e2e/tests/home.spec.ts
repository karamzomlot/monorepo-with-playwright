import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header heading is visible with its text", async ({ page }) => {
    const headerHeading = page.getByRole("link", { name: "Playwright Monorepo" });
    await expect(headerHeading).toBeVisible();
    await expect(headerHeading).toHaveText("Playwright Monorepo");
  });

  test("has sign in, sign up or dashboard button", async ({ page }) => {
    await expect(page.getByText(/Loading/)).toBeHidden({ timeout: 10000 });

    const signIn = page.getByRole("link", { name: /Sign in/i });
    const signUp = page.getByRole("link", { name: /Sign up/i });
    const dashboard = page.getByRole("link", { name: /Dashboard/i });

    const hasAuthLinks =
      (await signIn.isVisible() && (await signUp.isVisible())) ||
      (await dashboard.isVisible());

    expect(hasAuthLinks).toBe(true);
  });

  test("has heading with 'E2E testing with Playwright in a monorepo' text", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "E2E testing with Playwright in a monorepo",
      })
    ).toBeVisible();
  });

  test("links redirection works correctly", async ({ page }) => {
    await expect(page.getByText(/Loading/)).toBeHidden({ timeout: 10000 });

    const signIn = page.getByRole("link", { name: /Sign in/i });
    const signUp = page.getByRole("link", { name: /Sign up/i });
    const dashboard = page.getByRole("link", { name: /Dashboard/i });
    const brand = page.getByRole("link", { name: "Playwright Monorepo" });

    if (await signIn.isVisible()) {
      await signIn.click();
      await expect(page).toHaveURL(/\/login/);
      await page.goto("/");
    }

    if (await signUp.isVisible()) {
      await signUp.click();
      await expect(page).toHaveURL(/\/signup/);
      await page.goto("/");
    }

    if (await dashboard.isVisible()) {
      await dashboard.click();
      await expect(page).toHaveURL(/\/dashboard/);
      await page.goto("/");
    }

    await brand.click();
    await expect(page).toHaveURL(/\/(\?.*)?$/);
  });
});
