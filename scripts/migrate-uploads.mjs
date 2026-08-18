/**
 * One-time migration: upload all locally-stored media (public/uploads/...) to
 * Cloudinary and rewrite the MongoDB URLs in-place.
 *
 * Usage:
 *   node --env-file=.env.local scripts/migrate-uploads.mjs
 *
 * Dry run (no uploads, no writes):
 *   node --env-file=.env.local scripts/migrate-uploads.mjs --dry-run
 */
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { readFile, stat, writeFile, unlink } from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const execFileAsync = promisify(execFile);
const MAX_SIZE = 10 * 1024 * 1024; // Cloudinary free tier: 10 MB hard limit

function findBinary(name) {
  if (os.platform() === "win32") {
    const gsPath = "C:\\Program Files\\gs\\gs10.07.1\\bin\\gswin64c.exe";
    if (name === "gs" && os.existsSync(gsPath)) return gsPath;
    const ffmpegPaths = [
      "C:\\Users\\allan\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0-full_build\\bin\\ffmpeg.exe",
      "ffmpeg",
    ];
    if (name === "ffmpeg") {
      for (const p of ffmpegPaths) { try { require("fs").accessSync(p); return p; } catch {} }
    }
  }
  return name;
}

async function compressPdf(inputPath) {
  const outputPath = path.join(os.tmpdir(), `compress-${Date.now()}.pdf`);
  const gs = findBinary("gs");
  await execFileAsync(gs, [
    "-dNOPAUSE", "-dBATCH", "-dQUIET", "-dSAFER",
    "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.4", "-dPDFSETTINGS=/ebook",
    `-sOutputFile=${outputPath}`, inputPath,
  ]);
  const compressedStat = await stat(outputPath);
  if (compressedStat.size >= (await stat(inputPath)).size) {
    await unlink(outputPath).catch(() => {});
    return null;
  }
  return outputPath;
}

async function compressVideo(inputPath) {
  const outputPath = path.join(os.tmpdir(), `compress-${Date.now()}.mp4`);
  const ffmpeg = findBinary("ffmpeg");
  await execFileAsync(ffmpeg, [
    "-i", inputPath, "-y",
    "-vf", "scale='min(1280,iw)':'min(720,ih)'",
    "-c:v", "libx264", "-crf", "32", "-preset", "fast",
    "-c:a", "aac", "-b:a", "64k",
    "-movflags", "+faststart",
    outputPath,
  ], { timeout: 300000 });
  return outputPath;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || "arjun-realty";

function isRemoteUrl(url) {
  return /^https?:\/\//i.test((url || "").trim());
}

function isLocalMedia(url) {
  const v = (url || "").trim();
  return Boolean(v && v.startsWith("/") && !v.startsWith("//") && !isRemoteUrl(v));
}

function localFilePath(url) {
  const publicDir = path.resolve(ROOT, "public");
  const filePath = path.resolve(publicDir, url.replace(/^\//, ""));
  if (!filePath.startsWith(publicDir)) return null;
  return filePath;
}

function resourceTypeFor(ext) {
  ext = (ext || "").toLowerCase();
  if ([".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"].includes(ext)) return "video";
  if (ext === ".pdf") return "image";
  if ([".txt", ".doc", ".docx", ".zip"].includes(ext)) return "raw";
  return "image";
}

function sanitizeFilename(name) {
  return (name || "file").replace(/[^a-zA-Z0-9._-]/g, "");
}

/** Recursively walk a document and rewrite any local media URLs. */
async function migrateValue(value, cache, dryLog) {
  if (typeof value === "string") return migrateString(value, cache, dryLog);
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (typeof value[i] === "string") value[i] = await migrateString(value[i], cache, dryLog);
      else if (value[i] && typeof value[i] === "object") await migrateValue(value[i], cache, dryLog);
    }
    return value;
  }
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      value[key] = await migrateValue(value[key], cache, dryLog);
    }
    return value;
  }
  return value;
}

async function migrateString(str, cache, dryLog) {
  if (!isLocalMedia(str)) return str;
  if (!str.trim().startsWith("/uploads/")) return str;
  if (cache.has(str)) return cache.get(str);

  const filePath = localFilePath(str);
  if (!filePath) return str;

  let fileStat;
  try {
    fileStat = await stat(filePath);
  } catch {
    dryLog.push({ path: str, skipped: "file missing on disk" });
    return str;
  }

  if (DRY_RUN) {
    dryLog.push({ path: str, sizeMB: Math.round(fileStat.size / 1024 / 1024) });
    return str;
  }
  let buffer = await readFile(filePath);
  const filename = sanitizeFilename(path.basename(filePath));
  const urlDir = path.posix.dirname(str); // e.g. /uploads/projects
  const folder = urlDir.replace(/^\/+/, "") || "uploads";
  const ext = path.extname(filename).toLowerCase();
  const publicId = `${folder}/${filename}`.replace(/^\/+/, "");
  const resourceType = resourceTypeFor(ext);

  let compressedTmp = null;
  if (buffer.byteLength > MAX_SIZE) {
    const origMB = (buffer.byteLength / 1024 / 1024).toFixed(1);
    console.log(`  [compress] ${filename} is ${origMB} MB — compressing...`);
    if (ext === ".pdf") {
      compressedTmp = await compressPdf(filePath);
    } else if ([".mp4", ".webm", ".mov", ".avi", ".mkv"].includes(ext)) {
      compressedTmp = await compressVideo(filePath);
    }
    if (compressedTmp) {
      buffer = await readFile(compressedTmp);
      const newMB = (buffer.byteLength / 1024 / 1024).toFixed(1);
      console.log(`  [compress] ${filename} compressed: ${origMB} MB → ${newMB} MB`);
    } else {
      console.log(`  [compress] ${filename} could not be compressed — uploading original`);
    }
  }

  const uploadOpts = {
    folder: CLOUDINARY_FOLDER,
    public_id: publicId,
    resource_type: resourceType,
    overwrite: true,
  };

  const secureUrl = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(uploadOpts, (error, result) => {
      if (error) return reject(error);
      if (!result) return reject(new Error("Cloudinary upload returned no result"));
      resolve(result.secure_url);
    });
    stream.end(buffer);
  });

  if (compressedTmp) await unlink(compressedTmp).catch(() => {});

  cache.set(str, secureUrl);
  return secureUrl;
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  if (DRY_RUN) {
    console.log("DRY RUN — no files will be uploaded, no DB writes.\n");
  } else {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET are required");
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  await mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 15000 });

  const collections = ["projects", "galleryitems", "brochures", "testimonials", "builders", "faqs"];
  const cache = new Map();
  const dryLog = [];
  let totalLocal = 0;
  let totalMigrated = 0;
  let totalMissing = 0;

  for (const collName of collections) {
    const coll = mongoose.connection.db.collection(collName);
    const cursor = coll.find({});
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      if (!doc) continue;

      let changed = false;
      const mutate = async (value) => {
        const before = JSON.stringify(value);
        const out = await migrateValue(value, cache, dryLog);
        if (JSON.stringify(out) !== before) changed = true;
        return out;
      };
      const { _id, __v, ...rest } = doc;
      const migrated = await mutate(rest);
      if (DRY_RUN) continue;
      if (changed) {
        await coll.updateOne({ _id }, { $set: migrated });
        totalMigrated++;
      }
    }
    await cursor.close();
  }

  if (DRY_RUN) {
    console.log(`Files found under public/uploads (local): ${dryLog.length}`);
    for (const entry of dryLog) {
      if (entry.skipped) {
        console.log(`  ${entry.path}  — ${entry.skipped}`);
      } else {
        console.log(`  ${entry.path}  (${entry.sizeMB} MB)`);
      }
    }
    console.log("\nNo DB writes performed (dry run).");
  } else {
    console.log(`\nMigration complete.`);
    console.log(`  Documents updated: ${totalMigrated}`);
    console.log(`  Unique local URLs cached: ${cache.size}`);
    for (const [from, to] of cache) {
      console.log(`  ${from}\n    -> ${to}`);
    }
    for (const entry of dryLog) {
      if (entry.skipped) {
        totalMissing++;
        console.log(`  SKIPPED (missing on disk): ${entry.path}`);
      }
    }
    console.log(`  Missing files skipped: ${totalMissing}`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
