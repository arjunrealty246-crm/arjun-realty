import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, Locale, nonDefaultLocales } from "@/i18n/config";
import { withLocaleAlternates } from "@/i18n/metadata";
import EnglishCategoryPage, {
  generateMetadata as englishCategoryMetadata,
  generateStaticParams as englishCategoryStaticParams,
} from "@/app/insights/category/[slug]/page";

export function generateStaticParams() {
  const slugs = englishCategoryStaticParams();
  return nonDefaultLocales.flatMap((locale) => slugs.map((s) => ({ locale, ...s })));
}

export default async function LocalizedCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <EnglishCategoryPage params={params} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  const base = await englishCategoryMetadata({ params: Promise.resolve({ slug }) });
  return withLocaleAlternates(base, locale as Locale, `/insights/category/${slug}`);
}
