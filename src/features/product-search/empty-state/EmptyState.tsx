import styles from "./EmptyState.module.scss";
import emptySearchIllustration from "../../../assets/illustrations/product-search-empty.svg";

export const EmptyState = () => {
  return (
    <>
      <img src={emptySearchIllustration} alt="" />

      <h2 className={styles.title}>Найдите товар</h2>
      <p className={styles.description}>Введите название товара или артикул</p>
    </>
  );
};
