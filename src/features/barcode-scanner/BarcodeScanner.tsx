import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import type { IScannerControls } from "@zxing/browser";
import styles from "./BarcodeScanner.module.scss";

interface BarcodeScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

export const BarcodeScanner = ({ onScan, onClose }: BarcodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const reader = new BrowserMultiFormatReader();
    let controls: IScannerControls | undefined;

    const startScanner = async () => {
      try {
        controls = await reader.decodeFromConstraints(
          {
            video: {
              facingMode: { ideal: "environment" },
            },
          },
          videoRef.current!,
          (result) => {
            if (!result) return;

            controls?.stop();
            onScan(result.getText());
          },
        );
      } catch (error) {
        console.error("Не удалось запустить сканер:", error);
      }
    };

    startScanner();

    return () => {
      controls?.stop();
    };
  }, [onScan]);

  return (
    <div className={styles.overlay}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
        playsInline
      />

      <button type="button" className={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  );
};
