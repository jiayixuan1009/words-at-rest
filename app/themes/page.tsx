import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ThemeCard from "@/components/ThemeCard";
import Link from "next/link";
import Byline from "@/components/Byline";
import HubSchema from "@/components/HubSchema";
import { datesFor } from "@/lib/content-dates";
import { getPuzzles, getThemes } from "@/lib/data";
import { seo } from "@/lib/seo";
import { ART } from "@/lib/images";
import Picture from "@/components/Picture";
import ThemeBrowser from "@/components/ThemeBrowser";
import Sources, { Quote } from "@/components/Sources";
import { CITATIONS } from "@/lib/citations";

const DATES = datesFor("app/themes/page.tsx", "components/ThemeBrowser.tsx", "data/themes/index.ts");

const THEMES_CITED = [CITATIONS.mwColour, CITATIONS.niaCognitiveHealth];

const DESCRIPTION =
  "Browse free word search puzzles by theme: holidays, seasons, Bible, animals, kitchen, garden, music, sports, large print and more. Original word lists, playable online.";

export const metadata: Metadata = seo({
  title: "Word Search Themes — Browse All Puzzles",
  description: DESCRIPTION,
  path: "/themes",
});

export default function ThemesPage() {
  const themes = getThemes();
  const total = getPuzzles().length;
  const groups = [
    { id: "seasonal", name: "Seasonal", items: themes.filter((t) => t.season !== "evergreen") },
    { id: "evergreen", name: "Anytime themes", items: themes.filter((t) => t.season === "evergreen" && !t.slug.endsWith("-pack")) },
    { id: "packs", name: "Large print & challenge packs", items: themes.filter((t) => t.slug.endsWith("-pack")) },
  ].filter((g) => g.items.length);
  return (
    <>
      <Breadcrumbs items={[{ name: "Themes", href: "/themes" }]} />
      <Picture art={ART.themesBanner} sizes="(min-width: 1152px) 1088px, 100vw" className="mb-8 hidden aspect-[16/5] w-full rounded-[3px] object-cover sm:block" />
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Word search themes</h1>
      <Byline dates={DATES} />
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
        {themes.length} themes and {total} free puzzles. Every theme has its own original word list
        and several puzzles across difficulty levels — written for adults, free of licensed
        characters.
      </p>
      <ThemeBrowser entries={groups.flatMap(g => g.items).map(t => ({
        theme: { name: t.name, slug: t.slug, season: t.season }, card: <ThemeCard theme={t} />,
      }))} />
      <section className="mt-14 max-w-3xl space-y-4 text-lg leading-relaxed text-[var(--ink-soft)]">
        <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">How are the themes organized?</h2>
        <p>
          <strong className="text-[var(--ink)]">Seasonal themes</strong> — Halloween, fall,
          Thanksgiving, Christmas, winter, Valentine&apos;s Day, Easter, New Year, St. Patrick&apos;s
          Day, Mother&apos;s Day, Father&apos;s Day, Independence Day, spring and summer — follow the
          calendar. See also the <Link href="/holidays">holidays hub</Link>.{" "}
          <strong className="text-[var(--ink)]">Evergreen themes</strong>{" "}
          such as Bible, animals (with birds and horses), food (with baking, desserts, herbs, fruits, vegetables
          and breakfast), ocean (with beach), garden (with flowers and trees), kitchen, coffee &amp; tea, weather,
          camping, mountains, lakes, farming, school, jobs, friendship, kindness, gratitude, mindfulness, colors, tools,
          U.S. states, world capitals, human body, american history, presidents, dinosaurs, insects, reptiles,
          cooking, shopping, money, countries, continents, cities, knitting, reading, painting, birthday, wedding,
          chemistry, mythology, volcanoes, forests, rivers, deserts, museums, sewing, quilting, swimming, hiking, cycling,
          geology, architecture, islands, emotions, photography, chess, national-parks, landmarks, farm-animals,
          home, astronomy, board-games, yoga, pottery, woodworking, calligraphy, libraries,
          volunteering, gardening-tools, meditation, birdwatching, lighthouses, journaling,
          apothecary, cars, trains, airplanes, soccer, basketball, travel, music (with instruments, jazz, classical and musical terms), sports (with golf,
          baseball, tennis and fishing) and space work any time of year.{" "}
          <strong className="text-[var(--ink)]">Packs</strong> group puzzles by how they play rather
          than by topic: the <Link href="/themes/large-print-pack">Large Print Pack</Link> for
          comfortable reading and the <Link href="/themes/hard-pack">Hard Pack</Link> for a serious
          challenge.
        </p>
        <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">Which theme should I choose?</h2>
        <p>
          Pick whatever you feel like reading about — a theme is simply the word list. If you want a
          particular level of challenge, you can also browse by difficulty:{" "}
          <Link href="/difficulty/easy">easy</Link>, <Link href="/difficulty/medium">medium</Link> or{" "}
          <Link href="/difficulty/hard">hard</Link>. Not sure where to start? Today’s{" "}
          <Link href="/daily">daily word search</Link> picks one for you.
        </p>
        <p>
          Have an idea for a new theme? <Link href="/contact">Tell us</Link> — reader suggestions help
          decide what we make next.
        </p>
        <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">How we spell the word lists</h2>
        <p>
          Every theme uses American English spelling. Merriam-Webster records colour as the{" "}
          <q cite={CITATIONS.mwColour.url}>{CITATIONS.mwColour.quote}</q>, so our lists prefer color,
          favor and similar American forms. We also avoid medical claims about puzzles; the{" "}
          <cite>
            <a href={CITATIONS.niaCognitiveHealth.url} rel="noopener" target="_blank">
              National Institute on Aging
            </a>
          </cite>{" "}
          notes that lasting cognitive benefits from activities like these are not definitive.
        </p>
        <Quote c={CITATIONS.niaCognitiveHealth} />
      </section>
      <Sources items={THEMES_CITED} />
      <HubSchema dates={DATES} type="CollectionPage" name="Word search themes" description={DESCRIPTION} path="/themes" citations={THEMES_CITED} />
    </>
  );
}
