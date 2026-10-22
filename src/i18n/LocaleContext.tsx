"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Locale, stripLocale, switchLocalePath, safeLocalePath } from "./config";
import { getClientDictionary } from "./client-dictionaries";
import type { Dictionary } from "./dictionaries/en";

interface LocaleContextValue {
  locale: Locale;
  dictionary: Dictionary;
  /** Base path with any locale prefix removed (e.g. "/about"). */
  basePath: string;
  /** Build a href for a path in the current locale (safe against missing routes). */
  href: (path: string) => string;
  /** Build the equivalent href for switching to another locale. */
  switchHref: (target: Locale) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(() => {
    const dictionary = getClientDictionary(locale);
    const href = (path: string) => safeLocalePath(locale, path);
    return {
      locale,
      dictionary,
      basePath: "/",
      href,
      switchHref: (target: Locale) => switchLocalePath("/", target),
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Reads the locale from the URL pathname (works for English root + /te + /hi). */
export function usePathnameLocale(): Locale {
  const pathname = usePathname();
  return stripLocale(pathname).locale;
}

/**
 * Access the active chrome dictionary. Prefers an explicit provider (locale tree)
 * and falls back to deriving the locale from the pathname so shared components
 * (Header, Footer) work on English routes too.
 */
export function useLocale(): LocaleContextValue {
  const pathname = usePathname();
  const provided = useContext(LocaleContext);
  return useMemo<LocaleContextValue>(() => {
    if (provided) return provided;
    const { locale, basePath } = stripLocale(pathname);
    const dictionary = getClientDictionary(locale);
    const href = (path: string) => safeLocalePath(locale, path);
    return {
      locale,
      dictionary,
      basePath,
      href,
      switchHref: (target: Locale) => switchLocalePath(basePath, target),
    };
  }, [provided, pathname]);
}
