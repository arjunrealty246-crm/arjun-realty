import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, Locale, defaultLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";
import { seo } from "@/data/seo";
import EnglishPage from "@/app/insights/page";

const meta = seo["insights"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return buildLocalizedMetadata({
    locale: locale as Locale,
    path: "/insights",
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default async function LocalizedPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <EnglishPage searchParams={searchParams} />;
}
