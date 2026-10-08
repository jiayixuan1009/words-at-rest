import Link from "next/link";
import { getLargePrintPuzzles, getPuzzles, puzzlePath } from "@/lib/data";

/** Direct puzzle links for someone learning to play. */
export default function PlayOptions() {
  const easy = getPuzzles().find((p) => p.difficulty === "easy" && !p.largePrint);
  const large = getLargePrintPuzzles()[0];
  return <nav aria-label="Gentler puzzles" className="mt-4 flex flex-wrap gap-3 font-sans text-base">
    {easy && <Link prefetch={false} href={puzzlePath(easy)} className="chip min-h-11">Start easy · 10×10</Link>}
    {large && <Link prefetch={false} href={puzzlePath(large)} className="chip min-h-11">Large print · 9×9</Link>}
  </nav>;
}
