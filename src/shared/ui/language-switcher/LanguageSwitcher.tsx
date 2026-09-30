import { useTranslation } from "../../i18n";
import styles from "./LanguageSwitcher.module.scss";

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useTranslation();
  const text = t.languageSwitcher;

  const nextLanguage = language === "ru" ? "en" : "ru";

  const handleToggle = () => {
    setLanguage(nextLanguage);
  };

  return (
    <button
      className={styles.languageButton}
      type="button"
      onClick={handleToggle}
      aria-label={text.ariaLabel}
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
