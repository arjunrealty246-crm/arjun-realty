"use client";

import { motion } from "framer-motion";
import { Globe, Shield, TrendingUp, ArrowRight, Clock, Phone, FileCheck } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import siteConfig from "@/config/site";
import { nriSection } from "@/data/content";

const benefits = [
  {
    icon: Globe,
    title: "Invest From Anywhere",
    description: "Complete remote investment support. Virtual site tours, digital documentation, and end-to-end assistance from your couch in New York, Dubai, or London.",
    tag: "Virtual Support",
  },
  {
    icon: Shield,
    title: "Legally Fortified",
    description: "Every project vetted by top-tier legal firms. Full RBI & FEMA compliance. Title verification, encumbrance checks, and government approval guarantees.",
    tag: "100% Compliant",
  },
  {
    icon: TrendingUp,
    title: "Exceptional Returns",
    description: "Hyderabad's prime corridors have delivered 15–25% annual appreciation over the past 5 years. Plots near ORR, the airport, and the Financial District continue to outperform.",
    tag: "15–25% Annual Returns",
  },
];

const features = [
  { icon: Globe, text: "Free virtual consultation with NRI specialists" },
  { icon: FileCheck, text: "RBI & FEMA compliant transaction support" },
  { icon: Phone, text: "Dedicated relationship manager" },
  { icon: Clock, text: "End-to-end registration from abroad" },
  { icon: TrendingUp, text: "Quarterly investment performance reports" },
  { icon: Shield, text: "Legal & title verification included" },
];

export default function NRISection() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.03] -right-48 top-1/4" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <SectionLabel>{nriSection.label}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] leading-tight">
            Build Wealth from <span className="text-gradient">Anywhere</span>
          </h2>
          <p className="mt-4 text-white/35 max-w-lg mx-auto text-[0.9rem] leading-relaxed">
            {nriSection.description}
          </p>
        </ScrollReveal>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12 lg:mb-16">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.08}>
              <div
                className="glass-card-elevated rounded-2xl p-7 lg:p-8 text-center group relative overflow-hidden h-full"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.08] text-[10px] font-semibold text-primary/60 uppercase tracking-wider mb-5">
                    {b.tag}
                  </div>
                  <div className="relative mx-auto mb-6 w-16 h-16">
                    <div className="absolute inset-0 rounded-2xl bg-primary/[0.08] group-hover:bg-primary/[0.12] transition-all duration-500" />
                    <div className="absolute inset-0 rounded-2xl border border-primary/10 group-hover:border-primary/20 transition-all duration-500" />
                    <div className="relative h-full w-full flex items-center justify-center">
                      <b.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{b.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{b.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* NRI CTA Banner */}
        <ScrollReveal>
          <div className="glass-card-elevated rounded-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-gold/[0.04]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
            <div className="relative z-10 p-8 sm:p-10 lg:p-14 lg:flex lg:items-center lg:gap-12">
              <div className="lg:flex-1 mb-8 lg:mb-0">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.08] text-[10px] font-semibold text-primary/60 uppercase tracking-wider mb-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                  {nriSection.bannerBadge}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                  {nriSection.bannerTitle}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed mb-7 max-w-lg">
                  {nriSection.bannerDescription}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {features.map((f, fi) => (
                    <motion.div
                      key={f.text}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fi * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="h-7 w-7 rounded-lg bg-primary/[0.08] flex items-center justify-center shrink-0">
                        <f.icon className="h-3.5 w-3.5 text-primary/60" />
                      </div>
                      <span className="text-[13px] text-white/50">{f.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="lg:w-auto flex flex-col items-center lg:items-start gap-4">
                <Link href="/nri-investment" className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white glow-primary-strong w-full lg:w-auto justify-center">
                  {nriSection.cta} <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={siteConfig.links.wa} target="_blank" rel="noopener noreferrer" className="btn-glass inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-semibold text-white/70 w-full lg:w-auto justify-center">
                  {nriSection.secondaryCta}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
