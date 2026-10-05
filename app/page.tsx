import Link from "next/link";
import PuzzleCard from "@/components/PuzzleCard";
import ThemeCard from "@/components/ThemeCard";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import DifficultyTable from "@/components/DifficultyTable";
import { currentDailyDate, getDailyPuzzle, getLargePrintPuzzles, getPuzzles, getThemes } from "@/lib/data";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import { SITE } from "@/lib/site";
import { ORG_ID, WEBSITE_ID, seo } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = seo({
  title: "Free Large Print & Daily Word Search | Words at Rest",
  absoluteTitle: true,
  description:
    "Calm, free word search puzzles for adults and seniors. Large print, a new daily puzzle and seasonal themes — no download, no sign-up, no timer.",
  path: "/",
  imageAlt: "Words at Rest — calm word search puzzles for adults",
});

export default function HomePage() {
  const daily = getDailyPuzzle(currentDailyDate());
  const totalPuzzles = getPuzzles().length;
  const totalThemes = getThemes().length;
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
            Free word search puzzles, at your own pace.
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
            alt={IMAGE_ALT.hero}
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
            alt={IMAGE_ALT.largePrint}
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

      <section className="max-w-3xl">
        <h2 className="font-serif text-3xl">Which difficulty should you choose?</h2>
        <p className="mt-3 text-lg leading-relaxed text-[var(--ink-soft)]">
          Every puzzle uses one of four layouts. Start easy or large print if you are new; move up
          when a grid starts to feel quick.
        </p>
        <DifficultyTable />
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-lg">
          <li><Link href="/difficulty/easy">Easy</Link></li>
          <li><Link href="/difficulty/medium">Medium</Link></li>
          <li><Link href="/difficulty/hard">Hard</Link></li>
          <li><Link href="/adults">For adults</Link></li>
          <li><Link href="/how-to-play">How to play</Link></li>
        </ul>
      </section>

      <section className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed text-[var(--ink-soft)]">
          <h2 className="font-serif text-3xl text-[var(--ink)]">What is a word search?</h2>
          <p id="definition" className="rounded-sm border-l-4 border-[var(--moss)] bg-[#ebe4d6]/50 py-3 pl-4">
            <strong className="text-[var(--ink)]">A word search</strong> is a puzzle made of a grid
            of letters with a list of words hidden inside. You find each word by spotting it in a
            straight line — across, down, diagonally or, on harder puzzles, backwards — and marking
            it. No trivia, no spelling test: every answer is already on the list.
          </p>
          <p>
            On Words at Rest you play right in your browser. Drag across a word or tap its first and
            last letters; found words stay highlighted and your progress is saved on your device.{" "}
            <Link href="/how-to-play">Read the full guide</Link>.
          </p>
        </div>
        <div className="space-y-4 text-lg leading-relaxed text-[var(--ink-soft)]">
          <h2 className="font-serif text-3xl text-[var(--ink)]">Why Words at Rest?</h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-[var(--ink)]">Made for adults.</strong> {totalThemes} themes
              and {totalPuzzles} puzzles with grown-up word lists — gardens, music, travel,
              astronomy and the seasons.
            </li>
            <li>
              <strong className="text-[var(--ink)]">Easy on the eyes.</strong> A Large print button
              on every grid, plus dedicated 9×9 large print puzzles.
            </li>
            <li>
              <strong className="text-[var(--ink)]">Calm by design.</strong> No timers, no scores, no
              sign-up and no download. Ads never cover the puzzle.
            </li>
            <li>
              <strong className="text-[var(--ink)]">A new puzzle daily.</strong> The same{" "}
              <Link href="/daily">daily word search</Link> for everyone, with a permanent archive.
            </li>
          </ul>
          <p>
            Words at Rest is an independent site edited by{" "}
            <Link href={SITE.editor.aboutPath}>{SITE.editor.name}</Link>.{" "}
            <Link href="/about">More about us</Link>.
          </p>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          name: SITE.name,
          url: SITE.url,
          description: SITE.tagline,
          inLanguage: "en",
          publisher: { "@id": ORG_ID },
        }}
      />
    </div>
  );
}
