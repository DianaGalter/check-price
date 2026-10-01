import type { Product } from "../../entities/product";

const getFullArticle = (product: Product) =>
  product.colorCode
    ? `${product.article}${product.colorCode}`
    : product.article;

const getSetSizes = (name: string): string[] => {
  if (name === "Oregon") {
    return ["20", "24", "28", "32"];
  }

  if (name === "Ibiza") {
    return ["17", "20", "24", "28"];
  }

  return ["20", "24", "28"];
};

export const getSetBarcode = (
  product: Product,
  products: Product[],
): string | undefined => {
  const sizes = getSetSizes(product.name);

  const setProducts = sizes.map((size) =>
    products.find(
      (item) =>
        item.name === product.name &&
        item.color === product.color &&
        item.size === size,
    ),
  );

  if (setProducts.some((item) => !item)) {
    return undefined;
  }

  return setProducts
    .map((item) => getFullArticle(item!))
    .join("\n");
};