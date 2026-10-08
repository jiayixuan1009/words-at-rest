import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Picture from "@/components/Picture";
import { DIFFICULTY_ART } from "@/lib/images";
import PuzzleCard from "@/components/PuzzleCard";
import Byline from "@/components/Byline";
import DifficultyTable from "@/components/DifficultyTable";
import HubSchema from "@/components/HubSchema";
import Pagination from "@/components/Pagination";
import Sources from "@/components/Sources";
import { CITATIONS } from "@/lib/citations";
import { datesFor } from "@/lib/content-dates";
import { getPuzzlesByDifficulty } from "@/lib/data";
import { listPagePath, paginate } from "@/lib/pagination";
import type { Difficulty } from "@/lib/types";
import { DIFFICULTIES } from "@/lib/types";
import { notFound } from "next/navigation";

const DIFF_CITED = [CITATIONS.wcagResizeText, CITATIONS.niaCognitiveHealth];

export const DIFFICULTY_DATES = datesFor("app/difficulty/[level]/page.tsx");

export const DIFFICULTY_COPY: Record<
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
      "Choose Grid size → Larger above the grid if the letters feel small.",
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
      "Look for the first letter of a word, then check its diagonal neighbors.",
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

/** Shared body for /difficulty/{level} and /difficulty/{level}/page/{n}. */
export default function DifficultyLevelView({ level, page }: { level: Difficulty; page: number }) {
  const all = getPuzzlesByDifficulty(level);
  const slice = paginate(all, page);
  if (page < 1 || page > slice.totalPages) notFound();

  const c = DIFFICULTY_COPY[level];
  const name = level[0].toUpperCase() + level.slice(1);
  const basePath = `/difficulty/${level}`;
  const path = listPagePath(basePath, page);
  const heading =
    page > 1 ? `${c.h1} — page ${page}` : c.h1;
  const crumbName = page > 1 ? `${name} · page ${page}` : c.h1;

  return (
    <>
      <Breadcrumbs items={[{ name: crumbName, href: path }]} />
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <div className="flex items-center gap-4">
            <Picture art={DIFFICULTY_ART[level].badge} decorative priority className="h-14 w-14" />
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">{heading}</h1>
          </div>
          <Byline dates={DIFFICULTY_DATES} />
          <p className="mt-4 max-w-3xl text-lg text-stone-700">{c.intro}</p>
        </div>
        <Picture
          art={DIFFICULTY_ART[level].image}
          priority
          sizes="(min-width: 1024px) 480px, 100vw"
          className="aspect-[2/1] w-full rounded-[3px] border border-[#d4cbb8] object-cover"
        />
      </div>
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
      <h2 className="mt-10 text-2xl font-semibold">
        {name} puzzles ({slice.total})
        {page > 1 ? (
          <span className="ml-2 font-sans text-lg font-normal text-stone-500">· page {page}</span>
        ) : null}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slice.items.map((p) => (
          <PuzzleCard key={p.id} puzzle={p} />
        ))}
      </div>
      <Pagination
        basePath={basePath}
        page={slice.page}
        totalPages={slice.totalPages}
        total={slice.total}
        from={slice.from}
        to={slice.to}
        label={`${level} puzzles`}
      />

      {page === 1 ? (
        <>
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
          <section className="mt-10 max-w-3xl space-y-3 text-lg leading-relaxed text-stone-700">
            <h2 className="text-2xl font-semibold text-stone-900">Comfort and honesty</h2>
            <p>
              Every grid has a Grid size → Larger control. That follows the W3C’s{" "}
              <cite>
                <a href={CITATIONS.wcagResizeText.url} rel="noopener" target="_blank">
                  resize-text guidance
                </a>
              </cite>
              : <q cite={CITATIONS.wcagResizeText.url}>{CITATIONS.wcagResizeText.quote.replace(/\.$/, "")}</q>.
              We still present puzzles as a pastime, not treatment — the{" "}
              <cite>
                <a href={CITATIONS.niaCognitiveHealth.url} rel="noopener" target="_blank">
                  National Institute on Aging
                </a>
              </cite>{" "}
              notes that evidence for a lasting cognitive benefit from activities like these{" "}
              <q cite={CITATIONS.niaCognitiveHealth.url}>is not definitive</q>.
            </p>
          </section>
          <Sources items={DIFF_CITED} />
        </>
      ) : (
        <p className="mt-10 text-lg text-stone-700">
          <Link href={basePath}>← Back to {level} puzzles overview</Link>
          <span className="mx-3 text-stone-400">·</span>
          <Link href={c.next.href}>{c.next.label}</Link>
        </p>
      )}
      <HubSchema
        dates={DIFFICULTY_DATES}
        type="CollectionPage"
        name={heading}
        description={c.intro}
        path={path}
        image={`/og/difficulty-${level}.jpg`}
        citations={page === 1 ? DIFF_CITED : undefined}
      />
    </>
  );
}
