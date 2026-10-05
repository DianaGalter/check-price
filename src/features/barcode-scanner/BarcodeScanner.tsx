import { useEffect, useRef } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import styles from "./BarcodeScanner.module.scss";

interface BarcodeScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

export const BarcodeScanner = ({ onScan, onClose }: BarcodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    async function startScanner() {
      const videoInputDevices =
        await BrowserQRCodeReader.listVideoInputDevices();

      // 1. Фильтруем камеры: ищем ту, которая "задняя" (back) И НЕ широкоугольная (wide/ultra)
      videoInputDevices.find((device) => {
        const label = device.label.toLowerCase();
        // Ищем признаки основной камеры Samsung
        alert(label);
      });
    }
    startScanner();
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
