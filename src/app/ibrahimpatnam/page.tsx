"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { ArrowRight, MapPin, ShieldCheck, Route, Building2, Phone, Trees, Landmark, CalendarCheck } from "lucide-react";
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
    title: "Highway-Facing Connectivity",
    desc: "Ibrahimpatnam sits on the highway with excellent connectivity to the Outer Ring Road, the airport and Hyderabad's IT corridor. The upcoming township is also very close to Sagar Highway and the Kongara Kalan growth corridor.",
  },
  {
    icon: Landmark,
    title: "Institutional & Industrial Neighbours",
    desc: "The area is surrounded by major government institutions and employers — BDL, BEL, the NSG Campus, the OCTOPUS Training Centre and the Rangareddy District Collectorate — plus the Adibatla Aerospace SEZ, TCS Adibatla Campus and the Foxconn Manufacturing Facility nearby.",
  },
  {
    icon: Trees,
    title: "South Hyderabad's Fast-Growing Corridor",
    desc: "Ibrahimpatnam is one of South Hyderabad's fastest-growing corridors, with large integrated townships and educational institutions (Guru Nanak, Sri Indu and CVR College among them) already anchored around it.",
  },
];

const serenityLandmarks = [
  "BDL (Bharat Dynamics Limited)",
  "BEL (Bharat Electronics Limited)",
  "NSG Campus",
  "OCTOPUS Training Centre",
  "Rangareddy District Collectorate",
  "Guru Nanak University",
  "CVR College of Engineering",
];

const faqs = [
  { q: "What kind of plots are available in Ibrahimpatnam?", a: "Ibrahimpatnam offers HMDA & RERA approved residential plots within large gated townships, including JB Serene City — a 660-acre premium integrated township — and an upcoming 90-acre premium gated villa community whose approval process is currently underway." },
  { q: "Is JB Serene City approved?", a: "Yes. JB Serene City is HMDA Approved and RERA Registered, with over 100 families already residing in the township." },
  { q: "Where is the upcoming Ibrahimpatnam project located?", a: "The upcoming 90-acre gated villa community is positioned very close to Sagar Highway and the Kongara Kalan growth corridor, with proximity to Adibatla Aerospace SEZ, TCS Adibatla Campus and the Foxconn Manufacturing Facility." },
  { q: "How is Ibrahimpatnam connected to Hyderabad?", a: "Ibrahimpatnam is highway-facing with excellent connectivity to the Outer Ring Road, the airport and Hyderabad's IT corridor, and is close to Sagar Highway." },
];

export default function IbrahimpatnamPage() {
  const sereneCity = getProjectBySlug("jb-serene-city");
  const upcoming = getProjectBySlug("upcoming-ibrahimpatnam");
  const hillside = getProjectBySlug("jb-hillside-county");

  const feats = [sereneCity, upcoming].filter((p): p is Project => Boolean(p));
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
      <PageBreadcrumbs items={[{ name: "Ibrahimpatnam", url: "/ibrahimpatnam" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Ibrahimpatnam · South Hyderabad</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Approved Plots in <span className="text-gradient">Ibrahimpatnam</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Ibrahimpatnam is one of South Hyderabad&apos;s fastest-growing
              corridors — highway-facing, near the airport and the IT belt, and
              anchored by major institutions, industries and large approved townships.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={sereneCity ? getProjectHref(sereneCity.slug) : "/projects"}
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "Explore Projects - Ibrahimpatnam" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Explore {sereneCity?.name ?? "Projects"} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in plots in Ibrahimpatnam. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - Ibrahimpatnam" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Ibrahimpatnam" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <button
                onClick={() => {
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - Ibrahimpatnam" });
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

      {/* Why Ibrahimpatnam */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>Why Ibrahimpatnam</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              A Fast-Growing <span className="text-gradient">South Hyderabad Corridor</span>
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

      {/* Featured projects */}
      {feats.length > 0 && (
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal className="max-w-3xl mb-12">
              <SectionLabel>Projects in &amp; around Ibrahimpatnam</SectionLabel>
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

            {hillside && (
              <ScrollReveal>
                <div className="mt-6 glass-card rounded-2xl p-6 text-center">
                  <p className="text-[13px] text-white/40 mb-3">
                    On the Sagar Highway corridor, JB Hillside County offers an HMDA &amp; RERA approved 30-acre gated villa-plotted community.
                  </p>
                  <Link href={getProjectHref(hillside.slug)} className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary hover:gap-3 transition-all duration-500">
                    View JB Hillside County <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* Institutional surroundings */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-12">
            <SectionLabel>Institutional Surroundings</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] mb-4">
              Anchored by <span className="text-gradient">Institutions &amp; Industry</span>
            </h2>
            <p className="text-[14px] text-white/35 leading-relaxed">
              Ibrahimpatnam&apos;s townships are surrounded by established defence,
              government and educational institutions — a strong foundation for
              long-term residential demand and investment potential.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <Landmark className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-bold text-white tracking-tight">Near JB Serene City</h3>
                </div>
                <ul className="space-y-3">
                  {serenityLandmarks.map((l) => (
                    <li key={l} className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                      <span className="text-[13px] text-white/45 leading-relaxed">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-bold text-white tracking-tight">Near the Upcoming Project</h3>
                </div>
                <ul className="space-y-3">
                  {["Ibrahimpatnam Town", "Adibatla Aerospace SEZ", "TCS Adibatla Campus", "Foxconn Manufacturing Facility"].map((l) => (
                    <li key={l} className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                      <span className="text-[13px] text-white/45 leading-relaxed">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related insight */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal className="glass-card rounded-2xl p-8 text-center">
            <SectionLabel>Market Intelligence</SectionLabel>
            <h2 className="mt-4 text-xl font-bold tracking-tight mb-3">Hyderabad Real Estate Market Update</h2>
            <p className="text-[13px] text-white/35 leading-relaxed mb-6">
              Understand how Hyderabad&apos;s residential plot market is moving across the
              growth rings — including velocity in corridors like the south and west belts.
            </p>
            <Link
              href="/insights/hyderabad-real-estate-market-update-q3-2026"
              className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-6 py-3 rounded-full text-[12px] font-semibold text-white"
            >
              Read the Insight <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal className="text-center mb-12">
            <SectionLabel>Frequently Asked</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
              Ibrahimpatnam <span className="text-gradient">FAQs</span>
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Discover Plots in Ibrahimpatnam</h2>
            <p className="text-white/35 mb-8 text-[14px]">
              Get a free consultation and site-visit assistance for approved layouts
              in Ibrahimpatnam. Verify approvals, titles and prices with Arjun Realty.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/schedule-site-visit"
                onClick={() =>
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - Ibrahimpatnam" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Book Free Site Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in plots in Ibrahimpatnam. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - Ibrahimpatnam - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Ibrahimpatnam - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <SiteVisitModal isOpen={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} projectName="Ibrahimpatnam" />
    </>
  );
}
