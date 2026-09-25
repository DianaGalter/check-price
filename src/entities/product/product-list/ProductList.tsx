import { ProductCard } from "../product-card";
import type { Product } from "../product";
import styles from "./ProductList.module.scss";

interface ProductListProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export const ProductList = ({
  products,
  onProductSelect,
}: ProductListProps) => {
  return (
    <ul className={styles.list}>
      {products.map((product) => {
        const productArticle = product.colorCode
          ? `${product.article}${product.colorCode}`
          : product.article;
        return (
          <li key={productArticle} className={styles.item}>
            <ProductCard
              product={product}
              onClick={() => {
                onProductSelect(product);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};
