import type { Locale } from "@/i18n/config";
import { hero as heroEn } from "@/data/content";
import type { ContentBundle, LocalizedStatus } from "./types";
import { resolveBundle } from "./merge";

/**
 * Hero section content — the shape consumed by `<HeroSection />`.
 * This mirrors the existing `hero` export from `src/data/content.ts` exactly, so
 * the English bundle is a direct alias of the current source (byte-identical).
 */
export interface HeroContent {
  badge: string;
  headline1: string;
  headline2: string;
  headline3: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  scrollIndicator: string;
}

/**
 * Page-level content bundles, keyed by a stable page key.
 * The homepage hero is registered here; the rest of the homepage body copy
 * lives in `home-copy.ts` and is not part of this hero bundle.
 */
const pageBundles = {
  home: {
    key: "home",
    path: "/",
    en: heroEn as HeroContent,
    overrides: {
      // te: {}, // hero overrides (authored body copy is in home-copy.ts)
      // hi: {},
    },
    status: {
      te: "needs-review",
      hi: "needs-review",
    },
  },
} satisfies Record<string, ContentBundle<HeroContent>>;

type PageKey = keyof typeof pageBundles;

/** Typed server-side accessor for a page content bundle. */
export function getPageContent(key: PageKey, locale: Locale): HeroContent {
  return resolveBundle(pageBundles[key], locale);
}

/** The English source of a page bundle, unchanged. */
export function getEnglishPageContent(key: PageKey): HeroContent {
  return pageBundles[key].en;
}

/**
 * The parts of a bundle that the translation-status helper needs.
 * Kept structural so the lookup keeps working when bundles of other content
 * types (projects, insights, ...) are registered alongside the homepage.
 */
export interface RegisteredBundle {
  path: string;
  status: LocalizedStatus;
}

/**
 * Look up a page bundle by its public base path.
 * Returns undefined when the path has no registered bundle (i.e. no translation
 * content is available for it in any locale).
 */
export function getPageBundleByPath(path: string): RegisteredBundle | undefined {
  const normalized = path === "" ? "/" : path;
  return Object.values(pageBundles).find((bundle) => bundle.path === normalized);
}

export { pageBundles };
export type { PageKey };
