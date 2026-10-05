import { useEffect, useRef } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import styles from "./BarcodeScanner.module.scss";

interface BarcodeScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

function logToScreen(message: string) {
  const logElement = document.getElementById("debug-log");
  if (logElement) {
    logElement.innerText += "\n" + message;
  }
  console.log(message);
}

export const BarcodeScanner = ({ onScan, onClose }: BarcodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = new BrowserQRCodeReader();

  useEffect(() => {
    if (!videoRef.current) return;

    async function startScanner() {
      const videoInputDevices =
        await BrowserQRCodeReader.listVideoInputDevices();

      logToScreen(`Найдено камер: ${videoInputDevices.length}`);

      // Выводим названия всех камер на экран, чтобы понять, что видит Samsung
      videoInputDevices.forEach((device, index) => {
        logToScreen(
          `Камера [${index}]: ${device.label || "Без названия"} (ID: ${device.deviceId.substring(0, 5)}...)`,
        );
      });

      // Строгий поиск основной камеры (исключаем широкоугольные wide/ultra)
      let mainCamera = videoInputDevices.find((device) => {
        const label = device.label.toLowerCase();
        return (
          (label.includes("back") ||
            label.includes("rear") ||
            label.includes("camera 0")) &&
          !label.includes("wide") &&
          !label.includes("ultra")
        );
      });

      if (mainCamera) {
        logToScreen(`Выбрана по фильтру: ${mainCamera.label}`);
      } else {
        // Фолбек 1: любая задняя
        mainCamera = videoInputDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear"),
        );
        logToScreen(
          mainCamera
            ? `Фолбек на заднюю: ${mainCamera.label}`
            : "Задняя камера не найдена по ключевым словам, берем первую",
        );
      }

      const selectedDeviceId = mainCamera
        ? mainCamera.deviceId
        : videoInputDevices[0]?.deviceId || "";

      if (!selectedDeviceId) {
        logToScreen("Ошибка: Доступные камеры отсутствуют.");
        return;
      }

      const videoElement = document.getElementById("video") as HTMLVideoElement;

      // Запускаем сканер и сохраняем controls для управления потоком
      const controls = await codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        videoElement,
        (result: any) => {
          if (result) {
            logToScreen(`Считано: ${result.getText()}`);
            // Используем controls, чтобы остановить камеру после успешного сканирования
            controls.stop();
          }
        },
      );

      // Пытаемся настроить фокус
      const stream = videoElement.srcObject as MediaStream | null;
      if (stream) {
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
          const capabilities = videoTrack.getCapabilities() as any;
          logToScreen(
            `Доступные режимы фокуса: ${JSON.stringify(capabilities.focusMode || "отсутствуют")}`,
          );

          if (
            capabilities.focusMode &&
            capabilities.focusMode.includes("continuous")
          ) {
            await videoTrack.applyConstraints({
              advanced: [{ focusMode: "continuous" }],
            } as any);
            logToScreen("Фокус continuous успешно применен!");
          }
        }
      }
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
