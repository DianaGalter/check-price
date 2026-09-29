import type { Store } from "../../shared/lib/getProductPrice";
import { StoreSwitcher } from "../../shared/ui/store-switcher/StoreSwitcher";
import styles from "./Header.module.scss";

interface HeaderProps {
  store: Store;
  onStoreToggle: () => void;
}

export const Header = ({ store, onStoreToggle }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <StoreSwitcher store={store} onToggle={onStoreToggle} />
    </header>
  );
};
