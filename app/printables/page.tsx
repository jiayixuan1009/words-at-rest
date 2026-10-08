import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import HubSchema from "@/components/HubSchema";
import { PRINTABLES } from "@/lib/printables";
import { datesFor } from "@/lib/content-dates";
import { seo } from "@/lib/seo";

const description = "Free printable large print word searches for adults and seniors. Download Letter or A4 PDFs with 9×9 puzzles, answer keys and calm everyday themes — no sign-up.";
export const metadata = seo({ title: "Printable Large Print Word Search — Free PDFs", description, path: "/printables" });
export default function PrintablesPage() {
  return <>
    <Breadcrumbs items={[{ name: "Printables", href: "/printables" }]} />
    <h1 className="font-serif text-4xl">Free printable large print word searches</h1>
    <p className="mt-4 max-w-3xl text-lg">Choose a free PDF for a quiet break at home or a shared activity room. Packs use 9×9 grids with eight familiar words, large black letters and an answer key for each puzzle. Words read across or down only — no diagonals.</p>
    <p className="mt-3 text-lg">Prefer playing on screen? Try <Link href="/large-print">large print online</Link> or <Link href="/daily">today&apos;s puzzle</Link>. Activity directors: see the <Link href="/printables/activity-directors">Activity Director Kit</Link> for Letter vs A4, answer-key tips and pack picks.</p>
    <ul className="mt-8 grid gap-6 sm:grid-cols-2">
      {PRINTABLES.map(pack => <li key={pack.slug} className="rounded-sm border border-[#d4cbb8] p-5">
        <h2 className="font-serif text-2xl"><Link href={`/printables/${pack.slug}`}>{pack.name}</Link></h2>
        <p className="mt-2">{pack.description}</p><p className="mt-3 text-base">{pack.ids.length} puzzles · {pack.ids.length} answer keys · A4 or Letter</p>
        <Link href={`/printables/${pack.slug}`} className="btn-primary mt-4">Preview & download</Link>
      </li>)}
      <li className="rounded-sm border border-[#d4cbb8] p-5">
        <h2 className="font-serif text-2xl"><Link href="/printables/activity-directors">Activity Director Kit</Link></h2>
        <p className="mt-2">How to choose Letter vs A4, print puzzle pages without answer keys, and pick calm packs for senior centers and community rooms — no email gate.</p>
        <p className="mt-3 text-base">Guidance · pack links · permission copy</p>
        <Link href="/printables/activity-directors" className="btn-primary mt-4">Open the kit</Link>
      </li>
    </ul>
    <section className="mt-10 max-w-3xl space-y-3 text-lg">
      <h2 className="font-serif text-2xl">Printing tips and permission</h2>
      <p>Choose the file that matches your paper size, then print at actual size (100%). Puzzle pages sit on the odd pages; answer keys on the even pages, so facilitators can withhold solutions.</p>
      <p>These sheets are free for personal, classroom and community activity use, including libraries and senior centers. Keep the Words at Rest credit when sharing the sheets. No account or email address is required.</p>
      <p>Start with the <Link href="/printables/large-print">Everyday Large Print pack</Link> (six puzzles), the <Link href="/printables/thanksgiving">Thanksgiving Large Print pack</Link> (six puzzles) or the <Link href="/printables/christmas">Christmas Large Print pack</Link> (six puzzles), or play the same calm grids <Link href="/large-print">online</Link>.</p>
    </section>
    <HubSchema type="CollectionPage" name="Free printable large print word searches" description={description} path="/printables" dates={datesFor("app/printables/page.tsx", "data/printables.json")} />
  </>;
}
