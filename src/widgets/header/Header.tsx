import styles from "./Header.module.scss";
interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <button
        type="button"
        aria-label="Открыть настройки"
        onClick={onMenuClick}
      >
        <svg className={styles.menuIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      </button>

      <h1 className={styles.title}>Поиск товара</h1>

      <button
        className={styles.button}
        type="button"
        aria-label="Открыть сканер"
      >
        {/* иконка сканера */}
      </button>
    </header>
  );
};
