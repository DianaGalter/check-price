import { products } from "./entities/product/products.mock";
import { ProductList } from "./entities/product/ProductList";
import { useState } from "react";
import { SearchInput } from "./features/product-search/SearchInput";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchQuery.toLowerCase().trim();
  const filteredProducts = products.filter((product) => {
    if (!query) {
      return true;
    }
    const normalizedName = product.name.toLowerCase();

    return product.article.includes(query) || normalizedName.includes(query);
  });

  return (
    <main>
      <h1>Products</h1>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <p>No products found</p>
      )}
    </main>
  );
}

export default App;
