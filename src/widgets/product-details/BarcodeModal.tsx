import { useTranslation } from "../../shared/i18n";
import { Barcode } from "../../shared/ui/barcode/Barcode";
import styles from "./BarcodeModal.module.scss";

interface BarcodeModalProps {
  productName: string;
  productArticle: string;
  onClose: () => void;
}

export const BarcodeModal = ({
  productName,
  productArticle,
  onClose,
}: BarcodeModalProps) => {
  const { barcode: t } = useTranslation().t;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>{t.title}</h2>

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
        <div className={styles.barcodeItem}>
          <span className={styles.barcodeLabel}>{productName}</span>

          <Barcode value={productArticle} />
        </div>
      </section>
    </div>
  );
};
