import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactModel from "@/lib/models/Contact";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const settings = await ContactModel.findOne().sort({ createdAt: -1 }).lean();
    return NextResponse.json(settings || {});
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const existing = await ContactModel.findOne();
    if (existing) {
      const updated = await ContactModel.findByIdAndUpdate(existing._id, body, { new: true }).lean();
      return NextResponse.json(updated);
    }
    const created = await ContactModel.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed" }, { status: 500 });
  }
}
