"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <ScrollReveal key={i} delay={i * 0.04}>
          <div className="glass-card rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              aria-expanded={openFaq === i}
              aria-controls={`faq-panel-${i}`}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-[14px] font-semibold text-white/80 pr-4">{faq.q}</span>
              <ChevronDown
                className={`h-4 w-4 text-white/30 shrink-0 transition-transform duration-300 ${
                  openFaq === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                openFaq === i ? "max-h-60" : "max-h-0"
              }`}
            >
              <p className="px-6 pb-6 text-[13px] text-white/35 leading-[1.75]">
                {faq.a}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
