"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, MapPin, Shield, Ruler, Banknote, Star, CheckCircle,
  X, Building2, Home, Trees, Droplets, Zap, Lock, Footprints, Bike, CircleDot, Landmark, Waves,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { projects, type Project } from "@/data/projects";
import { getBuilderById } from "@/data/builders";
import siteConfig from "@/config/site";

const amenityIconMap: Record<string, React.ReactNode> = {
  clubhouse: <Landmark className="h-4 w-4" />,
  pool: <Waves className="h-4 w-4" />,
  gym: <Zap className="h-4 w-4" />,
  security: <Lock className="h-4 w-4" />,
  park: <Trees className="h-4 w-4" />,
  garden: <Trees className="h-4 w-4" />,
  water: <Droplets className="h-4 w-4" />,
  walking: <Footprints className="h-4 w-4" />,
  cycling: <Bike className="h-4 w-4" />,
  sports: <CircleDot className="h-4 w-4" />,
};

function getAmenityIcon(name: string): React.ReactNode {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(amenityIconMap)) {
    if (lower.includes(key)) return icon;
  }
  return <CheckCircle className="h-4 w-4 text-white/30" />;
}

const comparisonFields = [
  { key: "builder", label: "Builder", render: (p: Project) => {
    const b = getBuilderById(p.builder);
    return b?.name || p.builder;
  }},
  { key: "location", label: "Location", render: (p: Project) => p.location },
  { key: "approval", label: "Approval", render: (p: Project) => p.approval },
  { key: "projectType", label: "Property Type", render: (p: Project) => p.projectType },
  { key: "projectArea", label: "Project Area", render: (p: Project) => p.projectArea || "—" },
  { key: "plotSizes", label: "Plot Sizes", render: (p: Project) => p.plotSizes },
  { key: "startingPrice", label: "Starting Price", render: (p: Project) => p.startingPrice },
  { key: "badge", label: "Status", render: (p: Project) => p.badge },
  { key: "highlights", label: "Highlights", render: (p: Project) => (
    <div className="flex flex-wrap gap-1.5">
      {p.highlights.map((h) => (
        <span key={h} className="px-2 py-0.5 rounded bg-primary/[0.06] text-[9px] text-primary/60">
          {h}
        </span>
      ))}
    </div>
  )},
];

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ids = searchParams.get("ids")?.split(",").filter(Boolean) || [];
  const selected = useMemo(() => ids.map((id) => projects.find((p) => p.slug === id)).filter(Boolean) as Project[], [ids]);

  const [selectedIds, setSelectedIds] = useState<string[]>(ids);

  const availableProjects = projects.filter((p) => !selectedIds.includes(p.slug));

  const addProject = (slug: string) => {
    if (selectedIds.length >= 3) return;
    const next = [...selectedIds, slug];
    setSelectedIds(next);
    router.replace(`/projects/compare?ids=${next.join(",")}`);
  };

  const removeProject = (slug: string) => {
    const next = selectedIds.filter((id) => id !== slug);
    setSelectedIds(next);
    if (next.length === 0) {
      router.replace("/projects/compare");
    } else {
      router.replace(`/projects/compare?ids=${next.join(",")}`);
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.04] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-white/30 hover:text-primary/60 text-sm mb-6 transition-colors duration-300">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Compare Projects</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Side-by-Side <span className="text-gradient">Comparison</span>
            </h1>
            <p className="mt-4 text-white/40 text-sm sm:text-base leading-relaxed max-w-lg">
              Compare up to 3 projects across key parameters to make an informed investment decision.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* Project selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[0, 1, 2].map((slot) => {
              const project = selected[slot];
              return (
                <div key={slot} className="glass-card rounded-2xl p-5 min-h-[160px] flex flex-col">
                  {project ? (
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-[10px] text-primary/40 font-bold uppercase tracking-wider">
                            Project {slot + 1}
                          </span>
                          <h3 className="text-[14px] font-bold text-white mt-1 leading-tight">{project.name}</h3>
                        </div>
                        <button onClick={() => removeProject(project.slug)} className="text-white/20 hover:text-red-400 transition-colors shrink-0">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-white/35 mb-2 flex-1">{project.location}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-primary/60 font-medium">
                        <Ruler className="h-3 w-3" /> {project.startingPrice}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <p className="text-[11px] text-white/25 mb-3">Select a project to compare</p>
                      {availableProjects.length > 0 && (
                        <select
                          onChange={(e) => { if (e.target.value) addProject(e.target.value); }}
                          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-[12px] text-white/60 focus:outline-none focus:border-primary/30 cursor-pointer"
                          defaultValue=""
                        >
                          <option value="" disabled>Choose project...</option>
                          {availableProjects.map((p) => (
                            <option key={p.slug} value={p.slug}>{p.name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Comparison table */}
          {selected.length >= 2 ? (
            <ScrollReveal>
              <div className="glass-card-elevated rounded-[1.5rem] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.04]">
                        <th className="p-5 text-[11px] text-white/30 font-medium uppercase tracking-wider w-[180px]">Feature</th>
                        {selected.map((p) => (
                          <th key={p.slug} className="p-5 text-[13px] font-bold text-white">
                            <Link href={`/projects/${p.slug}`} className="hover:text-primary transition-colors">
                              {p.name}
                            </Link>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFields.map((field, i) => (
                        <tr key={field.key} className={i % 2 === 0 ? "bg-white/[0.01]" : ""}>
                          <td className="p-4 text-[12px] text-white/40 font-medium border-r border-white/[0.03]">
                            {field.label}
                          </td>
                          {selected.map((p) => (
                            <td key={p.slug} className="p-4 text-[13px] text-white/70">
                              {field.render(p)}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {/* Amenities row */}
                      <tr className="border-t border-white/[0.04]">
                        <td className="p-4 text-[12px] text-white/40 font-medium border-r border-white/[0.03]">Amenities</td>
                        {selected.map((p) => (
                          <td key={p.slug} className="p-4">
                            <div className="flex flex-wrap gap-1.5">
                              {p.amenities.slice(0, 6).map((a) => (
                                <span key={a} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.03] text-[10px] text-white/40">
                                  {getAmenityIcon(a)} {a}
                                </span>
                              ))}
                              {p.amenities.length > 6 && (
                                <span className="text-[10px] text-white/20">+{p.amenities.length - 6} more</span>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Select at least 2 projects to compare</h3>
              <p className="text-[13px] text-white/30 max-w-md mx-auto">
                Use the slots above to pick projects side by side and see how they stack up on price, approvals, amenities, and more.
              </p>
            </div>
          )}

          {selected.length >= 2 && (
            <div className="text-center mt-10">
              <a
                href={`${siteConfig.links.wa}?text=Hi%2C%20I%27m%20comparing%20${selected.map((p) => encodeURIComponent(p.name)).join("%20vs%20")}%20and%20need%20expert%20advice`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-8 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
              >
                Need Help Deciding? Talk to an Advisor <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
