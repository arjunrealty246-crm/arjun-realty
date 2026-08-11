import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret");
const COOKIE_NAME = "admin_token";

export async function createToken(email: string) {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function validateCredentials(email: string, password: string) {
  const validEmail = process.env.ADMIN_EMAIL || "admin@arjunrealty.com";
  const validPassword = process.env.ADMIN_PASSWORD || "Admin@123";
  return email === validEmail && password === validPassword;
}
