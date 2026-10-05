import Link from "next/link";
import PuzzleCard from "@/components/PuzzleCard";
import ThemeCard from "@/components/ThemeCard";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { getDailyPuzzle, getLargePrintPuzzles, getPuzzles, getThemes, todayUtc } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { absolute: "Free Word Search Puzzles Online — Large Print & Daily | Words at Rest" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const today = todayUtc();
  const daily = getDailyPuzzle(today);
  const themes = getThemes().slice(0, 6);
  const featured = getPuzzles().filter((p) => !p.largePrint).slice(0, 6);
  const largePrint = getLargePrintPuzzles().slice(0, 4);
  return (
    <div className="space-y-16">
      <section className="hero-band -mx-5 overflow-hidden rounded-sm border border-[#d4cbb8]/80 sm:-mx-0 sm:grid sm:grid-cols-2 sm:gap-0">
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
            Free · Online · No timer
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Word search puzzles, at your own pace.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--ink-soft)]">
            Calm grids for adults and seniors — large print, daily and seasonal themes. No download,
            no sign-up. Just a quiet cup and a list of words.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/daily"
              className="rounded-full bg-[var(--accent-deep)] px-6 py-3 font-sans text-base font-medium text-[#faf6ee] no-underline hover:bg-[var(--ink)]"
            >
              Play today&apos;s puzzle
            </Link>
            <Link
              href="/large-print"
              className="rounded-full border border-[#b8a990] px-6 py-3 font-sans text-base font-medium text-[var(--ink)] no-underline hover:bg-white/50"
            >
              Large print
            </Link>
          </div>
          <p className="mt-5 font-sans text-sm text-[var(--ink-soft)]">
            Today: <Link href="/daily">{daily.title}</Link>
          </p>
        </div>
        <div className="relative min-h-[220px] sm:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.hero}
            alt="Coffee and a quiet morning — the mood of Words at Rest"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl">Browse by theme</h2>
          <Link href="/themes" className="font-sans text-sm no-underline">
            All themes →
          </Link>
        </div>
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((t) => (
            <li key={t.id}>
              <ThemeCard theme={t} />
            </li>
          ))}
        </ul>
      </section>

      <AdSlot slot="home-mid" />

      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serif text-3xl">Featured puzzles</h2>
          <div className="mt-2">
            {featured.map((p) => (
              <PuzzleCard key={p.id} puzzle={p} />
            ))}
          </div>
        </div>
        <aside className="rounded-sm border border-[#d4cbb8] bg-[#ebe4d6]/40 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.largePrint}
            alt="Reading glasses on an open book"
            className="mb-5 aspect-[4/3] w-full rounded-sm object-cover"
            loading="lazy"
          />
          <h2 className="font-serif text-2xl">Large print, easy on the eyes</h2>
          <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
            Bigger letters, smaller grids, high contrast. Switch any puzzle to large print with one tap.
          </p>
          <ul className="mt-4 space-y-1">
            {largePrint.map((p) => (
              <li key={p.id}>
                <PuzzleCard puzzle={p} />
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link href="/large-print">See all large print →</Link>
          </p>
        </aside>
      </section>

      <section>
        <h2 className="font-serif text-3xl">Choose your challenge</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-lg">
          <li><Link href="/difficulty/easy">Easy</Link></li>
          <li><Link href="/difficulty/medium">Medium</Link></li>
          <li><Link href="/difficulty/hard">Hard</Link></li>
          <li><Link href="/adults">For adults</Link></li>
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
