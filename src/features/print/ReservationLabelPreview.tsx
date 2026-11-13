import { useRef } from "react";

import type { ReservationLabelData } from "./ReservationLabelForm";

import styles from "./ReservationLabelPreview.module.scss";

interface ReservationLabelPreviewProps {
  data: ReservationLabelData;
  onClose: () => void;
}

const formatDate = (value: string) => {
  if (!value) return "";

  const [year, month, day] = value.split("-");

  return `${day}/${month}/${year}`;
};

export const ReservationLabelPreview = ({
  data,
  onClose,
}: ReservationLabelPreviewProps) => {
  const labelRef = useRef<HTMLDivElement | null>(null);

  const {
    customerName,
    phone,
    holdUntil,
    isPaid,
    receiptNumber,
    employeeName,
  } = data;

  const handleSave = async () => {
    if (!labelRef.current) return;

    try {
      const { toPng } = await import("html-to-image");

      const dataUrl = await toPng(labelRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });

      const safeCustomerName =
        customerName.trim().replace(/\s+/g, "-") || "reservation";

      const link = document.createElement("a");

      link.download = `reservation-${safeCustomerName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to save reservation label:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} dir="rtl" lang="he">
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div ref={labelRef} className={styles.label}>
          <div className={styles.row}>
            <span className={styles.key}>שם הלקוח:</span>

            <span>{customerName}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.key}>טלפון:</span>

            <span dir="ltr">{phone}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.key}>לשמור עד:</span>

            <span dir="ltr">{formatDate(holdUntil)}</span>
          </div>

          <div className={styles.separator} />

          <div className={styles.row}>
            <span className={styles.key}>שולם:</span>

            <span>{isPaid ? "כן" : "לא"}</span>
          </div>

          {isPaid && receiptNumber && (
            <div className={styles.row}>
              <span className={styles.key}>מספר קבלה:</span>

              <span dir="ltr">{receiptNumber}</span>
            </div>
          )}

          <div className={styles.separator} />

          <div className={styles.row}>
            <span className={styles.key}>בטיפול של העובד/ת:</span>

            <span>{employeeName}</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSave}
        >
          <svg
            className={styles.saveIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>

          <span>Save image</span>
        </button>
      </div>
    </div>
  );
};
