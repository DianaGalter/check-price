import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

import styles from "./BarcodePreview.module.scss";

interface BarcodePreviewProps {
  value: string;
  title?: string;
  subtitle?: string;
  article?: string;
  onClose: () => void;
}

export const BarcodePreview = ({
  value,
  title,
  subtitle,
  article,
  onClose,
}: BarcodePreviewProps) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!barcodeRef.current) return;

    JsBarcode(barcodeRef.current, value, {
      format: "CODE128",
      displayValue: false,
      margin: 0,
      height: 90,
      width: 2,
    });
  }, [value]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className={styles.label}>
          {(title || subtitle) && (
            <div className={styles.productInfo}>
              {title && <span className={styles.title}>{title}</span>}

              {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
            </div>
          )}

          <div className={styles.barcodeWrapper}>
            <svg ref={barcodeRef} className={styles.barcode} />
          </div>

          {article && <div className={styles.article}>{article}</div>}
        </div>
      </div>
    </div>
  );
};
