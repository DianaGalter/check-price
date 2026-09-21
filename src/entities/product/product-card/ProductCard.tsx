import { getProductImage } from "../../../shared/lib/getProductImage";
import type { Product } from "../product";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { name, size, article, price, color, colorCode } = product;
  const productName = `${name} ${size}`;
  const productArticle = colorCode ? `${article}${colorCode}` : article;
  const image = getProductImage(productArticle);

  return (
    <article className={styles.card}>
      <button
        className={styles.cardButton}
        type="button"
        onClick={onClick}
        aria-label={`Открыть ${productName}  ${color}`}
      >
        <div className={styles.imageContainer}>
          {image ? (
            <img className={styles.image} src={image} alt={productName} />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.content}>
          <h2 className={styles.name}>{productName}</h2>

          {color && <p className={styles.color}>{color}</p>}

          <p className={styles.article}>Артикул: {productArticle}</p>
          <p className={styles.price}>₪{price}</p>
        </div>

        <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
    </article>
  );
};
