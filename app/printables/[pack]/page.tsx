import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import HubSchema from "@/components/HubSchema";
import DownloadLink from "@/components/DownloadLink";
import { PRINTABLES } from "@/lib/printables";
import { getPuzzles, puzzlePath } from "@/lib/data";
import { datesFor } from "@/lib/content-dates";
import { seo } from "@/lib/seo";

type Props = { params: Promise<{ pack: string }> };
export const dynamic = "force-dynamic";
export function generateStaticParams() { return PRINTABLES.map(p => ({ pack: p.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).pack;
  const found = PRINTABLES.find(p => p.slug === slug);
  if (!found) return { title: "Printable not found", robots: { index: false } };
  return seo({ title: `${found.name} Word Search — Free PDFs`, description: `${found.description} Free A4 and Letter downloads with answer keys. No sign-up.`, path: `/printables/${slug}` });
}
export default async function PrintablePage({ params }: Props) {
  const slug = (await params).pack;
  const pack = PRINTABLES.find(p => p.slug === slug);
  if (!pack) notFound();
  const puzzles = pack.ids.map(id => getPuzzles().find(p => p.id === id)!);
  return <>
    <Breadcrumbs items={[{ name: "Printables", href: "/printables" }, { name: pack.name, href: `/printables/${pack.slug}` }]} />
    <h1 className="font-serif text-4xl">{pack.name} printable word search</h1>
    <p className="mt-4 max-w-3xl text-lg">{pack.description} Each PDF contains two 9×9 puzzles with eight words each and two answer keys. Letters print at 24 points at actual size.</p>
    <div className="mt-5 flex flex-wrap gap-3">
      <DownloadLink href={`/printables/${pack.slug}-letter.pdf`} pack={pack.slug}>Download Letter PDF</DownloadLink>
      <DownloadLink href={`/printables/${pack.slug}-a4.pdf`} pack={pack.slug}>Download A4 PDF</DownloadLink>
    </div>
    <p className="mt-3">Four pages per file: puzzles on pages 1 and 3, answers on pages 2 and 4. Print at 100% on the matching paper size.</p>
    <div className="mt-8 grid gap-8 sm:grid-cols-2">
      {puzzles.map((p, i) => <section key={p.id}>
        <h2 className="font-serif text-2xl">Puzzle {i + 1}: {p.title}</h2>
        <img src={`/printables/${pack.slug}-${i + 1}.png`} alt={`Preview of puzzle ${i + 1}: a 9 by 9 letter grid and word list`} width={612} height={792} loading="lazy" className="mt-3 h-auto w-full border border-[#d4cbb8]" />
        <p className="mt-3"><strong>Words:</strong> {p.words.join(", ")}.</p>
        <Link href={puzzlePath(p)} className="chip mt-3 min-h-11">Play this puzzle online</Link>
      </section>)}
    </div>
    <section className="mt-10 max-w-3xl space-y-3 text-lg">
      <h2 className="font-serif text-2xl">How to use these sheets</h2>
      <p>Find each listed word in a straight line, left to right or top to bottom. Circle it with a pen or pencil. There are no diagonals, backwards words or timers.</p>
      <p>Free for personal, classroom and community activity use, including senior centers. Keep the Words at Rest credit when sharing.</p>
      <p>Browse <Link href={`/themes/${pack.theme}`}>more puzzles in this theme</Link>, <Link href="/printables">all printable packs</Link> or <Link href="/large-print">large print online</Link>.</p>
    </section>
    <HubSchema name={`${pack.name} printable word search`} description={pack.description} path={`/printables/${pack.slug}`} dates={datesFor("app/printables/[pack]/page.tsx", "data/printables.json")} />
  </>;
}
