import { create } from "zustand";
import { Subscription } from "../types/Subscription";

export type LanguaguesSupprted = 
  | "en"
  | "de"
  | "es"
  | "fr"
  | "pt";

export const LanguagesSupportedMap: Record<LanguaguesSupprted, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  pt: "Portuguese",
}

interface LanguageState {
  language: LanguaguesSupprted;
  setLanguage: (language: LanguaguesSupprted) => void;
  getLanguage: (isPro: boolean) => LanguaguesSupprted[];
  getNotSupportedLanguages: (isPro: boolean) => LanguaguesSupprted[];
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',
  setLanguage: (language: LanguaguesSupprted) => set({ language }),
  getLanguage: (isPro: boolean) => {
    if (isPro) return Object.keys(LanguagesSupportedMap) as LanguaguesSupprted[];
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      2
    ) as LanguaguesSupprted[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];
    return Object.keys(LanguagesSupportedMap).slice(
      2
    ) as LanguaguesSupprted[];
  },
}))

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));