import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleCard from "@/components/PuzzleCard";
import AdSlot from "@/components/AdSlot";
import { getPuzzlesByTheme, getTheme, getThemes } from "@/lib/data";

type Props = { params: Promise<{ theme: string }> };

export function generateStaticParams() {
  return getThemes().map((t) => ({ theme: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const theme = getTheme((await params).theme);
  if (!theme) return { title: "Theme not found" };
  return {
    title: `${theme.name} Word Search — Free Online Puzzles`,
    description: theme.description.slice(0, 155).replace(/\s+\S*$/, "") + "…",
    alternates: { canonical: `/themes/${theme.slug}` },
  };
}

export default async function ThemePage({ params }: Props) {
  const theme = getTheme((await params).theme);
  if (!theme) notFound();
  const puzzles = getPuzzlesByTheme(theme.id);
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Themes", href: "/themes" },
          { name: theme.name, href: `/themes/${theme.slug}` },
        ]}
      />
      <h1 className="text-4xl font-semibold tracking-tight">{theme.name} Word Search</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-700">{theme.description}</p>
      <h2 className="mt-10 text-2xl font-semibold">{theme.name} puzzles</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {puzzles.map((p) => (
          <PuzzleCard key={p.id} puzzle={p} />
        ))}
      </div>
      <AdSlot slot="theme-hub" />
    </>
  );
}
