import Link from "next/link";
import { puzzlePath } from "@/lib/data";
import type { Puzzle } from "@/lib/types";

export default function PuzzleCard({ puzzle }: { puzzle: Puzzle }) {
  return (
    <Link
      href={puzzlePath(puzzle)}
      className="block rounded-2xl border border-stone-200 bg-white p-5 no-underline shadow-sm transition hover:border-stone-400"
    >
      <p className="text-xs uppercase tracking-wide text-stone-500">
        {puzzle.largePrint ? "Large print" : puzzle.difficulty} · {puzzle.gridSize}×{puzzle.gridSize} ·{" "}
        {puzzle.words.length} words
      </p>
      <h3 className="mt-1 text-lg font-semibold text-stone-900">{puzzle.title}</h3>
    </Link>
  );
}
