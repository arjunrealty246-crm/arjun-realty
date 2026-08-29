import {
  capForType,
  oversizeMessage,
  getUploadResourceType,
  getExtension,
} from "@/lib/upload-types";

export type UploadResourceType = "image" | "video" | "raw";

const IMAGE_MAX_WIDTH = 1920;
const IMAGE_MAX_HEIGHT = 1080;
const IMAGE_QUALITY = 0.8;
const IMAGE_QUALITY_RETRY = 0.6;
const SMALL_IMAGE_PASSTHROUGH = 2.5 * 1024 * 1024;
const MAX_COMPRESSED_IMAGE_SIZE = 9.5 * 1024 * 1024;

export function detectResourceType(file: { name: string; type?: string }): UploadResourceType {
  const ext = getExtension(file.name);
  const mime = (file.type || "").toLowerCase();
  if (ext) {
    const fromExt = getUploadResourceType(file.name);
    const explicit = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".mp4", ".pdf"];
    if (explicit.includes(ext)) return fromExt;
    if (fromExt !== "raw") return fromExt;
  }
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return "raw";
}

export function formatBytes(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
}

async function compressToWebp(file: File, quality: number): Promise<File | null> {
  try {
    const bitmap = await createImageBitmap(file);
    try {
      const scale = Math.min(
        1,
        IMAGE_MAX_WIDTH / bitmap.width,
        IMAGE_MAX_HEIGHT / bitmap.height
      );
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", quality)
      );
      if (!blob || blob.size >= file.size) return null;
      const base = file.name.replace(/\.[^.]+$/, "");
      return new File([blob], `${base}-optimized.webp`, { type: "image/webp" });
    } finally {
      bitmap.close();
    }
  } catch {
    return null;
  }
}

export async function prepareFileForUpload(file: File): Promise<File> {
  if (detectResourceType(file) !== "image") return file;
  if (file.size < SMALL_IMAGE_PASSTHROUGH) return file;
  const firstPass = await compressToWebp(file, IMAGE_QUALITY);
  if (!firstPass) return file;
  if (firstPass.size <= MAX_COMPRESSED_IMAGE_SIZE) return firstPass;
  const retry = await compressToWebp(file, IMAGE_QUALITY_RETRY);
  return retry && retry.size < firstPass.size ? retry : firstPass;
}

function uploadViaXHR(
  url: string,
  formData: FormData,
  onProgress?: (ratio: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.min(1, e.loaded / e.total));
      }
    };
    xhr.onload = () => {
      let data: { secure_url?: string; error?: { message?: string } } = {};
      try {
        data = JSON.parse(xhr.responseText) as typeof data;
      } catch {
        reject(new Error("Upload failed — unexpected response from Cloudinary."));
        return;
      }
      if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
        resolve(data.secure_url);
      } else {
        reject(new Error(data.error?.message || `Upload failed (HTTP ${xhr.status}).`));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed — network error. Please retry."));
    xhr.timeout = 15 * 60 * 1000;
    xhr.ontimeout = () => reject(new Error("Upload timed out. Please try again."));
    xhr.send(formData);
  });
}

export async function uploadWithProgress(
  file: File,
  folder: string,
  onProgress?: (ratio: number) => void
): Promise<string> {
  const prepared = await prepareFileForUpload(file);
  const type = detectResourceType(prepared);
  const cap = capForType(type);

  if (prepared.size > cap) {
    throw new Error(oversizeMessage(type, prepared.size));
  }

  const signRes = await fetch("/api/upload/cloudinary-sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: prepared.name, folder, size: prepared.size }),
  });
  const signData = (await signRes.json().catch(() => ({}))) as {
    api_key?: string;
    timestamp?: number;
    signature?: string;
    folder?: string;
    public_id?: string;
    cloud_name?: string;
    resource_type?: UploadResourceType;
    error?: string;
  };
  if (!signRes.ok || !signData.api_key) {
    throw new Error(signData.error || "Failed to get upload signature.");
  }

  const resourceType = signData.resource_type || type;
  const formData = new FormData();
  formData.append("file", prepared);
  formData.append("api_key", signData.api_key);
  formData.append("timestamp", String(signData.timestamp));
  formData.append("signature", signData.signature || "");
  formData.append("folder", signData.folder || "");
  formData.append("public_id", signData.public_id || "");
  formData.append("resource_type", resourceType);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloud_name}/${resourceType}/upload`;
  return uploadViaXHR(uploadUrl, formData, onProgress);
}