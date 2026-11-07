import type { Product } from "../../entities/product";
import { getProductImage } from "../../shared/lib/getProductImage";

import styles from "./PrintProductCard.module.scss";

interface PrintProductCardProps {
  product: Product;
  onClick: () => void;
}

export const PrintProductCard = ({
  product,
  onClick,
}: PrintProductCardProps) => {
  const { name, size, article, color, colorCode } = product;

  const image = getProductImage(name, colorCode, color);

  const fullArticle = colorCode ? `${article}${colorCode}` : article;

  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        {image ? (
          <img
            className={styles.image}
            src={image}
            alt={`${name} ${size} ${color}`}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.name}>
          {name} {size}
        </span>

        <span className={styles.color}>{color}</span>

        <span className={styles.article}>{fullArticle}</span>
      </div>

      <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
      </svg>
    </button>
  );
};
