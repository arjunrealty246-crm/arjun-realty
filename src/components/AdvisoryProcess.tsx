"use client";

import { motion } from "framer-motion";
import { MessageCircle, Search, ClipboardCheck, Handshake, ArrowRight, Calendar } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import siteConfig from "@/config/site";
import { advisoryProcess } from "@/data/content";

const stepIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Free Consultation": MessageCircle, "Curated Shortlist": Search,
  "Site Visit & Verification": ClipboardCheck, "Purchase & Beyond": Handshake,
};
const steps = advisoryProcess.steps.map((s, i) => ({
  num: `0${i + 1}`,
  icon: stepIconMap[s.title] || MessageCircle,
  title: s.title,
  desc: s.desc,
  highlight: `Step ${i + 1}`,
}));

export default function AdvisoryProcess() {
  return (
    <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
      <div className="ambient-orb w-[500px] h-[500px] bg-gold/[0.015] -right-48 top-1/3" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <SectionLabel>{advisoryProcess.label}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
            {advisoryProcess.heading}
          </h2>
          <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
            {advisoryProcess.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                className="glass-card rounded-[1.25rem] p-7 sm:p-8 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.25rem]" />

                <div className="relative z-10 flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-bold text-primary/40 tracking-[0.15em] uppercase">
                        Step {step.num}
                      </span>
                      <span className="h-px flex-1 bg-white/[0.04]" />
                    </div>
                    <h3 className="text-[16px] font-bold text-white mb-1.5 tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-white/30 leading-relaxed mb-3">
                      {step.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-primary/60 font-medium">
                      <span className="h-1 w-1 rounded-full bg-primary/60" />
                      {step.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className="text-center mt-10">
          <motion.div whileHover={{ scale: 1.02 }}>
            <a
              href={`${siteConfig.links.wa}?text=Hi%20Arjun%20Realty%2C%20I%27d%20like%20to%20start%20my%20investment%20journey`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-10 py-4 rounded-full text-[14px] font-semibold text-white glow-primary-strong"
            >
              <Calendar className="h-4 w-4" />
              {advisoryProcess.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
