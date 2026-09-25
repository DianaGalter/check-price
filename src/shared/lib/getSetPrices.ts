import type { Product } from "../../entities/product/product";

type PricesByName = Record<string, number>;
type PricesBySize = Record<string, Record<string, number>>;

interface SetPrices {
  setPrice: PricesByName;
  columbiaSetPrice: PricesByName;
  shvilimSetPrice: PricesByName;
}

const roundPrice = (price: number): number => Math.round((price + Number.EPSILON) * 100) / 100;
  

export const getSetPrices = (products: Product[]): SetPrices => {
  const pricesBySize: PricesBySize = {};
  const specialSetPrices: PricesByName = {};

  products.forEach((product) => {
    // У trolley сета нет
    if (product.specialPrice) {
      return;
    }

    pricesBySize[product.name] ??= {};

    // Один и тот же размер может встречаться в нескольких цветах.
    // Для расчёта сета достаточно сохранить его цену один раз.
    pricesBySize[product.name][product.size] ??= Number(product.price);

    if (product.specialSetPrice) {
      specialSetPrices[product.name] = Number(product.specialSetPrice);
    }
  });

  const setPrice: PricesByName = {};
  const columbiaSetPrice: PricesByName = {};
  const shvilimSetPrice: PricesByName = {};

  Object.entries(pricesBySize).forEach(([name, prices]) => {
    const price20 = prices["20"];
    const price24 = prices["24"];
    const price28 = prices["28"];

    if (
      price20 === undefined ||
      price24 === undefined ||
      price28 === undefined
    ) {
      return;
    }

    setPrice[name] = roundPrice(price20 + price24 + price28);

    const specialSetPrice = specialSetPrices[name];

    if (specialSetPrice !== undefined) {
      columbiaSetPrice[name] = specialSetPrice;
      shvilimSetPrice[name] = specialSetPrice;
      return;
    }

    columbiaSetPrice[name] = roundPrice(setPrice[name] * 0.6);

    shvilimSetPrice[name] = roundPrice(price20 * 0.5 + price24 * 0.5 + price28 * 0.6);
  });

  return {
    setPrice,
    columbiaSetPrice,
    shvilimSetPrice,
  };
};
