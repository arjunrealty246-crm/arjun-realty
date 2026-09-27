const PROJECT_STRING_FIELDS = [
  "slug", "name", "builder", "marketingPartner", "projectType", "approval",
  "location", "mapsUrl", "price", "launchPrice", "currentPrice", "startingPrice",
  "status", "badge", "totalAcres", "totalPlots", "plotSizes", "villaInfo",
  "clubhouseDetails", "brochureUrl", "layoutPdfUrl", "image", "videoUrl",
  "droneVideoUrl", "heroVideo", "masterPlanUrl", "locationMapUrl", "whatsappCta",
  "projectArea", "description", "layoutUrl", "locationUrl",
  "seoTitle", "tagline", "developerName", "seoDescription",
  "locationOverviewLabel", "locationOverviewHeading",
];

const PROJECT_ARRAY_FIELDS = [
  "amenities", "connectivity", "nearbyLandmarks", "investmentHighlights",
  "highlights", "usps", "galleryImages", "images", "videos",
  "locationAdvantages", "whyInvest", "locationOverview", "targetKeywords",
  "relatedInsightSlugs", "clearedFields",
];

const PROJECT_OBJECT_ARRAY_FIELDS = [
  "faqs", "testimonials", "gallery", "developmentUpdates", "documents",
  "updates", "units", "phases", "contentSections",
];

/**
 * Array fields an admin is allowed to empty out from the Project form.
 *
 * Mongoose initialises unset array paths to `[]`, so "field is an empty array"
 * cannot distinguish "never configured" from "deliberately cleared". When the
 * admin empties one of these, its name is recorded in `clearedFields`, and only
 * then does an empty array override the static default. This keeps a project
 * that has never been configured from blanking its own content.
 */
export const PROJECT_CLEARABLE_ARRAY_FIELDS: readonly string[] = [
  ...PROJECT_ARRAY_FIELDS.filter((f) => f !== "clearedFields"),
  ...PROJECT_OBJECT_ARRAY_FIELDS,
];

const PROJECT_BOOLEAN_FIELDS = ["isUpcoming", "bankLoanAvailable", "siteVisitBooking"];

const PROJECT_NUMBER_FIELDS = ["sortOrder"];

const MAX_STRING_LENGTH = 10000;

export function sanitizeProjectBody(body: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};

  for (const field of PROJECT_STRING_FIELDS) {
    if (field in body && typeof body[field] === "string") {
      clean[field] = (body[field] as string).slice(0, MAX_STRING_LENGTH);
    }
  }

  for (const field of PROJECT_ARRAY_FIELDS) {
    if (field in body && Array.isArray(body[field])) {
      clean[field] = body[field];
    }
  }

  for (const field of PROJECT_OBJECT_ARRAY_FIELDS) {
    if (field in body && Array.isArray(body[field])) {
      clean[field] = body[field];
    }
  }

  for (const field of PROJECT_BOOLEAN_FIELDS) {
    if (field in body && typeof body[field] === "boolean") {
      clean[field] = body[field];
    }
  }

  for (const field of PROJECT_NUMBER_FIELDS) {
    if (field in body && typeof body[field] === "number") {
      clean[field] = body[field];
    }
  }

  return clean;
}

import { ALLOWED_UPLOAD_EXTENSIONS, ALLOWED_UPLOAD_FOLDERS } from "@/lib/upload-types";

export function isValidUploadFile(filename: string): boolean {
  const ext = filename.toLowerCase().match(/\.[^.]+$/)?.[0];
  return ext ? ALLOWED_UPLOAD_EXTENSIONS.has(ext) : false;
}

export function isValidUploadFolder(folder: string): boolean {
  const f = (folder || "").trim().replace(/^\/+|\/+$/g, "");
  if (!f) return false;
  if (ALLOWED_UPLOAD_FOLDERS.has(f)) return true;
  const parts = f.split("/");
  if (parts.length === 2 && parts[0] === "uploads" && ALLOWED_UPLOAD_FOLDERS.has(parts[1])) {
    return true;
  }
  return false;
}

export { isValidUploadFile as isAllowedUploadFile, isValidUploadFolder as isAllowedUploadFolder }
