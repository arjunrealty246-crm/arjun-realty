import "server-only";
import { Locale, defaultLocale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  te: () => import("./dictionaries/te").then((m) => m.default),
  hi: () => import("./dictionaries/hi").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries[defaultLocale];
  return loader();
}
