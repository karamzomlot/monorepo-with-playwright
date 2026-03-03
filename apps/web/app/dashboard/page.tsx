"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();

  async function handleLogout() {
    await logout();
    window.location.href = "/";
  }

  if (isLoading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}><p>Loading…</p></main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          ← Home
        </Link>
        <button type="button" onClick={handleLogout} className={styles.logout}>
          Sign out
        </button>
      </nav>
      <main className={styles.main}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.welcome}>
          Welcome, <strong>{user?.name ?? user?.email ?? "User"}</strong>!
        </p>
        <p className={styles.subtitle}>
          This page is protected. Only signed-in users can see it.
        </p>
      </main>
    </div>
  );
}
