"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PropertySearch from "@/components/PropertySearch";
import { MapPin, ArrowRight, Shield, Star, Phone, Building2 } from "lucide-react";
import Link from "next/link";
import { projects as allProjects, type Project } from "@/data/projects";
import { getBuilderById } from "@/data/builders";
import { getProjectGradient } from "@/lib/assets";
import { useDbProjectImages } from "@/hooks/useDbProjectImages";
import siteConfig from "@/config/site";

export default function ProjectsPage() {
  const [filtered, setFiltered] = useState<Project[]>(allProjects);
  const dbImages = useDbProjectImages();
  const getImage = useMemo(() => (p: Project) => dbImages[p.slug] || p.image, [dbImages]);

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
              { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.url}/projects` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: allProjects.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.name,
              url: `${siteConfig.url}/projects/${project.slug}`,
              description: project.description?.slice(0, 160) || `${project.name} premium real estate project in ${project.location}`,
            })),
          }),
        }}
      />
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Our Projects</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Premium <span className="text-gradient">Investment</span> Opportunities
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Every project we offer has been meticulously vetted for legal
              compliance, infrastructure quality, and long-term appreciation
              potential.
            </p>
          </ScrollReveal>

          <div className="mt-10">
            <PropertySearch onFilteredProjects={setFiltered} />
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => {
                const builder = getBuilderById(p.builder);
                return (
                  <ScrollReveal key={p.slug} delay={i * 0.06}>
                    <Link href={`/projects/${p.slug}`}>
                      <motion.div whileHover={{ y: -8 }} className="glass-card rounded-[1.25rem] overflow-hidden group cursor-pointer h-full flex flex-col">
                        <div className="relative h-56 overflow-hidden">
                          {getImage(p) ? (
                            <Image
                              src={getImage(p)}
                              alt={`${p.name} premium real estate project in ${p.location}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                              placeholder="blur"
                              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjwvc3ZnPg=="
                            />
                          ) : (
                            <div className={`absolute inset-0 bg-gradient-to-br ${getProjectGradient(p.slug)}`} />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/30 to-transparent" />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/85 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                              <Star className="h-2.5 w-2.5" /> {p.badge}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass text-[10px] font-medium text-white/70">
                              <Shield className="h-2.5 w-2.5 text-emerald-400" /> {p.approval.split("·")[0].trim()}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 z-10">
                            <div className="px-4 py-2 rounded-xl glass-strong backdrop-blur-md">
                              <span className="block text-lg font-bold text-gradient">{p.startingPrice}</span>
                              <span className="text-[9px] text-white/35 uppercase tracking-wider">Starting From</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-500 tracking-tight mb-1.5">{p.name}</h3>
                          <p className="flex items-center gap-1.5 text-xs text-white/35 mb-2">
                            <MapPin className="h-3 w-3 text-primary/60" /> {p.location}
                          </p>
                          {builder && (
                            <p className="flex items-center gap-1.5 text-[11px] text-white/25 mb-3">
                              <Building2 className="h-3 w-3 text-primary/40" /> {builder.name}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {p.highlights.slice(0, 3).map((f) => (
                              <span key={f} className="px-2 py-1 rounded-md bg-white/[0.03] text-[10px] text-white/40 font-medium border border-white/[0.03]">{f}</span>
                            ))}
                          </div>
                          <p className="text-[11px] text-white/30 mb-5">{p.plotSizes}</p>
                          <div className="mt-auto pt-4 border-t border-white/[0.04] flex items-end justify-between">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                              {p.isUpcoming ? "Coming Soon" : "Available Now"}
                            </span>
                            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-primary group-hover:gap-3 transition-all duration-500">
                              Details <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-16 text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No projects match your criteria</h3>
              <p className="text-[13px] text-white/30 max-w-md mx-auto mb-6">
                Try adjusting your filters or broaden your search. We also have access to off-market projects.
              </p>
              <a
                href={`${siteConfig.links.wa}?text=Hi%2C%20I%20have%20specific%20requirements`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-6 py-3 rounded-full text-[12px] font-semibold text-white glow-primary-strong"
              >
                <Phone className="h-3.5 w-3.5" /> Talk to an Advisor
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Can&apos;t Find What You&apos;re Looking For?</h2>
            <p className="text-white/35 mb-8 text-[14px]">We have access to exclusive off-market projects. Tell us your requirements and we&apos;ll find the perfect match.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`${siteConfig.links.wa}?text=Hi%2C%20I%20have%20specific%20requirements`} target="_blank" rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.2)]">
                <Phone className="h-4 w-4" /> Talk to an Advisor
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
