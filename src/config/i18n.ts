// src/config/i18n.ts
import { Language } from "@/contexts/LanguageContext";
import { translations, TranslationKeys } from "./translations";

/**
 * Safe accessor for a section in current language, fallback to English
 */
export function tSection<K extends keyof TranslationKeys>(
  lang: Language,
  section: K): TranslationKeys[K] {
    return translations[lang]?.[section] ?? translations["en"][section];
}