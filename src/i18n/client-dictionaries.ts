import { Locale, defaultLocale, isLocale } from "./config";
import type { Dictionary } from "./dictionaries/en";
import en from "./dictionaries/en";
import te from "./dictionaries/te";
import hi from "./dictionaries/hi";

/**
 * Client-side chrome dictionaries. These are intentionally small (navigation,
 * footer, buttons, form labels) so bundling all locales keeps the shared header
 * and footer instant on every page, including the English routes that live
 * outside the `[locale]` tree.
 */
export const clientDictionaries: Record<Locale, Dictionary> = {
  en,
  te,
  hi,
};

export function getClientDictionary(locale: string | undefined): Dictionary {
  if (locale && isLocale(locale)) return clientDictionaries[locale];
  return clientDictionaries[defaultLocale];
}
