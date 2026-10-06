import { createContext, useEffect, useMemo, useState } from "react";

import { translations } from "./translations";
import type { Language } from "./types";

type Translation = (typeof translations)[Language];

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");

    switch (savedLanguage) {
      case "en":
        return "en";
      case "he":
        return "he";
      default:
        return "ru";
    }
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
