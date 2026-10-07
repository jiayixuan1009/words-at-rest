import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DifficultyLevelView, { DIFFICULTY_COPY } from "../DifficultyLevelView";
import { isDifficulty } from "@/lib/data";
import { clamp, seo } from "@/lib/seo";
import { DIFFICULTIES } from "@/lib/types";

type Props = { params: Promise<{ level: string }> };

// Render per request (no ISR cache). vinext places generateMetadata() output in a
// hidden <body> div for requests without a User-Agent, and the ISR cache would then
// serve that variant to every crawler. Rendering is cheap (static data).
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return DIFFICULTIES.map((level) => ({ level }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level } = await params;
  if (!isDifficulty(level)) return { title: "Not found", robots: { index: false } };
  return seo({
    title: DIFFICULTY_COPY[level].title,
    description: clamp(DIFFICULTY_COPY[level].intro, 158),
    path: `/difficulty/${level}`,
    image: `/og/difficulty-${level}.jpg`,
  });
}

export default async function DifficultyPage({ params }: Props) {
  const { level } = await params;
  if (!isDifficulty(level)) notFound();
  return <DifficultyLevelView level={level} page={1} />;
}
