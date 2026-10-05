import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PuzzleView from "@/components/PuzzleView";
import { getPuzzle, getPuzzles, getTheme, puzzlePath } from "@/lib/data";
import { themeOgImage } from "@/lib/images";
import { seo } from "@/lib/seo";
import { puzzleDescription, puzzleSeoTitle } from "@/lib/puzzle-seo";

type Props = { params: Promise<{ theme: string; slug: string }> };

export function generateStaticParams() {
  return getPuzzles().map((p) => ({ theme: p.themeId, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { theme, slug } = await params;
  const puzzle = getPuzzle(theme, slug);
  if (!puzzle) return { title: "Puzzle not found", robots: { index: false } };
  return seo({
    title: puzzleSeoTitle(puzzle),
    description: puzzleDescription(puzzle, getTheme(theme)),
    path: puzzlePath(puzzle),
    image: themeOgImage(puzzle.themeId),
    imageAlt: `${puzzle.title} — Words at Rest`,
  });
}

export default async function PuzzlePage({ params }: Props) {
  const { theme: themeSlug, slug } = await params;
  const puzzle = getPuzzle(themeSlug, slug);
  const theme = getTheme(themeSlug);
  if (!puzzle || !theme) notFound();
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Themes", href: "/themes" },
          { name: theme.name, href: `/themes/${theme.slug}` },
          { name: puzzle.title, href: puzzlePath(puzzle) },
        ]}
      />
      <PuzzleView puzzle={puzzle} canonicalPath={puzzlePath(puzzle)} />
    </>
  );
}
