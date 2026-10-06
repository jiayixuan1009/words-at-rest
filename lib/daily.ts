/**
 * Daily puzzle schedule helpers (pure — no JSON import).
 *
 * - data/daily.json holds one entry per date from 2026-10-07 onward.
 * - Launch day is frozen in data/daily-launch.json; missing dates are unpublished.
 * - Difficulty by UTC weekday: Sun/Mon/Wed easy, Tue/Thu/Fri medium, Sat hard.
 * - Theme rotation prefers seasonal themes in season; never repeats within 5 days;
 *   excludes hard-pack and large-print-pack.
 * - /daily/[date] for dates > today UTC 404; entries are pre-queued so midnight
 *   UTC unlocks today's puzzle without a deploy.
 */
import type { Difficulty, Placement, Puzzle } from "./types";

export const DAILY_SCHEDULE_START = "2026-10-07";
/** How many calendar days beyond today UTC must always be queued. */
export const DAILY_BUFFER_DAYS = 7;
/** Same theme must not reappear within this many preceding days. */
export const DAILY_THEME_GAP_DAYS = 5;
/** Max Jaccard overlap of word sets vs any existing puzzle of the same theme. */
export const DAILY_MAX_WORD_OVERLAP = 0.7;

export const DAILY_SIZES: Record<Difficulty, number> = { easy: 10, medium: 12, hard: 15 };
export const DAILY_WORD_COUNTS: Record<Difficulty, number> = { easy: 10, medium: 14, hard: 18 };

/** Theme ids never used for daily puzzles (packs, not topical). */
export const DAILY_EXCLUDED_THEMES = new Set(["hard-pack", "large-print-pack"]);

export interface DailyEntry {
  date: string;
  id: string;
  slug: string;
  themeId: string;
  difficulty: Difficulty;
  title: string;
  primaryKeyword: string;
  gridSize: number;
  largePrint: false;
  words: string[];
  grid: string[][];
  placements: Placement[];
  seed: number;
  createdAt: string;
}

export interface DailyScheduleFile {
  version: 1;
  /** Documented difficulty pattern (UTC weekday). */
  difficultyPattern: string;
  entries: DailyEntry[];
}

export const DAILY_DIFFICULTY_PATTERN =
  "UTC weekday: Sun easy, Mon easy, Tue medium, Wed easy, Thu medium, Fri medium, Sat hard";

export function dailyEntryToPuzzle(e: DailyEntry): Puzzle {
  return {
    id: e.id,
    slug: e.slug,
    themeId: e.themeId,
    title: e.title,
    primaryKeyword: e.primaryKeyword,
    difficulty: e.difficulty,
    gridSize: e.gridSize,
    largePrint: false,
    words: e.words,
    grid: e.grid,
    placements: e.placements,
    createdAt: e.createdAt.slice(0, 10),
    seed: e.seed,
  };
}

/** UTC weekday 0=Sun … 6=Sat → difficulty. */
export function difficultyForUtcDate(date: string): Difficulty {
  const wd = new Date(`${date}T00:00:00Z`).getUTCDay();
  if (wd === 0 || wd === 1 || wd === 3) return "easy";
  if (wd === 6) return "hard";
  return "medium";
}

/**
 * Prefer seasonal themes in season (halloween in Oct, fall Sep–Nov, christmas in Dec).
 * Returns ordered candidate theme ids (best first), excluding packs and recentThemes.
 */
export function rankDailyThemes(
  date: string,
  allThemeIds: string[],
  recentThemeIds: string[],
): string[] {
  const month = Number(date.slice(5, 7));
  const recent = new Set(recentThemeIds);
  const base = allThemeIds.filter((id) => !DAILY_EXCLUDED_THEMES.has(id) && !recent.has(id));
  const score = (id: string): number => {
    if (month === 10 && id === "halloween") return 100;
    if (month >= 9 && month <= 11 && id === "fall") return 90;
    if (month === 12 && id === "christmas") return 100;
    if (month === 10 && id === "fall") return 80;
    if (id === "christmas" && month !== 12) return 10;
    if (id === "halloween" && month !== 10 && month !== 9) return 20;
    return 50;
  };
  return [...base].sort((a, b) => score(b) - score(a) || a.localeCompare(b));
}

/** Jaccard similarity of two word sets (uppercase). */
export function wordSetOverlap(a: string[], b: string[]): number {
  const A = new Set(a.map((w) => w.toUpperCase()));
  const B = new Set(b.map((w) => w.toUpperCase()));
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  const union = A.size + B.size - inter;
  return union === 0 ? 0 : inter / union;
}

export function gridFingerprint(grid: string[][]): string {
  return grid.map((row) => row.join("")).join("|");
}

export function dailyTitle(themeName: string, difficulty: Difficulty): string {
  const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  return `Daily Word Search: ${themeName} (${label})`;
}

/** Add N calendar days to YYYY-MM-DD (UTC). */
export function addUtcDays(date: string, n: number): string {
  const t = new Date(`${date}T00:00:00Z`).getTime() + n * 86400000;
  return new Date(t).toISOString().slice(0, 10);
}

export function listDatesInclusive(from: string, to: string): string[] {
  const out: string[] = [];
  let d = from;
  while (d <= to) {
    out.push(d);
    d = addUtcDays(d, 1);
  }
  return out;
}

/** YYYY-MM for a UTC date. */
export function monthKey(date: string): string {
  return date.slice(0, 7);
}

export function formatMonthLong(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** First day-of-week (0=Sun) of a YYYY-MM month in UTC. */
export function monthStartWeekday(ym: string): number {
  return new Date(`${ym}-01T00:00:00Z`).getUTCDay();
}

export function daysInMonth(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

export function prevMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 2, 1));
  return d.toISOString().slice(0, 7);
}

export function nextMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, m, 1));
  return d.toISOString().slice(0, 7);
}

/** Earliest calendar month we show (launch month). */
export const CALENDAR_FIRST_MONTH = "2026-10";
