import { ProductCard } from "../product-card";
import type { Product } from "../product";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.article}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
