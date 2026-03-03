import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, serializeUser } from "@/lib/auth";

// Fake auth: accept any non-empty email and password
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const name = typeof body.name === "string" ? body.name.trim() : email.split("@")[0] || "User";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = { email, name };
  const response = NextResponse.json({ user });
  response.cookies.set(AUTH_COOKIE_NAME, serializeUser(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return response;
}
