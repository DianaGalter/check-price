import styles from "./BarcodeModal.module.scss";

interface BarcodeModalProps {
  onClose: () => void;
}

export const BarcodeModal = ({ onClose }: BarcodeModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>Штрихкоды</h2>

          <button
            className={styles.closeButton}
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </svg>
          </button>
        </header>
      </section>
    </div>
  );
};
