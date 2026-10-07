import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import LargePrintView, { LARGE_PRINT_DESCRIPTION } from "../../LargePrintView";
import { getLargePrintPuzzles } from "@/lib/data";
import { LIST_PAGE_SIZE, listPagePath, pageCount, parsePageParam } from "@/lib/pagination";
import { clamp, seo } from "@/lib/seo";

type Props = { params: Promise<{ page: string }> };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  const total = pageCount(getLargePrintPuzzles().length, LIST_PAGE_SIZE);
  const out: { page: string }[] = [];
  for (let p = 2; p <= total; p++) out.push({ page: String(p) });
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: raw } = await params;
  const page = parsePageParam(raw);
  if (page == null) return { title: "Not found", robots: { index: false } };
  const pages = pageCount(getLargePrintPuzzles().length, LIST_PAGE_SIZE);
  if (page > pages) return { title: "Not found", robots: { index: false } };
  const path = listPagePath("/large-print", page);
  return seo({
    title: `Large Print Word Search for Seniors — Page ${page}`,
    description: clamp(`${LARGE_PRINT_DESCRIPTION} Page ${page} of ${pages}.`, 158),
    path,
    image: "/og/large-print.jpg",
    imageAlt: "Large print word search — Words at Rest",
  });
}

export default async function LargePrintPagedPage({ params }: Props) {
  const { page: raw } = await params;
  const page = parsePageParam(raw);
  if (page == null) notFound();
  if (page === 1) permanentRedirect("/large-print");
  const pages = pageCount(getLargePrintPuzzles().length, LIST_PAGE_SIZE);
  if (page > pages) notFound();
  return <LargePrintView page={page} />;
}
