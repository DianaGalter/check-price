import styles from "./Footer.module.scss";
interface FooterProps {
  hint?: string;
}

export const Footer = ({ hint }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      {hint && <p className={styles.hint}>{hint}</p>}
    </footer>
  );
};
