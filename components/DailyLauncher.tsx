import Link from "next/link";
import { DIFFICULTY_ART } from "@/lib/images";

const CHIP_THEMES = [
  { slug: "halloween", name: "Halloween" },
  { slug: "thanksgiving", name: "Thanksgiving" },
  { slug: "christmas", name: "Christmas" },
  { slug: "winter", name: "Winter" },
  { slug: "bible", name: "Bible" },
  { slug: "easter", name: "Easter" },
];

/** Difficulty + Large print + themes. One horizontal scroll row on mobile; wraps on desktop. */
export function LauncherChips() {
  return (
    <div>
      <p className="font-sans text-sm uppercase tracking-[0.08em] text-[var(--ink-soft)]">Or choose your own</p>
      <ul
        className="chip-scroll mt-3 flex flex-nowrap gap-2 lg:flex-wrap lg:overflow-visible"
        aria-label="Choose a difficulty or theme"
      >
        {(["easy", "medium", "hard"] as const).map((d) => (
          <li key={d} className="shrink-0">
            <Link href={`/difficulty/${d}`} className="chip capitalize">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DIFFICULTY_ART[d].badge.src} width={24} height={24} alt="" loading="lazy" decoding="async" className="h-6 w-6" />
              {d}
            </Link>
          </li>
        ))}
        <li className="shrink-0">
          <Link href="/large-print" className="chip">
            <span aria-hidden="true" className="font-serif text-lg font-bold leading-none">
              A
            </span>{" "}
            Large print
          </Link>
        </li>
        {CHIP_THEMES.map((t) => (
          <li key={t.slug} className="shrink-0">
            <Link href={`/themes/${t.slug}`} className="chip">
              {t.name}
            </Link>
          </li>
        ))}
        <li className="shrink-0">
          <Link href="/themes" className="chip border-dashed">
            All themes →
          </Link>
        </li>
      </ul>
    </div>
  );
}
