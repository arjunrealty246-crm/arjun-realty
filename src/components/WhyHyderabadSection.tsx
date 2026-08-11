"use client";

import { motion } from "framer-motion";
import { Cpu, Building2, Pill, Plane, Train, Route, ArrowRight, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { whyHyderabad } from "@/data/content";

const milestones = [
  {
    year: "2024",
    title: "Future City",
    description: "World's largest planned smart city — 20,000 acres of next-gen urban infrastructure, green corridors, and global business hubs.",
    icon: Building2,
    highlight: true,
    stat: "20,000 Acres",
    progress: 85,
  },
  {
    year: "2025",
    title: "AI City",
    description: "India's first dedicated Artificial Intelligence hub — attracting global tech giants and creating a new paradigm of innovation-led growth.",
    icon: Cpu,
    highlight: true,
    stat: "₹2,000 Cr Investment",
    progress: 60,
  },
  {
    year: "2025",
    title: "Pharma City",
    description: "The world's largest pharmaceutical cluster — generating 200,000+ jobs and positioning Hyderabad as the global pharma capital.",
    icon: Pill,
    highlight: false,
    stat: "200K+ Jobs",
    progress: 45,
  },
  {
    year: "2026",
    title: "Airport Expansion",
    description: "New integrated terminal with 40 million passenger capacity — cementing Hyderabad as a global connectivity hub.",
    icon: Plane,
    highlight: true,
    stat: "40M Passengers",
    progress: 30,
  },
  {
    year: "2027",
    title: "Metro Phase III",
    description: "300+ km metro network linking every major IT corridor, residential hub, and commercial district across the metro region.",
    icon: Train,
    highlight: false,
    stat: "300+ Km Network",
    progress: 15,
  },
  {
    year: "2028",
    title: "Regional Ring Road",
    description: "340 km outer ring road unlocking massive real estate appreciation across satellite towns and growth corridors.",
    icon: Route,
    highlight: false,
    stat: "340 Km Ring Road",
    progress: 8,
  },
];

const stats = [
  { label: "GDP Growth", value: "8.2%", change: "+1.4% YoY" },
  { label: "IT Exports", value: "$32B", change: "3rd in India" },
  { label: "Pop. Growth", value: "+24%", change: "Since 2015" },
  { label: "Avg. Appreciation", value: "18–25%", change: "Annual ROI" },
];

export default function WhyHyderabadSection() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-section-alt">
      <div className="ambient-orb w-[600px] h-[600px] bg-gold/[0.03] -left-72 top-1/3" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-24">
          <SectionLabel>{whyHyderabad.label}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] leading-tight">
            A City Writing the <span className="text-gradient">Future</span>
          </h2>
          <p className="mt-4 text-white/35 max-w-lg mx-auto text-[0.9rem] leading-relaxed">
            {whyHyderabad.description}
          </p>
        </ScrollReveal>

        {/* ── Stats Row ── */}
        <ScrollReveal className="mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-5 text-center group"
              >
                <div className="text-2xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-[11px] text-white/25 uppercase tracking-wider font-medium mb-1">{s.label}</div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-400/70" />
                  <span className="text-[10px] text-emerald-400/60 font-medium">{s.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Marquee Ticker ── */}
        <ScrollReveal className="mb-16">
          <div className="overflow-hidden py-4 border-y border-white/[0.04]">
            <div className="marquee-track whitespace-nowrap">
              {[...milestones, ...milestones].map((m, i) => (
                <span key={`${m.title}-${i}`} className="inline-flex items-center gap-3 mx-8 text-white/20 text-sm font-medium">
                  <Zap className="h-3 w-3 text-primary/40" />
                  {m.title}
                  <span className="text-primary/30">{m.stat}</span>
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Timeline ── */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-gold/10 to-transparent" />

          <div className="space-y-6 lg:space-y-10">
            {milestones.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <ScrollReveal key={item.title} delay={i * 0.06} direction={isLeft ? "left" : "right"}>
                  <div className="lg:grid lg:grid-cols-[1fr,auto,1fr] lg:gap-8 items-center">
                    {/* Content card */}
                    <div className={`${isLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-3 lg:text-left"}`}>
                      <div
                        className={`glass-card rounded-2xl p-6 relative overflow-hidden group ${item.highlight ? "border-primary/15" : ""}`}
                      >
                        {/* Top accent */}
                        {item.highlight && (
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        )}
                        {/* Hover glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.highlight ? "from-primary/[0.04]" : "from-white/[0.01]"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl`} />
                        <div className="relative z-10">
                          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                            {/* Year pill */}
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.highlight ? "bg-primary/10 text-primary/70" : "bg-white/[0.03] text-white/25"}`}>
                              <span className="h-1 w-1 rounded-full bg-current" />
                              {item.year}
                            </div>
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${item.highlight ? "bg-primary/15 text-primary glow-primary" : "bg-white/[0.04] text-white/30"}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                          <p className="text-sm text-white/35 leading-relaxed mb-3">{item.description}</p>
                          {/* Progress bar */}
                          <div className={`flex items-center gap-3 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                            <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden max-w-[120px]">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.progress}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={`h-full rounded-full ${item.highlight ? "bg-gradient-to-r from-primary/60 to-primary/30" : "bg-gradient-to-r from-white/15 to-white/5"}`}
                              />
                            </div>
                            <span className={`text-[10px] font-semibold ${item.highlight ? "text-primary/60" : "text-white/25"}`}>
                              {item.progress}% complete
                            </span>
                          </div>
                          {item.highlight && (
                            <div className={`mt-3 inline-flex items-center gap-2 text-[11px] font-semibold text-primary/70 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                              <span className="h-1 w-1 rounded-full bg-primary/50" />
                              {item.stat}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
                        className={`h-3.5 w-3.5 rounded-full border-2 ${item.highlight ? "bg-primary border-primary shadow-[0_0_16px_rgba(249,115,22,0.4)]" : "bg-charcoal-dark border-white/15"}`}
                      />
                    </div>

                    {/* Empty column */}
                    <div className="hidden lg:block lg:col-start-1 lg:row-start-1" style={{ order: isLeft ? -1 : 0 }} />
                    {isLeft ? null : <div className="hidden lg:block lg:col-start-1" />}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <ScrollReveal className="text-center mt-16">
          <Link href="/why-hyderabad" className="btn-glass inline-flex items-center gap-3 px-10 py-4 rounded-full text-[13px] font-semibold text-white/80">
            {whyHyderabad.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
