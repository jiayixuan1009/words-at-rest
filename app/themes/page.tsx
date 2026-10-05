import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPuzzlesByTheme, getThemes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Word Search Themes — Browse All Puzzles",
  description:
    "Browse free word search puzzles by theme: seasonal, animals, large print and more. Original word lists, playable online.",
  alternates: { canonical: "/themes" },
};

export default function ThemesPage() {
  const themes = getThemes();
  return (
    <>
      <Breadcrumbs items={[{ name: "Themes", href: "/themes" }]} />
      <h1 className="text-4xl font-semibold tracking-tight">Word search themes</h1>
      <p className="mt-3 max-w-2xl text-lg text-stone-700">
        Every theme has its own original word list and several puzzles across difficulty levels.
      </p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((t) => (
          <li key={t.id} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              <Link href={`/themes/${t.slug}`} className="text-stone-900 no-underline hover:underline">
                {t.name} word search
              </Link>
            </h2>
            <p className="mt-2 line-clamp-3 text-stone-600">{t.description}</p>
            <p className="mt-3 text-sm text-stone-500">{getPuzzlesByTheme(t.id).length} puzzles</p>
          </li>
        ))}
      </ul>
    </>
  );
}
