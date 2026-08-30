import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Layers,
  MapPin,
  Clock,
  Route,
  Shield,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Scale,
  Navigation,
  Landmark,
  BadgeCheck,
  Banknote,
  Info,
  HardHat,
  Sparkles,
  PencilLine,
  TriangleAlert,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import siteConfig from "@/config/site";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";

export const metadata: Metadata = {
  title: { absolute: "Shankarpally Real Estate | Arjun Realty" },
  description:
    "Two Shankarpally projects — 45 acres, 100% HMDA & RERA approved with a 25,000 SFT clubhouse; 108 acres pre-launch at ₹25,000/sq. yd. Register for details.",
  keywords: [
    "HMDA approved plots Shankarpally",
    "RERA registered plots Hyderabad",
    "Shankarpally plots",
    "plots in Shankarpally",
    "open plots near Hyderabad",
    "Shankarpally real estate",
    "western Hyderabad real estate",
    "Arjun Realty Shankarpally",
    "invest in Shankarpally",
    "Hyderabad growth corridor",
    "villa plots near Kokapet",
    "Golden Triangle Hyderabad plots",
    "Shankarpally connectivity",
    "Shankarpally villa market",
  ],
  alternates: {
    canonical: siteConfig.url + "/arjun-realty",
  },
  openGraph: {
    title: "Shankarpally Real Estate Opportunities",
    description:
      "Two Shankarpally projects — 45 acres, 100% HMDA & RERA approved with a 25,000 SFT clubhouse; 108 acres pre-launch at ₹25,000/sq. yd. Register for details.",
    url: siteConfig.url + "/arjun-realty",
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: "Shankarpally Opportunities — Arjun Realty" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shankarpally Real Estate Opportunities",
    description:
      "Two Shankarpally projects — 45 acres, 100% HMDA & RERA approved with a 25,000 SFT clubhouse; 108 acres pre-launch at ₹25,000/sq. yd. Register for details.",
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

const corridorHighlights = [
  "Shankarpally–Kandi corridor",
  "Mumbai Highway corridor",
  "Near Julkal Village",
  "Western Hyderabad growth corridor",
];

const currentProject = {
  title: "Shankarpally – 45 Acres",
  status: "HMDA & RERA Approved",
  chips: [
    "HMDA & RERA Approved",
    "Bank Loan Facility",
    "25,000 SFT Clubhouse Included",
    "Direct connectivity to Gachibowli & Neopolis",
  ],
  points: [
    "Located on the Shankarpally–Kandi corridor",
    "Positioned along the Mumbai Highway corridor",
    "Near Julkal Village",
    "100% HMDA approved & RERA registered with clear title & spot registration",
    "Direct connectivity to Gachibowli & Neopolis",
  ],
  note: "100% HMDA approved & RERA registered. A separate project from the 108-acre upcoming opportunity — register for details.",
  waMessage: "Hi Arjun Realty, I would like to enquire about the 45-acre HMDA & RERA approved Shankarpally project.",
};

const upcomingProject = {
  title: "Shankarpally – 108 Acres",
  status: "Pre-Launch",
  chips: ["HMDA Approval In Process", "Pre-Launch Price ₹25,000/Sq. Yd."],
  points: [
    "108-acre premium open plotting community",
    "Approximately 10 minutes from Shankarpally",
    "HMDA approval currently in process",
    "Highway-facing with ORR connectivity",
  ],
  note: "Pre-launch opportunity starting at ₹25,000 per sq. yard. Subject to approvals, market conditions and project progress.",
  waMessage: "Hi Arjun Realty, I would like to enquire about the 108-acre pre-launch Shankarpally project at ₹25,000/sq. yd.",
};

const locationAdvantages = [
  {
    icon: Clock,
    title: "Gachibowli",
    value: "Approximately 30 minutes",
    note: "Travel times are approximate and subject to traffic and route conditions.",
  },
  {
    icon: Clock,
    title: "Neopolis",
    value: "Approximately 25 minutes",
    note: "Travel times are approximate and subject to traffic and route conditions.",
  },
  {
    icon: Clock,
    title: "Shankarpally",
    value: "Approximately 10 minutes",
    note: "Travel times are approximate and subject to traffic and route conditions.",
  },
  {
    icon: Route,
    title: "Gandipet–Shankarpally",
    value: "Proposed Connectivity Development",
    note: "A six-lane highway is proposed — it is a planned development and not yet completed.",
  },
];

const evaluationPoints = [
  {
    icon: MapPin,
    title: "Location & Corridor",
    desc: "Growth corridor positioning and surrounding development.",
  },
  {
    icon: Route,
    title: "Connectivity & Access",
    desc: "Present and proposed road connectivity to major hubs.",
  },
  {
    icon: BadgeCheck,
    title: "Approvals & Documentation",
    desc: "Approval status and the documentation being evaluated.",
  },
  {
    icon: Layers,
    title: "Project Planning & Development",
    desc: "Scale of development and planned infrastructure.",
  },
  {
    icon: Scale,
    title: "Pricing & Value",
    desc: "Pricing in the context of the location and current market.",
  },
  {
    icon: Navigation,
    title: "Short-to-Medium-Term Evaluation",
    desc: "Assessment appropriate to the stage of the opportunity.",
  },
];

const whyShankarpally = [
  {
    icon: Route,
    title: "High-Growth Western Corridor",
    points: [
      "Positioned on the Shankarpally–Kandi corridor in western Hyderabad",
      "Along the Mumbai Highway (NH-65) corridor",
      "One of West Hyderabad's fastest-developing residential and investment belts",
    ],
  },
  {
    icon: Building2,
    title: "IT Hubs & Employment Zones",
    points: [
      "Approx. 20–30 min to the Financial District, Nanakramguda & Gachibowli",
      "Approx. 25 min to Neopolis & Kokapet",
      "Close to Kollur SEZ and the Tellapur growth belt",
    ],
  },
  {
    icon: Landmark,
    title: "Knowledge & Education Belt",
    points: [
      "IIT Hyderabad (Kandi) and GITAM University in the area",
      "Indus International School nearby",
      "A growing knowledge corridor supporting residential demand",
    ],
  },
  {
    icon: Navigation,
    title: "Present & Future Connectivity",
    points: [
      "Mumbai Highway (NH-65) via the Shankarpally–Kandi corridor",
      "ORR (Outer Ring Road) integration",
      "6-lane expansion work in the corridor",
      "Gandipet–Shankarpally six-lane highway — proposed, not yet completed",
    ],
  },
  {
    icon: HardHat,
    title: "Infrastructure & Development",
    points: [
      "Shankarpally railway station & town center within approx. 10 min",
      "Bankable approvals — HMDA & RERA, clear title & spot registration",
      "Plotted communities with underground utilities & fast-track execution",
    ],
  },
  {
    icon: Sparkles,
    title: "Two Curated Opportunities",
    points: [
      "A 45-acre project — 100% HMDA approved & RERA registered",
      "An upcoming 108-acre pre-launch with HMDA approval in process",
      "Present and upcoming entry points into the corridor",
    ],
  },
];

type ComparisonRow = {
  parameter: string;
  projectValue: string;
  marketValue: string;
  verified: "project" | "editable";
};

const marketComparison: ComparisonRow[] = [
  {
    parameter: "Approval Status",
    projectValue: "100% HMDA Approved & RERA Registered",
    marketValue: "Varies by project — verify individually",
    verified: "project",
  },
  {
    parameter: "Sale Model & Title",
    projectValue: "Plot sale with 100% clear title & spot registration",
    marketValue: "Varies by project — verify individually",
    verified: "project",
  },
  {
    parameter: "Bank Loan Facility",
    projectValue: "Available from leading banks to eligible buyers",
    marketValue: "Usually available on approved projects — verify",
    verified: "project",
  },
  {
    parameter: "Plot Sizes Available",
    projectValue: "200, 267, 350 & 500+ sq. yd.",
    marketValue: "Varies by project — verify individually",
    verified: "project",
  },
  {
    parameter: "Clubhouse & Amenities",
    projectValue: "25,000 Sq. Ft. luxury clubhouse — zero extra charges",
    marketValue: "Varies by project — verify individually",
    verified: "project",
  },
  {
    parameter: "Surrounding Villa Price Points",
    projectValue: "₹7 Cr – ₹15–20 Cr (indicative, as currently represented)",
    marketValue: "Verify for accuracy with our research desk",
    verified: "editable",
  },
  {
    parameter: "Plot Price per Sq. Yd. (Current)",
    projectValue: "[Editable — fill verified rate]",
    marketValue: "[Editable — fill verified market rate]",
    verified: "editable",
  },
  {
    parameter: "Villa Price per Sq. Ft.",
    projectValue: "[Editable — fill verified rate]",
    marketValue: "[Editable — fill verified market rate]",
    verified: "editable",
  },
  {
    parameter: "Recent Appreciation / Market Trends",
    projectValue: "[Editable — add verified trend data with date]",
    marketValue: "[Editable — add verified trend data with date]",
    verified: "editable",
  },
];

export default function ArjunRealtyOpportunitiesPage() {
  return (
    <>
      <PageBreadcrumbs items={[{ name: "Arjun Realty – Shankarpally", url: "/arjun-realty" }]} />
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
              <span className="text-white/50">Arjun Realty</span>
            </nav>

            <div className="flex items-start gap-6 mb-8">
              <div className="h-20 w-20 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0 transition-all duration-500">
                <Layers className="h-9 w-9 text-primary" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[11px] text-white/35 font-medium mb-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-pulse" />
                  Curated Real Estate Opportunities
                </div>
                <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-6">
                  Shankarpally — <span className="text-gradient">Current &amp; Upcoming</span>
                  <br className="hidden sm:block" /> Opportunities
                </h1>
                <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-3xl">
                  Arjun Realty curates a shortlist of selected residential opportunities in
                  high-growth locations. The current focus is the Shankarpally corridor in western
                  Hyderabad — with one present project and one upcoming opportunity being highlighted.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-10">
              {["45-Acre — HMDA & RERA Approved", "108-Acre Pre-Launch", "Shankarpally Focus"].map((chip) => (
                <span key={chip} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[11px] text-white/35 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                  {chip}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Why Shankarpally ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Focus Corridor</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Why the <span className="text-gradient">Shankarpally Corridor</span> Is Highlighted
            </h2>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto space-y-6">
            <ScrollReveal>
              <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden">
                <p className="text-white/40 text-[15px] sm:text-base leading-[1.8]">
                  Shankarpally, on the western side of Hyderabad, is an emerging corridor with
                  improving connectivity to major employment and business hubs such as Gachibowli
                  and Neopolis. Its position along the Mumbai Highway corridor makes it a location
                  worth evaluating for residential land opportunities.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyShankarpally.map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={i * 0.05} className="h-full">
                    <div className="glass-card rounded-[1.25rem] p-7 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.25rem]" />
                      <div className="relative z-10">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-[15px] font-bold text-white mb-3 tracking-[-0.01em]">
                          {item.title}
                        </h3>
                        <ul className="space-y-2.5">
                          {item.points.map((point) => (
                            <li key={point} className="flex items-start gap-2.5">
                              <CheckCircle className="h-3.5 w-3.5 text-primary/60 mt-0.5 shrink-0" />
                              <span className="text-[12.5px] text-white/30 leading-[1.7]">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal delay={0.1}>
              <div className="glass-card rounded-[1.5rem] p-6 sm:p-8 border border-amber-500/[0.08] relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="h-4 w-4 text-gold" />
                  </div>
                  <p className="text-[13px] text-white/40 leading-[1.8]">
                    Corridor insights are shared for research. Approximate timings and distances
                    are subject to traffic and route conditions. Specific figures — surrounding
                    market prices, project timelines and proposed infrastructure — must be
                    independently verified before any investment decision.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
            {corridorHighlights.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.05}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[11px] text-white/35 font-medium">
                  <CheckCircle className="h-3.5 w-3.5 text-primary/50" />
                  {item}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Current & Upcoming Opportunities ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.02] -left-48 top-1/3" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Featured Opportunities</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Two Shankarpally <span className="text-gradient">Opportunities</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              One present project and one upcoming opportunity — curated for evaluation.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {/* 45 Acres — Current Project */}
            <ScrollReveal className="h-full">
              <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                <div className="flex items-center justify-between mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Landmark className="h-6 w-6 text-primary" />
                  </div>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full glass text-[10px] font-medium text-white/50 uppercase tracking-wider">
                    {currentProject.status}
                  </span>
                </div>
                <h3 className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-bold text-gradient tracking-tight mb-5">
                  {currentProject.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProject.chips.map((chip) => (
                    <span key={chip} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/[0.06] text-[10px] text-primary/70 font-medium uppercase tracking-wider">
                      {chip === "HMDA & RERA Approved" ? <BadgeCheck className="h-3 w-3" /> : chip === "Bank Loan Facility" ? <Banknote className="h-3 w-3" /> : chip === "25,000 SFT Clubhouse Included" ? <Landmark className="h-3 w-3" /> : chip === "Direct connectivity to Gachibowli & Neopolis" ? <Route className="h-3 w-3" /> : null}
                      {chip}
                    </span>
                  ))}
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {currentProject.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary/60 mt-0.5 shrink-0" />
                      <span className="text-[13.5px] text-white/55 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] text-white/30 leading-[1.7] mb-8">{currentProject.note}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    href="/projects/shankarpally-45-acres"
                    className="btn-premium inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[12px] font-semibold text-white glow-primary-strong"
                  >
                    Explore Project <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={`${siteConfig.links.wa}?text=${encodeURIComponent(currentProject.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[12px] font-semibold text-white/55 border border-white/[0.06] hover:border-primary/20 transition-all duration-500"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-primary" /> Enquire Now
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* 108 Acres — Upcoming Opportunity */}
            <ScrollReveal delay={0.08} className="h-full">
              <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                <div className="flex items-center justify-between mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full glass text-[10px] font-medium text-white/50 uppercase tracking-wider">
                    {upcomingProject.status}
                  </span>
                </div>
                <h3 className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-bold text-gradient tracking-tight mb-5">
                  {upcomingProject.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {upcomingProject.chips.map((chip) => (
                    <span key={chip} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/[0.06] text-[10px] text-primary/70 font-medium uppercase tracking-wider">
                      {chip === "HMDA Approval In Process" ? <Shield className="h-3 w-3" /> : chip.startsWith("Pre-Launch Price") ? <Banknote className="h-3 w-3" /> : null}
                      {chip}
                    </span>
                  ))}
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {upcomingProject.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary/60 mt-0.5 shrink-0" />
                      <span className="text-[13.5px] text-white/55 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] text-gold/60 leading-[1.7] mb-8">{upcomingProject.note}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    href="/projects/upcoming-shankarpally"
                    className="btn-premium inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[12px] font-semibold text-white glow-primary-strong"
                  >
                    Explore Project <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={`${siteConfig.links.wa}?text=${encodeURIComponent(upcomingProject.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[12px] font-semibold text-white/55 border border-white/[0.06] hover:border-primary/20 transition-all duration-500"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-primary" /> Enquire Now
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Villa & Residential Market Comparison ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.02] -right-48 top-1/4" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Villa &amp; Residential Market Context</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Shankarpally vs. the <span className="text-gradient">Surrounding Market</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              A comparison framework using information already present in our project data.
              Rows marked editable are to be verified and populated by our team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/[0.06] text-[11px] text-emerald-400/80 font-medium">
                <BadgeCheck className="h-3.5 w-3.5" /> From existing project data
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/[0.06] text-[11px] text-amber-400/80 font-medium">
                <PencilLine className="h-3.5 w-3.5" /> Editable — to verify &amp; populate
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card-elevated rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      <th className="px-6 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">
                        Parameter
                      </th>
                      <th className="px-6 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">
                        Shankarpally — 45-Acre Project
                      </th>
                      <th className="px-6 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">
                        Surrounding Villa &amp; Plot Market
                      </th>
                      <th className="px-6 py-4 text-right text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">
                        Data Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketComparison.map((row) => (
                      <tr
                        key={row.parameter}
                        className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors duration-200"
                      >
                        <td className="px-6 py-4 align-top">
                          <span className="text-[12.5px] font-semibold text-white/70 leading-relaxed">
                            {row.parameter}
                          </span>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <span className="text-[12px] text-white/45 leading-relaxed">{row.projectValue}</span>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <span className="text-[12px] text-white/45 leading-relaxed">{row.marketValue}</span>
                        </td>
                        <td className="px-6 py-4 text-right align-top">
                          {row.verified === "project" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/[0.06] text-[10px] text-emerald-400/80 font-medium whitespace-nowrap">
                              <BadgeCheck className="h-3 w-3" /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/[0.06] text-[10px] text-amber-400/80 font-medium whitespace-nowrap">
                              <PencilLine className="h-3 w-3" /> To Verify
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-white/[0.04] flex items-center gap-3">
                <TriangleAlert className="h-4 w-4 text-gold/70 shrink-0" />
                <p className="text-[11px] text-white/30 leading-relaxed">
                  No fabricated figures used. Editable rows are placeholders to be replaced with
                  independently verified data before publication to end customers.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Location & Connectivity ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Location &amp; Connectivity</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Connectivity Around <span className="text-gradient">Shankarpally</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              Approximate travel references — actual times vary with traffic and route conditions.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {locationAdvantages.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.06} className="h-full">
                  <div className="glass-card rounded-[1.25rem] p-7 sm:p-8 text-center h-full group relative overflow-hidden">
                    <div className="h-12 w-12 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-[14px] font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-[13px] text-primary/70 font-medium leading-relaxed">{item.value}</p>
                    <p className="mt-3 text-[11px] text-white/25 leading-relaxed">{item.note}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Investment Evaluation Points ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-gold/[0.02] -right-64 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>Evaluation Framework</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
              Points Used to <span className="text-gradient">Evaluate an Opportunity</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              Outcomes depend on approvals, market conditions and project progress.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {evaluationPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <ScrollReveal key={point.title} delay={i * 0.05} className="h-full">
                  <div className="glass-card rounded-[1.25rem] p-7 group relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.25rem]" />
                    <div className="relative z-10">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-[15px] font-bold text-white mb-2.5 tracking-[-0.01em]">
                        {point.title}
                      </h3>
                      <p className="text-[12.5px] text-white/30 leading-[1.7]">{point.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Disclaimer ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-4xl mx-auto">
            <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Info className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-white mb-3 tracking-[-0.01em]">
                    Important Disclaimer
                  </h3>
                  <div className="space-y-3 text-[13.5px] text-white/40 leading-[1.8]">
                    <p>
                      Appreciation and returns are market-dependent and not guaranteed. Any expected
                      or targeted appreciation timeframe is presented only as a target and is not a
                      guarantee of returns.
                    </p>
                    <p>
                      Early-stage opportunities carry risk — outcomes are subject to approvals,
                      market conditions and project progress.
                    </p>
                    <p>
                      Please conduct your own independent due diligence before making any property
                      decision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Final CTA ── */}
      <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent" />
          <div className="ambient-orb w-[700px] h-[700px] bg-primary/[0.04] left-1/2 -translate-x-1/2 -top-48" />
        </div>
        <ScrollReveal className="text-center relative z-10 mx-auto max-w-3xl px-5">
          <SectionLabel>Arjun Realty</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-8">
            Interested in the <span className="text-gradient">Shankarpally Opportunities?</span>
          </h2>
          <p className="text-white/30 mb-10 text-[0.95rem] leading-relaxed max-w-lg mx-auto">
            Get detailed information about the 45-acre HMDA & RERA approved project
            or the 108-acre pre-launch opportunity starting at ₹25,000/sq. yd.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects/shankarpally-45-acres"
              className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-10 py-4 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
            >
              Explore Project <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`${siteConfig.links.wa}?text=${encodeURIComponent("Hi Arjun Realty, I would like to know more about the Shankarpally opportunities.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass inline-flex items-center gap-3 px-10 py-4 rounded-full text-[13px] font-semibold text-white/55 border border-white/[0.06] hover:border-primary/20 transition-all duration-500"
            >
              <MessageCircle className="h-4 w-4 text-primary" /> Enquire Now
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
