export const applyDiscount = (
  price: number,
  discount: number
): number =>
  Math.round(
    (price * (1 - discount) + Number.EPSILON) * 100
  ) / 100;