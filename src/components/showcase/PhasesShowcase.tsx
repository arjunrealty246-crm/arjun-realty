"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Layers,
  Map as MapIcon,
  FileText,
  Download,
  ExternalLink,
  X,
  Camera,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import ProjectVideo from "../ProjectVideo";
import { getDownloadUrl } from "@/lib/download-url";
import type { Project, ProjectPhase } from "@/data/projects";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjwvc3ZnPg==";

function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(url.split("?")[0]);
}

function PhaseMedia({ phase, project }: { phase: ProjectPhase; project: Project }) {
  const photos = (phase.photos || []).filter(Boolean);
  const hasVideos = (phase.videos || []).filter(Boolean);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  if (photos.length === 0 && hasVideos.length === 0) return null;

  return (
    <div className="space-y-4">
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => setLightbox({ images: photos, index: i })}
              className="relative rounded-xl overflow-hidden group h-32 sm:h-40"
            >
              <Image
                src={src}
                alt={`${phase.name} — Photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                placeholder="blur"
                blurDataURL={BLUR}
              />
              <div className="absolute inset-0 bg-charcoal-dark/10 group-hover:bg-charcoal-dark/30 transition-colors duration-500 flex items-center justify-center">
                <Camera className="h-6 w-6 text-white/40 group-hover:text-white/80 transition-colors duration-500" />
              </div>
            </button>
          ))}
        </div>
      )}

      {hasVideos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hasVideos.map((src, i) => (
            <ProjectVideo key={`${src}-${i}`} src={src} poster={phase.photos?.[0]} title={`${phase.name} — Video ${i + 1}`} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 h-10 w-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </button>
            {lightbox.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((prev) =>
                    prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : prev
                  );
                }}
                className="absolute left-4 lg:left-8 h-12 w-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            <div
              className="max-w-4xl w-full mx-4 aspect-video rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.images[lightbox.index]}
                alt={`${phase.name} — Photo ${lightbox.index + 1}`}
                fill
                sizes="80vw"
                className="object-cover"
              />
            </div>
            {lightbox.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((prev) =>
                    prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : prev
                  );
                }}
                className="absolute right-4 lg:right-8 h-12 w-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PhaseDocuments({ phase }: { phase: ProjectPhase }) {
  const docs = (phase.documents || []).filter((d) => d.url);
  const links: { label: string; url: string; kind: "download" | "view" }[] = [];

  if (phase.brochureUrl) links.push({ label: "Phase Brochure", url: phase.brochureUrl, kind: "download" });
  if (phase.layoutPdfUrl) links.push({ label: "Layout PDF", url: phase.layoutPdfUrl, kind: "download" });

  if (docs.length === 0 && links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={getDownloadUrl(l.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/[0.08] border border-primary/15 text-[11px] font-semibold text-primary hover:bg-primary/[0.15] transition-colors duration-300"
        >
          <FileText className="h-3 w-3" /> {l.label}
          {l.kind === "download" ? <Download className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
        </a>
      ))}
      {docs.map((d) => (
        <a
          key={d.name}
          href={getDownloadUrl(d.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-semibold text-white/60 hover:border-primary/20 hover:text-primary transition-colors duration-300"
        >
          <FileText className="h-3 w-3" /> {d.name}
          <ExternalLink className="h-3 w-3" />
        </a>
      ))}
    </div>
  );
}

function PhasePlan({ phase, project }: { phase: ProjectPhase; project: Project }) {
  const planUrl = phase.masterPlanUrl || phase.layoutUrl;
  if (!planUrl) return null;

  if (isImageUrl(planUrl)) {
    return (
      <div className="relative rounded-xl overflow-hidden h-48">
        <Image
          src={planUrl}
          alt={`${phase.name} — Master Plan`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain bg-charcoal-dark"
          placeholder="blur"
          blurDataURL={BLUR}
        />
        <a
          href={planUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-charcoal-dark/40 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold text-white">
            <ExternalLink className="h-3.5 w-3.5" /> Open Layout
          </span>
        </a>
      </div>
    );
  }

  return (
    <a
      href={getDownloadUrl(planUrl)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-semibold text-white/60 hover:border-primary/20 hover:text-primary transition-colors duration-300"
    >
      <MapIcon className="h-3 w-3" /> Open Layout
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export default function PhasesShowcase({ project }: { project: Project }) {
  const phases = (project.phases || []).filter(Boolean);
  if (phases.length === 0) return null;

  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <SectionLabel>Phases &amp; Layouts</SectionLabel>
          <div className="mt-5 flex items-center gap-3">
            <Layers className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">
              Project <span className="text-gradient">Phases</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-8 space-y-8">
          {phases.map((phase, i) => (
            <ScrollReveal key={`${phase.name}-${i}`} delay={0.05 * i}>
              <div className="glass-card-elevated rounded-2xl overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 lg:px-8 py-5 border-b border-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-xl bg-primary/[0.08] flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{phase.name}</h3>
                      {phase.status && (
                        <span className="inline-flex items-center gap-1.5 mt-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400/90">
                          <CheckCircle className="h-3 w-3" /> {phase.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-2 space-y-5">
                    {phase.description && (
                      <p className="text-sm text-white/45 leading-relaxed">{phase.description}</p>
                    )}
                    {phase.details && phase.details.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {phase.details.map((d) => (
                          <div key={d.label} className="glass-card rounded-xl px-4 py-3">
                            <p className="text-[9px] text-white/25 uppercase tracking-[0.12em] mb-1">{d.label}</p>
                            <p className="text-sm font-bold text-white/80">{d.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {phase.highlights && phase.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {phase.highlights.map((h) => (
                          <span
                            key={h}
                            className="flex items-center gap-1 px-2 py-0.5 rounded bg-primary/[0.06] text-[10px] text-primary/60 font-medium"
                          >
                            <span className="h-0.5 w-0.5 rounded-full bg-primary/40" />
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                    <PhaseDocuments phase={phase} />
                  </div>

                  <div className="lg:col-span-3 space-y-4">
                    <PhasePlan phase={phase} project={project} />
                    <PhaseMedia phase={phase} project={project} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
