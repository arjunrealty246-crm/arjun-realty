"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  ChevronDown,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Banknote,
  LandPlot,
  HardHat,
  Sparkles,
  TrendingUp,
  Route,
  School,
  Briefcase,
  BadgeCheck,
  Timer,
  Train,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectBySlug } from "@/data/projects";
import siteConfig from "@/config/site";
import { submitLead } from "@/lib/lead-client";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import BrochureDownload from "@/components/BrochureDownload";
import SiteVisitModal from "@/components/SiteVisitModal";
import StickyCTABar from "@/components/showcase/StickyCTABar";

const project: Project = {
  slug: "shankarpally-45-acres",
  name: "Shankarpally 45 Acres Premium Layout",
  builder: "jb-infra",
  projectType: "Premium Villa Plotted Development",
  approval: "HMDA Approved & RERA Registered",
  location: "Near Julkal Village, Shankarpally, West Hyderabad",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Julkal%20Village%2C%20Shankarpally%2C%20Hyderabad",
  price: "Contact for Price",
  startingPrice: "Verified Pricing on Request",
  status: "HMDA & RERA Approved",
  badge: "HMDA & RERA Approved",
  isUpcoming: false,
  totalAcres: "45",
  plotSizes: "200, 267, 350 & 500+ Sq. Yds.",
  amenities: [
    "25,000 Sq. Ft. Grand Luxury Clubhouse (Zero Extra Charges)",
    "100% Underground Electricity Cabling",
    "Underground Drainage Network",
    "Dedicated Water Pipeline",
    "Wide BT Roads with Kerb Stones",
    "Paver Footpaths",
    "Designer Entrance Arch",
    "Avenue Plantation & Landscaping",
  ],
  connectivity: [
    "Mumbai Highway (NH-65) via the Shankarpally–Kandi corridor",
    "6-lane highway expansion work in the corridor",
    "ORR (Outer Ring Road) integration",
    "Proximity to Kollur SEZ & the Tellapur growth belt",
    "Shankarpally Railway Station within minutes",
  ],
  nearbyLandmarks: [
    "Shankarpally Railway Station & Town Center",
    "IIT Hyderabad (Kandi)",
    "GITAM University",
    "Indus International School",
    "Kollur SEZ & Tellapur growth belt",
    "Gachibowli, Nanakramguda & the Financial District",
    "Neopolis & Kokapet",
  ],
  investmentHighlights: [
    "100% HMDA approved & RERA registered — bankable plots with clear title & spot registration",
    "The Golden Triangle — Kokapet/Neopolis, Shankarpally & IIT Hyderabad/Kandi",
    "Seamless 20–30 min drive to the Financial District, Nanakramguda, Gachibowli & Neopolis",
    "Proximity to Kollur SEZ, the Tellapur growth belt & ORR",
    "Ultra-luxury villa ventures commanding ₹7 Cr to ₹15–20 Cr nearby",
    "25,000 Sq. Ft. luxury clubhouse included with zero extra charges",
  ],
  highlights: [
    "100% HMDA Approved & RERA Registered",
    "Bank Loan Facility Available from Leading Banks",
    "100% Clear Title with Spot Registration",
    "Massive 25,000 Sq. Ft. Luxury Clubhouse (Zero Extra Charges)",
  ],
  bankLoanAvailable: true,
  brochureUrl: "",
  image: "",
  images: [],
  locationAdvantages: [
    "~10 mins to Shankarpally Railway Station & Town Center",
    "Direct access to the Shankarpally–Kandi Corridor & NH-65 (Mumbai Highway)",
    "Quick drive to IIT Hyderabad, GITAM University & Indus International School",
    "Seamless 20–30 mins to the Financial District, Nanakramguda, Gachibowli & Neopolis via 6-lane expanded radial roads",
    "Kollur SEZ, Tellapur growth belt & ORR within easy reach",
  ],
  whyInvest: [
    "100% HMDA approved and RERA registered — clear titles, spot registration and bank loan facility from leading banks for a fully bankable investment.",
    "Positioned on West Hyderabad's Premier Growth Corridor — the Golden Triangle connecting Kokapet/Neopolis, Shankarpally and IIT Hyderabad/Kandi.",
    "Seamless 20–30 minute drive to the Financial District, Nanakramguda, Gachibowli and Neopolis via 6-lane expanded radial roads, with Kollur SEZ, the Tellapur growth belt and ORR minutes away.",
    "An ultra-premium micro-market where surrounding luxury villa ventures command ₹7 Cr to ₹15–20 Cr — assuring exponential plotted land appreciation.",
    "The fastest-developing gated plotting community in Shankarpally — with a 25,000 sq. ft. luxury clubhouse and aggressive on-ground execution.",
  ],
  description:
    "A 100% HMDA approved and RERA registered 45-acre premium villa plotted development near Julkal Village, Shankarpally — on West Hyderabad's Premier Growth Corridor, the Golden Triangle connecting Kokapet/Neopolis, Shankarpally and the IIT Hyderabad/Kandi knowledge belt. Plots of 200, 267, 350 and 500+ sq. yd. come with a massive 25,000 sq. ft. luxury clubhouse, 100% underground electricity cabling, underground drainage, a dedicated water pipeline, wide BT roads with kerb stones, paver footpaths, a designer entrance arch and avenue plantation — with clear title, spot registration, and bank loan facility from leading banks.",
  seoTitle: "HMDA & RERA Approved 45-Acre Plotted Layout in Shankarpally | Arjun Realty",
  tagline:
    "West Hyderabad's Premier Growth Corridor — 100% HMDA Approved & RERA Registered Villa Plotted Development",
  projectArea: "45 Acres",
  faqs: [
    {
      q: "Is the project HMDA approved and RERA registered?",
      a: "Yes. The project is 100% HMDA approved and RERA registered, with a clear title and spot registration facility. Our team will walk you through the complete approval and documentation setup during your site visit.",
    },
    {
      q: "What amenities and infrastructure are included?",
      a: "The venture includes a massive 25,000 sq. ft. grand luxury clubhouse with zero extra charges, 100% underground electricity cabling, underground drainage, a dedicated water pipeline, wide BT roads with kerb stones, paver footpaths, a designer entrance arch and avenue plantation — with aggressive on-ground execution.",
    },
    {
      q: "What plot sizes are available?",
      a: "Premium plots are available in 200, 267, 350 and 500+ sq. yd. sizes — suited for villa development, gated-community style builds and long-term capital appreciation.",
    },
    {
      q: "Why invest in Shankarpally right now?",
      a: "Shankarpally sits on West Hyderabad's Premier Growth Corridor — the Golden Triangle connecting Kokapet/Neopolis, Shankarpally and the IIT Hyderabad/Kandi knowledge belt. With a seamless 20–30 minute drive to the Financial District, Nanakramguda, Gachibowli and Neopolis via 6-lane expanded radial roads — and Kollur SEZ, the Tellapur growth belt and ORR minutes away — surrounding ultra-luxury villa ventures command ₹7 Cr to ₹15–20 Cr, assuring exponential plotted land appreciation.",
    },
    {
      q: "Is bank loan facility available?",
      a: "Yes. Bank loan facility is available from leading banks to eligible buyers, supported by the project being 100% HMDA approved and RERA registered with a clear title.",
    },
    {
      q: "Where exactly is the project located?",
      a: "The project is located near Julkal Village, Shankarpally, West Hyderabad — roughly 10 minutes from Shankarpally Railway Station and the town center, with direct access to the Shankarpally–Kandi corridor and the Mumbai Highway (NH-65).",
    },
  ],
  whatsappCta: "Hi, I'm interested in Shankarpally 45 Acres Premium Layout. Please share the latest pricing and site visit slots.",
};

const badges = [
  "100% HMDA Approved & RERA Registered",
  "Bank Loan Facility Available from Leading Banks",
  "100% Clear Title with Spot Registration",
  "Massive 25,000 Sq. Ft. Luxury Clubhouse (Zero Extra Charges)",
];

const stats = [
  { label: "Total Extent", value: "45 Acres" },
  { label: "Plot Sizes", value: "200 – 500+ Sq. Yd." },
  { label: "Infrastructure", value: "Fast-Track" },
  { label: "Approval Status", value: "100% Approved" },
];

const triangleNodes = [
  { name: "Kokapet & Neopolis", role: "Financial District" },
  { name: "Shankarpally", role: "Central Hub — Premier Growth Corridor" },
  { name: "IIT Hyderabad & Kandi", role: "Knowledge Belt" },
];

const trianglePoints = [
  "6-lane expanded radial roads deliver a seamless 20–30 min drive to Gachibowli, Nanakramguda, Neopolis & the Financial District.",
  "Mumbai Highway (NH-65) and ORR integration, with Kollur SEZ and the Tellapur growth belt minutes away.",
  "Finance, knowledge and residential belts concentrated in one premier growth corridor.",
];

const luxeStats = [
  { value: "₹7 Cr+", label: "Starting price band commanded by surrounding luxury villa ventures" },
  { value: "₹15–20 Cr", label: "Premium villa price points already achieved in this micro-market" },
  { value: "45 Acres", label: "Total land extent of this fully approved 45-acre venture" },
  { value: "25,000 SFT", label: "Grand luxury clubhouse included with zero extra charges" },
];

const infraSpecs = [
  "25,000 Sq. Ft. Grand Clubhouse (Zero Extra Charges)",
  "100% Underground Electricity Cabling",
  "Underground Drainage",
  "Dedicated Water Pipeline",
  "Wide BT Roads with Kerb Stones",
  "Paver Footpaths",
  "Designer Entrance Arch",
  "Avenue Plantation & Landscaping",
];

const specTiles = [
  { icon: LandPlot, title: "45 Acres", desc: "Premium plotted land with 200, 267, 350 & 500+ sq. yd. plot sizes" },
  { icon: ShieldCheck, title: "HMDA & RERA Approved", desc: "100% HMDA approved & RERA registered with clear title and spot registration" },
  { icon: HardHat, title: "Fast-Track Execution", desc: "The fastest-developing gated plotting community in Shankarpally with aggressive on-ground work" },
  { icon: Banknote, title: "Bank Loan Facility", desc: "Loans available from leading banks to eligible buyers" },
  { icon: BadgeCheck, title: "25,000 SFT Clubhouse", desc: "Grand luxury clubhouse included with zero extra charges" },
  { icon: Timer, title: "Golden Triangle Location", desc: "20–30 mins to Gachibowli, Nanakramguda, Neopolis & the Financial District" },
];

const distanceMatrix = [
  {
    icon: Train,
    title: "Shankarpally Railway Station & Town Center",
    time: "~10 mins",
    desc: "Direct access for daily convenience and rentals-driven demand.",
  },
  {
    icon: Route,
    title: "Shankarpally–Kandi Corridor & NH-65",
    time: "Direct Access",
    desc: "Mumbai Highway (NH-65) and the internal corridor connect the layout instantly.",
  },
  {
    icon: School,
    title: "IIT Hyderabad, GITAM & Indus International",
    time: "Quick Drive",
    desc: "Premium education in the Kandi knowledge belt just minutes away.",
  },
  {
    icon: Briefcase,
    title: "Financial District, Nanakramguda, Gachibowli & Neopolis",
    time: "20–30 mins",
    desc: "Seamless drive via 6-lane expanded radial roads with ORR integration and Kollur SEZ & Tellapur growth belt nearby.",
  },
];

const related = ["jb-harmony-woods", "jb-pristine-city"]
  .map((slug) => getProjectBySlug(slug))
  .filter((p): p is Project => Boolean(p));

export default function Shankarpally45AcresPage() {
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const waUrl = `${siteConfig.links.wa}?text=${encodeURIComponent(project.whatsappCta || "")}`;

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="relative pt-28 pb-14 lg:pt-36 lg:pb-16 overflow-hidden">
        <div className="ambient-orb w-[700px] h-[700px] bg-primary/[0.08] -right-64 -top-64" />
        <div className="ambient-orb w-[500px] h-[500px] bg-gold/[0.03] -left-48 bottom-0" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <nav className="flex items-center gap-2 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronDown className="h-3 w-3 -rotate-90" />
              <span className="text-white/50">Shankarpally 45 Acres</span>
            </nav>

            <SectionLabel>Premium Villa Plotted Development · Shankarpally, West Hyderabad</SectionLabel>

            <h1 className="mt-6 text-[clamp(2.2rem,5.5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.06] max-w-4xl">
              Shankarpally 45 Acres <span className="text-gradient">Premium Layout</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/45 leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-white/50">
              <MapPin className="h-4 w-4 text-primary" />
              {project.location}
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/70"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => setSiteVisitOpen(true)}
                className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
              >
                <CalendarCheck className="h-4 w-4" /> Schedule Free Site Visit
              </button>
              <BrochureDownload project={project} variant="button" label="Download Brochure (PDF)" />
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[13px] font-semibold text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366]/15 transition-all"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            <p className="mt-5 text-xs text-white/30">
              100% HMDA Approved &amp; RERA Registered · Free site-visit guidance · Call or WhatsApp {siteConfig.contact.phone}
            </p>

            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              {stats.map((s) => (
                <div key={s.label} className="glass-card rounded-2xl px-6 py-5 border-white/[0.06]">
                  <p className="text-[22px] sm:text-2xl font-bold text-gradient tracking-tight">{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/35">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ GOLDEN TRIANGLE ══════════ */}
      <section className="py-16 lg:py-20 bg-section-alt relative overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.02] -left-48 top-1/3" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-12">
            <SectionLabel>Location Story</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
              West Hyderabad&apos;s <span className="text-gradient">Premier Growth Corridor</span>
            </h2>
            <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
              The 45-acre venture sits at the centre of the Golden Triangle of West Hyderabad —
              connecting Kokapet/Neopolis, Shankarpally and the IIT Hyderabad/Kandi knowledge belt.
              Six-lane expanded radial roads deliver a seamless 20–30 minute drive to the Financial District,
              Nanakramguda, Gachibowli and Neopolis — with Kollur SEZ, the Tellapur growth belt and Bollaram ORR access
              minutes away. Fully 100% HMDA approved and RERA registered, this corridor is being priced for
              its long-term address rather than today&apos;s commute.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {triangleNodes.map((n, i) => (
              <ScrollReveal key={n.name} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-7 h-full relative overflow-hidden group">
                  <span className="absolute top-5 right-6 text-[44px] font-bold text-white/[0.04] leading-none">
                    {i + 1}
                  </span>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-all duration-500">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{n.name}</h3>
                  <p className="mt-1 text-[13px] text-primary/70 font-semibold uppercase tracking-wider">{n.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="glass-card rounded-2xl p-1.5 bg-white/[0.02]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {trianglePoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl px-5 py-4 text-[13px] text-white/45 leading-relaxed">
                    <Route className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ INFRASTRUCTURE & LUXURY BOOM ══════════ */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-gold/[0.02] -right-64 -top-48" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-12">
            <ScrollReveal>
              <SectionLabel>Infrastructure &amp; Luxury Boom</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
                Infrastructure Momentum Meets an <span className="text-gradient">Ultra-Premium Micro-Market</span>
              </h2>
              <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
                Luxury villa ventures around Shankarpally command ₹7 Cr and are rising — with landmark price points
                of ₹15–20 Cr already achieved in this micro-market. Investors and villa owners can step into the same
                corridor at plotted-development scale, in a fully HMDA approved &amp; RERA registered 45-acre community —
                the fastest-developing gated plotting community in Shankarpally, with aggressive on-ground work and a
                25,000 sq. ft. luxury clubhouse included at zero extra charges.
              </p>
              <ul className="mt-6 space-y-3">
                {project.whyInvest.slice(0, 4).map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[13px] text-white/40 leading-relaxed">
                    <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {luxeStats.map((s) => (
                  <div key={s.value} className="glass-card rounded-2xl p-6">
                    <p className="text-3xl font-bold text-gradient tracking-tight">{s.value}</p>
                    <p className="mt-2 text-xs text-white/40 leading-relaxed">{s.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {infraSpecs.map((s) => (
                <div key={s} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm text-white/55">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ PROJECT HIGHLIGHTS & SPECS ══════════ */}
      <section className="py-16 lg:py-20 bg-section-alt relative overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.02] left-1/2 -translate-x-1/2 -top-48" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-12">
            <SectionLabel>Project Snapshot</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
              Highlights &amp; <span className="text-gradient">Specifications</span>
            </h2>
            <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
              A 100% HMDA approved &amp; RERA registered, bankable canvas for 200–500+ sq. yd. villa plots — with a
              25,000 sq. ft. luxury clubhouse, aggressive on-ground execution and direct connectivity to Gachibowli,
              Nanakramguda and Neopolis on the Golden Triangle of West Hyderabad.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {specTiles.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 0.06}>
                <div className="glass-card rounded-2xl p-7 h-full group">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-all duration-500">
                    <t.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{t.title}</h3>
                  <p className="mt-2 text-[13px] text-white/35 leading-relaxed">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DISTANCE / TIME MATRIX ══════════ */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.03] -right-48 top-1/3" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-center mb-4">
            <ScrollReveal className="lg:col-span-1">
              <SectionLabel>Connectivity</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
                How Far Is <span className="text-gradient">Everything Important?</span>
              </h2>
              <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
                Travel times below are approximate under normal conditions. The layout also enjoys direct Mumbai
                Highway (NH-65) access, seamless ORR integration, and proximity to Kollur SEZ and the Tellapur growth belt.
              </p>
              <a
                href={project.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2.5 text-[13px] font-semibold text-primary hover:text-white transition-colors"
              >
                Get Directions on Google Maps <ArrowRight className="h-4 w-4" />
              </a>
            </ScrollReveal>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {distanceMatrix.map((d, i) => (
                <ScrollReveal key={d.title} delay={i * 0.07}>
                  <div className="glass-card rounded-2xl p-6 h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-500">
                        <d.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="rounded-full bg-gold/10 border border-gold/20 px-3 py-1 text-xs font-bold text-gold">
                        {d.time}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-bold text-white tracking-tight leading-snug">{d.title}</h3>
                    <p className="mt-2 text-[13px] text-white/35 leading-relaxed">{d.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ LEAD CAPTURE — FREE CAB SITE VISIT ══════════ */}
      <ShankarpallyLeadWidget projectName={project.name} />

      {/* ══════════ FAQ ══════════ */}
      <section className="py-16 lg:py-20 bg-section-alt relative overflow-hidden">
        <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.03] -left-48 top-1/3" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <SectionLabel>Frequently Asked Questions</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] mb-8">
              Everything You Need to <span className="text-gradient">Know</span>
            </h2>
            <div className="space-y-3 max-w-3xl">
              {project.faqs?.map((faq, i) => (
                <div key={i} className="glass-card rounded-xl overflow-hidden group hover:border-white/[0.06] transition-all duration-300">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="flex items-center justify-between w-full px-6 py-5 text-left"
                  >
                    <span className="text-sm font-semibold text-white/70 group-hover:text-white/90 transition-colors duration-300 pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-white/30 shrink-0 transition-transform duration-300 ${expandedFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-0 border-t border-white/[0.04]">
                          <p className="text-sm text-white/45 leading-relaxed mt-4">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ RELATED PROJECTS ══════════ */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal className="max-w-3xl mb-10">
              <SectionLabel>Explore More</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em]">
                Other <span className="text-gradient">Verified Opportunities</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 0.07}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="glass-card rounded-2xl p-7 flex items-center justify-between gap-4 group"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-primary/70 font-semibold">
                        {p.projectType}
                      </p>
                      <h3 className="mt-1.5 text-lg font-bold text-white tracking-tight truncate">{p.name}</h3>
                      <p className="mt-1 text-xs text-white/35 truncate">{p.location}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="ambient-orb w-[700px] h-[700px] bg-primary/[0.05] left-1/2 -translate-x-1/2 -top-40" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="glass-card rounded-3xl px-8 py-12 sm:p-14 text-center relative overflow-hidden">
              <div className="ambient-orb w-[500px] h-[500px] bg-gold/[0.05] -right-40 -top-40" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Shankarpally 45 Acres Premium Layout</p>
                <h2 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-bold tracking-[-0.03em] leading-[1.08]">
                  Secure Your Plot in West Hyderabad&apos;s <span className="text-gradient">High-Growth Corridor</span>
                </h2>
                <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  Speak directly with our founders — no call centers, no pressure. Get verified pricing, the full HMDA &amp;
                  RERA approval documents and a free site visit, with cab facility arranged if you need it.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3.5">
                  <button
                    onClick={() => setSiteVisitOpen(true)}
                    className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
                  >
                    <CalendarCheck className="h-4 w-4" /> Book Free Site Visit
                  </button>
                  <a
                    href={siteConfig.links.tel}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[13px] font-semibold text-white/70 border border-white/10 hover:border-primary/50 transition-colors"
                  >
                    <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[13px] font-semibold text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366]/15 transition-all"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <StickyCTABar projectName={project.name} onSiteVisit={() => setSiteVisitOpen(true)} />
      <SiteVisitModal isOpen={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} projectName={project.name} />
    </>
  );
}

function ShankarpallyLeadWidget({ projectName }: { projectName: string }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", freeCab: false });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }
    setError("");
    setStatus("submitting");

    void submitLead({
      name: form.name,
      mobile: form.phone,
      project: projectName,
      preferredDate: form.date || undefined,
      message: form.freeCab ? "Free cab facility requested for the site visit." : undefined,
      source: "Site Visit",
      leadType: "Site Visit",
    });

    const text = encodeURIComponent(
      `Site Visit Request\n\n` +
        `Project: ${projectName}\n` +
        `Name: ${form.name}\n` +
        `Phone: ${form.phone}\n` +
        `Preferred Date: ${form.date || "Flexible"}\n` +
        `Free Cab Facility: ${form.freeCab ? "Yes, please arrange a cab" : "No, I will arrange my own transport"}`
    );

    setTimeout(() => {
      setStatus("done");
      setTimeout(() => {
        window.open(`${siteConfig.links.wa}?text=${text}`, "_blank");
        setForm({ name: "", phone: "", date: "", freeCab: false });
        setStatus("idle");
      }, 1200);
    }, 600);
  };

  return (
    <section id="book-site-visit" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <ScrollReveal>
            <SectionLabel>Book Your Visit</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
              Schedule Your <span className="text-gradient">Free Site Visit</span>
            </h2>
            <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
              Share your details and our advisory team will confirm your visit. Request a cab and we will arrange free
              pickup from anywhere in Hyderabad* — no-obligation pricing and full due-diligence guidance included.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "Free cab facility within Hyderabad city limits*",
                "Direct guidance from our founder-led advisory team",
                "Verified pricing & full HMDA + RERA documentation walkthrough",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[13px] text-white/45 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[11px] text-white/25 leading-relaxed">
              *Free cab facility subject to confirmation and city limits. Travel times are approximate and may vary.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-card rounded-3xl p-7 sm:p-8 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-5">
                      <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Request Received!</h3>
                    <p className="mt-2 text-sm text-white/40 leading-relaxed">
                      We&apos;ve opened WhatsApp with your details — press send to instantly confirm your visit request
                      with our team.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={false}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Book a Free Site Visit</h3>
                      <p className="text-xs text-white/35">Usually confirmed within a few hours, Mon–Sat.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2" htmlFor="sk-name">
                        Your Name *
                      </label>
                      <div className="relative">
                        <input
                          id="sk-name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="input-luxury"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2" htmlFor="sk-phone">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="sk-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="input-luxury"
                        pattern="[+]?[0-9\s\-()]{10,15}"
                        title="Please enter a valid phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2" htmlFor="sk-date">
                        Preferred Date
                      </label>
                      <input
                        id="sk-date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="input-luxury"
                      />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer select-none group">
                      <input
                        type="checkbox"
                        name="freeCab"
                        checked={form.freeCab}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-amber-500"
                      />
                      <span className="text-[13px] text-white/55 leading-relaxed group-hover:text-white/70 transition-colors">
                        I need the <span className="text-gold font-semibold">free cab facility</span> for my site visit
                      </span>
                    </label>
                    {error && <p className="text-xs text-red-400">{error}</p>}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full btn-premium inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong disabled:opacity-60"
                    >
                      {status === "submitting" ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                      ) : (
                        <><CalendarCheck className="h-4 w-4" /> Confirm My Site Visit</>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-white/25">
                      By submitting you agree to be contacted by Arjun Realty. We never share your details.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}