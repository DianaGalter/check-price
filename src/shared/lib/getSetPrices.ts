import type { Product } from "../../entities/product/product";

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

  const extendedSetPrice: PricesByName = {};
  const columbiaExtendedSetPrice: PricesByName = {};
  const shvilimExtendedSetPrice: PricesByName = {};

  Object.entries(pricesBySize).forEach(([name, prices]) => {
    const price20 = prices["20"];
    const price24 = prices["24"];
    const price28 = prices["28"];

    // Обычный сет существует только при наличии всех трёх размеров.
    if (
      price20 === undefined ||
      price24 === undefined ||
      price28 === undefined
    ) {
      return;
    }

    // Полная стоимость обычного сета.
    setPrice[name] = roundPrice(price20 + price24 + price28);

    const specialSetPrice = specialSetPrices[name];

    // Клубные цены обычного сета.
    if (specialSetPrice !== undefined) {
      columbiaSetPrice[name] = specialSetPrice;
      shvilimSetPrice[name] = specialSetPrice;
    } else {
      columbiaSetPrice[name] = roundPrice(setPrice[name] * 0.6);

      shvilimSetPrice[name] = roundPrice(
        price20 * 0.5 + price24 * 0.5 + price28 * 0.6
      );
    }

    // Дополнительный размер для расширенного сета.
    const extraSize =
      name === "Oregon" ? "32" :
      name === "Ibiza" ? "17" :
      null;

    if (extraSize === null) {
      return;
    }

    const extraPrice = prices[extraSize];

    // Расширенный сет существует только при наличии четвёртого размера.
    if (extraPrice === undefined) {
      return;
    }

    // Полная стоимость расширенного сета.
    extendedSetPrice[name] = roundPrice(
      setPrice[name] + extraPrice
    );

    // Клубная цена расширенного сета в Columbia.
    // Предполагаем скидку 40% на дополнительный чемодан.
    columbiaExtendedSetPrice[name] = roundPrice(
      columbiaSetPrice[name] + extraPrice * 0.6
    );

    // Клубная цена расширенного сета в Ашкелоне.
    // Скидка 40% на дополнительный чемодан.
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