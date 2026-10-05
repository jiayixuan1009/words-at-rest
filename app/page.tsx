import Link from "next/link";
import PuzzleCard from "@/components/PuzzleCard";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { getDailyPuzzle, getLargePrintPuzzles, getPuzzles, getThemes, todayUtc } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic"; // shows today's Daily

export const metadata = {
  title: { absolute: "Free Word Search Puzzles Online — Large Print & Daily | Words at Rest" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const today = todayUtc();
  const daily = getDailyPuzzle(today);
  const themes = getThemes();
  const featured = getPuzzles().filter((p) => !p.largePrint).slice(0, 6);
  const largePrint = getLargePrintPuzzles();
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Word search puzzles, at your own pace.
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-stone-700">
          Free online word searches for adults and seniors — large print, daily and seasonal
          puzzles. No download, no sign-up and no timer. Just a quiet grid and a list of words.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/daily"
            className="rounded-full bg-emerald-800 px-6 py-3 text-lg font-medium text-white no-underline hover:bg-emerald-900"
          >
            Play today&apos;s puzzle
          </Link>
          <Link
            href="/large-print"
            className="rounded-full border border-stone-400 px-6 py-3 text-lg font-medium text-stone-800 no-underline hover:bg-stone-100"
          >
            Large print puzzles
          </Link>
        </div>
        <p className="mt-4 text-sm text-stone-500">Today&apos;s daily: {daily.title}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Browse by theme</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {themes.map((t) => (
            <li key={t.id}>
              <Link
                href={`/themes/${t.slug}`}
                className="block rounded-2xl border border-stone-200 bg-white p-5 text-lg font-semibold text-stone-900 no-underline hover:border-stone-400"
              >
                {t.name} word search
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3"><Link href="/themes">See all themes →</Link></p>
      </section>

      <AdSlot slot="home-mid" />

      <section>
        <h2 className="text-2xl font-semibold">Featured puzzles</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PuzzleCard key={p.id} puzzle={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Large print, easy on the eyes</h2>
        <p className="mt-2 max-w-2xl text-stone-700">
          Bigger letters, smaller grids and high contrast. Any puzzle can switch to large print with
          one tap.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {largePrint.map((p) => (
            <PuzzleCard key={p.id} puzzle={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Choose your challenge</h2>
        <ul className="mt-3 flex flex-wrap gap-3 text-lg">
          <li><Link href="/difficulty/easy">Easy</Link></li>
          <li><Link href="/difficulty/medium">Medium</Link></li>
          <li><Link href="/difficulty/hard">Hard</Link></li>
          <li><Link href="/adults">Word search for adults</Link></li>
          <li><Link href="/how-to-play">How to play</Link></li>
        </ul>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
          description: SITE.tagline,
        }}
      />
    </div>
  );
}
