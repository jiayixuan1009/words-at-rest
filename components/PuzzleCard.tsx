import Link from "next/link";
import { getTheme, puzzlePath } from "@/lib/data";
import { puzzleArt } from "@/lib/images";
import type { Puzzle } from "@/lib/types";
import Picture from "./Picture";

/**
 * Puzzle list entry. From the sm breakpoint up it shows a small thumbnail of the theme's
 * painting for this level (<theme>-<easy|medium|hard>, falling back to the theme cover).
 * On phones the thumbnail is display:none + lazy, so it is never downloaded there.
 */
export default function PuzzleCard({ puzzle }: { puzzle: Puzzle }) {
  const theme = getTheme(puzzle.themeId);
  const a = puzzleArt(puzzle, theme?.name ?? puzzle.themeId);
  return (
    <Link
      href={puzzlePath(puzzle)}
      prefetch={false}
      className="flex items-center gap-4 border-b border-[#d4cbb8] py-4 no-underline transition hover:border-[var(--accent)]"
    >
      <Picture
        art={a}
        sizes="112px"
        className="hidden aspect-[4/3] w-28 shrink-0 rounded-[3px] border border-[#d4cbb8] bg-[#efe7d9] object-cover sm:block"
      />
      <div className="min-w-0">
        <p className="font-sans text-[0.9375rem] text-[var(--ink-soft)]">
          {puzzle.largePrint ? "Large print" : puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1)} · {puzzle.gridSize}×{puzzle.gridSize} ·{" "}
          {puzzle.words.length} words
        </p>
        <h3 className="mt-1 font-serif text-xl text-[var(--ink)]">{puzzle.title}</h3>
      </div>
    </Link>
  );
}
