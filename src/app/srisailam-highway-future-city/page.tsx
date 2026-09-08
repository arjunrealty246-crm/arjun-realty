"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { ArrowRight, MapPin, ShieldCheck, Route, Building2, Phone, Landmark, Factory, CalendarCheck } from "lucide-react";
import SiteVisitModal from "@/components/SiteVisitModal";
import TrustIndicators from "@/components/TrustIndicators";
import siteConfig from "@/config/site";
import { getProjectBySlug } from "@/data/projects";
import type { Project } from "@/data/projects";
import { getProjectHref } from "@/lib/project-links";
import { trackEvent } from "@/lib/analytics";

const whyPoints = [
  {
    icon: Route,
    title: "Highway-Facing Corridor",
    desc: "The Srisailam Highway runs through the Future City growth corridor in South-West Hyderabad, minutes from the Rajiv Gandhi International Airport. It offers highway-facing frontage for large gated residential communities.",
  },
  {
    icon: Landmark,
    title: "FCDA-Approved Growth Corridor",
    desc: "FCDA (Future City Development Authority) approves layouts in the Future City growth corridor around the airport and the Srisailam axis — one of the three main layout-approval authorities in Telangana alongside HMDA and DTCP.",
  },
  {
    icon: Factory,
    title: "Electronics & AI Anchor Belt",
    desc: "The corridor is anchored by Future City, AI City, Foxconn and Kaynes Technology, with an electronics and mobility cluster forming between the airport and the Srisailam axis that is bringing housing demand to the belt.",
  },
];

const localLandmarks = [
  "Srisailam Highway",
  "Future City / AI City & AI Skill University",
  "Foxconn",
  "Kaynes Technology",
  "FCDA Headquarters",
  "ORR Exit 14",
  "Rajiv Gandhi International Airport",
];

const faqs = [
  { q: "What kind of plots are available on Srisailam Highway?", a: "The corridor offers FCDA approved premium villa communities such as JB Harmony Woods — a 53-acre gated community with villa plots — as well as an upcoming 200-acre highway-facing gated residential township on Srisailam Highway whose DTCP & RERA approvals are under process." },
  { q: "Is JB Harmony Woods approved?", a: "Yes. JB Harmony Woods is one of the first FCDA approved premium villa plotting projects in the Future City growth corridor." },
  { q: "Where is the upcoming Srisailam Highway project located?", a: "The upcoming project spans 200 acres on Srisailam Highway, Hyderabad, with highway-facing frontage and is planned as a large-scale integrated gated residential township." },
  { q: "What is the Future City growth corridor?", a: "The Future City growth corridor is the area around the airport and the Srisailam axis where FCDA (Future City Development Authority) approves new layouts, anchored by Future City, AI City, Foxconn and a growing electronics cluster." },
  { q: "What does the Srisailam Highway corridor offer for investors?", a: "The corridor offers FCDA approved premium villa communities such as JB Harmony Woods, plus upcoming highway-facing gated townships, anchored by Future City, AI City and an electronics cluster near the airport." },
];

export default function SrisailamHighwayFutureCityPage() {
  const harmonyWoods = getProjectBySlug("jb-harmony-woods");
  const upcoming = getProjectBySlug("upcoming-srisailam-highway");

  const feats = [harmonyWoods, upcoming].filter((p): p is Project => Boolean(p));
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
      <PageBreadcrumbs items={[{ name: "Srisailam Highway & Future City", url: "/srisailam-highway-future-city" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Srisailam Highway · Future City Growth Corridor</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Srisailam Highway &amp; <span className="text-gradient">Future City Plots</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              One of South-West Hyderabad&apos;s fastest-moving corridors — minutes
              from the airport and anchored by Future City, AI City and a growing
              electronics belt along the Srisailam Highway.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={harmonyWoods ? getProjectHref(harmonyWoods.slug) : "/projects"}
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "Explore Projects - Srisailam Highway" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Explore Srisailam Highway Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in plots near Srisailam Highway / Future City. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - Srisailam Highway" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Srisailam Highway" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <button
                onClick={() => {
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - Srisailam Highway" });
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

      {/* Why Srisailam Highway / Future City */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>Why the Corridor</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              The <span className="text-gradient">Future City Growth Corridor</span> on Srisailam Highway
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] text-white/40 leading-relaxed">
              Srisailam Highway runs through South Hyderabad&apos;s Future City growth corridor, minutes from
              the Rajiv Gandhi International Airport. It connects buyers and investors to FCDA-approved
              communities, the upcoming AI City and the electronics belt anchoring the region&apos;s housing demand.
            </p>
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

      {/* Featured projects */}
      {feats.length > 0 && (
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal className="max-w-3xl mb-12">
              <SectionLabel>Projects on Srisailam Highway</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
                Approved Plots &amp; <span className="text-gradient">Communities</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feats.map((p) => (
                <ScrollReveal key={p.slug}>
                  <Link href={getProjectHref(p.slug)} className="block group h-full">
                    <div className="glass-card rounded-[1.25rem] p-7 md:p-8 h-full">
                      <div className="flex flex-wrap items-start gap-4 justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-base font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">{p.name}</p>
                            <p className="text-[11px] text-white/35">{p.location}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider">
                          <ShieldCheck className="h-3 w-3" /> {p.approval}
                        </span>
                      </div>
                      <p className="text-[13px] text-white/40 leading-relaxed mb-5 line-clamp-3">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-[11px] text-white/50 border border-white/[0.04]">{p.projectArea}</span>
                        {p.startingPrice && p.startingPrice !== "Coming Soon" && (
                          <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-[11px] text-white/50 border border-white/[0.04]">From {p.startingPrice}</span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                        View Project <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Landmarks & connectivity */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-12">
            <SectionLabel>Landmarks &amp; Connectivity</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] mb-4">
              What&apos;s Around <span className="text-gradient">Srisailam Highway</span>
            </h2>
            <p className="text-[14px] text-white/35 leading-relaxed">
              JB Harmony Woods is positioned 2 minutes from Srisailam Highway, 5 minutes
              from Future City, 8 minutes from ORR Exit 14 and 15 minutes from Rajiv
              Gandhi International Airport — surrounded by the corridor&apos;s key anchors.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-white tracking-tight">Along the Corridor</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {localLandmarks.map((l) => (
                  <div key={l} className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.04] px-4 py-3.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                    <span className="text-[13px] text-white/45 leading-relaxed">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Investing on the corridor */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal>
            <SectionLabel>Investment View</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-tight">
              Investing on the Srisailam Highway, South Hyderabad
            </h2>
            <p className="mt-5 text-[15px] text-white/40 leading-relaxed">
              The Srisailam Highway corridor brings together three investment drivers: approved
              authority-sanctioned layouts, proximity to the airport, and a growing electronics and
              AI cluster.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.04] px-4 py-3.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                <span className="text-[14px] text-white/45 leading-relaxed">
                  Approved layouts — FCDA approves layouts in the Future City growth corridor around the
                  airport and the Srisailam axis, alongside HMDA and DTCP.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.04] px-4 py-3.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                <span className="text-[14px] text-white/45 leading-relaxed">
                  Airport proximity — the corridor sits minutes from the Rajiv Gandhi International
                  Airport, a key node for both end-use and investment buyers.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.04] px-4 py-3.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                <span className="text-[14px] text-white/45 leading-relaxed">
                  Anchor belt — Future City, AI City, Foxconn and Kaynes Technology anchor an
                  electronics and mobility cluster forming between the airport and the Srisailam axis.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-[15px] text-white/40 leading-relaxed">
              Arjun Realty presents FCDA-approved JB Harmony Woods and an upcoming 200-acre
              highway-facing gated township on this page — open to site visits and document
              verification. Book a free site visit below to explore the corridor with our team.
            </p>
            <Link
              href="/schedule-site-visit"
              className="mt-7 inline-flex items-center gap-2 border border-primary/30 text-primary px-6 py-3 rounded-full text-[13px] font-semibold hover:bg-primary/10 transition-colors"
            >
              Book a Free Site Visit <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Related insights */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-10">
            <SectionLabel>Market Intelligence</SectionLabel>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.02em]">
              Insights on the <span className="text-gradient">Srisailam &amp; Future City Belt</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal>
              <Link href="/insights/future-city-growth-corridor-whats-driving-land-values" className="block group h-full">
                <div className="glass-card rounded-2xl p-7 h-full">
                  <SectionLabel>Insight</SectionLabel>
                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    The Future City Growth Corridor: What&apos;s Driving Land Values
                  </h3>
                  <p className="mt-3 text-[13px] text-white/35 leading-relaxed">
                    FCDA approval, airport proximity and the electronics belt converging on the Srisailam Highway.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    Read Insight <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/insights/foxconn-ai-city-and-the-srisailam-belt" className="block group h-full">
                <div className="glass-card rounded-2xl p-7 h-full">
                  <SectionLabel>Insight</SectionLabel>
                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    Foxconn, AI City &amp; the Srisailam Belt
                  </h3>
                  <p className="mt-3 text-[13px] text-white/35 leading-relaxed">
                    How multi-billion-dollar campuses are reshaping Hyderabad&apos;s south-west along the Srisailam axis.
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
                    Understanding the three layout-approval authorities — including FCDA in the Future City corridor.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    Read Guide <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/insights/hyderabad-real-estate-market-update-q3-2026" className="block group h-full">
                <div className="glass-card rounded-2xl p-7 h-full">
                  <SectionLabel>Market Update</SectionLabel>
                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    Hyderabad Real Estate Market Update — Q3 2026
                  </h3>
                  <p className="mt-3 text-[13px] text-white/35 leading-relaxed">
                    Transaction velocity across corridors including the Srisailam Highway belt.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    Read Insight <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal className="text-center mb-12">
            <SectionLabel>Frequently Asked</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
              Srisailam Highway &amp; Future City <span className="text-gradient">FAQs</span>
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
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Explore Srisailam Highway &amp; Future City Plots</h2>
            <p className="text-white/35 mb-8 text-[14px]">
              Get a free consultation and site-visit assistance for approved layouts on
              the Srisailam Highway. Verify approvals, titles and prices with Arjun Realty.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/schedule-site-visit"
                onClick={() =>
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - Srisailam Highway" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Book Free Site Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in plots near Srisailam Highway / Future City. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - Srisailam Highway - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Srisailam Highway - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <SiteVisitModal isOpen={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} projectName="Srisailam Highway / Future City" />
    </>
  );
}
