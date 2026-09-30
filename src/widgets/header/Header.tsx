import type { Store } from "../../shared/lib/getProductPrice";
import { StoreSwitcher } from "../../shared/ui/store-switcher/StoreSwitcher";
import { LanguageSwitcher } from "../../shared/ui/language-switcher/LanguageSwitcher";
import styles from "./Header.module.scss";

interface HeaderProps {
  store: Store;
  onStoreToggle: () => void;
}

export const Header = ({ store, onStoreToggle }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <LanguageSwitcher />

      <StoreSwitcher store={store} onToggle={onStoreToggle} />
    </header>
  );
};
