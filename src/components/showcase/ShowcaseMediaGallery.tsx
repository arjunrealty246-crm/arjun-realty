"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Play,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Building2,
  Download,
  ExternalLink,
  Map as MapIcon,
} from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import { getProjectMedia, getProjectGradient } from "@/lib/assets";
import { getDownloadUrl } from "@/lib/download-url";
import type { Project, ProjectMediaItem } from "@/data/projects";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjwvc3ZnPg==";

function isVideoUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return lower.includes("/video/upload/") || /\.(mp4|webm|mov)(\?|$)/.test(lower);
}

const fallbackLabels = [
  "Project Aerial View",
  "Clubhouse Exterior",
  "Landscaped Gardens",
  "Internal Roads",
  "Entrance Arch",
  "Children's Play Area",
  "Jogging Track",
  "Security Cabin",
];

function mediaLabel(index: number): string {
  return fallbackLabels[index] || `Media ${index + 1}`;
}

export default function ShowcaseMediaGallery({ project }: { project: Project }) {
  const galleryMeta = (project.gallery || []).filter((g) => g && g.src);
  const media: ProjectMediaItem[] = galleryMeta.length
    ? galleryMeta.map((g) => ({ type: (g.type === "video" || isVideoUrl(g.src) ? "video" : "image") as "image" | "video", src: g.src, label: g.title }))
    : getProjectMedia(project);
  const [tab, setTab] = useState<"gallery" | "layout">("gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [masterPlanFailed, setMasterPlanFailed] = useState(false);

  const total = media.length;

  function captionFor(i: number): string {
    return galleryMeta[i]?.title || media[i]?.label || mediaLabel(i);
  }

  const nextSlide = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? prev : (prev + 1) % total));
  }, [total]);

  const prevSlide = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? prev : (prev - 1 + total) % total));
  }, [total]);

  const active = lightboxIndex !== null ? media[lightboxIndex] : null;

  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <SectionLabel>Project Gallery</SectionLabel>
            <div className="flex gap-1 glass rounded-full p-1 flex-shrink-0">
              {(["gallery", "layout"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                    tab === t ? "bg-primary/90 text-white" : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {t === "gallery" ? (media.some((m) => m.type === "video") ? "Photos & Videos" : "Photos") : "Layout"}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === "gallery" ? (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              >
                {media.length === 0 && (
                  <div className="col-span-full glass-card-elevated rounded-2xl h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-white/10 mx-auto mb-3" />
                      <p className="text-sm text-white/25 font-medium">Gallery coming soon</p>
                      <p className="text-xs text-white/15 mt-1">Ask us for the latest site photos &amp; videos</p>
                    </div>
                  </div>
                )}

                {media.map((item, i) => {
                  const isVideo = item.type === "video";
                  const isHero = i === 0;
                  const category = galleryMeta[i]?.category;
                  return (
                    <motion.button
                      key={`${item.type}-${item.src}-${i}`}
                      onClick={() => setLightboxIndex(i)}
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                        isHero ? "col-span-2 row-span-2 h-72 lg:h-full" : "h-44 lg:h-52"
                      }`}
                    >
                      {item.src && !failed[i] ? (
                        isVideo ? (
                          <video
                            src={item.src}
                            muted
                            loop
                            preload="metadata"
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                            onError={() => setFailed((prev) => (prev[i] ? prev : { ...prev, [i]: true }))}
                          />
                        ) : (
                          <Image
                            src={item.src}
                            alt={`${project.name} — ${captionFor(i)}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                            placeholder="blur"
                            blurDataURL={BLUR}
                            onError={() => setFailed((prev) => (prev[i] ? prev : { ...prev, [i]: true }))}
                          />
                        )
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${getProjectGradient(project.slug + i)}`} />
                      )}
                      <div className="absolute inset-0 bg-charcoal-dark/20 group-hover:bg-charcoal-dark/10 transition-colors duration-500" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {isVideo ? (
                          <>
                            <div className="h-14 w-14 rounded-full bg-primary/85 flex items-center justify-center mb-2 shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                              <Play className="h-6 w-6 text-white ml-0.5 fill-current" />
                            </div>
                            <span className="text-[10px] text-white/40 uppercase tracking-wider">Video</span>
                          </>
                        ) : (
                          <>
                            <Camera className="h-8 w-8 text-white/10 group-hover:text-primary/25 transition-colors duration-500 mb-2" />
                            <span className="text-[10px] text-white/15 uppercase tracking-wider group-hover:text-white/30 transition-colors duration-500">
                              {captionFor(i)}
                            </span>
                          </>
                        )}
                      </div>
                      {category && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass text-[10px] font-semibold text-white/70">
                          {category}
                        </div>
                      )}
                      {isHero && !isVideo && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] font-semibold text-white/60">
                          <ImageIcon className="h-3 w-3" /> {media.length} Media
                        </div>
                      )}
                    </motion.button>
                  );
                })}
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
                    <div className="px-6 py-4 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-white/40 flex items-center gap-2">
                        <MapIcon className="h-4 w-4 text-primary/50" /> Master Plan — {project.name}
                      </p>
                      <div className="flex items-center gap-4">
                        {project.layoutPdfUrl && (
                          <a
                            href={getDownloadUrl(project.layoutPdfUrl)}
                            download
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                          >
                            <Download className="h-3.5 w-3.5" /> Download Layout
                          </a>
                        )}
                        {project.masterPlanUrl && (
                          <a
                            href={getDownloadUrl(project.masterPlanUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> View Full Size
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card-elevated rounded-2xl h-80 lg:h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="h-16 w-16 text-white/5 mx-auto mb-4" />
                      <p className="text-sm text-white/25 font-medium">Project layout map coming soon</p>
                      <p className="text-xs text-white/15 mt-1">Contact us to receive the detailed layout</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 h-10 w-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </button>

            {total > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
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
              {active.type === "video" ? (
                active.src && !failed[lightboxIndex] ? (
                  <video
                    src={active.src}
                    poster={active.poster}
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onError={() => setFailed((prev) => ({ ...prev, [lightboxIndex]: true }))}
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getProjectGradient(project.slug + lightboxIndex)}`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Camera className="h-16 w-16 text-white/10 mb-4" />
                      <p className="text-sm text-white/25 font-medium">{captionFor(lightboxIndex)}</p>
                    </div>
                  </div>
                )
              ) : active.src && !failed[lightboxIndex] ? (
                <Image
                  src={active.src}
                  alt={`${project.name} — ${captionFor(lightboxIndex)}`}
                  fill
                  sizes="80vw"
                  className="object-cover"
                  onError={() => setFailed((prev) => ({ ...prev, [lightboxIndex]: true }))}
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${getProjectGradient(project.slug + lightboxIndex)}`}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera className="h-16 w-16 text-white/10 mb-4" />
                    <p className="text-sm text-white/25 font-medium">{captionFor(lightboxIndex)}</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full glass text-xs text-white/50 font-medium">
                {lightboxIndex + 1} / {total}
              </div>
            </div>

            {total > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-4 lg:right-8 h-12 w-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
