import { useState } from "react";
import type { Product } from "../../entities/product";
import { getProductDimensions } from "../../shared/lib/getProductDimensions";
import { getProductPrice, type Store } from "../../shared/lib/getProductPrice";
import { getProductImage } from "../../shared/lib/getProductImage";
import styles from "./ProductDetails.module.scss";
import {
  setPrice as regularSetPrice,
  columbiaSetPrice as colSetPrice,
  shvilimSetPrice as shvilSetPrice,
  extendedSetPrice as regularExtendedSetPrice,
  columbiaExtendedSetPrice as colExtendedSetPrice,
  shvilimExtendedSetPrice as shvilExtendedSetPrice,
  products,
} from "../../entities/product";
import { getSetBarcode } from "../../shared/lib/getSetBarcode";
import { applyDiscount } from "../../shared/lib/applyDiscount";
import { StoreSwitcher } from "../../shared/ui/store-switcher/StoreSwitcher";
import { useTranslation } from "../../shared/i18n";
import { BarcodeModal } from "./BarcodeModal";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  store: Store;
  onStoreToggle: () => void;
}

type DiscountMap = Record<string, number>;

/*
 * Temporary suitcase promotion.
 * Added in October 2026.
 *
 * Remove this block when the promotion ends,
 * or move the rules into the normal pricing system if they become permanent.
 */
const getTemporarySetDiscounts = (isExtended: boolean): DiscountMap => {
  if (isExtended) {
    return {
      "17": 0.4,
      "20": 0.4,
      "24": 0.6,
      "28": 0.4,
      "32": 0.4,
    };
  }

  return {
    "20": 0.4,
    "24": 0.4,
    "28": 0.4,
  };
};

const getTemporarySetScheme = (isExtended: boolean): string =>
  isExtended ? "40/40/40/60" : "40/40/40";

const getTemporarySetPrice = (
  product: Product,
  isExtended: boolean,
): number | undefined => {
  const { name, color, colorCode } = product;

  const sizes = isExtended
    ? name === "Ibiza"
      ? ["17", "20", "24", "28"]
      : name === "Oregon"
        ? ["20", "24", "28", "32"]
        : null
    : ["20", "24", "28"];

  if (!sizes) {
    return undefined;
  }

  const discounts = getTemporarySetDiscounts(isExtended);

  const setProducts = sizes.map((setSize) => {
    const sameColorProduct = products.find(
      (item) =>
        item.name === name &&
        item.size === setSize &&
        (colorCode ? item.colorCode === colorCode : item.color === color),
    );

    if (sameColorProduct) {
      return sameColorProduct;
    }

    return products.find((item) => item.name === name && item.size === setSize);
  });

  if (setProducts.some((item) => !item)) {
    return undefined;
  }

  const specialSetPrice = setProducts.find(
    (item) => item?.specialSetPrice !== undefined,
  )?.specialSetPrice;

  if (specialSetPrice !== undefined) {
    return Number(specialSetPrice);
  }

  return setProducts.reduce((total, item, index) => {
    if (!item) return total;

    const setSize = sizes[index];
    const discount = discounts[setSize];

    if (discount === undefined) {
      return total + Number(item.price);
    }

    return total + applyDiscount(Number(item.price), discount);
  }, 0);
};

export const ProductDetails = ({
  product,
  onClose,
  store,
  onStoreToggle,
}: ProductDetailsProps) => {
  const {
    name,
    size,
    article,
    price,
    color,
    colorCode,
    volume,
    height,
    width,
    depth,
    weight,
  } = product;

  const productName = `${name} ${size} ${color}`;

  const productArticle = colorCode ? `${article}${colorCode}` : article;

  const setBarcode = getSetBarcode(product, products);

  const image = getProductImage(name, colorCode, color);

  const { t: translations, language } = useTranslation();

  const t = translations.productDetails;

  const isRtl = language === "he";

  const [hasClub, setHasClub] = useState(false);

  const [hasPoliceDiscount, setHasPoliceDiscount] = useState(false);

  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);

  /*
   * Temporary promotion:
   * individual 24" suitcases currently receive 60%.
   */
  const hasTemporaryProductDiscount = size === "24";

  const regularClubProductPrice = getProductPrice(product, store);

  const temporaryClubProductPrice = hasTemporaryProductDiscount
    ? applyDiscount(Number(price), 0.6)
    : undefined;

  const productPrice = hasClub
    ? (temporaryClubProductPrice ?? regularClubProductPrice)
    : Number(price);

  /*
   * Keep the old pricing tables as fallback.
   */
  const regularClubSetPrice =
    store === "columbia" ? colSetPrice[name] : shvilSetPrice[name];

  const regularClubExtendedSetPrice =
    store === "columbia"
      ? colExtendedSetPrice[name]
      : shvilExtendedSetPrice[name];

  /*
   * Apply the temporary promotion only to sets that already
   * exist in the normal pricing system.
   */
  const temporarySetPrice =
    hasClub && regularClubSetPrice !== undefined
      ? getTemporarySetPrice(product, false)
      : undefined;

  const temporaryExtendedSetPrice =
    hasClub && regularClubExtendedSetPrice !== undefined
      ? getTemporarySetPrice(product, true)
      : undefined;

  const currentSetPrice = hasClub
    ? (temporarySetPrice ?? regularClubSetPrice)
    : regularSetPrice[name];

  const currentExtendedSetPrice = hasClub
    ? (temporaryExtendedSetPrice ?? regularClubExtendedSetPrice)
    : regularExtendedSetPrice[name];

  const hasTemporarySetPrice = hasClub && temporarySetPrice !== undefined;

  const hasTemporaryExtendedSetPrice =
    hasClub && temporaryExtendedSetPrice !== undefined;

  const setDiscountScheme = hasTemporarySetPrice
    ? getTemporarySetScheme(false)
    : null;

  const extendedSetDiscountScheme = hasTemporaryExtendedSetPrice
    ? getTemporarySetScheme(true)
    : null;

  /*
   * Police discount is applied after all club/promotion pricing.
   */
  const currentPrice = hasPoliceDiscount
    ? applyDiscount(productPrice, 0.25)
    : productPrice;

  const handlePoliceDiscountToggle = () => {
    setHasPoliceDiscount((current) => {
      const next = !current;

      if (next) {
        setHasClub(true);
      }

      return next;
    });
  };

  const handleClubToggle = () => {
    if (hasPoliceDiscount) return;

    setHasClub((current) => !current);
  };

  const discountedSetPrice =
    currentSetPrice !== undefined
      ? hasPoliceDiscount
        ? applyDiscount(currentSetPrice, 0.25)
        : currentSetPrice
      : undefined;

  const discountedExtendedSetPrice =
    currentExtendedSetPrice !== undefined
      ? hasPoliceDiscount
        ? applyDiscount(currentExtendedSetPrice, 0.25)
        : currentExtendedSetPrice
      : undefined;

  const formattedPrice = currentPrice.toFixed(2);

  const formattedSetPrice =
    discountedSetPrice !== undefined ? discountedSetPrice.toFixed(2) : null;

  const formattedExtendedSetPrice =
    discountedExtendedSetPrice !== undefined
      ? discountedExtendedSetPrice.toFixed(2)
      : null;

  const originalPrice = Number(price);

  const originalSetPrice = regularSetPrice[name];

  const originalExtendedSetPrice = regularExtendedSetPrice[name];

  const showOriginalPrice = currentPrice < originalPrice;

  const showOriginalSetPrice =
    discountedSetPrice !== undefined &&
    originalSetPrice !== undefined &&
    discountedSetPrice < originalSetPrice;

  const showOriginalExtendedSetPrice =
    discountedExtendedSetPrice !== undefined &&
    originalExtendedSetPrice !== undefined &&
    discountedExtendedSetPrice < originalExtendedSetPrice;

  /*
   * This remains the old/normal club discount.
   * For 24" we'll visually cross it out and show 60%.
   */
  const clubDiscount =
    store === "columbia"
      ? size === "24"
        ? "50%"
        : "30%"
      : size === "20" || size === "24"
        ? "50%"
        : "30%";

  const [clubDiscountPrefix, clubDiscountSuffix] =
    t.suitcaseDiscount.split("{discount}");

  const dimensions = getProductDimensions(height, width, depth);

  return (
    <section
      className={styles.panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-details-title"
      dir={isRtl ? "rtl" : "ltr"}
      lang={language}
    >
      {/* Header */}
      <header className={styles.header}>
        <button
          className={styles.iconButton}
          type="button"
          aria-label={t.back}
          onClick={onClose}
        >
          <svg
            className={styles.headerIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="m11 18-6-6 6-6" />
          </svg>
        </button>

        <StoreSwitcher store={store} onToggle={onStoreToggle} />
      </header>

      {/* Product image */}
      <div className={styles.imageContainer}>
        {image ? (
          <img className={styles.image} src={image} alt={productName} />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
      </div>

      {/* Product information */}
      <div className={styles.content}>
        <h2 id="product-details-title" className={styles.title}>
          {productName}
        </h2>

        <section className={styles.details} aria-label={t.info}>
          {/* Article */}
          <div className={styles.detailRow}>
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 5h9l7 7-8 8-8-8V5Z" />
              <circle cx="9" cy="10" r="1.5" />
            </svg>

            <span className={styles.label}>{t.article}</span>

            <span className={styles.value}>{productArticle}</span>
          </div>

          {/* Dimensions */}
          <div className={styles.detailRow}>
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="6" y="5" width="12" height="14" rx="2" />
              <path d="M9 5V3h6v2" />
              <path d="M3 8v8" />
              <path d="m2 9 1-1 1 1" />
              <path d="m2 15 1 1 1-1" />
            </svg>

            <span className={styles.label}>{t.dimensions}</span>

            <span className={styles.value}>
              <span className={styles.measurement}>
                <span>{dimensions}</span>
                <span>{t.dimensionUnit}</span>
              </span>
            </span>
          </div>

          {/* Weight */}
          <div className={styles.detailRow}>
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 20h12l-1.5-11h-9L6 20Z" />
              <path d="M9 9a3 3 0 0 1 6 0" />
              <path d="m12 9 1.5-2" />
            </svg>

            <span className={styles.label}>{t.weight}</span>

            <span className={styles.value}>
              <span className={styles.measurement}>
                <span>{weight}</span>
                <span>{t.weightUnit}</span>
              </span>
            </span>
          </div>

          {/* Volume */}
          <div className={styles.detailRow}>
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
              <path d="m4 7.5 8 4.5 8-4.5" />
              <path d="M12 12v9" />
            </svg>

            <span className={styles.label}>{t.volume}</span>

            <span className={styles.value}>
              <span className={styles.measurement}>
                <span>{volume}</span>
                <span>{t.volumeUnit}</span>
              </span>
            </span>
          </div>

          {/* Price */}
          <div className={styles.detailRow}>
            <svg
              className={styles.detailIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M9 8v8" />
              <path d="M13 8v6" />
              <path d="M9 8h4" />
              <path d="M11 10v6" />
              <path d="M11 16h4" />
              <path d="M15 8v8" />
            </svg>

            <span className={styles.label}>{t.suitcasePrice}</span>

            <div className={styles.priceGroup}>
              <span className={`${styles.value} ${styles.price}`}>
                ₪{formattedPrice}
              </span>

              {showOriginalPrice && (
                <span className={styles.originalPrice}>
                  ₪{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Set price */}
          {formattedSetPrice && (
            <div className={styles.detailRow}>
              <svg
                className={styles.detailIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="M9 8v8" />
                <path d="M13 8v6" />
                <path d="M9 8h4" />
                <path d="M11 10v6" />
                <path d="M11 16h4" />
                <path d="M15 8v8" />
              </svg>

              <span className={styles.label}>
                {formattedExtendedSetPrice ? t.setOfThree : t.setPrice}

                {setDiscountScheme && (
                  <span className={styles.setDiscountScheme}>
                    {setDiscountScheme}
                  </span>
                )}
              </span>

              <div className={styles.priceGroup}>
                <span className={`${styles.value} ${styles.price}`}>
                  ₪{formattedSetPrice}
                </span>

                {showOriginalSetPrice && (
                  <span className={styles.originalPrice}>
                    ₪{originalSetPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Extended set price */}
          {formattedExtendedSetPrice && (
            <div className={styles.detailRow}>
              <svg
                className={styles.detailIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="M9 8v8" />
                <path d="M13 8v6" />
                <path d="M9 8h4" />
                <path d="M11 10v6" />
                <path d="M11 16h4" />
                <path d="M15 8v8" />
              </svg>

              <span className={styles.label}>
                {t.setOfFour}

                {extendedSetDiscountScheme && (
                  <span className={styles.setDiscountScheme}>
                    {extendedSetDiscountScheme}
                  </span>
                )}
              </span>

              <div className={styles.priceGroup}>
                <span className={`${styles.value} ${styles.price}`}>
                  ₪{formattedExtendedSetPrice}
                </span>

                {showOriginalExtendedSetPrice && (
                  <span className={styles.originalPrice}>
                    ₪{originalExtendedSetPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Barcode */}
          <button
            className={styles.barcodeRow}
            type="button"
            onClick={() => setIsBarcodeModalOpen(true)}
          >
            <svg
              className={styles.detailIcon}
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

            <span className={styles.label}>{t.barcode}</span>

            <svg
              className={styles.chevron}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>

          {/* Discount section */}
          <div className={styles.discountSection}>
            {/* Club discount */}
            <div
              className={`${styles.discountRow} ${
                hasPoliceDiscount ? styles.discountRowDisabled : ""
              }`}
              onClick={handleClubToggle}
            >
              <svg
                className={styles.discountIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4 8l4 4 4-7 4 7 4-4-2 11H6L4 8Z" />
              </svg>

              <div className={styles.discountInfo}>
                <span className={styles.discountTitle}>{t.club}</span>

                <span className={styles.discountDescription}>
                  {hasTemporaryProductDiscount ? (
                    <>
                      {clubDiscountPrefix}

                      <span className={styles.temporaryDiscounts}>
                        <span className={styles.oldTemporaryDiscount}>
                          {clubDiscount}
                        </span>

                        <span className={styles.newTemporaryDiscount}>60%</span>
                      </span>

                      {clubDiscountSuffix}
                    </>
                  ) : (
                    t.suitcaseDiscount.replace("{discount}", clubDiscount)
                  )}
                </span>
              </div>

              <button
                type="button"
                className={`${styles.switch} ${
                  hasClub ? styles.switchActive : ""
                } ${
                  hasClub && hasTemporaryProductDiscount
                    ? styles.switchTemporary
                    : ""
                }`}
                role="switch"
                aria-checked={hasClub}
                aria-label={t.clubDiscountAria}
                disabled={hasPoliceDiscount}
                onClick={(event) => {
                  event.stopPropagation();
                  handleClubToggle();
                }}
              >
                <span className={styles.switchThumb} />
              </button>
            </div>

            {/* Police discount */}
            <div
              className={styles.discountRow}
              onClick={handlePoliceDiscountToggle}
            >
              <svg
                className={styles.discountIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 3 19 6v5c0 4.6-2.8 7.7-7 10-4.2-2.3-7-5.4-7-10V6l7-3Z" />
              </svg>

              <div className={styles.discountInfo}>
                <span className={styles.discountTitle}>{t.police}</span>

                <span className={styles.discountDescription}>
                  {t.policeDiscount}
                </span>
              </div>

              <button
                type="button"
                className={`${styles.switch} ${
                  hasPoliceDiscount ? styles.switchActive : ""
                }`}
                role="switch"
                aria-checked={hasPoliceDiscount}
                aria-label={t.policeDiscountAria}
                onClick={(event) => {
                  event.stopPropagation();
                  handlePoliceDiscountToggle();
                }}
              >
                <span className={styles.switchThumb} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {isBarcodeModalOpen && (
        <BarcodeModal
          productName={productName}
          productArticle={productArticle}
          setBarcode={setBarcode}
          onClose={() => setIsBarcodeModalOpen(false)}
        />
      )}
    </section>
  );
};
