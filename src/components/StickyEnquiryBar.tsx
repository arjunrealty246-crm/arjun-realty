"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import siteConfig from "@/config/site";
import RequestCallback from "./RequestCallback";
import { stickyEnquiryBar } from "@/data/content";

export default function StickyEnquiryBar() {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const pathname = usePathname();

  if (/^\/projects\/[^/]+/.test(pathname || "")) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div
          className="glass-card-elevated rounded-t-[1.25rem] border-t border-white/[0.04] px-3 pt-2.5"
          style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
        >
          <div className="grid grid-cols-3 gap-2">
            <a
              href={siteConfig.links.tel}
              className="flex items-center justify-center gap-1.5 h-11 min-w-0 px-1.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-[12px] font-semibold text-white/60 hover:text-primary hover:border-primary/20 transition-all duration-300"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="truncate">{stickyEnquiryBar.callLabel}</span>
            </a>
            <a
              href={siteConfig.links.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 h-11 min-w-0 px-1.5 bg-[#25D366] rounded-xl text-[12px] font-semibold text-white shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span className="truncate">{stickyEnquiryBar.whatsappLabel}</span>
            </a>
            <button
              onClick={() => setCallbackOpen(true)}
              className="flex items-center justify-center gap-1.5 h-11 min-w-0 px-1.5 bg-gradient-to-r from-primary to-primary-dark rounded-xl text-[12px] font-semibold text-white glow-primary-strong"
            >
              <span className="truncate">{stickyEnquiryBar.enquiryLabel}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <RequestCallback isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  );
}
