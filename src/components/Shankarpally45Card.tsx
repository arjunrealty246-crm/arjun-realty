"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Banknote,
  Landmark,
  Route,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

interface Shankarpally45CardProps {
  title: string;
  status: string;
  chips: string[];
  points: string[];
  note: string;
  waMessage: string;
  waBase: string;
}

export default function Shankarpally45Card({
  title,
  status,
  chips,
  points,
  note,
  waMessage,
  waBase,
}: Shankarpally45CardProps) {
  const waUrl = `${waBase}?text=${encodeURIComponent(waMessage)}`;

  const chipIcon = (chip: string) => {
    switch (chip) {
      case "HMDA & RERA Approved":
        return <BadgeCheck className="h-3 w-3" />;
      case "Bank Loan Facility":
        return <Banknote className="h-3 w-3" />;
      case "25,000 SFT Clubhouse Included":
        return <Landmark className="h-3 w-3" />;
      case "Direct connectivity to Gachibowli & Neopolis":
        return <Route className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Link
      href="/projects/shankarpally-45-acres"
      className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden h-full flex flex-col cursor-pointer group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.25)]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

      <div className="flex items-center justify-between mb-8">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Landmark className="h-6 w-6 text-primary" />
        </div>
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full glass text-[10px] font-medium text-white/50 uppercase tracking-wider">
          {status}
        </span>
      </div>

      <h3 className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-bold text-gradient tracking-tight mb-5">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {chips.map((chip) => (
          <span
            key={chip}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/[0.06] text-[10px] text-primary/70 font-medium uppercase tracking-wider"
          >
            {chipIcon(chip)}
            {chip}
          </span>
        ))}
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-primary/60 mt-0.5 shrink-0" />
            <span className="text-[13.5px] text-white/55 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

      <p className="text-[13px] text-white/30 leading-[1.7] mb-8">{note}</p>

      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
        <span className="btn-premium inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[12px] font-semibold text-white glow-primary-strong">
          Explore Project <ArrowRight className="h-3.5 w-3.5" />
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(waUrl, "_blank", "noopener,noreferrer");
          }}
          className="btn-glass inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[12px] font-semibold text-white/55 border border-white/[0.06] hover:border-primary/20 transition-all duration-500"
        >
          <MessageCircle className="h-3.5 w-3.5 text-primary" /> Enquire Now
        </button>
      </div>
    </Link>
  );
}
