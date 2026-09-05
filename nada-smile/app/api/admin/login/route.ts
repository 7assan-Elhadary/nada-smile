import { NextResponse } from "next/server";
import { createAdminSession, adminCookieName } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const expectedEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || "";

    if (!expectedEmail || !expectedPassword || email !== expectedEmail || password !== expectedPassword) {
      return NextResponse.json({ error: "Unable to sign in. Check your credentials." }, { status: 401 });
    }

    const token = await createAdminSession();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminCookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}
