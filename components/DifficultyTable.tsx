import Link from "next/link";

export const DIFFICULTY_ROWS = [
  { level: "Easy", href: "/difficulty/easy", grid: "10×10", words: "10", directions: "Across and down (forwards only)", bestFor: "A gentle warm-up, beginners, tired eyes" },
  { level: "Medium", href: "/difficulty/medium", grid: "12×12", words: "14", directions: "Across, down and diagonal (no backwards)", bestFor: "Regular solvers who want a little more" },
  { level: "Hard", href: "/difficulty/hard", grid: "15×15", words: "18", directions: "All eight directions, including backwards", bestFor: "Experienced puzzlers who like a real search" },
  { level: "Large print", href: "/large-print", grid: "9×9", words: "8", directions: "Across and down only, extra-large letters", bestFor: "Seniors, low vision, phones and tablets" },
] as const;

/** Snippet-friendly comparison of puzzle levels (real values from the generator). */
export default function DifficultyTable({ caption = "Word search difficulty levels compared" }: { caption?: string }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left font-sans text-base">
        <caption className="mb-2 text-left font-sans text-sm text-[var(--ink-soft)]">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-[#b8a990] text-[var(--ink)]">
            <th scope="col" className="py-2 pr-4">Level</th>
            <th scope="col" className="py-2 pr-4">Grid</th>
            <th scope="col" className="py-2 pr-4">Words</th>
            <th scope="col" className="py-2 pr-4">Word directions</th>
            <th scope="col" className="py-2">Best for</th>
          </tr>
        </thead>
        <tbody>
          {DIFFICULTY_ROWS.map((r) => (
            <tr key={r.level} className="border-b border-[#d4cbb8] align-top text-[var(--ink-soft)]">
              <th scope="row" className="py-2 pr-4 font-semibold text-[var(--ink)]">
                <Link href={r.href}>{r.level}</Link>
              </th>
              <td className="py-2 pr-4">{r.grid}</td>
              <td className="py-2 pr-4">{r.words}</td>
              <td className="py-2 pr-4">{r.directions}</td>
              <td className="py-2">{r.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
