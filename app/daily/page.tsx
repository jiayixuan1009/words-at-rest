import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleView from "@/components/PuzzleView";
import { formatLongDate, getDailyArchive, getDailyPuzzle, todayUtc } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daily Word Search — Today’s Free Puzzle",
  description:
    "A new free word search every day. Relaxed, no timer, playable online with no download. Come back tomorrow for the next one.",
  alternates: { canonical: "/daily" },
};

export default function DailyPage() {
  const today = todayUtc();
  const started = today >= SITE.dailyStart;
  const date = started ? today : SITE.dailyStart;
  const puzzle = getDailyPuzzle(date);
  const archive = started ? getDailyArchive(14).slice(1) : [];

  return (
    <>
      <Breadcrumbs items={[{ name: "Daily", href: "/daily" }]} />
      {!started ? (
        <p className="mb-4 rounded-sm border border-[#d4cbb8] bg-[#ebe4d6]/50 p-3 text-sm text-stone-700">
          The official Daily archive begins on {formatLongDate(SITE.dailyStart)} (UTC). Below is a
          preview of that day’s puzzle — dates before the launch day are not listed in the archive.
        </p>
      ) : (
        <p className="text-sm uppercase tracking-wide text-stone-500">{formatLongDate(today)}</p>
      )}
      <PuzzleView
        puzzle={puzzle}
        heading={started ? "Today’s Daily Word Search" : "Daily Word Search (preview)"}
        intro={
          started
            ? `Today’s puzzle is “${puzzle.title}”. Find all ${puzzle.words.length} words at your own pace — a fresh grid arrives every day (UTC).`
            : `Preview for ${formatLongDate(SITE.dailyStart)}: “${puzzle.title}”. Find all ${puzzle.words.length} words at your own pace.`
        }
        canonicalPath="/daily"
      />
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Past daily puzzles</h2>
        {archive.length === 0 ? (
          <p className="mt-2 text-stone-600">
            {started
              ? "The archive starts today. Check back tomorrow."
              : `Archive opens ${formatLongDate(SITE.dailyStart)}. Check back then.`}
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
    </>
  );
}
