import type { Product } from "../../entities/product/product";

export type Store = "columbia" | "shvilim";

const roundPrice = (price: number): number =>
  Math.round((price + Number.EPSILON) * 100) / 100;

export const getProductPrice = (
  product: Product,
  store: Store
): number => {
  if (product.specialPrice !== undefined) {
    return Number(product.specialPrice);
  }

  const price = Number(product.price);

  if (product.size === "24") {
    return roundPrice(price * 0.5);
  }

  if (store === "shvilim" && product.size === "20") {
    return roundPrice(price * 0.5);
  }

  return roundPrice(price * 0.7);
};