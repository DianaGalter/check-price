import type { Language } from "../../i18n";
import styles from "./LanguageSwitcher.module.scss";

interface LanguageSwitcherProps {
  language: Language;
  onToggle: () => void;
}

export const LanguageSwitcher = ({
  language,
  onToggle,
}: LanguageSwitcherProps) => {
  return (
    <button
      className={styles.languageButton}
      type="button"
      onClick={onToggle}
      aria-label={
        language === "ru"
          ? "Switch language to English"
          : "Переключить язык на русский"
      }
    >
      <svg className={styles.globeIcon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
      </svg>

      <span>{language.toUpperCase()}</span>
    </button>
  );
};
