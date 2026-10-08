/**
 * Daily puzzle schedule helpers (pure — no JSON import).
 *
 * - data/daily.json holds schedule entries from 2026-10-07 onward.
 * - From 2026-10-08 (top-up) onward each UTC date targets **10** puzzles: slot 1 is
 *   the featured daily (/daily, homepage, calendar highlight); slots 2–10 are
 *   "Also today" siblings. Each new entry is also a real theme-catalog puzzle
 *   (id/slug `{theme}-{difficulty}-{nn}` under data/puzzles/).
 * - Legacy dates may still have a single `daily-YYYY-MM-DD` entry (slot 1); those
 *   grids are never rewritten once public.
 * - Launch day is frozen in data/daily-launch.json; missing dates are unpublished.
 * - Featured difficulty by UTC weekday: Sun/Mon/Wed easy, Tue/Thu/Fri medium, Sat hard.
 *   Sibling slots cycle easy/medium/hard (see siblingDifficultyForSlot).
 * - Theme rotation prefers seasonal themes in season; featured themes do not repeat within the previous 5 days; themes within one date are unique;
 *   excludes hard-pack and large-print-pack.
 * - /daily/[date] for dates > today UTC 404; entries are pre-queued so midnight
 *   UTC unlocks today's puzzles without a deploy.
 */
import type { Difficulty, Placement, Puzzle } from "./types";

export const DAILY_SCHEDULE_START = "2026-10-07";
/** How many calendar days beyond today UTC must always be queued. */
export const DAILY_BUFFER_DAYS = 7;
/** Generation target; the required minimum remains seven days. */
export const DAILY_TARGET_BUFFER_DAYS = 30;
/** How many puzzles each UTC date should carry (featured + Also today). */
export const DAILY_PER_DATE = 10;
/** Same theme must not reappear within this many preceding days (any slot). */
export const DAILY_THEME_GAP_DAYS = 5;
/** Max Jaccard overlap of word sets vs any existing puzzle of the same theme. */
export const DAILY_MAX_WORD_OVERLAP = 0.7;

export const DAILY_SIZES: Record<Difficulty, number> = { easy: 10, medium: 12, hard: 15 };
export const DAILY_WORD_COUNTS: Record<Difficulty, number> = { easy: 10, medium: 14, hard: 18 };

/** Theme ids never used for daily puzzles (packs, not topical). */
export const DAILY_EXCLUDED_THEMES = new Set(["hard-pack", "large-print-pack"]);

export interface DailyEntry {
  date: string;
  /**
   * 1 = featured (what /daily and homepage play). 2–10 = Also today siblings.
   * Omitted on legacy single-entry dates → treated as 1.
   */
  slot?: number;
  /** Explicit featured flag; defaults to slot === 1 when omitted. */
  featured?: boolean;
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

/** UTC weekday 0=Sun … 6=Sat → featured (slot 1) difficulty. */
export function difficultyForUtcDate(date: string): Difficulty {
  const wd = new Date(`${date}T00:00:00Z`).getUTCDay();
  if (wd === 0 || wd === 1 || wd === 3) return "easy";
  if (wd === 6) return "hard";
  return "medium";
}

/** Slot 1 uses the weekday pattern; siblings 2–10 cycle easy → medium → hard. */
export function difficultyForDailySlot(date: string, slot: number): Difficulty {
  if (slot <= 1) return difficultyForUtcDate(date);
  const cycle: Difficulty[] = ["easy", "medium", "hard"];
  return cycle[(slot - 2) % 3];
}

export function dailySlotOf(e: DailyEntry): number {
  return e.slot ?? 1;
}

export function isFeaturedDaily(e: DailyEntry): boolean {
  if (typeof e.featured === "boolean") return e.featured;
  return dailySlotOf(e) === 1;
}

/** Stable sort: date, then slot ascending. */
export function compareDailyEntries(a: DailyEntry, b: DailyEntry): number {
  const d = a.date.localeCompare(b.date);
  if (d) return d;
  return dailySlotOf(a) - dailySlotOf(b);
}

/** Legacy id daily-YYYY-MM-DD (pre multi-slot) or catalog {theme}-{diff}-{nn}. */
export function isLegacyDailyId(id: string, date: string): boolean {
  return id === `daily-${date}`;
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

export function dailyTitle(themeName: string, difficulty: Difficulty, slot = 1): string {
  const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  if (slot <= 1) return `Daily Word Search: ${themeName} (${label})`;
  return `${themeName} Word Search (${label})`;
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
