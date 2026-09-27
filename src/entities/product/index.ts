import { getSetPrices } from "../../shared/lib/getSetPrices";
import { products } from "./products";

export { ProductList } from "./product-list";
export { products } from "./products";
export const {
  setPrice,
  columbiaSetPrice,
  shvilimSetPrice,
} = getSetPrices(products);