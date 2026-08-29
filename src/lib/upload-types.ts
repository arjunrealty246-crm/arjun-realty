export type UploadResourceType = "image" | "video" | "raw";

export const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".avif",
  ".mp4",
  ".pdf",
]);

export const ALLOWED_UPLOAD_FOLDERS = new Set([
  "projects", "builders", "gallery", "brochures", "testimonials",
  "avatars", "uploads",
]);

const EXT_TO_TYPE: Record<string, UploadResourceType> = {
  ".jpg": "image",
  ".jpeg": "image",
  ".png": "image",
  ".webp": "image",
  ".avif": "image",
  ".gif": "image",
  ".svg": "image",
  ".mp4": "video",
  ".webm": "video",
  ".ogg": "video",
  ".mov": "video",
  ".m4v": "video",
  ".avi": "video",
  ".mkv": "video",
  ".pdf": "raw",
  ".txt": "raw",
  ".doc": "raw",
  ".docx": "raw",
  ".zip": "raw",
};

export function getExtension(name: string): string {
  return name.toLowerCase().match(/\.[^.]+$/)?.[0] || "";
}

export function getUploadResourceType(name: string): UploadResourceType {
  const ext = getExtension(name);
  return EXT_TO_TYPE[ext] || "raw";
}

const SIZE_CAPS: Record<UploadResourceType, number> = {
  image: 10 * 1024 * 1024,
  video: 100 * 1024 * 1024,
  raw: 10 * 1024 * 1024,
};

export function capForType(type: UploadResourceType): number {
  return SIZE_CAPS[type] ?? SIZE_CAPS.raw;
}

export function formatBytes(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
}

export function oversizeMessage(type: UploadResourceType, sizeBytes: number): string {
  const cap = capForType(type);
  const capMB = Math.round(cap / 1024 / 1024);
  switch (type) {
    case "image":
      return `Image still too large after auto-compression (${formatBytes(sizeBytes)}). Cloudinary Free plan allows ${capMB} MB for images — please use a smaller original.`;
    case "video":
      return `Video too large (${formatBytes(sizeBytes)}). Cloudinary Free plan allows ${capMB} MB for videos — add a YouTube/Vimeo embed URL instead, or compress the video (e.g. HandBrake) to under ${capMB} MB.`;
    default:
      return `File too large for a PDF/raw upload (${formatBytes(sizeBytes)}). Maximum on the Cloudinary Free plan is ${capMB} MB — compress the PDF (reduce scan/image quality) and retry.`;
  }
}