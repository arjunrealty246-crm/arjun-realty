"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ContactSection from "@/components/ContactSection";
import { Globe, Shield, TrendingUp, CheckCircle2, FileText, Phone, ArrowRight, Building, Banknote } from "lucide-react";

const steps = [
  { num: "01", title: "Free Consultation", desc: "Connect with our NRI desk via video call. We understand your goals, risk appetite, and investment timeline.", icon: Phone },
  { num: "02", title: "Curated Shortlist", desc: "Receive a personalized portfolio of vetted projects matched to your budget and objectives.", icon: Building },
  { num: "03", title: "Virtual Tour", desc: "Immersive site visits via high-res video tours, drone footage, and detailed project documentation.", icon: Globe },
  { num: "04", title: "Legal Verification", desc: "Independent title search, encumbrance certificate, and government approval verification.", icon: FileText },
  { num: "05", title: "Secure Transaction", desc: "RBI & FEMA compliant payment routing. NRE/NRO account support. Complete documentation.", icon: Banknote },
  { num: "06", title: "Registration & Beyond", desc: "End-to-end registration handled remotely. Quarterly updates on your investment's performance.", icon: TrendingUp },
];

const faqs = [
  { q: "Can I invest as an NRI without visiting India?", a: "Absolutely. We offer complete remote investment support including virtual site tours, digital documentation, and RBI-compliant payment routing." },
  { q: "What approvals should I look for?", a: "All projects we showcase carry HMDA, DTCP, FCDA, or RERA approval. We also provide independent legal verification through top-tier law firms." },
  { q: "How do I repatriate funds?", a: "We guide you through FEMA-compliant repatriation procedures. Typically, gains from approved real estate investments can be repatriated through your NRE/NRO account." },
  { q: "What is the minimum investment?", a: "Our curated selection starts from ₹35 Lakh for premium plots and ₹1.2 Cr for luxury apartments." },
  { q: "Do you charge advisory fees?", a: "No. Our advisory service is complimentary. We earn from the developer, not from you." },
];

export default function NRIInvestmentPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>NRI Investment</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Invest in India&apos;s <span className="text-gradient">Future</span>, From Anywhere
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Purpose-built investment solutions for Non-Resident Indians.
              We make investing in India as seamless as investing next door.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Globe, title: "Global Access", desc: "Invest from 10+ countries. Virtual tours, remote documentation, doorstep delivery." },
              { icon: Shield, title: "Legal Protection", desc: "FEMA & RBI compliance. Independent legal vetting. Title insurance available." },
              { icon: TrendingUp, title: "Superior Returns", desc: "15–25% annual appreciation. Consistently outperforming other Indian metros." },
            ].map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="glass-card rounded-2xl p-7 text-center group h-full">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-all duration-500">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{b.title}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{b.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              Our <span className="text-gradient">Investment Process</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 0.06}>
                <motion.div whileHover={{ y: -4 }} className="glass-card rounded-2xl p-6 group relative overflow-hidden h-full">
                  <span className="absolute top-4 right-4 text-[48px] font-bold text-white/[0.03] leading-none">{s.num}</span>
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-all duration-500">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{s.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal className="text-center mb-12">
            <SectionLabel>Frequently Asked</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
              NRI <span className="text-gradient">Questions</span>
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

      <ContactSection />
    </>
  );
}
