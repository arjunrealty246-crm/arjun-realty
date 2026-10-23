import { notFound } from "next/navigation";
import { isLocale, Locale, defaultLocale, localeMeta } from "@/i18n/config";

/**
 * Server guard + wrapper for localized routes. Renders the English page body
 * (content falls back to English until translations are supplied) while the
 * shared chrome (header, footer, selector) renders in the active locale.
 */
export default async function LocalePage({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <>{children}</>;
}

export function assertLocale(locale: string): Locale {
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return locale as Locale;
}

export { localeMeta };
