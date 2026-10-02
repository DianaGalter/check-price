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
        const devices = await navigator.mediaDevices.enumerateDevices();

        const backCameras = devices.filter(
          (device) =>
            device.kind === "videoinput" &&
            device.label.includes("facing back"),
        );

        const camera = backCameras[1];

        if (!camera) {
          console.error("Вторая задняя камера не найдена");
          return;
        }

        controls = await reader.decodeFromConstraints(
          {
            video: {
              deviceId: { exact: camera.deviceId },
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
          },
          videoRef.current!,
          (result) => {
            if (!result) return;

            controls?.stop();
            onScan(result.getText());
          },
        );

        const track =
          videoRef.current?.srcObject instanceof MediaStream
            ? videoRef.current.srcObject.getVideoTracks()[0]
            : undefined;

        if (track) {
          const settings = track.getSettings();

          alert(
            JSON.stringify(
              {
                label: track.label,
                width: settings.width,
                height: settings.height,
              },
              null,
              2,
            ),
          );
        }
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
