"use client";

import { motion } from "framer-motion";
import { Building2, Shield, Ruler, TrendingUp, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { builders } from "@/data/builders";

const builderIcons = [TrendingUp, Shield, Ruler, Building2];

export default function FeaturedBuilders() {
  return (
    <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
      <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.02] -left-48 top-1/3" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <SectionLabel>Partner Builders</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
            Projects from <span className="text-gradient">Hyderabad&apos;s Finest</span> Builders
          </h2>
          <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
            We carefully select and partner only with reputed developers who meet our rigorous standards
            for legal compliance, infrastructure quality, and delivery track record.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {builders.map((builder, i) => {
            const Icon = builderIcons[i % builderIcons.length];
            return (
              <ScrollReveal key={builder.id} delay={i * 0.08} className="h-full">
                <Link
                  href={`/builders/${builder.slug}`}
                  className="block h-full"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-[1.25rem] p-7 sm:p-8 group relative overflow-hidden h-full flex flex-col"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.25rem]" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>

                      <h3 className="text-[16px] font-bold text-white mb-2 tracking-[-0.01em]">
                        {builder.name}
                      </h3>

                      <p className="text-[12px] text-white/30 leading-relaxed mb-4 flex-1">
                        {builder.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {builder.highlights?.map((h) => (
                          <span key={h} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/[0.06] text-[9px] text-primary/60 font-medium uppercase tracking-wider">
                            {h}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04] mt-auto">
                        <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                          <Building2 className="h-3 w-3 text-primary/50" />
                          {builder.projectCount} Projects
                        </span>
                        {builder.established && (
                          <span className="text-[11px] text-white/20">Est. {builder.established}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            );
          })}

          {/* AR — curated real estate opportunities */}
          <ScrollReveal key="arjun-realty" delay={0.08} className="h-full">
            <Link href="/arjun-realty" className="block h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card rounded-[1.25rem] p-7 sm:p-8 group relative overflow-hidden h-full flex flex-col"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.25rem]" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>

                  <h3 className="text-[16px] font-bold text-white tracking-[-0.01em]">
                    Arjun Realty
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary/50 font-medium mt-1 mb-2">
                    Curated Real Estate Opportunities
                  </p>

                  <p className="text-[12px] text-white/30 leading-relaxed mb-4 flex-1">
                    Selected residential opportunities in high-growth locations.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Shankarpally Focus", "Current + Upcoming"].map((h) => (
                      <span key={h} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/[0.06] text-[9px] text-primary/60 font-medium uppercase tracking-wider">
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
                    <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                      <Building2 className="h-3 w-3 text-primary/50" />
                      2 Featured Opportunities
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-primary/60 font-semibold group-hover:text-primary transition-colors duration-300">
                      Explore Opportunities <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal className="text-center mt-10">
          <Link
            href="/projects"
            className="btn-glass inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[13px] font-semibold text-white/55 hover:text-white/80 transition-all duration-500"
          >
            View All Projects & Partners <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
