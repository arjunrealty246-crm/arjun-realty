"use client";

import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import siteConfig from "@/config/site";

interface StickyCTABarProps {
  projectName: string;
  onSiteVisit: () => void;
  ctaLabel?: string;
}

export default function StickyCTABar({ projectName, onSiteVisit, ctaLabel = "Site Visit" }: StickyCTABarProps) {
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${projectName}.\nPlease share more details.`
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 bg-charcoal-dark/95 border-t border-white/[0.06] shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`${siteConfig.links.wa}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/25 text-[#25D366]"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
        <a
          href={siteConfig.links.tel}
          className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white/80"
        >
          <Phone className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>
        <button
          onClick={onSiteVisit}
          className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white glow-primary-strong"
        >
          <CalendarCheck className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{ctaLabel}</span>
        </button>
      </div>
    </div>
  );
}
