"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import type { Project } from "@/data/projects";

const LINK_CLASS =
  "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary/[0.08] border border-primary/15 text-[11px] font-semibold text-primary hover:bg-primary/[0.15] transition-colors duration-300";

export default function ProjectContentSections({ project }: { project: Project }) {
  const sections = (project.contentSections || []).filter(Boolean);
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="pb-16 lg:pb-20"
        >
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <SectionLabel>{section.label ?? "Project Insights"}</SectionLabel>
              <h2 className="mt-5 text-2xl font-bold tracking-tight mb-5">
                {section.heading}
              </h2>

              {section.paragraphs && section.paragraphs.length > 0 && (
                <div className="space-y-4 max-w-3xl">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-white/45 text-[0.95rem] leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-5 space-y-2 max-w-3xl">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-white/45 leading-relaxed"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50 mt-2 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {section.cards && section.cards.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.cards.map((c) => (
                    <div
                      key={c.title}
                      className="glass-card rounded-xl px-5 py-5 hover:border-primary/10 transition-all duration-300"
                    >
                      <h3 className="text-sm font-bold text-white mb-2">{c.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.links && section.links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {section.links.map((l) =>
                    l.href.startsWith("#") ? (
                      <a key={l.label} href={l.href} className={LINK_CLASS}>
                        {l.label} <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link key={l.label} href={l.href} className={LINK_CLASS}>
                        {l.label} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )
                  )}
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>
      ))}
    </>
  );
}
