import { useRegisterSW } from "virtual:pwa-register/react";
import { useTranslation } from "../i18n";
import styles from "./PwaUpdatePrompt.module.scss";

export const PwaUpdatePrompt = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const { t: translations } = useTranslation();

  const t = translations.pwaUpdate;

  if (!needRefresh) {
    return null;
  }

  return (
    <div className={styles.prompt}>
      <span className={styles.message}>{t.message}</span>

      <button
        className={styles.updateButton}
        type="button"
        onClick={() => updateServiceWorker(true)}
      >
        {t.update}
      </button>
    </div>
  );
};
