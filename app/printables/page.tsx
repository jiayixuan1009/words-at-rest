import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import HubSchema from "@/components/HubSchema";
import { PRINTABLES } from "@/lib/printables";
import { datesFor } from "@/lib/content-dates";
import { seo } from "@/lib/seo";

const description = "Free printable large print word searches for adults and seniors. Download Letter or A4 PDFs with two 9×9 puzzles and answer keys, no sign-up.";
export const metadata = seo({ title: "Printable Large Print Word Search — Free PDFs", description, path: "/printables" });
export default function PrintablesPage() {
  return <>
    <Breadcrumbs items={[{ name: "Printables", href: "/printables" }]} />
    <h1 className="font-serif text-4xl">Free printable large print word searches</h1>
    <p className="mt-4 max-w-3xl text-lg">Choose a free PDF for a quiet break at home or a shared activity. Each pack has two 9×9 puzzles with eight words, large black letters, and an answer key for each puzzle. Words read across or down only.</p>
    <p className="mt-3 text-lg">Prefer playing on screen? Try <Link href="/large-print">large print online</Link> or <Link href="/daily">today&apos;s puzzle</Link>.</p>
    <ul className="mt-8 grid gap-6 sm:grid-cols-2">
      {PRINTABLES.map(pack => <li key={pack.slug} className="rounded-sm border border-[#d4cbb8] p-5">
        <h2 className="font-serif text-2xl"><Link href={`/printables/${pack.slug}`}>{pack.name}</Link></h2>
        <p className="mt-2">{pack.description}</p><p className="mt-3 text-base">2 puzzles · 2 answer keys · A4 or Letter</p>
        <Link href={`/printables/${pack.slug}`} className="btn-primary mt-4">Preview & download</Link>
      </li>)}
    </ul>
    <section className="mt-10 max-w-3xl space-y-3 text-lg">
      <h2 className="font-serif text-2xl">Printing tips and permission</h2>
      <p>Choose the file that matches your paper size, then print at actual size (100%). You can print only the puzzle pages (1 and 3) and keep the answers (2 and 4) separate.</p>
      <p>These sheets are free for personal, classroom and community activity use, including libraries and senior centers. Keep the Words at Rest credit when sharing the sheets. No account or email address is required.</p>
    </section>
    <HubSchema type="CollectionPage" name="Free printable large print word searches" description={description} path="/printables" dates={datesFor("app/printables/page.tsx", "data/printables.json")} />
  </>;
}
