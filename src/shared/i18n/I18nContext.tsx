import { createContext, useMemo, useState } from "react";

import { translations } from "./translations";
import type { Language } from "./types";

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof translations.ru;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguage] = useState<Language>("ru");

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
