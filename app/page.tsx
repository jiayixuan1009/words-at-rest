import Link from "next/link";
import PuzzleCard from "@/components/PuzzleCard";
import ThemeCard from "@/components/ThemeCard";
import AdSlot from "@/components/AdSlot";
import HubSchema from "@/components/HubSchema";
import DifficultyTable from "@/components/DifficultyTable";
import { LauncherChips } from "@/components/DailyLauncher";
import HomeDailyPuzzle from "@/components/HomeDailyPuzzle";
import Picture, { Ornament } from "@/components/Picture";
import MobileMore from "@/components/MobileMore";
import Sources, { Quote } from "@/components/Sources";
import { CITATIONS } from "@/lib/citations";
import { currentDailyDate, getDailyPuzzle, getLargePrintPuzzles, getPuzzles, getTheme, getThemes, isValidDailyDate } from "@/lib/data";
import { ART, DIFFICULTY_ART, srcSetOf } from "@/lib/images";
import { SITE } from "@/lib/site";
import { seo } from "@/lib/seo";
import type { Theme } from "@/lib/types";
import { featuredPuzzles } from "@/lib/discovery";

export const dynamic = "force-dynamic";

const HOME_DESC =
  "Calm, free word search puzzles for adults and seniors. Large print, a new daily puzzle and seasonal themes — no download, no sign-up, no timer.";

const HOME_CITED = [
  CITATIONS.niaCognitiveHealth,
  CITATIONS.alzSocBrainTraining,
  CITATIONS.wcagResizeText,
];

export const metadata = seo({
  title: "Free Large Print & Daily Word Search | Words at Rest",
  absoluteTitle: true,
  description: HOME_DESC,
  path: "/",
  imageAlt: "Words at Rest — calm word search puzzles for adults",
});

const FEATURED_THEMES = ["halloween", "thanksgiving", "christmas", "winter", "bible", "garden", "ocean"];

const STEPS = [
  { title: "Pick a puzzle", text: "Today’s daily grid is on this page — or choose a theme and a difficulty you like." },
  { title: "Read the word list", text: "Every answer is already listed beside the grid — no trivia, no spelling test." },
  { title: "Mark each word", text: "Drag across a word, or tap its first letter and then its last letter." },
  { title: "Finish at your pace", text: "No timer and no score. Progress is saved on your device for next time." },
];

const LEVEL_COPY = {
  easy: { name: "Easy", line: "10×10 · across and down only", body: "A gentle warm-up with words that always read forwards." },
  medium: { name: "Medium", line: "12×12 · diagonals added", body: "A fuller grid for regular solvers; still nothing backwards." },
  hard: { name: "Hard", line: "15×15 · all eight directions", body: "Backwards, upwards and diagonal — a real search." },
} as const;

export default function HomePage() {
  const date = currentDailyDate();
  const daily = isValidDailyDate(date) ? getDailyPuzzle(date) : null;
  const totalPuzzles = getPuzzles().length;
  const totalThemes = getThemes().length;
  const themes = FEATURED_THEMES.map((s) => getTheme(s)).filter((t): t is Theme => Boolean(t));
  const [lead, ...rest] = themes;
  const featured = featuredPuzzles(getPuzzles(), date);
  const largePrint = getLargePrintPuzzles().slice(0, 4);
  return (
    <div className="space-y-14 sm:space-y-24">
      {/* 1 · Launcher: title → playable today’s grid → chips → optional hero */}
      <section aria-labelledby="home-title" className="home-launcher">
        <div className="home-launcher__intro">
          <div className="home-launcher__copy">
            <p className="kicker">Free · Online · No timer</p>
            <h1 id="home-title" className="display home-title mt-2.5 font-serif sm:mt-4">
              Free word search puzzles, at your own pace.
            </h1>
            <p className="mt-3 max-w-[36rem] text-[1.0625rem] leading-snug text-[var(--ink-soft)] sm:mt-5 sm:text-[1.25rem] sm:leading-relaxed">
              Calm grids for adults and seniors — large print, daily and seasonal themes. No download, no
              sign-up. Today&apos;s puzzle is ready below; mark words right here.
            </p>
          </div>
          <picture className="home-launcher__intro-art" aria-hidden="true">
            <source media="(max-width: 1023px)" srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
            <source
              media="(min-width: 1024px)"
              srcSet={srcSetOf(ART.heroDesktop)}
              sizes="(min-width: 1280px) 500px, 46vw"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ART.heroDesktop.src}
              width={ART.heroDesktop.width}
              height={ART.heroDesktop.height}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>

        <div className="home-launcher__play">
          {daily ? (
            <HomeDailyPuzzle puzzle={daily} date={date} />
          ) : (
            <div className="space-y-3 rounded-[4px] border border-[#cbbfa6] bg-[#faf6ee]/80 p-6">
              <p>Today&apos;s puzzle is not ready yet.</p>
              <Link href="/calendar" className="btn-primary">
                Browse past daily puzzles
              </Link>
            </div>
          )}
        </div>

        <div className="home-launcher__chips">
          <LauncherChips />
        </div>

        <div className="home-launcher__hero">
          {/* Decorative only — playable grid is above; keep lazy so it never competes with play. */}
          <picture>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ART.heroMobile.variants?.[0][0] ?? ART.heroMobile.src}
              srcSet={srcSetOf(ART.heroDesktop)}
              sizes="(min-width: 1024px) 1088px, 100vw"
              width={1600}
              height={1200}
              alt={ART.heroDesktop.alt}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="aspect-[5/2] w-full rounded-[4px] border border-[#d4cbb8] object-cover sm:aspect-[10/3]"
            />
          </picture>
        </div>
      </section>

      <Ornament art={ART.dividerRule} width={560} />

      {/* 2 · Themes — editorial grid, one lead story + six */}
      <section aria-labelledby="themes-h">
        <div className="flex flex-col items-center text-center">
          <Ornament art={ART.homeThemesOrnament} width={120} />
          <h2 id="themes-h" className="mt-3 font-serif text-4xl sm:text-5xl">Browse by theme</h2>
          <p className="mt-3 max-w-2xl text-lg text-[var(--ink-soft)]">
            {totalThemes} themes with original, grown-up word lists — from the seasons to the sea.
          </p>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          {lead && <ThemeCard theme={lead} feature />}
          <ul className="grid grid-cols-2 content-between gap-x-6 gap-y-8">
            {rest.slice(0, 4).map((t) => (
              <li key={t.id}>
                <ThemeCard theme={t} compact sizes="(min-width: 1024px) 240px, 45vw" />
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-2">
          {rest.slice(4).map((t) => (
            <li key={t.id}>
              <ThemeCard theme={t} compact sizes="(min-width: 1024px) 540px, 45vw" />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/themes" className="chip">See all {totalThemes} themes →</Link>
          <Link href="/holidays" className="chip">Holiday themes →</Link>
        </p>
      </section>

      <AdSlot slot="home-mid" />

      {/* 3 · Difficulty */}
      <section aria-labelledby="difficulty-h">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="kicker">Choose your pace</p>
            <h2 id="difficulty-h" className="mt-3 font-serif text-4xl sm:text-5xl">Which difficulty should you choose?</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Every puzzle uses one of four layouts. Start easy or large print if you are new; move up
              when a grid starts to feel quick.
            </p>
          </div>
          <Picture art={ART.homeDifficulty} sizes="320px" className="hidden h-auto w-[320px] rounded-[3px] lg:block" />
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {(["easy", "medium", "hard"] as const).map((d) => (
            <li key={d} className="border-t-2 border-[var(--ink)] pt-4">
              <Link href={`/difficulty/${d}`} className="group block no-underline">
                <Picture art={DIFFICULTY_ART[d].image} sizes="(min-width: 640px) 33vw, 92vw" className="hidden aspect-[2/1] w-full rounded-[3px] border border-[#d4cbb8] object-cover sm:block" />
                <div className="mt-4 flex items-center gap-3">
                  <Picture art={DIFFICULTY_ART[d].badge} sizes="44px" decorative className="h-11 w-11" />
                  <h3 className="font-serif text-3xl text-[var(--ink)] group-hover:text-[var(--moss)]">{LEVEL_COPY[d].name}</h3>
                </div>
                <p className="mt-1 font-sans text-sm uppercase tracking-[0.08em] text-[var(--ink-soft)]">{LEVEL_COPY[d].line}</p>
                <p className="mt-2 text-lg leading-relaxed text-[var(--ink-soft)]">{LEVEL_COPY[d].body}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-4xl">
          <DifficultyTable />
        </div>
      </section>

      {/* 4 · Large print aside */}
      <section aria-labelledby="lp-h" className="paper-deep -mx-5 grid gap-8 border-y border-[#cbbfa6] px-5 py-10 sm:mx-0 sm:rounded-[4px] sm:border sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Picture art={ART.homeAsideLargePrint} sizes="(min-width: 1024px) 460px, 92vw" className="hidden aspect-[4/3] w-full rounded-[3px] border border-[#cbbfa6] object-cover sm:block" />
        <div>
          <p className="kicker">Easy on the eyes</p>
          <h2 id="lp-h" className="mt-3 font-serif text-4xl">Large print, made comfortable</h2>
          <p className="mt-4 text-xl leading-relaxed text-[var(--ink-soft)]">
            Bigger letters, smaller grids, high contrast. Switch any puzzle to large print with one tap,
            or start with a dedicated 9×9 grid.
          </p>
          <ul className="mt-4">
            {largePrint.map((p) => (
              <li key={p.id}>
                <PuzzleCard puzzle={p} />
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/large-print" className="chip">See all large print →</Link>
            <Link href="/printables" className="chip ml-3">Printable PDFs →</Link>
          </p>
        </div>
      </section>

      {/* 5 · How to play strip */}
      <section aria-labelledby="howto-h">
        <div className="text-center">
          <p className="kicker justify-center">Four quiet steps</p>
          <h2 id="howto-h" className="mt-3 font-serif text-4xl sm:text-5xl">How to play</h2>
        </div>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Picture art={ART.howToSteps[i]} sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 92vw" className="hidden aspect-[4/3] w-full object-contain sm:block" />
              <p className="mt-2 font-serif text-5xl leading-none text-[var(--highlight)]" aria-hidden="true">{i + 1}</p>
              <h3 className="mt-1 font-serif text-2xl">{s.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-[var(--ink-soft)]">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center">
          <Link href="/how-to-play" className="chip">Read the full guide →</Link>
        </p>
      </section>

      <Ornament art={ART.dividerRule} width={560} />

      {/* 6 · Definition + why (AEO copy kept verbatim) */}
      <section className="grid gap-12 lg:grid-cols-2">
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
              <strong className="text-[var(--ink)]">Easy on the eyes.</strong> A Larger grid size
              on every puzzle, plus dedicated 9×9 large print puzzles.
            </li>
            <li>
              <strong className="text-[var(--ink)]">Calm by design.</strong> No timers, no scores, no
              sign-up and no download. Ads never cover the puzzle.
            </li>
            <li>
              <strong className="text-[var(--ink)]">A new featured puzzle daily.</strong> The same{" "}
              <Link href="/daily">daily word search</Link> for everyone (plus more themes that day), with a permanent archive.
            </li>
          </ul>
          <p>
            Words at Rest is an independent site edited by{" "}
            <Link href={SITE.editor.aboutPath}>{SITE.editor.name}</Link>.{" "}
            <Link href="/about">More about us</Link>.
          </p>
        </div>
      </section>

      {/* 6b · Why word puzzles (cited; full HTML for bots, collapsed on phones) */}
      <section aria-labelledby="why-puzzles-h" className="max-w-3xl">
        <h2 id="why-puzzles-h" className="font-serif text-3xl text-[var(--ink)]">Why word puzzles?</h2>
        <MobileMore id="why-puzzles" className="mt-4">
          <div className="space-y-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            <p>
              A word search asks for just enough attention to quiet the rest of the day: a clear
              goal, steady progress and a small satisfaction each time a word lights up. Unlike a
              crossword, every answer is already on the list — no trivia required.
            </p>
            <p>
              We offer puzzles as a calm pastime, not as medicine or “brain training.” Health
              organizations are careful with their wording. The National Institute on Aging notes
              that evidence for a lasting cognitive benefit from activities like these is mixed:
            </p>
            <Quote c={CITATIONS.niaCognitiveHealth} />
            <p>
              The{" "}
              <cite>
                <a href={CITATIONS.alzSocBrainTraining.url} rel="noopener" target="_blank">
                  Alzheimer’s Society
                </a>
              </cite>{" "}
              likewise finds that{" "}
              <q cite={CITATIONS.alzSocBrainTraining.url}>{CITATIONS.alzSocBrainTraining.quote}</q>
            </p>
            <p>
              On the practical side, every grid has a Grid size → Larger control. That follows the W3C’s{" "}
              <cite>
                <a href={CITATIONS.wcagResizeText.url} rel="noopener" target="_blank">
                  resize-text guidance
                </a>
              </cite>
              : <q cite={CITATIONS.wcagResizeText.url}>{CITATIONS.wcagResizeText.quote.replace(/\.$/, "")}</q>.
              More detail is on our <Link href="/adults">word search for adults</Link> page and{" "}
              <Link href="/accessibility">accessibility statement</Link>.
            </p>
          </div>
        </MobileMore>
        <Sources items={HOME_CITED} />
      </section>

      {/* 7 · Featured puzzles — compact index */}
      <section aria-labelledby="featured-h">
        <h2 id="featured-h" className="font-serif text-3xl">Featured puzzles</h2>
        <div className="mt-2 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PuzzleCard key={p.id} puzzle={p} />
          ))}
        </div>
      </section>

      {/* 8 · Come back tomorrow (no sign-up; just a reminder) */}
      <section aria-labelledby="cta-h" className="grid items-center gap-8 overflow-hidden rounded-[4px] border border-[#cbbfa6] bg-[#faf6ee]/70 sm:grid-cols-[1fr_1fr]">
        <Picture art={ART.ctaComeBack} sizes="(min-width: 640px) 50vw, 100vw" className="hidden aspect-[5/3] h-full w-full object-cover sm:block" />
        <div className="px-6 py-8 sm:pr-10">
          <p className="kicker">Tomorrow’s grid</p>
          <h2 id="cta-h" className="mt-3 font-serif text-4xl">A fresh puzzle every morning</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            A new daily word search arrives at midnight UTC. Bookmark this page (Ctrl+D, or ⌘+D on a
            Mac) and come back tomorrow — nothing to sign up for.
          </p>
          <p className="mt-6">
            <Link href="/daily" className="btn-primary">Open the full daily page →</Link>
          </p>
        </div>
      </section>

      <HubSchema
        name="Free Large Print & Daily Word Search"
        description={HOME_DESC}
        path="/"
        breadcrumb={false}
        citations={HOME_CITED}
        extra={{ about: { "@id": `${SITE.url}/#organization` } }}
      />
    </div>
  );
}
