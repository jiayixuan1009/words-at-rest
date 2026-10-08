import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleView from "@/components/PuzzleView";
import PlayOptions from "@/components/PlayOptions";
import Faq, { type FaqItem } from "@/components/Faq";
import { currentDailyDate, formatLongDate, getDailyArchive, getDailyPuzzle, getDailySiblingPuzzles, getTheme, isValidDailyDate, puzzlePath } from "@/lib/data";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ART } from "@/lib/images";
import Picture from "@/components/Picture";
import Sources, { Quote } from "@/components/Sources";
import { CITATIONS } from "@/lib/citations";

const DAILY_CITED = [CITATIONS.niaCognitiveHealth, CITATIONS.wcagResizeText];

export const dynamic = "force-dynamic";

export const metadata: Metadata = seo({
  title: "Daily Word Search — Today’s Free Puzzle",
  description:
    "A featured free word search every day (plus more theme puzzles the same day), the same for everyone. Relaxed, no timer, no download or sign-up. Past days stay in the archive.",
  path: "/daily",
  image: "/og/daily.jpg",
  imageAlt: "Today’s daily word search — Words at Rest",
});

const FAQ: FaqItem[] = [
  {
    q: "What is the daily word search?",
    a: "Each calendar day has a featured free puzzle everyone shares, plus up to nine more “Also today” grids from other themes. The featured grid is the same for every visitor that day, so you can solve it alongside a friend. From October 7, 2026 each day’s featured puzzle is unique (never large print, never timed). Launch day, October 6, keeps its original single puzzle.",
  },
  {
    q: "When does the daily puzzle change?",
    a: "A new daily puzzle appears at midnight UTC (Coordinated Universal Time). Depending on where you live, that is in the evening or early morning local time. Using one global clock means every dated page keeps the same puzzle forever, which makes the archive reliable.",
  },
  {
    q: "Can I play yesterday’s daily word search?",
    a: "Yes. Every past daily puzzle since our launch on October 6, 2026 has its own dated page, for example /daily/2026-10-06. Browse the full month view and a reverse-chronological log on the daily calendar at /calendar. Archive puzzles are free and work exactly like today’s puzzle, with progress saved on your device.",
  },
  {
    q: "Is the daily puzzle free? Do I need an account?",
    a: "The daily puzzle is completely free. There is nothing to download and no account, email or sign-up. We plan to support the site with advertising while keeping ads away from the puzzle grid.",
  },
  {
    q: "Can I make the daily puzzle bigger?",
    a: "Yes. Choose Larger in the Grid size switch above the grid for bigger squares, bigger letters and a larger word list. Your choice is remembered on this device for every puzzle. You can also use your browser’s zoom, or try our dedicated large print word search puzzles.",
  },
];

export default function DailyPage() {
  const date = currentDailyDate();
  if (!isValidDailyDate(date)) return (
    <section className="max-w-2xl space-y-4">
      <h1 className="font-serif text-4xl">Today’s daily word search</h1>
      <p className="text-lg">Today’s puzzle is not ready yet. Past puzzles and theme puzzles are still available.</p>
      <Link href="/calendar" className="btn-primary">Play a past daily puzzle</Link>
      <Link href="/difficulty/easy" className="inline-flex min-h-11 items-center">Try an easy puzzle</Link>
    </section>
  );
  const puzzle = getDailyPuzzle(date);
  const siblings = getDailySiblingPuzzles(date);
  const archive = getDailyArchive(30).slice(1);

  return (
    <>
      <Breadcrumbs items={[{ name: "Daily", href: "/daily" }]} />
      <Picture art={ART.dailyHeader} sizes="(min-width: 1152px) 1088px, 100vw" className="mb-6 hidden aspect-[10/3] w-full rounded-[3px] border border-[#d4cbb8] object-cover sm:block" />
      <p className="font-sans text-sm uppercase tracking-[0.08em] text-[var(--ink-soft)]">
        <time dateTime={date}>{formatLongDate(date)}</time>
      </p>
      <PlayOptions />
      <PuzzleView
        puzzle={puzzle}
        heading="Today’s Daily Word Search"
        intro={`Today’s puzzle is “${puzzle.title}”: ${puzzle.words.length} words in a ${puzzle.gridSize}×${puzzle.gridSize} grid. Find them at your own pace — a fresh grid arrives every day at midnight UTC.`}
        canonicalPath="/daily"
        pageDates={{ published: SITE.dailyStart, modified: date }}
      />
      {siblings.length > 0 && (
        <section className="mt-10" aria-labelledby="also-today-heading">
          <h2 id="also-today-heading" className="text-xl font-semibold text-stone-900">
            Also today
          </h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed text-stone-700">
            Nine more free word searches for {formatLongDate(date)}. Each one also lives on its theme
            page, so you can find it again later under Themes.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {siblings.map((p) => {
              const theme = getTheme(p.themeId);
              return (
                <li key={p.id}>
                  <Link
                    href={puzzlePath(p)}
                    className="flex min-h-11 flex-col rounded border border-[#d4cbb8] px-4 py-3 no-underline hover:bg-[#efe7d9]"
                  >
                    <span className="font-semibold text-[var(--ink)]">{p.title}</span>
                    <span className="mt-0.5 text-sm capitalize text-[var(--ink-soft)]">
                      {theme?.name ?? p.themeId} · {p.difficulty} · {p.gridSize}×{p.gridSize}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <section className="mt-10 max-w-3xl space-y-3 text-lg leading-relaxed text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">A calm daily habit</h2>
        <p>
          Many players treat the daily grid like a morning crossword — a few quiet minutes, not a
          workout for the brain. The National Institute on Aging cautions readers about overclaiming:
        </p>
        <Quote c={CITATIONS.niaCognitiveHealth} />
        <p>
          Prefer bigger letters? Choose Larger in the Grid size switch, in line with the W3C note that{" "}
          <q cite={CITATIONS.wcagResizeText.url}>{CITATIONS.wcagResizeText.quote.replace(/\.$/, "")}</q>{" "}
          (
          <cite>
            <a href={CITATIONS.wcagResizeText.url} rel="noopener" target="_blank">
              WCAG 1.4.4
            </a>
          </cite>
          ).
        </p>
      </section>
      <Sources items={DAILY_CITED} />
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Past daily puzzles</h2>
        <p className="mt-2 text-lg text-stone-700">
          <Link href="/calendar" className="font-semibold">
            See the full calendar
          </Link>{" "}
          for a month view and a “What’s new” log of every daily puzzle.
        </p>
        {archive.length === 0 ? (
          <div className="mt-3 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Picture art={ART.dailyArchiveEmpty} sizes="240px" className="h-auto w-60 shrink-0" />
          <p className="text-[var(--ink-soft)]">
            The archive starts today ({formatLongDate(date)}). Each new day adds a dated page —
            check back tomorrow, or play today&apos;s puzzle at its{" "}
            <Link href={`/daily/${date}`}>permanent link</Link>.
          </p>
          </div>
        ) : (
          <ul className="mt-3 grid gap-1 sm:grid-cols-2">
            {archive.slice(0, 14).map((d) => (
              <li key={d}>
                <Link href={`/daily/${d}`} className="inline-flex min-h-10 items-center">
                  {formatLongDate(d)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Faq items={FAQ} heading="Daily word search: common questions" path="/daily" />
    </>
  );
}
