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
  const localeKey = locale as Locale;
  const title = localeKey === "te" ? "అర్జున్ రియల్టీ | హైదరాబాద్లో ఆమోదిత ప్లాట్లు" : localeKey === "hi" ? "अर्जुन रियल्टी | हैदराबाद में स्वीकृत प्लॉट" : seo.home.title;
  const description = localeKey === "te" ? "హైదరాబాద్ అంతటా ధృవీకరించిన HMDA, DTCP, RERA ఆమోదిత ప్రాజెక్టులను పెట్టుబడిదారులు కనుగొనడంలో స్వతంత్ర రియల్ ఎస్టేట్ సలహాదారు." : localeKey === "hi" ? "हैदराबाद भर में सत्यापित HMDA, DTCP और RERA स्वीकृत परियोजनाएं खोजने में निवेशकों की मदद करने वाला स्वतंत्र रियल एस्टेट सलाहकार।" : seo.home.description;
  return buildLocalizedMetadata({
    locale: localeKey,
    path: "/",
    title,
    description,
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
  return <HomePage locale={locale as Locale} heroContent={getPageContent("home", locale as Locale)} />;
}
