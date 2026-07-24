import { products } from "./entities/product/products.mock";
import { ProductList } from "./entities/product/ProductList";
import { useState } from "react";
import { SearchInput } from "./features/product-search/SearchInput";

const normalizeText = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = normalizeText(searchQuery);

  let filteredProducts = products;

  if (normalizedQuery) {
    filteredProducts = products.filter((product) => {
      const normalizedName = normalizeText(product.name);

      return (
        product.article.includes(normalizedQuery) ||
        normalizedName.includes(normalizedQuery)
      );
    });
  }

  const productsCount = filteredProducts.length;

  return (
    <main>
      <h1>Products</h1>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      {productsCount > 0 ? (
        <>
          <p>Found {productsCount} products</p>
          <ProductList products={filteredProducts} />
        </>
      ) : (
        <p>No products found</p>
      )}
    </main>
  );
}

export default App;
