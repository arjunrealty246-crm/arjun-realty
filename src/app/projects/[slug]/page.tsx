import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { projects, getProjectBySlug, getRelatedProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import PremiumProjectDetailPage from "@/components/PremiumProjectDetailPage";
import siteConfig from "@/config/site";
import { connectDB } from "@/lib/mongodb";
import { toPlainObject } from "@/lib/serialize";
import ProjectModel from "@/lib/models/Project";

function isUsableMediaUrl(value: string): boolean {
  const v = (value || "").trim();
  if (!v) return false;
  if (/^https?:\/\//i.test(v)) return true;
  const publicDir = path.resolve(process.cwd(), "public");
  const filePath = path.resolve(publicDir, v.replace(/^\//, ""));
  if (!filePath.startsWith(publicDir)) return false;
  return fs.existsSync(filePath);
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamic = "force-dynamic";

const SKIP_DB_KEYS = new Set(["_id", "__v", "createdAt", "updatedAt", "sortOrder"]);

async function getMergedProject(slug: string): Promise<Project | null> {
  const staticProject = getProjectBySlug(slug);
  if (!staticProject) return null;

  const project = { ...staticProject };

  try {
    await connectDB();
    const dbProject = await ProjectModel.findOne({ slug }).lean() as Record<string, unknown> | null;
    if (dbProject) {
      const plainProject = toPlainObject(dbProject);
      for (const [key, val] of Object.entries(plainProject)) {
        if (SKIP_DB_KEYS.has(key)) continue;
        if (val === undefined || val === null) continue;
        (project as Record<string, unknown>)[key] = val;
      }
    }
  } catch {
    // DB unavailable — use static data as-is
  }

  return project;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getMergedProject(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.projectType} | Arjun Realty`;
  const description = `${project.name} is a ${project.projectType} located at ${project.location}. ${project.approval}. Plot sizes: ${project.plotSizes}. Starting from ${project.startingPrice}.`;

  return {
    title,
    description,
    keywords: [
      project.name,
      project.location,
      "Hyderabad real estate",
      siteConfig.name,
      "premium plots Hyderabad",
      "HMDA approved plots",
      "DTCP approved layouts",
      "RERA approved projects",
      "real estate investment Hyderabad",
      project.projectType,
    ],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/projects/${slug}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${project.name} — Arjun Realty`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = await getMergedProject(slug);
  if (!project) notFound();

  const relatedProjects = getRelatedProjects(slug, 3);

  const usableImages = Array.isArray(project.images)
    ? project.images.filter((img) => isUsableMediaUrl(img))
    : [];
  project.images = usableImages.length ? usableImages : [];
  if (!isUsableMediaUrl(project.image)) {
    project.image = usableImages[0] || "";
  }

  if (Array.isArray(project.phases)) {
    project.phases = project.phases
      .map((phase) => {
        const p = { ...phase };
        p.photos = (p.photos || []).filter((url) => isUsableMediaUrl(url));
        p.videos = (p.videos || []).filter((url) => isUsableMediaUrl(url));
        if (p.masterPlanUrl && !isUsableMediaUrl(p.masterPlanUrl)) p.masterPlanUrl = undefined;
        if (p.layoutUrl && !isUsableMediaUrl(p.layoutUrl)) p.layoutUrl = undefined;
        if (p.layoutPdfUrl && !isUsableMediaUrl(p.layoutPdfUrl)) p.layoutPdfUrl = undefined;
        if (p.brochureUrl && !isUsableMediaUrl(p.brochureUrl)) p.brochureUrl = undefined;
        p.documents = (p.documents || []).filter((d) => d && d.url && isUsableMediaUrl(d.url));
        return p;
      })
      .filter((p) => Boolean(p.name));
  }

  if (Array.isArray(project.documents)) {
    project.documents = project.documents.filter((d) => d && d.url && isUsableMediaUrl(d.url));
  }

  for (const key of ["heroVideo", "videoUrl", "droneVideoUrl", "brochureUrl", "masterPlanUrl", "layoutPdfUrl", "layoutUrl", "locationMapUrl", "locationUrl"] as const) {
    const val = project[key];
    if (val && !isUsableMediaUrl(val)) {
      (project as unknown as Record<string, unknown>)[key] = undefined;
    }
  }

  if (Array.isArray(project.videos)) {
    project.videos = project.videos.filter((v) => isUsableMediaUrl(v));
  }

  if (Array.isArray(project.galleryImages)) {
    project.galleryImages = project.galleryImages.filter((url) => isUsableMediaUrl(url));
  }

  if (Array.isArray(project.gallery)) {
    project.gallery = project.gallery.filter((g) => g && g.src && isUsableMediaUrl(g.src));
  }

  if (Array.isArray(project.developmentUpdates)) {
    project.developmentUpdates = project.developmentUpdates
      .map((u) => ({ ...u, images: (u.images || []).filter((img) => isUsableMediaUrl(img)) }))
      .filter((u) => Boolean(u && u.title));
  }

  return <PremiumProjectDetailPage project={project} relatedProjects={relatedProjects} />;
}
