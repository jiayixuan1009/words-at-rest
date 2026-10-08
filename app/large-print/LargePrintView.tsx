import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import MobileMore from "@/components/MobileMore";
import PuzzleCard from "@/components/PuzzleCard";
import Prose from "@/components/Prose";
import Byline from "@/components/Byline";
import Faq, { type FaqItem } from "@/components/Faq";
import HubSchema from "@/components/HubSchema";
import Pagination from "@/components/Pagination";
import Picture from "@/components/Picture";
import Sources from "@/components/Sources";
import { CITATIONS } from "@/lib/citations";
import { routeDates } from "@/lib/content-dates";
import { getLargePrintPuzzles, puzzlePath } from "@/lib/data";
import { ART } from "@/lib/images";
import { listPagePath, paginate } from "@/lib/pagination";
import { notFound } from "next/navigation";

export const LARGE_PRINT_CITED = [CITATIONS.acbLargePrint, CITATIONS.wcagContrast, CITATIONS.wcagResizeText];
export const LARGE_PRINT_DATES = routeDates("/large-print");
export const LARGE_PRINT_DESCRIPTION =
  "Free large print word search puzzles for seniors and low vision: big letters, 9×9 grids, high contrast and no timer. Play online on phone, tablet or desktop.";

export const LARGE_PRINT_FAQ: FaqItem[] = [
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
    a: "Yes. Every puzzle on the site has a Grid size switch above the grid. Choose Larger to enlarge the squares, the letters and the word list; your choice is remembered on this device for every puzzle. Harder puzzles still have more words and directions, so start with easy or the large print pack.",
  },
  {
    q: "Can I print these puzzles?",
    a: "Yes. Our printable packs offer free Letter and A4 PDFs with two large print puzzles and answer keys. Visit Printable PDFs in the footer to preview and download them without signing up. You can also play the same grids online.",
  },
  {
    q: "What if the letters are still too small?",
    a: "Combine the Larger grid size with your browser’s zoom: Ctrl and + on Windows, Cmd and + on a Mac, or pinch to zoom on a phone or tablet. A tablet held in landscape usually gives the most comfortable view.",
  },
];

const BASE = "/large-print";

export default function LargePrintView({ page }: { page: number }) {
  const all = getLargePrintPuzzles();
  const slice = paginate(all, page);
  if (page < 1 || page > slice.totalPages) notFound();

  const path = listPagePath(BASE, page);
  const heading = page > 1 ? `Large print word search — page ${page}` : "Large print word search";
  const crumb = page > 1 ? `Large Print · page ${page}` : "Large Print";

  return (
    <>
      <Breadcrumbs items={[{ name: crumb, href: path }]} />
      <div className="overflow-hidden rounded-sm border border-[#d4cbb8]">
        <div className="grid sm:grid-cols-2">
          <div className="flex flex-col justify-center bg-[#ebe4d6]/50 p-8 sm:p-10">
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">{heading}</h1>
            {all[0] && (
              <Link href={puzzlePath(all[0])} className="btn-primary mt-4 self-start">
                Play a 9×9 puzzle
              </Link>
            )}
            <Byline dates={LARGE_PRINT_DATES} />
            <p className="mt-4 text-xl leading-relaxed text-[var(--ink-soft)]">
              Bigger letters, smaller 9×9 grids, strong contrast, and words that read only across or down. No timer —
              just a calm puzzle at your own pace.
            </p>
          </div>
          <Picture
            art={ART.largePrintPromo}
            priority
            desktopOnly
            sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw"
            className="hidden aspect-[4/3] h-full w-full object-cover sm:block sm:aspect-auto"
          />
        </div>
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)]">
        You can also switch <strong className="text-[var(--ink)]">any</strong> puzzle on the site to the Larger grid
        size using the switch above the grid. Your choice is remembered on this device.
      </p>
      {page === 1 && <p className="mt-4 text-lg"><Link href="/printables">Prefer paper? Download free large print PDFs with answer keys</Link>.</p>}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <h2 className="font-serif text-3xl">
            Large print puzzles ({slice.total})
            {page > 1 ? (
              <span className="ml-2 font-sans text-lg font-normal text-stone-500">· page {page}</span>
            ) : null}
          </h2>
          <div className="mt-2">
            {slice.items.map((p) => (
              <PuzzleCard key={p.id} puzzle={p} />
            ))}
          </div>
          <Pagination
            basePath={BASE}
            page={slice.page}
            totalPages={slice.totalPages}
            total={slice.total}
            from={slice.from}
            to={slice.to}
            label="large print puzzles"
          />
        </div>
        <figure className="hidden sm:block">
          <Picture
            art={ART.largePrintComfort}
            sizes="(min-width: 1024px) 420px, 92vw"
            className="aspect-[3/2] w-full object-contain"
          />
          <figcaption className="mt-2 font-sans text-base text-[var(--ink-soft)]">
            Large print grids scale to fill a tablet held in landscape.
          </figcaption>
        </figure>
      </div>

      {page === 1 ? (
        <>
          <div className="mt-12">
            <Prose>
              <MobileMore id="large-print">
                <h2>What makes a word search easy to read?</h2>
                <p>
                  Most printed and online word searches squeeze 15 or more rows of small letters onto a page. That is fine
                  for some readers, but tiring for many others — especially on a phone. Our large print puzzles change four
                  things at once:
                </p>
                <ul>
                  <li>
                    <strong>Bigger letters.</strong> Grid letters are about one and a half to two times the size of those
                    on our standard puzzles, and the word list grows with them.
                  </li>
                  <li>
                    <strong>Fewer letters.</strong> A 9×9 grid has 81 letters, compared with 225 in a 15×15 hard puzzle —
                    far less to scan.
                  </li>
                  <li>
                    <strong>Simple directions.</strong> Words read only across (left to right) or down (top to bottom).
                    Nothing is hidden backwards or diagonally.
                  </li>
                  <li>
                    <strong>Short, familiar words.</strong> Eight everyday words per puzzle — teapot, meadow, kettle,
                    birdsong — easy to recognize at a glance.
                  </li>
                </ul>
                <h2>How big is “large print”?</h2>
                <p>
                  For printed documents, the{" "}
                  <cite>
                    <a href={CITATIONS.acbLargePrint.url} rel="noopener" target="_blank">
                      large print guidelines
                    </a>
                  </cite>{" "}
                  of the American Council of the Blind set the base font at{" "}
                  <q cite={CITATIONS.acbLargePrint.url}>{CITATIONS.acbLargePrint.quote}</q>. On a screen, 18 point is about
                  24 CSS pixels (the W3C’s accessibility guidance uses the same conversion). That is where our large print
                  grid letters start on a phone, and they grow to 36 pixels on tablets and computers.
                </p>
                <p>
                  Contrast matters as much as size. The W3C’s{" "}
                  <cite>
                    <a href={CITATIONS.wcagContrast.url} rel="noopener" target="_blank">
                      contrast guidance
                    </a>
                  </cite>{" "}
                  notes that <q cite={CITATIONS.wcagContrast.url}>{CITATIONS.wcagContrast.quote}</q>, and sets a minimum
                  contrast ratio of 4.5:1 for normal text with that in mind. Our grid letters are dark brown ink (#2c241b)
                  on cream (#faf6ee), a ratio of about 14:1.
                </p>
                <h2>Who are large print puzzles for?</h2>
                <p>
                  Large print word searches suit seniors, people with low vision or tired eyes, anyone recovering from eye
                  surgery, and players who simply prefer a relaxed grid. They also work well for shared solving — a
                  grandparent and grandchild on one tablet, or an activity session in a care home where the screen is a
                  little further away.
                </p>
                <h2>Tips for comfortable solving</h2>
                <ul>
                  <li>Use a tablet or computer if you have one; the grid scales up to fill the screen.</li>
                  <li>Turn up your screen brightness, or play in a well-lit room to reduce glare.</li>
                  <li>Read the word list aloud once before you start — it helps the words stand out.</li>
                  <li>
                    Tap the first letter and then the last letter instead of dragging, if that is easier on your hands.
                  </li>
                  <li>Take breaks. Progress is saved, so you can finish the puzzle later.</li>
                  <li>
                    Zoom in whenever you like. Web accessibility guidelines (WCAG 2.2) ask that{" "}
                    <q cite={CITATIONS.wcagResizeText.url}>{CITATIONS.wcagResizeText.quote.replace(/\.$/, "")}</q> —
                    browser zoom is the built-in way to do it.
                  </li>
                </ul>
              </MobileMore>
              <p>
                Looking for a gentle next step? Try our <Link href="/difficulty/easy">easy word searches</Link>, today’s{" "}
                <Link href="/daily">daily puzzle</Link> with the Larger grid size, or read{" "}
                <Link href="/how-to-play">how to play</Link>.
              </p>
            </Prose>
          </div>
          <Sources items={LARGE_PRINT_CITED} />
          <Faq items={LARGE_PRINT_FAQ} path="/large-print" heading="Large print word search: common questions" />
        </>
      ) : (
        <p className="mt-10 text-lg text-stone-700">
          <Link href={BASE}>← Back to large print overview</Link>
          <span className="mx-3 text-stone-400">·</span>
          <Link href="/difficulty/easy">Easy puzzles</Link>
        </p>
      )}
      <HubSchema
        dates={LARGE_PRINT_DATES}
        type="CollectionPage"
        name={heading}
        description={LARGE_PRINT_DESCRIPTION}
        path={path}
        image="/og/large-print.jpg"
        citations={page === 1 ? LARGE_PRINT_CITED : undefined}
      />
    </>
  );
}
