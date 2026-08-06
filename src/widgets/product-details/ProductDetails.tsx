import type { Product } from "../../entities/product/product";
import styles from "./ProductDetails.module.scss";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { name, article, price, color, image } = product;

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <button type="button" aria-label="Вернуться к списку">
          {/* иконка стрелки назад */}
        </button>

        <button type="button" aria-label="Добавить в избранное">
          {/* иконка звезды */}
        </button>
      </header>

      <div className={styles.imageContainer}>
        {image ? (
          <img className={styles.image} src={image} alt={name} />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
      </div>

      <h2 className={styles.title}>{name}</h2>

      <section className={styles.details} aria-label="Информация о товаре">
        <div className={styles.detailRow}>
          <span aria-hidden="true">{/* иконка артикула */}</span>
          <span className={styles.label}>Артикул</span>
          <span className={styles.value}>{article}</span>
        </div>

        {color && (
          <div className={styles.detailRow}>
            <span aria-hidden="true">{/* иконка цвета */}</span>
            <span className={styles.label}>Цвет</span>
            <span className={styles.value}>{color}</span>
          </div>
        )}

        <div className={styles.detailRow}>
          <span aria-hidden="true">{/* иконка цены */}</span>
          <span className={styles.label}>Цена</span>
          <span className={`${styles.value} ${styles.price}`}>
            ₪{price.toFixed(2)}
          </span>
        </div>

        <button className={styles.barcodeRow} type="button">
          <span aria-hidden="true">{/* иконка штрихкода */}</span>
          <span className={styles.label}>Штрихкод</span>
          <span aria-hidden="true">{/* стрелка вправо */}</span>
        </button>
      </section>
    </section>
  );
};
