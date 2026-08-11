"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  ArrowRight,
  Shield,
  Download,
  CalendarCheck,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle,
  Maximize2,
  Ruler,
  Building2,
} from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { projects } from "@/data/projects";
import { getBuilderById } from "@/data/builders";
import { hasRealImage, getProjectGradient } from "@/lib/assets";
import siteConfig from "@/config/site";

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasImage = hasRealImage(project);
  const gradient = getProjectGradient(project.slug);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    window.location.href = `/projects/${project.slug}`;
  };

  return (
    <ScrollReveal delay={0.06 * index}>
      <div onClick={handleCardClick} className="glass-card-elevated rounded-[1.25rem] overflow-hidden group relative h-full flex flex-col cursor-pointer">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

        <Link href={`/projects/${project.slug}`} className="block relative h-56 sm:h-60 overflow-hidden">
          {hasImage ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjwvc3ZnPg=="
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/40 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-primary/20">
              {project.badge}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full glass text-[10px] font-semibold text-white/80 backdrop-blur-md">
              <Shield className="h-2.5 w-2.5 text-emerald-400" /> {project.approval}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 z-10">
            <div className="px-4 py-2 rounded-xl glass-strong backdrop-blur-md">
              <span className="block text-lg font-bold text-gradient">{project.startingPrice}</span>
              <span className="text-[9px] text-white/35 uppercase tracking-wider">Starting From</span>
            </div>
          </div>
        </Link>

        <div className="p-5 lg:p-6 flex flex-col flex-1">
          <Link href={`/projects/${project.slug}`} className="block">
            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-500 tracking-tight mb-1.5">
              {project.name}
            </h3>
          </Link>
          <p className="flex items-center gap-1.5 text-xs text-white/35 mb-3">
            <MapPin className="h-3 w-3 text-primary/60 shrink-0" /> {project.location}
          </p>

          {/* Builder name */}
          {(() => { const b = getBuilderById(project.builder); return b ? (
            <p className="flex items-center gap-1.5 text-[11px] text-white/25 mb-3">
              <Building2 className="h-3 w-3 text-primary/40 shrink-0" />
              {b.name}
            </p>
          ) : null; })()}

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.04]">
              <Ruler className="h-3 w-3 text-primary/50" />
              <span className="text-[11px] text-white/50 font-medium">{project.plotSizes}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.highlights.map((h) => (
              <span key={h} className="flex items-center gap-1 px-2 py-0.5 rounded bg-primary/[0.06] text-[9px] text-primary/60 font-medium">
                <span className="h-0.5 w-0.5 rounded-full bg-primary/40" />
                {h}
              </span>
            ))}
          </div>

          <div className="mb-4">
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
              className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-primary/70 transition-colors duration-300 font-medium"
            >
              <Maximize2 className="h-3 w-3" />
              {expanded ? "Hide" : "View"} Amenities
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {project.amenities.map((a) => (
                      <span key={a} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.03] text-[10px] text-white/40 font-medium border border-white/[0.03]">
                        <CheckCircle className="h-2.5 w-2.5 text-emerald-400/50" />
                        {a}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-4 border-t border-white/[0.04] space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              {project.brochureUrl ? (
                <a
                  href={project.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-premium flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-primary-dark px-3 py-2.5 rounded-xl text-[11px] font-semibold text-white glow-primary-strong"
                >
                  <Download className="h-3 w-3" /> Brochure
                </a>
              ) : (
                <a
                  href={`${siteConfig.links.wa}?text=Hi%2C%20I%27d%20like%20the%20brochure`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-premium flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-primary-dark px-3 py-2.5 rounded-xl text-[11px] font-semibold text-white glow-primary-strong"
                >
                  <Download className="h-3 w-3" /> Brochure
                </a>
              )}
              <a
                href={project.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[11px] font-semibold text-white/70 hover:bg-white/[0.07] hover:border-primary/15 hover:text-primary transition-all duration-300"
              >
                <ExternalLink className="h-3 w-3" /> Map
              </a>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={siteConfig.links.wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#25D366]/[0.08] border border-[#25D366]/15 text-[#25D366] text-[11px] font-semibold hover:bg-[#25D366]/15 transition-all duration-300"
              >
                <MessageCircle className="h-3 w-3" /> WhatsApp
              </a>
              <a
                href="#contact"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[11px] font-semibold text-white/70 hover:bg-white/[0.07] hover:border-primary/15 hover:text-primary transition-all duration-300"
              >
                <CalendarCheck className="h-3 w-3" /> Site Visit
              </a>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[11px] font-semibold text-primary/70 hover:text-primary transition-colors duration-300"
            >
              Learn More <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ProjectsSection() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.04] -top-48 -right-48" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <SectionLabel>Our Projects</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] leading-tight">
            Premium Investment <span className="text-gradient">Opportunities</span>
          </h2>
          <p className="mt-4 text-white/35 max-w-lg mx-auto text-[0.9rem] leading-relaxed">
            Handpicked, government-approved projects across Hyderabad&apos;s
            highest-growth corridors — curated for maximum returns.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={`${project.slug}-${i}`} project={project} index={i} />
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link href="/projects" className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-10 py-4 rounded-full text-[13px] font-semibold text-white glow-primary-strong">
            Explore All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
