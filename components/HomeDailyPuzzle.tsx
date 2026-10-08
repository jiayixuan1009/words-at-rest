import Link from "next/link";
import PuzzleGrid from "./PuzzleGrid";
import PlayOptions from "./PlayOptions";
import TrustFacts from "./TrustFacts";
import { formatLongDate, getPuzzles, getPuzzlesByTheme, getTheme, puzzlePath } from "@/lib/data";
import type { Puzzle } from "@/lib/types";

function meta(puzzle: Puzzle) {
  const theme = getTheme(puzzle.themeId);
  return `${puzzle.difficulty[0].toUpperCase()}${puzzle.difficulty.slice(1)} · ${puzzle.gridSize}×${puzzle.gridSize} grid · ${puzzle.words.length} words${theme ? ` · ${theme.name}` : ""}`;
}

/**
 * Playable today’s daily on the homepage. Uses the same PuzzleGrid + progress key
 * (`war:progress:${puzzle.id}`) as /daily so switching pages keeps your finds.
 * Full daily essay / archive live on /daily — not duplicated here (SEO).
 */
export default function HomeDailyPuzzle({ puzzle, date }: { puzzle: Puzzle; date: string }) {
  const related = getPuzzlesByTheme(puzzle.themeId).filter((p) => p.id !== puzzle.id);
  const next =
    related.find((p) => p.difficulty === puzzle.difficulty && p.largePrint === puzzle.largePrint) ??
    getPuzzles().find((p) => p.id !== puzzle.id && p.difficulty === puzzle.difficulty && p.largePrint === puzzle.largePrint) ??
    related.find((p) => p.difficulty === "easy") ??
    related[0];

  return (
    <section
      aria-labelledby="home-daily-title"
      className="rounded-[4px] border border-[#cbbfa6] bg-[#faf6ee]/80 p-4 shadow-[0_22px_44px_-30px_rgba(44,36,27,0.45)] sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="kicker !gap-2 tracking-[0.06em] sm:tracking-[0.1em]">
            Today&apos;s puzzle · <time dateTime={date}>{formatLongDate(date)}</time>
          </p>
          <h2 id="home-daily-title" className="mt-1.5 font-serif text-[1.45rem] font-semibold leading-tight text-[var(--ink)] sm:text-[1.75rem]">
            {puzzle.title}
          </h2>
          <p className="mt-0.5 font-sans text-[0.9375rem] text-[var(--ink-soft)] sm:text-base">{meta(puzzle)}</p>
        </div>
        <p className="flex shrink-0 flex-wrap gap-2">
          <Link prefetch={false} href="/daily" className="chip min-h-11">
            Full daily page →
          </Link>
          <Link prefetch={false} href="/calendar" className="chip min-h-11">
            Calendar →
          </Link>
        </p>
      </div>

      <div className="mt-5">
        <PuzzleGrid
          key={puzzle.id}
          puzzleId={puzzle.id}
          grid={puzzle.grid}
          words={puzzle.words}
          placements={puzzle.placements}
          difficulty={puzzle.difficulty}
          nextPuzzle={next ? { href: puzzlePath(next), title: next.title } : undefined}
          defaultLargePrint={puzzle.largePrint}
        />
        <TrustFacts variant="compact" className="mt-4" />
      </div>

      <PlayOptions />
    </section>
  );
}
