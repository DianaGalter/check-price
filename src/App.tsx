import { products } from "./entities/product/products.mock";
import { ProductList } from "./entities/product/ProductList";

function App() {
  return (
    <main>
      <h1>Products</h1>

      <ProductList products={products} />
    </main>
  );
}

export default App;
