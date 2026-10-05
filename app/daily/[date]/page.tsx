import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleView from "@/components/PuzzleView";
import { formatLongDate, getDailyPuzzle, isValidDailyDate } from "@/lib/data";

type Props = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  if (!isValidDailyDate(date)) return { title: "Daily puzzle not found" };
  const long = formatLongDate(date);
  return {
    title: `Daily Word Search for ${long}`,
    description: `Play the free daily word search for ${long}. No download, no sign-up, no timer.`,
    alternates: { canonical: `/daily/${date}` },
  };
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
      />
      <p className="mt-8">
        <Link href="/daily">← Back to today&apos;s puzzle</Link>
      </p>
    </>
  );
}
