"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { ArrowRight, MapPin, TrainFront, ShieldCheck, Route, Phone, Building2, Check, CalendarCheck } from "lucide-react";
import SiteVisitModal from "@/components/SiteVisitModal";
import TrustIndicators from "@/components/TrustIndicators";
import siteConfig from "@/config/site";
import { getProjectBySlug } from "@/data/projects";
import { getProjectHref } from "@/lib/project-links";
import { trackEvent } from "@/lib/analytics";

const drivers = [
  {
    icon: Route,
    title: "Expressway Connectivity",
    desc: "A four-lane expressway from ORR Exit No. 18 (Appa Junction) links Vikarabad directly to the Financial District and major IT & financial hubs — Kokapet, Neopolis, Gachibowli, Nanakramguda, Gandipet, Mokila and Shankarpally.",
  },
  {
    icon: TrainFront,
    title: "Confirmed Bullet-Train Station",
    desc: "The Central and State Governments have proposed a high-speed rail / bullet-train corridor with a confirmed major station at Vikarabad, promising rapid travel times to Hyderabad and strong land-value appreciation.",
  },
  {
    icon: ShieldCheck,
    title: "Approved Layouts at Entry Pricing",
    desc: "Approved layouts in Vikarabad transact at a fraction of the per-square-yard prices in Kokapet, Neopolis and Mokila, yet a buyer travels the same highways to reach the same job nodes — the same gap early investors in Shankarpally and Tellapur exploited.",
  },
];

const connectivity = [
  "Just 2 KM from Vikarabad Railway Station",
  "Just 2.5 KM from Vikarabad Town",
  "Just 3.5 KM from Regional Ring Road (RRR)",
  "Near the four-lane expressway from ORR Exit No.18 (Appa Junction) to Vikarabad",
  "Proposed high-speed rail / bullet-train corridor with a confirmed major station at Vikarabad",
];

const landmarks = [
  "Ananthagiri Hills",
  "Anantha Padmanabha Swamy Temple",
  "Kotepally Reservoir",
];

const faqs = [
  { q: "Why is Vikarabad considered a growth corridor?", a: "Vikarabad is positioned within the high-growth West Hyderabad Investment Corridor. Connectivity is arriving first — the four-lane expressway from ORR Exit No. 18 (Appa Junction) shortens the drive to the Financial District, and a confirmed major high-speed rail / bullet-train station at Vikarabad is along the proposed corridor to Hyderabad." },
  { q: "What type of plots are available in Vikarabad?", a: "Verified, approved layouts are available, including JB Pristine City — a 150-acre mega master-planned DTCP & RERA approved gated community with plot sizes from 150 to 600 sq. yards and clear titles." },
  { q: "What is the approval status of Vikarabad projects?", a: "As with any layout, verify the specific approval authority. Trusted projects carry DTCP and RERA approvals with clean Dharani records. JB Pristine City is DTCP & RERA approved with a clear title and bank loan facility." },
  { q: "Who is Vikarabad best suited for?", a: "Vikarabad suits investors whose time horizon is 5-10 years and who want to pre-position ahead of the bullet-train working population. End-users should weigh their commute today rather than promotional renders of tomorrow." },
];

export default function VikarabadPage() {
  const pristineCity = getProjectBySlug("jb-pristine-city");
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
      <PageBreadcrumbs items={[{ name: "Vikarabad", url: "/vikarabad" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Vikarabad · West Hyderabad</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Approved Plots in <span className="text-gradient">Vikarabad</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Vikarabad is running the classic growth-corridor script on
              fast-forward — connectivity first, employment next, land values
              catching up last. Explore DTCP &amp; RERA approved layouts in West
              Hyderabad&apos;s emerging investment corridor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={pristineCity ? getProjectHref(pristineCity.slug) : "/projects"}
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "Explore Projects - Vikarabad" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Explore Vikarabad Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in approved plots in Vikarabad. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - Vikarabad" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Vikarabad" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <button
                onClick={() => {
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - Vikarabad" });
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

      {/* Why Vikarabad */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>Why Vikarabad</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              West Hyderabad&apos;s <span className="text-gradient">Next Hotspot</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {drivers.map((d, i) => {
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
                Well Connected to <span className="text-gradient">Hyderabad&apos;s Job Nodes</span>
              </h2>
              <p className="text-[14px] text-white/35 leading-relaxed mb-6">
                Vikarabad&apos;s growth is anchored by connectivity that is already
                taking shape. The expressway and rail links place it within reach
                of the city&apos;s leading IT and financial districts.
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

      {/* Featured Vikarabad project */}
      {pristineCity && (
        <section className="py-20 bg-section-alt">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal className="max-w-3xl mb-10">
              <SectionLabel>Featured in Vikarabad</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
                {pristineCity.name} <span className="text-gradient">— 150-Acre Approved Community</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <Link href={getProjectHref(pristineCity.slug)} className="block group">
                <div className="glass-card rounded-[1.25rem] p-8 md:p-10 h-full">
                  <div className="flex flex-wrap items-start gap-4 justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-6 w-6 text-primary" />
                      <div>
                        <p className="text-base font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">{pristineCity.name}</p>
                        <p className="text-[11px] text-white/35">{pristineCity.location}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="h-3 w-3" /> {pristineCity.approval}
                    </span>
                  </div>
                  <p className="text-[13px] text-white/40 leading-relaxed mb-5">{pristineCity.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-[11px] text-white/50 border border-white/[0.04]">{pristineCity.plotSizes}</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-[11px] text-white/50 border border-white/[0.04]">From {pristineCity.startingPrice}</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-[11px] text-white/50 border border-white/[0.04]">{pristineCity.projectArea}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                    View Project Details <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Related insight link */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal className="glass-card rounded-2xl p-8 text-center">
            <SectionLabel>Market Intelligence</SectionLabel>
            <h2 className="mt-4 text-xl font-bold tracking-tight mb-3">Why Vikarabad Is Becoming West Hyderabad&apos;s Next Investment Hotspot</h2>
            <p className="text-[13px] text-white/35 leading-relaxed mb-6">
              A confirmed bullet-train station, the Appa Junction expressway and land
              prices far below Gachibowli are pulling smart money toward Vikarabad.
            </p>
            <Link
              href="/insights/why-vikarabad-is-west-hyderabads-next-hotspot"
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
              Vikarabad <span className="text-gradient">FAQs</span>
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Invest in Vikarabad&apos;s Growth Story</h2>
            <p className="text-white/35 mb-8 text-[14px]">
              Get a free consultation and site-visit assistance for approved layouts
              in Vikarabad. Verify approvals, titles and prices with Arjun Realty.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/schedule-site-visit"
                onClick={() =>
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - Vikarabad" })
                }
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Book Free Site Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I'm interested in approved plots in Vikarabad. I'd like to know the latest price, availability and site visit details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - Vikarabad - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366]/[0.12] border border-[#25D366]/20 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={siteConfig.links.tel}
                onClick={() =>
                  trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Vikarabad - Final CTA" })
                }
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <SiteVisitModal isOpen={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} projectName="Vikarabad" />
    </>
  );
}
