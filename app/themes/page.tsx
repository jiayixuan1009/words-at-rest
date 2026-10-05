import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ThemeCard from "@/components/ThemeCard";
import { getThemes } from "@/lib/data";

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
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Word search themes</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
        Every theme has its own original word list and several puzzles across difficulty levels —
        written for adults, free of licensed characters.
      </p>
      <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((t) => (
          <li key={t.id}>
            <ThemeCard theme={t} />
          </li>
        ))}
      </ul>
    </>
  );
}
