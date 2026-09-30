import { useEffect, useState } from "react";

import { products, ProductList } from "./entities/product";
import type { Product } from "./entities/product/product";
import type { Language } from "./shared/i18n";

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
import type { Store } from "./shared/lib/getProductPrice";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [store, setStore] = useState<Store>(() => {
    const savedStore = localStorage.getItem("selectedStore");

    return savedStore === "shvilim" ? "shvilim" : "columbia";
  });

  const toggleStore = () => {
    setStore((current) => (current === "columbia" ? "shvilim" : "columbia"));
  };

  useEffect(() => {
    localStorage.setItem("selectedStore", store);
  }, [store]);

  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");

    return savedLanguage === "en" ? "en" : "ru";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === "ru" ? "en" : "ru"));
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProducts = filterProducts(products, debouncedSearchQuery);
  const productsCount = filteredProducts.length;
  const hasSearchQuery = Boolean(debouncedSearchQuery.trim());

  return (
    <div className={styles.app}>
      <Header
        store={store}
        onStoreToggle={toggleStore}
        language={language}
        onLanguageToggle={toggleLanguage}
      />

      <div className={styles.searchSection}>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />

        {hasSearchQuery && productsCount > 0 && (
          <p className={styles.resultsCount}>
            Найдено чемоданов: {productsCount}
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
          <p className={styles.noResults}>Чемоданы не найдены</p>
        )}
      </main>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          store={store}
          onStoreToggle={toggleStore}
        />
      )}

      <Footer
        hint={
          hasSearchQuery
            ? "Можно искать по названию модели или части артикула"
            : undefined
        }
      />
    </div>
  );
}

export default App;
