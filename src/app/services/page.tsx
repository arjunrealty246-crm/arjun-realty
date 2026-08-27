"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ContactSection from "@/components/ContactSection";
import { Search, Shield, TrendingUp, MapPin, Globe, FileText, Phone, ArrowRight, ClipboardCheck, Handshake } from "lucide-react";
import siteConfig from "@/config/site";

const services = [
  {
    icon: Search,
    title: "Property Advisory",
    desc: "Personalized guidance to find the right plots and properties based on your budget, goals, and preferred locations across Hyderabad's growth corridors.",
  },
  {
    icon: Shield,
    title: "Legal Verification",
    desc: "Independent verification of land titles, encumbrance certificates, HMDA/DTCP/FCDA/RERA approvals. Every project is legally vetted before we recommend it.",
  },
  {
    icon: TrendingUp,
    title: "Investment Analysis",
    desc: "Data-driven comparison of projects based on location appreciation, infrastructure development, builder track record, and ROI potential.",
  },
  {
    icon: MapPin,
    title: "Site Visit Assistance",
    desc: "We organize and accompany you on site visits to shortlisted projects. See the plots, meet the developers, and make informed decisions on the ground.",
  },
  {
    icon: Globe,
    title: "NRI Investment Support",
    desc: "Complete remote investment solutions for Non-Resident Indians — virtual tours, digital documentation, RBI-compliant payments, and ongoing portfolio updates.",
  },
  {
    icon: FileText,
    title: "Documentation & Registration",
    desc: "End-to-end support for sale agreements, registration, stamp duty, and post-sale documentation. We handle the paperwork so you don't have to.",
  },
];

const process = [
  { num: "01", title: "Initial Consultation", desc: "We understand your investment goals, budget, preferred locations, and timeline. No obligation, no pressure.", icon: Phone },
  { num: "02", title: "Curated Shortlist", desc: "We present a handpicked selection of verified projects that match your criteria, complete with detailed analysis.", icon: ClipboardCheck },
  { num: "03", title: "Site Visits & Verification", desc: "Explore shortlisted projects on-site with our team. We help you evaluate the location, connectivity, and surroundings.", icon: MapPin },
  { num: "04", title: "Informed Decision", desc: "Receive honest, transparent advice to help you make the best investment decision — backed by market data and our experience.", icon: Handshake },
  { num: "05", title: "Documentation & Registration", desc: "We manage the complete paperwork process from agreement to registration, ensuring every legal detail is covered.", icon: FileText },
  { num: "06", title: "Post-Sale Support", desc: "Ongoing updates on your investment, periodic site visits, and assistance with any future transactions.", icon: TrendingUp },
];

const faqs = [
  { q: "Is Arjun Realty a brokerage or an advisory?", a: "We are an independent real estate advisory, not a brokerage. Our recommendations are unbiased — we work with multiple verified builders and earn from the developer, never from you." },
  { q: "Do you charge any fees for your services?", a: "No. Our advisory services are completely free. There are no consultation charges, no hidden fees, and zero brokerage." },
  { q: "How do you verify project approvals?", a: "We independently verify every project's HMDA, DTCP, FCDA, or RERA approval status, land title, and encumbrance certificate before recommending it." },
  { q: "Can I invest from outside Hyderabad?", a: "Yes. We offer complete remote investment support including virtual site tours, digital documentation, and RBI-compliant payment routing. Our NRI desk handles everything." },
  { q: "What areas do you cover?", a: "We cover all major growth corridors of Hyderabad — ORR zones, Shamshabad, Kollur, Srisailam Highway, Shankarpally, Ibrahimpatnam, Vikarabad, NH-65, and more." },
  { q: "How long does the process take?", a: "From initial consultation to registration, the typical timeline is 2–4 weeks depending on the project and documentation requirements." },
];

export default function ServicesPage() {
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
              { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Our Services</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              End-to-End <span className="text-gradient">Real Estate Advisory</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              From your first consultation to final registration — we handle every step
              of your real estate investment journey with transparency and expertise.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              Our <span className="text-gradient">Core Services</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="glass-card rounded-2xl p-7 group h-full">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-all duration-500">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{s.desc}</p>
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
              Our <span className="text-gradient">Process</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((s, i) => (
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

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-section-alt">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Shield, title: "Zero Brokerage", desc: "Our advisory is completely free. We earn from developers, never from investors. No hidden charges, ever." },
              { icon: ClipboardCheck, title: "100% Verified Projects", desc: "Every project we recommend carries valid HMDA, DTCP, FCDA, or RERA approval with independently verified land titles." },
              { icon: Handshake, title: "Transparent Guidance", desc: "We provide honest, unbiased advice based on market data and ground reality — not sales pitches or false promises." },
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

      {/* FAQ */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal className="text-center mb-12">
            <SectionLabel>Frequently Asked</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
              Common <span className="text-gradient">Questions</span>
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
