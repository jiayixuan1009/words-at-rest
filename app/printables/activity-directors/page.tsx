import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import HubSchema from "@/components/HubSchema";
import Faq, { type FaqItem } from "@/components/Faq";
import { PRINTABLES } from "@/lib/printables";
import { datesFor } from "@/lib/content-dates";
import { seo } from "@/lib/seo";

const description =
  "Free printable word search guidance for activity directors and senior centers: Letter vs A4, withholding answer keys, and calm large print packs — no email gate.";

export const metadata = seo({
  title: "Activity Director Kit — Free Printable Word Searches",
  description,
  path: "/printables/activity-directors",
});

const FAQ: FaqItem[] = [
  {
    q: "Do we need an account or email to download?",
    a: "No. Every printable pack downloads immediately as a static PDF. There is no mailing list gate and no account.",
  },
  {
    q: "May we photocopy sheets for a senior center or library?",
    a: "Yes. Sheets are free for personal, classroom and community activity use. Keep the Words at Rest credit line on each page when you share or photocopy.",
  },
  {
    q: "How do we keep answer keys away from participants?",
    a: "Each PDF alternates puzzle pages (odd) and answer keys (even). Print only the odd pages, or print the full file and remove the even pages before handing sheets out.",
  },
  {
    q: "Letter or A4 — what if our printer tray is mixed?",
    a: "Match the PDF to the paper in the tray. Letter files are sized for 8.5×11 in; A4 files for international A4. Always print at actual size (100%), not “fit to page.”",
  },
];

function packCard(slug: string, blurb: string) {
  const pack = PRINTABLES.find((p) => p.slug === slug);
  if (!pack) return null;
  return (
    <li key={slug} className="rounded-sm border border-[#d4cbb8] p-5">
      <h3 className="font-serif text-2xl">
        <Link href={`/printables/${pack.slug}`}>{pack.name}</Link>
      </h3>
      <p className="mt-2">{blurb}</p>
      <p className="mt-3 text-base">
        {pack.ids.length} puzzles · {pack.ids.length} answer keys · Letter or A4
      </p>
      <Link href={`/printables/${pack.slug}`} className="btn-primary mt-4">
        Preview & download
      </Link>
    </li>
  );
}

export default function ActivityDirectorsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Printables", href: "/printables" },
          { name: "Activity Director Kit", href: "/printables/activity-directors" },
        ]}
      />
      <h1 className="font-serif text-4xl">Activity Director Kit</h1>
      <p className="mt-4 max-w-3xl text-lg">
        A short guide for activity directors, senior centers, libraries and home facilitators who want calm large print word searches without ads over the print area, without an email gate and without franchise characters.
      </p>
      <p className="mt-3 max-w-3xl text-lg">
        Prefer the screen for a mixed group? Open <Link href="/large-print">large print online</Link> or <Link href="/daily">today&apos;s daily puzzle</Link>. All printable packs live on the <Link href="/printables">printables index</Link>.
      </p>

      <section className="mt-10 max-w-3xl space-y-3 text-lg">
        <h2 className="font-serif text-2xl">Letter vs A4</h2>
        <p>
          Download the <strong>Letter</strong> PDF when your paper is US Letter (8.5×11 in). Download the <strong>A4</strong> PDF for international A4. Printing the wrong size and choosing “fit to page” can shrink the 24-point letters — always print at actual size (100%).
        </p>
      </section>

      <section className="mt-8 max-w-3xl space-y-3 text-lg">
        <h2 className="font-serif text-2xl">Puzzle pages vs answer keys</h2>
        <p>
          Every pack PDF places puzzles on the odd pages and answer keys on the even pages. For a group activity, print only the odd pages, or print the full file and withhold the keys at the facilitator desk. Participants can circle with a pen or highlighter; there are no diagonals, backwards words or timers.
        </p>
      </section>

      <section className="mt-8 max-w-3xl space-y-3 text-lg">
        <h2 className="font-serif text-2xl">Group activity tips</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>One puzzle per person or shared table works well for a 15–25 minute quiet block.</li>
          <li>Leave a small stack on a side table for drop-in solvers between other programs.</li>
          <li>Pair a seasonal pack with an evergreen pack so returning guests still have a fresh sheet.</li>
          <li>Large print online is useful when you have tablets but limited printer access.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Recommended packs</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {packCard(
            "large-print",
            "Six everyday large print puzzles — gardens, harbors, kitchens and quiet rooms. Best year-round starter for activity rooms.",
          )}
          {packCard(
            "thanksgiving",
            "Six Thanksgiving large print puzzles about home, sharing, harvest and a warm meal — calm November sessions with answer keys.",
          )}
          {packCard(
            "christmas",
            "Six Christmas large print puzzles with calm gift, winter and celebration words — adult-friendly December vocabulary only.",
          )}
          {packCard(
            "halloween",
            "Two gentle Halloween puzzles with candlelit porches and soft seasonal words — an evergreen autumn option when you want variety.",
          )}
        </ul>
      </section>

      <section className="mt-10 max-w-3xl space-y-3 text-lg">
        <h2 className="font-serif text-2xl">Permission and credit</h2>
        <p>
          Sheets are free for personal, classroom and community activity use, including libraries and senior centers. Keep the Words at Rest credit on each page when you photocopy or share. No account and no email address are required.
        </p>
        <p>
          Browse <Link href="/printables">all printable packs</Link>, play <Link href="/large-print">large print online</Link> or open <Link href="/daily">today&apos;s daily puzzle</Link>.
        </p>
      </section>

      <Faq items={FAQ} path="/printables/activity-directors" heading="Activity director questions" />

      <HubSchema
        name="Activity Director Kit — free printable word searches"
        description={description}
        path="/printables/activity-directors"
        dates={datesFor("app/printables/activity-directors/page.tsx", "data/printables.json")}
      />
    </>
  );
}
