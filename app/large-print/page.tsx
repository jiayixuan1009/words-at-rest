import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleCard from "@/components/PuzzleCard";
import Prose from "@/components/Prose";
import Byline from "@/components/Byline";
import Faq, { type FaqItem } from "@/components/Faq";
import HubSchema from "@/components/HubSchema";
import { getLargePrintPuzzles } from "@/lib/data";
import { ART } from "@/lib/images";
import Picture from "@/components/Picture";
import { seo } from "@/lib/seo";

const DESCRIPTION =
  "Free large print word search puzzles for seniors and low vision: big letters, 9×9 grids, high contrast and no timer. Play online on phone, tablet or desktop.";

export const metadata: Metadata = seo({
  title: "Large Print Word Search for Seniors — Free",
  description: DESCRIPTION,
  path: "/large-print",
  image: "/og/large-print.jpg",
  imageAlt: "Large print word search — Words at Rest",
});

const FAQ: FaqItem[] = [
  {
    q: "What is a large print word search?",
    a: "A large print word search is a word search designed to be easy to read: bigger letters, fewer rows and columns, more space between letters and strong contrast. On Words at Rest, large print puzzles use a 9×9 grid with eight words that read only across or down.",
  },
  {
    q: "Are these word searches good for seniors?",
    a: "They were made with older adults in mind. The letters are large, the grids are small enough to scan comfortably, there is no timer or score, and nothing flashes or moves. You also do not need an account, an app or an email address to play.",
  },
  {
    q: "Can I make any puzzle large print?",
    a: "Yes. Every puzzle on the site has a Large print button above the grid. It enlarges the letters and the word list, and your choice is remembered on this device. Harder puzzles still have more words and directions, so start with easy or the large print pack.",
  },
  {
    q: "Can I print these puzzles?",
    a: "The puzzles are designed to be played on screen, where words are marked for you and progress is saved. You can use your browser’s print command, but we do not yet offer dedicated printable PDF sheets.",
  },
  {
    q: "What if the letters are still too small?",
    a: "Combine the Large print button with your browser’s zoom: Ctrl and + on Windows, Cmd and + on a Mac, or pinch to zoom on a phone or tablet. A tablet held in landscape usually gives the most comfortable view.",
  },
];

export default function LargePrintPage() {
  const puzzles = getLargePrintPuzzles();
  return (
    <>
      <Breadcrumbs items={[{ name: "Large Print", href: "/large-print" }]} />
      <div className="overflow-hidden rounded-sm border border-[#d4cbb8]">
        <div className="grid sm:grid-cols-2">
          <div className="flex flex-col justify-center bg-[#ebe4d6]/50 p-8 sm:p-10">
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Large print word search</h1>
            <Byline />
            <p className="mt-4 text-xl leading-relaxed text-[var(--ink-soft)]">
              Bigger letters, smaller 9×9 grids, strong contrast, and words that read only across or
              down. No timer — just a calm puzzle at your own pace.
            </p>
          </div>
          <Picture
            art={ART.largePrintPromo}
            priority
            sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto"
          />
        </div>
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)]">
        You can also switch <strong className="text-[var(--ink)]">any</strong> puzzle on the site to
        large print with the button above the grid. Your choice is remembered on this device.
      </p>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <h2 className="font-serif text-3xl">Large print puzzles</h2>
          <div className="mt-2">
            {puzzles.map((p) => (
              <PuzzleCard key={p.id} puzzle={p} />
            ))}
          </div>
        </div>
        <figure>
          <Picture art={ART.largePrintComfort} sizes="(min-width: 1024px) 420px, 92vw" className="aspect-[3/2] w-full object-contain" />
          <figcaption className="mt-2 font-sans text-sm italic text-[var(--ink-soft)]">
            Large print grids scale to fill a tablet held in landscape.
          </figcaption>
        </figure>
      </div>

      <div className="mt-12">
        <Prose>
          <h2>What makes a word search easy to read?</h2>
          <p>
            Most printed and online word searches squeeze 15 or more rows of small letters onto a
            page. That is fine for some readers, but tiring for many others — especially on a phone.
            Our large print puzzles change four things at once:
          </p>
          <ul>
            <li>
              <strong>Bigger letters.</strong> Grid letters are about one and a half to nearly two
              times the size of standard print, and the word list grows with them.
            </li>
            <li>
              <strong>Fewer letters.</strong> A 9×9 grid has 81 letters, compared with 225 in a
              15×15 hard puzzle — far less to scan.
            </li>
            <li>
              <strong>Simple directions.</strong> Words read only across (left to right) or down
              (top to bottom). Nothing is hidden backwards or diagonally.
            </li>
            <li>
              <strong>Short, familiar words.</strong> Eight everyday words per puzzle — teapot,
              meadow, kettle, birdsong — easy to recognise at a glance.
            </li>
          </ul>
          <h2>Who are large print puzzles for?</h2>
          <p>
            Large print word searches suit seniors, people with low vision or tired eyes, anyone
            recovering from eye surgery, and players who simply prefer a relaxed grid. They also work
            well for shared solving — a grandparent and grandchild on one tablet, or an activity
            session in a care home where the screen is a little further away.
          </p>
          <h2>Tips for comfortable solving</h2>
          <ul>
            <li>Use a tablet or computer if you have one; the grid scales up to fill the screen.</li>
            <li>Turn up your screen brightness, or play in a well-lit room to reduce glare.</li>
            <li>Read the word list aloud once before you start — it helps the words stand out.</li>
            <li>
              Tap the first letter and then the last letter instead of dragging, if that is easier
              on your hands.
            </li>
            <li>Take breaks. Progress is saved, so you can finish the puzzle later.</li>
          </ul>
          <p>
            Looking for a gentle next step? Try our{" "}
            <Link href="/difficulty/easy">easy word searches</Link>, today’s{" "}
            <Link href="/daily">daily puzzle</Link> with large print switched on, or read{" "}
            <Link href="/how-to-play">how to play</Link>.
          </p>
        </Prose>
      </div>
      <Faq items={FAQ} heading="Large print word search: common questions" />
      <HubSchema
        type="CollectionPage"
        name="Large print word search"
        description={DESCRIPTION}
        path="/large-print"
        image="/og/large-print.jpg"
      />
    </>
  );
}
