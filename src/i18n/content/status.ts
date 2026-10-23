import { nonDefaultLocales, type Locale } from "@/i18n/config";
import { getPageBundleByPath } from "./pages";
import { getProjectBundleByPath } from "./project-translations";
import type { LocalizedStatus } from "./types";

/**
 * The status used for any path that has no registered translation entry.
 * Such a path renders English in every locale and must never be advertised as
 * a translated variant.
 */
export const UNTRANSLATED_STATUS: LocalizedStatus = {
  te: "english-only",
  hi: "english-only",
};

/**
 * Explicit translation status for paths that do not have a dedicated content
 * bundle (projects, insights, guides, ...).
 *
 * Only paths that are genuinely translated need an entry here — every path
 * that is missing is treated as `english-only`. This is the registry that the
 * hreflang gate reads.
 */
const pathStatusRegistry: Record<string, LocalizedStatus> = {};

/** Normalize a path for comparison (strip a trailing slash, keep "/" intact). */
function normalizePath(path: string): string {
  if (!path) return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) return withSlash.slice(0, -1);
  return withSlash;
}

/**
 * The translation status of a path, per locale.
 *
 * Resolution order:
 * 1. the status carried by the path's content bundle, when one exists,
 * 2. the explicit path registry (paths without a content bundle),
 * 3. `english-only` in every locale.
 *
 * Exactly one of (1) and (2) can ever apply to a given path, so there is a
 * single source of truth per path.
 */
export function getTranslationStatus(path: string): LocalizedStatus {
  const target = normalizePath(path);
  const bundle = getPageBundleByPath(target) ?? getProjectBundleByPath(target);
  if (bundle) return { ...bundle.status };
  const registered = pathStatusRegistry[target];
  if (registered) return { ...registered };
  return { ...UNTRANSLATED_STATUS };
}

/**
 * THE GATE.
 *
 * The locales in which a given path is genuinely translated.
 *
 * A locale qualifies only when the translation registry marks it `complete`
 * for that path. `english-only`, `partial` and `needs-review` are all
 * excluded, because a locale that still renders English (or partly English)
 * content must never be advertised to search engines as a translated variant.
 *
 * English is the source language and is handled separately by callers, so it is
 * never returned here.
 */
export function getTranslatedLocales(path: string): Locale[] {
  const status = getTranslationStatus(path);
  return nonDefaultLocales.filter((locale) => status[locale] === "complete");
}
