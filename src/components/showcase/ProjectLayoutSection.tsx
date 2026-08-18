"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Download,
  ExternalLink,
  X,
  FileText,
} from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import type { Project } from "@/data/projects";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIvPjwvc3ZnPg==";

function isImageUrl(url: string): boolean {
  const ext = url.toLowerCase().split("?")[0].slice(url.lastIndexOf("."));
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(ext);
}

export default function ProjectLayoutSection({ project }: { project: Project }) {
  const layoutUrl = project.layoutUrl;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!layoutUrl) return null;

  const isImage = isImageUrl(layoutUrl);

  if (isImage) {
    return (
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <SectionLabel>Layout &amp; Master Plan</SectionLabel>
            <h2 className="mt-5 text-2xl font-bold tracking-tight mb-2">
              Project <span className="text-gradient">Layout</span>
            </h2>
            <p className="text-sm text-white/30 mb-8 max-w-xl">
              View the site layout and master plan for {project.name}.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card-elevated rounded-2xl overflow-hidden">
              <div className="relative h-80 lg:h-[32rem]">
                {layoutUrl && !failed ? (
                  <Image
                    src={layoutUrl}
                    alt={`${project.name} — Layout / Master Plan`}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-contain"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    onError={() => setFailed(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <LayoutDashboard className="h-16 w-16 text-white/10" />
                  </div>
                )}
              </div>
              <div className="px-6 py-4 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-white/40 flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4 text-primary/50" /> Layout / Master Plan — {project.name}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setLightboxOpen(true)}
                    disabled={failed}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/[0.08] border border-primary/15 text-[11px] font-semibold text-primary hover:bg-primary/[0.15] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> View Layout
                  </button>
                  <a
                    href={layoutUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[11px] font-semibold text-white/60 hover:border-primary/20 hover:text-primary transition-colors duration-300"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-6 right-6 h-10 w-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
              >
                <X className="h-5 w-5" />
              </button>
              <div
                className="relative max-w-5xl w-full h-[80vh] rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={layoutUrl}
                  alt={`${project.name} — Layout / Master Plan`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <SectionLabel>Layout &amp; Master Plan</SectionLabel>
          <h2 className="mt-5 text-2xl font-bold tracking-tight mb-2">
            Project <span className="text-gradient">Layout</span>
          </h2>
          <p className="text-sm text-white/30 mb-8 max-w-xl">
            Download or view the detailed site layout for {project.name}.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card-elevated rounded-2xl p-8 lg:p-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white">Layout Plan</h3>
                <p className="text-xs text-white/30 mt-0.5">PDF document · {project.name}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={layoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-6 py-3 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
              >
                <ExternalLink className="h-4 w-4" /> View Layout
              </a>
              <a
                href={layoutUrl}
                download
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] font-semibold text-white/60 hover:bg-white/[0.07] hover:border-primary/20 hover:text-primary transition-all duration-300"
              >
                <Download className="h-4 w-4" /> Download Layout
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
