import { useEffect, useRef } from "react";
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

    let controls: IScannerControls | undefined;

    const startScanner = async () => {
      alert("scanning...");
      try {
        const closeActiveStreams = (stream: MediaStream) => {
          const tracks = stream.getVideoTracks();
          for (const track of tracks) {
            track.enabled = false;
            track.stop();
            stream.removeTrack(track);
          }
        };

        let mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
        });
        let devices = await navigator.mediaDevices.enumerateDevices();
        let results = [];
        for (const device of devices) {
          alert("label: " + device.label);
          if (device.kind === "videoinput") {
            results.push({
              id: device.deviceId,
              label: device.label,
            });
            alert("label: " + device.label);
          }
        }
        closeActiveStreams(mediaStream);
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
