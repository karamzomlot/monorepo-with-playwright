import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, parseUserCookie } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(AUTH_COOKIE_NAME);
  const user = cookie?.value ? parseUserCookie(cookie.value) : null;
  return NextResponse.json({ user });
}
