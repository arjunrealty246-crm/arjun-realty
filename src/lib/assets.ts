import type { Project } from "@/data/projects";

const FALLBACK_GRADIENTS = [
  "from-primary/20 via-charcoal-dark to-primary/10",
  "from-gold/20 via-charcoal-dark to-gold/10",
  "from-primary-dark/20 via-charcoal-dark to-primary-light/10",
];

export function getProjectGradient(slug: string): string {
  const index = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % FALLBACK_GRADIENTS.length;
  return FALLBACK_GRADIENTS[index];
}

export function getProjectImageSrc(project: Project, index = 0): string {
  const img = project.images?.[index] || project.image;
  return img || "";
}

export function hasRealImage(project: Project): boolean {
  return Boolean(project.image && project.image.length > 0);
}

const VALID_VIDEO_EXTS = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];

function isVideoUrl(url: string): boolean {
  const ext = url.toLowerCase().split("?")[0].slice(url.lastIndexOf("."));
  return VALID_VIDEO_EXTS.includes(ext);
}

export function hasVideo(project: Project): boolean {
  return Boolean(project.videoUrl && project.videoUrl.length > 0 && isVideoUrl(project.videoUrl));
}

export function hasDroneVideo(project: Project): boolean {
  return Boolean(project.droneVideoUrl && project.droneVideoUrl.length > 0 && isVideoUrl(project.droneVideoUrl));
}

export function hasBrochure(project: Project): boolean {
  return Boolean(project.brochureUrl && project.brochureUrl.length > 0);
}

export function getProjectThumbnail(project: Project): string {
  return project.images?.[0] || project.image || "";
}
