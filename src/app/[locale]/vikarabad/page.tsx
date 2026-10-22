import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, Locale, defaultLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";
import { seo } from "@/data/seo";
import EnglishPage from "@/app/vikarabad/page";

const meta = seo["vikarabad"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return buildLocalizedMetadata({
    locale: locale as Locale,
    path: "/vikarabad",
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <EnglishPage />;
}
