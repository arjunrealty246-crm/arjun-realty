import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock3, Newspaper, TrendingUp, Building2, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import siteConfig from "@/config/site";
import {
  insightCategories,
  getInsightsByCategory,
  getReadingMinutes,
  formatInsightDate,
  type InsightCategorySlug,
} from "@/data/insights";

export const dynamicParams = false;

const categorySeo: Record<InsightCategorySlug, { title: string }> = {
  "market-updates": { title: "Hyderabad Plot Market Updates & Trends" },
  "corporate-growth": { title: "Hyderabad Corporate Growth & Land Values" },
  "buyer-guides": { title: "Hyderabad Plot Buyer Guides & Checklists" },
};

const categoryIcons: Record<InsightCategorySlug, typeof TrendingUp> = {
  "market-updates": TrendingUp,
  "corporate-growth": Building2,
  "buyer-guides": ShieldCheck,
};

function getCategory(slug: string) {
  return insightCategories.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return insightCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { robots: { index: false, follow: false } };

  const baseTitle = categorySeo[category.slug].title;
  let title = `${baseTitle} | Arjun Realty`;
  if (title.length > 60) {
    const maxBase = 60 - " | Arjun Realty".length - 1;
    title = `${baseTitle.slice(0, maxBase).replace(/\s+\S*$/, "")}… | Arjun Realty`;
  }

  const description = category.description;
  const url = `${siteConfig.url}/insights/category/${category.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: `${siteConfig.url}/og-image.png`, width: 1200, height: 630, alt: `${baseTitle} — Arjun Realty Insights` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/og-image.png`],
    },
  };
}

export default async function InsightCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const Icon = categoryIcons[category.slug];
  const articles = [...getInsightsByCategory(category.slug)].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const pageUrl = `${siteConfig.url}/insights/category/${category.slug}`;
  const seoTitle = categorySeo[category.slug].title;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seoTitle,
    url: pageUrl,
    description: category.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `${siteConfig.url}/insights/${article.slug}`,
        description: article.excerpt,
      })),
    },
  };

  return (
    <>
      <PageBreadcrumbs
        showNav
        items={[
          { name: "Insights & Market Updates", url: "/insights" },
          { name: category.label, url: `/insights/category/${category.slug}` },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Hero */}
      <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-10 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>{category.label}</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,3.6rem)] font-bold tracking-[-0.03em] leading-[1.08]">
              {category.label} <span className="text-gradient">in Hyderabad</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              {category.description} {articles.length} articles in this series, newest first.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors duration-300 border text-white/45 border-white/10 hover:text-white/70 hover:border-primary/40"
              >
                <Newspaper className="h-3.5 w-3.5" /> All Insights
              </Link>
              {insightCategories.map((cat) => {
                const CatIcon = categoryIcons[cat.slug];
                const isActive = cat.slug === category.slug;
                return (
                  <Link
                    key={cat.slug}
                    href={`/insights/category/${cat.slug}`}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors duration-300 border ${
                      isActive
                        ? "text-white bg-primary/15 border-primary/40 glow-primary-strong"
                        : "text-white/45 border-white/10 hover:text-white/70 hover:border-primary/40"
                    }`}
                  >
                    <CatIcon className="h-3.5 w-3.5" /> {cat.label}
                  </Link>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="mb-7">
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.02em]">
              All <span className="text-gradient">{category.label}</span> Articles
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.06}>
                <Link href={`/insights/${article.slug}`} className="block h-full">
                  <article className="glass-card rounded-2xl p-6 flex flex-col h-full group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        <Icon className="h-3 w-3" /> {article.category}
                      </span>
                      <span className="text-[11px] text-white/35">{getReadingMinutes(article)} min read</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-white/35 mb-3">
                      <CalendarDays className="h-3 w-3 text-primary/60" /> {formatInsightDate(article.publishedAt)}
                    </div>
                    <h3 className="text-[1.15rem] font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-primary transition-colors duration-500">
                      {article.title}
                    </h3>
                    <p className="text-[13px] text-white/35 leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
                      Read Article <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <p className="text-white/45 text-sm leading-relaxed max-w-xl">
                Every article here is researched against the same due-diligence standard we apply to listed land.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[13px] font-semibold text-white/70 border border-white/10 hover:border-primary/50 transition-colors"
                >
                  All Insights
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-6 py-3 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
                >
                  View Verified Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
