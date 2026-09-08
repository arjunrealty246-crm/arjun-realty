"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { ArrowRight, MapPin, ShieldCheck, Route, Building2, Phone, Landmark, Gauge, CalendarCheck } from "lucide-react";
import SiteVisitModal from "@/components/SiteVisitModal";
import TrustIndicators from "@/components/TrustIndicators";
import siteConfig from "@/config/site";
import { getProjectBySlug } from "@/data/projects";
import type { Project } from "@/data/projects";
import { getProjectHref } from "@/lib/project-links";
import { trackEvent } from "@/lib/analytics";

const whyPoints = [
  {
    icon: Gauge,
    title: "The ORR Has Equalized Commute Times",
    desc: "The Outer Ring Road (ORR) has matured into a defended address of its own. Buyers who once looked only at Gachibowli and HITEC City now compare Kannur, Kollur, Mokila and Shankarpally against the Inner Ring, because the ORR has equalized commute times to the IT and financial districts.",
  },
  {
    icon: Landmark,
    title: "A Balance of Connectivity & Entry Points",
    desc: "The Inner Ring offers premium pricing and limited inventory, while the ORR ring offers institutional-grade connectivity, satellite-town amenities and better entry points — the balance most investors look for.",
  },
  {
    icon: Route,
    title: "Exits Anchor the Growth Corridors",
    desc: "Arjun Realty&apos;s projects sit across key ORR nodes — close to ORR Exit No. 13, 8 minutes from ORR Exit 14, and via the four-lane expressway from ORR Exit No. 18 — each connected to a fast-appreciating corridor.",
  },
];

const orrProjects: { slug: string; fact: string }[] = [
  { slug: "jb-harmony-woods", fact: "Just 8 minutes from ORR Exit 14 in the FCDA-approved Future City growth corridor." },
  { slug: "jb-serene-county", fact: "Close to ORR Exit No. 13 near Kongarakalan along the Tata Greenfield Growth Corridor." },
  { slug: "jb-pristine-city", fact: "Via the four-lane expressway from ORR Exit No. 18 (Appa Junction) to Vikarabad." },
  { slug: "jb-serene-city", fact: "Highway-facing township with excellent connectivity to the ORR, the airport and the IT corridor." },
  { slug: "upcoming-shankarpally", fact: "Upcoming 108-acre open plotting community with excellent connectivity to the ORR." },
];

const faqs = [
  { q: "Why consider plots near the Hyderabad ORR?", a: "The Outer Ring Road has equalized commute times to Hyderabad's IT and financial districts, so buyers now compare ORR-ring areas like Kannur, Kollur, Mokila and Shankarpally against Inner Ring locations. The ORR ring offers institutional-grade connectivity with generally better entry points." },
  { q: "Which Arjun Realty projects are near the ORR?", a: "JB Harmony Woods (8 minutes from ORR Exit 14), JB Serene County (close to ORR Exit No. 13), JB Pristine City (via expressway from ORR Exit No. 18), JB Serene City (excellent ORR connectivity) and an upcoming 108-acre community in West Hyderabad with excellent ORR connectivity." },
  { q: "Are ORR-area plots approved?", a: "Yes, the ORR-connected projects listed are verified approved — including FCDA, HMDA, TSRERA and DTCP & RERA approvals depending on the project. Each project page shows its specific approval status." },
  { q: "What types of projects sit along the ORR?", a: "The ORR ring includes large gated townships, villa communities, private plot communities and open plotting communities — spanning the west, west-North and south corridors of Hyderabad." },
];

export default function OrrPage() {
  const featured = orrProjects
    .map(({ slug, fact }) => ({ p: getProjectBySlug(slug), fact }))
    .filter((x): x is { p: Project; fact: string } => Boolean(x.p));
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <PageBreadcrumbs items={[{ name: "ORR", url: "/orr" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Outer Ring Road · Hyderabad</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Plots Near Hyderabad <span className="text-gradient">ORR</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              The Outer Ring Road has turned Hyderabad&apos;s growth corridors into a single,
              well-connected market. Discover verified approved plots and gated communities
              anchored around key ORR exits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "Explore Projects - ORR" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Explore All ORR-Near Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in plots near the ORR growth corridor. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - ORR" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - ORR" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <button
                onClick={() => {
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - ORR" });
                  setSiteVisitOpen(true);
                }}
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <CalendarCheck className="h-4 w-4" /> Book Free Site Visit
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TrustIndicators />

      {/* Why ORR */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>Why the ORR Ring</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              Hyderabad&apos;s ORR Connects <span className="text-gradient">Its Growth Corridors</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyPoints.map((d, i) => {
              const Icon = d.icon;
              return (
                <ScrollReveal key={d.title} delay={i * 0.08}>
                  <div className="glass-card rounded-2xl p-7 h-full">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{d.title}</h3>
                    <p className="text-[13px] text-white/35 leading-relaxed">{d.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ORR-connected projects */}
      {featured.length > 0 && (
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal className="max-w-3xl mb-12">
              <SectionLabel>ORR-Near Projects</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
                Approved Plots Across <span className="text-gradient">ORR Nodes</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(({ p, fact }) => (
                <ScrollReveal key={p.slug}>
                  <Link href={getProjectHref(p.slug)} className="block group h-full">
                    <div className="glass-card rounded-[1.25rem] p-7 h-full">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">{p.name}</p>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider mt-1.5">
                            <ShieldCheck className="h-3 w-3" /> {p.approval}
                          </span>
                        </div>
                      </div>
                      <p className="text-[13px] text-white/45 leading-relaxed mb-3">{fact}</p>
                      <p className="text-[12px] text-white/30 leading-relaxed line-clamp-3 mb-4">{p.description}</p>
                      <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                        View Project <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal>
              <div className="mt-8 text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2.5 btn-glass px-8 py-4 rounded-full text-[13px] font-semibold text-white/80"
                >
                  Browse All Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Related insights */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-10">
            <SectionLabel>Market Intelligence</SectionLabel>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.02em]">
              Insights on the <span className="text-gradient">ORR &amp; Growth Rings</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal>
              <Link href="/insights/hyderabad-real-estate-market-update-q3-2026" className="block group h-full">
                <div className="glass-card rounded-2xl p-7 h-full">
                  <SectionLabel>Market Update</SectionLabel>
                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    Hyderabad Real Estate Market Update — Q3 2026
                  </h3>
                  <p className="mt-3 text-[13px] text-white/35 leading-relaxed">
                    How demand has shifted toward the ORR rings and the balance the ORR ring offers investors.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    Read Insight <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/insights/kokapet-neopolis-the-corporate-hub-effect" className="block group h-full">
                <div className="glass-card rounded-2xl p-7 h-full">
                  <SectionLabel>Insight</SectionLabel>
                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    Kokapet &amp; Neopolis: The Corporate Hub Effect
                  </h3>
                  <p className="mt-3 text-[13px] text-white/35 leading-relaxed">
                    How the corporate hub effect radiates outward along the ORR toward Gandipet, Mokila and beyond.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    Read Insight <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/insights/dtcp-hmda-fcda-approvals-which-to-choose" className="block group h-full">
                <div className="glass-card rounded-2xl p-7 h-full">
                  <SectionLabel>Buyer Guide</SectionLabel>
                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    DTCP, HMDA &amp; FCDA Approvals: Which to Choose
                  </h3>
                  <p className="mt-3 text-[13px] text-white/35 leading-relaxed">
                    Why HMDA is often chosen for ORR-ring and core-ring plots, and how to compare the authorities.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    Read Guide <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal className="text-center mb-12">
            <SectionLabel>Frequently Asked</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
              Hyderabad ORR <span className="text-gradient">FAQs</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-[14px] font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Find Your Plot Near the Hyderabad ORR</h2>
            <p className="text-white/35 mb-8 text-[14px]">
              Get a free consultation and site-visit assistance for verified approved
              layouts around the Outer Ring Road. Confirm approvals, titles and pricing with Arjun Realty.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/schedule-site-visit"
                onClick={() =>
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - ORR" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Book Free Site Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in plots near the ORR growth corridor. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - ORR - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - ORR - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <SiteVisitModal isOpen={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} projectName="ORR" />
    </>
  );
}
