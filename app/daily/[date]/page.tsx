import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleView from "@/components/PuzzleView";
import { formatLongDate, getDailyPuzzle, isValidDailyDate } from "@/lib/data";
import { seo } from "@/lib/seo";

type Props = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  if (!isValidDailyDate(date)) return { title: { absolute: "Page not found | Words at Rest" }, robots: { index: false } };
  const long = formatLongDate(date);
  const p = getDailyPuzzle(date);
  const short = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  return seo({
    title: `Daily Word Search — ${short}`,
    description: `The free daily word search for ${long}: “${p.title}”, ${p.words.length} words in a ${p.gridSize}×${p.gridSize} grid. No download, no sign-up, no timer.`,
    path: `/daily/${date}`,
    image: "/og/daily.jpg",
  });
}

export default async function DailyArchivePage({ params }: Props) {
  const { date } = await params;
  if (!isValidDailyDate(date)) notFound();
  const puzzle = getDailyPuzzle(date);
  const long = formatLongDate(date);
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
        intro={`The daily puzzle for ${long}: “${puzzle.title}”. ${puzzle.words.length} words, ${puzzle.gridSize}×${puzzle.gridSize} grid.`}
        canonicalPath={`/daily/${date}`}
        pageDates={{ published: date, modified: date }}
      />
      <p className="mt-8">
        <Link href="/daily">← Back to today&apos;s puzzle</Link>
      </p>
    </>
  );
}
