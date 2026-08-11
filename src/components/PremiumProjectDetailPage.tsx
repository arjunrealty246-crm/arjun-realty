"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Shield,
  Download,
  CalendarCheck,
  MessageCircle,
  Phone,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Ruler,
  Building2,
  BadgeCheck,
  Banknote,
  Send,
  Star,
  Home,
  Camera,
  Lock,
  Waves,
  Dumbbell,
  Trees,
  Droplets,
  Zap,
  Footprints,
  Bike,
  CircleDot,
  Landmark,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import BrochureDownload from "./BrochureDownload";
import SiteVisitModal from "./SiteVisitModal";
import ProjectVideo from "./ProjectVideo";
import HeroVideoBackground from "./HeroVideoBackground";
import { getProjectGradient, hasVideo } from "@/lib/assets";
import type { Project } from "@/data/projects";
import { builders, getBuilderById } from "@/data/builders";
import siteConfig from "@/config/site";
import { submitLead } from "@/lib/lead-client";

const budgetLabels: Record<string, string> = {
  "under-50": "Under ₹50 Lakh",
  "50-1cr": "₹50 Lakh – ₹1 Crore",
  "1-2cr": "₹1 Crore – ₹2 Crore",
  "2-5cr": "₹2 Crore – ₹5 Crore",
  "above-5cr": "Above ₹5 Crore",
};

const amenityIconMap: Record<string, React.ReactNode> = {
  clubhouse: <Landmark className="h-5 w-5" />,
  pool: <Waves className="h-5 w-5" />,
  gym: <Dumbbell className="h-5 w-5" />,
  security: <Lock className="h-5 w-5" />,
  cctv: <Lock className="h-5 w-5" />,
  park: <Trees className="h-5 w-5" />,
  garden: <Trees className="h-5 w-5" />,
  landscap: <Trees className="h-5 w-5" />,
  water: <Droplets className="h-5 w-5" />,
  drainage: <Droplets className="h-5 w-5" />,
  rainwater: <Droplets className="h-5 w-5" />,
  electric: <Zap className="h-5 w-5" />,
  led: <Zap className="h-5 w-5" />,
  solar: <Zap className="h-5 w-5" />,
  jogging: <Footprints className="h-5 w-5" />,
  walking: <Footprints className="h-5 w-5" />,
  cycling: <Bike className="h-5 w-5" />,
  cricket: <CircleDot className="h-5 w-5" />,
  sports: <CircleDot className="h-5 w-5" />,
};

function getAmenityIcon(name: string): React.ReactNode {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(amenityIconMap)) {
    if (lower.includes(key)) return icon;
  }
  return <CheckCircle className="h-5 w-5 text-emerald-400/70" />;
}

const galleryLabels = [
  "Project Aerial View",
  "Clubhouse Exterior",
  "Landscaped Gardens",
  "Internal Roads",
  "Entrance Arch",
  "Children's Play Area",
  "Jogging Track",
  "Security Cabin",
];

export default function PremiumProjectDetailPage({
  project,
  relatedProjects,
}: {
  project: Project;
  relatedProjects: Project[];
}) {
  const [activeTab, setActiveTab] = useState<"photos" | "layout">("photos");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeGalleryTab, setActiveGalleryTab] = useState<"photos" | "layout">("photos");
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [masterPlanFailed, setMasterPlanFailed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const visibleAmenities = amenitiesExpanded
    ? project.amenities
    : project.amenities.slice(0, 8);

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${project.name}.\nPlease share more details.`
  );
  const waLink = `${siteConfig.links.wa}?text=${waMessage}`;

  const plotSizeArray = project.plotSizes
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formSubmitting) return;
    setFormSubmitting(true);

    void submitLead({
      name: formData.name,
      mobile: formData.phone,
      email: formData.email || undefined,
      project: project.name,
      investmentBudget: formData.budget ? budgetLabels[formData.budget] || formData.budget : undefined,
      message: formData.message || undefined,
      source: "Project Enquiry",
      leadType: "Project Enquiry",
    });

    const msg = encodeURIComponent(
      `Hi, I'm interested in ${project.name}.\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}${formData.email ? `\nEmail: ${formData.email}` : ""}${formData.budget ? `\nBudget: ${formData.budget}` : ""}${formData.message ? `\nMessage: ${formData.message}` : ""}`
    );
    window.open(`${siteConfig.links.wa}?text=${msg}`, "_blank");
    setFormSubmitting(false);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: "", phone: "", email: "", budget: "", message: "" });
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const galleryImages = project.images?.length ? project.images : [project.image];
  const totalGalleryItems = Math.max(galleryImages.length, 1);

  const nextSlide = () =>
    setLightboxIndex((prev) => (prev + 1) % totalGalleryItems);
  const prevSlide = () =>
    setLightboxIndex(
      (prev) => (prev - 1 + totalGalleryItems) % totalGalleryItems
    );

  return (
    <>
      {/* ════════════════════════════════════════════
          SECTION 1 — PREMIUM HERO WITH DRONE VIDEO
      ════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <HeroVideoBackground
            heroVideo={project.heroVideo}
            image={project.image}
          />
          <div className="absolute inset-0 bg-charcoal-dark/55" />
        </div>

        {/* Ambient orbs on top of overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="ambient-orb w-[700px] h-[700px] bg-primary/[0.09] -right-64 -top-64" />
          <div className="ambient-orb w-[500px] h-[500px] bg-gold/[0.04] -left-48 bottom-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full pt-36 pb-16 lg:pt-44 lg:pb-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 mb-6 text-xs">
                <Link
                  href="/"
                  className="flex items-center gap-1 text-white/40 hover:text-primary/60 transition-colors duration-300"
                >
                  <Home className="h-3 w-3" /> Home
                </Link>
                <span className="text-white/20">/</span>
                <Link
                  href="/projects"
                  className="text-white/40 hover:text-primary/60 transition-colors duration-300"
                >
                  Projects
                </Link>
                <span className="text-white/20">/</span>
                <span className="text-white/60 truncate max-w-[200px]">{project.name}</span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-primary/25">
                  <Star className="h-3 w-3" /> {project.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-medium text-[11px] font-semibold text-white/75 backdrop-blur-md">
                  <Shield className="h-3 w-3 text-emerald-400" /> {project.approval}
                </span>
                {project.projectArea && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-medium text-[11px] font-semibold text-white/75 backdrop-blur-md">
                    <Building2 className="h-3 w-3 text-primary/70" /> {project.projectArea}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-[clamp(2rem,5.5vw,4.2rem)] font-bold tracking-[-0.03em] leading-[1.06] mb-3 text-white">
                {project.name}
              </h1>
              <p className="text-base sm:text-lg text-white/60 mb-1.5 max-w-3xl">
                {project.projectType}
              </p>
              <p className="flex items-center gap-2 text-sm text-white/70 mb-8">
                <MapPin className="h-4 w-4 text-primary/60 shrink-0" />
                {project.location}
              </p>

              {/* Builder info */}
              {(() => { const b = getBuilderById(project.builder); return b ? (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-sm text-white/60 mb-6">
                  <p className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary/60 shrink-0" />
                    Developed by <span className="text-white/80 font-medium">{b.name}</span>
                  </p>
                  {project.marketingPartner && (
                    <p className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary/60 shrink-0" />
                      Marketing Partner: <span className="text-white/80 font-medium">{project.marketingPartner}</span>
                    </p>
                  )}
                </div>
              ) : null; })()}

              {/* Project units */}
              {project.units && project.units.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.units.map((unit) => (
                    <div key={unit.type} className="glass-card rounded-xl px-5 py-3">
                      <p className="text-2xl font-bold text-gradient">{unit.count}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{unit.type}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Hero action bar */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
                </a>
                <a
                  href={siteConfig.links.tel}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
                <BrochureDownload project={project} variant="button" />
                <button
                  onClick={() => setSiteVisitOpen(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
                >
                  <CalendarCheck className="h-4 w-4" /> Book Site Visit
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — QUICK STATS STRIP
      ════════════════════════════════════════════ */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="glass-card-elevated rounded-2xl p-1">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04]">
                {[
                  {
                    icon: <Banknote className="h-6 w-6 text-primary" />,
                    label: "Starting Price",
                    value: project.startingPrice,
                  },
                  {
                    icon: <Ruler className="h-6 w-6 text-primary" />,
                    label: "Plot Sizes",
                    value: plotSizeArray.length > 2
                      ? `${plotSizeArray[0]} – ${plotSizeArray[plotSizeArray.length - 1]}`
                      : project.plotSizes,
                  },
                  {
                    icon: <Building2 className="h-6 w-6 text-primary" />,
                    label: "Project Type",
                    value: project.projectType.split(" ").slice(0, 3).join(" "),
                  },
                  {
                    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
                    label: "Approvals",
                    value: project.approval.split("·")[0].trim(),
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center px-4 py-6 group"
                  >
                    <div className="mb-2.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {stat.icon}
                    </div>
                    <p className="text-[9px] text-white/25 uppercase tracking-[0.15em] mb-1">
                      {stat.label}
                    </p>
                    <p className="text-sm font-bold text-white/80">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2B — FCDA APPROVAL HIGHLIGHT
      ════════════════════════════════════════════ */}
      {project.approval.toLowerCase().includes("fcda") && (
        <section className="pb-16 lg:pb-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <div className="glass-card-elevated rounded-2xl p-8 lg:p-12 bg-gradient-to-br from-emerald-500/[0.02] via-primary/[0.02] to-emerald-500/[0.01] border border-emerald-500/10 relative overflow-hidden">
                <div className="ambient-orb w-[400px] h-[400px] bg-emerald-500/[0.03] -right-32 -top-32" />
                <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
                  <div className="h-20 w-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Shield className="h-10 w-10 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <SectionLabel>FCDA Approved</SectionLabel>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mt-3 mb-4">
                      One of the First FCDA Approved Projects in the Future City Corridor
                    </h3>
                    <p className="text-white/45 text-[0.95rem] leading-relaxed max-w-3xl">
                      FCDA (FAPCCI City Development Authority) approval is a hallmark of
                      regulatory compliance and long-term development certainty. JB Harmony
                      Woods is one of the first premium villa plotting projects to receive
                      this prestigious approval in the Future City growth corridor — giving
                      investors complete confidence in the project's legality and future
                      appreciation potential.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        "Full FCDA & RERA Regulatory Compliance",
                        "Guaranteed Long-Term Development Certainty",
                        "Bank Loan Eligible with Clear Title",
                        "Approved Layout & Master Plan",
                        "Legal Documentation & Sale Deed Ready",
                        "Future City Growth Corridor Advantage",
                      ].map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-center gap-3 glass-card rounded-xl px-4 py-3.5"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span className="text-sm text-white/60">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          SECTION 3 — PROJECT OVERVIEW + HIGHLIGHTS
      ════════════════════════════════════════════ */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Overview — 3 cols */}
            <ScrollReveal className="lg:col-span-3">
              <SectionLabel>Project Overview</SectionLabel>
              <div className="mt-6">
                <p className="text-white/45 text-[0.95rem] leading-[1.85] mb-6">
                  {project.name} is a {project.projectType.toLowerCase()} located at{" "}
                  {project.location}. With {project.approval} approvals and a focus on
                  premium infrastructure, this project offers an exceptional opportunity for
                  both investment and future home construction.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-3 glass-card rounded-xl px-5 py-3.5 group hover:border-primary/10 transition-all duration-300"
                    >
                      <div className="h-8 w-8 rounded-lg bg-primary/[0.08] flex items-center justify-center shrink-0 group-hover:bg-primary/[0.15] transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-white/65 font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Sidebar — 2 cols */}
            <ScrollReveal delay={0.1} className="lg:col-span-2">
              <div className="glass-card-elevated rounded-2xl p-6 lg:p-7 space-y-5 lg:sticky lg:top-28">
                <div>
                  <p className="text-[9px] text-white/25 uppercase tracking-[0.15em] mb-1">
                    Starting From
                  </p>
                  <p className="text-3xl font-bold text-gradient">{project.startingPrice}</p>
                </div>
                <div className="h-px bg-white/[0.04]" />
                <div>
                  <p className="text-[9px] text-white/25 uppercase tracking-[0.15em] mb-2">
                    Approvals
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    {project.approval}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] text-white/25 uppercase tracking-[0.15em] mb-2">
                    Bank Loan
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    Available from Leading Banks
                  </div>
                </div>
                <div>
                  <p className="text-[9px] text-white/25 uppercase tracking-[0.15em] mb-2">
                    Clear Title
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    Verified Legal Documentation
                  </div>
                </div>
                <div className="h-px bg-white/[0.04]" />
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium flex items-center justify-center gap-2.5 w-full bg-gradient-to-r from-primary to-primary-dark py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
                >
                  <MessageCircle className="h-4 w-4" /> Enquire Now
                </a>
                <a
                  href={siteConfig.links.tel}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] font-semibold text-white/60 hover:bg-white/[0.07] hover:border-primary/15 hover:text-primary transition-all duration-300"
                >
                  <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — IMAGE GALLERY
      ════════════════════════════════════════════ */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <SectionLabel>Project Gallery</SectionLabel>
              <div className="flex gap-1 glass rounded-full p-1 flex-shrink-0">
                {(["photos", "layout"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveGalleryTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                      activeGalleryTab === tab
                        ? "bg-primary/90 text-white"
                        : "text-white/30 hover:text-white/50"
                    }`}
                  >
                    {tab === "photos" ? "Photos" : "Layout"}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeGalleryTab === "photos" ? (
                <motion.div
                  key="photos"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                >
                  {galleryImages.map((img, i) => (
                    <motion.button
                      key={i}
                      onClick={() => openLightbox(i)}
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                        i === 0 ? "col-span-2 row-span-2 h-72 lg:h-full" : "h-44 lg:h-52"
                      }`}
                    >
                      {img && !failedImages[i] ? (
                        <Image
                          src={img}
                          alt={`${project.name} — ${galleryLabels[i] || `Photo ${i + 1}`}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjwvc3ZnPg=="
                          onError={() =>
                            setFailedImages((prev) => (prev[i] ? prev : { ...prev, [i]: true }))
                          }
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${getProjectGradient(project.slug + i)}`} />
                      )}
                      <div className="absolute inset-0 bg-charcoal-dark/20 group-hover:bg-charcoal-dark/10 transition-colors duration-500" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Camera className="h-8 w-8 text-white/10 group-hover:text-primary/25 transition-colors duration-500 mb-2" />
                        <span className="text-[10px] text-white/15 uppercase tracking-wider group-hover:text-white/30 transition-colors duration-500">
                          {galleryLabels[i] || `Photo ${i + 1}`}
                        </span>
                      </div>
                      {i === 0 && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] font-semibold text-white/60">
                          <ImageIcon className="h-3 w-3" /> {galleryImages.length} Photos
                        </div>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="layout"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  {project.masterPlanUrl && !masterPlanFailed ? (
                    <div className="glass-card-elevated rounded-2xl overflow-hidden">
                      <div className="relative h-80 lg:h-[32rem]">
                        <Image
                          src={project.masterPlanUrl}
                          alt={`${project.name} — Master Plan`}
                          fill
                          sizes="(max-width: 768px) 100vw, 80vw"
                          className="object-contain"
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIvPjwvc3ZnPg=="
                          onError={() => setMasterPlanFailed(true)}
                        />
                      </div>
                      <div className="px-6 py-4 border-t border-white/[0.04] flex items-center justify-between">
                        <p className="text-sm text-white/40">Master Plan — {project.name}</p>
                        {project.layoutPdfUrl && (
                          <a
                            href={project.layoutPdfUrl}
                            download
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                          >
                            <Download className="h-3.5 w-3.5" /> Download Layout
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card-elevated rounded-2xl h-80 lg:h-96 flex items-center justify-center">
                      <div className="text-center">
                        <Building2 className="h-16 w-16 text-white/5 mx-auto mb-4" />
                        <p className="text-sm text-white/25 font-medium">
                          Project layout map coming soon
                        </p>
                        <p className="text-xs text-white/15 mt-1">
                          Contact us to receive the detailed layout
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4B — PROJECT VIDEO
      ════════════════════════════════════════════ */}
      {hasVideo(project) && project.videoUrl && (
        <section className="pb-16 lg:pb-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <SectionLabel>Project Walkthrough</SectionLabel>
              <div className="mt-6">
                <ProjectVideo
                  src={project.videoUrl}
                  poster={project.image}
                  title={project.name}
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          SECTION 5 — PRICING TABLE
      ════════════════════════════════════════════ */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <SectionLabel>Pricing &amp; Plot Details</SectionLabel>
            <div className="mt-6 glass-card-elevated rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/[0.04] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Available Plot Sizes</h3>
                  <p className="text-xs text-white/30 mt-0.5">
                    All plots come with clear title and bank loan facility
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl glass">
                  <span className="text-xl font-bold text-gradient">
                    {project.startingPrice}
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      <th className="px-6 py-3.5 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">
                        Plot Size
                      </th>
                      <th className="px-6 py-3.5 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold hidden sm:table-cell">
                        Type
                      </th>
                      <th className="px-6 py-3.5 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold hidden md:table-cell">
                        Approval
                      </th>
                      <th className="px-6 py-3.5 text-right text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {plotSizeArray.map((size, i) => (
                      <tr
                        key={size}
                        className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/[0.06] flex items-center justify-center">
                              <Ruler className="h-3.5 w-3.5 text-primary/50" />
                            </div>
                            <span className="text-sm font-semibold text-white/75">
                              {size}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <span className="text-xs text-white/40">
                            {parseInt(size) <= 200
                              ? "Standard"
                              : parseInt(size) <= 400
                              ? "Premium"
                              : "Luxury"}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400/70 font-medium">
                            <CheckCircle className="h-3 w-3" /> {project.approval.split("·")[0].trim()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                              project.isUpcoming
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-emerald-500/10 text-emerald-400"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                project.isUpcoming ? "bg-amber-400" : "bg-emerald-400"
                              }`}
                            />
                            {project.isUpcoming ? "Coming Soon" : "Available"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer note */}
              <div className="px-6 py-4 border-t border-white/[0.04] flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-white/25">
                  <Shield className="h-3.5 w-3.5 text-emerald-400/50" />
                  Bank loan pre-approval available
                </div>
                <div className="flex items-center gap-2 text-xs text-white/25">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400/50" />
                  Registration assistance included
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 6 — AMENITIES
      ════════════════════════════════════════════ */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <SectionLabel>Premium Amenities</SectionLabel>
            <p className="mt-3 text-white/30 text-sm max-w-xl">
              {project.amenities.length} world-class amenities designed for a premium
              lifestyle
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              <AnimatePresence>
                {visibleAmenities.map((a, i) => (
                  <motion.div
                    key={a}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="flex items-center gap-4 glass-card rounded-xl px-5 py-4 group hover:border-primary/10 transition-all duration-300"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/[0.06] flex items-center justify-center shrink-0 group-hover:bg-primary/[0.12] transition-colors duration-300 text-primary/60 group-hover:text-primary">
                      {getAmenityIcon(a)}
                    </div>
                    <span className="text-sm text-white/60 font-medium">{a}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {project.amenities.length > 8 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setAmenitiesExpanded(!amenitiesExpanded)}
                  className="inline-flex items-center gap-2 text-sm text-primary/60 hover:text-primary transition-colors duration-300 font-medium"
                >
                  {amenitiesExpanded
                    ? "Show Less"
                    : `View All ${project.amenities.length} Amenities`}
                  {amenitiesExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 7 — LOCATION MAP + ADVANTAGES
      ════════════════════════════════════════════ */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <SectionLabel>Location &amp; Map</SectionLabel>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map — 2 cols */}
              <div className="lg:col-span-2 glass-card-elevated rounded-2xl overflow-hidden">
                {project.mapsUrl ? (
                  <div className="relative h-80 lg:h-[28rem]">
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(project.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="h-80 lg:h-[28rem] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-white/5 mx-auto mb-3" />
                      <p className="text-sm text-white/20">Map coming soon</p>
                    </div>
                  </div>
                )}
                <div className="px-6 py-4 flex items-center justify-between border-t border-white/[0.04]">
                  <p className="text-sm text-white/40 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary/50" /> {project.location}
                  </p>
                  {project.mapsUrl && (
                    <a
                      href={project.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                      Open in Maps <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Location advantages — 1 col */}
              {project.locationAdvantages.length > 0 && (
                <div className="glass-card-elevated rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4">
                    Location Advantages
                  </h3>
                  <div className="space-y-3">
                    {project.locationAdvantages.map((la) => (
                      <div
                        key={la}
                        className="flex items-start gap-3 group"
                      >
                        <div className="h-6 w-6 rounded-full bg-primary/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/[0.15] transition-colors duration-300">
                          <MapPin className="h-3 w-3 text-primary/60" />
                        </div>
                        <span className="text-sm text-white/45 leading-relaxed">{la}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 8 — WHY INVEST
      ════════════════════════════════════════════ */}
      {project.whyInvest.length > 0 && (
        <section className="pb-16 lg:pb-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <SectionLabel>Why Invest in {project.name}?</SectionLabel>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.whyInvest.map((wi, i) => (
                  <div
                    key={wi}
                    className="flex items-start gap-4 glass-card rounded-xl px-5 py-5 group hover:border-primary/10 transition-all duration-300"
                  >
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/[0.08] flex items-center justify-center shrink-0 group-hover:bg-emerald-500/[0.15] transition-colors duration-300">
                      <span className="text-sm font-bold text-emerald-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sm text-white/55 leading-relaxed pt-2">{wi}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          SECTION 9 — ENQUIRY FORM + QUICK CONTACT
      ════════════════════════════════════════════ */}
      <section className="pb-16 lg:pb-20" id="enquiry">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="glass-card-elevated rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Form — 3 cols */}
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Book a Site Visit
                  </h3>
                  <p className="text-sm text-white/30 mb-7">
                    Fill in the details and our team will arrange a complimentary site
                    visit for {project.name}.
                  </p>

                  {formSubmitted ? (
                    <div className="glass-card rounded-xl p-10 text-center">
                      <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-emerald-400" />
                      </div>
                      <p className="text-lg font-bold text-white mb-1">Thank You!</p>
                      <p className="text-sm text-white/35">
                        Our team will contact you within 30 minutes to arrange your site
                        visit.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all duration-300"
                              placeholder="Your full name"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all duration-300"
                              placeholder="+91 XXXXX XXXXX"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all duration-300"
                              placeholder="arjunrealty246@gmail.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">
                            Preferred Budget
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) =>
                              setFormData({ ...formData, budget: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/70 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all duration-300 appearance-none"
                          >
                            <option value="" className="bg-charcoal-dark">
                              Select budget range
                            </option>
                            <option value="under-50" className="bg-charcoal-dark">
                              Under ₹50 Lakh
                            </option>
                            <option value="50-1cr" className="bg-charcoal-dark">
                              ₹50 Lakh – ₹1 Crore
                            </option>
                            <option value="1-2cr" className="bg-charcoal-dark">
                              ₹1 Crore – ₹2 Crore
                            </option>
                            <option value="2-5cr" className="bg-charcoal-dark">
                              ₹2 Crore – ₹5 Crore
                            </option>
                            <option value="above-5cr" className="bg-charcoal-dark">
                              Above ₹5 Crore
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">
                          Message
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-white/15" />
                          <textarea
                            rows={3}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all duration-300 resize-none"
                            placeholder={`I'm interested in ${project.name}...`}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="btn-premium w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark py-4 rounded-full text-[13px] font-semibold text-white glow-primary-strong disabled:opacity-60"
                      >
                        <Send className="h-4 w-4" /> Submit Enquiry
                      </button>
                    </form>
                  )}
                </div>

                {/* Quick Contact Sidebar — 2 cols */}
                <div className="lg:col-span-2 bg-white/[0.01] border-l border-white/[0.04] p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-white mb-6">Quick Contact</h3>
                  <div className="space-y-4">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 glass-card rounded-xl p-5 group hover:border-[#25D366]/20 transition-all duration-300"
                    >
                      <div className="h-12 w-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                        <MessageCircle className="h-5 w-5 text-[#25D366]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors duration-300">
                          WhatsApp Enquiry
                        </p>
                        <p className="text-[11px] text-white/25">Quick response within minutes</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/15 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300" />
                    </a>

                    <a
                      href={siteConfig.links.tel}
                      className="flex items-center gap-4 glass-card rounded-xl p-5 group hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors duration-300">
                          Call Now
                        </p>
                        <p className="text-[11px] text-white/25">{siteConfig.contact.phone}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/15 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </a>

                    <BrochureDownload project={project} variant="card" />

                    <button
                      onClick={() => setSiteVisitOpen(true)}
                      className="flex items-center gap-4 glass-card rounded-xl p-5 group hover:border-primary/20 transition-all duration-300 w-full"
                    >
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <CalendarCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors duration-300">
                          Book Site Visit
                        </p>
                        <p className="text-[11px] text-white/25">Free guided site visit</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/15 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 9B — FAQ
      ════════════════════════════════════════════ */}
      {project.faqs && project.faqs.length > 0 && (
        <section className="pb-16 lg:pb-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <SectionLabel>Frequently Asked Questions</SectionLabel>
              <h2 className="mt-5 text-2xl font-bold tracking-tight mb-8">
                Everything You Need to <span className="text-gradient">Know</span>
              </h2>
              <div className="space-y-3 max-w-3xl">
                {project.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-xl overflow-hidden group hover:border-white/[0.06] transition-all duration-300"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="flex items-center justify-between w-full px-6 py-5 text-left"
                    >
                      <span className="text-sm font-semibold text-white/70 group-hover:text-white/90 transition-colors duration-300 pr-4">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-white/30 shrink-0 transition-transform duration-300 ${
                          expandedFaq === i ? "rotate-180" : ""
                        }`}
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
      )}

      {/* ════════════════════════════════════════════
          SECTION 10 — RELATED PROJECTS
      ════════════════════════════════════════════ */}
      {relatedProjects.length > 0 && (
        <section className="pb-16 lg:pb-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <SectionLabel>Explore More</SectionLabel>
              <h2 className="mt-5 text-2xl font-bold tracking-tight mb-8">
                Related <span className="text-gradient">Projects</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((rp) => (
                  <Link key={rp.slug} href={`/projects/${rp.slug}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="glass-card rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden bg-white/[0.02]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Building2 className="h-14 w-14 text-white/[0.04] group-hover:text-primary/[0.08] transition-colors duration-500" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/30 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/85 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                            {rp.badge}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors duration-500 tracking-tight mb-1">
                          {rp.name}
                        </h3>
                        <p className="flex items-center gap-1.5 text-[11px] text-white/35 mb-3">
                          <MapPin className="h-3 w-3 text-primary/60" /> {rp.location}
                        </p>
                        <div className="mt-auto pt-3 border-t border-white/[0.04] flex items-center justify-between">
                          <span className="text-xs text-white/30">{rp.startingPrice}</span>
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary group-hover:gap-2.5 transition-all duration-500">
                            View Details <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          LIGHTBOX
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 h-10 w-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 lg:left-8 h-12 w-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div
              className="max-w-4xl w-full mx-4 aspect-video rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages[lightboxIndex] && !failedImages[lightboxIndex] ? (
                <Image
                  src={galleryImages[lightboxIndex]}
                  alt={`${project.name} — ${galleryLabels[lightboxIndex] || `Photo ${lightboxIndex + 1}`}`}
                  fill
                  sizes="80vw"
                  className="object-cover"
                  onError={() =>
                    setFailedImages((prev) =>
                      prev[lightboxIndex] ? prev : { ...prev, [lightboxIndex]: true }
                    )
                  }
                />
              ) : (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${getProjectGradient(project.slug + lightboxIndex)}`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera className="h-16 w-16 text-white/10 mb-4" />
                    <p className="text-sm text-white/25 font-medium">
                      {galleryLabels[lightboxIndex] || `Photo ${lightboxIndex + 1}`}
                    </p>
                  </div>
                </>
              )}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full glass text-xs text-white/50 font-medium">
                {lightboxIndex + 1} / {totalGalleryItems}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 lg:right-8 h-12 w-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteVisitModal
        isOpen={siteVisitOpen}
        onClose={() => setSiteVisitOpen(false)}
        projectName={project.name}
      />
    </>
  );
}
