import { products, ProductList } from "./entities/product";
import {
  filterProducts,
  SearchInput,
  EmptyState,
} from "./features/product-search";
import { useState } from "react";
import { useDebounce } from "./shared/hooks";
import { Header } from "./widgets/header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProducts = filterProducts(products, debouncedSearchQuery);
  const productsCount = filteredProducts.length;
  const hasSearchQuery = Boolean(debouncedSearchQuery.trim());

  return (
    <>
      <Header />
      <main>
        {!hasSearchQuery && <EmptyState />}
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
    </>
  );
}

export default App;
