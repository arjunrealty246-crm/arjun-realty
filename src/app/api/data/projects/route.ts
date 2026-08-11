import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/lib/models/Project";

export async function GET() {
  try {
    await connectDB();
    const projects = await ProjectModel.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
