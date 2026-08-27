"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => { setDirection(1); setCurrent((p) => (p + 1) % testimonials.length); }, []);
  const prev = useCallback(() => { setDirection(-1); setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length); }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-section-alt">
      <div className="ambient-orb w-[400px] h-[400px] bg-primary/[0.03] -right-32 bottom-0" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] leading-tight">
            Trusted by <span className="text-gradient">1000+ Investors</span>
          </h2>
        </ScrollReveal>

        {/* Desktop: 3-card grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.08}>
              <div className="glass-card rounded-3xl p-8 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Quote className="h-7 w-7 text-primary/20 mb-5" />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-primary/80 text-primary/80" />
                  ))}
                </div>
                <p className="text-[13px] text-white/50 leading-[1.75] flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-white/[0.04]">
                    <div className="h-10 w-10 rounded-full bg-cover bg-center border border-white/10 shrink-0 flex items-center justify-center text-[11px] font-bold text-primary/70" style={{ backgroundImage: t.image ? `url(${t.image})` : undefined, background: t.image ? undefined : "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(212,165,116,0.08))" }}>
                      {!t.image && t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white/90">{t.name}</p>
                      <p className="text-[11px] text-white/30">{t.role}</p>
                    </div>
                  </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: single card carousel */}
        <div className="lg:hidden">
          <div className="glass-card rounded-3xl p-6 sm:p-8 min-h-[360px] flex flex-col relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full"
              >
                <Quote className="h-7 w-7 text-primary/20 mb-4" />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonials[current].rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-primary/80 text-primary/80" />
                  ))}
                </div>
                <p className="text-[13px] text-white/50 leading-[1.75] flex-1 mb-6">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-white/[0.04]">
                    <div className="h-10 w-10 rounded-full bg-cover bg-center border border-white/10 shrink-0 flex items-center justify-center text-[11px] font-bold text-primary/70" style={{ backgroundImage: testimonials[current].image ? `url(${testimonials[current].image})` : undefined, background: testimonials[current].image ? undefined : "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(212,165,116,0.08))" }}>
                      {!testimonials[current].image && testimonials[current].name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white/90">{testimonials[current].name}</p>
                      <p className="text-[11px] text-white/30">{testimonials[current].role}</p>
                    </div>
                  </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-5 mt-6">
            <button onClick={prev} className="h-10 w-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/20 transition-all duration-300">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-primary" : "w-1.5 bg-white/15 hover:bg-white/25"}`}
                />
              ))}
            </div>
            <button onClick={next} className="h-10 w-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/20 transition-all duration-300">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="text-center mt-8">
            <a href="/testimonials" className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-primary transition-colors duration-300 font-medium">
              View All Testimonials
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
