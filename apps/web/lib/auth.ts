export const AUTH_COOKIE_NAME = "auth-user";

export type AuthUser = {
  email: string;
  name: string;
};

export function getSessionFromHeader(cookieHeader: string | undefined): AuthUser | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`${AUTH_COOKIE_NAME}=([^;]+)`));
  const value = match?.[1];
  if (!value) return null;
  return parseUserCookie(value);
}

export function parseUserCookie(value: string): AuthUser | null {
  if (!value || typeof value !== "string") return null;
  try {
    const decoded = value.includes("%") ? decodeURIComponent(value) : value;
    const parsed = JSON.parse(decoded) as AuthUser;
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}

export function serializeUser(user: AuthUser): string {
  return encodeURIComponent(JSON.stringify(user));
}
