import { hasLocalizedContent } from "./content/availability";

export const locales = ["en", "te", "hi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { label: string; englishLabel: string; htmlLang: string; ogLocale: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", englishLabel: "English", htmlLang: "en-IN", ogLocale: "en_IN", dir: "ltr" },
  te: { label: "తెలుగు", englishLabel: "Telugu", htmlLang: "te-IN", ogLocale: "te_IN", dir: "ltr" },
  hi: { label: "हिंदी", englishLabel: "Hindi", htmlLang: "hi-IN", ogLocale: "hi_IN", dir: "ltr" },
};

export const nonDefaultLocales = locales.filter((l): l is Exclude<Locale, "en"> => l !== defaultLocale);

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function hasLocale(value: string | undefined): value is Locale {
  return value != null && isLocale(value);
}

/** Strip a leading `/{locale}` prefix from a pathname, returning the base path. */
export function stripLocale(pathname: string): { locale: Locale; basePath: string } {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && isLocale(maybeLocale)) {
    const basePath = "/" + segments.slice(2).join("/");
    return { locale: maybeLocale, basePath: basePath === "/" ? "/" : basePath.replace(/\/$/, "") || "/" };
  }
  return { locale: defaultLocale, basePath: pathname };
}

/**
 * Build a path for a given locale. English stays at the root (unchanged URLs);
 * Telugu and Hindi are prefixed with `/te` and `/hi`.
 */
export function localePath(locale: Locale, pathname: string): string {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === defaultLocale) return clean;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

/**
 * Given the current pathname (which may already include a locale prefix) and a
 * target locale, produce the equivalent path in that locale.
 *
 * The equivalent localized page is used only when translated content exists for
 * it; otherwise the visitor is sent to that locale's homepage. An existing
 * `/{locale}` route that still renders English is not a translated equivalent,
 * so it is never linked from the switcher.
 */
export function switchLocalePath(currentPathname: string, target: Locale): string {
  const { basePath } = stripLocale(currentPathname);
  if (target !== defaultLocale && !hasLocalizedContent(basePath, target)) {
    return localePath(target, "/");
  }
  return localePath(target, basePath);
}

/**
 * Base paths (no locale prefix) that actually have localized routes under
 * `/[locale]`. Dynamic detail paths are matched by the regexes below. Anything
 * not covered here only exists in English, so we must never link to a
 * non-existent `/{locale}` variant.
 */
const LOCALIZED_STATIC_PATHS = new Set<string>([
  "/",
  "/about",
  "/services",
  "/contact",
  "/testimonials",
  "/projects",
  "/builders",
  "/insights",
  "/why-hyderabad",
  "/nri-investment",
  "/schedule-site-visit",
  "/vikarabad",
  "/ibrahimpatnam",
  "/orr",
  "/shankarpally",
]);

const LOCALIZED_DYNAMIC_PATTERNS: RegExp[] = [
  /^\/projects\/[^/]+$/,
  /^\/builders\/[^/]+$/,
  /^\/insights\/[^/]+$/,
  /^\/insights\/category\/[^/]+$/,
];

/** True when a localized (Telugu/Hindi) route exists for the given base path. */
export function hasLocalizedRoute(basePath: string): boolean {
  const clean = basePath === "" ? "/" : basePath;
  if (LOCALIZED_STATIC_PATHS.has(clean)) return true;
  return LOCALIZED_DYNAMIC_PATTERNS.some((re) => re.test(clean));
}

/**
 * Locale-aware href that is safe against missing translations: it only adds the
 * `/{locale}` prefix when a localized route exists for that path. Otherwise it
 * returns the English path, so switching languages never links to a broken URL.
 */
export function safeLocalePath(locale: Locale, pathname: string): string {
  if (locale === defaultLocale) return localePath(locale, pathname);
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (!hasLocalizedRoute(clean)) return clean;
  return localePath(locale, pathname);
}
