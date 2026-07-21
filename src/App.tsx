import { products } from "./entities/product/products.mock";
import { ProductList } from "./entities/product/ProductList";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchQuery.toLowerCase().trim();
  const filteredProducts = products.filter((product) => {
    if (query.length) {
      // Check if it is a string of numbers
      if (/^\d+$/.test(query)) {
        return product.article.includes(query);
      } else {
        return product.name.toLowerCase().includes(query);
      }
    }

    // If the search query is empty return all the products
    return true;
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

      <ProductList products={filteredProducts} />
    </main>
  );
}

export default App;
