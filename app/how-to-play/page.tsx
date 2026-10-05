import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import JsonLd from "@/components/JsonLd";
import Byline from "@/components/Byline";
import DifficultyTable from "@/components/DifficultyTable";
import Faq, { type FaqItem } from "@/components/Faq";
import HubSchema from "@/components/HubSchema";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import { absoluteUrl } from "@/lib/site";
import { seo } from "@/lib/seo";

const DESCRIPTION =
  "How to play word search online: what a word search is, how to select words by dragging or tapping, difficulty levels compared, large print, and simple solving tips.";

export const metadata: Metadata = seo({
  title: "How to Play Word Search — Rules & Tips",
  description: DESCRIPTION,
  path: "/how-to-play",
  image: "/og/how-to-play.jpg",
  imageAlt: "How to play word search — Words at Rest",
});

const STEPS = [
  { name: "Pick a puzzle", text: "Choose today’s daily puzzle, a theme, or a difficulty level." },
  { name: "Read the word list", text: "The words to find are listed beside (or below) the grid." },
  {
    name: "Select a word",
    text: "Drag across the letters of a word, or tap its first letter and then its last letter.",
  },
  { name: "Watch it highlight", text: "Found words stay highlighted in the grid and are crossed off the list." },
  { name: "Finish at your pace", text: "There is no timer. Your progress is saved on this device." },
];

const FAQ: FaqItem[] = [
  {
    q: "How do you play word search on a phone or tablet?",
    a: "Tap the first letter of the word, then tap its last letter — the letters in between are selected for you. You can also drag your finger across the word. If the letters feel small, press Large print above the grid for bigger letters.",
  },
  {
    q: "Can words go backwards or diagonally?",
    a: "It depends on the level. On easy puzzles every word reads forwards, across or down. Medium puzzles add diagonal words. Hard puzzles hide words in all eight directions, including backwards, upwards and diagonally upwards. Large print puzzles only use across and down.",
  },
  {
    q: "Is there a time limit?",
    a: "No. None of our puzzles has a timer, score or countdown. You can stop at any point; progress is saved in your browser on this device, so you can come back later and pick up where you left off.",
  },
  {
    q: "What if I can’t find the last word?",
    a: "Take a short break and come back with fresh eyes — it works surprisingly often. Then scan one row at a time, look for the word’s rarest letter, and on harder puzzles remember to read right to left and bottom to top.",
  },
  {
    q: "Can letters be shared between two words?",
    a: "Yes. Words can cross each other and share a letter, just like in a printed word search. A letter that is already highlighted can still be part of another word, so do not skip it when you scan.",
  },
];

export default function HowToPlayPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "How to Play", href: "/how-to-play" }]} />
      <div className="mb-10 overflow-hidden rounded-sm border border-[#d4cbb8]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES.howTo} alt={IMAGE_ALT.howTo} className="aspect-[21/9] w-full object-cover" />
      </div>
      <Prose>
        <h1 className="font-serif text-4xl tracking-tight">How to play word search online</h1>
        <Byline />
        <h2>What is a word search?</h2>
        <p id="definition" className="definition rounded-sm border-l-4 border-[var(--moss)] bg-[#ebe4d6]/50 py-3 pl-4">
          <strong className="text-[var(--ink)]">A word search</strong> is a puzzle made of a square
          grid of letters with a list of words hidden inside it. The goal is to find and mark every
          word on the list. Words run in straight lines — across, down or diagonally — and on harder
          puzzles they can also read backwards.
        </p>
        <p>
          Word searches are sometimes called word finds, word seeks or wordsearch puzzles. They need
          no special knowledge — if you can read the list, you can solve the puzzle — which is why
          they are a favourite for quiet breaks, waiting rooms and family tables. Online, the grid
          marks words for you, so there is no pencil to lose.
        </p>

        <h2>How do you play? Step by step</h2>
        <ol>
          {STEPS.map((s) => (
            <li key={s.name}>
              <strong>{s.name}.</strong> {s.text}
            </li>
          ))}
        </ol>
        <p>
          With a mouse, click and hold on the first letter and drag to the last one. If dragging feels
          awkward — on a small touchscreen or with an unsteady hand — the tap-tap method is easier: select the first letter, then the last
          letter, and the word is checked automatically. If your selection is not on the list,
          nothing happens — there is no penalty for a wrong guess.
        </p>

        <h2>What are the difficulty levels?</h2>
        <p>
          Every puzzle on Words at Rest uses one of four layouts. The grid size, number of words and
          allowed directions change from level to level:
        </p>
      </Prose>
      <div className="max-w-3xl">
        <DifficultyTable />
      </div>
      <Prose>
        <p>
          If you are new to word searches, start with <Link href="/difficulty/easy">easy</Link> or{" "}
          <Link href="/large-print">large print</Link>. Move to{" "}
          <Link href="/difficulty/medium">medium</Link> once you can finish an easy grid without
          help, and try <Link href="/difficulty/hard">hard</Link> when you want a longer search.
        </p>

        <h2>How do I make the letters bigger?</h2>
        <p>
          Press <em>Large print</em> above any grid for bigger letters and a list that is easier to
          read. The setting is remembered on your device. You can also use your browser’s zoom
          (Ctrl and + on Windows, Cmd and + on a Mac, or pinch to zoom on a phone) at any time. For
          the most comfortable experience, our <Link href="/large-print">large print puzzles</Link>{" "}
          use a smaller 9×9 grid and only eight words.
        </p>

        <h2>Solving tips</h2>
        <ul>
          <li>Scan for unusual letters first — Q, Z, X, J and K stand out quickly.</li>
          <li>Look for double letters such as “LL” or “EE”.</li>
          <li>Find the longest words first; short words are easier once the grid thins out.</li>
          <li>Work one row at a time, then one column at a time.</li>
          <li>On hard puzzles, remember to read right to left and bottom to top.</li>
          <li>Take a break if you get stuck — fresh eyes find hidden words faster.</li>
        </ul>
        <p>
          Ready? Try <Link href="/daily">today’s daily puzzle</Link> or browse{" "}
          <Link href="/themes">all themes</Link>.
        </p>
      </Prose>
      <Faq items={FAQ} heading="How to play: frequently asked questions" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to play word search online",
          description: "Find every hidden word in a grid of letters by dragging across it or tapping its first and last letter.",
          url: absoluteUrl("/how-to-play"),
          image: absoluteUrl("/og/how-to-play.jpg"),
          totalTime: "PT10M",
          step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
        }}
      />
      <HubSchema
        name="How to play word search online"
        description={DESCRIPTION}
        path="/how-to-play"
        image="/og/how-to-play.jpg"
        speakable={["#definition", ".faq-answer"]}
      />
    </>
  );
}
