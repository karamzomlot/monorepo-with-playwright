"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import styles from "./auth.module.css";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) window.location.replace(callbackUrl);
  }, [user, callbackUrl]);

  if (user) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    window.location.href = callbackUrl;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.subtitle}>Use any email and password (fake auth)</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <label className={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className={styles.footer}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className={styles.link}>
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}
