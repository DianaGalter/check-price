import type { Product } from "./product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
  const { name, article, price } = product;
  return (
    <article>
      <h2>{name}</h2>
      <p>Article: {article}</p>
      <p>Price: {price}</p>
    </article>
  );
};
