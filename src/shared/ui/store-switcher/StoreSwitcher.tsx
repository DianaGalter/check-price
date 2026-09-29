import type { Store } from "../../lib/getProductPrice";
import styles from "./StoreSwitcher.module.scss";

interface StoreSwitcherProps {
  store: Store;
  onToggle: () => void;
}

export const StoreSwitcher = ({ store, onToggle }: StoreSwitcherProps) => {
  const storeName = store === "columbia" ? "Columbia" : "Ашкелон";

  return (
    <button
      className={styles.storeButton}
      type="button"
      onClick={onToggle}
      aria-label={`Переключить магазин. Сейчас ${storeName}`}
    >
      <span>{storeName}</span>

      <svg className={styles.storeIcon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m16 3 4 4-4 4" />
        <path d="M20 7H4" />
        <path d="m8 21-4-4 4-4" />
        <path d="M4 17h16" />
      </svg>
    </button>
  );
};
