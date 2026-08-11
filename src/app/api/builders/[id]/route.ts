import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BuilderModel from "@/lib/models/Builder";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const builder = await BuilderModel.findById(id).lean();
  if (!builder) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(builder);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();
    const builder = await BuilderModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!builder) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(builder);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await connectDB();
    const builder = await BuilderModel.findByIdAndDelete(id).lean();
    if (!builder) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
