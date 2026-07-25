import { products } from "./entities/product/products.mock";
import { filterProducts } from "./features/product-search/filterProducts";
import { ProductList } from "./entities/product/ProductList";
import { useState } from "react";
import { SearchInput } from "./features/product-search/SearchInput";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = filterProducts(products, searchQuery);

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
