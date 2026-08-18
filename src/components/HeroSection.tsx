"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, MessageCircle, Shield, Award, CheckCircle, TrendingUp, ArrowRight, Building2, MapPin } from "lucide-react";
import CountUp from "./CountUp";
import siteConfig from "@/config/site";
import { heroStats, heroTrustBadges } from "@/data/statistics";
import { hero } from "@/data/content";

const stats = heroStats;

const badgeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "HMDA Approved": Shield, "DTCP Approved": Shield,
  "RERA Registered": CheckCircle, "FCDA Approved": Award,
};
const trustBadges = heroTrustBadges.map(b => ({ icon: badgeIconMap[b.label] || Shield, label: b.label }));

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <motion.div style={isMobile ? undefined : { y: bgY }} className="absolute inset-0 -top-20">
        <div className="absolute inset-0 bg-[#06060c]" />
        <motion.div
          className="absolute top-[10%] left-[5%] w-[700px] h-[700px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.2), transparent 65%)" }}
          animate={isMobile ? undefined : { x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[0%] w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(212,165,116,0.25), transparent 65%)" }}
          animate={isMobile ? undefined : { x: [0, -40, 50, 0], y: [0, 30, -40, 0], scale: [1, 0.85, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.15), transparent 55%)" }}
          animate={isMobile ? undefined : { scale: [1, 1.25, 1], rotate: [0, 60, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, rgba(232,201,160,0.3), transparent 65%)" }}
          animate={isMobile ? undefined : { x: [0, -20, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 hero-grid opacity-[0.025]" />
        <div className="absolute inset-0 bg-hero-overlay" />
      </motion.div>

      <motion.div style={isMobile ? undefined : { y: textY, opacity }} className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 text-center pt-28 sm:pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-medium text-[11px] font-semibold tracking-[0.22em] uppercase text-white/55">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {hero.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1 className="text-[clamp(2.5rem,7.5vw,5.8rem)] font-bold tracking-[-0.04em] leading-[0.98]">
            <span className="block text-white">{hero.headline1}</span>
            <span className="block text-gradient mt-2">{hero.headline2}</span>
            <span className="block text-white mt-2">{hero.headline3}</span>
          </h1>
        </motion.div>

        {/* Line accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex justify-center mb-6"
        >
          <div className="hero-line" />
        </motion.div>

        {/* Subhead — benefit-rich */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[640px] text-[0.95rem] sm:text-[1.05rem] text-white/30 leading-relaxed mb-10 font-light tracking-wide"
        >
          {hero.subhead}
        </motion.p>

        {/* CTAs — primary + secondary with clear value props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10"
        >
          <a
            href={`${siteConfig.links.wa}?text=Hi%20Arjun%20Realty%2C%20I%27d%20like%20a%20free%20consultation`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium group flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-10 sm:px-12 py-4 sm:py-[1.15rem] rounded-full text-[14px] font-semibold text-white glow-primary-strong"
          >
            <Calendar className="h-4 w-4" />
            {hero.primaryCta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="/projects"
            className="btn-glass group flex items-center gap-3 px-10 sm:px-12 py-4 sm:py-[1.15rem] rounded-full text-[14px] font-semibold text-white/75"
          >
            <Building2 className="h-4 w-4" />
            {hero.secondaryCta}
          </a>
          <a
            href={siteConfig.links.tel}
            className="btn-glass group flex items-center gap-3 px-0 py-0 text-[14px] font-semibold text-white/50 hover:text-primary/70 transition-colors duration-300"
          >
            <MessageCircle className="h-4 w-4" />
            {siteConfig.contact.phone}
          </a>
        </motion.div>

        {/* Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-14"
        >
          {trustBadges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 + i * 0.08 }}
              className="flex items-center gap-2 text-[11px] text-white/25 font-medium"
            >
              <b.icon className="h-3.5 w-3.5 text-primary/50" />
              {b.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats — social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 + i * 0.08, duration: 0.6 }}
              className="glass-card rounded-2xl p-5 sm:p-6 text-center cursor-default group hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="text-[1.75rem] sm:text-[2.2rem] font-bold text-gradient mb-1.5 tracking-tight">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[10px] sm:text-[11px] text-white/25 uppercase tracking-[0.18em] font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/15 font-medium">
            {hero.scrollIndicator}
          </span>
          <div className="w-6 h-9 rounded-full border border-white/[0.08] flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-primary/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
