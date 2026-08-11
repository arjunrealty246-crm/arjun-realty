"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, Phone, Send, X, CalendarCheck, ArrowUp } from "lucide-react";
import SiteVisitModal from "./SiteVisitModal";
import RequestCallback from "./RequestCallback";
import siteConfig from "@/config/site";
import { floatingActions } from "@/data/content";

export default function FloatingActions() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const show = setTimeout(() => setShowTooltip(true), 3500);
    const hide = setTimeout(() => setShowTooltip(false), 9000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [visible]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong rounded-2xl p-4 max-w-[240px] shadow-2xl relative"
            >
              <button onClick={() => setShowTooltip(false)} className="absolute top-2 right-2 text-white/30 hover:text-white/60 transition-colors">
                <X className="h-3 w-3" />
              </button>
              <p className="text-[12px] text-white/60 leading-relaxed pr-4">
                {floatingActions.tooltipText}
              </p>
              <div className="absolute -bottom-2 right-8 w-3 h-3 glass-strong rotate-45 rounded-sm" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expandable action menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-end gap-2"
            >
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.02 }}
                onClick={() => { setCallbackOpen(true); setShowMenu(false); }}
                className="flex items-center gap-2.5 glass-strong rounded-full pl-5 pr-4 py-2.5 text-[12px] font-medium text-white/70 hover:text-white hover:border-primary/20 transition-all duration-300"
              >
                <span>{floatingActions.callbackLabel}</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Phone className="h-3.5 w-3.5" />
                </div>
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                onClick={() => { setSiteVisitOpen(true); setShowMenu(false); }}
                className="flex items-center gap-2.5 glass-strong rounded-full pl-5 pr-4 py-2.5 text-[12px] font-medium text-white/70 hover:text-white hover:border-primary/20 transition-all duration-300"
              >
                <span>{floatingActions.visitLabel}</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CalendarCheck className="h-3.5 w-3.5" />
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Telegram */}
        <motion.a
          href="https://t.me/ArjunRealty"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.2 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-lg shadow-[#0088cc]/20 hover:shadow-[#0088cc]/35 transition-shadow duration-300"
          aria-label={floatingActions.telegramAria}
        >
          <Send className="h-4 w-4" />
        </motion.a>

        {/* Call Button */}
        <motion.a
          href={siteConfig.links.tel}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.15 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal-dark border border-white/10 text-white/70 shadow-lg shadow-black/30 hover:text-primary hover:border-primary/25 hover:shadow-primary/10 transition-all duration-300"
          aria-label={floatingActions.callAria}
        >
          <Phone className="h-4 w-4" />
        </motion.a>

        {/* Site Visit / More Toggle */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.08 }}
          onClick={() => setShowMenu((p) => !p)}
          className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-lg shadow-black/30 transition-all duration-300 ${
            showMenu
              ? "bg-primary border-primary/30 text-white shadow-primary/20"
              : "bg-charcoal-dark border-white/10 text-white/70 hover:text-primary hover:border-primary/25"
          }`}
          aria-label={floatingActions.menuAria}
        >
          <CalendarCheck className="h-4 w-4" />
        </motion.button>

        {/* WhatsApp Button */}
        <motion.a
          href={siteConfig.links.wa}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.45)] transition-shadow duration-300"
          aria-label={floatingActions.whatsappAria}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </motion.a>

        {/* Back to Top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] text-white/30 hover:text-primary hover:border-primary/20 transition-all duration-300"
              aria-label={floatingActions.backToTopAria}
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <SiteVisitModal isOpen={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} />
      <RequestCallback isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  );
}
