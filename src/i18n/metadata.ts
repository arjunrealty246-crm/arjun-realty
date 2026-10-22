import type { Metadata } from "next";
import siteConfig from "@/config/site";
import { defaultLocale, localeMeta, Locale, localePath } from "./config";
import { getTranslatedLocales } from "./content/status";

interface LocalizedMetadataInput {
  locale: Locale;
  /** Base path without locale prefix, e.g. "/about". */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

/**
 * Builds the hreflang alternate set for a path.
 *
 * English and `x-default` are always present (English is the source language
 * and the default fallback). Telugu and Hindi are emitted ONLY when the
 * translation registry marks the path as `complete` for that locale — a page
 * that still renders English (or partly English) content must never be
 * advertised as a translated variant.
 *
 * The same helper is used for every locale variant of a path, which is what
 * keeps the alternates reciprocal.
 */
function buildAlternateLanguages(path: string): Record<string, string> {
  const englishUrl = `${siteConfig.url}${localePath("en", path)}`;
  const languages: Record<string, string> = {
    [localeMeta.en.htmlLang]: englishUrl,
  };

  for (const locale of getTranslatedLocales(path)) {
    languages[localeMeta[locale].htmlLang] = `${siteConfig.url}${localePath(locale, path)}`;
  }

  // x-default points at the English (default) equivalent.
  languages["x-default"] = englishUrl;
  return languages;
}

/**
 * Whether `path` is genuinely translated into `locale`.
 *
 * English is the source language and is always indexable. A non-default locale
 * qualifies only when THE GATE (`getTranslatedLocales`) marks it `complete` —
 * the same registry that drives the hreflang/sitemap gate, so robots, canonical
 * and alternates can never disagree about a page's status.
 */
function isGenuinelyTranslated(path: string, locale: Locale): boolean {
  if (locale === defaultLocale) return true;
  return getTranslatedLocales(path).includes(locale);
}

/**
 * Absolute URL of the English source page for a base path, built the same way
 * as the sitemap (the root path has no trailing slash) so a canonical-to-English
 * emitted here matches the URL advertised for the English page exactly.
 */
function englishSourceUrl(path: string): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

/**
 * Builds page metadata for a localized route, including:
 * - canonical + reciprocal hreflang alternates for the localized URL when the
 *   path is genuinely translated for this locale
 * - `noindex, follow` and a canonical pointing at the verified English URL
 *   when it is not (an untranslated locale route renders English content and
 *   is a duplicate of the English page)
 * - Open Graph locale
 */
export function buildLocalizedMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  ogImage = `${siteConfig.url}/og-image.png`,
}: LocalizedMetadataInput): Metadata {
  const translated = isGenuinelyTranslated(path, locale);
  // Untranslated locale variants render English content: never index them as
  // separate pages, and consolidate them onto the verified English source.
  const canonical = translated
    ? `${siteConfig.url}${localePath(locale, path)}`
    : englishSourceUrl(path);

  const languages = buildAlternateLanguages(path);

  return {
    // Absolute so the root layout's title template is not applied twice.
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: translated,
      follow: true,
    },
  };
}

/**
 * Rewrites a base Metadata object (typically produced by an English route) so
 * that hreflang links are added and the canonical/robots treatment matches the
 * translation status of the locale variant. Used by localized dynamic routes
 * that reuse the English metadata.
 *
 * - translated: canonical points at the localized URL, base robots unchanged
 * - untranslated: canonical points at the verified English URL and the page is
 *   `noindex, follow` (it renders English content, so it is a duplicate)
 */
export function withLocaleAlternates(
  base: Metadata,
  locale: Locale,
  path: string
): Metadata {
  const translated = isGenuinelyTranslated(path, locale);
  const canonical = translated
    ? `${siteConfig.url}${localePath(locale, path)}`
    : englishSourceUrl(path);

  const languages = buildAlternateLanguages(path);

  const baseTitle = base.title;
  const baseDescription = (base.description as string | undefined) ?? undefined;
  const ogImage =
    (base.openGraph?.images as Array<{ url?: string } | string> | undefined)?.[0];
  const imageUrl =
    typeof ogImage === "string" ? ogImage : ogImage?.url ?? `${siteConfig.url}/og-image.png`;

  return {
    ...base,
    alternates: {
      canonical,
      languages,
    },
    // Only the untranslated case is overridden here; when the variant is
    // genuinely translated the base (English) robots directives — including
    // the root layout's googleBot rules — keep applying as before.
    ...(translated ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      ...(base.openGraph ?? {}),
      locale: localeMeta[locale].ogLocale,
      url: canonical,
      title: baseTitle as string,
      description: baseDescription,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
  };
}
