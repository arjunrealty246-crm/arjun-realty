"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { Cpu, Building2, Pill, Plane, Train, Route, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import siteConfig from "@/config/site";

const milestones = [
  { year: "2024", title: "Future City", desc: "World's largest planned smart city spanning 20,000 acres with state-of-the-art infrastructure, green energy corridors, and a vision to become Asia's most livable urban center.", icon: Building2, highlight: true, stat: "20,000 Acres" },
  { year: "2025", title: "AI City", desc: "India's first dedicated AI innovation hub, attracting global tech giants with state incentives. Expected to generate 50,000+ high-value jobs and transform Hyderabad into a global tech powerhouse.", icon: Cpu, highlight: true, stat: "50K+ Jobs" },
  { year: "2025", title: "Pharma City", desc: "The world's largest pharmaceutical manufacturing cluster, spanning 19,000 acres. Already attracting $3B+ in investments and creating 200,000+ direct and indirect jobs.", icon: Pill, highlight: false, stat: "$3B+ Investment" },
  { year: "2026", title: "Airport Expansion", desc: "New integrated terminal at Rajiv Gandhi International Airport with capacity for 40 million passengers annually, making Hyderabad a major global transit hub.", icon: Plane, highlight: true, stat: "40M Passengers/Year" },
  { year: "2027", title: "Metro Phase III", desc: "Expanding the metro network to 300+ km, connecting every major IT corridor, residential hub, and commercial district across the metropolitan region.", icon: Train, highlight: false, stat: "300+ Km Network" },
  { year: "2028", title: "Regional Ring Road", desc: "340 km outer ring road connecting satellite towns, unlocking massive real estate appreciation across emerging corridors and growth zones.", icon: Route, highlight: false, stat: "340 Km Ring Road" },
];

const growthStats = [
  { label: "IT Exports", value: "$30B+", desc: "Annual IT exports" },
  { label: "GDP Growth", value: "8.5%", desc: "Consistent annual growth" },
  { label: "Job Creation", value: "500K+", desc: "New jobs by 2028" },
  { label: "Appreciation", value: "22%", desc: "Avg. annual returns" },
];

export default function WhyHyderabadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
              { "@type": "ListItem", position: 2, name: "Why Hyderabad", item: `${siteConfig.url}/why-hyderabad` },
            ],
          }),
        }}
      />
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-gold/[0.04] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Why Hyderabad</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              India&apos;s <span className="text-gradient">Fastest-Growing</span> Investment Destination
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Hyderabad is in the middle of the most transformative infrastructure
              wave in Indian history. The 2024–2028 pipeline will redefine
              real estate value forever.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Growth Stats */}
      <section className="py-16 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {growthStats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{s.value}</div>
                  <p className="text-[11px] text-white/30 uppercase tracking-[0.15em] font-medium mb-1">{s.label}</p>
                  <p className="text-[11px] text-white/20">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>Infrastructure Pipeline</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              The <span className="text-gradient">Mega Projects</span> Driving Growth
            </h2>
          </ScrollReveal>
          <div className="space-y-6 max-w-4xl mx-auto">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <ScrollReveal key={m.title} delay={i * 0.06}>
                  <motion.div whileHover={{ x: 4 }} className={`glass-card rounded-2xl p-6 sm:p-8 flex gap-5 sm:gap-8 items-start ${m.highlight ? "border-primary/15" : ""}`}>
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center shrink-0 ${m.highlight ? "bg-primary/15 text-primary" : "bg-white/[0.04] text-white/25"}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/60">{m.year}</span>
                        {m.highlight && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[9px] font-bold text-primary uppercase tracking-wider">Key Driver</span>}
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight mb-2">{m.title}</h3>
                      <p className="text-[13px] text-white/35 leading-relaxed mb-3">{m.desc}</p>
                      <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary/60">
                        <TrendingUp className="h-3 w-3" /> {m.stat}
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Ready to Ride the Growth Wave?</h2>
            <p className="text-white/35 mb-8 text-[14px]">Don&apos;t wait for prices to peak. Secure your position in Hyderabad&apos;s most promising corridors today.</p>
            <Link href="/contact" className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]">
              Schedule a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
