import Link from "next/link";
import {
  Users,
  ListFilter,
  MapPin,
  TrendingUp,
  Map,
  CreditCard,
  FileSignature,
  HeartHandshake,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Target,
  Wallet,
  BadgeCheck,
  Route,
  Landmark,
  Compass,
  Bell,
  LifeBuoy,
  FileCheck,
  ClipboardCheck,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import siteConfig from "@/config/site";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";

const roles = [
  "Property Advisor",
  "Property Selection Guidance",
  "Investment Planning Support",
  "Location & Project Evaluation",
  "Budget-Based Property Suggestions",
  "Site Visit Coordination",
  "Documentation & Registration Support",
  "Post-Purchase Property Support",
];

const decisionFactors = [
  { icon: Users, label: "Client Requirement" },
  { icon: Target, label: "Investment Purpose" },
  { icon: Wallet, label: "Budget" },
  { icon: MapPin, label: "Location Preference" },
  { icon: BadgeCheck, label: "Project Approvals" },
  { icon: Route, label: "Connectivity" },
  { icon: TrendingUp, label: "Development Potential" },
  { icon: Landmark, label: "Future Infrastructure" },
  { icon: Compass, label: "Project Planning & Surrounding Development" },
];

const helpCards = [
  {
    icon: Users,
    title: "Requirement Understanding",
    desc: "Understand the client's budget, purpose, preferred location and expectations.",
  },
  {
    icon: ListFilter,
    title: "Property Shortlisting",
    desc: "Shortlist suitable projects instead of showing unnecessary properties.",
  },
  {
    icon: MapPin,
    title: "Location & Project Evaluation",
    desc: "Evaluate connectivity, surrounding development, approvals, infrastructure and project fundamentals.",
  },
  {
    icon: TrendingUp,
    title: "Investment Planning",
    desc: "Help clients structure their property purchase according to their budget and investment objective.",
  },
  {
    icon: Map,
    title: "Site Visit Support",
    desc: "Coordinate site visits and explain the project, location, layout and available options clearly.",
  },
  {
    icon: CreditCard,
    title: "Payment Schedule Support",
    desc: "Guide clients through booking, payment schedules and required documentation.",
  },
  {
    icon: FileSignature,
    title: "Registration & Documentation Support",
    desc: "Support the client through documentation, registration coordination, document submission and handover processes.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Purchase Support",
    desc: "Continue supporting clients even after purchase with property-related assistance.",
  },
];

const journeySteps = [
  {
    icon: Users,
    title: "Requirement",
    desc: "We begin by understanding your budget, purpose, preferred location and long-term objectives.",
  },
  {
    icon: ListFilter,
    title: "Shortlisting",
    desc: "Suitable projects are shortlisted based on your specific requirement — not a random list of options.",
  },
  {
    icon: Map,
    title: "Site Visit",
    desc: "Site visits are coordinated and the project, location, layout and available options are explained clearly.",
  },
  {
    icon: CheckCircle,
    title: "Property Selection",
    desc: "You evaluate the shortlisted options and select the property that best fits your requirement.",
  },
  {
    icon: ClipboardCheck,
    title: "Booking",
    desc: "Booking is completed with a clear explanation of the process, amounts and next steps.",
  },
  {
    icon: CreditCard,
    title: "Payment Schedule",
    desc: "Payment schedules are structured and explained in line with the project's terms.",
  },
  {
    icon: FileSignature,
    title: "Registration",
    desc: "Registration is coordinated with documentation support throughout the process.",
  },
  {
    icon: FileCheck,
    title: "Document Handover",
    desc: "All documents are compiled, verified and handed over after the transaction.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Purchase Support",
    desc: "Periodic support continues after purchase, including property status and maintenance coordination where applicable.",
  },
];

const postPurchaseCare = [
  "Periodic property status updates",
  "Plot maintenance coordination where applicable",
  "Plot cleaning coordination approximately once every 6 months, subject to project/site accessibility and applicable arrangements",
  "Monitoring surrounding development",
  "Updates regarding major nearby infrastructure/development",
  "Project progress updates",
  "Property-related documentation/support when required",
];

const updateSupport = [
  "Project development",
  "Surrounding construction/activity",
  "Infrastructure developments",
  "Connectivity improvements",
  "Important local developments",
  "Project-related progress",
];

const whyChoose = [
  "Requirement-first approach",
  "Budget-conscious property selection",
  "Location-focused evaluation",
  "Clear project explanation",
  "End-to-end transaction support",
  "Documentation and registration assistance",
  "Post-purchase support",
  "Long-term client relationship",
];

export default function AboutPage() {
  return (
    <>
      <PageBreadcrumbs items={[{ name: "About", url: "/about" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": `${siteConfig.url}/about#aboutpage`,
            name: "About Arjun Realty",
            url: `${siteConfig.url}/about`,
            description:
              "Arjun Realty is built around one simple principle — the right property should match the right requirement, budget and location.",
            inLanguage: "en-IN",
            isPartOf: { "@id": `${siteConfig.url}/#website` },
            mainEntity: { "@id": `${siteConfig.url}/#organization` },
          }),
        }}
      />
      {/* ── Section 1: About Arjun ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.04] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>About Arjun Realty</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Arjun — <span className="text-gradient">Your Property Advisor</span>
            </h1>
            <p className="mt-7 text-[clamp(1.15rem,2.4vw,1.5rem)] font-semibold text-white/85 leading-relaxed max-w-2xl">
              &ldquo;Arjun Realty is built around one simple principle — the right
              property should match the right requirement, budget and location.&rdquo;
            </p>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              Arjun helps clients make property decisions based on their individual
              requirement, investment purpose, budget and location preference — while
              carefully reviewing project approvals, connectivity, development
              potential, future infrastructure, and surrounding project planning.
              Rather than simply showing properties, Arjun helps the client evaluate
              and select a suitable opportunity based on their specific needs.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-10">
            <div className="flex flex-wrap gap-2.5 max-w-3xl">
              {roles.map((r) => (
                <span
                  key={r}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary/[0.06] text-[10px] text-primary/70 font-medium uppercase tracking-wider border border-primary/10"
                >
                  <CheckCircle className="h-3 w-3 text-primary/50" />
                  {r}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Decision Factors ── */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-14">
            <SectionLabel>Decision Factors</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              What Arjun <span className="text-gradient">Considers First</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              Every suggestion is built around the client&apos;s requirement — never the
              other way around.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {decisionFactors.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={f.label} delay={i * 0.04} className="h-full">
                  <div className="glass-card rounded-[1.25rem] p-6 flex items-center gap-4 h-full group relative overflow-hidden">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-[13.5px] font-semibold text-white/80 leading-snug">
                      {f.label}
                    </h3>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Section 2: How Arjun Helps Clients ── */}
      <section className="py-20 lg:py-28 bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.05] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-14">
            <SectionLabel>How Arjun Helps Clients</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              End-to-End Support, <span className="text-gradient">From Enquiry to Beyond</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              Structured guidance at every stage of the property decision.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {helpCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.title} delay={i * 0.05} className="h-full">
                  <div className="glass-card rounded-[1.25rem] p-7 group relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-[15px] font-bold text-white mb-2.5 tracking-[-0.01em]">
                      {card.title}
                    </h3>
                    <p className="text-[12.5px] text-white/30 leading-[1.7]">{card.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Section 3: Client Service Journey ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-14">
            <SectionLabel>Client Service Journey</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              A Clear Path from <span className="text-gradient">Requirement to Ownership</span>
            </h2>
          </ScrollReveal>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
            <div className="space-y-6">
              {journeySteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal key={step.title} delay={i * 0.04}>
                    <div className="relative pl-[4.5rem] sm:pl-24">
                      <div className="absolute left-0 top-0 h-14 w-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="glass-card rounded-2xl p-6 sm:p-7">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-bold text-primary/60 tracking-[0.2em]">
                            STEP {i + 1}
                          </span>
                          <h3 className="text-[15px] font-bold text-white tracking-[-0.01em]">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-[13px] text-white/35 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Section 4: Post-Purchase Property Care ── */}
      <section className="py-20 lg:py-28 bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.05] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-5xl mx-auto">
            <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="flex items-start gap-5 sm:gap-6">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <LifeBuoy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <SectionLabel>Post-Purchase Property Care</SectionLabel>
                  <h2 className="mt-5 text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em]">
                    Support That Continues <span className="text-gradient">After the Purchase</span>
                  </h2>
                  <p className="mt-4 text-white/40 max-w-2xl text-[0.95rem] leading-relaxed">
                    Arjun Realty aims to provide continued support after the property
                    purchase, so clients stay informed and assisted wherever applicable.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {postPurchaseCare.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3.5"
                  >
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-[13px] text-white/60 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-7 text-[12px] text-white/25 leading-relaxed max-w-3xl">
                Support services are provided on a best-effort basis and are subject to
                project/site accessibility, applicable arrangements and the cooperation
                of relevant parties. Post-purchase assistance does not constitute a
                guarantee of property value or investment returns.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Section 5: Development & Project Update Support ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <SectionLabel>Development & Project Update Support</SectionLabel>
                  <h2 className="mt-5 text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em]">
                    Periodic Updates on <span className="text-gradient">Development &amp; Progress</span>
                  </h2>
                  <p className="mt-4 text-white/40 text-[0.95rem] leading-relaxed">
                    Clients can receive periodic updates on the development around and
                    within their chosen project. This is a client-support feature — it is
                    not a promise of appreciation or guaranteed returns.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {updateSupport.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3.5"
                  >
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-[13px] text-white/60 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Section 6: Why Clients Choose Arjun ── */}
      <section className="py-20 lg:py-28 bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.05] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-14">
            <SectionLabel>Why Clients Choose Arjun</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">
              Built on <span className="text-gradient">Requirement-First Advice</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {whyChoose.map((point, i) => (
              <ScrollReveal key={point} delay={i * 0.05} className="h-full">
                <div className="glass-card rounded-[1.25rem] p-6 flex items-start gap-3.5 h-full group relative overflow-hidden">
                  <BadgeCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-[13.5px] text-white/70 font-medium leading-relaxed">
                    {point}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Section 7: Arjun's Approach ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-4xl mx-auto text-center">
            <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
              <div className="text-6xl font-bold text-gradient leading-none">&ldquo;</div>
              <p className="text-[clamp(1.3rem,3vw,2rem)] font-bold text-white leading-snug tracking-[-0.02em]">
                Property selection is not just about buying a plot. It is about
                understanding the requirement, evaluating the opportunity and making a
                well-informed decision.
              </p>
              <p className="mt-6 text-white/40 text-[0.95rem] leading-relaxed max-w-2xl mx-auto">
                Arjun focuses on helping clients make informed property decisions rather
                than pushing a particular property. Every recommendation is matched to the
                client&apos;s requirement, budget, preferred location and long-term objectives.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Section 8: Final CTA ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent" />
          <div className="ambient-orb w-[700px] h-[700px] bg-primary/[0.04] left-1/2 -translate-x-1/2 -top-48" />
        </div>
        <ScrollReveal className="text-center relative z-10 mx-auto max-w-3xl px-5">
          <SectionLabel>Talk to Arjun</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-8">
            Looking for the <span className="text-gradient">Right Property</span> for Your Requirement?
          </h2>
          <p className="text-white/30 mb-10 text-[0.95rem] leading-relaxed max-w-lg mx-auto">
            Share your budget, preferred location and purpose — get guidance matched to
            your specific requirement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun, I am looking for the right property for my requirement. I would like guidance on budget, location and suitable options.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-10 py-4 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
            >
              <MessageCircle className="h-4 w-4" /> Talk to Arjun
            </a>
            <Link
              href="/projects"
              className="btn-glass inline-flex items-center gap-3 px-10 py-4 rounded-full text-[13px] font-semibold text-white/55 hover:text-white/80 transition-all duration-500"
            >
              Explore Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
