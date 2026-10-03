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
import { getProjectHref } from "@/lib/project-links";
import { useDbProjectImages } from "@/hooks/useDbProjectImages";
import siteConfig from "@/config/site";

const DTCP_APPROVED_PROJECTS = allProjects.filter(
  (p) => p.approval.includes("DTCP") && !p.approval.toLowerCase().includes("under process")
);

const PROJECT_FAQS = [
  {
    q: "Which DTCP approved plots are available in Hyderabad?",
    a: "Arjun Realty lists DTCP approved projects across Hyderabad, including JB Pristine City — a 150-acre DTCP & RERA approved gated community in Vikarabad, West Hyderabad — and JB Nature Valley, a 720+ acre DTCP approved and RERA registered township on NH-65 at Choutuppal. Each project page lists its exact approval status, plot sizes and starting price.",
  },
  {
    q: "What is the difference between HMDA, DTCP and RERA approved plots?",
    a: "HMDA and DTCP are Telangana's land-use approval authorities, while RERA registration is the separate real-estate regulatory registration. A project can carry one or both approvals, so buyers should check the approval string on each project page. Our DTCP, HMDA & FCDA approvals guide explains how to verify each one before booking.",
  },
  {
    q: "Do you help with bank loans and site visits for plots?",
    a: "Yes. Bank loan facility is available on several of the layouts we represent, and our team arranges guided site visits. Contact Arjun Realty with the project name and we will share current availability, plot sizes and the approval documents to verify before you pay anything.",
  },
];

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
              url: `${siteConfig.url}${getProjectHref(project.slug)}`,
              description: project.description?.slice(0, 160) || `${project.name} premium real estate project in ${project.location}`,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PROJECT_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
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
              HMDA &amp; DTCP <span className="text-gradient">Approved Plots</span> for Sale in Hyderabad
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Every project we offer has been meticulously vetted for legal
              compliance, infrastructure quality, and long-term appreciation
              potential.
            </p>
            <p className="mt-4 text-white/35 text-sm sm:text-base leading-relaxed max-w-xl">
              Browse villa plots and open plots for sale across Hyderabad and its growth corridors — from HMDA &amp; RERA approved townships in Ibrahimpatnam to FCDA approved plots on the Srisailam Highway. Looking for{" "}
              <Link href={getProjectHref("jb-pristine-city")} className="text-primary hover:text-primary/80 font-medium transition-colors duration-300">
                DTCP approved plots in Hyderabad
              </Link>
              ? Start with JB Pristine City, our DTCP &amp; RERA approved 150-acre community in Vikarabad, or the DTCP approved &amp; RERA registered{" "}
              <Link href={getProjectHref("jb-nature-valley")} className="text-primary hover:text-primary/80 font-medium transition-colors duration-300">
                JB Nature Valley
              </Link>
              on NH-65 at Choutuppal. Every page lists the exact approval status, plot sizes and current availability.
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
                    <Link href={getProjectHref(p.slug)}>
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

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <SectionLabel>DTCP Approved Inventory</SectionLabel>
            <h2 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              DTCP &amp; RERA Approved <span className="text-gradient">Plots in Hyderabad</span>
            </h2>
            <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-3xl mb-10">
              Searching for DTCP approved plots for sale in Hyderabad, or DTCP &amp; RERA
              approved open plots? These are the layouts in our inventory that carry
              a completed DTCP approval today. Projects still under approval are
              labelled as such on their own pages and are never listed here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DTCP_APPROVED_PROJECTS.map((p) => (
                <Link key={p.slug} href={getProjectHref(p.slug)}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="glass-card rounded-[1.25rem] p-7 h-full flex flex-col group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-500 tracking-tight">
                        {p.name}
                      </h3>
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-semibold">
                        <Shield className="h-3 w-3" /> {p.approval.split("·")[0].trim()}
                      </span>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs text-white/35 mb-2">
                      <MapPin className="h-3 w-3 text-primary/60" /> {p.location}
                    </p>
                    {p.totalAcres && (
                      <p className="text-xs text-white/30 mb-4">{p.totalAcres} acre layout</p>
                    )}
                    <p className="text-[13px] text-white/40 leading-relaxed mb-5">
                      {p.plotSizes}
                    </p>
                    <div className="mt-auto pt-4 border-t border-white/[0.04] flex items-center justify-between">
                      <span className="text-sm font-bold text-gradient">{p.startingPrice}</span>
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary group-hover:gap-2.5 transition-all duration-500">
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="text-white/30 text-[13px] self-center">Explore by corridor:</span>
              {[
                { label: "Vikarabad plots", href: "/vikarabad" },
                { label: "Ibrahimpatnam plots", href: "/ibrahimpatnam" },
                { label: "Srisailam Highway plots", href: "/srisailam-highway-future-city" },
                { label: "Plots near ORR", href: "/orr" },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="px-4 py-2 rounded-full border border-white/[0.08] text-[12px] font-medium text-white/50 hover:text-primary hover:border-primary/30 transition-colors duration-300"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <SectionLabel>Plot Buying Questions</SectionLabel>
            <h2 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight mb-8">
              DTCP &amp; RERA Approved <span className="text-gradient">Plots — FAQ</span>
            </h2>
            <div className="space-y-3 max-w-3xl">
              {PROJECT_FAQS.map((faq) => (
                <div key={faq.q} className="glass-card rounded-xl p-6">
                  <h3 className="text-[15px] font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-[13px] mt-6 max-w-3xl">
              Read our{" "}
              <Link
                href="/insights/dtcp-hmda-fcda-approvals-which-to-choose"
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
              >
                DTCP, HMDA &amp; FCDA approvals guide
              </Link>{" "}
              to verify approvals before you book.
            </p>
          </ScrollReveal>
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
