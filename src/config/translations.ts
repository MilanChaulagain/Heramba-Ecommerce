import en from "./messages/en.json";
import ne from "./messages/ne.json";
import { Language } from "@/contexts/LanguageContext";

export type TranslationKeys = typeof en;

export const translations: Record<Language, TranslationKeys> = {
  en,
  ne,
};