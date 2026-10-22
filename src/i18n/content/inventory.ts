import { projects } from "@/data/projects";
import { builders } from "@/data/builders";
import { insights, insightCategories } from "@/data/insights";
import { hasLocalizedRoute } from "@/i18n/config";
import { pageBundles } from "./pages";
import { getTranslationStatus } from "./status";
import type { InventoryItem, TranslationStatus } from "./types";

/**
 * Static & core pages. `hasLocalizedRoute` is derived from the i18n config so it
 * can never drift from the actual `[locale]` route tree.
 */
const STATIC_PAGES: { path: string; label: string; priority: 0 | 1 | 2 | 3; family: InventoryItem["family"] }[] = [
  { path: "/", label: "Homepage", priority: 0, family: "static" },
  { path: "/about", label: "About", priority: 0, family: "static" },
  { path: "/services", label: "Services", priority: 0, family: "static" },
  { path: "/contact", label: "Contact", priority: 0, family: "static" },
  { path: "/why-hyderabad", label: "Why Hyderabad", priority: 0, family: "static" },
  { path: "/projects", label: "Projects listing", priority: 1, family: "static" },
  { path: "/nri-investment", label: "NRI Investment", priority: 1, family: "static" },
  { path: "/schedule-site-visit", label: "Schedule Site Visit", priority: 1, family: "static" },
  { path: "/testimonials", label: "Testimonials", priority: 2, family: "static" },
  { path: "/builders", label: "Builders listing", priority: 2, family: "static" },
  { path: "/vikarabad", label: "Vikarabad corridor", priority: 2, family: "static" },
  { path: "/ibrahimpatnam", label: "Ibrahimpatnam corridor", priority: 2, family: "static" },
  { path: "/orr", label: "ORR corridor", priority: 2, family: "static" },
  { path: "/shankarpally", label: "Shankarpally corridor", priority: 2, family: "static" },
  { path: "/srisailam-highway-future-city", label: "Srisailam Highway & Future City", priority: 2, family: "static" },
  { path: "/shankarpally-45-acres", label: "Shankarpally 45 Acres landing", priority: 2, family: "static" },
  { path: "/arjun-realty", label: "Arjun Realty brand page", priority: 3, family: "static" },
  { path: "/privacy", label: "Privacy Policy", priority: 3, family: "legal" },
  { path: "/terms", label: "Terms", priority: 3, family: "legal" },
  { path: "/guides/telangana-plot-buyer-checklist", label: "Telangana Plot Buyer Checklist guide", priority: 2, family: "guide" },
];

/**
 * Priority for an Insights article. High-value due-diligence / buyer-guide and
 * flagship market-update pieces are P2; the remainder are P3.
 *
 * Purely a heuristic for planning; status is never affected by priority.
 */
const HIGH_VALUE_INSIGHT_SLUGS = new Set<string>([
  "verify-open-plot-road-access-telangana",
  "mutation-vs-sale-deed-pattadar-passbook-telangana",
  "check-prohibited-properties-telangana-open-plots",
  "telangana-property-registration-charges-open-plots",
  "hmda-dtcp-plot-approval-checklist-hyderabad",
  "how-to-read-approved-plot-layout-plan-telangana",
  "verify-tg-rera-registration-open-plots-telangana",
  "bharat-future-city-srisailam-highway-development-connectivity",
  "srisailam-highway-2026-stretch-by-stretch-growth-guide",
  "shankarpally-plot-investment-2026-buyers-guide",
]);

/**
 * Build the full translation inventory from live source data. This is the single
 * source of truth for translation coverage reporting. It never guesses: an item
 * is only marked `complete` when overrides actually exist.
 */
export function getInventory(): InventoryItem[] {
  const items: InventoryItem[] = [];

  for (const page of STATIC_PAGES) {
    items.push({
      key: page.path === "/" ? "home" : page.path.replace(/^\//, ""),
      path: page.path,
      label: page.label,
      family: page.family,
      hasLocalizedRoute: hasLocalizedRoute(page.path),
      status: getTranslationStatus(page.path),
      priority: page.priority,
      note: page.path === "/" ? "Pilot: hero bundle registered, no overrides yet" : undefined,
    });
  }

  for (const project of projects) {
    const path = `/projects/${project.slug}`;
    items.push({
      key: `projects/${project.slug}`,
      path,
      label: project.name,
      family: "project",
      hasLocalizedRoute: hasLocalizedRoute(path),
      status: getTranslationStatus(path),
      priority: 1,
      note: "Project facts (name/location/approvals/acreage/pricing) are not translatable; prose only",
    });
  }

  for (const builder of builders) {
    const path = `/builders/${builder.slug}`;
    items.push({
      key: `builders/${builder.slug}`,
      path,
      label: builder.name,
      family: "builder",
      hasLocalizedRoute: hasLocalizedRoute(path),
      status: getTranslationStatus(path),
      priority: 2,
    });
  }

  for (const category of insightCategories) {
    const path = `/insights/category/${category.slug}`;
    items.push({
      key: `insights/category/${category.slug}`,
      path,
      label: `Insights category: ${category.label}`,
      family: "insight",
      hasLocalizedRoute: hasLocalizedRoute(path),
      status: getTranslationStatus(path),
      priority: 3,
    });
  }

  for (const article of insights) {
    const path = `/insights/${article.slug}`;
    items.push({
      key: `insights/${article.slug}`,
      path,
      label: article.title,
      family: "insight",
      hasLocalizedRoute: hasLocalizedRoute(path),
      status: getTranslationStatus(path),
      priority: HIGH_VALUE_INSIGHT_SLUGS.has(article.slug) ? 2 : 3,
    });
  }

  return items;
}

export interface InventorySummary {
  total: number;
  localizedRouteCapable: number;
  englishOnlyRoutes: number;
  byStatus: Record<TranslationStatus, number>;
  teComplete: number;
  hiComplete: number;
  partial: number;
  needsReview: number;
  pendingByPriority: Record<0 | 1 | 2 | 3, number>;
  byFamily: Record<InventoryItem["family"], { total: number; pending: number }>;
}

/** Aggregate the inventory into the coverage totals used in reports. */
export function getInventorySummary(items: InventoryItem[] = getInventory()): InventorySummary {
  const byStatus: Record<TranslationStatus, number> = {
    "english-only": 0,
    partial: 0,
    complete: 0,
    "needs-review": 0,
  };

  let teComplete = 0;
  let hiComplete = 0;
  let partial = 0;
  let needsReview = 0;
  let localizedRouteCapable = 0;

  const pendingByPriority: Record<0 | 1 | 2 | 3, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const byFamily = {} as InventorySummary["byFamily"];

  for (const item of items) {
    if (item.hasLocalizedRoute) localizedRouteCapable += 1;

    const statuses = [item.status.te ?? "english-only", item.status.hi ?? "english-only"];
    for (const s of statuses) byStatus[s] += 1;

    if (item.status.te === "complete") teComplete += 1;
    if (item.status.hi === "complete") hiComplete += 1;
    if (statuses.includes("partial")) partial += 1;
    if (statuses.includes("needs-review")) needsReview += 1;

    const isPending = statuses.some((s) => s !== "complete");
    if (isPending) pendingByPriority[item.priority] += 1;

    const fam = (byFamily[item.family] ??= { total: 0, pending: 0 });
    fam.total += 1;
    if (isPending) fam.pending += 1;
  }

  return {
    total: items.length,
    localizedRouteCapable,
    englishOnlyRoutes: items.filter((i) => !i.hasLocalizedRoute).length,
    byStatus,
    teComplete,
    hiComplete,
    partial,
    needsReview,
    pendingByPriority,
    byFamily,
  };
}

export { pageBundles };
