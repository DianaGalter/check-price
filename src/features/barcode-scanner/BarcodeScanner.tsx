import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

import styles from "./BarcodeScanner.module.scss";

interface BarcodeScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

interface Camera {
  id: string;
  label: string;
}

const CAMERA_STORAGE_KEY = "scannerCameraId";
const SCANNER_ELEMENT_ID = "barcode-reader";

export const BarcodeScanner = ({ onScan, onClose }: BarcodeScannerProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const getCameras = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();

        if (cancelled) return;

        const backCameras = devices.filter((camera) =>
          camera.label.toLowerCase().includes("back"),
        );

        const availableCameras = backCameras.length > 0 ? backCameras : devices;

        setCameras(availableCameras);

        const savedCameraId = localStorage.getItem(CAMERA_STORAGE_KEY);

        const savedCamera = availableCameras.find(
          (camera) => camera.id === savedCameraId,
        );

        const defaultCamera =
          savedCamera ??
          (backCameras.length > 0 ? backCameras.at(-1) : devices[0]);

        if (defaultCamera) {
          setSelectedCameraId(defaultCamera.id);
        }
      } catch (error) {
        console.error("Не удалось получить камеры:", error);
      }
    };

    getCameras();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedCameraId) return;

    let cancelled = false;
    let hasScanned = false;

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID, {
          verbose: false,
          formatsToSupport: [
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.UPC_A,
          ],
        });

        scannerRef.current = scanner;

        await scanner.start(
          selectedCameraId,
          {
            fps: 10,
          },
          (decodedText) => {
            if (cancelled || hasScanned) return;

            hasScanned = true;

            localStorage.setItem(CAMERA_STORAGE_KEY, selectedCameraId);

            onScan(decodedText);
          },
          () => {
            // Неудачное распознавание отдельного кадра —
            // нормальная часть работы сканера.
          },
        );

        if (cancelled && scanner.isScanning) {
          await scanner.stop();
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Не удалось запустить сканер:", error);
        }
      }
    };

    startScanner();

    return () => {
      cancelled = true;

      const scanner = scannerRef.current;

      if (scanner?.isScanning) {
        scanner
          .stop()
          .catch((error) =>
            console.error("Не удалось остановить сканер:", error),
          );
      }

      scannerRef.current = null;
    };
  }, [selectedCameraId, onScan]);

  const switchCamera = async () => {
    if (cameras.length < 2 || !selectedCameraId) {
      return;
    }

    const currentIndex = cameras.findIndex(
      (camera) => camera.id === selectedCameraId,
    );

    const nextIndex = (currentIndex + 1) % cameras.length;

    const scanner = scannerRef.current;

    if (scanner?.isScanning) {
      try {
        await scanner.stop();
      } catch (error) {
        console.error("Не удалось остановить камеру:", error);
      }
    }

    setSelectedCameraId(cameras[nextIndex].id);
  };

  return (
    <div className={styles.overlay}>
      <div id={SCANNER_ELEMENT_ID} className={styles.video} />

      {cameras.length > 1 && (
        <button
          type="button"
          className={styles.switchCameraButton}
          onClick={switchCamera}
          aria-label="Switch camera"
        >
          ↻
        </button>
      )}

      <button type="button" className={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  );
};
