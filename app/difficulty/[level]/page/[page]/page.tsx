import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import DifficultyLevelView, { DIFFICULTY_COPY } from "../../../DifficultyLevelView";
import { getPuzzlesByDifficulty, isDifficulty } from "@/lib/data";
import { LIST_PAGE_SIZE, listPagePath, pageCount, parsePageParam } from "@/lib/pagination";
import { clamp, seo } from "@/lib/seo";
import { DIFFICULTIES } from "@/lib/types";

type Props = { params: Promise<{ level: string; page: string }> };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return DIFFICULTIES.flatMap((level) => {
    const total = pageCount(getPuzzlesByDifficulty(level).length, LIST_PAGE_SIZE);
    const out: { level: string; page: string }[] = [];
    for (let p = 2; p <= total; p++) out.push({ level, page: String(p) });
    return out;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level, page: raw } = await params;
  if (!isDifficulty(level)) return { title: "Not found", robots: { index: false } };
  const page = parsePageParam(raw);
  if (page == null) return { title: "Not found", robots: { index: false } };
  const total = getPuzzlesByDifficulty(level).length;
  const pages = pageCount(total, LIST_PAGE_SIZE);
  if (page > pages) return { title: "Not found", robots: { index: false } };
  const c = DIFFICULTY_COPY[level];
  const path = listPagePath(`/difficulty/${level}`, page);
  return seo({
    title: `${c.title.replace(/ — Free Online$/, "")} — Page ${page}`,
    description: clamp(`${c.intro} Page ${page} of ${pages}.`, 158),
    path,
    image: `/og/difficulty-${level}.jpg`,
  });
}

export default async function DifficultyPagedPage({ params }: Props) {
  const { level, page: raw } = await params;
  if (!isDifficulty(level)) notFound();
  const page = parsePageParam(raw);
  if (page == null) notFound();
  if (page === 1) permanentRedirect(`/difficulty/${level}`);
  const pages = pageCount(getPuzzlesByDifficulty(level).length, LIST_PAGE_SIZE);
  if (page > pages) notFound();
  return <DifficultyLevelView level={level} page={page} />;
}
