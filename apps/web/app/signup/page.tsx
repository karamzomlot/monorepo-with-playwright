"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import styles from "./auth.module.css";

export default function SignupPage() {
  const { login, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) window.location.replace("/dashboard");
  }, [user]);

  if (user) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const result = await login(email, password, name || undefined);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Fake signup — any details work</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <label className={styles.label}>
            Name (optional)
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>
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
              autoComplete="new-password"
            />
          </label>
          <label className={styles.label}>
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </label>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </form>
        <p className={styles.footer}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}
