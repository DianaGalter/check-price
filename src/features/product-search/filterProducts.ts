import { type Product } from "../../entities/product";

const normalizeText = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

export const filterProducts = (
  productList: Product[],
  searchQuery: string,
): Product[] => {
  const normalizedQuery = normalizeText(searchQuery);

  if (!normalizedQuery) {
    return [];
  }

  return productList.filter((product) => {
    const normalizedName = normalizeText(product.name);
    const fullArticle = product.colorCode
      ? `${product.article}${product.colorCode}`
      : product.article;

    return (
      fullArticle.includes(normalizedQuery) ||
      normalizedName.includes(normalizedQuery)
    );
  });
};