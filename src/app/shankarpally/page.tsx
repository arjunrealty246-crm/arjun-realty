"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { ArrowRight, MapPin, ShieldCheck, Building2, Phone, Gauge, Landmark, Check, CalendarCheck } from "lucide-react";
import SiteVisitModal from "@/components/SiteVisitModal";
import TrustIndicators from "@/components/TrustIndicators";
import siteConfig from "@/config/site";
import { getProjectBySlug } from "@/data/projects";
import type { Project } from "@/data/projects";
import { getProjectHref } from "@/lib/project-links";
import { trackEvent } from "@/lib/analytics";

const whyPoints = [
  {
    icon: Landmark,
    title: "West Hyderabad's Golden Triangle",
    desc: "Shankarpally sits on West Hyderabad's Golden Triangle - the belt that links the Kokapet and Neopolis financial district, the Shankarpally corridor and the IIT Hyderabad / Kandi knowledge belt. Offices, institutions and housing arriving on the same axis is what makes the corridor a residential growth story rather than a purely speculative one.",
  },
  {
    icon: ShieldCheck,
    title: "HMDA-Approved Layouts",
    desc: "The corridor's recognised plotted developments carry HMDA approval, and the 45-acre community is also RERA registered - the approvals that make a plot bankable and resale-friendly. Approval status varies by project, so verify the specific approval number and the Dharani record before you buy.",
  },
  {
    icon: Gauge,
    title: "Entry Pricing vs the Core",
    desc: "Open plots in Shankarpally are generally priced below the per-square-yard rates inside Kokapet and Neopolis, yet sit on the same ORR-linked commute toward the financial district. That gap between the corridor and the core is what continues to draw buyers to Shankarpally.",
  },
];

const connectivity = [
  "On the Shankarpally-Kandi corridor in West Hyderabad",
  "Shankarpally town centre & railway station within approx. 10 minutes",
  "NH-65 (Mumbai Highway) access via the Shankarpally-Kandi corridor",
  "Connectivity to the Outer Ring Road (ORR) toward the financial district",
  "Gandipet-Shankarpally six-lane highway - proposed, not yet completed",
];

const landmarks = [
  "Kokapet & Neopolis (Financial District)",
  "Gachibowli IT corridor",
  "IIT Hyderabad / Kandi knowledge belt",
  "Mokila & Tellapur",
  "Shankarpally Railway Station",
];

const faqs = [
  {
    q: "What kind of plots are available in Shankarpally?",
    a: "Shankarpally offers HMDA-approved and RERA-registered residential plots, including the Shankarpally 45 Acres Premium Layout near Julkal Village with plots from 200 to 500+ sq. yards, and an upcoming 108-acre HMDA open plotting community on the Shankarpally-Nawabpet Highway whose approval is under process.",
  },
  {
    q: "Are plots in Shankarpally HMDA approved?",
    a: "The corridor's recognised layouts carry HMDA approval, and the 45-acre community is also RERA registered. Because approval status varies from one project to the next, verify the specific HMDA approval number and the Dharani record for the plot you are considering before you pay.",
  },
  {
    q: "How is Shankarpally connected to Hyderabad?",
    a: "Shankarpally sits on the Shankarpally-Kandi corridor in West Hyderabad, within roughly 10 minutes of Shankarpally town and its railway station, with NH-65 (Mumbai Highway) access and ORR connectivity toward the Kokapet and Neopolis financial district. The Gandipet-Shankarpally six-lane highway is proposed and not yet completed, so treat it as a future factor rather than an existing one.",
  },
  {
    q: "What is the Gandipet-Shankarpally six-lane highway?",
    a: "It is a proposed six-lane road along the Gandipet-Shankarpally route. It is not yet completed, so any value attributed to it should be read as forward-looking connectivity rather than something already on the ground.",
  },
  {
    q: "Who is Shankarpally best suited for?",
    a: "Shankarpally suits buyers who want an HMDA-approved plot with a West Hyderabad address and access to the Kokapet and Neopolis employment belt without core-district pricing. End-users should weigh their current daily commute, and investors should plan for a multi-year horizon rather than a quick exit.",
  },
];

export default function ShankarpallyPage() {
  const fortyFive = getProjectBySlug("shankarpally-45-acres");
  const upcoming = getProjectBySlug("upcoming-shankarpally");

  const feats = [fortyFive, upcoming].filter((p): p is Project => Boolean(p));
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
      <PageBreadcrumbs items={[{ name: "Shankarpally", url: "/shankarpally" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Shankarpally · West Hyderabad</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Open Plots in <span className="text-gradient">Shankarpally</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Shankarpally is where West Hyderabad&apos;s growth corridor, the
              Kokapet-Neopolis financial district and the Kandi knowledge belt meet.
              Explore HMDA-approved open plots for sale on the Shankarpally-Kandi
              corridor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={fortyFive ? getProjectHref(fortyFive.slug) : "/projects"}
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "Explore Projects - Shankarpally" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Explore Shankarpally Plots <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in open plots in Shankarpally, West Hyderabad. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - Shankarpally" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Shankarpally" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <button
                onClick={() => {
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - Shankarpally" });
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

      {/* Why Shankarpally */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>Why Shankarpally</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              A West Hyderabad Corridor <span className="text-gradient">Built for Growth</span>
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

      {/* Connectivity */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <ScrollReveal>
              <SectionLabel>Connectivity</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] mb-5">
                Connected to <span className="text-gradient">Hyderabad&apos;s Financial District</span>
              </h2>
              <p className="text-[14px] text-white/35 leading-relaxed mb-6">
                Shankarpally&apos;s growth is anchored by the roads that already
                connect it to the city&apos;s financial and IT districts, with
                further highway upgrades at the proposal stage.
              </p>
              <ul className="space-y-3">
                {connectivity.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-[13px] text-white/45 leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-bold text-white tracking-tight">Nearby Landmarks</h3>
                </div>
                <ul className="space-y-3">
                  {landmarks.map((l) => (
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

      {/* Shankarpally projects */}
      {feats.length > 0 && (
        <section className="py-24 lg:py-32 bg-section-alt">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal className="max-w-3xl mb-12">
              <SectionLabel>Projects in &amp; around Shankarpally</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
                Open Plots &amp; <span className="text-gradient">Gated Communities</span>
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
                        {p.plotSizes && (
                          <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-[11px] text-white/50 border border-white/[0.04]">{p.plotSizes}</span>
                        )}
                        {p.startingPrice && p.startingPrice.includes("₹") && (
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
            <ScrollReveal>
              <div className="mt-8 text-center">
                <Link
                  href="/arjun-realty"
                  className="inline-flex items-center gap-2.5 btn-glass px-8 py-4 rounded-full text-[13px] font-semibold text-white/80"
                >
                  Current &amp; Upcoming Shankarpally Opportunities <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Related insights */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-10">
            <SectionLabel>Market Intelligence</SectionLabel>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.02em]">
              Insights on the <span className="text-gradient">Shankarpally Corridor</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal>
              <Link href="/insights/shankarpally-plot-investment-2026-buyers-guide" className="block group h-full">
                <div className="glass-card rounded-2xl p-7 h-full">
                  <SectionLabel>Buyer Guide</SectionLabel>
                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    Shankarpally Plot Investment 2026: A Buyer&apos;s Checklist
                  </h3>
                  <p className="mt-3 text-[13px] text-white/35 leading-relaxed">
                    The checks that matter before buying in Shankarpally - HMDA vs DTCP approvals, title clearance and resale liquidity.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    Read Guide <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/insights/hyderabad-gcc-boom-shankarpally-connectivity-investment-guide" className="block group h-full">
                <div className="glass-card rounded-2xl p-7 h-full">
                  <SectionLabel>Connectivity</SectionLabel>
                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    Shankarpally Plots &amp; the Hyderabad GCC Boom
                  </h3>
                  <p className="mt-3 text-[13px] text-white/35 leading-relaxed">
                    How Neopolis GCC growth, the Kollur Radial Road and defence employment anchors feed demand along the Shankarpally corridor.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    Read Insight <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/insights/hyderabad-south-vs-west-future-city-srisailam-shankarpally-comparison" className="block group h-full">
                <div className="glass-card rounded-2xl p-7 h-full">
                  <SectionLabel>Comparison</SectionLabel>
                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    Hyderabad South vs West: Which Corridor Suits You
                  </h3>
                  <p className="mt-3 text-[13px] text-white/35 leading-relaxed">
                    How the Srisailam-Future City belt and the Shankarpally corridor compare on pricing, growth stage and timeline.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    Read Comparison <ArrowRight className="h-4 w-4" />
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
              Shankarpally <span className="text-gradient">FAQs</span>
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Find Open Plots in Shankarpally</h2>
            <p className="text-white/35 mb-8 text-[14px]">
              Get a free consultation and site-visit assistance for HMDA-approved
              layouts in Shankarpally. Verify approvals, titles and prices with Arjun Realty.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/schedule-site-visit"
                onClick={() =>
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - Shankarpally" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Book Free Site Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in open plots in Shankarpally, West Hyderabad. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - Shankarpally - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Shankarpally - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <SiteVisitModal isOpen={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} projectName="Shankarpally" />
    </>
  );
}
