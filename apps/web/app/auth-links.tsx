"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import styles from "./page.module.css";

export function AuthLinks() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <span className={styles.authLinks}>Loading…</span>;
  }

  if (user) {
    return (
      <div className={styles.authLinks}>
        <Link href="/dashboard" className={styles.primary}>
          Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.authLinks}>
      <Link href="/login" className={styles.secondary}>
        Sign in
      </Link>
      <Link href="/signup" className={styles.primary}>
        Sign up
      </Link>
    </div>
  );
}
