import { useState } from "react";

import { products } from "../../entities/product";
import type { Product } from "../../entities/product";
import { getSetBarcode } from "../../shared/lib/getSetBarcode";
import { useDebounce } from "../../shared/hooks";
import { useTranslation } from "../../shared/i18n";

import { BarcodeScanner } from "../barcode-scanner";
import { filterProducts, SearchInput } from "../product-search";

import { BarcodePreview } from "./BarcodePreview";
import { PrintProductCard } from "./PrintProductCard";

import styles from "./PrintPage.module.scss";

interface BarcodePreviewData {
  value: string;
  title?: string;
  subtitle?: string;
  article?: string;
}

export const PrintPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [barcodePreview, setBarcodePreview] =
    useState<BarcodePreviewData | null>(null);

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

  const getFullArticle = (product: Product) =>
    product.colorCode
      ? `${product.article}${product.colorCode}`
      : product.article;

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSuitcaseBarcode = () => {
    if (!selectedProduct) return;

    const fullArticle = getFullArticle(selectedProduct);

    setBarcodePreview({
      value: selectedProduct.barcode || fullArticle,
      title: `${selectedProduct.name} ${selectedProduct.size}`,
      subtitle: selectedProduct.color,
      article: fullArticle,
    });
  };

  const handleSetBarcode = () => {
    if (!selectedProduct) return;

    const setBarcode = getSetBarcode(selectedProduct, products);

    if (!setBarcode) return;

    setBarcodePreview({
      value: setBarcode,
      title: `${selectedProduct.name} set`,
      subtitle: selectedProduct.color,
    });
  };

  const handleGenerateRawBarcode = () => {
    const value = debouncedSearchQuery.trim();

    if (!value) return;

    setBarcodePreview({
      value,
      article: value,
    });
  };

  const selectedSetBarcode = selectedProduct
    ? getSetBarcode(selectedProduct, products)
    : undefined;

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

      {hasSearchQuery && <h2 className={styles.title2}>Generate barcode</h2>}

      <main className={styles.main}>
        {hasSearchQuery &&
          filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <PrintProductCard
              key={getFullArticle(product)}
              product={product}
              onClick={() => handleProductSelect(product)}
            />
          ))}

        {hasSearchQuery && filteredProducts.length === 0 && (
          <div className={styles.noResults}>
            <p>No product found</p>

            <button
              type="button"
              className={styles.generateButton}
              onClick={handleGenerateRawBarcode}
            >
              Generate barcode for "{debouncedSearchQuery}"
            </button>
          </div>
        )}
      </main>

      {selectedProduct && (
        <div className={styles.choiceOverlay}>
          <div className={styles.choiceModal}>
            <button
              type="button"
              className={styles.choiceCloseButton}
              aria-label="Close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <div className={styles.choiceProduct}>
              <strong>
                {selectedProduct.name} {selectedProduct.size}
              </strong>

              <span>{selectedProduct.color}</span>
            </div>

            <div className={styles.choiceActionsWrapper}>
              <div className={styles.choiceActions}>
                <button
                  type="button"
                  className={styles.choiceButton}
                  onClick={handleSuitcaseBarcode}
                >
                  <svg
                    className={styles.choiceIcon}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M4 8V4h4" />
                    <path d="M16 4h4v4" />
                    <path d="M4 16v4h4" />
                    <path d="M20 16v4h-4" />
                    <path d="M7 7v10" />
                    <path d="M9 7v10" />
                    <path d="M11 7v10" />
                    <path d="M13 7v10" />
                    <path d="M15 7v10" />
                    <path d="M17 7v10" />
                  </svg>

                  <span>Suitcase barcode</span>

                  <svg
                    className={styles.choiceChevron}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </button>
              </div>
              <div className={styles.choiceActions}>
                {selectedSetBarcode && (
                  <button
                    type="button"
                    className={styles.choiceButton}
                    onClick={handleSetBarcode}
                  >
                    <svg
                      className={styles.choiceIcon}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M4 8V4h4" />
                      <path d="M16 4h4v4" />
                      <path d="M4 16v4h4" />
                      <path d="M20 16v4h-4" />
                      <path d="M7 7v10" />
                      <path d="M9 7v10" />
                      <path d="M11 7v10" />
                      <path d="M13 7v10" />
                      <path d="M15 7v10" />
                      <path d="M17 7v10" />
                    </svg>

                    <span>Set barcode</span>

                    <svg
                      className={styles.choiceChevron}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {barcodePreview && (
        <BarcodePreview
          value={barcodePreview.value}
          title={barcodePreview.title}
          subtitle={barcodePreview.subtitle}
          article={barcodePreview.article}
          onClose={() => setBarcodePreview(null)}
        />
      )}
    </div>
  );
};
