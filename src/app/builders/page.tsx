"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, ArrowRight, TrendingUp, Shield, Ruler, CheckCircle, Calendar, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { builders } from "@/data/builders";
import { projects } from "@/data/projects";
import siteConfig from "@/config/site";

const iconMap = [TrendingUp, Shield, Ruler, Building2];

export default function BuildersDirectoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
              { "@type": "ListItem", position: 2, name: "Builders", item: `${siteConfig.url}/builders` },
            ],
          }),
        }}
      />
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Partner Builders</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Our <span className="text-gradient">Trusted</span> Builder Partners
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              We partner only with reputed developers who meet our rigorous standards for legal compliance,
              infrastructure quality, and timely delivery.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {builders.map((builder, i) => {
              const Icon = iconMap[i % iconMap.length];
              const builderProjects = projects.filter((p) => p.builder === builder.id);
              return (
                <ScrollReveal key={builder.id} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-[1.5rem] overflow-hidden group h-full flex flex-col"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="p-8 sm:p-10 relative z-10 flex flex-col h-full">
                      <div className="flex items-start gap-5 mb-6">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 group-hover:glow-primary transition-all duration-500">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-500 tracking-tight">
                            {builder.name}
                          </h2>
                          {builder.established && (
                            <span className="inline-flex items-center gap-1.5 text-[12px] text-white/30 mt-1">
                              <Calendar className="h-3 w-3 text-primary/50" />
                              Established {builder.established}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-[14px] text-white/35 leading-relaxed mb-6">
                        {builder.description}
                      </p>

                      {builder.highlights && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {builder.highlights.map((h) => (
                            <span key={h} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/[0.06] text-[10px] text-primary/60 font-medium uppercase tracking-wider">
                              <CheckCircle className="h-3 w-3" />
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 pt-5 border-t border-white/[0.04] mt-auto">
                        <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                          <Building2 className="h-3.5 w-3.5 text-primary/50" />
                          {builder.projectCount} Project{builder.projectCount !== 1 ? "s" : ""}
                        </span>
                        {builder.projectTypes && (
                          <span className="flex items-center gap-1.5 text-[12px] text-white/30">
                            <MapPin className="h-3.5 w-3.5 text-primary/50" />
                            {builder.projectTypes}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/builders/${builder.slug}`}
                        className="btn-glass inline-flex items-center justify-center gap-2 mt-5 px-6 py-3 rounded-xl text-[12px] font-semibold text-white/55 hover:text-white/80 border border-white/[0.06] hover:border-primary/20 transition-all duration-500"
                      >
                        View Profile & Projects <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
