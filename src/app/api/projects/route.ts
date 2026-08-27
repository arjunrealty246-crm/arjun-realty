import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/lib/models/Project";
import { getSession } from "@/lib/auth";
import { sanitizeProjectBody } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed } = checkRateLimit(`projects:${ip}`, 30, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    await connectDB();
    const projects = await ProjectModel.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json(projects);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database unavailable";
    console.error("GET /api/projects error:", msg);
    return NextResponse.json({ error: msg }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const clean = sanitizeProjectBody(body);
    const project = await ProjectModel.create(clean);
    return NextResponse.json(project, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create project";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
