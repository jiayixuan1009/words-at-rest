import Link from "next/link";
import { getPuzzlesByTheme } from "@/lib/data";
import { themeArt } from "@/lib/images";
import type { Theme } from "@/lib/types";
import Picture from "./Picture";

/** Editorial theme entry: painted cover, serif title below (no overlay gradient). */
export default function ThemeCard({
  theme,
  compact = false,
  feature = false,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 45vw, 340px",
}: {
  theme: Theme;
  compact?: boolean;
  feature?: boolean;
  sizes?: string;
}) {
  const count = getPuzzlesByTheme(theme.id).length;
  const a = themeArt(theme.slug, theme.name);
  return (
    <Link href={`/themes/${theme.slug}`} className="group block no-underline">
      <div className={`overflow-hidden rounded-[3px] border border-[#d4cbb8] bg-[#efe7d9] ${compact ? "aspect-[5/3]" : "aspect-[4/3]"}`}>
        <Picture
          art={a}
          sizes={feature ? "(min-width: 1024px) 720px, (min-width: 640px) 92vw, 340px" : sizes}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-3 flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-[#d4cbb8] pb-2">
        <h3 className={`font-serif text-[var(--ink)] group-hover:text-[var(--moss)] ${feature ? "text-3xl" : "text-2xl"}`}>
          {theme.name}
        </h3>
        <p className="font-sans text-[0.9375rem] text-[var(--ink-soft)]">
          {count} puzzle{count === 1 ? "" : "s"}
        </p>
      </div>
      {!compact && (
        <p className={`mt-2 leading-relaxed text-[var(--ink-soft)] ${feature ? "text-lg" : "line-clamp-2 text-[1rem]"}`}>
          {feature ? theme.description.slice(0, 220).replace(/\s+\S*$/, "") : theme.description.slice(0, 110).replace(/\s+\S*$/, "")}…
        </p>
      )}
    </Link>
  );
}
