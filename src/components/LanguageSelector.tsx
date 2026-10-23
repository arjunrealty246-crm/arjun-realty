"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { locales, localeMeta, Locale, stripLocale, switchLocalePath } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleContext";

interface LanguageSelectorProps {
  /** Visual density — `bar` for the desktop strip, `menu` for the mobile menu. */
  variant?: "bar" | "menu";
  className?: string;
}

/**
 * Premium language selector rendered directly below the main navigation.
 * English keeps its existing root URLs; Telugu and Hindi use /te and /hi
 * prefixes.
 *
 * Switching keeps the visitor on the equivalent page when translated content
 * exists for it, and otherwise sends them to that locale's homepage — never to a
 * localized URL that still renders English. The active locale is always a
 * self-link so the current page is never left by clicking the current language.
 *
 * The availability check is data-only (see `content/availability.ts`), so this
 * client component does not pull translated content into the shared bundle.
 */
export default function LanguageSelector({ variant = "bar", className = "" }: LanguageSelectorProps) {
  const pathname = usePathname();
  const { dictionary } = useLocale();
  const { locale: currentLocale } = stripLocale(pathname);

  const buildHref = (target: Locale) => {
    if (target === currentLocale) return pathname;
    return switchLocalePath(pathname, target);
  };

  if (variant === "menu") {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/30 font-medium">
          {dictionary.language.selectorLabel}
        </span>
        <div
          className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] p-1"
          role="group"
          aria-label={dictionary.language.chooseLanguage}
        >
          {locales.map((loc) => {
            const active = loc === currentLocale;
            return (
              <Link
                key={loc}
                href={buildHref(loc)}
                hrefLang={localeMeta[loc].htmlLang}
                aria-current={active ? "true" : undefined}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 ${
                  active ? "bg-primary/15 text-primary" : "text-white/45 hover:text-white/80"
                }`}
              >
                {localeMeta[loc].label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className="inline-flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm px-1.5 py-1 shadow-[0_2px_16px_rgba(0,0,0,0.12)]"
        role="group"
        aria-label={dictionary.language.chooseLanguage}
      >
        <span className="hidden sm:flex items-center pl-2 pr-1 text-white/25" aria-hidden="true">
          <Globe className="h-3.5 w-3.5" />
        </span>
        {locales.map((loc) => {
          const active = loc === currentLocale;
          return (
            <Link
              key={loc}
              href={buildHref(loc)}
              hrefLang={localeMeta[loc].htmlLang}
              aria-current={active ? "true" : undefined}
              className={`relative px-3 sm:px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors duration-300 whitespace-nowrap ${
                active ? "text-white" : "text-white/40 hover:text-white/75"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="lang-active-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/25 to-primary/10 border border-primary/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{localeMeta[loc].label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
