import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleView from "@/components/PuzzleView";
import Faq, { type FaqItem } from "@/components/Faq";
import { currentDailyDate, formatLongDate, getDailyArchive, getDailyPuzzle } from "@/lib/data";
import { seo } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = seo({
  title: "Daily Word Search — Today’s Free Puzzle",
  description:
    "A new free word search every day, the same for everyone. Relaxed, no timer, playable online with no download or sign-up. Past days stay in the archive.",
  path: "/daily",
  image: "/og/daily.jpg",
  imageAlt: "Today’s daily word search — Words at Rest",
});

const FAQ: FaqItem[] = [
  {
    q: "What is the daily word search?",
    a: "The daily word search is one free puzzle chosen for each calendar day. Everyone who visits on the same day gets the same grid, so you can solve it alongside a friend or family member and compare notes. It is drawn from our themed puzzles and is never a large print or timed puzzle.",
  },
  {
    q: "When does the daily puzzle change?",
    a: "A new daily puzzle appears at midnight UTC (Coordinated Universal Time). Depending on where you live, that is in the evening or early morning local time. Using one global clock means every dated page keeps the same puzzle forever, which makes the archive reliable.",
  },
  {
    q: "Can I play yesterday’s daily word search?",
    a: "Yes. Every past daily puzzle since our launch on October 6, 2026 has its own dated page in the archive below, for example /daily/2026-10-06. Archive puzzles are free and work exactly like today’s puzzle, with progress saved on your device.",
  },
  {
    q: "Is the daily puzzle free? Do I need an account?",
    a: "The daily puzzle is completely free. There is nothing to download and no account, email or sign-up. The site is supported by advertising, and ads are never placed over the puzzle grid.",
  },
  {
    q: "Can I make the daily puzzle bigger?",
    a: "Yes. Press the Large print button above the grid for bigger letters and a larger word list. Your choice is remembered on this device. You can also use your browser’s zoom, or try our dedicated large print word search puzzles.",
  },
];

export default function DailyPage() {
  const date = currentDailyDate();
  const puzzle = getDailyPuzzle(date);
  const archive = getDailyArchive(30).slice(1);

  return (
    <>
      <Breadcrumbs items={[{ name: "Daily", href: "/daily" }]} />
      <p className="text-sm uppercase tracking-wide text-stone-500">
        <time dateTime={date}>{formatLongDate(date)}</time>
      </p>
      <PuzzleView
        puzzle={puzzle}
        heading="Today’s Daily Word Search"
        intro={`Today’s puzzle is “${puzzle.title}”: ${puzzle.words.length} words in a ${puzzle.gridSize}×${puzzle.gridSize} grid. Find them at your own pace — a fresh grid arrives every day at midnight UTC.`}
        canonicalPath="/daily"
      />
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Past daily puzzles</h2>
        {archive.length === 0 ? (
          <p className="mt-2 text-stone-600">
            The archive starts today ({formatLongDate(date)}). Each new day adds a dated page here —
            check back tomorrow, or play today&apos;s puzzle at its{" "}
            <Link href={`/daily/${date}`}>permanent link</Link>.
          </p>
        ) : (
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            {archive.map((d) => (
              <li key={d}>
                <Link href={`/daily/${d}`}>{formatLongDate(d)}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Faq items={FAQ} heading="Daily word search: common questions" />
    </>
  );
}
