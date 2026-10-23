import type { Locale } from "@/i18n/config";

/** Normalize a path for content-availability lookups. */
export function normalizeContentPath(path: string): string {
  if (!path) return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) return withSlash.slice(0, -1);
  return withSlash;
}

/**
 * Paths that have translated content available in a non-default locale.
 *
 * This is deliberately a tiny data-only module: the language switcher is a
 * client component, so it must not import project data or translation bundles
 * just to decide which locale a link should point at.
 *
 * A locale is listed only when translated prose exists for that path — an
 * authored-but-unreviewed (`needs-review`) translation still counts as content,
 * because the page shows translated prose (with `noindex`). Paths that are not
 * listed fall back to that locale's homepage when switching languages.
 *
 * scripts/i18n-project-check.ts verifies this map against the project
 * translation bundles so the two can never drift apart.
 */
const localizedContentPaths: Record<string, Locale[]> = {
  "/": ["te", "hi"],
  "/projects/jb-harmony-woods": ["te", "hi"],
};

/** True when translated content exists for `path` in `locale`. */
export function hasLocalizedContent(path: string, locale: Locale): boolean {
  if (locale === "en") return true;
  const normalized = normalizeContentPath(path);
  return localizedContentPaths[normalized]?.includes(locale) ?? false;
}

/** Non-default locales that have content for a path (used by the check script). */
export function getLocalizedContentLocales(path: string): Locale[] {
  return [...(localizedContentPaths[normalizeContentPath(path)] ?? [])];
}

export { localizedContentPaths };
