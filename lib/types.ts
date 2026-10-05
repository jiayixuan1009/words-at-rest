export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export type Direction = "E" | "S" | "SE" | "NE" | "W" | "N" | "NW" | "SW";

export interface Theme {
  id: string;
  slug: string;
  name: string;
  /** 80–160 word SEO intro shown on the theme hub. */
  description: string;
  season: "fall" | "winter" | "spring" | "summer" | "evergreen";
  primaryKeyword: string;
  /** Self-written word bank. No trademarks, characters, or licensed IP. */
  words: string[];
}

export interface Placement {
  word: string;
  row: number;
  col: number;
  direction: Direction;
}

export interface Puzzle {
  id: string;
  slug: string;
  themeId: string;
  title: string;
  primaryKeyword: string;
  difficulty: Difficulty;
  gridSize: number;
  largePrint: boolean;
  words: string[];
  /** Pre-generated so SSR output is stable (no SEO content drift). */
  grid: string[][];
  placements: Placement[];
  createdAt: string;
  seed: number;
}
