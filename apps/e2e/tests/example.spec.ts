import { test, expect } from "@playwright/test";

test.describe("web app", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Turborepo|Create Next App|Next.js/i);
  });

  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("main")).toBeVisible({ timeout: 10000 });
  });
});
