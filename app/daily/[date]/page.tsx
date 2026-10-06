import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleView from "@/components/PuzzleView";
import { formatLongDate, getDailyPuzzle, getTheme, isValidDailyDate } from "@/lib/data";
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
        intro={`The daily puzzle for ${long} is a ${diffLabel} ${themeName} word search: “${puzzle.title}”. ${puzzle.words.length} words in a ${puzzle.gridSize}×${puzzle.gridSize} grid. Everyone who opens this date gets the same unique grid.`}
        canonicalPath={`/daily/${date}`}
        pageDates={{ published: date, modified: date }}
      />
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
