import { products, ProductList } from "./entities/product";
import {
  filterProducts,
  SearchInput,
  EmptyState,
} from "./features/product-search";
import { useState } from "react";
import { useDebounce } from "./shared/hooks";
import { Header } from "./widgets/header";

import styles from "./App.module.scss";
import { Footer } from "./widgets/footer";
import { ProductDetails } from "./widgets/product-details";
import type { Product } from "./entities/product/product";
import { SettingsPanel } from "./widgets/settings-panel";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProducts = filterProducts(products, debouncedSearchQuery);
  const productsCount = filteredProducts.length;
  const hasSearchQuery = Boolean(debouncedSearchQuery.trim());

  return (
    <div className={styles.app}>
      <Header onMenuClick={() => setIsSettingsOpen(true)} />

      {isSettingsOpen && (
        <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
      )}

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
