import Link from "next/link";
import { AuthLinks } from "./auth-links";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          Playwright Monorepo
        </Link>
        <nav className={styles.nav}>
          <AuthLinks />
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            E2E testing with Playwright in a monorepo
          </h1>
          <p className={styles.heroSubtitle}>
            This app lives in a Turborepo monorepo. The{" "}
            <code className={styles.code}>apps/e2e</code> package runs
            Playwright tests against <code className={styles.code}>apps/web</code>
            .
          </p>
        </section>

        <section className={styles.features} aria-labelledby="features-heading">
          <h2 id="features-heading" className={styles.sectionTitle}>
            What’s in this stack
          </h2>
          <ul className={styles.featureList}>
            <li className={styles.feature}>
              <span className={styles.featureLabel}>Monorepo</span>
              <span className={styles.featureDesc}>
                Shared packages, one repo. Run <code>pnpm build</code> at the
                root.
              </span>
            </li>
            <li className={styles.feature}>
              <span className={styles.featureLabel}>Playwright</span>
              <span className={styles.featureDesc}>
                E2E tests in <code>apps/e2e</code> target this Next.js app on
                localhost.
              </span>
            </li>
            <li className={styles.feature}>
              <span className={styles.featureLabel}>Fake auth</span>
              <span className={styles.featureDesc}>
                Sign in / sign up and a protected dashboard for testing flows.
              </span>
            </li>
          </ul>
        </section>

        <section className={styles.ctaSection}>
          <p className={styles.ctaText}>Run the tests from the repo root:</p>
          <code className={styles.terminal}>pnpm --filter e2e test</code>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footerBrand}>Playwright Monorepo</span>
        <span className={styles.footerMeta}>
          Next.js · Turborepo · Playwright
        </span>
      </footer>
    </div>
  );
}
