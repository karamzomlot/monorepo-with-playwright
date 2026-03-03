import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct document title", async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright Monorepo/i);
  });

  test("has correct URL", async ({ page }) => {
    await expect(page).toHaveURL(/\//);
  });

  test.describe("header", () => {
    test("shows brand link", async ({ page }) => {
      const brand = page.getByRole("link", { name: "Playwright Monorepo" });
      await expect(brand).toBeVisible();
      await expect(brand).toHaveAttribute("href", "/");
    });

    test("brand link navigates to home", async ({ page }) => {
      await page.getByRole("link", { name: "Playwright Monorepo" }).click();
      await expect(page).toHaveURL(/\/$/);
    });

    test("has navigation with auth links when not signed in", async ({ page }) => {
      await expect(page.getByRole("link", { name: /Sign in/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /Sign up/i })).toBeVisible();
    });

    test("Sign in link goes to login page", async ({ page }) => {
      await page.getByRole("link", { name: /Sign in/i }).click();
      await expect(page).toHaveURL(/\/login/);
    });

    test("Sign up link goes to signup page", async ({ page }) => {
      await page.getByRole("link", { name: /Sign up/i }).click();
      await expect(page).toHaveURL(/\/signup/);
    });
  });

  test.describe("main content", () => {
    test("main landmark is visible", async ({ page }) => {
      await expect(page.getByRole("main")).toBeVisible();
    });

    test("hero section has correct heading", async ({ page }) => {
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: /E2E testing with Playwright in a monorepo/i,
        })
      ).toBeVisible();
    });

    test("hero section describes Turborepo and apps", async ({ page }) => {
      const hero = page.getByRole("main").locator("section").first();
      await expect(hero).toContainText("Turborepo monorepo");
      await expect(hero).toContainText("apps/e2e");
      await expect(hero).toContainText("apps/web");
    });

    test("features section has heading", async ({ page }) => {
      await expect(
        page.getByRole("heading", {
          level: 2,
          name: /What’s in this stack/i,
        })
      ).toBeVisible();
    });

    test("features section lists Monorepo, Playwright, and Fake auth", async ({
      page,
    }) => {
      const main = page.getByRole("main");
      await expect(main).toContainText("Monorepo");
      await expect(main).toContainText("Playwright");
      await expect(main).toContainText("Fake auth");
    });

    test("Monorepo feature mentions pnpm build", async ({ page }) => {
      await expect(page.getByText("pnpm build", { exact: true })).toBeVisible();
    });

    test("Playwright feature mentions apps/e2e", async ({ page }) => {
      await expect(
        page.getByText(/E2E tests in.*apps\/e2e/i)
      ).toBeVisible();
    });

    test("Fake auth feature mentions sign in and dashboard", async ({
      page,
    }) => {
      await expect(page.getByText(/protected dashboard/i)).toBeVisible();
      await expect(page.getByText(/Sign in.*sign up/i)).toBeVisible();
    });

    test("CTA section shows run command text", async ({ page }) => {
      await expect(
        page.getByText("Run the tests from the repo root:")
      ).toBeVisible();
    });

    test("CTA section shows terminal command", async ({ page }) => {
      await expect(
        page.getByText("pnpm --filter e2e test", { exact: true })
      ).toBeVisible();
    });
  });

  test.describe("footer", () => {
    test("shows brand name", async ({ page }) => {
      const footer = page.locator("footer");
      await expect(footer).toContainText("Playwright Monorepo");
    });

    test("shows stack meta", async ({ page }) => {
      const footer = page.locator("footer");
      await expect(footer).toContainText("Next.js");
      await expect(footer).toContainText("Turborepo");
      await expect(footer).toContainText("Playwright");
    });
  });

  test.describe("accessibility and structure", () => {
    test("has single h1", async ({ page }) => {
      const h1s = page.getByRole("heading", { level: 1 });
      await expect(h1s).toHaveCount(1);
    });

    test("features list has three items", async ({ page }) => {
      const list = page.getByRole("list").filter({ has: page.getByText("Monorepo") });
      await expect(list.getByRole("listitem")).toHaveCount(3);
    });
  });
});
