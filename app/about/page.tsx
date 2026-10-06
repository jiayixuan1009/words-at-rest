import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Picture from "@/components/Picture";
import { ART } from "@/lib/images";
import Prose from "@/components/Prose";
import Byline from "@/components/Byline";
import HubSchema from "@/components/HubSchema";
import { routeDates } from "@/lib/content-dates";
import Sources from "@/components/Sources";
import { CITATIONS } from "@/lib/citations";
import { getPuzzles, getThemes } from "@/lib/data";
import { SITE } from "@/lib/site";
import { PERSON_ID, seo } from "@/lib/seo";

const CITED = [CITATIONS.wcagContrast, CITATIONS.niaCognitiveHealth, CITATIONS.alzSocBrainTraining, CITATIONS.mwColour];

const DATES = routeDates("/about");

const RULES: Record<string, string> = {
  easy: "words read forwards only, across or down.",
  medium: "adds diagonals; nothing is hidden backwards.",
  hard: "all eight directions, including backwards and upwards.",
  large: "across and down only, with extra-large letters.",
};

/** Real grid sizes / word counts, read from the published puzzles. */
function levelFacts() {
  const all = getPuzzles();
  const pick = (name: string, key: string, ps: typeof all) => ({
    name,
    size: ps[0]?.gridSize,
    words: ps[0]?.words.length,
    rule: RULES[key],
  });
  return [
    pick("Easy", "easy", all.filter((p) => !p.largePrint && p.difficulty === "easy")),
    pick("Medium", "medium", all.filter((p) => p.difficulty === "medium")),
    pick("Hard", "hard", all.filter((p) => p.difficulty === "hard")),
    pick("Large print", "large", all.filter((p) => p.largePrint)),
  ];
}

const DESCRIPTION =
  "Who makes Words at Rest: an independent site publishing calm, free word search puzzles for adults and seniors, edited by Reggie J. Our principles and how puzzles are made.";

export const metadata: Metadata = seo({
  title: "About Us — Who Makes Our Puzzles",
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  const themes = getThemes().length;
  const puzzles = getPuzzles().length;
  const LEVELS = levelFacts();
  return (
    <>
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
      <Prose>
        <h1 className="text-4xl font-semibold tracking-tight">About Words at Rest</h1>
        <Byline dates={DATES} />
        <Picture art={ART.aboutSpot} priority sizes="(min-width: 768px) 720px, 100vw" className="my-6 aspect-[3/2] w-full max-w-xl object-contain" />
        <p>
          Words at Rest is a small, independent puzzle site with one simple idea: word searches
          should be relaxing. We publish free online word search puzzles for adults, seniors and
          anyone who enjoys a quiet few minutes with a grid of letters. The site launched on{" "}
          {new Date(`${SITE.dailyStart}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}{" "}
          with {themes} themes and {puzzles} puzzles; new themes and daily puzzles are added over time.
        </p>

        <h2 id="editor">Who runs Words at Rest?</h2>
        <p>
          Words at Rest is edited and published by <strong>{SITE.editor.name}</strong>, an independent
          publisher focused on calm, readable puzzles for grown-ups — especially large print word
          searches that stay comfortable on a phone or tablet. {SITE.editor.name} writes and reviews
          the theme word lists and answers the messages that arrive through our{" "}
          <Link href="/contact">contact page</Link>. You can also find {SITE.editor.name} on{" "}
          <a href="https://x.com/0xReggieJ" rel="me noopener" target="_blank">X (@0xReggieJ)</a>.
        </p>
        <p>
          The site started from a simple frustration: most free word search sites are built for
          children, or buried under timers, coins and pop-ups. Words at Rest is the opposite — quiet
          pages, grown-up vocabulary, and puzzles you can finish at your own pace.
        </p>

        <h2>What do we make?</h2>
        <ul>
          <li>Original themed puzzles — seasonal, nature, food, travel, music, space and more.</li>
          <li>A new <Link href="/daily">daily word search</Link> every day, with a permanent archive.</li>
          <li><Link href="/large-print">Large print</Link> puzzles that are easy on the eyes.</li>
          <li>
            Three difficulty levels — <Link href="/difficulty/easy">easy</Link>,{" "}
            <Link href="/difficulty/medium">medium</Link> and <Link href="/difficulty/hard">hard</Link>{" "}
            — from gentle to genuinely challenging.
          </li>
        </ul>

        <h2 id="how-we-make-puzzles">How we make our puzzles</h2>
        <p>
          <strong>Written and reviewed by a person.</strong> Every theme starts as a word bank of
          about 40 words that {SITE.editor.name} writes and reviews. Lists use American
          English spelling (for example color, not colour). Merriam-Webster records colour as the{" "}
          <q cite={CITATIONS.mwColour.url}>{CITATIONS.mwColour.quote}</q> (
          <cite>
            <a href={CITATIONS.mwColour.url} rel="noopener" target="_blank">
              Merriam-Webster: {CITATIONS.mwColour.title}
            </a>
          </cite>
          ). We leave out brand names, licensed characters and anything that might be
          upsetting, and favor words that are pleasant to read. Every list is our own; we do not copy
          word lists from other puzzle sites.
        </p>
        <p>
          <strong>Placed by a small in-house generator.</strong> A script picks words from the
          theme’s bank, places them in the grid and fills the gaps with random letters. It records
          the exact position of every word, which is how the page knows when you have found one.
          Each grid is generated once and saved, so a puzzle never changes after it is published.
        </p>
        <p>
          <strong>Clear difficulty rules.</strong> These are the settings the generator actually
          uses for the puzzles on the site today:
        </p>
        <ul>
          {LEVELS.map((l) => (
            <li key={l.name}>
              <strong>{l.name}:</strong> {l.size}×{l.size} grid, {l.words} words — {l.rule}
            </li>
          ))}
        </ul>
        <p>
          <strong>Corrections.</strong> If you spot a typo, a misspelled word or a word that does not
          belong, tell us through the <Link href="/contact">contact page</Link>. We fix the list or
          puzzle, and the “Updated” date on that page changes automatically when the fix goes live.
        </p>

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
            <strong>Accessible.</strong> Large print, high contrast and clear, readable pages are a
            priority, not an afterthought. We use the W3C’s{" "}
            <cite><a href={CITATIONS.wcagContrast.url} rel="noopener" target="_blank">WCAG contrast guidance</a></cite>{" "}
            (at least 4.5:1 for normal text) as our yardstick.
          </li>
          <li>
            <strong>Free to play.</strong> No download and no account required. The site is
            supported by advertising.
          </li>
          <li>
            <strong>Honest.</strong> We describe word searches as an enjoyable pastime and make no
            medical or brain-training claims. That follows the evidence: the National Institute on
            Aging says proof of a lasting cognitive benefit from activities like these{" "}
            <q cite={CITATIONS.niaCognitiveHealth.url}>is not definitive</q>, and the{" "}
            <cite><a href={CITATIONS.alzSocBrainTraining.url} rel="noopener" target="_blank">Alzheimer’s Society</a></cite>{" "}
            finds no strong evidence that brain training reduces dementia risk. More in{" "}
            <Link href="/adults">word search for adults</Link>.
          </li>
        </ul>

        <h2 id="promises">Our promises</h2>
        <p>Plain commitments we can keep, and that you can hold us to:</p>
        <ul>
          <li>You will never need an account or sign-up to play.</li>
          <li>The puzzles stay free to play.</li>
          <li>We do not sell your personal information.</li>
          <li>Your puzzle progress stays in your own browser — we do not collect it.</li>
          <li>No countdown timers, and ads (when shown) never cover the puzzle.</li>
          <li>When we get something wrong, we fix it and update the page date.</li>
        </ul>
        <p>
          How we handle data is explained in plain English at the top of our{" "}
          <Link href="/privacy">privacy policy</Link>, and our{" "}
          <Link href="/accessibility">accessibility statement</Link> lists what works today and
          what does not yet.
        </p>

        <h2>Who is it for?</h2>
        <p>
          Our puzzles are written for a general audience of teens and adults, with particular care
          for <Link href="/adults">adults</Link> and seniors. The site is not directed at children
          under 13.
        </p>

        <h2>Corrections and feedback</h2>
        <p>
          Found a typo, a word that does not belong, or a puzzle that is hard to use? Suggestions for
          new themes and accessibility feedback are always welcome — please visit our{" "}
          <Link href="/contact">contact page</Link> or email{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. We correct mistakes
          promptly and update the date at the top of the affected page.
        </p>
      </Prose>
      <Sources items={CITED} />
      <HubSchema
        dates={DATES}
        type="AboutPage"
        name="About Words at Rest"
        description={DESCRIPTION}
        path="/about"
        citations={CITED}
        extra={{ mainEntity: { "@id": PERSON_ID } }}
      />
    </>
  );
}
