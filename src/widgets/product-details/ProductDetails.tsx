import { useState } from "react";
import type { Product } from "../../entities/product/product";
import { getProductDimensions } from "../../shared/lib/getProductDimensions";
import { getProductPrice, type Store } from "../../shared/lib/getProductPrice";
import { getProductImage } from "../../shared/lib/getProductImage";
import styles from "./ProductDetails.module.scss";
import {
  setPrice as regularSetPrice,
  columbiaSetPrice as colSetPrice,
  shvilimSetPrice as shvilSetPrice,
} from "../../entities/product";

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

  const [store, setStore] = useState<Store>("columbia");
  const [hasClub, setHasClub] = useState(false);

  const currentPrice = hasClub
    ? getProductPrice(product, store)
    : Number(price);

  const currentSetPrice = hasClub
    ? store === "columbia"
      ? colSetPrice[name]
      : shvilSetPrice[name]
    : regularSetPrice[name];

  const formattedPrice = currentPrice.toFixed(2);

  const formattedSetPrice =
    currentSetPrice !== undefined ? currentSetPrice.toFixed(2) : null;

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
          className={styles.storeButton}
          type="button"
          onClick={() =>
            setStore((current) =>
              current === "columbia" ? "shvilim" : "columbia",
            )
          }
          aria-label={`Переключить магазин. Сейчас ${
            store === "columbia" ? "Columbia" : "Швилим"
          }`}
        >
          <span>{store === "columbia" ? "Columbia" : "Швилим"}</span>

          <svg
            className={styles.storeIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m16 3 4 4-4 4" />
            <path d="M20 7H4" />
            <path d="m8 21-4-4 4-4" />
            <path d="M4 17h16" />
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

          {/* Weight */}
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

          {/* Volume */}
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
            <span className={`${styles.value} ${styles.price}`}>
              ₪{formattedPrice}
            </span>
          </div>

          {/* setPrice */}
          {formattedSetPrice && (
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
              <span className={`${styles.value} ${styles.price}`}>
                ₪{formattedSetPrice}
              </span>
            </div>
          )}

          {/* Barcode */}
          {/* {<button className={styles.barcodeRow} type="button">
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >

              <path d="M4 8V4h4" />
              <path d="M16 4h4v4" />
              <path d="M4 16v4h4" />
              <path d="M20 16v4h-4" />

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
          </button> */}

          <div className={styles.discountSection}>
            <svg
              className={styles.discountIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 8l4 4 4-7 4 7 4-4-2 11H6L4 8Z" />
            </svg>

            <div className={styles.discountInfo}>
              <span className={styles.discountTitle}>С муадоном</span>
              <span className={styles.discountDescription}>
                {store === "columbia"
                  ? "Скидка 30% на чемодан"
                  : 'Скидка 50% на 20" и 24"'}
              </span>
            </div>

            <button
              type="button"
              className={`${styles.switch} ${
                hasClub ? styles.switchActive : ""
              }`}
              role="switch"
              aria-checked={hasClub}
              aria-label="Скидка с муадоном"
              onClick={() => setHasClub((current) => !current)}
            >
              <span className={styles.switchThumb} />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};
