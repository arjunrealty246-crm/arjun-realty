"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import siteConfig from "@/config/site";
import { footerQuickLinks } from "@/data/navigation";
import { footerContent } from "@/data/content";
import { approvalBadges } from "@/data/statistics";

const quickLinks = footerQuickLinks;

const socialLinks = siteConfig.socialIcons.map((s, i) => ({
  href: Object.values(siteConfig.social)[i],
  ...s,
}));

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] to-[#080810]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand */}
            <ScrollReveal className="lg:col-span-4" delay={0}>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="h-11 w-11 rounded-[0.8rem] bg-gradient-to-br from-primary via-primary-dark to-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-white">Arjun<span className="text-primary">Realty</span></span>
                  <span className="text-[9px] uppercase tracking-[0.28em] text-gold/60 font-medium mt-0.5">Premium Advisory</span>
                </div>
              </Link>
              <p className="text-[13px] text-white/45 leading-relaxed mb-6 max-w-xs">
                {footerContent.brandDescription}
              </p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="h-9 w-9 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/30 hover:text-primary hover:bg-primary/10 hover:border-primary/15 transition-all duration-300">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </ScrollReveal>

            {/* Quick Links */}
            <ScrollReveal className="lg:col-span-3" delay={0.08}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-6">Quick Links</h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-colors duration-300 py-0.5">
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Contact */}
            <ScrollReveal className="lg:col-span-5" delay={0.16}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-6">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary/50 mt-0.5 shrink-0" />
                   <span className="text-[13px] text-white/50 leading-relaxed">
                     {siteConfig.address.full}
                   </span>
                </div>
                   <a href={siteConfig.links.tel} className="flex items-center gap-3 text-[13px] text-white/50 hover:text-primary transition-colors">
                     <Phone className="h-4 w-4 text-primary/50 shrink-0" /> {siteConfig.contact.phone}
                   </a>
                   <a href={siteConfig.links.mailto} className="flex items-center gap-3 text-[13px] text-white/50 hover:text-primary transition-colors">
                     <Mail className="h-4 w-4 text-primary/50 shrink-0" /> {siteConfig.contact.email}
                   </a>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary/50 mt-0.5 shrink-0" />
                     <span className="text-[13px] text-white/50 leading-relaxed">
                      {siteConfig.address.hours}
                    </span>
                </div>
              </div>

              {/* Approvals */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex flex-wrap gap-2">
                  {approvalBadges.map((a) => (
                    <span key={a} className="px-2.5 py-1 rounded-md bg-primary/[0.06] text-[10px] font-semibold text-primary/60 uppercase tracking-wider">
                      {a} Approved
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider" />
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20">
            {footerContent.copyright(new Date().getFullYear())}
          </p>
          <div className="flex items-center gap-6">
            {footerContent.legalLinks.map((link: { label: string; href: string }) => (
              <Link key={link.href} href={link.href} className="text-[11px] text-white/20 hover:text-white/40 transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
