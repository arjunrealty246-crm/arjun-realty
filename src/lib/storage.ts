import { v2 as cloudinary } from "cloudinary";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getUploadResourceType, capForType, oversizeMessage } from "@/lib/upload-types";

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || "arjun-realty";
const LARGE_UPLOAD_THRESHOLD = 10 * 1024 * 1024; // use chunked upload_large above this

function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "");
}

export function isRemoteUrl(url: string): boolean {
  return /^https?:\/\//i.test((url || "").trim());
}

export function isStoredLocally(url: string): boolean {
  const v = (url || "").trim();
  return Boolean(v && v.startsWith("/") && !v.startsWith("//") && !isRemoteUrl(v));
}

export async function uploadFile(
  buffer: Buffer,
  originalName: string,
  folder: string
): Promise<{ url: string; filename: string }> {
  const filename = `${Date.now()}-${sanitizeFilename(originalName || "file")}`;

  if (isCloudinaryConfigured()) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const resourceType = getUploadResourceType(filename);

    const publicId = `${folder}/${filename}`.replace(/^\/+/, "");
    const uploadOpts = {
      folder: CLOUDINARY_FOLDER,
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
    } as const;

    const cap = capForType(resourceType);
    if (buffer.byteLength > cap) {
      throw new Error(oversizeMessage(resourceType, buffer.byteLength));
    }

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const onDone = (
        error: Error | (Record<string, unknown> & { message?: string }) | null | undefined,
        result?: { secure_url?: string }
      ) => {
        if (error) return reject(error instanceof Error ? error : new Error(error.message || "Cloudinary upload failed"));
        if (!result?.secure_url) return reject(new Error("Cloudinary upload returned no result"));
        resolve({ secure_url: result.secure_url });
      };

      if (resourceType === "video" && buffer.byteLength > LARGE_UPLOAD_THRESHOLD) {
        try {
          const chunked = cloudinary.uploader.upload_chunked_stream(uploadOpts, (error, result) =>
            onDone(error, result as { secure_url?: string })
          );
          chunked.end(buffer);
          return;
        } catch {
          // fall through to the standard upload path below
        }
      }

      const stream = cloudinary.uploader.upload_stream(uploadOpts, (error, result) =>
        onDone(error, result as { secure_url?: string })
      );
      stream.end(buffer);
    });

    return { url: result.secure_url, filename };
  }

  const uploadDir = path.join(process.cwd(), "public", folder);
  await mkdir(uploadDir, { recursive: true });
  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);

  return { url: `/${folder}/${filename}`, filename };
}

export function resolveLocalPath(url: string): string | null {
  const v = (url || "").trim();
  if (!isStoredLocally(v)) return null;
  const publicDir = path.resolve(process.cwd(), "public");
  const filePath = path.resolve(publicDir, v.replace(/^\//, ""));
  if (!filePath.startsWith(publicDir)) return null;
  return filePath;
}
