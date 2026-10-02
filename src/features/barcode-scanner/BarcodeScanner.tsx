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
        const track =
          videoRef.current?.srcObject instanceof MediaStream
            ? videoRef.current.srcObject.getVideoTracks()[0]
            : undefined;

        if (track) {
          interface CameraCapabilities extends MediaTrackCapabilities {
            focusMode?: string[];
            focusDistance?: {
              min: number;
              max: number;
              step: number;
            };
            zoom?: {
              min: number;
              max: number;
              step: number;
            };
          }
          const capabilities = track.getCapabilities() as CameraCapabilities;

          alert(
            JSON.stringify(
              {
                focusMode: capabilities.focusMode,
                focusDistance: capabilities.focusDistance,
                zoom: capabilities.zoom,
              },
              null,
              2,
            ),
          );

          const settings = track.getSettings();

          alert(
            JSON.stringify(
              {
                label: track.label,
                deviceId: settings.deviceId,
                facingMode: settings.facingMode,
                width: settings.width,
                height: settings.height,
              },
              null,
              2,
            ),
          );

          const devices = await navigator.mediaDevices.enumerateDevices();

          const cameras = devices
            .filter((device) => device.kind === "videoinput")
            .map((device) => ({
              label: device.label,
              deviceId: device.deviceId,
            }));

          alert(JSON.stringify(cameras, null, 2));
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
