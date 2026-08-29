"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  Play,
  Camera,
  ZoomIn,
  Expand,
  Lock,
  FileCheck2,
  Award,
  LayoutGrid,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  Droplets,
  Building2,
  TreePine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
  const [gate, setGate] = useState<GateRequest | null>(null);

  const waUrl = `${siteConfig.links.wa}?text=${encodeURIComponent(project.whatsappCta || "")}`;

  const openGate = useCallback((request: GateRequest) => setGate(request), []);

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

            <SectionLabel>Premium Villa Plotted Community · Shankarpally, West Hyderabad</SectionLabel>

            <h1 className="mt-6 text-[clamp(2.2rem,5.5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.06] max-w-4xl">
              Shankarpally 45 Acres — Luxury <span className="text-gradient">HMDA &amp; RERA Approved</span> Plotted Community
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/45 leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-white/50">
              <MapPin className="h-4 w-4 text-primary" />
              {project.location}
            </div>

            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-4xl">
              {[
                { icon: ShieldCheck, label: "100% HMDA Approved", tone: "text-emerald-400" },
                { icon: BadgeCheck, label: "RERA Registered", tone: "text-primary" },
                { icon: LayoutGrid, label: "25,000 SFT Clubhouse Included", tone: "text-gold" },
                { icon: Banknote, label: "Bank Loan Available", tone: "text-sky-400" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/75"
                >
                  <b.icon className={`h-4 w-4 ${b.tone}`} />
                  {b.label}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => scrollToId("media")}
                className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.08] px-6 py-3 text-[13px] font-semibold text-white hover:bg-primary/[0.14] transition-all"
              >
                <Play className="h-4 w-4 fill-primary text-primary" /> Watch Walkthrough Video
              </button>
              <button
                onClick={() => scrollToId("documents")}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[13px] font-semibold text-white/70 hover:border-primary/25 hover:text-white transition-all"
              >
                <FileText className="h-4 w-4 text-primary" /> Download Project Kit
              </button>
              <button
                onClick={() => setSiteVisitOpen(true)}
                className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-6 py-3 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
              >
                <CalendarCheck className="h-4 w-4" /> Book Free Site Visit
              </button>
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

      {/* ══════════ PROJECT MEDIA & GALLERY ══════════ */}
      <MediaGallerySection projectName={project.name} onRequestVideo={(r) => setGate(r)} />

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

      {/* ══════════ MASTER LAYOUT & PLOT AVAILABILITY ══════════ */}
      <MasterLayoutSection projectName={project.name} onRequestPlot={(r) => openGate(r)} />

      {/* ══════════ TRUST & VERIFICATION CENTER ══════════ */}
      <TrustDocumentsSection project={project} onRequestDoc={(r) => openGate(r)} />

      {/* ══════════ ON-GROUND EXECUTION STATUS ══════════ */}
      <ExecutionStatusSection />

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

      {/* ══════════ WEST HYDERABAD GROWTH AXIS ══════════ */}
      <GrowthAxisSection />

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

      <StickyCTABar projectName={project.name} onSiteVisit={() => setSiteVisitOpen(true)} ctaLabel="Free Cab Visit" />
      <SiteVisitModal isOpen={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} projectName={project.name} />
      <LeadGateModal
        open={gate !== null}
        request={gate}
        onClose={() => setGate(null)}
        projectName={project.name}
      />
    </>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function waUrlLink(message: string) {
  return `${siteConfig.links.wa}?text=${encodeURIComponent(message)}`;
}

interface GateRequest {
  intent: string;
  message: string;
  ctaLabel: string;
}

type GalleryCategory = "Layout Views" | "Clubhouse & Amenities" | "On-Ground Progress" | "Surrounding Infra";

const galleryItems: { src: string; title: string; cat: GalleryCategory }[] = [
  {
    src: "/images/projects/shankarpally-45acres-layout.svg",
    title: "Indicative Master Layout — 45 Acres",
    cat: "Layout Views",
  },
  {
    src: "/images/gallery/clubhouse.svg",
    title: "25,000 Sq. Ft. Grand Luxury Clubhouse",
    cat: "Clubhouse & Amenities",
  },
  {
    src: "/images/projects/shankarpally-45acres-roads.svg",
    title: "Wide BT Roads, Kerbs & Paver Footpaths",
    cat: "On-Ground Progress",
  },
  {
    src: "/images/gallery/project-overview.svg",
    title: "On-Ground Progress Overview",
    cat: "On-Ground Progress",
  },
  {
    src: "/images/gallery/gardens.svg",
    title: "Avenue Plantation & Landscaped Gardens",
    cat: "Surrounding Infra",
  },
];

const galleryTabs: ("All" | GalleryCategory)[] = [
  "All",
  "Layout Views",
  "Clubhouse & Amenities",
  "On-Ground Progress",
  "Surrounding Infra",
];

function MediaGallerySection({
  projectName,
  onRequestVideo,
}: {
  projectName: string;
  onRequestVideo: (r: GateRequest) => void;
}) {
  const [tab, setTab] = useState<"All" | GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = galleryItems.filter((g) => tab === "All" || g.cat === tab);
  const active = lightboxIndex !== null ? visible[lightboxIndex] : null;

  const next = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? prev : (prev + 1) % visible.length));
  }, [visible.length]);

  const prev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? prev : (prev - 1 + visible.length) % visible.length));
  }, [visible.length]);

  const requestVideo = () =>
    onRequestVideo({
      intent: "Walkthrough & Drone Video Footage",
      message: `${projectName}\n\nPlease share the latest walkthrough and drone aerial footage of ${projectName}.`,
      ctaLabel: "Request Video Footage",
    });

  return (
    <section id="media" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="max-w-3xl mb-10">
          <SectionLabel>Project Media &amp; Gallery</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
            Gallery, Layouts &amp; <span className="text-gradient">Site Impressions</span>
          </h2>
          <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
            Targeted renders and site impressions below are illustrative. High-resolution photographs, the walkthrough
            video and drone aerials are produced regularly and available on request.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {galleryTabs.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                  tab === t ? "bg-primary/90 text-white" : "bg-white/[0.03] border border-white/[0.06] text-white/30 hover:text-white/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {visible.map((g, i) => (
              <motion.button
                key={`${g.src}-${tab}`}
                onClick={() => setLightboxIndex(i)}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                  i === 0 && tab === "All" ? "col-span-2 row-span-2 h-72 lg:h-auto lg:min-h-[26rem]" : "h-44 lg:h-52"
                }`}
              >
                <Image
                  src={g.src}
                  alt={`${g.title} — ${projectName}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIvPjwvc3ZnPg=="
                />
                <div className="absolute inset-0 bg-charcoal-dark/15 group-hover:bg-charcoal-dark/[0.06] transition-colors duration-500" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass text-[10px] font-semibold text-white/70">
                  <Camera className="h-3 w-3" /> Illustrative
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="text-[11px] sm:text-xs font-semibold text-white/85 leading-snug line-clamp-2">{g.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-6 glass-card-elevated rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Video Walkthrough &amp; Drone Aerial</h3>
                <p className="mt-1 text-xs text-white/35 leading-relaxed max-w-xl">
                  The site walkthrough and drone aerials are currently in production — share your details and our team
                  will send you the latest footage on WhatsApp instantly.
                </p>
              </div>
            </div>
            <button
              onClick={requestVideo}
              className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark text-[13px] font-semibold text-white glow-primary-strong hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-4 w-4" /> Request Latest Footage
            </button>
          </div>
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 h-10 w-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </button>
            {visible.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 lg:left-8 h-12 w-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image src={active.src} alt={`${active.title} — ${projectName}`} fill sizes="80vw" className="object-contain" />
              </div>
              <p className="mt-4 text-center text-sm text-white/50">
                <Camera className="h-3.5 w-3.5 inline mr-1.5 text-primary" />
                {active.title} · Illustrative impression
              </p>
            </div>
            {visible.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 lg:right-8 h-12 w-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full glass text-xs text-white/50 font-medium">
              {lightboxIndex + 1} / {visible.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MasterLayoutSection({
  projectName,
  onRequestPlot,
}: {
  projectName: string;
  onRequestPlot: (r: GateRequest) => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const LAYOUT_SRC = "/images/projects/shankarpally-45acres-layout.svg";
  const plotSizes = ["200 Sq. Yd.", "267 Sq. Yd.", "350 Sq. Yd.", "500+ Sq. Yd."];

  const requestPlot = () =>
    onRequestPlot({
      intent: "Live Plot Availability & Corner Plots",
      message: `${projectName}\n\nPlease share the live plot availability (200 / 267 / 350 / 500+ sq. yd.) and corner plot options.`,
      ctaLabel: "Check Live Availability",
    });

  return (
    <section id="layout" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.03] -right-48 top-1/4" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <ScrollReveal>
            <SectionLabel>Master Layout &amp; Plot Availability</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
              Choose Your Plot — <span className="text-gradient">200 to 500+ Sq. Yd.</span>
            </h2>
            <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
              Premium residential plots in 200, 267, 350 and 500+ sq. yd. sizes across a fully HMDA approved &amp;
              RERA registered 45-acre gated community — with wide roads, a 25,000 sq. ft. luxury clubhouse and
              Vaastu-compliant layouts.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {plotSizes.map((p) => (
                <span key={p} className="rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2 text-xs font-bold text-primary">
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/30 leading-relaxed">
              The layout below is illustrative and indicative only (not to scale). Corner plots and premium facing
              plots are limited — availability changes daily.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={requestPlot}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-primary-dark px-6 py-3 text-[13px] font-semibold text-white glow-primary-strong hover:opacity-90 transition-opacity"
              >
                <LayoutGrid className="h-4 w-4" /> Request Live Plot Availability / Corner Plots
              </button>
              <a
                href={waUrlLink("Hi, I'm interested in the available plots at " + projectName + ". Please share the live plot availability.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[13px] font-semibold text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366]/15 transition-all"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-card-elevated rounded-2xl overflow-hidden">
              <div
                className={`relative h-80 lg:h-[30rem] overflow-hidden cursor-zoom-in ${zoomed ? "cursor-zoom-out" : ""}`}
                onClick={() => setZoomed((z) => !z)}
              >
                <Image
                  src={LAYOUT_SRC}
                  alt={`${projectName} — Illustrative Master Layout`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-contain transition-transform duration-700 ease-out ${zoomed ? "scale-150" : "scale-100"}`}
                />
              </div>
              <div className="px-6 py-4 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-white/35 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary/50" /> Illustrative master layout — not to scale
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomed((z) => !z)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-semibold text-white/60 hover:text-primary transition-colors"
                  >
                    <ZoomIn className="h-3.5 w-3.5" /> {zoomed ? "Zoom Out" : "Zoom In"}
                  </button>
                  <button
                    onClick={() => setExpanded(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary/20 bg-primary/[0.08] text-[11px] font-semibold text-primary hover:bg-primary/[0.14] transition-colors"
                  >
                    <Expand className="h-3.5 w-3.5" /> Full Screen
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setExpanded(false)}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-6 right-6 h-10 w-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image src={LAYOUT_SRC} alt={`${projectName} — Master Layout`} fill sizes="90vw" className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const trustDocs: { icon: LucideIcon; title: string; desc: string; intent: string }[] = [
  {
    icon: FileCheck2,
    title: "HMDA Final Approval Copy",
    intent: "HMDA Final Approval Copy",
    desc: "Primary legal approval for the layout — the venture is 100% HMDA approved.",
  },
  {
    icon: Award,
    title: "Official RERA Registration Certificate",
    intent: "RERA Registration Certificate",
    desc: "State RERA registration documentation for the fully registered venture.",
  },
  {
    icon: LayoutGrid,
    title: "High-Resolution Master Layout Plan",
    intent: "High-Resolution Master Layout Plan",
    desc: "Detailed plot layout for 200 / 267 / 350 / 500+ sq. yd. with road widths and amenities.",
  },
  {
    icon: FileText,
    title: "Brochure & Pricing Matrix",
    intent: "Brochure & Pricing Matrix",
    desc: "The complete featured brochure plus the current verified pricing matrix.",
  },
];

function TrustDocumentsSection({
  project,
  onRequestDoc,
}: {
  project: Project;
  onRequestDoc: (r: GateRequest) => void;
}) {
  return (
    <section id="documents" className="py-16 lg:py-20 bg-section-alt relative overflow-hidden">
      <div className="ambient-orb w-[600px] h-[600px] bg-gold/[0.02] -left-48 -bottom-48" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="max-w-3xl mb-10">
          <SectionLabel>Trust &amp; Verification Center</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
            Legal Documents, Approvals &amp; <span className="text-gradient">Project Kit</span>
          </h2>
          <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
            Every document below is genuine and available. Share your details once and our founder-led team sends the
            full file set instantly on WhatsApp — no call centers, no pressure.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {trustDocs.map((d, i) => (
            <ScrollReveal key={d.intent} delay={i * 0.06}>
              <div className="glass-card rounded-2xl p-7 h-full flex flex-col group">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-all duration-500">
                    <d.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base lg:text-lg font-bold text-white tracking-tight leading-snug">{d.title}</h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-gold/10 border border-gold/20 px-2.5 py-0.5 text-[10px] font-semibold text-gold">
                      <Lock className="h-3 w-3" /> Shared after quick verification
                    </span>
                  </div>
                </div>
                <p className="text-[13px] text-white/35 leading-relaxed mb-6">{d.desc}</p>
                <button
                  onClick={() =>
                    onRequestDoc({
                      intent: d.intent,
                      message: `${project.name}\n\nPlease share the ${d.intent} PDF.`,
                      ctaLabel: "Request Document",
                    })
                  }
                  className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-primary/25 bg-primary/[0.08] text-[12px] font-semibold text-white hover:bg-primary/[0.16] transition-colors"
                >
                  <LandPlot className="h-3.5 w-3.5 text-primary" /> Request via WhatsApp
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="glass-card-elevated rounded-2xl p-6 lg:p-7 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Instant PDF — no verification needed</h3>
                <p className="mt-1 text-xs text-white/35 leading-relaxed max-w-xl">
                  The featured brochure and pricing summary generate instantly as a PDF right in your browser.
                  Official HMDA, RERA and high-resolution layout files are shared on WhatsApp after a quick lead
                  verification, and handed over in person during your free site visit.
                </p>
              </div>
            </div>
            <BrochureDownload project={project} variant="button" label="Download Brochure (PDF)" />
          </div>
        </ScrollReveal>

        <p className="mt-6 text-[11px] text-white/25 leading-relaxed max-w-3xl">
          *Official approvals and layout documents are genuine and shared freely. We verify a direct contact so you can
          be guided personally — your details are never shared.
        </p>
      </div>
    </section>
  );
}

const execStatus = [
  {
    icon: Zap,
    title: "Underground Electrification & Drainage",
    value: 100,
    state: "Complete",
    note: "100% underground cabling and underground drainage network",
  },
  {
    icon: Droplets,
    title: "Dedicated Water Pipeline & Overhead Storage",
    value: 90,
    state: "On Track",
    note: "Dedicated water pipeline with overhead storage",
  },
  {
    icon: Route,
    title: "Wide BT Roads, Kerbs & Paver Footpaths",
    value: 85,
    state: "In Progress",
    note: "Wide BT roads with kerb stones and paver footpaths",
  },
  {
    icon: Building2,
    title: "25,000 Sq. Ft. Grand Luxury Clubhouse",
    value: 60,
    state: "Rapidly Progressing",
    note: "Fast-tracked construction — included with zero extra charges",
  },
  {
    icon: TreePine,
    title: "Entrance Arch, 24/7 Security & Avenue Plantation",
    value: 75,
    state: "In Progress",
    note: "Designer entrance arch, security setup and landscaping",
  },
];

function ExecutionStatusSection() {
  return (
    <section className="py-16 lg:py-20 bg-section-alt relative overflow-hidden">
      <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.03] -right-48 -top-48" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <ScrollReveal>
            <SectionLabel>Fast-Track Execution</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
              On-Ground Infrastructure &amp; <span className="text-gradient">Execution Status</span>
            </h2>
            <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
              One of the fastest-developing gated plotting communities in Shankarpally. Core underground infrastructure
              is already in place, roads are progressing and the 25,000 sq. ft. luxury clubhouse is being built at
              speed — with zero extra charges for amenity membership.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {[
                { value: "45", label: "Acres Under Development" },
                { value: "100%", label: "Underground Infra Delivered" },
                { value: "25,000 SFT", label: "Clubhouse Under Fast-Track Build" },
                { value: "24/7", label: "Security & Gated Access" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-2xl px-5 py-4">
                  <p className="text-xl lg:text-2xl font-bold text-gradient tracking-tight">{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-white/35">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-4 w-full">
            {execStatus.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 0.06}>
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <e.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[13px] lg:text-sm font-bold text-white tracking-tight truncate">{e.title}</h3>
                        <p className="text-[11px] text-white/30 truncate">{e.note}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[15px] font-bold text-gradient">{e.state}</p>
                      <p className="text-[11px] text-white/30">{e.value}%</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${e.value}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1.1, ease: "easeOut", delay: i * 0.08 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <p className="text-[11px] text-white/25 leading-relaxed pt-1">
              Indicative execution status as per the latest site report — verify progress live during your free site visit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const growthAxis = [
  { name: "Mumbai Highway (NH-65)", time: "Direct Access", mins: 5, note: "Immediate corridor connectivity" },
  { name: "Shankarpally Railway Station & Town Center", time: "~10 mins", mins: 10, note: "Daily convenience & rental demand" },
  { name: "Kollur SEZ & Tellapur Growth Belt", time: "~15–20 mins", mins: 18, note: "IT employment & township belt" },
  { name: "ORR Interchange", time: "~15–20 mins", mins: 18, note: "Seamless ring-road integration" },
  { name: "IIT Hyderabad & Kandi Knowledge Belt", time: "~15–20 mins", mins: 20, note: "Premium education corridor" },
  { name: "Kokapet & Neopolis", time: "~25–30 mins", mins: 30, note: "Financial District micro-market" },
  { name: "Gachibowli & Financial District", time: "~25–30 mins", mins: 30, note: "Commercial annuity engine" },
  { name: "Nanakramguda", time: "~25–30 mins", mins: 30, note: "Corporate parklands" },
];

function GrowthAxisSection() {
  return (
    <section className="py-16 lg:py-20 bg-section-alt relative overflow-hidden">
      <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.03] -left-48 top-1/3" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="max-w-3xl mb-10">
          <SectionLabel>Location Matrix</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
            The West Hyderabad <span className="text-gradient">Growth Axis</span>
          </h2>
          <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
            Shankarpally anchors the Golden Triangle connecting Kokapet/Neopolis and the IIT Hyderabad/Kandi knowledge
            belt. Approximate road travel times below — shorter bars mean fewer minutes.
          </p>
        </ScrollReveal>

        <div className="space-y-3.5 max-w-3xl">
          {growthAxis.map((g, i) => {
            const width = Math.max(10, Math.round((g.mins / 30) * 100));
            return (
              <ScrollReveal key={g.name} delay={i * 0.04}>
                <div className="flex items-center gap-4">
                  <div className="w-64 lg:w-80 shrink-0">
                    <p className="text-[13px] font-semibold text-white/75 truncate">{g.name}</p>
                    <p className="text-[11px] text-white/30 truncate">{g.note}</p>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${width}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1, ease: "easeOut", delay: i * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark"
                    />
                  </div>
                  <span className="w-20 shrink-0 text-right text-[12px] font-bold text-gold">{g.time}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <p className="mt-7 text-[11px] text-white/25 leading-relaxed max-w-3xl">
          Travel times are approximate under normal traffic and may vary. The corridor enjoys direct Mumbai Highway
          (NH-65) access, seamless ORR integration and proximity to Kollur SEZ and the Tellapur growth belt.
        </p>
      </div>
    </section>
  );
}

function LeadGateModal({
  open,
  request,
  onClose,
  projectName,
}: {
  open: boolean;
  request: GateRequest | null;
  onClose: () => void;
  projectName: string;
}) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request || status === "submitting") return;
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
      message: `Requested: ${request.intent}`,
      source: "Project Enquiry",
      leadType: "Document Request",
    });

    const text = encodeURIComponent(`${request.message}\n\nName: ${form.name}\nPhone: ${form.phone}`);

    setTimeout(() => {
      setStatus("done");
      setTimeout(() => {
        window.open(`${siteConfig.links.wa}?text=${text}`, "_blank");
        setForm({ name: "", phone: "" });
        setStatus("idle");
        onClose();
      }, 1400);
    }, 500);
  };

  return (
    <AnimatePresence>
      {open && request && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-card-elevated rounded-3xl w-full max-w-md p-7 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 h-9 w-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "done" ? (
              <div className="text-center py-8">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-5">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Request Received!</h3>
                <p className="mt-2 text-sm text-white/40 leading-relaxed">
                  We&apos;ve opened WhatsApp with your details — press send and the {request.intent.toLowerCase()} will be
                  shared instantly by our team.
                </p>
              </div>
            ) : (
              <motion.form onSubmit={handleSubmit} initial={false} className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-primary font-bold">Trust &amp; Verification Center</p>
                  <h3 className="mt-2 text-xl font-bold text-white leading-snug">{request.intent}</h3>
                  <p className="mt-2 text-xs text-white/35 leading-relaxed">
                    Share your details once — the document is sent instantly on WhatsApp, followed by a guided handover
                    during your free site visit.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2" htmlFor="gate-name">
                    Your Name *
                  </label>
                  <input
                    id="gate-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input-luxury"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2" htmlFor="gate-phone">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="gate-phone"
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
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full btn-premium inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    <><Lock className="h-4 w-4" /> {request.ctaLabel}</>
                  )}
                </button>
                <p className="text-center text-[11px] text-white/25">
                  By submitting you agree to be contacted by Arjun Realty. We never share your details.
                </p>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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