import type { Locale } from "@/i18n/config";
import type { ContentBundle, DeepPartial } from "./types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/**
 * Deep-merge a locale override over the English source.
 *
 * Rules:
 * - Plain objects are merged recursively (override wins per key).
 * - Arrays are replaced wholesale when the override provides one (translations
 *   of lists must be complete, never partially merged).
 * - `undefined` in the override never overwrites a defined English value, so an
 *   untranslated key transparently falls back to English.
 */
export function deepMerge<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (override === undefined) return base;

  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
      if (value === undefined) continue;
      out[key] = deepMerge((base as Record<string, unknown>)[key], value as DeepPartial<unknown>);
    }
    return out as T;
  }

  if (Array.isArray(override)) {
    return override as unknown as T;
  }

  return override as T;
}

/**
 * Resolve a content bundle for a given locale.
 *
 * English returns the source unchanged (byte-identical). Telugu/Hindi return the
 * English source with their overrides deep-merged on top. Missing override keys
 * fall back to English — this is never treated or labelled as a translation.
 */
export function resolveBundle<T>(bundle: ContentBundle<T>, locale: Locale): T {
  if (locale === "en") return bundle.en;
  const override = bundle.overrides[locale as Exclude<Locale, "en">];
  return deepMerge(bundle.en, override);
}
