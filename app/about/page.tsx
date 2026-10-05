import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Words at Rest" },
  description:
    "Words at Rest publishes calm, free word search puzzles for adults and seniors, with original word lists, large print options and a new daily puzzle.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
      <Prose>
        <h1 className="text-4xl font-semibold tracking-tight">About Words at Rest</h1>
        <p>
          Words at Rest is a small, independent puzzle site with one simple idea: word searches
          should be relaxing. We publish free online word search puzzles for adults, seniors and
          anyone who enjoys a quiet few minutes with a grid of letters.
        </p>
        <h2>What we make</h2>
        <ul>
          <li>Original themed puzzles — seasonal, nature, food, travel and more.</li>
          <li>A new <Link href="/daily">daily word search</Link> every day.</li>
          <li><Link href="/large-print">Large print</Link> puzzles that are easy on the eyes.</li>
          <li>Three difficulty levels, from gentle to genuinely challenging.</li>
        </ul>
        <h2>Our principles</h2>
        <ul>
          <li>
            <strong>Original content.</strong> Every word list is written by us. We do not use
            characters, brand names or other people’s intellectual property.
          </li>
          <li>
            <strong>Calm by design.</strong> No countdown timers, no fake buttons, and ads (when
            shown) never cover the puzzle.
          </li>
          <li>
            <strong>Accessible.</strong> Large print, high contrast and keyboard-friendly pages are a
            priority, not an afterthought.
          </li>
          <li>
            <strong>Free to play.</strong> No download and no account required. The site is
            supported by advertising.
          </li>
        </ul>
        <h2>Who it’s for</h2>
        <p>
          Our puzzles are written for a general audience of teens and adults. The site is not
          directed at children under 13.
        </p>
        <h2>Get in touch</h2>
        <p>
          Suggestions for new themes, accessibility feedback or corrections are always welcome —
          please visit our <Link href="/contact">contact page</Link> or email{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>
      </Prose>
    </>
  );
}
