import { getSetPrices } from "../../shared/lib/getSetPrices";
import { products } from "./products.mock";

export { ProductList } from "./product-list";
export { products } from "./products.mock";
export const {
  setPrice,
  columbiaSetPrice,
  shvilimSetPrice,
} = getSetPrices(products);