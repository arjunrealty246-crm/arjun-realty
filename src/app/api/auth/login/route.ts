import { NextResponse } from "next/server";
import { createToken, validateCredentials } from "@/lib/auth";
import { cookies } from "next/headers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { allowed } = checkRateLimit(`login:${ip}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  try {
    const { email, password } = await req.json();
    if (!validateCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await createToken(email);
    const store = await cookies();
    store.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    return NextResponse.json({ success: true, email });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
