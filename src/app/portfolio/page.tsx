"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Building2, ArrowRight, CheckCircle, Loader2, MapPin, Ruler, Banknote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { projects } from "@/data/projects";
import { getBuilderById } from "@/data/builders";
import siteConfig from "@/config/site";

export default function PortfolioPage() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const toggleProject = (slug: string) => {
    setSelectedProjects((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const selectAll = () => {
    setSelectedProjects(selectedProjects.length === projects.length ? [] : projects.map((p) => p.slug));
  };

  const handleDownload = () => {
    setDownloading(true);
    const projectNames = selectedProjects.length
      ? selectedProjects.map((s) => projects.find((p) => p.slug === s)?.name).filter(Boolean).join(", ")
      : "All Arjun Realty Projects";
    const text = encodeURIComponent(
      `Hi, I'd like to download the portfolio for the following projects: ${projectNames}.`
    );
    setTimeout(() => {
      window.open(`${siteConfig.links.wa}?text=${text}`, "_blank");
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 400);
  };

  return (
    <>
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Project Portfolio</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Download Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Select the projects you are interested in and receive a detailed portfolio with pricing,
              floor plans, location maps, and investment projections.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* Select all bar */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={selectAll}
              className="text-[12px] text-white/40 hover:text-primary/70 transition-colors font-medium"
            >
              {selectedProjects.length === projects.length ? "Deselect All" : "Select All Projects"}
            </button>
            <span className="text-[11px] text-white/25">
              {selectedProjects.length} of {projects.length} selected
            </span>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {projects.map((p) => {
              const selected = selectedProjects.includes(p.slug);
              const builder = getBuilderById(p.builder);
              return (
                <motion.button
                  key={p.slug}
                  onClick={() => toggleProject(p.slug)}
                  whileHover={{ y: -2 }}
                  className={`glass-card rounded-[1.25rem] p-5 text-left transition-all duration-300 relative ${
                    selected
                      ? "ring-1 ring-primary/40 bg-primary/[0.03]"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  {selected && (
                    <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-bold text-white truncate">{p.name}</h3>
                      {builder && (
                        <span className="text-[10px] text-white/25">{builder.name}</span>
                      )}
                    </div>
                  </div>
                  <p className="flex items-center gap-1 text-[11px] text-white/30 mb-3">
                    <MapPin className="h-3 w-3 text-primary/50" /> {p.location.split(",")[0]}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-white/35">
                    <span className="flex items-center gap-1">
                      <Ruler className="h-3 w-3 text-primary/50" /> {p.plotSizes.split(",")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Banknote className="h-3 w-3 text-primary/50" /> {p.startingPrice}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* CTA */}
          <ScrollReveal className="text-center">
            <motion.button
              onClick={handleDownload}
              disabled={downloading}
              whileHover={{ scale: downloading ? 1 : 1.02 }}
              className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-10 py-4.5 rounded-full text-[14px] font-semibold text-white glow-primary-strong disabled:opacity-60"
            >
              {downloading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : downloaded ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Download className="h-5 w-5" />
              )}
              {downloading ? "Preparing..." : downloaded ? "Sent! Check WhatsApp" : `Download ${selectedProjects.length || "All"} Project${selectedProjects.length !== 1 ? "s" : ""}`}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <p className="text-[11px] text-white/20 mt-4">
              You will receive the portfolio on WhatsApp instantly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: FileText, title: "Detailed Brochures", desc: "Complete project details including pricing, layouts, and amenities." },
              { icon: MapPin, title: "Location Maps", desc: "Exact project locations with nearby landmarks and connectivity." },
              { icon: CheckCircle, title: "Investment Projections", desc: "Data-backed appreciation forecasts for every project." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.06}>
                  <div className="glass-card rounded-[1.25rem] p-6 text-center">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-[13px] font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-[11px] text-white/30">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
