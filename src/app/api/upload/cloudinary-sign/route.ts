import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  isValidUploadFile,
  isValidUploadFolder,
} from "@/lib/validation";
import { getUploadResourceType, capForType, oversizeMessage } from "@/lib/upload-types";

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || "arjun-realty";

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "");
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { filename, folder, size } = (await req.json()) as {
      filename?: string;
      folder?: string;
      size?: number;
    };

    if (!filename) {
      return NextResponse.json({ error: "Filename required" }, { status: 400 });
    }

    if (!isValidUploadFile(filename)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
    }

    if (!isValidUploadFolder(folder || "uploads")) {
      return NextResponse.json({ error: "Folder not allowed" }, { status: 400 });
    }

    const resourceType = getUploadResourceType(filename);
    const cap = capForType(resourceType);
    if (typeof size === "number" && size > cap) {
      return NextResponse.json(
        { error: oversizeMessage(resourceType, size) },
        { status: 413 }
      );
    }

    const timestamp = Math.round(Date.now() / 1000);
    const safeName = sanitizeFilename(filename);
    const publicId = `${folder || "uploads"}/${timestamp}-${safeName}`.replace(/^\/+/, "");

    const paramsToSign: Record<string, string | number> = {
      folder: CLOUDINARY_FOLDER,
      public_id: publicId,
      resource_type: resourceType,
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
      resource_type: resourceType,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}