import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, Locale, nonDefaultLocales } from "@/i18n/config";
import { withLocaleAlternates } from "@/i18n/metadata";
import EnglishBuilderPage, {
  generateMetadata as englishBuilderMetadata,
  generateStaticParams as englishBuilderStaticParams,
} from "@/app/builders/[slug]/page";

export function generateStaticParams() {
  const slugs = englishBuilderStaticParams();
  return nonDefaultLocales.flatMap((locale) => slugs.map((s) => ({ locale, ...s })));
}

export default async function LocalizedBuilderPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <EnglishBuilderPage params={params} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  const base = await englishBuilderMetadata({ params: Promise.resolve({ slug }) });
  return withLocaleAlternates(base, locale as Locale, `/builders/${slug}`);
}
