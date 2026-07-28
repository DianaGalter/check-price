import { products } from "./entities/product/products.mock";
import { filterProducts } from "./features/product-search/filterProducts";
import { ProductList } from "./entities/product/ProductList";
import { useEffect, useState } from "react";
import { SearchInput } from "./features/product-search/SearchInput";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = filterProducts(products, debouncedSearchQuery);
  const productsCount = filteredProducts.length;
  const hasSearchQuery = Boolean(debouncedSearchQuery.trim());

  return (
    <main>
      <h1>Products</h1>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      {hasSearchQuery &&
        (productsCount > 0 ? (
          <>
            <p>Found {productsCount} products</p>
            <ProductList products={filteredProducts} />
          </>
        ) : (
          <p>No products found</p>
        ))}
    </main>
  );
}

export default App;
