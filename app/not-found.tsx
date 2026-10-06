import type { Metadata } from "next";
import Link from "next/link";
import { ART } from "@/lib/images";
import Picture from "@/components/Picture";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Words at Rest" },
  description: "This page could not be found. Play today’s free daily word search or browse all puzzle themes on Words at Rest.",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-8 text-center">
      <Picture
        art={ART.notFound}
        priority
        sizes="(min-width: 640px) 448px, 92vw"
        className="mx-auto mb-8 aspect-[16/10] w-full max-w-md rounded-[3px] object-cover"
      />
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="mt-4 text-lg text-[var(--ink-soft)]">That puzzle seems to have wandered off the page.</p>
      <p className="mt-8 text-lg">
        <Link href="/daily">Play today&apos;s puzzle</Link>
        <span className="mx-3 text-[#d4cbb8]">·</span>
        <Link href="/themes">Browse themes</Link>
        <span className="mx-3 text-[#d4cbb8]">·</span>
        <Link href="/">Home</Link>
      </p>
    </div>
  );
}
