import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, Locale, nonDefaultLocales } from "@/i18n/config";
import { withLocaleAlternates } from "@/i18n/metadata";
import { projects } from "@/data/projects";
import EnglishProjectPage, {
  generateMetadata as englishProjectMetadata,
} from "@/app/projects/[slug]/page";

// Project detail pages are backed by admin-editable content in MongoDB, but the
// set of valid slugs is fixed by the static project registry (admin edits only
// override content for existing slugs and can never introduce a new slug). This
// lets us enumerate every valid localized project URL at build time and reject
// anything else at the routing level, producing a genuine HTTP 404 instead of a
// streamed soft-404.
export const dynamicParams = false;

export function generateStaticParams() {
  return nonDefaultLocales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export default async function LocalizedProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <EnglishProjectPage params={params} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  const base = await englishProjectMetadata({ params: Promise.resolve({ slug }) });
  return withLocaleAlternates(base, locale as Locale, `/projects/${slug}`);
}
