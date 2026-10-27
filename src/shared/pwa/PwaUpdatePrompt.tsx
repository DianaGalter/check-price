import { useRegisterSW } from "virtual:pwa-register/react";

export const PwaUpdatePrompt = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) {
    return null;
  }

  return (
    <button onClick={() => updateServiceWorker(true)}>Update available</button>
  );
};
