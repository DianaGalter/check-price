import type { Store } from "../../shared/lib/getProductPrice";
import type { Language } from "../../shared/i18n";
import { StoreSwitcher } from "../../shared/ui/store-switcher/StoreSwitcher";
import { LanguageSwitcher } from "../../shared/ui/language-switcher/LanguageSwitcher";
import type { StoreSwitcherTranslations } from "../../shared/i18n";
import styles from "./Header.module.scss";

interface HeaderProps {
  store: Store;
  onStoreToggle: () => void;
  language: Language;
  onLanguageToggle: () => void;
  storeSwitcherT: StoreSwitcherTranslations;
}

export const Header = ({
  store,
  onStoreToggle,
  language,
  onLanguageToggle,
  storeSwitcherT,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <LanguageSwitcher language={language} onToggle={onLanguageToggle} />

      <StoreSwitcher
        store={store}
        onToggle={onStoreToggle}
        t={storeSwitcherT}
      />
    </header>
  );
};
