import { puzzles } from "../data/puzzles";
import { themes } from "../data/themes";
import { SITE } from "./site";
import type { Difficulty, Puzzle, Theme } from "./types";
import { DIFFICULTIES } from "./types";

export function getThemes(): Theme[] {
  return themes;
}

export function getTheme(slug: string): Theme | undefined {
  return themes.find((t) => t.slug === slug);
}

export function getPuzzles(): Puzzle[] {
  return puzzles;
}

export function getPuzzle(themeSlug: string, slug: string): Puzzle | undefined {
  return puzzles.find((p) => p.themeId === themeSlug && p.slug === slug);
}

export function getPuzzlesByTheme(themeId: string): Puzzle[] {
  return puzzles.filter((p) => p.themeId === themeId);
}

export function getPuzzlesByDifficulty(level: Difficulty): Puzzle[] {
  return puzzles.filter((p) => p.difficulty === level);
}

export function getLargePrintPuzzles(): Puzzle[] {
  return puzzles.filter((p) => p.largePrint);
}

export function isDifficulty(v: string): v is Difficulty {
  return (DIFFICULTIES as string[]).includes(v);
}

export function puzzlePath(p: Puzzle): string {
  return `/themes/${p.themeId}/${p.slug}`;
}

// ---- Daily ---------------------------------------------------------------
// STUB: daily rotation is a deterministic hash of the UTC date over the
// non-large-print pool. Replace with a committed data/daily.json schedule
// (date -> puzzleId) once there are enough puzzles, so archive pages never change.

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isValidDailyDate(date: string): boolean {
  if (!DATE_RE.test(date)) return false;
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== date) return false;
  return date >= SITE.dailyStart && date <= todayUtc();
}

export function getDailyPuzzle(date: string): Puzzle {
  const pool = puzzles.filter((p) => !p.largePrint);
  let h = 2166136261;
  for (const ch of date) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return pool[(h >>> 0) % pool.length];
}

/** Archive dates, newest first. */
export function getDailyArchive(limit = 30): string[] {
  const out: string[] = [];
  const start = new Date(`${SITE.dailyStart}T00:00:00Z`).getTime();
  let t = new Date(`${todayUtc()}T00:00:00Z`).getTime();
  while (t >= start && out.length < limit) {
    out.push(new Date(t).toISOString().slice(0, 10));
    t -= 86400000;
  }
  return out;
}

export function formatLongDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
