import Link from "next/link";
import { formatLongDate, getTheme } from "@/lib/data";
import { placementCells } from "@/lib/engine";
import { ART, DIFFICULTY_ART } from "@/lib/images";
import type { Puzzle } from "@/lib/types";

const CHIP_THEMES = [
  { slug: "halloween", name: "Halloween" },
  { slug: "fall", name: "Fall" },
  { slug: "christmas", name: "Christmas" },
  { slug: "garden", name: "Garden" },
  { slug: "cats", name: "Cats" },
];

function meta(puzzle: Puzzle) {
  const theme = getTheme(puzzle.themeId);
  return `${puzzle.difficulty[0].toUpperCase()}${puzzle.difficulty.slice(1)} · ${puzzle.gridSize}×${puzzle.gridSize} grid · ${puzzle.words.length} words${theme ? ` · ${theme.name}` : ""}`;
}

/** Primary one-click start: big button straight into today's /daily puzzle. */
export function LauncherCta({ puzzle }: { puzzle: Puzzle }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <Link href="/daily" className="btn-primary">
        Play today&apos;s puzzle <span aria-hidden="true">→</span>
      </Link>
      <p className="font-sans text-[1rem] leading-snug text-[var(--ink-soft)]">
        Today: <Link href="/daily" className="font-semibold">{puzzle.title}</Link>
        <br />
        <span className="text-sm">{meta(puzzle)}</span>
      </p>
    </div>
  );
}

/** Secondary: change difficulty or pick a theme. */
export function LauncherChips() {
  return (
    <div>
      <p className="font-sans text-sm uppercase tracking-[0.16em] text-[var(--ink-soft)]">Or choose your own</p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Choose a difficulty">
        {(["easy", "medium", "hard"] as const).map((d) => (
          <li key={d}>
            <Link href={`/difficulty/${d}`} className="chip capitalize">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DIFFICULTY_ART[d].badge.src} width={24} height={24} alt="" className="h-6 w-6" />
              {d}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/large-print" className="chip">
            <span aria-hidden="true" className="font-serif text-lg font-bold leading-none">A</span> Large print
          </Link>
        </li>
      </ul>
      <ul className="mt-2 flex flex-wrap gap-2" aria-label="Choose a theme">
        {CHIP_THEMES.map((t) => (
          <li key={t.slug}>
            <Link href={`/themes/${t.slug}`} className="chip">
              {t.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/themes" className="chip border-dashed">
            All themes →
          </Link>
        </li>
      </ul>
    </div>
  );
}

/**
 * Preview card of TODAY's real grid (letters straight from the daily puzzle, one word
 * pre-highlighted as a hint of how to play). The whole card links to /daily.
 */
export default function DailyPreview({ puzzle, date }: { puzzle: Puzzle; date: string }) {
  const hint = puzzle.placements[0];
  const hintCells = new Set(hint ? placementCells(hint).map(([r, c]) => `${r},${c}`) : []);
  const size = puzzle.gridSize;
  return (
    <Link
      href="/daily"
      className="paper-deep group relative block rounded-[4px] border border-[#cbbfa6] p-5 no-underline shadow-[0_22px_44px_-30px_rgba(44,36,27,0.6)] sm:p-6"
      aria-label={`Today’s puzzle: ${puzzle.title} — play now`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ART.corner.src} width={48} height={48} alt="" aria-hidden="true" className="pointer-events-none absolute right-2 top-2 h-12 w-12 -scale-x-100 opacity-70" />
      <div className="grid items-center gap-5 sm:grid-cols-[minmax(0,13rem)_1fr]">
        <div
          aria-hidden="true"
          className="mini-grid mx-auto grid w-full max-w-[15rem] rounded-[2px] border border-[#cbbfa6] bg-[#faf6ee] p-1.5 text-[var(--ink)]"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`, fontSize: size > 12 ? "0.6rem" : "0.76rem" }}
        >
          {puzzle.grid.map((row, r) =>
            row.map((ch, c) => (
              <span
                key={`${r},${c}`}
                className={`flex aspect-square items-center justify-center leading-none ${hintCells.has(`${r},${c}`) ? "bg-[var(--highlight)]" : ""}`}
              >
                {ch}
              </span>
            )),
          )}
        </div>
        <div>
          <p className="kicker">
            <time dateTime={date}>{formatLongDate(date)}</time>
          </p>
          <p className="mt-2 font-serif text-[1.7rem] font-semibold leading-tight text-[var(--ink)] group-hover:text-[var(--moss)]">
            {puzzle.title}
          </p>
          <p className="mt-1 font-sans text-[0.95rem] text-[var(--ink-soft)]">{meta(puzzle)}</p>
          <p className="mt-3 font-sans text-[1rem] font-semibold text-[var(--moss)]">
            Start playing <span aria-hidden="true">→</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
