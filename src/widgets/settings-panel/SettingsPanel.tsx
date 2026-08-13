import styles from "./SettingsPanel.module.scss";

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  return (
    <div className={styles.overlay}>
      <button
        className={styles.backdrop}
        type="button"
        aria-label="Закрыть настройки"
        onClick={onClose}
      />

      <aside className={styles.panel} aria-label="Настройки">
        <header className={styles.header}>
          <h2 className={styles.title}>Настройки</h2>

          <button
            className={styles.closeButton}
            type="button"
            aria-label="Закрыть настройки"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12" />
              <path d="M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className={styles.content}>
          {/* Theme */}
          {/* Language */}
          {/* About */}
        </div>
      </aside>
    </div>
  );
};
