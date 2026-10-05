import Link from "next/link";
import { getPuzzlesByTheme } from "@/lib/data";
import { themeImage } from "@/lib/images";
import type { Theme } from "@/lib/types";

export default function ThemeCard({ theme, compact = false }: { theme: Theme; compact?: boolean }) {
  const count = getPuzzlesByTheme(theme.id).length;
  const src = themeImage(theme.slug);
  return (
    <Link
      href={`/themes/${theme.slug}`}
      className="group block overflow-hidden no-underline"
    >
      <div className={`relative overflow-hidden rounded-sm ${compact ? "aspect-[5/3]" : "aspect-[4/3]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,36,27,0.55)] via-transparent to-transparent" />
        <p className="absolute bottom-3 left-3 right-3 font-serif text-xl text-[#faf6ee] drop-shadow">
          {theme.name}
        </p>
      </div>
      {!compact && (
        <p className="mt-3 line-clamp-2 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
          {theme.description.slice(0, 110)}…
        </p>
      )}
      <p className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-[var(--ink-soft)]">
        {count} puzzle{count === 1 ? "" : "s"}
      </p>
    </Link>
  );
}
