import { v2 as cloudinary } from "cloudinary";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || "arjun-realty";
const MAX_CLOUDINARY_SIZE = 10 * 1024 * 1024; // Cloudinary free tier: 10 MB hard limit

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

    const ext = path.extname(filename).toLowerCase();
    const resourceType = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"].includes(ext)
      ? "video"
      : ext === ".pdf"
        ? "raw"
        : ext === ".txt" || ext === ".doc" || ext === ".docx" || ext === ".zip"
          ? "raw"
          : "image";

    const publicId = `${folder}/${filename}`.replace(/^\/+/, "");
    const uploadOpts = {
      folder: CLOUDINARY_FOLDER,
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
    } as const;

    if (buffer.byteLength > MAX_CLOUDINARY_SIZE) {
      throw new Error(
        `File too large for Cloudinary free tier (${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB). Maximum is 10 MB.`
      );
    }

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(uploadOpts, (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload returned no result"));
        resolve({ secure_url: result.secure_url });
      });
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
