import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleCard from "@/components/PuzzleCard";
import { getLargePrintPuzzles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Large Print Word Search — Easy on the Eyes",
  description:
    "Free large print word search puzzles with big letters, high contrast and no timer. Comfortable on phones, tablets and desktops — ideal for seniors.",
  alternates: { canonical: "/large-print" },
};

export default function LargePrintPage() {
  const puzzles = getLargePrintPuzzles();
  return (
    <>
      <Breadcrumbs items={[{ name: "Large Print", href: "/large-print" }]} />
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Large print word search</h1>
      <div className="mt-4 max-w-3xl space-y-4 text-xl leading-relaxed text-stone-800">
        <p>
          These puzzles are made to be easy on the eyes: bigger letters, smaller 9×9 grids, strong
          contrast, and words that read only across or down. There is no timer and nothing flashing
          — just a calm puzzle you can enjoy at your own pace.
        </p>
        <p>
          You can also switch <strong>any</strong> puzzle on the site to large print with the
          “Large print” button above the grid. Your choice is remembered on this device.
        </p>
      </div>
      <h2 className="mt-10 text-2xl font-semibold">Large print puzzles</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {puzzles.map((p) => (
          <PuzzleCard key={p.id} puzzle={p} />
        ))}
      </div>
      <p className="mt-8 text-lg">
        Looking for a gentle start? Try our <Link href="/difficulty/easy">easy word searches</Link> or
        read <Link href="/how-to-play">how to play</Link>.
      </p>
    </>
  );
}
