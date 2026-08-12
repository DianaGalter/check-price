const productImages = import.meta.glob(
  "../../assets/images/products/*.webp",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

export const getProductImage = (article: string): string | undefined => {
  const imagePath = Object.keys(productImages).find((path) =>
    path.endsWith(`/${article}.webp`),
  );

  return imagePath ? productImages[imagePath] : undefined;
};