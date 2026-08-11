import type { MetadataRoute } from "next";
import siteConfig from "@/config/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  const staticRoutes = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/why-hyderabad`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/nri-investment`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/testimonials`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}
