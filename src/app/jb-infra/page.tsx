import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Award,
  Layers,
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
  Compass,
  Target,
  Shield,
  Route,
  HeartHandshake,
  Landmark,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "JB Infra — Company Profile",
  description:
    "JB Infra — established in 2001 with 20+ completed projects, 6 ongoing projects, 3,500+ acres of open plot development and 25,000+ satisfied customers across Hyderabad.",
  openGraph: {
    title: "JB Infra — Building Trust. Creating Value. Shaping Tomorrow.",
    description:
      "Explore the JB Infra company profile — planned open plot communities, infrastructure-led development and long-term customer value since 2001.",
  },
};

const journeyStats = [
  { value: "2001", label: "Established", icon: Calendar },
  { value: "20+", label: "Completed Projects", icon: Award },
  { value: "6", label: "Ongoing Projects", icon: Layers },
  { value: "3,500+", label: "Acres Developed", icon: MapPin },
  { value: "25,000+", label: "Satisfied Customers", icon: Users },
];

const experienceAreas = [
  {
    icon: Compass,
    title: "Open Plot Development",
    desc: "Deep expertise in crafting open plot communities designed for planned growth and long-term value.",
  },
  {
    icon: Landmark,
    title: "Planned Layouts",
    desc: "Thoughtfully planned layouts with clear zoning, wide roads and structured development.",
  },
  {
    icon: Route,
    title: "Infrastructure Development",
    desc: "Focus on complete infrastructure — roads, drainage, electricity and amenities that make communities livable.",
  },
  {
    icon: MapPin,
    title: "Growth-Oriented Locations",
    desc: "Selection of locations with strong development potential and improving connectivity.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-Focused Approach",
    desc: "Transparent processes, honest communication and support at every step of the journey.",
  },
  {
    icon: Target,
    title: "Long-Term Value Creation",
    desc: "Building developments that are designed to serve customers well into the future.",
  },
];

const visionPillars = [
  "Strategic location selection",
  "Infrastructure and connectivity",
  "Planned development",
  "Emerging growth corridors",
  "Customer trust",
  "Long-term real estate value",
  "Continuous development of new projects",
];

const trustPoints = [
  "Established in 2001",
  "20+ completed projects",
  "6 ongoing projects",
  "3,500+ acres of open plot development",
  "25,000+ satisfied customers",
];

export default function JBInfraProfilePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[700px] h-[700px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="ambient-orb w-[500px] h-[500px] bg-gold/[0.02] -left-40 bottom-0" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <nav className="flex items-center gap-2 mb-10 text-xs">
              <Link href="/" className="flex items-center gap-1 text-white/25 hover:text-primary/60 transition-colors duration-300">
                <Building2 className="h-3 w-3" /> Home
              </Link>
              <span className="text-white/10">/</span>
              <span className="text-white/50">JB Infra</span>
            </nav>

            <div className="flex items-start gap-6 mb-8">
              <div className="h-20 w-20 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:glow-primary transition-all duration-500">
                <Building2 className="h-9 w-9 text-primary" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[11px] text-white/35 font-medium mb-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-pulse" />
                  Company Profile
                </div>
                <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-6">
                  JB Infra – <span className="text-gradient">Building Trust.</span>
                  <br className="hidden sm:block" /> Creating Value. Shaping Tomorrow.
                </h1>
                <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-3xl">
                  Since 2001, JB Infra has been developing real estate with a focus on
                  open plot communities, planned development and long-term customer value —
                  growing into one of Hyderabad&apos;s established names in plotted development.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Company Journey ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.02] -left-48 top-1/3" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Company Journey</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Two Decades of <span className="text-gradient">Development Excellence</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              A journey built on consistent development, planned communities and the trust of
              thousands of customers.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {journeyStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={stat.label} delay={i * 0.06} className="h-full">
                  <div className="glass-card rounded-[1.25rem] p-7 text-center group relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="h-12 w-12 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-gradient tracking-tight">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-[11px] text-white/30 uppercase tracking-wider font-medium">
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── About JB Infra ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>About JB Infra</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              A Legacy of <span className="text-gradient">Trusted Development</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-6">
            <ScrollReveal>
              <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden">
                <p className="text-white/40 text-[15px] sm:text-base leading-[1.8]">
                  JB Infra has built its journey through consistent real estate development,
                  planned open plot communities, customer-focused execution and a long-term vision.
                  What began in 2001 has grown into a name recognized for reliability, transparency
                  and well-executed plotted developments across Hyderabad.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="glass-card rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden">
                <p className="text-white/40 text-[15px] sm:text-base leading-[1.8]">
                  The company continues to focus on creating well-planned developments in
                  growth-oriented locations — always with an emphasis on infrastructure quality,
                  legal compliance and the long-term interests of every customer.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Our Experience ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.02] -right-48 top-1/3" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Our Experience</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Deep Experience in <span className="text-gradient">Plotted Development</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              Years of focused execution across the fundamentals of great real estate development.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {experienceAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <ScrollReveal key={area.title} delay={i * 0.06} className="h-full">
                  <div className="glass-card rounded-[1.25rem] p-7 sm:p-8 group relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.25rem]" />
                    <div className="relative z-10">
                      <div className="h-13 w-13 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-[16px] font-bold text-white mb-2.5 tracking-[-0.01em]">
                        {area.title}
                      </h3>
                      <p className="text-[13px] text-white/30 leading-[1.7]">{area.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Completed & Ongoing Projects ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Our Portfolio</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Completed &amp; <span className="text-gradient">Ongoing Projects</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              A track record of delivery — with more communities currently in development.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <ScrollReveal className="h-full">
              <div className="glass-card-elevated rounded-[1.5rem] p-10 sm:p-12 text-center relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                <div className="h-14 w-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="text-[clamp(3rem,6vw,4.5rem)] font-bold text-gradient tracking-tight leading-none">
                  20+
                </div>
                <p className="mt-3 text-[12px] text-white/35 uppercase tracking-[0.2em] font-medium">
                  Completed Projects
                </p>
                <p className="mt-5 text-[13px] text-white/30 leading-relaxed">
                  Two decades of delivered open plot communities across growth-oriented corridors.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08} className="h-full">
              <div className="glass-card-elevated rounded-[1.5rem] p-10 sm:p-12 text-center relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                <div className="h-14 w-14 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                  <Layers className="h-6 w-6 text-gold" />
                </div>
                <div className="text-[clamp(3rem,6vw,4.5rem)] font-bold text-gradient tracking-tight leading-none">
                  6
                </div>
                <p className="mt-3 text-[12px] text-white/35 uppercase tracking-[0.2em] font-medium">
                  Ongoing Projects
                </p>
                <p className="mt-5 text-[13px] text-white/30 leading-relaxed">
                  New communities in development — continuing the commitment to planned, quality
                  open plot living.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Growth & Development Vision ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.02] -left-48 top-1/3" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Growth &amp; Vision</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Driven by <span className="text-gradient">Planned Growth</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-2xl mx-auto text-[0.95rem] leading-relaxed">
              JB Infra&apos;s growth is built on disciplined location selection, quality
              infrastructure and a long-term view of real estate value — never on promises of
              guaranteed returns.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {visionPillars.map((pillar, i) => (
              <ScrollReveal key={pillar} delay={i * 0.05} className="h-full">
                <div className="glass-card rounded-[1.25rem] p-6 flex items-start gap-4 h-full group relative overflow-hidden">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                    <CheckCircle className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <p className="text-[14px] font-medium text-white/70 leading-relaxed">{pillar}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Why Customers Trust JB Infra ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Why Customers Trust Us</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Trust Earned Over <span className="text-gradient">Two Decades</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              Numbers that reflect the confidence customers have placed in JB Infra.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {trustPoints.map((point, i) => (
              <ScrollReveal key={point} delay={i * 0.05} className="h-full">
                <div className="glass-card rounded-[1.25rem] p-6 text-center h-full group relative overflow-hidden">
                  <div className="h-11 w-11 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-[13px] font-semibold text-white/70 leading-snug">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Future Vision ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-gold/[0.02] -right-64 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <SectionLabel>Future Vision</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Building the <span className="text-gradient">Communities of Tomorrow</span>
            </h2>
            <p className="mt-6 text-white/40 text-[15px] sm:text-base leading-[1.8]">
              JB Infra&apos;s vision is to continue developing quality open plot communities and
              contributing to the growth of emerging locations — while maintaining the customer
              trust and development standards that have defined the company since 2001.
            </p>
            <p className="mt-5 text-white/40 text-[15px] sm:text-base leading-[1.8]">
              Every new development is approached with the same discipline: planned layouts, solid
              infrastructure, compliance-first execution and a focus on long-term value for every
              customer.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── CTA ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent" />
          <div className="ambient-orb w-[700px] h-[700px] bg-primary/[0.04] left-1/2 -translate-x-1/2 -top-48" />
        </div>
        <ScrollReveal className="text-center relative z-10 mx-auto max-w-3xl px-5">
          <SectionLabel>JB Infra</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-8">
            Explore <span className="text-gradient">JB Infra Projects</span>
          </h2>
          <p className="text-white/30 mb-10 text-[0.95rem] leading-relaxed max-w-lg mx-auto">
            Discover the open plot communities and planned developments JB Infra is building
            across Hyderabad&apos;s growth-oriented corridors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-10 py-4 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/builders"
              className="btn-glass inline-flex items-center gap-3 px-10 py-4 rounded-full text-[13px] font-semibold text-white/55 border border-white/[0.06] hover:border-primary/20 transition-all duration-500"
            >
              <Building2 className="h-4 w-4 text-primary" /> Back to Builders
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
