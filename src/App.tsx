import { products } from "./entities/product/products.mock";
import { ProductCard } from "./entities/product/ProductCard";

function App() {
  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.article}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
