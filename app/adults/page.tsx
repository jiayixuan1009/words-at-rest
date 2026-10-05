import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import Byline from "@/components/Byline";
import Faq, { type FaqItem } from "@/components/Faq";
import HubSchema from "@/components/HubSchema";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import { seo } from "@/lib/seo";

const DESCRIPTION =
  "Free word search puzzles made for adults: thoughtful word lists, hard 15×15 grids, large print options and no timers, sign-ups or flashing ads.";

export const metadata: Metadata = seo({
  title: "Word Search for Adults — Calm & Challenging",
  description: DESCRIPTION,
  path: "/adults",
  image: "/og/adults.jpg",
  imageAlt: "Word search for adults — Words at Rest",
});

const FAQ: FaqItem[] = [
  {
    q: "What makes a word search “for adults”?",
    a: "Mainly the vocabulary and the design. Our word lists use grown-up words from cooking, gardening, music, travel, astronomy and the seasons rather than cartoon characters. Pages are calm, with no countdowns, coins or pop-up rewards, and the hard level offers a genuine 15×15 challenge.",
  },
  {
    q: "Are word searches good for your brain?",
    a: "Word searches exercise attention, visual scanning and pattern recognition, and many people find them a relaxing way to focus. They are best seen as an enjoyable mental activity rather than a medical treatment — we do not claim they prevent memory loss or any illness.",
  },
  {
    q: "Which difficulty should an adult start with?",
    a: "If you solve word searches regularly, start with medium: a 12×12 grid with 14 words, including diagonals. If you want a real test, go straight to hard, where 18 words run in all eight directions. If you prefer comfort over challenge, choose easy or large print.",
  },
  {
    q: "Are the puzzles really free? Do I need to sign up?",
    a: "Yes, every puzzle is free and there is no account, app or email required. Words at Rest is supported by advertising, and ads are never placed on top of the puzzle grid or disguised as buttons.",
  },
  {
    q: "Is this site suitable for children?",
    a: "Our puzzles are written for teens and adults, and the site is not directed at children under 13. The word lists are family-friendly, so an adult can happily solve alongside an older child.",
  },
];

export default function AdultsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Word Search for Adults", href: "/adults" }]} />
      <div className="mb-10 grid gap-8 sm:grid-cols-2 sm:items-end">
        <div>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Word search for adults</h1>
          <Byline />
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Built for grown-ups who want a quiet puzzle — not a kids&apos; app, not a pop-up carnival.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES.adults} alt={IMAGE_ALT.adults} className="aspect-[4/3] w-full rounded-sm object-cover" />
      </div>
      <Prose>
        <p>
          Words at Rest is a word search site built for grown-ups. Many puzzle sites are designed
          around children or around constant pop-ups and countdowns. We went the other way: calm
          pages, thoughtful vocabulary, and puzzles that respect your time and attention.
        </p>
        <h2>What makes these puzzles different?</h2>
        <ul>
          <li>
            <strong>Richer word lists.</strong> Themes use the vocabulary of gardens, kitchens,
            travel, music, astronomy and the seasons — words adults actually enjoy finding, such as
            saffron, trellis, sonata and constellation.
          </li>
          <li>
            <strong>Real challenge when you want it.</strong>{" "}
            <Link href="/difficulty/hard">Hard puzzles</Link> use 15×15 grids with 18 words in all
            eight directions, and the <Link href="/themes/hard-pack">Hard Pack</Link> uses longer,
            more abstract words.
          </li>
          <li>
            <strong>Comfortable to read.</strong> <Link href="/large-print">Large print</Link> is one
            tap away on every puzzle.
          </li>
          <li>
            <strong>No timer, no pressure.</strong> Progress saves on your device, so you can come
            back later.
          </li>
          <li>
            <strong>Nothing to install.</strong> Every puzzle runs in your browser — no app, no
            account, no email address.
          </li>
        </ul>
        <h2>Why do adults enjoy word searches?</h2>
        <p>
          A word search asks for just enough attention to quiet the rest of the day. There is a clear
          goal, steady progress and a small satisfaction each time a word lights up. Unlike a
          crossword, you never need a piece of trivia you do not know — the answers are all on the
          list — so a puzzle can be finished in a coffee break or stretched over an evening.
        </p>
        <p>
          Word searches also exercise visual scanning, attention and pattern recognition. We think
          of them as a pleasant habit for the mind rather than a cure for anything, and we will never
          make medical claims about them.
        </p>
        <h2>A small daily habit</h2>
        <p>
          Many players treat the <Link href="/daily">daily word search</Link> like a morning
          crossword: a few quiet minutes with a cup of coffee. Everyone gets the same puzzle each
          day, so it is easy to share with a partner, a parent or a friend, and past days stay
          available in the archive.
        </p>
        <h2>Where should I start?</h2>
        <ul>
          <li><Link href="/daily">Today’s daily puzzle</Link> — one fresh grid per day</li>
          <li><Link href="/difficulty/medium">Medium word searches</Link> — the sweet spot for regular solvers</li>
          <li><Link href="/themes/hard-pack">Hard Pack</Link> — longer words, all directions</li>
          <li><Link href="/themes/fall">Fall</Link> and <Link href="/themes/halloween">Halloween</Link> word searches (seasonal)</li>
          <li><Link href="/themes/music">Music</Link>, <Link href="/themes/space">space</Link> and <Link href="/themes/garden">garden</Link> themes</li>
          <li><Link href="/large-print">Large print word search</Link> — easiest on the eyes</li>
        </ul>
      </Prose>
      <Faq items={FAQ} heading="Word search for adults: common questions" />
      <HubSchema name="Word search for adults" description={DESCRIPTION} path="/adults" image="/og/adults.jpg" />
    </>
  );
}
