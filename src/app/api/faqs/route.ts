import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FAQModel from "@/lib/models/FAQ";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const items = await FAQModel.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json(items);
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
    const item = await FAQModel.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { _id, ...body } = await req.json();
    const item = await FAQModel.findByIdAndUpdate(_id, body, { new: true }).lean();
    return NextResponse.json(item);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await FAQModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed" }, { status: 500 });
  }
}
