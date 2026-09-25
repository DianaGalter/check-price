import type { Product } from "../../entities/product/product";
import { getProductDimensions } from "../../shared/lib/getProductDimensions";
import { getProductImage } from "../../shared/lib/getProductImage";
import styles from "./ProductDetails.module.scss";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetails = ({ product, onClose }: ProductDetailsProps) => {
  const {
    name,
    size,
    article,
    price,
    color,
    colorCode,
    volume,
    height,
    width,
    depth,
    weight,
  } = product;
  const productName = `${name} ${size} ${color}`;
  const productArticle = colorCode ? `${article}${colorCode}` : article;
  const image = getProductImage(productArticle);

  return (
    <section
      className={styles.panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-details-title"
    >
      {/* Header */}
      <header className={styles.header}>
        <button
          className={styles.iconButton}
          type="button"
          aria-label="Вернуться к списку"
          onClick={onClose}
        >
          <svg
            className={styles.headerIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="m11 18-6-6 6-6" />
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

      {/* Product image */}
      <div className={styles.imageContainer}>
        {image ? (
          <img className={styles.image} src={image} alt={productName} />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
      </div>

      {/* Product information */}
      <div className={styles.content}>
        <h2 id="product-details-title" className={styles.title}>
          {productName}
        </h2>

        <section className={styles.details} aria-label="Информация о товаре">
          {/* Article */}
          <div className={styles.detailRow}>
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 5h9l7 7-8 8-8-8V5Z" />
              <circle cx="9" cy="10" r="1.5" />
            </svg>

            <span className={styles.label}>Артикул</span>
            <span className={styles.value}>{productArticle}</span>
          </div>

          {/* Dimensions */}
          {color && (
            <div className={styles.detailRow}>
              <svg
                className={styles.detailIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="6" y="5" width="12" height="14" rx="2" />
                <path d="M9 5V3h6v2" />
                <path d="M3 8v8" />
                <path d="m2 9 1-1 1 1" />
                <path d="m2 15 1 1 1-1" />
              </svg>

              <span className={styles.label}>Размеры</span>
              <span className={styles.value}>
                {getProductDimensions(height, width, depth)}
              </span>
            </div>
          )}

          {/* Weight */}
          {color && (
            <div className={styles.detailRow}>
              <svg
                className={styles.detailIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6 20h12l-1.5-11h-9L6 20Z" />
                <path d="M9 9a3 3 0 0 1 6 0" />
                <path d="m12 9 1.5-2" />
              </svg>

              <span className={styles.label}>Вес</span>
              <span className={styles.value}>{weight} кг</span>
            </div>
          )}

          {/* Volume */}
          {color && (
            <div className={styles.detailRow}>
              <svg
                className={styles.detailIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
                <path d="m4 7.5 8 4.5 8-4.5" />
                <path d="M12 12v9" />
              </svg>

              <span className={styles.label}>Объём</span>
              <span className={styles.value}>{volume} л</span>
            </div>
          )}

          {/* Price */}
          <div className={styles.detailRow}>
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8" />

              <path d="M9 8v8" />
              <path d="M13 8v6" />
              <path d="M9 8h4" />

              <path d="M11 10v6" />
              <path d="M11 16h4" />
              <path d="M15 8v8" />
            </svg>

            <span className={styles.label}>Цена чемодана</span>
            <span className={`${styles.value} ${styles.price}`}>₪{price}</span>
          </div>

          {/* setPrice */}
          <div className={styles.detailRow}>
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8" />

              <path d="M9 8v8" />
              <path d="M13 8v6" />
              <path d="M9 8h4" />

              <path d="M11 10v6" />
              <path d="M11 16h4" />
              <path d="M15 8v8" />
            </svg>

            <span className={styles.label}>Цена сета</span>
            <span className={`${styles.value} ${styles.price}`}>₪{price}</span>
          </div>

          {/* Barcode */}
          <button className={styles.barcodeRow} type="button">
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* Scanner corners */}
              <path d="M4 8V4h4" />
              <path d="M16 4h4v4" />
              <path d="M4 16v4h4" />
              <path d="M20 16v4h-4" />

              {/* Barcode lines */}
              <path d="M7 7v10" />
              <path d="M9 7v10" />
              <path d="M11 7v10" />
              <path d="M13 7v10" />
              <path d="M15 7v10" />
              <path d="M17 7v10" />
            </svg>

            <span className={styles.label}>Штрихкод</span>

            <svg
              className={styles.chevron}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </section>
      </div>
    </section>
  );
};
