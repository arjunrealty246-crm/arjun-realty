import { NextRequest, NextResponse } from "next/server";
import { captureLead, listLeads } from "@/lib/leads";
import { getSession } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed } = checkRateLimit(`leads:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  let result;
  try {
    result = await captureLead(body);
  } catch (err) {
    console.error("Lead capture failed:", err instanceof Error ? err.message : "unknown error");
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 503 }
    );
  }
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(
    { ok: true, deduplicated: result.deduplicated, id: result.lead.id },
    result.deduplicated ? { status: 200 } : { status: 201 }
  );
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const leads = await listLeads();
    return NextResponse.json(leads);
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
