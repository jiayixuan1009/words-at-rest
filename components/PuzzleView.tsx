import Link from "next/link";
import PuzzleGrid from "./PuzzleGrid";
import AdSlot from "./AdSlot";
import JsonLd from "./JsonLd";
import PuzzleCard from "./PuzzleCard";
import { getPuzzlesByTheme, getTheme } from "@/lib/data";
import { absoluteUrl, SITE } from "@/lib/site";
import { EDITOR_ID, ORG_ID, themeNoun } from "@/lib/seo";
import { themeOgImage } from "@/lib/images";
import { THEME_EXTRA } from "@/lib/theme-content";
import type { Puzzle } from "@/lib/types";

const DIRECTIONS: Record<string, string> = {
  easy: "Every word reads forwards, either across (left to right) or down (top to bottom).",
  medium: "Words read forwards across, down or diagonally. Nothing is hidden backwards.",
  hard: "Words can run in any of the eight directions — including backwards, upwards and diagonally upwards.",
};

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
          `A free ${puzzle.difficulty} ${(theme ? themeNoun(theme.name) : undefined) ?? ""} word search with ${puzzle.words.length} words hidden in a ${puzzle.gridSize}×${puzzle.gridSize} grid. No download, no sign-up, no timer.`}
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

      <section className="mt-8 max-w-3xl">
        <h2 className="text-xl font-semibold">About this puzzle</h2>
        <p className="mt-2 text-lg leading-relaxed text-stone-700">
          {puzzle.largePrint
            ? `This large print puzzle hides ${puzzle.words.length} words in a ${puzzle.gridSize}×${puzzle.gridSize} grid with extra-large letters. Every word reads forwards, across or down.`
            : `This ${puzzle.difficulty} puzzle hides ${puzzle.words.length} ${theme ? themeNoun(theme.name) + " " : ""}words in a ${puzzle.gridSize}×${puzzle.gridSize} grid. ${DIRECTIONS[puzzle.difficulty]}`}
        </p>
        {theme && THEME_EXTRA[theme.slug] && (
          <p className="mt-3 text-lg leading-relaxed text-stone-700">
            <strong className="text-stone-900">{theme.name} tip:</strong> {THEME_EXTRA[theme.slug].tip}
          </p>
        )}
      </section>

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
          primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(themeOgImage(puzzle.themeId)) },
          publisher: { "@id": ORG_ID },
          mainEntity: {
            "@type": "Game",
            name: puzzle.title,
            genre: "Word search puzzle",
            description: `${puzzle.words.length} words in a ${puzzle.gridSize}×${puzzle.gridSize} grid (${puzzle.largePrint ? "large print" : puzzle.difficulty}).`,
            image: absoluteUrl(themeOgImage(puzzle.themeId)),
            inLanguage: "en",
            audience: { "@type": "PeopleAudience", suggestedMinAge: 13 },
            isAccessibleForFree: true,
            author: { "@type": "Person", "@id": EDITOR_ID, name: SITE.editor.name },
            publisher: { "@id": ORG_ID },
            dateCreated: puzzle.createdAt,
          },
        }}
      />
    </article>
  );
}
