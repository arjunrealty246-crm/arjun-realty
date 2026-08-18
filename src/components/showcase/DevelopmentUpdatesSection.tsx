"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, X, Camera, Image as ImageIcon } from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import type { Project } from "@/data/projects";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjwvc3ZnPg==";

export default function DevelopmentUpdatesSection({ project }: { project: Project }) {
  const items = (project.developmentUpdates || []).filter((u) => u && u.title);
  const [lightbox, setLightbox] = useState<{ update: number; image: number } | null>(null);

  const photoCount = useCallback(
    (update: number) => (items[update]?.images || []).length,
    [items]
  );

  const nextPhoto = useCallback(() => {
    if (!lightbox) return;
    const count = photoCount(lightbox.update);
    if (count === 0) return;
    setLightbox({
      update: lightbox.update,
      image: (lightbox.image + 1) % count,
    });
  }, [lightbox, photoCount]);

  const prevPhoto = useCallback(() => {
    if (!lightbox) return;
    const count = photoCount(lightbox.update);
    if (count === 0) return;
    setLightbox({
      update: lightbox.update,
      image: (lightbox.image - 1 + count) % count,
    });
  }, [lightbox, photoCount]);

  if (items.length === 0) return null;

  const activeItem = lightbox ? items[lightbox.update] : undefined;
  const activeImages = activeItem?.images || [];
  const activeSrc = lightbox ? activeImages[lightbox.image] : undefined;

  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <SectionLabel>Project Updates</SectionLabel>
          <h2 className="mt-5 text-2xl font-bold tracking-tight mb-2">
            Development &amp; Community <span className="text-gradient">Updates</span>
          </h2>
          <p className="text-sm text-white/30 mb-8 max-w-xl">
            Latest milestones, site progress and community news for {project.name}.
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {items.map((u, i) => (
            <ScrollReveal key={`${u.title}-${i}`} delay={0.05 * i}>
              <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {u.date && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-[11px] font-semibold text-primary">
                      <CalendarDays className="h-3.5 w-3.5" /> {u.date}
                    </span>
                  )}
                  <h3 className="text-base lg:text-lg font-bold text-white">{u.title}</h3>
                </div>
                {u.description && (
                  <p className="text-sm text-white/45 leading-relaxed mb-5 max-w-3xl">
                    {u.description}
                  </p>
                )}
                {(u.images || []).length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {(u.images || []).map((src, j) => (
                      <motion.button
                        key={`${src}-${j}`}
                        onClick={() => setLightbox({ update: i, image: j })}
                        whileHover={{ scale: 1.02 }}
                        className="relative h-40 lg:h-48 rounded-xl overflow-hidden group cursor-pointer"
                      >
                        <Image
                          src={src}
                          alt={`${project.name} — ${u.title} (${j + 1})`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL={BLUR}
                        />
                        <div className="absolute inset-0 bg-charcoal-dark/20 group-hover:bg-charcoal-dark/10 transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="h-10 w-10 rounded-full bg-primary/85 flex items-center justify-center shadow-lg shadow-primary/25">
                            <ImageIcon className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && activeSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 h-10 w-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </button>

            {activeImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
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
              {activeSrc ? (
                <Image
                  src={activeSrc}
                  alt={`${project.name} — ${activeItem?.title || "Update"}`}
                  fill
                  sizes="80vw"
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="h-16 w-16 text-white/10" />
                </div>
              )}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full glass text-xs text-white/50 font-medium">
                {lightbox.image + 1} / {activeImages.length}
              </div>
            </div>

            {activeImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
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
