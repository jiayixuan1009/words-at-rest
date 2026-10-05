import Link from "next/link";
import { puzzlePath } from "@/lib/data";
import type { Puzzle } from "@/lib/types";

export default function PuzzleCard({ puzzle }: { puzzle: Puzzle }) {
  return (
    <Link
      href={puzzlePath(puzzle)}
      className="block border-b border-[#d4cbb8] py-4 no-underline transition hover:border-[var(--accent)]"
    >
      <p className="font-sans text-xs uppercase tracking-[0.14em] text-[var(--ink-soft)]">
        {puzzle.largePrint ? "Large print" : puzzle.difficulty} · {puzzle.gridSize}×{puzzle.gridSize} ·{" "}
        {puzzle.words.length} words
      </p>
      <h3 className="mt-1 font-serif text-xl text-[var(--ink)]">{puzzle.title}</h3>
    </Link>
  );
}
