import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import Byline from "@/components/Byline";
import HubSchema from "@/components/HubSchema";
import Sources from "@/components/Sources";
import { CITATIONS } from "@/lib/citations";
import { routeDates } from "@/lib/content-dates";
import { getLargePrintPuzzles } from "@/lib/data";
import { formatIsoDate, seo } from "@/lib/seo";
import { SITE } from "@/lib/site";

/*
 * Accessibility statement. Keep every line TRUE to the current code — this page
 * was written from measured behavior on 2026-10-06 (Playwright, 390px + 1280px):
 * - Grid cells are not focusable and have no key handlers → no keyboard selection.
 * - Grid cell size on a 390px phone: easy 34px, medium 29px, hard 23px, large print 38px.
 * - Large print toggle: letters 16→24px (phone) / 20→36px (≥640px); word list 24px.
 * - Contrast on the paper background (#f4efe6): ink 13.3:1, secondary 6.6:1, links 6.7:1;
 *   crossed-out found words (#a89880) only 2.5:1 — listed as a known issue.
 * - No horizontal scrolling at 320px or 640px wide (≈ 400% / 200% zoom of 1280px).
 * Update this comment and the copy whenever any of these change.
 */

const CITED = [CITATIONS.wcagContrast, CITATIONS.wcagResizeText];

const DATES = routeDates("/accessibility");

const DESCRIPTION =
  "Accessibility statement for Words at Rest: large print mode, text size, contrast, keyboard and screen reader support, mobile tap targets, known issues, and how to report a problem.";

export const metadata: Metadata = seo({
  title: "Accessibility Statement",
  description: DESCRIPTION,
  path: "/accessibility",
});

export default function AccessibilityPage() {
  const lpCount = getLargePrintPuzzles().length;
  return (
    <>
      <Breadcrumbs items={[{ name: "Accessibility", href: "/accessibility" }]} />
      <Prose>
        <h1 className="text-4xl font-semibold tracking-tight">Accessibility statement</h1>
        <Byline dates={DATES} />
        <p>
          {SITE.name} is made for adults and seniors, many of whom read with tired eyes, use a phone
          or tablet, or rely on browser zoom. We want every puzzle to be comfortable to read and
          play. This page explains what works today, what does not work yet, and how to tell us
          about a problem.
        </p>

        <h2 id="standard">Our goal: WCAG 2.2 Level AA</h2>
        <p>
          We aim to meet the W3C’s Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA —
          for example the{" "}
          <cite><a href={CITATIONS.wcagContrast.url} rel="noopener" target="_blank">contrast minimum</a></cite>{" "}
          of 4.5:1 for normal text, and{" "}
          <cite><a href={CITATIONS.wcagResizeText.url} rel="noopener" target="_blank">text that can be resized</a></cite>{" "}
          to 200 percent without losing content. We have not had an independent audit, and the site
          does not fully meet that goal yet; the known gaps are listed below.
        </p>

        <h2 id="large-print">Large print</h2>
        <ul>
          <li>
            Every puzzle has a <strong>Large print</strong> button above the grid. It makes the
            letters 50% bigger on phones (16px to 24px) and nearly twice as big on larger screens
            (20px to 36px), and enlarges the word list. Your choice is remembered in your browser.
          </li>
          <li>
            We also publish {lpCount} dedicated <Link href="/large-print">large print puzzles</Link>:
            a smaller 9×9 grid with eight words that read only across or down.
          </li>
        </ul>

        <h2 id="text-size">Text size and zoom</h2>
        <p>
          Text sizes are set in relative units, so your browser’s text-size setting and zoom both
          work. Pages reflow to a single column on narrow screens; at 320 pixels wide (the
          equivalent of 400% zoom on a laptop) there is no sideways scrolling.
        </p>

        <h2 id="contrast">Color and contrast</h2>
        <p>
          The site uses dark ink on a warm paper background. Body text has a contrast ratio of
          about 13:1, secondary text about 6.6:1 and links about 6.7:1 — all above the 4.5:1 WCAG
          minimum. Found words are highlighted in the grid with a color and also crossed out in the
          word list, so color is not the only signal.
        </p>

        <h2 id="keyboard">Keyboard</h2>
        <p>
          All links and buttons — the main menu, the Large print and Reset buttons, and the footer —
          can be reached with the Tab key and show a clear orange focus outline. A “Skip to
          content” link appears on the first Tab press.
        </p>
        <p>
          <strong>Not yet supported:</strong> selecting letters in the grid with the keyboard. Finding
          a word currently needs a mouse, touchscreen or pen (drag across the word, or tap its first
          and last letters). Keyboard selection is the top item on our accessibility to-do list.
        </p>

        <h2 id="screen-readers">Screen readers</h2>
        <p>
          The letter grid is marked up as a grid of rows and cells, so a screen reader can read it
          letter by letter, and the word list is a normal list. The “found” counter above the grid
          is announced when it changes. Because words cannot yet be selected without a pointer,
          the puzzles are not fully playable with a screen reader alone, and found words in the list
          are shown crossed out without a spoken label. We have not yet completed testing with
          VoiceOver, TalkBack or NVDA.
        </p>

        <h2 id="touch">Phones and tap targets</h2>
        <ul>
          <li>Main menu links and puzzle buttons are at least 40 pixels tall.</li>
          <li>
            You can tap the first letter and then the last letter of a word instead of dragging,
            which is easier with a shaky hand or a small screen.
          </li>
          <li>
            Grid letters are smaller than that on a phone. On a typical 390-pixel-wide phone a
            letter square is about 34px on easy puzzles, 29px on medium and 23px on hard. If that is
            too small, try a <Link href="/large-print">large print puzzle</Link> (about 38px), an
            easy puzzle, or a tablet.
          </li>
          <li>Nothing flashes, there is no sound, and there are no countdown timers.</li>
        </ul>

        <h2 id="known-issues">Known issues</h2>
        <ul>
          <li>No keyboard selection of words in the grid (see above).</li>
          <li>Found words are not announced in the word list by screen readers.</li>
          <li>
            Crossed-out words in the word list are shown in a lighter color with a contrast of about
            2.5:1, below the 4.5:1 minimum.
          </li>
          <li>Grid letter squares on medium and hard puzzles are below 40px on small phones.</li>
        </ul>

        <h2 id="feedback">Report a problem</h2>
        <p>
          If something is hard to read or use, please tell us through our{" "}
          <Link href="/contact">contact page</Link> or email{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> with “Accessibility” in the
          subject. It helps to include the page address, your device and browser, and any assistive
          technology you use. {SITE.editor.name} reads every message.
        </p>
        <p>
          This statement was last reviewed on{" "}
          <time dateTime={DATES.modified}>{formatIsoDate(DATES.modified)}</time>.
        </p>
      </Prose>
      <Sources items={CITED} />
      <HubSchema
        dates={DATES}
        name="Accessibility statement"
        description={DESCRIPTION}
        path="/accessibility"
        citations={CITED}
      />
    </>
  );
}
