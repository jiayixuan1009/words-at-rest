import { clamp, themeNoun } from "./seo";
import type { Puzzle, Theme } from "./types";

const LEVEL_NOTE: Record<string, string> = {
  easy: "words run across and down",
  medium: "words run across, down and diagonally",
  hard: "words run in all eight directions",
};

/** ≤43 chars so "<title> | Words at Rest" stays ≤60. */
export function puzzleSeoTitle(p: Puzzle): string {
  const withSuffix = `${p.title} — Play Free`;
  return withSuffix.length <= 43 ? withSuffix : p.title;
}

/** Unique per puzzle: names real words from this grid + size + count. */
export function puzzleDescription(p: Puzzle, theme?: Theme): string {
  const picks = [...p.words].sort((a, b) => b.length - a.length).slice(0, 3).map((w) => w.toLowerCase());
  const rest = p.words.length - picks.length;
  const level = p.largePrint ? "large print" : p.difficulty;
  const note = p.largePrint ? "big letters, words across and down" : LEVEL_NOTE[p.difficulty];
  // Packs (large-print-pack, hard-pack) describe the format, not a topic — avoid "hard hard pack".
  const topic = theme && !theme.slug.endsWith("-pack") ? `${themeNoun(theme.name)} ` : "";
  return clamp(
    `Find ${picks.join(", ")} and ${rest} more words in this ${level} ${topic}word search: ${p.gridSize}×${p.gridSize} grid, ${note}. Free online, no timer.`,
    160,
  );
}

