import { puzzles } from "../data/puzzles";
import { themes } from "../data/themes";
import dailySchedule from "../data/daily.json";
import { SITE } from "./site";
import type { Difficulty, Puzzle, Theme } from "./types";
import { DIFFICULTIES } from "./types";
import {
  dailyEntryToPuzzle,
  type DailyEntry,
  type DailyScheduleFile,
} from "./daily";

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
// From 2026-10-07: unique puzzles in data/daily.json (pre-queued; unlock at
// midnight UTC with no deploy). 2026-10-06 keeps the original hash pick over
// the non-large-print catalog so the already-live page never changes.
// Archive /sitemap /calendar only include dates from SITE.dailyStart through
// today UTC. Future dates 404 via isValidDailyDate. "calendar" is not a date.

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const schedule = dailySchedule as DailyScheduleFile;
const scheduledByDate = new Map(schedule.entries.map((e) => [e.date, e]));

export function getDailyScheduleEntries(): DailyEntry[] {
  return schedule.entries;
}

export function getScheduledDailyEntry(date: string): DailyEntry | undefined {
  return scheduledByDate.get(date);
}

/**
 * UTC "today" for the daily rotation. Override with env DAILY_TODAY=YYYY-MM-DD
 * for local QA (preview builds, check scripts). Production leaves it unset.
 */
export function todayUtc(): string {
  const override = process.env.DAILY_TODAY?.trim();
  if (override && DATE_RE.test(override)) return override;
  return new Date().toISOString().slice(0, 10);
}

/**
 * The date whose puzzle /daily shows as "today".
 *
 * Choice (documented in AUDIT-FIXES.md): the daily rotation stays on **UTC** so every
 * visitor worldwide sees the same puzzle and dated URLs never shift with time zones.
 * At launch, UTC can lag the operator's Asia/Shanghai calendar by up to 8 hours; rather
 * than showing a "(preview)" page in that window, we clamp to SITE.dailyStart — i.e. the
 * launch-day puzzle is live as soon as the site is, and normal UTC rotation takes over
 * from the first UTC day >= dailyStart.
 */
export function currentDailyDate(): string {
  const t = todayUtc();
  return t >= SITE.dailyStart ? t : SITE.dailyStart;
}

export function isValidDailyDate(date: string): boolean {
  if (!DATE_RE.test(date)) return false;
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== date) return false;
  return date >= SITE.dailyStart && date <= currentDailyDate();
}

/** Hash pick over the non-large-print catalog (launch-day fallback). */
export function hashDailyPuzzle(date: string): Puzzle {
  const pool = puzzles.filter((p) => !p.largePrint);
  let h = 2166136261;
  for (const ch of date) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return pool[(h >>> 0) % pool.length];
}

export function getDailyPuzzle(date: string): Puzzle {
  const scheduled = scheduledByDate.get(date);
  if (scheduled) return dailyEntryToPuzzle(scheduled);
  return hashDailyPuzzle(date);
}

/** Archive dates, newest first (past + today only). */
export function getDailyArchive(limit = 30): string[] {
  const out: string[] = [];
  const start = new Date(`${SITE.dailyStart}T00:00:00Z`).getTime();
  let t = new Date(`${currentDailyDate()}T00:00:00Z`).getTime();
  while (t >= start && out.length < limit) {
    out.push(new Date(t).toISOString().slice(0, 10));
    t -= 86400000;
  }
  return out;
}

/** Latest scheduled daily date that is ≤ today (for calendar dateModified). */
export function latestVisibleDailyDate(): string {
  const today = currentDailyDate();
  let best = SITE.dailyStart;
  for (const e of schedule.entries) {
    if (e.date <= today && e.date > best) best = e.date;
  }
  if (SITE.dailyStart <= today && SITE.dailyStart > best) best = SITE.dailyStart;
  // Launch day always counts even without a schedule entry
  if (today >= SITE.dailyStart) {
    const archive = getDailyArchive(1);
    if (archive[0] && archive[0] > best) best = archive[0];
  }
  return best;
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
