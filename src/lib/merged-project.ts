import fs from "fs";
import path from "path";
import { getProjectBySlug } from "@/data/projects";
import type { Project } from "@/data/projects";
import { connectDB } from "@/lib/mongodb";
import { toPlainObject } from "@/lib/serialize";
import ProjectModel from "@/lib/models/Project";

/**
 * A media/document URL is considered usable when it is:
 *   - an absolute http(s) URL (e.g. a Cloudinary CDN URL), or
 *   - a local path that resolves to a file that actually exists under /public.
 * Local paths pointing to missing files (e.g. /uploads/... that were never
 * uploaded) are filtered out so that broken links / blank tiles are never shown.
 */
export function isUsableMediaUrl(value: string): boolean {
  const v = (value || "").trim();
  if (!v) return false;
  if (/^https?:\/\//i.test(v)) return true;
  const publicDir = path.resolve(process.cwd(), "public");
  const filePath = path.resolve(publicDir, v.replace(/^\//, ""));
  if (!filePath.startsWith(publicDir)) return false;
  return fs.existsSync(filePath);
}

const SKIP_DB_KEYS = new Set(["_id", "__v", "createdAt", "updatedAt", "sortOrder"]);

/**
 * Returns the merged project: the static project record overridden by saved
 * Admin data from MongoDB. Undefined/null DB fields do not clobber the static
 * defaults. Falls back to the static record when the DB is unavailable.
 *
 * Empty arrays are skipped by default, because Mongoose initialises unset array
 * paths to `[]` and that must not blank a project's static content. An admin who
 * deliberately empties a list has that field recorded in `clearedFields`, and
 * only those recorded fields are allowed to override with an empty array.
 */
export async function getMergedProject(slug: string): Promise<Project | null> {
  const staticProject = getProjectBySlug(slug);
  if (!staticProject) return null;

  const project = { ...staticProject };

  try {
    await connectDB();
    const dbProject = await ProjectModel.findOne({ slug }).lean() as Record<string, unknown> | null;
    if (dbProject) {
      const plainProject = toPlainObject(dbProject);
      const clearedFields = new Set(
        (Array.isArray(plainProject.clearedFields) ? plainProject.clearedFields : []).filter(
          (f): f is string => typeof f === "string"
        )
      );
      for (const [key, val] of Object.entries(plainProject)) {
        if (SKIP_DB_KEYS.has(key)) continue;
        if (key === "clearedFields") continue;
        if (val === undefined || val === null) continue;
        if (Array.isArray(val) && val.length === 0 && !clearedFields.has(key)) continue;
        (project as Record<string, unknown>)[key] = val;
      }
    }
  } catch {
    // DB unavailable — use static data as-is
  }

  return project;
}
