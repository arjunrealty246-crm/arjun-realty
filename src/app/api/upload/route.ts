import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", folder);
    await mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name) || ".jpg";
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`;
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const url = `/${folder}/${filename}`;
    return NextResponse.json({ url, filename });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload failed" }, { status: 500 });
  }
}
