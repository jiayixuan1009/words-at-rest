import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Word Search for Adults — Calm & Challenging Puzzles",
  description:
    "Free word search puzzles made for adults: thoughtful word lists, hard 15×15 grids, large print options and no timers or flashing ads.",
  alternates: { canonical: "/adults" },
};

export default function AdultsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Word Search for Adults", href: "/adults" }]} />
      <div className="mb-10 grid gap-8 sm:grid-cols-2 sm:items-end">
        <div>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Word search for adults</h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Built for grown-ups who want a quiet puzzle — not a kids&apos; app, not a pop-up carnival.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.adults}
          alt="Stack of books in warm light"
          className="aspect-[4/3] w-full rounded-sm object-cover"
        />
      </div>
      <Prose>
        <p>
          Words at Rest is a word search site built for grown-ups. Many puzzle sites are designed
          around children or around constant pop-ups and countdowns. We went the other way: calm
          pages, thoughtful vocabulary, and puzzles that respect your time and attention.
        </p>
        <h2>What makes these puzzles different</h2>
        <ul>
          <li>
            <strong>Richer word lists.</strong> Themes use the vocabulary of gardens, kitchens,
            travel, nature and the seasons — words adults actually enjoy finding.
          </li>
          <li>
            <strong>Real challenge when you want it.</strong>{" "}
            <Link href="/difficulty/hard">Hard puzzles</Link> use 15×15 grids with words in all eight
            directions.
          </li>
          <li>
            <strong>Comfortable to read.</strong> <Link href="/large-print">Large print</Link> is one
            tap away on every puzzle.
          </li>
          <li>
            <strong>No timer, no pressure.</strong> Progress saves on your device, so you can come
            back later.
          </li>
        </ul>
        <h2>A small daily habit</h2>
        <p>
          Many of our players treat the <Link href="/daily">daily word search</Link> like a morning
          crossword: a few quiet minutes with a cup of coffee. Puzzles like these are a pleasant way
          to focus and unwind.
        </p>
        <h2>Where to start</h2>
        <ul>
          <li><Link href="/daily">Today’s daily puzzle</Link></li>
          <li><Link href="/themes/halloween">Halloween word search</Link> (seasonal)</li>
          <li><Link href="/themes/animals">Animals word search</Link></li>
          <li><Link href="/large-print">Large print word search</Link></li>
        </ul>
      </Prose>
    </>
  );
}
