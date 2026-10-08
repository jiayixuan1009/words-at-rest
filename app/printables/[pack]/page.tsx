import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import HubSchema from "@/components/HubSchema";
import DownloadLink from "@/components/DownloadLink";
import Faq, { type FaqItem } from "@/components/Faq";
import { PRINTABLES } from "@/lib/printables";
import { getPuzzles, puzzlePath } from "@/lib/data";
import { datesFor } from "@/lib/content-dates";
import { seo } from "@/lib/seo";

type Props = { params: Promise<{ pack: string }> };
export const dynamic = "force-dynamic";
export function generateStaticParams() { return PRINTABLES.map(p => ({ pack: p.slug })); }

const LARGE_PRINT_FAQ: FaqItem[] = [
  {
    q: "How large are the letters on the PDF?",
    a: "Grid letters print at 24 points when you choose Print at actual size (100%). Word lists use 18-point type. Sheets are high-contrast black on white, with no grey backgrounds behind the grid.",
  },
  {
    q: "Do any words run diagonally or backwards?",
    a: "No. Every word in this Everyday Large Print pack reads left to right or top to bottom only. There are no diagonals, no reverse words and no timers — the same calm rules as our online large print puzzles.",
  },
  {
    q: "Can senior centers and activity directors photocopy these?",
    a: "Yes. The sheets are free for personal, classroom and community activity use, including libraries and senior centers. Keep the Words at Rest credit on each page when you share or photocopy. No account or email is required.",
  },
  {
    q: "Letter or A4 — which file should I download?",
    a: "Download the Letter PDF for US Letter paper (8.5×11 in) or the A4 PDF for international A4. Print only the puzzle pages if you want to keep answer keys separate for facilitators.",
  },
  {
    q: "Can I play the same puzzles online?",
    a: "Yes. Each preview below links to the matching online grid. You can also browse the full large print catalog or today’s daily puzzle if you prefer the screen.",
  },
];

const CHRISTMAS_FAQ: FaqItem[] = [
  {
    q: "How large are the Christmas PDF letters?",
    a: "Grid letters print at 24 points at actual size (100%). Word lists use 18-point type on high-contrast black-on-white sheets — the same large print standard as our Everyday pack.",
  },
  {
    q: "Are the Christmas words calm and adult-friendly?",
    a: "Yes. The six puzzles use quiet gift, winter and celebration English — cocoa, wreaths, carols, parcels and soft home words. There are no franchise characters, brand names or noisy kids-party lists.",
  },
  {
    q: "Can activity directors photocopy these for December programs?",
    a: "Yes. Free for personal, classroom and community activity use, including senior centers and libraries. Keep the Words at Rest credit when sharing. No email gate and no account.",
  },
  {
    q: "Letter or A4 — which Christmas file should I print?",
    a: "Choose Letter for US Letter paper or A4 for international A4. Odd pages are puzzles; even pages are answer keys, so you can withhold solutions for group activities.",
  },
  {
    q: "Where else can I find Christmas or holiday puzzles?",
    a: "Play more Christmas grids online, browse the holidays hub, or download Everyday large print and Thanksgiving sheets from the printables index.",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).pack;
  const found = PRINTABLES.find(p => p.slug === slug);
  if (!found) return { title: "Printable not found", robots: { index: false } };
  const n = found.ids.length;
  const title = slug === "large-print"
    ? "Everyday Large Print Word Search PDFs — Free"
    : slug === "christmas"
      ? "Christmas Large Print Word Search PDFs — Free"
      : `${found.name} Word Search — Free PDFs`;
  const description = slug === "large-print"
    ? `${n} free large print word search PDFs for seniors: 9×9 grids, 24pt letters, answer keys, Letter and A4. No sign-up.`
    : slug === "christmas"
      ? `${n} free Christmas large print word search PDFs: calm gift and winter words, 9×9 grids, 24pt letters, Letter and A4. No sign-up.`
      : `${found.description} Free A4 and Letter downloads with answer keys. No sign-up.`;
  return seo({ title, description, path: `/printables/${slug}` });
}

export default async function PrintablePage({ params }: Props) {
  const slug = (await params).pack;
  const pack = PRINTABLES.find(p => p.slug === slug);
  if (!pack) notFound();
  const puzzles = pack.ids.map(id => getPuzzles().find(p => p.id === id)!);
  const isLarge = slug === "large-print";
  const isChristmas = slug === "christmas";
  const deepened = isLarge || isChristmas;
  const pageCount = pack.ids.length * 2;
  return <>
    <Breadcrumbs items={[{ name: "Printables", href: "/printables" }, { name: pack.name, href: `/printables/${pack.slug}` }]} />
    <h1 className="font-serif text-4xl">{isLarge ? "Everyday large print printable word searches" : isChristmas ? "Christmas large print printable word searches" : `${pack.name} printable word search`}</h1>
    <p className="mt-4 max-w-3xl text-lg">{pack.description} Each PDF contains {pack.ids.length} puzzle{pack.ids.length === 1 ? "" : "s"} with eight words each and a matching answer key. Letters print at 24 points at actual size.</p>
    <div className="mt-5 flex flex-wrap gap-3">
      <DownloadLink href={`/printables/${pack.slug}-letter.pdf`} pack={pack.slug}>Download Letter PDF</DownloadLink>
      <DownloadLink href={`/printables/${pack.slug}-a4.pdf`} pack={pack.slug}>Download A4 PDF</DownloadLink>
    </div>
    <p className="mt-3 text-lg">{pageCount} pages per file: puzzles on the odd pages, answers on the even pages. Print at 100% on the matching paper size. No email and no account.</p>

    {isLarge && (
      <section className="mt-8 max-w-3xl rounded-sm border border-[#d4cbb8] bg-[#faf6ee]/60 p-5 text-lg">
        <h2 className="font-serif text-2xl">Pack specifications</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li><strong>6</strong> everyday large print puzzles · <strong>6</strong> answer keys</li>
          <li>9×9 grids · 8 familiar words each</li>
          <li>Across and down only — no diagonals or backwards words</li>
          <li>~24pt grid letters · high-contrast black on white</li>
          <li>Letter (US) and A4 downloads · free to photocopy with credit</li>
        </ul>
        <p className="mt-3">Built for quiet home use and activity rooms. Prefer the screen? Play <Link href="/large-print">large print online</Link> or <Link href="/daily">today&apos;s daily puzzle</Link>.</p>
      </section>
    )}

    {isChristmas && (
      <section className="mt-8 max-w-3xl rounded-sm border border-[#d4cbb8] bg-[#faf6ee]/60 p-5 text-lg">
        <h2 className="font-serif text-2xl">Pack specifications</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li><strong>6</strong> Christmas large print puzzles · <strong>6</strong> answer keys</li>
          <li>9×9 grids · 8 calm gift, winter and celebration words each</li>
          <li>Across and down only — no diagonals or backwards words</li>
          <li>~24pt grid letters · high-contrast black on white</li>
          <li>Letter (US) and A4 downloads · free to photocopy with credit</li>
        </ul>
        <p className="mt-3">Adult and senior-friendly December vocabulary only — no franchise characters. Prefer the screen? Play <Link href="/themes/christmas">Christmas online</Link>, browse <Link href="/holidays">holidays</Link> or try <Link href="/large-print">large print online</Link>.</p>
      </section>
    )}

    <div className={`mt-8 grid gap-8 ${puzzles.length > 2 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
      {puzzles.map((p, i) => <section key={p.id}>
        <h2 className="font-serif text-2xl">Puzzle {i + 1}: {p.title.replace(/^Large Print (?:Christmas:\s*|Word Search:\s*)/i, "")}</h2>
        <img src={`/printables/${pack.slug}-${i + 1}.png`} alt={`Preview of puzzle ${i + 1}: a 9 by 9 letter grid and word list`} width={612} height={792} loading="lazy" className="mt-3 h-auto w-full border border-[#d4cbb8]" />
        <p className="mt-3"><strong>Words:</strong> {p.words.join(", ")}.</p>
        <Link href={puzzlePath(p)} className="chip mt-3 min-h-11">Play this puzzle online</Link>
      </section>)}
    </div>

    <section className="mt-10 max-w-3xl space-y-3 text-lg">
      <h2 className="font-serif text-2xl">{deepened ? "For activity directors and home facilitators" : "How to use these sheets"}</h2>
      {isLarge ? (
        <>
          <p>Print the Letter or A4 file at actual size. Hand out the odd-numbered puzzle pages and keep the even-numbered answer keys for yourself. Circling is optional — some groups prefer to highlight with a marker.</p>
          <p>Each sheet stands alone, so you can run one puzzle per session or leave a small stack on a quiet table. The vocabulary stays everyday and brand-free: gardens, harbors, kitchens and soft afternoons.</p>
          <p>Free for personal, classroom and community activity use, including senior centers and libraries. Keep the Words at Rest credit when sharing. Browse <Link href="/themes/large-print-pack">more everyday large print online</Link>, <Link href="/printables">all printable packs</Link> or seasonal sheets such as <Link href="/printables/thanksgiving">Thanksgiving</Link> and <Link href="/printables/christmas">Christmas</Link>.</p>
        </>
      ) : isChristmas ? (
        <>
          <p>Print the Letter or A4 file at actual size. Hand out odd-numbered puzzle pages and keep even-numbered answer keys for facilitators. One puzzle per table works well for a short December activity hour.</p>
          <p>Vocabulary stays calm and adult: gifts, pine, cocoa, choir, parcels and quiet winter rooms — never franchise characters or brand slogans. Circling with a pen or highlighter is optional.</p>
          <p>Free for personal, classroom and community activity use, including senior centers. Keep the Words at Rest credit when sharing. See the <Link href="/printables/activity-directors">Activity Director Kit</Link>, more <Link href="/themes/christmas">Christmas puzzles online</Link>, <Link href="/holidays">holidays</Link>, <Link href="/printables">all printables</Link> or <Link href="/large-print">large print online</Link>.</p>
        </>
      ) : (
        <>
          <p>Find each listed word in a straight line, left to right or top to bottom. Circle it with a pen or pencil. There are no diagonals, backwards words or timers.</p>
          <p>Free for personal, classroom and community activity use, including senior centers. Keep the Words at Rest credit when sharing.</p>
          <p>Browse <Link href={`/themes/${pack.theme}`}>more puzzles in this theme</Link>, <Link href="/printables">all printable packs</Link> or <Link href="/large-print">large print online</Link>.</p>
        </>
      )}
    </section>

    {isLarge && <Faq items={LARGE_PRINT_FAQ} path={`/printables/${pack.slug}`} heading="Everyday large print PDF questions" />}
    {isChristmas && <Faq items={CHRISTMAS_FAQ} path={`/printables/${pack.slug}`} heading="Christmas large print PDF questions" />}

    <HubSchema name={`${pack.name} printable word search`} description={pack.description} path={`/printables/${pack.slug}`} dates={datesFor("app/printables/[pack]/page.tsx", "data/printables.json")} />
  </>;
}
