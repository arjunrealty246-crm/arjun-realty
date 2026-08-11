import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BuilderModel from "@/lib/models/Builder";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const builders = await BuilderModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(builders);
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const builder = await BuilderModel.create(body);
    return NextResponse.json(builder, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create builder";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
