"use client";

import { MessageCircle, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import siteConfig from "@/config/site";
import type { Project } from "@/data/projects";

export default function FinalCTASection({ project }: { project: Project }) {
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${project.name}.\nPlease share more details.`
  );

  return (
    <section className="pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <div className="glass-card-elevated rounded-3xl p-8 lg:p-14 relative overflow-hidden bg-gradient-to-br from-primary/[0.06] via-charcoal-dark to-primary/[0.03] border border-primary/10">
            <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.06] -right-40 -top-40" />
            <div className="ambient-orb w-[400px] h-[400px] bg-gold/[0.03] -left-32 bottom-0" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4">
                Looking for the <span className="text-gradient">right property</span>?
              </h2>
              <p className="text-sm lg:text-base text-white/45 leading-relaxed mb-9 max-w-2xl mx-auto">
                Talk to {siteConfig.shortName} for transparent guidance on {project.name}
                and every verified project across Hyderabad — from price comparison to
                documentation support and site visits.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`${siteConfig.links.wa}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
                </a>
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
                >
                  <ArrowRight className="h-4 w-4" /> Enquire Now
                </a>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-[13px] font-semibold text-white/80 hover:bg-white/[0.1] hover:border-primary/20 hover:text-primary transition-all duration-300"
                >
                  <Compass className="h-4 w-4" /> Explore Projects
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
