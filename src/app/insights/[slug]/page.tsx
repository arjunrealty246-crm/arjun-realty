import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, ArrowRight, MessageCircle, Phone, MapPin, ShieldCheck, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import siteConfig from "@/config/site";
import { getProjectBySlug } from "@/data/projects";
import { getProjectHref } from "@/lib/project-links";
import {
  insights,
  getInsightBySlug,
  getRelatedInsights,
  getReadingMinutes,
  formatInsightDate,
} from "@/data/insights";

// Minimal, safe inline-link renderer for insight body paragraphs. Only an
// explicit `[text](/internal-path)` token becomes a link; every other paragraph
// (and any unmatched text) renders as plain text exactly as before. This keeps
// the change surgical and backward-compatible with all existing article content.
const INLINE_LINK = /\[([^\]]+)\]\(\/([^)]*)\)/;

function renderBodyParagraph(text: string) {
  const match = text.match(INLINE_LINK);
  if (!match) return text;
  const [full, label, path] = match;
  const before = text.slice(0, text.indexOf(full));
  const after = text.slice(text.indexOf(full) + full.length);
  return (
    <>
      {before}
      <Link
        href={`/${path}`}
        className="text-primary font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
      >
        {label}
      </Link>
      {after}
    </>
  );
}

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { robots: { index: false, follow: false } };

  const baseTitle = insight.seoTitle || insight.title;
  let title = `${baseTitle} | Arjun Realty`;
  if (title.length > 60) {
    const maxBase = 60 - " | Arjun Realty".length - 1;
    title = `${baseTitle.slice(0, maxBase).replace(/\s+\S*$/, "")}… | Arjun Realty`;
  }

  const description = insight.metaDescription
    ? insight.metaDescription
    : insight.excerpt.length > 160
    ? `${insight.excerpt.slice(0, 157).replace(/\s+\S*$/, "")}...`
    : insight.excerpt;

  const shareImage = insight.image
    ? `${siteConfig.url}${insight.image}`
    : `${siteConfig.url}/og-image.png`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${siteConfig.url}/insights/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/insights/${slug}`,
      type: "article",
      publishedTime: insight.publishedAt,
      authors: [insight.author.name],
      siteName: siteConfig.name,
      images: [{ url: shareImage, width: 1200, height: 630, alt: `${insight.title} — Arjun Realty Insights` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const pageUrl = `${siteConfig.url}/insights/${slug}`;
  const readingMinutes = getReadingMinutes(insight);
  const related = getRelatedInsights(insight, 3);
  const shareImage = insight.image
    ? `${siteConfig.url}${insight.image}`
    : `${siteConfig.url}/og-image.png`;
  const sectionNumbers: number[] = [];
  let headingsSeen = 0;
  for (const section of insight.sections) {
    if (section.heading) headingsSeen += 1;
    sectionNumbers.push(headingsSeen);
  }
  const featuredProjects = (insight.featuredProjectSlugs ?? [])
    .map((s) => getProjectBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const authorInitials = insight.author.name
    .split(/\s+/)
    .map((w) => w?.[0]?.toUpperCase() ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  const waQuery = encodeURIComponent(
    `Hi Arjun Realty, I read "${insight.title}". I would like to discuss investing in this growth zone and schedule a site visit.`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: insight.title,
            description: insight.excerpt,
            datePublished: insight.publishedAt,
            dateModified: insight.publishedAt,
            wordCount: Math.round(
              [insight.title, insight.excerpt, ...insight.sections.flatMap((s) => s.body)].join(" ").split(/\s+/).filter(Boolean).length
            ),
            mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
            image: shareImage,
            author: { "@type": "Person", name: insight.author.name, url: `${siteConfig.url}/about` },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: { "@type": "ImageObject", url: `${siteConfig.url}/og-image.png` },
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <article className="max-w-3xl">
            <PageBreadcrumbs
              showNav
              items={[
                { name: "Insights", url: "/insights" },
                { name: insight.title, url: pageUrl },
              ]}
            />
            <ScrollReveal>
              <Link
                href={`/insights?category=${insight.categorySlug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider hover:bg-primary/15 transition-colors"
              >
                {insight.category}
              </Link>
              <h1 className="mt-6 text-[clamp(1.9rem,4.5vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.12]">
                <span className="text-gradient">{insight.title}</span>
              </h1>
              <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed">{insight.excerpt}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/35">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                    {authorInitials}
                  </div>
                  <div className="leading-tight">
                    <p className="text-white/70 font-semibold">{insight.author.name}</p>
                    <p className="text-[11px] text-white/30">{insight.author.role}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-primary/70" /> {formatInsightDate(insight.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-3.5 w-3.5 text-primary/70" /> {readingMinutes} min read
                </span>
              </div>
              {insight.image ? (
                <div className="mt-8 w-full overflow-hidden rounded-2xl border border-white/[0.06]">
                  <Image
                    src={insight.image}
                    alt={insight.imageAlt || `${insight.title} — Arjun Realty Insights`}
                    width={insight.imageWidth ?? 1200}
                    height={insight.imageHeight ?? 630}
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="h-auto w-full"
                  />
                </div>
              ) : null}
            </ScrollReveal>
          </article>
        </div>
      </section>

      {/* Body */}
      <section className="py-8 lg:py-10">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="space-y-10">
              {insight.sections.map((section, si) => (
                <section key={si}>
                  {section.heading && (
                    <h2 className="text-[clamp(1.3rem,3vw,1.7rem)] font-bold text-white tracking-tight mb-5 flex items-start gap-3">
                      <span className="text-primary font-mono text-[0.8em] pt-1">{String(sectionNumbers[si]).padStart(2, "0")}.</span>
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-5">
                    {section.body.map((paragraph, pi) => (
                      <p key={pi} className="text-[15px] text-white/45 leading-[1.85]">
                        {renderBodyParagraph(paragraph)}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lead CTA banner */}
      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl p-8 lg:p-12 border border-primary/20 bg-gradient-to-br from-primary/[0.1] to-white/[0.02]">
              <div className="ambient-orb w-[400px] h-[400px] bg-primary/[0.07] -right-24 -top-24" />
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <SectionLabel>Ready to Invest in This Growth Zone?</SectionLabel>
                  <h2 className="mt-5 text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em] leading-[1.15]">
                    Interested in Properties in This Growth Zone?{" "}
                    <span className="text-gradient">Schedule a Site Visit</span>
                  </h2>
                  <p className="mt-4 text-white/40 text-sm sm:text-base leading-relaxed">
                    Tour the projects featured in this article, verify documents with our legal desk and get an advisory
                    view on pricing before you commit.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
                  <a
                    href={`${siteConfig.links.wa}?text=${waQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
                  >
                    <MessageCircle className="h-4 w-4" /> Schedule Site Visit
                  </a>
                  <a
                    href={siteConfig.links.tel}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[13px] font-semibold text-white/70 border border-white/10 hover:border-primary/50 transition-colors"
                  >
                    <Phone className="h-4 w-4" /> Call {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <section className="py-14 lg:py-16 bg-section-alt">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal className="max-w-3xl mb-10">
              <SectionLabel>In This Article</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.5rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em]">
                Featured <span className="text-gradient">Projects</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featuredProjects.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 0.1}>
                  <Link href={getProjectHref(p.slug)} className="block h-full">
                    <div className="glass-card-elevated rounded-2xl overflow-hidden group relative h-full">
                      {p.image ? (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={p.image}
                            alt={`${p.name} — ${p.projectType}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/30 to-transparent" />
                          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                            <ShieldCheck className="h-3 w-3" /> {p.approval}
                          </span>
                        </div>
                      ) : null}
                      <div className="p-6">
                        <div className="flex items-center gap-1.5 text-xs text-white/35 mb-2">
                          <MapPin className="h-3.5 w-3.5 text-primary/60 shrink-0" /> {p.location}
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 tracking-tight">
                          {p.name}
                        </h3>
                        <p className="mt-1.5 text-[13px] text-white/35 leading-relaxed line-clamp-2">{p.projectType}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[15px] font-bold text-gradient">{p.startingPrice}</span>
                          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                            Explore <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related articles */}
      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-10">
            <SectionLabel>Keep Reading</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.5rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em]">
              Related <span className="text-gradient">Insights</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.06}>
                <Link href={`/insights/${item.slug}`} className="block h-full">
                  <article className="glass-card rounded-2xl p-6 flex flex-col h-full group">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-3">{item.category}</span>
                    <h3 className="text-[15px] font-bold text-white tracking-tight leading-snug mb-2.5 group-hover:text-primary transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-white/35 leading-relaxed mb-4 line-clamp-2">{item.excerpt}</p>
                    <span className="mt-auto flex items-center gap-3 text-[11px] text-white/35">
                      <span>{formatInsightDate(item.publishedAt)}</span>
                      <span className="h-1 w-1 rounded-full bg-white/20" />
                      <span>{getReadingMinutes(item)} min read</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-auto text-primary transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/insights" className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary hover:gap-3 transition-all">
              View All Insights <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}