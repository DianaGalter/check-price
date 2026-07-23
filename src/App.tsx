import { products } from "./entities/product/products.mock";
import { ProductList } from "./entities/product/ProductList";
import { useState } from "react";

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
      <search>
        <input
          id="product-search"
          type="search"
          placeholder="Search by name or article number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </search>

      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <p>No products found</p>
      )}
    </main>
  );
}

export default App;
