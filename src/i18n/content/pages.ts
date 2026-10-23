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
      te: {
        badge: "హైదరాబాద్లో విశ్వసనీయ రియల్ ఎస్టేట్ సలహాదారు",
        headline1: "మీ విశ్వసనీయ మార్గదర్శి",
        headline2: "ఆమోదిత ప్లాట్లకు",
        headline3: "హైదరాబాద్",
        subhead:
          "హైదరాబాద్ అంతటా ధృవీకరించిన HMDA, DTCP మరియు RERA ఆమోదిత ఆస్తులను పెట్టుబడిదారులు కనుగొనడంలో సహాయపడే స్వతంత్ర రియల్ ఎస్టేట్ సలహాదారు. పారదర్శక మార్గదర్శకం, ప్రాజెక్ట్ పోలిక మరియు విచారణ నుండి రిజిస్ట్రేషన్ వరకు పూర్తి సహాయం.",
        primaryCta: "ఉచిత సంప్రదింపు బుక్ చేయండి",
        secondaryCta: "ప్రాజెక్టులు చూడండి",
        scrollIndicator: "అన్వేషించడానికి స్క్రోల్ చేయండి",
      },
      hi: {
        badge: "हैदराबाद में विश्वसनीय रियल एस्टेट सलाहकार",
        headline1: "आपका विश्वसनीय मार्गदर्शक",
        headline2: "स्वीकृत प्लॉट के लिए",
        headline3: "हैदराबाद",
        subhead:
          "हैदराबाद भर में सत्यापित HMDA, DTCP और RERA स्वीकृत संपत्तियां खोजने में निवेशकों की मदद करने वाला स्वतंत्र रियल एस्टेट सलाहकार। पारदर्शी मार्गदर्शन, परियोजना तुलना और पूछताछ से पंजीकरण तक पूरा सहयोग।",
        primaryCta: "मुफ्त परामर्श बुक करें",
        secondaryCta: "परियोजनाएं देखें",
        scrollIndicator: "देखने के लिए स्क्रॉल करें",
      },
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
