"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ContactSection from "@/components/ContactSection";
import { Globe, Shield, TrendingUp, CheckCircle2, FileText, Phone, ArrowRight, Building, Banknote, MapPin } from "lucide-react";
import Link from "next/link";
import siteConfig from "@/config/site";
import { projects } from "@/data/projects";
import { nriFaqs } from "@/data/faqs";
import { getProjectHref } from "@/lib/project-links";

const INLINE_LINK = /\[([^\]]+)\]\(\/([^)]*)\)/g;

function renderInlineLinks(text: string) {
  const tokens = [...text.matchAll(INLINE_LINK)];
  if (tokens.length === 0) return text;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  for (const match of tokens) {
    if (match.index !== undefined && match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const label = match[1];
    const path = match[2] as string;
    nodes.push(
      <Link key={match.index} href={`/${path}`} className="text-primary font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors">
        {label}
      </Link>
    );
    if (match.index !== undefined) cursor = match.index + match[0].length;
  }
  nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

const steps = [
  { num: "01", title: "Free Consultation", desc: "Connect with our NRI desk via video call. We understand your goals, risk appetite, and investment timeline.", icon: Phone },
  { num: "02", title: "Curated Shortlist", desc: "Receive a personalized portfolio of [vetted projects](/projects) across high-growth corridors like the [ORR ring](/orr), matched to your budget and objectives. The corridor case is set out on [Why Hyderabad](/why-hyderabad).", icon: Building },
  { num: "03", title: "Virtual Tour", desc: "Immersive site visits via high-res video tours, drone footage, and detailed project documentation.", icon: Globe },
  { num: "04", title: "Legal Verification", desc: "Independent title search, encumbrance certificate, and government approval verification. Compare [DTCP vs HMDA vs FCDA approvals](/insights/dtcp-hmda-fcda-approvals-which-to-choose).", icon: FileText },
  { num: "05", title: "Secure Transaction", desc: "RBI & FEMA compliant payment routing. NRE/NRO account support. Complete documentation.", icon: Banknote },
  { num: "06", title: "Registration & Beyond", desc: "End-to-end registration handled remotely. Quarterly updates on your investment's performance.", icon: TrendingUp },
];

// Curated shortlist surfaced for visitors who want to move from the process
// explanation straight to a specific layout. Slugs are hard-coded on purpose:
// the three projects below are all approved and live, which keeps the
// `upcoming-*` projects out of NRI-facing recommendations. Every field rendered
// comes from the shared project record, so nothing here restates project copy.
const projectsSection = {
  label: "Curated Shortlist",
  heading: "Layouts We Walk NRI Buyers Through",
  intro:
    "Three approved layouts in different parts of the Hyderabad market, each carrying a named sanctioning authority — FCDA, HMDA or DTCP — with a different spread of plot sizes, acreage and entry pricing.",
  contextLink: { label: "Why Hyderabad is worth investing in", href: "/why-hyderabad" },
  slugs: ["jb-harmony-woods", "jb-serene-county", "jb-pristine-city"],
};

const faqs = nriFaqs;

export default function NRIInvestmentPage() {
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
              { "@type": "ListItem", position: 2, name: "NRI Investment", item: `${siteConfig.url}/nri-investment` },
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
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>NRI Investment</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              NRI <span className="text-gradient">Property Investment</span> in Hyderabad
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Purpose-built investment solutions for Non-Resident Indians.
              We make investing in India as seamless as investing next door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]"
              >
                Get Free NRI Investment Consultation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
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
              { icon: TrendingUp, title: "Growth Potential", desc: "Explore Hyderabad's high-growth investment corridors with location-specific market insights and project-level due diligence. See where prices are moving in the [Q3 2026 market update](/insights/hyderabad-real-estate-market-update-q3-2026)." },
            ].map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="glass-card rounded-2xl p-7 text-center group h-full">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-all duration-500">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{b.title}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{renderInlineLinks(b.desc)}</p>
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
                  <p className="text-[13px] text-white/35 leading-relaxed">{renderInlineLinks(s.desc)}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Curated projects */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-14 lg:mb-16">
            <SectionLabel>{projectsSection.label}</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              {projectsSection.heading.split("NRI")[0]}
              <span className="text-gradient">NRI</span>
              {projectsSection.heading.split("NRI")[1]}
            </h2>
            <p className="mt-4 text-white/30 max-w-2xl mx-auto text-[0.9rem] leading-relaxed">
              {projectsSection.intro}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projectsSection.slugs.map((slug, i) => {
              const project = projects.find((p) => p.slug === slug);
              if (!project) return null;
              return (
                <ScrollReveal key={project.slug} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -4 }} className="glass-card rounded-2xl p-7 group h-full flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="text-base font-bold text-white tracking-tight">{project.name}</h3>
                      <span className="shrink-0 text-[10px] font-semibold text-primary/70 uppercase tracking-wider bg-primary/[0.08] px-2.5 py-1 rounded-full">
                        {project.badge}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="h-3.5 w-3.5 text-primary/60 shrink-0 mt-0.5" />
                      <p className="text-[12px] text-white/40 leading-relaxed">{project.location}</p>
                    </div>
                    <p className="text-[12px] text-white/35 leading-relaxed mb-5">{project.plotSizes}</p>
                    <div className="mt-auto space-y-1">
                      <p className="text-[11px] text-white/30">
                        <span className="text-white/20">Approval: </span>
                        {project.approval}
                      </p>
                      <p className="text-[11px] text-white/30">
                        <span className="text-white/20">From: </span>
                        <span className="text-primary font-medium">{project.startingPrice}</span>
                      </p>
                    </div>
                    <Link
                      href={getProjectHref(project.slug)}
                      className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-primary hover:gap-3 transition-all duration-300"
                    >
                      {project.name} — view project <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link
              href={projectsSection.contextLink.href}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary/[0.08] border border-primary/15 text-[11px] font-semibold text-primary hover:bg-primary/[0.15] transition-colors duration-300"
            >
              {projectsSection.contextLink.label} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary/[0.08] border border-primary/15 text-[11px] font-semibold text-primary hover:bg-primary/[0.15] transition-colors duration-300"
            >
              Compare all projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
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
