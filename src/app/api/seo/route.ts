import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SEOModel from "@/lib/models/SEO";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const items = await SEOModel.find().sort({ page: 1 }).lean();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { _id, page, ...body } = await req.json();
    if (_id) {
      const updated = await SEOModel.findByIdAndUpdate(_id, body, { new: true }).lean();
      return NextResponse.json(updated);
    }
    const created = await SEOModel.create({ page, ...body });
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed" }, { status: 500 });
  }
}
