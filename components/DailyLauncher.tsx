import Link from "next/link";
import { formatLongDate, getTheme } from "@/lib/data";
import { placementCells } from "@/lib/engine";
import { ART, DIFFICULTY_ART } from "@/lib/images";
import type { Puzzle } from "@/lib/types";

const CHIP_THEMES = [
  { slug: "halloween", name: "Halloween" },
  { slug: "fall", name: "Fall" },
  { slug: "christmas", name: "Christmas" },
  { slug: "bible", name: "Bible" },
  { slug: "garden", name: "Garden" },
  { slug: "cats", name: "Cats" },
];

function meta(puzzle: Puzzle) {
  const theme = getTheme(puzzle.themeId);
  return `${puzzle.difficulty[0].toUpperCase()}${puzzle.difficulty.slice(1)} · ${puzzle.gridSize}×${puzzle.gridSize} grid · ${puzzle.words.length} words${theme ? ` · ${theme.name}` : ""}`;
}

/** Primary one-click start (desktop copy column). Mobile CTA lives inside DailyPreview. */
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

/** Difficulty + Large print + themes. One horizontal scroll row on mobile; wraps on desktop. */
export function LauncherChips() {
  return (
    <div>
      <p className="font-sans text-sm uppercase tracking-[0.16em] text-[var(--ink-soft)]">Or choose your own</p>
      <ul
        className="chip-scroll mt-3 flex flex-nowrap gap-2 lg:flex-wrap lg:overflow-visible"
        aria-label="Choose a difficulty or theme"
      >
        {(["easy", "medium", "hard"] as const).map((d) => (
          <li key={d} className="shrink-0">
            <Link href={`/difficulty/${d}`} className="chip capitalize">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DIFFICULTY_ART[d].badge.src} width={24} height={24} alt="" className="h-6 w-6" />
              {d}
            </Link>
          </li>
        ))}
        <li className="shrink-0">
          <Link href="/large-print" className="chip">
            <span aria-hidden="true" className="font-serif text-lg font-bold leading-none">
              A
            </span>{" "}
            Large print
          </Link>
        </li>
        {CHIP_THEMES.map((t) => (
          <li key={t.slug} className="shrink-0">
            <Link href={`/themes/${t.slug}`} className="chip">
              {t.name}
            </Link>
          </li>
        ))}
        <li className="shrink-0">
          <Link href="/themes" className="chip border-dashed">
            All themes →
          </Link>
        </li>
      </ul>
    </div>
  );
}

/**
 * Preview card of TODAY's real grid (letters from the daily puzzle; first word
 * pre-highlighted). Whole card links to /daily. On mobile: stacked grid + primary button.
 */
export default function DailyPreview({ puzzle, date }: { puzzle: Puzzle; date: string }) {
  const hint = puzzle.placements[0];
  const hintCells = new Set(hint ? placementCells(hint).map(([r, c]) => `${r},${c}`) : []);
  const size = puzzle.gridSize;
  return (
    <Link
      href="/daily"
      className="paper-deep group relative block max-w-full rounded-[4px] border border-[#cbbfa6] p-3 no-underline shadow-[0_22px_44px_-30px_rgba(44,36,27,0.6)] sm:p-6"
      aria-label={`Today’s puzzle: ${puzzle.title} — play now`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ART.corner.src}
        width={48}
        height={48}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-1.5 top-1.5 h-9 w-9 -scale-x-100 opacity-70 sm:right-2 sm:top-2 sm:h-12 sm:w-12"
      />
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,13rem)_1fr] lg:items-center lg:gap-5">
        <div className="order-1 min-w-0 pr-8 lg:order-2 lg:pr-0">
          <p className="kicker !gap-2 text-[0.7rem] tracking-[0.18em] sm:text-[0.8rem] sm:tracking-[0.22em]">
            <time dateTime={date}>{formatLongDate(date)}</time>
          </p>
          <p className="mt-1.5 font-serif text-[1.35rem] font-semibold leading-tight text-[var(--ink)] group-hover:text-[var(--moss)] sm:mt-2 sm:text-[1.7rem]">
            {puzzle.title}
          </p>
          <p className="mt-0.5 font-sans text-[0.88rem] text-[var(--ink-soft)] sm:mt-1 sm:text-[0.95rem]">
            {meta(puzzle)}
          </p>
          <p className="mt-2 hidden font-sans text-[1rem] font-semibold text-[var(--moss)] lg:mt-3 lg:block">
            Start playing <span aria-hidden="true">→</span>
          </p>
        </div>
        <div
          aria-hidden="true"
          className="mini-grid order-2 mx-auto grid w-full max-w-[16.5rem] rounded-[2px] border border-[#cbbfa6] bg-[#faf6ee] p-1 text-[var(--ink)] sm:max-w-[18rem] sm:p-1.5 lg:order-1 lg:max-w-[15rem]"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            fontSize: size > 12 ? "0.55rem" : "clamp(0.62rem, 2.4vw, 0.8rem)",
          }}
        >
          {puzzle.grid.map((row, r) =>
            row.map((ch, c) => (
              <span key={`${r},${c}`} className={hintCells.has(`${r},${c}`) ? "is-hint" : undefined}>
                {ch}
              </span>
            )),
          )}
        </div>
        <span className="btn-primary order-3 w-full justify-center px-4 py-3 text-[1.05rem] sm:px-5 sm:py-3.5 sm:text-[1.1rem] lg:hidden">
          Play today&apos;s puzzle <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
