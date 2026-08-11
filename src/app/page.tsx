import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import FeaturedBuilders from "@/components/FeaturedBuilders";
import ProjectsSection from "@/components/ProjectsSection";
import WhyHyderabadSection from "@/components/WhyHyderabadSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NRISection from "@/components/NRISection";
import ContactSection from "@/components/ContactSection";
import FounderProfile from "@/components/FounderProfile";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import FaqAccordion from "@/components/FaqAccordion";
import AdvisoryProcess from "@/components/AdvisoryProcess";
import siteConfig from "@/config/site";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import {
  Shield,
  Award,
  Users,
  Handshake,
  TrendingUp,
  HeadphonesIcon,
  ArrowRight,
  Star,
  Download,
  CalendarCheck,
  Building2,
  Phone,
  CheckCircle,
} from "lucide-react";
import { seo } from "@/data/seo";
import { reasons as reasonsData } from "@/data/values";
import { locationMarquee as marqueeItems } from "@/data/navigation";
import { googleReviews } from "@/data/testimonials";
import { homeFaqs as faqs } from "@/data/faqs";
import { testimonialsSection as ts, advisoryProcess, whyHyderabad, nriSection, contactSection, hero } from "@/data/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Shield, Building2, Users, Handshake, TrendingUp, HeadphonesIcon };
const reasons = reasonsData.map(r => ({ ...r, icon: iconMap[r.icon] || Shield }));

export const metadata: Metadata = {
  title: seo.home.title,
  description: seo.home.description,
  openGraph: {
    title: seo.home.title,
    description: seo.home.description,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ── Trust Marquee ── */}
      <section className="py-7 border-y border-white/[0.025] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.008] to-transparent" />
        <div className="marquee-track relative">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center gap-5 mx-7 text-[11px] text-white/12 font-medium tracking-wider uppercase whitespace-nowrap">
              <span className="h-[3px] w-[3px] rounded-full bg-primary/25" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── Featured Builders ── */}
      <FeaturedBuilders />

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Featured Projects ── */}
      <section className="relative pt-28 sm:pt-32 lg:pt-40 overflow-hidden">
        <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.015] -left-48 top-1/3" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Featured Projects</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Curated Opportunities Across <span className="text-gradient">Hyderabad</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              Every project handpicked for legal compliance, infrastructure quality, location advantage, and appreciation potential.
            </p>
          </ScrollReveal>
        </div>
      </section>
      <ProjectsSection />

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Why Choose Us ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-gold/[0.02] -right-64 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-24">
            <SectionLabel>Why Arjun Realty</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Built on <span className="text-gradient">Trust</span>,<br className="hidden sm:block" /> Driven by Results
            </h2>
            <p className="mt-5 text-white/30 max-w-lg mx-auto text-[0.95rem] leading-relaxed">
              We don&apos;t just sell plots. We build lasting wealth
              relationships with every investor who trusts us.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.06}>
                <div className="glass-card rounded-[1.25rem] p-7 sm:p-8 group relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${r.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.25rem]`} />
                  <div className="relative z-10">
                    <div className="h-13 w-13 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                      <r.icon className="h-5.5 w-5.5 text-primary" />
                    </div>
                    <h3 className="text-[15px] font-bold text-white mb-2.5 tracking-[-0.01em]">{r.title}</h3>
                    <p className="text-[13px] text-white/30 leading-[1.7]">{r.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── How We Help You (Advisory Process) ── */}
      <AdvisoryProcess />

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Google Reviews ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.02] left-1/3 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-14 lg:mb-20">
            <SectionLabel>Google Reviews</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Rated <span className="text-gradient">4.9 / 5</span> on Google
            </h2>
            <p className="mt-4 text-white/30 max-w-md mx-auto text-[0.9rem] leading-relaxed">
              Real reviews from real investors. Our reputation is built on
              results, not promises.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-sm text-white/40 font-medium">500+ Reviews</span>
            </div>
          </ScrollReveal>

          <div className="overflow-hidden mb-10">
            <div className="flex gap-5 marquee-track" style={{ animationDuration: "50s" }}>
              {[...googleReviews, ...googleReviews].map((review, i) => (
                <div
                  key={`${review.name}-${i}`}
                  className="glass-card rounded-2xl p-6 min-w-[300px] sm:min-w-[340px] shrink-0 group"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-primary/70 text-primary/70" />
                    ))}
                  </div>
                  <p className="text-[13px] text-white/45 leading-[1.7] mb-4">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center text-[11px] font-bold text-primary/70">
                        {review.name.charAt(0)}
                      </div>
                      <span className="text-[12px] font-semibold text-white/60">{review.name}</span>
                    </div>
                    <span className="text-[10px] text-white/20">{review.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ScrollReveal className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass text-[12px] text-white/35 font-medium">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              4.9 average &middot; 500+ verified reviews
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Book a Free Consultation CTA ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.04] left-1/2 -translate-x-1/2 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Consultation */}
            <ScrollReveal>
              <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.5rem]" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    Free 1-on-1 Consultation
                  </h3>
                  <p className="text-[13px] text-white/35 leading-[1.7] mb-8 flex-1">
                    Speak directly with K. Nagarjuna or a senior advisor. No pitches. No pressure.
                    Just expert guidance on Hyderabad&apos;s best real estate opportunities matched to your goals.
                  </p>
                  <div className="space-y-3">
                    <a
                      href={`${siteConfig.links.wa}?text=Hi%20Arjun%20Realty%2C%20I%27d%20like%20to%20book%20a%20free%20consultation`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-premium inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
                    >
                      <CalendarCheck className="h-4 w-4" /> Book Free Consultation
                    </a>
                    <a
                      href={siteConfig.links.tel}
                      className="btn-glass inline-flex w-full items-center justify-center gap-3 px-8 py-3.5 rounded-full text-[13px] font-semibold text-white/55 border border-white/[0.06] hover:border-primary/20 transition-all duration-500"
                    >
                      <Phone className="h-4 w-4 text-primary" /> {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Download Portfolio */}
            <ScrollReveal delay={0.08}>
              <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.5rem]" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-14 w-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                    <Download className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    Get Project Portfolio
                  </h3>
                  <p className="text-[13px] text-white/35 leading-[1.7] mb-8 flex-1">
                    Download detailed brochures with pricing, floor plans, location maps,
                    and investment projections for all projects across our 4+ partner builders.
                    Everything you need to compare and decide.
                  </p>
                  <a
                    href={`${siteConfig.links.wa}?text=Hi%20Arjun%20Realty%2C%20I%27d%20like%20to%20receive%20the%20project%20portfolio`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass inline-flex w-full items-center justify-center gap-3 px-8 py-4 rounded-full text-[13px] font-semibold text-white/75 border border-white/[0.06] hover:border-primary/20 hover:text-primary transition-all duration-500"
                  >
                    <Download className="h-4 w-4" /> Request Portfolio PDF
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      <InvestmentCalculator />

      <div className="section-divider mx-auto max-w-5xl" />

      <WhyHyderabadSection />

      <div className="section-divider mx-auto max-w-5xl" />

      <NRISection />

      <div className="section-divider mx-auto max-w-5xl" />

      <TestimonialsSection />

      <div className="section-divider mx-auto max-w-5xl" />

      <FounderProfile />

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── FAQ ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[400px] h-[400px] bg-primary/[0.02] -right-32 top-1/3" />
        <div className="mx-auto max-w-[900px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-14 lg:mb-20">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-md mx-auto text-[0.9rem] leading-relaxed">
              Everything you need to know about investing through Arjun Realty.
            </p>
          </ScrollReveal>

          <FaqAccordion items={faqs} />
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      <ContactSection />

      {/* ── Final CTA ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent" />
          <div className="ambient-orb w-[700px] h-[700px] bg-primary/[0.04] left-1/2 -translate-x-1/2 -top-48" />
          <div className="ambient-orb w-[400px] h-[400px] bg-gold/[0.02] right-1/4 -bottom-24" />
        </div>
        <ScrollReveal className="text-center relative z-10 mx-auto max-w-3xl px-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[11px] text-white/30 font-medium mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-pulse" />
            Free, no-obligation consultation — book yours today
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-6">
            Ready to Make Your <span className="text-gradient">Best Real Estate</span> Investment?
          </h2>
          <p className="text-white/30 mb-10 text-[0.95rem] leading-relaxed max-w-lg mx-auto">
            Join 1000+ smart investors who chose Arjun Realty Premium Advisory.
            Speak with K. Nagarjuna directly and get a custom investment plan — free, with zero obligations.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
            {[
              { icon: Shield, label: "Free Consultation" },
              { icon: CheckCircle, label: "No Hidden Charges" },
              { icon: Users, label: "1000+ Investors" },
            ].map((badge, i) => (
              <div key={badge.label} className="flex items-center gap-1.5 text-[11px] text-white/25 font-medium">
                <badge.icon className="h-3.5 w-3.5 text-primary/50" />
                {badge.label}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${siteConfig.links.wa}?text=Hi%20Arjun%20Realty%2C%20I%20want%20to%20start%20investing`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-12 py-5 rounded-full text-[15px] font-semibold text-white glow-primary-strong"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Your Free Consultation
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.tel}
              className="btn-glass inline-flex items-center gap-3 px-10 py-5 rounded-full text-[15px] font-semibold text-white/65"
            >
              <Phone className="h-5 w-5 text-primary" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
