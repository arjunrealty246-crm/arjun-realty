"use client";

import { CheckCircle2, Loader2, Clock, TrendingUp } from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import type { Project, ProjectUpdate } from "@/data/projects";

const statusMeta: Record<ProjectUpdate["status"], { label: string; icon: React.ReactNode; dot: string; text: string }> = {
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
    dot: "bg-emerald-400",
    text: "text-emerald-400",
  },
  "in-progress": {
    label: "In Progress",
    icon: <Loader2 className="h-5 w-5 text-primary animate-spin" />,
    dot: "bg-primary",
    text: "text-primary",
  },
  planned: {
    label: "Planned",
    icon: <Clock className="h-5 w-5 text-gold" />,
    dot: "bg-gold",
    text: "text-gold",
  },
};

export default function DevelopmentTimeline({ project }: { project: Project }) {
  const updates = (project.updates || []).filter(Boolean);
  if (updates.length === 0) return null;

  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <SectionLabel>Development Updates</SectionLabel>
          <h2 className="mt-5 text-2xl font-bold tracking-tight mb-2">
            Project <span className="text-gradient">Milestones</span>
          </h2>
          <p className="text-sm text-white/30 mb-8 max-w-xl">
            Current stage of approvals, bookings and community development.
          </p>
        </ScrollReveal>

        <div className="relative max-w-3xl">
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-white/[0.06]" />

          <div className="space-y-6">
            {updates.map((u, i) => {
              const meta = statusMeta[u.status] || statusMeta.planned;
              return (
                <ScrollReveal key={`${u.title}-${i}`} delay={0.05 * i}>
                  <div className="relative pl-16">
                    <div
                      className={`absolute left-0 top-1 h-11 w-11 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center ${meta.dot} ring-4 ring-charcoal-dark`}
                    >
                      {meta.icon}
                    </div>
                    <div className="glass-card rounded-xl px-5 py-4 group hover:border-white/[0.08] transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-white/85 group-hover:text-white transition-colors duration-300">
                          {u.title}
                        </h3>
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider ${meta.text}`}>
                          <TrendingUp className="h-3 w-3" /> {meta.label}
                        </span>
                      </div>
                      {u.description && (
                        <p className="text-sm text-white/40 leading-relaxed mt-1.5">{u.description}</p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
