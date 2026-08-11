import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/lib/models/Project";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const project = await ProjectModel.findById(id).lean();
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();
    const project = await ProjectModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
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
    const project = await ProjectModel.findByIdAndDelete(id).lean();
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
