import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const LOCALES = ["te", "hi"];

function detectLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  return seg && LOCALES.includes(seg) ? seg : "en";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin auth guard ──
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();

    const token = req.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch {
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete("admin_token");
      return res;
    }
    return NextResponse.next();
  }

  // ── Locale detection for the shared root layout ──
  // We forward the active locale so <html lang> and metadata can react to it,
  // without moving the existing English routes.
  const locale = detectLocale(pathname);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
