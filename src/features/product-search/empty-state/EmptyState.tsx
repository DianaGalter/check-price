import styles from "./EmptyState.module.scss";
import emptySearchIllustration from "../../../assets/illustrations/product-search-empty.png";

export const EmptyState = () => {
  return (
    <>
      <img
        src={emptySearchIllustration}
        className={styles.illustration}
        alt=""
      />

      <h2 className={styles.title}>Найдите товар</h2>
      <p className={styles.description}>Введите название товара или артикул</p>
    </>
  );
};
