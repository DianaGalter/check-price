import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <button className={styles.button} type="button" aria-label="Открыть меню">
        {/* иконка меню */}
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
