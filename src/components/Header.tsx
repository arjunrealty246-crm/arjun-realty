"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import siteConfig from "@/config/site";
import { footerQuickLinks, headerCta } from "@/data/navigation";
import RequestCallback from "./RequestCallback";

const navLinks = footerQuickLinks.filter(l => l.href !== "/builders");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => setScrolled(window.scrollY > 60), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const nav = menuRef.current?.querySelector<HTMLElement>("nav a");
    if (nav) nav.focus();
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a[href], button, [tabindex]:not([tabindex='-1'])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTrap);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTrap);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop / Tablet Header ── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-700 ${
          scrolled
            ? "glass-dark py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                <div className="h-11 w-11 rounded-[0.8rem] bg-gradient-to-br from-primary via-primary-dark to-primary flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(249,115,22,0.35)]">
                  <span className="text-white font-bold text-lg tracking-tight">A</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-white">
                  Arjun<span className="text-primary">Realty</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.28em] text-gold/70 font-medium mt-0.5">
                  Premium Advisory
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-2.5 py-2 text-[13px] font-medium rounded-lg transition-colors duration-300 ${
                      active
                        ? "text-white"
                        : "text-white/45 hover:text-white/80"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.06]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden xl:flex items-center gap-5">
              <a
                href={siteConfig.links.tel}
                className="flex items-center gap-2 text-[13px] text-white/40 hover:text-primary transition-colors duration-300 whitespace-nowrap"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span className="font-medium whitespace-nowrap">{siteConfig.contact.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => setCallbackOpen(true)}
                className="btn-premium bg-gradient-to-r from-primary to-primary-dark px-6 py-2.5 rounded-full text-[13px] font-semibold text-white shadow-[0_4px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.4)] cursor-pointer"
              >
                {headerCta.label}
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              ref={toggleRef}
              onClick={() => setMobileOpen((p) => !p)}
              className="xl:hidden relative z-50 p-2 -mr-2"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] xl:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#0a0a14]/95 backdrop-blur-2xl" />

            <div className="relative flex flex-col items-center justify-center h-full px-8 overflow-y-auto">
              <nav className="flex flex-col items-center gap-1" aria-label="Mobile navigation">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        className={`group flex items-center gap-3 py-3.5 px-6 text-[1.1rem] font-medium rounded-2xl transition-all duration-300 ${
                          active
                            ? "text-primary bg-primary/10"
                            : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                        }`}
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-50" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-10 flex flex-col items-center gap-5"
              >
                <a
                  href={siteConfig.links.tel}
                  className="flex items-center gap-2.5 text-white/35 hover:text-primary transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); setCallbackOpen(true); }}
                  className="btn-premium bg-gradient-to-r from-primary to-primary-dark px-10 py-3.5 rounded-full text-sm font-semibold text-white shadow-lg shadow-primary/20 cursor-pointer"
                >
                  {headerCta.label}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RequestCallback isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  );
}
