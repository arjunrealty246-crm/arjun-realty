import Link from "next/link";
import { CalendarDays, Clock3, ArrowRight, Newspaper, TrendingUp, Building2, ShieldCheck, MessageCircle, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import siteConfig from "@/config/site";
import {
  insights,
  insightCategories,
  getInsightsByCategory,
  getReadingMinutes,
  formatInsightDate,
  type InsightCategorySlug,
} from "@/data/insights";

const validCategories: InsightCategorySlug[] = insightCategories.map((c) => c.slug);

const categoryMeta: Record<InsightCategorySlug, { label: string; icon: typeof TrendingUp; blurb: string }> = {
  "market-updates": { label: "Market Updates", icon: TrendingUp, blurb: "Prices, corridors and demand trends" },
  "corporate-growth": { label: "Corporate Investments & Growth", icon: Building2, blurb: "Campuses, plants and how they move land" },
  "buyer-guides": { label: "Buyer Guides", icon: ShieldCheck, blurb: "Approvals, documents and due diligence" },
};

export default async function InsightsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const rawCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const activeCategory: InsightCategorySlug | undefined = rawCategory && validCategories.includes(rawCategory as InsightCategorySlug)
    ? (rawCategory as InsightCategorySlug)
    : undefined;

  const filtered = activeCategory ? getInsightsByCategory(activeCategory) : insights;

  return (
    <>
      <PageBreadcrumbs items={[{ name: "Insights & Market Updates", url: "/insights" }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Hyderabad Real Estate Insights & Market Updates",
            url: `${siteConfig.url}/insights`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: filtered.map((article, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: article.title,
                url: `${siteConfig.url}/insights/${article.slug}`,
                description: article.excerpt,
              })),
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Resource Hub</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,3.6rem)] font-bold tracking-[-0.03em] leading-[1.08]">
              Hyderabad Real Estate <span className="text-gradient">Insights &amp; Market Updates</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              Corridor analysis, corporate investment signals and step-by-step buyer guides — researched by Arjun Realty
              for investors who verify before they invest.
            </p>
            <div className="mt-8 flex items-center gap-5 text-[13px] text-white/35">
              <span className="inline-flex items-center gap-2.5">
                <Newspaper className="h-4 w-4 text-primary" /> {insights.length} Articles
              </span>
              <span className="inline-flex items-center gap-2.5">
                <TrendingUp className="h-4 w-4 text-primary" /> Updated {formatInsightDate(insights[0].publishedAt)}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Category filters */}
      <section className="pb-4">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/insights"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors duration-300 border ${
                activeCategory
                  ? "text-white/45 border-white/10 hover:text-white/70 hover:border-primary/40"
                  : "text-white bg-primary/15 border-primary/40 glow-primary-strong"
              }`}
            >
              All
            </Link>
            {insightCategories.map((cat) => {
              const Icon = categoryMeta[cat.slug].icon;
              const isActive = cat.slug === activeCategory;
              return (
                <Link
                  key={cat.slug}
                  href={`/insights?category=${cat.slug}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors duration-300 border ${
                    isActive
                      ? "text-white bg-primary/15 border-primary/40 glow-primary-strong"
                      : "text-white/45 border-white/10 hover:text-white/70 hover:border-primary/40"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" /> {cat.label}
                </Link>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-white/30 max-w-xl">
            {activeCategory ? categoryMeta[activeCategory]?.blurb : "Filter by topic — or read them all to build a complete Hyderabad investment thesis."}
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article, i) => {
              const Icon = categoryMeta[article.categorySlug]?.icon ?? Newspaper;
              return (
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
                      <h2 className="text-[1.15rem] font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-primary transition-colors duration-500">
                        {article.title}
                      </h2>
                      <p className="text-[13px] text-white/35 leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>
                      <span className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
                        Read Article <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </article>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured projects CTA */}
      <section className="py-16 lg:py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="rounded-3xl p-8 lg:p-12 border border-primary/20 bg-gradient-to-br from-primary/[0.08] to-transparent grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <SectionLabel>Put It Into Practice</SectionLabel>
                <h2 className="mt-5 text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold tracking-[-0.02em] leading-[1.15]">
                  Explore Verified <span className="text-gradient">Growth-Corridor Projects</span>
                </h2>
                <p className="mt-4 text-white/40 text-sm sm:text-base leading-relaxed max-w-lg">
                  Every project we recommend clears the full due-diligence checklist — linked title, 30-year EC, Dharani
                  matches and valid HMDA, DTCP, FCDA or RERA approvals.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/projects" className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-6 py-3 rounded-full text-[13px] font-semibold text-white glow-primary-strong">
                    View Verified Projects <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/guides/telangana-plot-buyer-checklist" className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[13px] font-semibold text-white/70 border border-white/10 hover:border-primary/50 transition-colors">
                    <ShieldCheck className="h-4 w-4" /> Plot Buyer Guide
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "JB Harmony Woods", loc: "Thummaloor, Srisailam Highway", tag: "FCDA Approved" },
                  { name: "JB Pristine City", loc: "Vikarabad, West Hyderabad", tag: "DTCP & RERA Approved" },
                ].map((p) => (
                  <Link key={p.name} href={`/projects/${p.name.toLowerCase().replaceAll(" ", "-")}`} className="glass-card-elevated rounded-2xl p-5 flex items-center gap-4 group">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-bold text-white group-hover:text-primary transition-colors duration-300">{p.name}</p>
                      <p className="text-xs text-white/35 truncate">{p.loc}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">{p.tag}</span>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <SectionLabel>Need a Second Opinion?</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em]">
                Turn Research Into a <span className="text-gradient">Concrete Plan</span>
              </h2>
              <p className="mt-4 text-white/40 text-sm sm:text-base leading-relaxed">
                Discuss any corridor, article or shortlisted project with an advisor — free consultation, no obligations.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <a
                  href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I read your Insights page and would like to discuss investing in Hyderabad.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp {siteConfig.contact.phone}
                </a>
                <a href={siteConfig.links.tel} className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[13px] font-semibold text-white/70 border border-white/10 hover:border-primary/50 transition-colors">
                  <Clock3 className="h-4 w-4" /> Call Now
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}