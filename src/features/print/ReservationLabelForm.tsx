import { useState } from "react";

import { ReservationLabelPreview } from "./ReservationLabelPreview";

import styles from "./ReservationLabelForm.module.scss";

interface ReservationLabelFormProps {
  onClose: () => void;
}

export interface ReservationLabelData {
  customerName: string;
  phone: string;
  holdUntil: string;
  isPaid: boolean;
  receiptNumber: string;
  employeeName: string;
}

export const ReservationLabelForm = ({
  onClose,
}: ReservationLabelFormProps) => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [holdUntil, setHoldUntil] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const [previewData, setPreviewData] = useState<ReservationLabelData | null>(
    null,
  );

  const handlePreview = () => {
    setPreviewData({
      customerName,
      phone,
      holdUntil,
      isPaid,
      receiptNumber: isPaid ? receiptNumber : "",
      employeeName,
    });
  };

  return (
    <>
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

          <h2 className={styles.title}>פרטי שמירה</h2>

          <div className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>שם הלקוח</span>

              <input
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>טלפון</span>

              <input
                type="tel"
                inputMode="tel"
                dir="ltr"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>לשמור עד</span>

              <input
                type="date"
                value={holdUntil}
                onChange={(event) => setHoldUntil(event.target.value)}
              />
            </label>

            <div className={styles.field}>
              <span className={styles.label}>שולם?</span>

              <div className={styles.paymentOptions}>
                <button
                  type="button"
                  className={`${styles.paymentButton} ${
                    isPaid ? styles.paymentButtonActive : ""
                  }`}
                  onClick={() => setIsPaid(true)}
                >
                  כן
                </button>

                <button
                  type="button"
                  className={`${styles.paymentButton} ${
                    !isPaid ? styles.paymentButtonActive : ""
                  }`}
                  onClick={() => {
                    setIsPaid(false);
                    setReceiptNumber("");
                  }}
                >
                  לא
                </button>
              </div>
            </div>

            {isPaid && (
              <label className={styles.field}>
                <span className={styles.label}>מספר קבלה</span>

                <input
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  value={receiptNumber}
                  onChange={(event) => setReceiptNumber(event.target.value)}
                />
              </label>
            )}

            <label className={styles.field}>
              <span className={styles.label}>בטיפול של העובד/ת</span>

              <input
                type="text"
                value={employeeName}
                onChange={(event) => setEmployeeName(event.target.value)}
              />
            </label>

            <button
              type="button"
              className={styles.previewButton}
              onClick={handlePreview}
            >
              Preview
            </button>
          </div>
        </div>
      </div>

      {previewData && (
        <ReservationLabelPreview
          data={previewData}
          onClose={() => setPreviewData(null)}
        />
      )}
    </>
  );
};
