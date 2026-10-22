import type { Locale } from "@/i18n/config";

/**
 * Translation status for a single content item (a page, a project, an article,
 * a shared block, ...).
 *
 * - `english-only`  : only the English source exists. Localized routes, when
 *                     they exist at all, render English. MUST NOT be advertised
 *                     to search engines as translated.
 * - `partial`       : some fields are translated, some still fall back to
 *                     English. MUST NOT be advertised as fully translated.
 * - `complete`      : every translatable field is translated for the locale.
 * - `needs-review`  : translated, but flagged for human review before it can be
 *                     considered complete (accuracy / legal / factual risk).
 */
export type TranslationStatus = "english-only" | "partial" | "complete" | "needs-review";

/** Status is tracked per non-default locale. English is always the source of truth. */
export type LocalizedStatus = Partial<Record<Exclude<Locale, "en">, TranslationStatus>>;

/**
 * A single tracked content item in the translation inventory.
 */
export interface InventoryItem {
  /** Stable key, e.g. "home", "projects/jb-harmony-woods", "insights/<slug>". */
  key: string;
  /** Public English URL path (base path, no locale prefix). */
  path: string;
  /** Human-readable label. */
  label: string;
  /** Content family, used for grouping/prioritisation. */
  family:
    | "static"
    | "project"
    | "builder"
    | "insight"
    | "guide"
    | "legal"
    | "shared";
  /** Whether a `/{locale}` route exists for this path. */
  hasLocalizedRoute: boolean;
  /** Per-locale translation status (page body, not chrome). */
  status: LocalizedStatus;
  /** P0 (core) ... P3 (remaining). */
  priority: 0 | 1 | 2 | 3;
  /** Optional note explaining the status. */
  note?: string;
}

/**
 * A typed content bundle: the English source plus optional locale overrides.
 * Overrides are deep-merged over the English source, so any missing key falls
 * back to English automatically. This is intentionally structural: we never
 * invent translations, and fallback text is never labelled as translated.
 */
export interface ContentBundle<T> {
  key: string;
  /** Public base path this bundle serves, e.g. "/" or "/about". */
  path: string;
  en: T;
  overrides: Partial<Record<Exclude<Locale, "en">, DeepPartial<T>>>;
  status: LocalizedStatus;
}

/** Recursively-optional version of a type, used for locale overrides. */
export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
