import { ProductCard } from "../product-card";
import type { Product } from "../product";
import styles from "./ProductList.module.scss";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.article} className={styles.item}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
