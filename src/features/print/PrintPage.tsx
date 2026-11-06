import { useState } from "react";

import { products } from "../../entities/product";
import type { Product } from "../../entities/product";
import { filterProducts, SearchInput } from "../product-search";
import { BarcodeScanner } from "../barcode-scanner";
import { useDebounce } from "../../shared/hooks";
import { useTranslation } from "../../shared/i18n";

import { PrintProductCard } from "./PrintProductCard";

import styles from "./PrintPage.module.scss";

export const PrintPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProducts = filterProducts(products, debouncedSearchQuery);

  const hasSearchQuery = Boolean(debouncedSearchQuery.trim());

  const { t } = useTranslation();

  const handleScan = (value: string) => {
    const product = products.find((product) => product.barcode === value);

    const productArticle = product?.colorCode
      ? `${product.article}${product.colorCode}`
      : product?.article;

    setSearchQuery(productArticle || value);
    setIsScannerOpen(false);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);

    console.log("Selected product:", product);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Print barcode</h1>
      </header>

      <div className={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t.search.placeholder}
          ariaLabel={t.search.ariaLabel}
          onScanClick={() => setIsScannerOpen(true)}
        />

        {isScannerOpen && (
          <BarcodeScanner
            onScan={handleScan}
            onClose={() => setIsScannerOpen(false)}
          />
        )}
      </div>

      <main className={styles.main}>
        {hasSearchQuery &&
          filteredProducts.map((product) => (
            <PrintProductCard
              key={
                product.colorCode
                  ? `${product.article}${product.colorCode}`
                  : product.article
              }
              product={product}
              isSelected={selectedProduct === product}
              onClick={() => handleProductSelect(product)}
            />
          ))}

        {hasSearchQuery && filteredProducts.length === 0 && (
          <div className={styles.noResults}>
            <p>No product found</p>

            <button
              type="button"
              className={styles.generateButton}
              onClick={() =>
                console.log("Generate barcode:", debouncedSearchQuery)
              }
            >
              Generate barcode for "{debouncedSearchQuery}"
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
