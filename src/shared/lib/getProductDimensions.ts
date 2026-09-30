export const getProductDimensions = (height: string, width: string, depth: string, unit: string) => {
 return `${height} × ${width} × ${depth} ${unit}`;
}