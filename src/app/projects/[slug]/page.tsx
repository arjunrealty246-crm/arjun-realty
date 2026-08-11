import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { projects, getProjectBySlug, getRelatedProjects } from "@/data/projects";
import PremiumProjectDetailPage from "@/components/PremiumProjectDetailPage";
import siteConfig from "@/config/site";
import { connectDB } from "@/lib/mongodb";
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
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

  const staticProject = getProjectBySlug(slug);
  if (!staticProject) notFound();

  const project = { ...staticProject };

  try {
    await connectDB();
    const dbProject = await ProjectModel.findOne({ slug }).lean() as Record<string, unknown> | null;
    if (dbProject) {
      for (const key of ["heroVideo", "image", "images", "videoUrl", "droneVideoUrl", "brochureUrl", "name", "description", "price", "startingPrice", "status", "badge", "mapsUrl"]) {
        const val = dbProject[key];
        if (val !== undefined && val !== null) {
          (project as Record<string, unknown>)[key] = val;
        }
      }
    }
  } catch {
    // DB unavailable — use static data as-is
  }

  const relatedProjects = getRelatedProjects(slug, 3);

  const usableImages = Array.isArray(project.images)
    ? project.images.filter((img) => isUsableMediaUrl(img))
    : [];
  project.images = usableImages.length ? usableImages : [];
  if (!isUsableMediaUrl(project.image)) {
    project.image = usableImages[0] || "";
  }

  return <PremiumProjectDetailPage project={project} relatedProjects={relatedProjects} />;
}
