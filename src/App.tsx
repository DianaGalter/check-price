import { useState } from "react";

import { products, ProductList } from "./entities/product";
import type { Product } from "./entities/product/product";

import {
  EmptyState,
  filterProducts,
  SearchInput,
} from "./features/product-search";
import { useDebounce } from "./shared/hooks";

import { Footer } from "./widgets/footer";
import { Header } from "./widgets/header";
import { ProductDetails } from "./widgets/product-details";

import styles from "./App.module.scss";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProducts = filterProducts(products, debouncedSearchQuery);
  const productsCount = filteredProducts.length;
  const hasSearchQuery = Boolean(debouncedSearchQuery.trim());

  return (
    <div className={styles.app}>
      <Header onMenuClick={() => {}} />

      <div className={styles.searchSection}>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />

        {hasSearchQuery && productsCount > 0 && (
          <p className={styles.resultsCount}>
            Найдено товаров: {productsCount}
          </p>
        )}
      </div>

      <main className={styles.main}>
        {!hasSearchQuery ? (
          <EmptyState />
        ) : productsCount > 0 ? (
          <ProductList
            products={filteredProducts}
            onProductSelect={setSelectedProduct}
          />
        ) : (
          <p className={styles.noResults}>Товары не найдены</p>
        )}
      </main>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer
        hint={
          hasSearchQuery
            ? "Можно искать по названию товара или части артикула"
            : undefined
        }
      />
    </div>
  );
}

export default App;
