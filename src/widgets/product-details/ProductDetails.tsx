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
        <button
          className={styles.iconButton}
          type="button"
          aria-label="Вернуться к списку"
        >
          <svg
            className={styles.headerIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          className={styles.iconButton}
          type="button"
          aria-label="Добавить в избранное"
        >
          <svg
            className={styles.headerIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2-4.5-4.4 6.2-.9L12 3Z" />
          </svg>
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
          <span aria-hidden="true">
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 5h9l7 7-8 8-8-8V5Z" />
              <circle cx="9" cy="10" r="1.5" />
            </svg>
          </span>
          <span className={styles.label}>Артикул</span>
          <span className={styles.value}>{article}</span>
        </div>

        {color && (
          <div className={styles.detailRow}>
            <span aria-hidden="true">
              <svg
                className={styles.detailIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12" />
                <circle cx="8" cy="10" r="1" />
                <circle cx="11" cy="7" r="1" />
                <circle cx="15" cy="8" r="1" />
              </svg>
            </span>
            <span className={styles.label}>Цвет</span>
            <span className={styles.value}>{color}</span>
          </div>
        )}

        <div className={styles.detailRow}>
          <span aria-hidden="true">
            <svg className={styles.detailIcon} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" />

              <path d="M9 8v8" />
              <path d="M13 8v6" />
              <path d="M9 8h4" />

              <path d="M11 10v6" />
              <path d="M11 16h4" />
              <path d="M15 8v8" />
            </svg>
          </span>
          <span className={styles.label}>Цена</span>
          <span className={`${styles.value} ${styles.price}`}>
            ₪{price.toFixed(2)}
          </span>
        </div>

        <button className={styles.barcodeRow} type="button">
          <span aria-hidden="true">
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* левый верхний */}
              <path d="M4 8V4h4" />

              {/* правый верхний */}
              <path d="M16 4h4v4" />

              {/* левый нижний */}
              <path d="M4 16v4h4" />

              {/* правый нижний */}
              <path d="M20 16v4h-4" />

              {/* штрихи */}
              <path d="M7 7v10" />
              <path d="M9 7v10" />
              <path d="M11 7v10" />
              <path d="M13 7v10" />
              <path d="M15 7v10" />
              <path d="M17 7v10" />
            </svg>
          </span>
          <span className={styles.label}>Штрихкод</span>
          <span aria-hidden="true">
            <svg
              className={styles.chevron}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m9 6 6 6-6 6" />
            </svg>
          </span>
        </button>
      </section>
    </section>
  );
};
