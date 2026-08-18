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

export default function ProjectFactsSection({ project }: { project: Project }) {
  const facts: { icon: React.ReactNode; label: string; value: string }[] = [];

  const area = project.projectArea || (project.totalAcres ? `${project.totalAcres} Acres` : "");
  if (area) facts.push({ icon: <Ruler className="h-5 w-5" />, label: "Project Area", value: area });

  if (project.totalPlots) facts.push({ icon: <Boxes className="h-5 w-5" />, label: "Total Plots", value: project.totalPlots });

  if (project.units && project.units.length > 0) {
    facts.push({
      icon: <Home className="h-5 w-5" />,
      label: "Inventory",
      value: project.units.map((u) => `${u.count} ${u.type}`).join(" · "),
    });
  }

  if (project.plotSizes) facts.push({ icon: <Layers className="h-5 w-5" />, label: "Plot Sizes", value: project.plotSizes });

  if (project.clubhouseDetails) facts.push({ icon: <Building2 className="h-5 w-5" />, label: "Clubhouse", value: project.clubhouseDetails });

  if (project.approval) facts.push({ icon: <Shield className="h-5 w-5" />, label: "Approvals", value: project.approval });

  if (project.status) facts.push({ icon: <BadgeCheck className="h-5 w-5" />, label: "Status", value: project.status });

  if (project.bankLoanAvailable !== undefined) {
    facts.push({
      icon: <Banknote className="h-5 w-5" />,
      label: "Bank Loan",
      value: project.bankLoanAvailable ? "Available" : "Not Available",
    });
  }

  if (facts.length === 0) return null;

  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <SectionLabel>Project Facts</SectionLabel>
          <h2 className="mt-5 text-2xl font-bold tracking-tight mb-2">
            Key Project <span className="text-gradient">Facts</span>
          </h2>
          <p className="text-sm text-white/30 mb-8 max-w-xl">
            Verified project details at a glance.
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
              All details are verified and sourced from official approvals and project
              documentation. For the latest availability, pricing and legal documents,
              contact the {project.name} team directly.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
