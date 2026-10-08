import type { MetadataRoute } from "next";
import siteConfig from "@/config/site";
import { projects } from "@/data/projects";
import { insights, insightCategories, getInsightsByCategory } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    { url: baseUrl, lastModified: "2026-08-20", changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/guides/telangana-plot-buyer-checklist`, lastModified: "2026-08-27", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: "2026-08-20", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: "2026-08-20", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: "2026-08-20", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/insights`, lastModified: "2026-08-28", changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/builders`, lastModified: "2026-08-20", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/why-hyderabad`, lastModified: "2026-08-20", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/vikarabad`, lastModified: "2026-09-01", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/ibrahimpatnam`, lastModified: "2026-09-01", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/orr`, lastModified: "2026-09-01", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/srisailam-highway-future-city`, lastModified: "2026-09-01", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/nri-investment`, lastModified: "2026-08-20", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/testimonials`, lastModified: "2026-08-20", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: "2026-08-20", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/schedule-site-visit`, lastModified: "2026-08-20", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/arjun-realty`, lastModified: "2026-08-28", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/shankarpally-45-acres`, lastModified: "2026-08-28", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/builders/jb-infra`, lastModified: "2026-08-20", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: "2026-08-20", changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: "2026-08-20", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const projectRoutes = projects
    .filter((p) => p.slug !== "shankarpally-45-acres")
    .map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  const insightCategoryRoutes = insightCategories.flatMap((c) => {
    const articles = getInsightsByCategory(c.slug);
    if (articles.length === 0) return [];
    const lastModified = articles.reduce(
      (max, a) => (a.publishedAt > max ? a.publishedAt : max),
      articles[0].publishedAt
    );
    return [
      {
        url: `${baseUrl}/insights/category/${c.slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
    ];
  });

  const insightRoutes = insights.map((i) => ({
    url: `${baseUrl}/insights/${i.slug}`,
    lastModified: i.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...insightCategoryRoutes, ...projectRoutes, ...insightRoutes];
}
