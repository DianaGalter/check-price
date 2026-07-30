import { products, ProductList } from "./entities/product";
import { filterProducts, SearchInput } from "./features/product-search";
import { useState } from "react";
import { useDebounce } from "./shared/hooks";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

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
