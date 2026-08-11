import { NextResponse } from "next/server";
import { seedAllData } from "@/lib/admin-data";

export async function POST() {
  try {
    const results = await seedAllData();
    return NextResponse.json({ success: true, results });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Seed failed" }, { status: 500 });
  }
}
