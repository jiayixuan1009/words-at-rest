import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleCard from "@/components/PuzzleCard";
import Byline from "@/components/Byline";
import DifficultyTable from "@/components/DifficultyTable";
import HubSchema from "@/components/HubSchema";
import { getPuzzlesByDifficulty, isDifficulty } from "@/lib/data";
import { clamp, seo } from "@/lib/seo";
import { DIFFICULTIES, type Difficulty } from "@/lib/types";

type Props = { params: Promise<{ level: string }> };

const COPY: Record<
  Difficulty,
  { title: string; h1: string; intro: string; who: string; how: string; tips: string[]; next: { href: string; label: string } }
> = {
  easy: {
    title: "Easy Word Search Puzzles — Free Online",
    h1: "Easy word search puzzles",
    intro:
      "Gentle puzzles for a relaxing break. Easy grids are smaller (10×10) and every word reads forwards, either across or down. A good place to start, or to unwind at the end of the day.",
    who: "Easy puzzles suit beginners, anyone returning to puzzles after a long break, players who want a quick five-minute win, and solvers who prefer comfort over challenge. They are also a good choice when you are tired, or when you are solving together with someone who is new to word searches.",
    how: "Each easy grid hides 10 words in 100 letters. Words only run left to right or top to bottom, so you never need to read backwards or diagonally. With so few directions to check, most people finish an easy puzzle in a few minutes — but there is no timer, so take as long as you like.",
    tips: [
      "Read across each row from left to right, then down each column.",
      "Start with the longest word on the list — it is the easiest to spot.",
      "Switch on Large print above the grid if the letters feel small.",
    ],
    next: { href: "/difficulty/medium", label: "Ready for more? Try medium puzzles" },
  },
  medium: {
    title: "Medium Word Search Puzzles — Free Online",
    h1: "Medium word search puzzles",
    intro:
      "A step up: 12×12 grids with more words, and words that can run diagonally as well as across and down. Still no backwards words and still no timer.",
    who: "Medium is the sweet spot for regular solvers: enough searching to feel absorbing, without the backwards words that make hard puzzles slow. It is a good daily level for adults who enjoy a crossword-style break with their morning coffee.",
    how: "Each medium grid hides 14 words in 144 letters. Words can run across, down or diagonally (top-left to bottom-right, or bottom-left to top-right), but always read forwards. Diagonal words are the ones most people miss, so they are worth looking for on purpose.",
    tips: [
      "After rows and columns, scan each diagonal line once in both diagonal directions.",
      "Look for the first letter of a word, then check its diagonal neighbours.",
      "Words can cross and share letters — do not skip highlighted cells.",
    ],
    next: { href: "/difficulty/hard", label: "Want a real challenge? Try hard puzzles" },
  },
  hard: {
    title: "Hard Word Search Puzzles — Free Online",
    h1: "Hard word search puzzles",
    intro:
      "For experienced puzzlers who want a real challenge. Hard grids are 15×15 with 18 words that can run in all eight directions — including backwards and diagonally upwards.",
    who: "Hard puzzles are for experienced solvers who find ordinary word searches too quick. They reward patience and a systematic approach, and they make a good long puzzle for a quiet evening. For an even tougher set, try the Hard Pack, which uses longer, more abstract words.",
    how: "Each hard grid hides 18 words in 225 letters, and words can run in any of the eight directions: forwards, backwards, up, down and along both diagonals in either direction. A word that reads backwards often looks like nonsense at first glance — that is what makes these puzzles satisfying.",
    tips: [
      "Pick one direction at a time and sweep the whole grid before switching.",
      "Search for each word’s rarest letter (Q, Z, X, J, K, V) rather than its first letter.",
      "Read the word list backwards once — reversed endings like “GNI” jump out.",
    ],
    next: { href: "/themes/hard-pack", label: "Go further with the Hard Pack" },
  },
};

export function generateStaticParams() {
  return DIFFICULTIES.map((level) => ({ level }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level } = await params;
  if (!isDifficulty(level)) return { title: "Not found", robots: { index: false } };
  return seo({
    title: COPY[level].title,
    description: clamp(COPY[level].intro, 158),
    path: `/difficulty/${level}`,
    image: `/og/difficulty-${level}.jpg`,
  });
}

export default async function DifficultyPage({ params }: Props) {
  const { level } = await params;
  if (!isDifficulty(level)) notFound();
  const puzzles = getPuzzlesByDifficulty(level);
  const c = COPY[level];
  const name = level[0].toUpperCase() + level.slice(1);
  return (
    <>
      <Breadcrumbs items={[{ name: c.h1, href: `/difficulty/${level}` }]} />
      <h1 className="text-4xl font-semibold tracking-tight">{c.h1}</h1>
      <Byline />
      <p className="mt-4 max-w-3xl text-lg text-stone-700">{c.intro}</p>
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
      <h2 className="mt-10 text-2xl font-semibold">{name} puzzles ({puzzles.length})</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {puzzles.map((p) => (
          <PuzzleCard key={p.id} puzzle={p} />
        ))}
      </div>

      <div className="mt-12 max-w-3xl space-y-4 text-lg leading-relaxed text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">How do {level} word searches work?</h2>
        <p>{c.how}</p>
        <h2 className="text-2xl font-semibold text-stone-900">Who are {level} puzzles for?</h2>
        <p>{c.who}</p>
        <h2 className="text-2xl font-semibold text-stone-900">Tips for {level} puzzles</h2>
        <ul className="ml-6 list-disc space-y-1">
          {c.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold text-stone-900">How does {level} compare with other levels?</h2>
      </div>
      <div className="max-w-3xl">
        <DifficultyTable />
      </div>
      <p className="mt-8 text-lg">
        <Link href={c.next.href}>{c.next.label} →</Link>
        <span className="mx-3 text-stone-400">·</span>
        <Link href="/how-to-play">How to play</Link>
      </p>
      <HubSchema
        type="CollectionPage"
        name={c.h1}
        description={c.intro}
        path={`/difficulty/${level}`}
        image={`/og/difficulty-${level}.jpg`}
      />
    </>
  );
}
