import { useBarcode } from "next-barcode";

import { cn } from "@/lib/utils";

export function BarcodeField({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const { inputRef } = useBarcode({
    value,
    options: {
      background: "#ffffff",
    },
  });

  return <svg ref={inputRef} className={cn(className)} />;
}
