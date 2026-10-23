"use client";

import {
  Ruler,
  Layers,
  Building2,
  Shield,
  Landmark,
  BadgeCheck,
  Banknote,
  Home,
  Boxes,
} from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import type { Project } from "@/data/projects";
import { useLocale } from "@/i18n/LocaleContext";
import { getProjectLabels } from "@/i18n/project-labels";

export default function ProjectFactsSection({ project }: { project: Project }) {
  const { locale } = useLocale();
  const t = getProjectLabels(locale);
  const facts: { icon: React.ReactNode; label: string; value: string }[] = [];

  const area = project.projectArea || (project.totalAcres ? `${project.totalAcres} Acres` : "");
  if (area) facts.push({ icon: <Ruler className="h-5 w-5" />, label: t.projectArea, value: area });

  if (project.totalPlots) facts.push({ icon: <Boxes className="h-5 w-5" />, label: t.totalPlots, value: project.totalPlots });

  if (project.units && project.units.length > 0) {
    facts.push({
      icon: <Home className="h-5 w-5" />,
      label: t.inventory,
      value: project.units.map((u) => `${u.count} ${u.type}`).join(" · "),
    });
  }

  if (project.plotSizes) facts.push({ icon: <Layers className="h-5 w-5" />, label: t.plotSizes, value: project.plotSizes });

  if (project.clubhouseDetails) facts.push({ icon: <Building2 className="h-5 w-5" />, label: t.clubhouse, value: project.clubhouseDetails });

  if (project.approval) facts.push({ icon: <Shield className="h-5 w-5" />, label: t.approvals, value: project.approval });

  if (project.status) facts.push({ icon: <BadgeCheck className="h-5 w-5" />, label: t.status, value: project.status });

  if (project.bankLoanAvailable !== undefined) {
    facts.push({
      icon: <Banknote className="h-5 w-5" />,
      label: t.bankLoan,
      value: project.bankLoanAvailable ? t.availableFact : t.notAvailable,
    });
  }

  if (facts.length === 0) return null;

  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <SectionLabel>{t.projectFacts}</SectionLabel>
          <h2 className="mt-5 text-2xl font-bold tracking-tight mb-2">
            {t.factsHeadingPre} <span className="text-gradient">{t.factsHeadingAccent}</span>
          </h2>
          <p className="text-sm text-white/30 mb-8 max-w-xl">
            {t.factsIntro}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {facts.map((f) => (
              <div
                key={f.label}
                className="glass-card rounded-2xl p-6 flex flex-col group hover:border-primary/10 transition-all duration-300"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/[0.08] flex items-center justify-center shrink-0 mb-4 group-hover:bg-primary/[0.15] transition-colors duration-300 text-primary/70">
                  {f.icon}
                </div>
                <p className="text-[10px] text-white/25 uppercase tracking-[0.15em] mb-1.5 font-medium">
                  {f.label}
                </p>
                <p className="text-sm font-semibold text-white/80 leading-relaxed">{f.value}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mt-6 flex items-start gap-3 glass-card-elevated rounded-2xl px-6 py-5">
            <Landmark className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-white/35 leading-relaxed">
              {t.verifiedNote(project.name)}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
