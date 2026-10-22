import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, Locale, defaultLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";
import { getPageContent } from "@/i18n/content";
import { seo } from "@/data/seo";
import HomePage from "@/app/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return buildLocalizedMetadata({
    locale: locale as Locale,
    path: "/",
    title: seo.home.title,
    description: seo.home.description,
    keywords: seo.home.keywords,
  });
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <HomePage heroContent={getPageContent("home", locale as Locale)} />;
}
