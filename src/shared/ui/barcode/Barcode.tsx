import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string;
}

export const Barcode = ({ value }: BarcodeProps) => {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!barcodeRef.current) return;

    JsBarcode(barcodeRef.current, value, {
      format: "CODE128",
      displayValue: false,
      margin: 0,
    });
  }, [value]);

  return <svg ref={barcodeRef} />;
};
