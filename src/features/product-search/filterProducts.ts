import { type Product } from "../../entities/product/product";

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

    return (
      product.article.includes(normalizedQuery) ||
      normalizedName.includes(normalizedQuery)
    );
  });
};