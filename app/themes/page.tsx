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

const DATES = datesFor("app/themes/page.tsx", "data/themes/index.ts");

const DESCRIPTION =
  "Browse free word search puzzles by theme: Halloween, fall, Christmas, Bible, animals, ocean, garden, music, space, large print and more. Original word lists, playable online.";

export const metadata: Metadata = seo({
  title: "Word Search Themes — Browse All Puzzles",
  description: DESCRIPTION,
  path: "/themes",
});

export default function ThemesPage() {
  const themes = getThemes();
  const total = getPuzzles().length;
  return (
    <>
      <Breadcrumbs items={[{ name: "Themes", href: "/themes" }]} />
      <Picture art={ART.themesBanner} priority sizes="(min-width: 1152px) 1088px, 100vw" className="mb-8 aspect-[16/5] w-full rounded-[3px] object-cover" />
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Word search themes</h1>
      <Byline dates={DATES} />
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
        {themes.length} themes and {total} free puzzles. Every theme has its own original word list
        and several puzzles across difficulty levels — written for adults, free of licensed
        characters.
      </p>
      <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((t) => (
          <li key={t.id}>
            <ThemeCard theme={t} />
          </li>
        ))}
      </ul>
      <section className="mt-14 max-w-3xl space-y-4 text-lg leading-relaxed text-[var(--ink-soft)]">
        <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">How are the themes organised?</h2>
        <p>
          <strong className="text-[var(--ink)]">Seasonal themes</strong> —{" "}
          <Link href="/themes/halloween">Halloween</Link>, <Link href="/themes/fall">fall</Link> and{" "}
          <Link href="/themes/christmas">Christmas</Link> — follow the calendar and get new puzzles as
          each season comes round. <strong className="text-[var(--ink)]">Evergreen themes</strong>{" "}
          such as Bible, animals, food, ocean, garden, travel, music and space work any time of year.{" "}
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
      </section>
      <HubSchema dates={DATES} type="CollectionPage" name="Word search themes" description={DESCRIPTION} path="/themes" />
    </>
  );
}
