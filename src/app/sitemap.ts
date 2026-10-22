import type { MetadataRoute } from "next";
import siteConfig from "@/config/site";
import { projects } from "@/data/projects";
import { insights, insightCategories, getInsightsByCategory } from "@/data/insights";
import { localePath, hasLocalizedRoute } from "@/i18n/config";
import { getTranslatedLocales } from "@/i18n/content/status";

type BaseEntry = MetadataRoute.Sitemap[number];

/**
 * Build the reciprocal hreflang alternates for a given base path.
 *
 * English and `x-default` are always present. Telugu and Hindi are added ONLY
 * when the translation registry marks the path as genuinely translated for
 * that locale — an untranslated localized route renders English content and
 * must not be advertised as a translated variant.
 */
function alternatesFor(path: string): Record<string, string> {
  const english = `${siteConfig.url}${path === "/" ? "" : path}`;
  const map: Record<string, string> = {
    en: english,
    "x-default": english,
  };
  for (const locale of getTranslatedLocales(path)) {
    map[locale] = `${siteConfig.url}${localePath(locale, path)}`;
  }
  return map;
}

/**
 * Expand a base (English) entry into itself plus its Telugu and Hindi variants
 * when localized routes exist, each carrying the same reciprocal hreflang set.
 *
 * A localized variant is only emitted when the path is actually translated for
 * that locale, so untranslated locale URLs stay out of the sitemap.
 */
function withLocales(entry: BaseEntry): MetadataRoute.Sitemap {
  const baseUrl = entry.url;
  const basePath = baseUrl.replace(siteConfig.url, "") || "/";
  if (!hasLocalizedRoute(basePath)) return [entry];

  const languages = alternatesFor(basePath);
  const self = { ...entry, alternates: { languages } };
  const localized = getTranslatedLocales(basePath).map((locale) => ({
    ...entry,
    url: `${siteConfig.url}${localePath(locale, basePath)}`,
    alternates: { languages },
  }));
  return [self, ...localized];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: BaseEntry[] = [
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
    { url: `${baseUrl}/shankarpally`, lastModified: "2026-10-19", changeFrequency: "weekly" as const, priority: 0.8 },
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

  const projectRoutes: BaseEntry[] = projects
    .filter((p) => p.slug !== "shankarpally-45-acres")
    .map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  const insightCategoryRoutes: BaseEntry[] = insightCategories.flatMap((c) => {
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

  const insightRoutes: BaseEntry[] = insights.map((i) => ({
    url: `${baseUrl}/insights/${i.slug}`,
    lastModified: i.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...insightCategoryRoutes,
    ...projectRoutes,
    ...insightRoutes,
  ].flatMap(withLocales);
}
