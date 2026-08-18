import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || "arjun-realty";

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "");
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { filename, folder } = await req.json();

    if (!filename) {
      return NextResponse.json({ error: "Filename required" }, { status: 400 });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const safeName = sanitizeFilename(filename);
    const publicId = `${folder || "uploads"}/${timestamp}-${safeName}`.replace(/^\/+/, "");

    const paramsToSign: Record<string, string | number> = {
      folder: CLOUDINARY_FOLDER,
      public_id: publicId,
      timestamp,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      folder: CLOUDINARY_FOLDER,
      public_id: publicId,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}
