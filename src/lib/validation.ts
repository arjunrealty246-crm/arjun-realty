const PROJECT_STRING_FIELDS = [
  "slug", "name", "builder", "marketingPartner", "projectType", "approval",
  "location", "mapsUrl", "price", "launchPrice", "currentPrice", "startingPrice",
  "status", "badge", "totalAcres", "totalPlots", "plotSizes", "villaInfo",
  "clubhouseDetails", "brochureUrl", "layoutPdfUrl", "image", "videoUrl",
  "droneVideoUrl", "heroVideo", "masterPlanUrl", "locationMapUrl", "whatsappCta",
  "projectArea", "description", "layoutUrl", "locationUrl",
  "seoTitle", "tagline",
];

const PROJECT_ARRAY_FIELDS = [
  "amenities", "connectivity", "nearbyLandmarks", "investmentHighlights",
  "highlights", "usps", "galleryImages", "images", "videos",
  "locationAdvantages", "whyInvest",
];

const PROJECT_OBJECT_ARRAY_FIELDS = [
  "faqs", "testimonials", "gallery", "developmentUpdates", "documents",
  "updates", "units", "phases",
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
  return ALLOWED_UPLOAD_FOLDERS.has(folder);
}

export { isValidUploadFile as isAllowedUploadFile, isValidUploadFolder as isAllowedUploadFolder }
