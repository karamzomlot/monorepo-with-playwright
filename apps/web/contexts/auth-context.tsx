"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/lib/auth";

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string, name?: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true });

  const refresh = useCallback(async () => {
    const res = await fetch("/api/auth/session", { credentials: "include" });
    const data = await res.json();
    setState({ user: data.user ?? null, isLoading: false });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(
    async (
      email: string,
      password: string,
      name?: string
    ): Promise<{ error?: string }> => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: data.error ?? "Login failed" };
      }
      setState((s) => ({ ...s, user: data.user }));
      return {};
    },
    []
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setState((s) => ({ ...s, user: null }));
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
