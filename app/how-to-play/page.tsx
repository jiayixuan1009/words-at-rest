import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Play Word Search Online",
  description:
    "How to play word search online at Words at Rest: drag or tap to select words, use large print, and choose the right difficulty. Simple tips for relaxed solving.",
  alternates: { canonical: "/how-to-play" },
};

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

export default function HowToPlayPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "How to Play", href: "/how-to-play" }]} />
      <Prose>
        <h1 className="text-4xl font-semibold tracking-tight">How to play word search online</h1>
        <p>
          A word search is a grid of letters with a list of words hidden inside it. Your goal is to
          find every word on the list. Words run in straight lines — across, down, diagonally, and
          on harder puzzles, backwards too.
        </p>
        <h2>Step by step</h2>
        <ol>
          {STEPS.map((s) => (
            <li key={s.name}>
              <strong>{s.name}.</strong> {s.text}
            </li>
          ))}
        </ol>
        <h2>Difficulty levels</h2>
        <ul>
          <li><strong>Easy</strong> — 10×10 grid, words read across or down only.</li>
          <li><strong>Medium</strong> — 12×12 grid, adds diagonal words.</li>
          <li><strong>Hard</strong> — 15×15 grid, words in all eight directions, including backwards.</li>
        </ul>
        <h2>Large print and comfort</h2>
        <p>
          Press <em>Large print</em> above any grid for bigger letters and a list that is easier to
          read. The setting is remembered on your device. You can also use your browser’s zoom
          (Ctrl/Cmd and +) at any time.
        </p>
        <h2>Solving tips</h2>
        <ul>
          <li>Scan for unusual letters first — Q, Z, X, J and K stand out quickly.</li>
          <li>Look for double letters such as “LL” or “EE”.</li>
          <li>Work one row at a time, then one column at a time.</li>
          <li>On hard puzzles, remember to read right to left and bottom to top.</li>
        </ul>
        <p>
          Ready? Try <Link href="/daily">today’s daily puzzle</Link> or browse{" "}
          <Link href="/themes">all themes</Link>.
        </p>
      </Prose>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to play word search online",
          url: absoluteUrl("/how-to-play"),
          step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
        }}
      />
    </>
  );
}
