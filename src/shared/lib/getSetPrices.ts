import type { Product } from "../../entities/product";

type PricesByName = Record<string, number>;
type PricesBySize = Record<string, Record<string, number>>;

interface SetPrices {
  setPrice: PricesByName;
  columbiaSetPrice: PricesByName;
  shvilimSetPrice: PricesByName;
  extendedSetPrice: PricesByName;
  columbiaExtendedSetPrice: PricesByName;
  shvilimExtendedSetPrice: PricesByName;
}

const roundPrice = (price: number): number =>
  Math.round((price + Number.EPSILON) * 100) / 100;

export const getSetPrices = (products: Product[]): SetPrices => {
  const pricesBySize: PricesBySize = {};
  const specialSetPrices: PricesByName = {};

  products.forEach((product) => {
    // Set does not exist
    if (product.specialPrice) {
      return;
    }

    pricesBySize[product.name] ??= {};

    // The same size could have different colours.
    // We can count the set price just once.
    pricesBySize[product.name][product.size] ??= Number(product.price);

    if (product.specialSetPrice) {
      specialSetPrices[product.name] = Number(product.specialSetPrice);
    }
  });

  const setPrice: PricesByName = {};
  const columbiaSetPrice: PricesByName = {};
  const shvilimSetPrice: PricesByName = {};

  const extendedSetPrice: PricesByName = {};
  const columbiaExtendedSetPrice: PricesByName = {};
  const shvilimExtendedSetPrice: PricesByName = {};

  Object.entries(pricesBySize).forEach(([name, prices]) => {
    const price20 = prices["20"];
    const price24 = prices["24"];
    const price28 = prices["28"];

    // Basic set has 3 sizes
    if (
      price20 === undefined ||
      price24 === undefined ||
      price28 === undefined
    ) {
      return;
    }

    // Full price of the basic set
    setPrice[name] = roundPrice(price20 + price24 + price28);

    const specialSetPrice = specialSetPrices[name];

    // Club prices of the basic set
    if (specialSetPrice !== undefined) {
      columbiaSetPrice[name] = specialSetPrice;
      shvilimSetPrice[name] = specialSetPrice;
    } else {
      columbiaSetPrice[name] = roundPrice(setPrice[name] * 0.6);

      shvilimSetPrice[name] = roundPrice(
        price20 * 0.5 + price24 * 0.5 + price28 * 0.6
      );
    }

    // Extra sizes for the extended sets
    const extraSize =
      name === "Oregon" ? "32" :
      name === "Ibiza" ? "17" :
      null;

    if (extraSize === null) {
      return;
    }

    const extraPrice = prices[extraSize];

    // Extended set exists only if there is an extra size
    if (extraPrice === undefined) {
      return;
    }

    // Full price of the extended set
    extendedSetPrice[name] = roundPrice(
      setPrice[name] + extraPrice
    );

    // Full price of the extended set in Columbia
    // 40% discount for the extra size
    columbiaExtendedSetPrice[name] = roundPrice(
      columbiaSetPrice[name] + extraPrice * 0.6
    );

    // Full price of the extended set in Ashkelon
    // 40% discount for the extra size
    shvilimExtendedSetPrice[name] = roundPrice(
      shvilimSetPrice[name] + extraPrice * 0.6
    );
  });

  return {
    setPrice,
    columbiaSetPrice,
    shvilimSetPrice,
    extendedSetPrice,
    columbiaExtendedSetPrice,
    shvilimExtendedSetPrice,
  };
};