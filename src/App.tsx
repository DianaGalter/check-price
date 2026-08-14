import { useEffect, useState } from "react";

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
import { SettingsPanel } from "./widgets/settings-panel";

import styles from "./App.module.scss";

type Theme = "light" | "dark";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProducts = filterProducts(products, debouncedSearchQuery);
  const productsCount = filteredProducts.length;
  const hasSearchQuery = Boolean(debouncedSearchQuery.trim());

  return (
    <div className={styles.app}>
      <Header onMenuClick={() => setIsSettingsOpen(true)} />

      {isSettingsOpen && (
        <SettingsPanel
          theme={theme}
          onThemeChange={setTheme}
          onClose={() => setIsSettingsOpen(false)}
        />
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
