import type { Metadata } from "next";
import Link from "next/link";
import { ART } from "@/lib/images";
import Picture from "@/components/Picture";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Words at Rest" },
  description: "This page could not be found. Play today’s free daily word search or browse all puzzle themes on Words at Rest.",
  robots: { index: false, follow: true },
};

/** Short evergreen picks for recovery chips — keep the list tiny so mobile stays above the fold. */
const POPULAR_THEMES = [
  { slug: "bible", name: "Bible" },
  { slug: "halloween", name: "Halloween" },
  { slug: "animals", name: "Animals" },
  { slug: "garden", name: "Garden" },
  { slug: "christmas", name: "Christmas" },
] as const;

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-4 text-center sm:py-8">
      {/* No `priority`: this boundary is serialized into every page's RSC payload,
          and a high-priority <img> there made React preload the 404 art site-wide.
          On mobile the art shrinks so the primary CTA stays in the first screen. */}
      <Picture
        art={ART.notFound}
        sizes="(min-width: 640px) 448px, 200px"
        className="mx-auto mb-4 aspect-[16/10] w-full max-w-[200px] rounded-[3px] object-cover sm:mb-8 sm:max-w-md"
      />
      <h1 className="font-serif text-3xl sm:text-4xl">Page not found</h1>
      <p className="mt-3 text-base text-[var(--ink-soft)] sm:mt-4 sm:text-lg">
        That puzzle seems to have wandered off the page.
      </p>

      <nav aria-label="Suggested next steps" className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:items-center">
        <Link
          href="/daily"
          className="btn-primary min-h-12 w-full justify-center px-6 py-3.5 text-[1.15rem] sm:w-auto sm:min-w-[16rem]"
        >
          Play today&apos;s puzzle
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link href="/themes" className="btn-secondary w-full sm:w-auto">
            Browse themes
          </Link>
          <Link href="/large-print" className="btn-secondary w-full sm:w-auto">
            Large print
          </Link>
        </div>
      </nav>

      <div className="mt-6 sm:mt-8">
        <p className="font-sans text-sm uppercase tracking-[0.18em] text-[var(--ink-soft)]">Popular themes</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-2">
          {POPULAR_THEMES.map((t) => (
            <li key={t.slug}>
              <Link href={`/themes/${t.slug}`} className="chip">
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-base sm:mt-8">
        <Link href="/" className="text-[var(--ink-soft)] underline-offset-2 hover:underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}
