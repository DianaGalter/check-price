import { useEffect, useRef, useState } from "react";
import {
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
  type Html5QrcodeCameraScanConfig,
} from "html5-qrcode";

import styles from "./BarcodeScanner.module.scss";
import { useTranslation } from "../../shared/i18n";

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

  const { camera: t } = useTranslation().t;

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
        console.error("Failed to get the camera:", error);
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
          formatsToSupport: [
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.CODE_93,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
          ],
          useBarCodeDetectorIfSupported: true,
          verbose: false,
        });

        scannerRef.current = scanner;

        await scanner.start(
          selectedCameraId,
          {
            fps: 10,
            qrbox: 250,
            aspectRatio: 16 / 9,
            renderingConstraints: 2,
            defaultZoomValueIfSupported: 1.5,
          } as Html5QrcodeCameraScanConfig,
          (decodedText) => {
            if (cancelled || hasScanned) return;

            hasScanned = true;

            localStorage.setItem(CAMERA_STORAGE_KEY, selectedCameraId);

            onScan(decodedText);
          },
          () => {
            // Failure to recognize an individual frame is a normal part of the scanner's operation.
          },
        );

        if (cancelled && scanner.isScanning) {
          await scanner.stop();
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to start the scanner:", error);
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
            console.error("Failed to stop the scanner:", error),
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
        console.error("Failed to stop the camera:", error);
      }
    }

    setSelectedCameraId(cameras[nextIndex].id);
  };

  return (
    <div className={styles.overlay}>
      <div id={SCANNER_ELEMENT_ID} className={styles.scannerRegion} />

      <div className={styles.scanOverlay} aria-hidden="true">
        <div className={styles.scanFrame}>
          <div className={styles.scanLine} />

          <span className={`${styles.corner} ${styles.topLeft}`} />
          <span className={`${styles.corner} ${styles.topRight}`} />
          <span className={`${styles.corner} ${styles.bottomLeft}`} />
          <span className={`${styles.corner} ${styles.bottomRight}`} />
        </div>
      </div>

      {cameras.length > 1 && (
        <button
          type="button"
          className={styles.switchCameraButton}
          onClick={switchCamera}
          aria-label="Switch camera"
        >
          <span className={styles.switchCameraIcon}>↻</span>
          <span>{t.switch}</span>
        </button>
      )}

      <button type="button" className={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  );
};
