import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleView from "@/components/PuzzleView";
import { formatLongDate, getDailyPuzzle, getDailySiblingPuzzles, getTheme, isValidDailyDate, puzzlePath } from "@/lib/data";
import { seo } from "@/lib/seo";

type Props = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  if (!isValidDailyDate(date)) {
    return { title: { absolute: "Page not found | Words at Rest" }, robots: { index: false } };
  }
  const long = formatLongDate(date);
  const p = getDailyPuzzle(date);
  const theme = getTheme(p.themeId);
  const short = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const themeLabel = theme?.name ?? p.themeId;
  return seo({
    title: `Daily Word Search — ${short}`,
    description: `The free daily word search for ${long}: “${p.title}”, a ${p.difficulty} ${themeLabel} puzzle with ${p.words.length} words in a ${p.gridSize}×${p.gridSize} grid. No download, no sign-up, no timer.`,
    path: `/daily/${date}`,
    image: "/og/daily.jpg",
  });
}

export default async function DailyArchivePage({ params }: Props) {
  const { date } = await params;
  if (!isValidDailyDate(date)) notFound();
  const puzzle = getDailyPuzzle(date);
  const siblings = getDailySiblingPuzzles(date);
  const theme = getTheme(puzzle.themeId);
  const long = formatLongDate(date);
  const themeName = theme?.name ?? puzzle.themeId;
  const diffLabel = puzzle.difficulty;
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Daily", href: "/daily" },
          { name: date, href: `/daily/${date}` },
        ]}
      />
      <PuzzleView
        puzzle={puzzle}
        heading={`Daily Word Search — ${long}`}
        intro={`The featured daily puzzle for ${long} is a ${diffLabel} ${themeName} word search: “${puzzle.title}”. ${puzzle.words.length} words in a ${puzzle.gridSize}×${puzzle.gridSize} grid. Everyone who opens this date gets the same featured grid${siblings.length ? `, plus ${siblings.length} more themes below` : ""}.`}
        canonicalPath={`/daily/${date}`}
        pageDates={{ published: date, modified: date }}
      />
      {siblings.length > 0 && (
        <section className="mt-10" aria-labelledby="also-date-heading">
          <h2 id="also-date-heading" className="text-xl font-semibold text-stone-900">
            Also on this day
          </h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed text-stone-700">
            More free word searches published for {long}. Each links to its theme page.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {siblings.map((p) => {
              const t = getTheme(p.themeId);
              return (
                <li key={p.id}>
                  <Link
                    href={puzzlePath(p)}
                    className="flex min-h-11 flex-col rounded border border-[#d4cbb8] px-4 py-3 no-underline hover:bg-[#efe7d9]"
                  >
                    <span className="font-semibold text-[var(--ink)]">{p.title}</span>
                    <span className="mt-0.5 text-sm capitalize text-[var(--ink-soft)]">
                      {t?.name ?? p.themeId} · {p.difficulty}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-base">
        <Link href="/daily" className="inline-flex min-h-10 items-center">
          ← Today&apos;s puzzle
        </Link>
        <Link href="/calendar" className="inline-flex min-h-10 items-center">
          Full calendar
        </Link>
        {theme && (
          <Link href={`/themes/${theme.slug}`} className="inline-flex min-h-10 items-center">
            More {theme.name} puzzles
          </Link>
        )}
      </p>
    </>
  );
}
