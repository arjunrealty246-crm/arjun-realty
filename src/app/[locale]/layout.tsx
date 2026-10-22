import { notFound } from "next/navigation";
import { locales, localeMeta, Locale, isLocale, defaultLocale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleContext";

export function generateStaticParams() {
  // English stays at the root (unchanged URLs). Only non-default locales are
  // served under a prefix.
  return locales
    .filter((l) => l !== defaultLocale)
    .map((locale) => ({ locale }));
}

// Only the locales produced by generateStaticParams exist. Any other first
// path segment (e.g. /xx, /fr) must be a genuine HTTP 404 rather than being
// swallowed by this dynamic segment. Because the [locale] subtree streams
// (there is a root loading.tsx), a notFound() thrown inside the layout would
// otherwise be delivered with a 200 status.
export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();

  const typedLocale = locale as Locale;
  const { htmlLang } = localeMeta[typedLocale];

  return (
    <LocaleProvider locale={typedLocale}>
      {/* Sets the correct HTML lang immediately, without making routes dynamic. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(htmlLang)};`,
        }}
      />
      {children}
    </LocaleProvider>
  );
}
