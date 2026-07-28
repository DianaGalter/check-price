import { products } from "./entities/product/products.mock";
import { filterProducts } from "./features/product-search/filterProducts";
import { ProductList } from "./entities/product/ProductList";
import { useState } from "react";
import { SearchInput } from "./features/product-search/SearchInput";
import { useDebounce } from "./shared/hooks/useDebounce";

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
