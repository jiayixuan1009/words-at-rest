import type { Metadata } from "next";
import LargePrintView, { LARGE_PRINT_DESCRIPTION } from "./LargePrintView";
import { seo } from "@/lib/seo";

export const metadata: Metadata = seo({
  title: "Large Print Word Search for Seniors — Free",
  description: LARGE_PRINT_DESCRIPTION,
  path: "/large-print",
  image: "/og/large-print.jpg",
  imageAlt: "Large print word search — Words at Rest",
});

export default function LargePrintPage() {
  return <LargePrintView page={1} />;
}
