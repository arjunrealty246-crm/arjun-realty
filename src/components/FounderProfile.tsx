"use client";

import { Award, Users, TrendingUp, Shield, MapPin, Phone, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import siteConfig from "@/config/site";
import { founderMilestones as milestones, founderCredentials, founderStats } from "@/data/team";
import { founderProfile } from "@/data/content";

const credentials = founderCredentials.map(c => c.text);

export default function FounderProfile() {
  return (
    <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
      <div className="ambient-orb w-[600px] h-[600px] bg-gold/[0.02] -right-64 top-0" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-24">
          <SectionLabel>{founderProfile.label}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
            Built on <span className="text-gradient">Integrity</span>,<br className="hidden sm:block" /> Driven by Results
          </h2>
          <p className="mt-5 text-white/30 max-w-lg mx-auto text-[0.95rem] leading-relaxed">
            {founderProfile.description}
          </p>
        </ScrollReveal>

        {/* Main layout: Profile + Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left: Profile card */}
          <ScrollReveal>
            <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden h-full">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

              {/* Avatar + name */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/20 via-gold/10 to-primary/5 border border-white/[0.06] flex items-center justify-center">
                    <span className="text-2xl font-bold text-gradient">KN</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-[#0f0f1a] flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{siteConfig.founder.name}</h3>
                  <p className="text-[13px] text-primary/70 font-medium">{siteConfig.founder.role}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{siteConfig.name}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[13px] text-white/40 leading-[1.8] mb-8">
                {founderProfile.bio}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {founderStats.map((stat) => {
                  const IconMap: Record<string, React.ComponentType<{ className?: string }>> = { TrendingUp, Users, Award };
                  const StatIcon = IconMap[stat.icon] as React.ComponentType<{ className?: string }>;
                  return (
                  <div key={stat.label} className="text-center">
                    <div className="h-10 w-10 rounded-xl bg-primary/[0.06] flex items-center justify-center mx-auto mb-2.5">
                      <StatIcon className="h-4 w-4 text-primary/60" />
                    </div>
                    <div className="text-lg font-bold text-gradient">{stat.value}</div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                );
                })}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={siteConfig.links.tel}
                  className="btn-premium flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-6 py-3 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
                >
                  <Phone className="h-3.5 w-3.5" /> {founderProfile.cta}
                </a>
                <a
                  href={`${siteConfig.links.wa}?text=Hi%20Mr.%20Nagarjuna%2C%20I%27d%20like%20to%20discuss%20investment%20options`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-[13px] font-semibold text-white/65"
                >
                  WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Credentials + Timeline */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-6 h-full">
              {/* Credentials */}
              <div className="glass-card rounded-[1.25rem] p-7 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-bold text-white tracking-[-0.01em]">{founderProfile.credentialsHeading}</h3>
                </div>
                <ul className="space-y-3.5">
                  {credentials.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
                      <span className="text-[13px] text-white/40 leading-[1.65]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Journey timeline */}
              <div className="glass-card rounded-[1.25rem] p-7 sm:p-8 relative overflow-hidden flex-1">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
                <h3 className="text-[15px] font-bold text-white tracking-[-0.01em] mb-6">{founderProfile.journeyHeading}</h3>
                <div className="space-y-0">
                  {milestones.map((m, i) => (
                    <div key={m.year} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-primary">{m.year.slice(2)}</span>
                        </div>
                        {i < milestones.length - 1 && (
                          <div className="w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent mt-1" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="text-[11px] text-primary/60 font-semibold uppercase tracking-wider">{m.year}</p>
                        <p className="text-[13px] font-semibold text-white/80 mt-0.5">{m.title}</p>
                        <p className="text-[12px] text-white/30 leading-relaxed mt-0.5">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom location badge */}
        <ScrollReveal className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass text-[12px] text-white/35 font-medium">
            <MapPin className="h-3.5 w-3.5 text-primary/50" />
            Office: {siteConfig.address.short} — Open {siteConfig.address.hours}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
