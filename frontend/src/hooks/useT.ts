"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { tSection} from "@/config/i18n";
import { TranslationKeys } from "@/config/translations";

/**
 * Hook to access translations for a section dynamically.
 * Example: const t = useT("navbar");
 */
export function useT<K extends keyof TranslationKeys>(section: K): TranslationKeys[K] {
  const { language } = useLanguage();
  return tSection(language, section);
}