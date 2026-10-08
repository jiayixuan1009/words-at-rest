import type { Puzzle, Theme } from "./types";

/** Stable editorial choices, with seasonal slots changing by UTC month. */
export function featuredPuzzles(puzzles: Puzzle[], date: string): Puzzle[] {
  const month = Number(date.slice(5, 7));
  const seasonal = ([[], ["winter", "new-year"], ["valentines", "winter"],
    ["spring", "st-patricks"], ["easter", "spring"], ["spring", "mothers-day"],
    ["summer", "fathers-day"], ["independence-day", "summer"], ["summer", "beach"],
    ["fall", "camping"], ["halloween", "fall"], ["thanksgiving", "fall"],
    ["christmas", "winter"]][month]) ?? ["garden", "ocean"];
  const choices: Array<[string, "easy" | "medium" | "hard", boolean]> = [
    [seasonal[0], "easy", false], [seasonal[1], "medium", false],
    ["large-print-pack", "easy", true], ["bible", "easy", false],
    ["garden", "medium", false], ["ocean", "hard", false],
  ];
  return choices.map(([theme, level, large]) => puzzles.find(p =>
    p.themeId === theme && p.difficulty === level && p.largePrint === large
  )).filter((p): p is Puzzle => Boolean(p));
}

export type ThemeGroup = "all" | "seasonal" | "anytime" | "packs";
export function matchesTheme(theme: Pick<Theme, "name" | "slug" | "season">, query: string, group: ThemeGroup): boolean {
  const pack = theme.slug.endsWith("-pack");
  const inGroup = group === "all" || (group === "packs" ? pack
    : group === "seasonal" ? theme.season !== "evergreen" : theme.season === "evergreen" && !pack);
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const text = `${theme.name} ${theme.slug.replaceAll("-", " ")}`.toLowerCase();
  return inGroup && words.every(word => text.includes(word));
}
