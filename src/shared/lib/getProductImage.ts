const productImages = import.meta.glob(
  "../../assets/images/products/*.webp",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

export const getProductImage = (name: string, colorCode: string | undefined, color: string): string | undefined => {
  const imageName = `${name}${colorCode || color}`;
  const imagePath = Object.keys(productImages).find((path) =>
    path.endsWith(`/${imageName}.webp`),
  );

  return imagePath ? productImages[imagePath] : undefined;
};