import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleCard from "@/components/PuzzleCard";
import { getLargePrintPuzzles } from "@/lib/data";
import { IMAGES } from "@/lib/images";

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
      <div className="overflow-hidden rounded-sm border border-[#d4cbb8]">
        <div className="grid sm:grid-cols-2">
          <div className="flex flex-col justify-center bg-[#ebe4d6]/50 p-8 sm:p-10">
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Large print word search</h1>
            <p className="mt-4 text-xl leading-relaxed text-[var(--ink-soft)]">
              Bigger letters, smaller 9×9 grids, strong contrast, and words that read only across or
              down. No timer — just a calm puzzle at your own pace.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.largePrint}
            alt="Glasses resting on an open book"
            className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto"
          />
        </div>
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)]">
        You can also switch <strong className="text-[var(--ink)]">any</strong> puzzle on the site to
        large print with the button above the grid. Your choice is remembered on this device.
      </p>
      <h2 className="mt-12 font-serif text-3xl">Large print puzzles</h2>
      <div className="mt-2 max-w-2xl">
        {puzzles.map((p) => (
          <PuzzleCard key={p.id} puzzle={p} />
        ))}
      </div>
      <p className="mt-10 text-lg">
        Looking for a gentle start? Try our <Link href="/difficulty/easy">easy word searches</Link> or
        read <Link href="/how-to-play">how to play</Link>.
      </p>
    </>
  );
}
