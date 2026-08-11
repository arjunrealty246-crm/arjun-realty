"use client";

import { Shield, CheckCircle, Award, Users, Building2, HeadphonesIcon } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { trustIndicators as indicatorsData } from "@/data/values";
import { trustIndicatorsSection } from "@/data/content";

const iconMapTI: Record<string, React.ComponentType<{ className?: string }>> = {
  "Verified Projects": Shield, "Expert Guidance": Award, "Transparent Process": CheckCircle,
  "1000+ Happy Families": Users, "Multi-Builder Access": Building2, "End-to-End Support": HeadphonesIcon,
};
const indicators = indicatorsData.map((d) => ({ ...d, icon: iconMapTI[d.title] || Shield }));

export default function TrustIndicators() {
  return (
    <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
      <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.015] -left-48 top-1/3" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <SectionLabel>{trustIndicatorsSection.label}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
            {trustIndicatorsSection.heading}
          </h2>
          <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
            {trustIndicatorsSection.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {indicators.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div className="glass-card rounded-[1.25rem] p-7 sm:p-8 group relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.25rem]" />
                  <div className="relative z-10">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-[15px] font-bold text-white mb-2 tracking-[-0.01em]">{item.title}</h3>
                    <p className="text-[13px] text-white/30 leading-[1.7]">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
