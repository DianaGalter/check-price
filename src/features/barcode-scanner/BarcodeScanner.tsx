import { useEffect, useRef, useState } from "react";
import {
  BrowserMultiFormatReader,
  type IScannerControls,
} from "@zxing/browser";
import styles from "./BarcodeScanner.module.scss";

interface BarcodeScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

const CAMERA_STORAGE_KEY = "scannerCameraId";

export const BarcodeScanner = ({ onScan, onClose }: BarcodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const getCameras = async () => {
      let permissionStream: MediaStream | undefined;

      try {
        let devices = await navigator.mediaDevices.enumerateDevices();

        const hasCameraLabels = devices.some(
          (device) => device.kind === "videoinput" && device.label,
        );

        // Если permission ещё не был выдан,
        // браузер может скрывать названия камер.
        if (!hasCameraLabels) {
          permissionStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
          });

          devices = await navigator.mediaDevices.enumerateDevices();
        }

        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );

        const backCameras = videoDevices.filter((device) =>
          device.label.toLowerCase().includes("back"),
        );

        const availableCameras =
          backCameras.length > 0 ? backCameras : videoDevices;

        // Если мы открывали временный stream только ради permission,
        // закрываем его до запуска ZXing.
        if (permissionStream) {
          permissionStream.getTracks().forEach((track) => track.stop());

          permissionStream = undefined;

          // Даём браузеру немного времени освободить камеру.
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        if (cancelled) return;

        setCameras(availableCameras);

        const savedCameraId = localStorage.getItem(CAMERA_STORAGE_KEY);

        const savedCamera = availableCameras.find(
          (camera) => camera.deviceId === savedCameraId,
        );

        const defaultCamera =
          savedCamera ??
          (backCameras.length > 0 ? backCameras.at(-1) : videoDevices[0]);

        if (defaultCamera) {
          setSelectedCameraId(defaultCamera.deviceId);
        }
      } catch (error) {
        console.error("Не удалось получить камеры:", error);
      } finally {
        permissionStream?.getTracks().forEach((track) => track.stop());
      }
    };

    getCameras();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current || !selectedCameraId) {
      return;
    }

    const reader = new BrowserMultiFormatReader();

    let cancelled = false;
    let localControls: IScannerControls | null = null;

    const startScanner = async () => {
      try {
        // Если в video ещё висит старый stream — закрываем его явно.
        const oldStream = videoRef.current?.srcObject;

        if (oldStream instanceof MediaStream) {
          oldStream.getTracks().forEach((track) => track.stop());
          videoRef.current!.srcObject = null;
        }

        const controls = await reader.decodeFromVideoDevice(
          selectedCameraId,
          videoRef.current!,
          (result) => {
            if (!result || cancelled) return;

            localStorage.setItem(CAMERA_STORAGE_KEY, selectedCameraId);

            localControls?.stop();

            onScan(result.getText());
          },
        );

        localControls = controls;

        // Effect мог успеть уничтожиться,
        // пока камера ещё открывалась.
        if (cancelled) {
          controls.stop();

          const stream = videoRef.current?.srcObject;

          if (stream instanceof MediaStream) {
            stream.getTracks().forEach((track) => track.stop());

            videoRef.current!.srcObject = null;
          }

          return;
        }

        controlsRef.current = controls;
      } catch (error) {
        if (!cancelled) {
          console.error("Не удалось запустить сканер:", error);
        }
      }
    };

    startScanner();

    return () => {
      cancelled = true;

      localControls?.stop();

      if (controlsRef.current === localControls) {
        controlsRef.current = null;
      }

      const stream = videoRef.current?.srcObject;

      if (stream instanceof MediaStream) {
        stream.getTracks().forEach((track) => track.stop());

        videoRef.current!.srcObject = null;
      }
    };
  }, [selectedCameraId, onScan]);

  const switchCamera = () => {
    if (cameras.length < 2 || !selectedCameraId) {
      return;
    }

    const currentIndex = cameras.findIndex(
      (camera) => camera.deviceId === selectedCameraId,
    );

    const nextIndex = (currentIndex + 1) % cameras.length;

    setSelectedCameraId(cameras[nextIndex].deviceId);
  };

  return (
    <div className={styles.overlay}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
        playsInline
      />

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
