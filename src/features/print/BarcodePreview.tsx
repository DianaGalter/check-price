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
  const labelRef = useRef<HTMLDivElement | null>(null);

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

  const handleSave = async () => {
    if (!labelRef.current) return;

    try {
      const { toPng } = await import("html-to-image");

      const dataUrl = await toPng(labelRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });

      const fileName = title
        ? `${title}${subtitle ? ` ${subtitle}` : ""}`
        : article || value;

      const link = document.createElement("a");

      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to save barcode image:", error);
    }
  };

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

        <div ref={labelRef} className={styles.label}>
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

        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSave}
        >
          <span>Save image</span>

          <svg
            className={styles.saveIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
        </button>
      </div>
    </div>
  );
};
