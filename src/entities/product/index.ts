import { getSetPrices } from "../../shared/lib/getSetPrices";
import { products } from "./products";

export type {Product} from "./product";
export { ProductList } from "./product-list";
export { products } from "./products";
export const {
  setPrice,
  columbiaSetPrice,
  shvilimSetPrice,
  extendedSetPrice,
  columbiaExtendedSetPrice,
  shvilimExtendedSetPrice,
} = getSetPrices(products);