"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/* ── Language Type ── */
export type Language = "en" | "ne";

/* ── Storage & Event Constants ── */
export const STORAGE_KEY = "heramba_language";
export const LANGUAGE_CHANGE_EVENT = "heramba-language-changed";

/* ── Context Type ── */
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

/* ── Context ── */
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

/* ── Provider Props ── */
type LanguageProviderProps = {
  children: ReactNode;
};

/* ── Provider ── */
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  /* ── Hydrate from localStorage after mount ── */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;

    if (stored === "en" || stored === "ne") {
      setLanguageState(stored);
    }

    setMounted(true);
  }, []);

  /* ── Setter with persistence + event ── */
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    localStorage.setItem(STORAGE_KEY, lang);

    window.dispatchEvent(
      new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: lang })
    );
  };

  /* ── Avoid SSR mismatch ── */
  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ── Custom Hook ── */
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}