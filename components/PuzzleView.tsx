import Link from "next/link";
import PuzzleGrid from "./PuzzleGrid";
import AdSlot from "./AdSlot";
import JsonLd from "./JsonLd";
import PuzzleCard from "./PuzzleCard";
import { getPuzzlesByTheme, getTheme } from "@/lib/data";
import { absoluteUrl, SITE } from "@/lib/site";
import type { Puzzle } from "@/lib/types";

export default function PuzzleView({
  puzzle,
  heading,
  intro,
  canonicalPath,
}: {
  puzzle: Puzzle;
  heading?: string;
  intro?: string;
  canonicalPath: string;
}) {
  const theme = getTheme(puzzle.themeId);
  const related = getPuzzlesByTheme(puzzle.themeId).filter((p) => p.id !== puzzle.id);
  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        {heading ?? puzzle.title}
      </h1>
      <p className="mt-3 max-w-3xl text-lg text-stone-700">
        {intro ??
          `A free ${puzzle.difficulty} ${theme?.name.toLowerCase() ?? ""} word search with ${puzzle.words.length} words hidden in a ${puzzle.gridSize}×${puzzle.gridSize} grid. No download, no sign-up, no timer.`}
      </p>

      <div className="mt-6">
        <PuzzleGrid
          puzzleId={puzzle.id}
          grid={puzzle.grid}
          words={puzzle.words}
          placements={puzzle.placements}
          defaultLargePrint={puzzle.largePrint}
        />
      </div>

      <AdSlot slot="below-grid" />

      <section className="mt-8">
        <h2 className="text-xl font-semibold">More ways to play</h2>
        <ul className="mt-2 flex flex-wrap gap-3 text-base">
          {theme && (
            <li>
              <Link href={`/themes/${theme.slug}`}>All {theme.name} puzzles</Link>
            </li>
          )}
          <li>
            <Link href={`/difficulty/${puzzle.difficulty}`}>More {puzzle.difficulty} puzzles</Link>
          </li>
          <li>
            <Link href="/large-print">Large print puzzles</Link>
          </li>
          <li>
            <Link href="/daily">Today&apos;s daily puzzle</Link>
          </li>
        </ul>
      </section>

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Related puzzles</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PuzzleCard key={p.id} puzzle={p} />
            ))}
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: heading ?? puzzle.title,
          url: absoluteUrl(canonicalPath),
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          about: theme?.primaryKeyword ?? puzzle.primaryKeyword,
          mainEntity: {
            "@type": "Game",
            name: puzzle.title,
            genre: "Word search puzzle",
            audience: { "@type": "PeopleAudience", suggestedMinAge: 13 },
            isAccessibleForFree: true,
          },
        }}
      />
    </article>
  );
}
