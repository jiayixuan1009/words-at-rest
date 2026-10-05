import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleCard from "@/components/PuzzleCard";
import { getPuzzlesByDifficulty, isDifficulty } from "@/lib/data";
import { DIFFICULTIES, type Difficulty } from "@/lib/types";

type Props = { params: Promise<{ level: string }> };

const COPY: Record<Difficulty, { title: string; h1: string; intro: string }> = {
  easy: {
    title: "Easy Word Search Puzzles Online",
    h1: "Easy word search puzzles",
    intro:
      "Gentle puzzles for a relaxing break. Easy grids are smaller (10×10) and every word reads forwards, either across or down. A good place to start, or to unwind at the end of the day.",
  },
  medium: {
    title: "Medium Word Search Puzzles",
    h1: "Medium word search puzzles",
    intro:
      "A step up: 12×12 grids with more words, and words that can run diagonally as well as across and down. Still no backwards words and still no timer.",
  },
  hard: {
    title: "Hard Word Search Puzzles Online",
    h1: "Hard word search puzzles",
    intro:
      "For experienced puzzlers who want a real challenge. Hard grids are 15×15 with 18 words that can run in all eight directions — including backwards and diagonally upwards.",
  },
};

export function generateStaticParams() {
  return DIFFICULTIES.map((level) => ({ level }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level } = await params;
  if (!isDifficulty(level)) return { title: "Not found" };
  return {
    title: COPY[level].title,
    description: COPY[level].intro.slice(0, 155),
    alternates: { canonical: `/difficulty/${level}` },
  };
}

export default async function DifficultyPage({ params }: Props) {
  const { level } = await params;
  if (!isDifficulty(level)) notFound();
  const puzzles = getPuzzlesByDifficulty(level);
  return (
    <>
      <Breadcrumbs items={[{ name: COPY[level].h1, href: `/difficulty/${level}` }]} />
      <h1 className="text-4xl font-semibold tracking-tight">{COPY[level].h1}</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">{COPY[level].intro}</p>
      <nav aria-label="Difficulty" className="mt-6 flex gap-4">
        {DIFFICULTIES.map((d) => (
          <Link
            key={d}
            href={`/difficulty/${d}`}
            aria-current={d === level ? "page" : undefined}
            className={d === level ? "font-semibold text-stone-900 no-underline" : ""}
          >
            {d[0].toUpperCase() + d.slice(1)}
          </Link>
        ))}
      </nav>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {puzzles.map((p) => (
          <PuzzleCard key={p.id} puzzle={p} />
        ))}
      </div>
    </>
  );
}
