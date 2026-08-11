"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import CountUp from "@/components/CountUp";
import { Shield, Target, Heart, Gem, Users, Award, TrendingUp, Handshake } from "lucide-react";

const values = [
  { icon: Shield, title: "Integrity", desc: "Every project is legally vetted. We never compromise on due diligence." },
  { icon: Target, title: "Excellence", desc: "We pursue the highest standards in every interaction and every project." },
  { icon: Heart, title: "Client-First", desc: "Your goals drive our recommendations. Always." },
  { icon: Gem, title: "Premium Quality", desc: "We curate only the finest, most promising investment opportunities." },
];

const stats = [
  { value: 5, suffix: "+", label: "Years of Excellence" },
  { value: 1000, suffix: "+", label: "Happy Families" },
  { value: 100, suffix: "+", label: "Acres Delivered" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "%", label: "Avg. Annual Returns" },
  { value: 10, suffix: "+", label: "Countries Served" },
];

const team = [
  { name: "K. Nagarjuna", role: "Founder & CEO", image: "" },
  { name: "Arjun Realty Advisory Team", role: "Investment Advisors", image: "" },
  { name: "Arjun Realty Legal Desk", role: "Legal & Compliance", image: "" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>About Us</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Building Trust, <span className="text-gradient">Delivering Wealth</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Arjun Realty was founded with a singular vision — to make premium
              real estate investment accessible, transparent, and genuinely
              rewarding for every investor.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden glass-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-gradient mb-2">5+</div>
                      <div className="text-sm text-white/40 uppercase tracking-wider">Years of Trust</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-relaxed">
                <p>
                  Arjun Realty was born from a simple frustration — the Indian real
                  estate market was filled with opacity, broken promises, and
                  unverified projects. We set out to change that.
                </p>
                <p>
                  Today, we are Hyderabad&apos;s trusted real estate advisory,
                  with a portfolio spanning 100+ acres across the city&apos;s
                  highest-growth corridors. Every project we recommend has been
                  rigorously vetted for legal compliance, infrastructure quality,
                  and appreciation potential.
                </p>
                <p>
                  Our client base spans India, UAE, USA, UK, Canada, Australia,
                  Singapore, and beyond — a testament to the trust we&apos;ve built
                  across borders.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.05}>
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              What <span className="text-gradient">Defines</span> Us
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="glass-card rounded-2xl p-7 text-center group h-full">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-all duration-500">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{v.title}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{v.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>Our Team</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              The <span className="text-gradient">People</span> Behind Your Investments
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="glass-card rounded-2xl overflow-hidden group">
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105 flex items-center justify-center" style={{ backgroundImage: t.image ? `url(${t.image})` : undefined, background: t.image ? undefined : "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(212,165,116,0.05))" }}>
                      {!t.image && (
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gradient mb-2">{t.name.split(" ").map(n => n[0]).join("")}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-base font-bold text-white mb-1">{t.name}</h3>
                    <p className="text-[12px] text-primary/70 font-medium">{t.role}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
