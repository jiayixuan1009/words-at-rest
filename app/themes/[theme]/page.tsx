import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleCard from "@/components/PuzzleCard";
import AdSlot from "@/components/AdSlot";
import { getPuzzlesByTheme, getTheme, getThemes } from "@/lib/data";
import { themeImage } from "@/lib/images";

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
      <div className="mb-8 overflow-hidden rounded-sm border border-[#d4cbb8] sm:grid sm:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <h1 className="font-serif text-4xl tracking-tight">{theme.name} Word Search</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">{theme.description}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={themeImage(theme.slug)}
          alt=""
          className="aspect-[16/10] w-full object-cover sm:aspect-auto sm:min-h-full"
        />
      </div>
      <h2 className="font-serif text-3xl">{theme.name} puzzles</h2>
      <div className="mt-2 max-w-2xl">
        {puzzles.map((p) => (
          <PuzzleCard key={p.id} puzzle={p} />
        ))}
      </div>
      <AdSlot slot="theme-hub" />
    </>
  );
}
