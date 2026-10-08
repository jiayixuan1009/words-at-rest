import { puzzles } from "../data/puzzles";
import { themes } from "../data/themes";
import dailySchedule from "../data/daily.json";
import launchPuzzle from "../data/daily-launch.json";
import { SITE } from "./site";
import type { Difficulty, Puzzle, Theme } from "./types";
import { DIFFICULTIES } from "./types";
import {
  compareDailyEntries,
  dailyEntryToPuzzle,
  isFeaturedDaily,
  type DailyEntry,
  type DailyScheduleFile,
} from "./daily";

export function getThemes(): Theme[] {
  return themes;
}

export function getTheme(slug: string): Theme | undefined {
  return themes.find((t) => t.slug === slug);
}

/** Flat child themes that declare parentSlug (e.g. golf → sports). */
export function getChildThemes(parentSlug: string): Theme[] {
  return themes.filter((t) => t.parentSlug === parentSlug);
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
// From 2026-10-07: puzzles in data/daily.json (pre-queued; unlock at midnight
// UTC with no deploy). Each date targets up to 10 entries (slot 1 = featured);
// new entries are also theme-catalog puzzles. Launch day is a frozen snapshot,
// independent of catalog size/order. Unscheduled dates are not published.
// Archive /sitemap /calendar only include dates from SITE.dailyStart through
// today UTC. Future dates 404 via isValidDailyDate. "calendar" is not a date.

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const schedule = dailySchedule as DailyScheduleFile;

function buildScheduleIndex(entries: DailyEntry[]) {
  const byDate = new Map<string, DailyEntry[]>();
  for (const e of entries) {
    const list = byDate.get(e.date) ?? [];
    list.push(e);
    byDate.set(e.date, list);
  }
  for (const list of byDate.values()) list.sort(compareDailyEntries);
  return byDate;
}

const scheduledByDate = buildScheduleIndex(schedule.entries);

export function getDailyScheduleEntries(): DailyEntry[] {
  return [...schedule.entries].sort(compareDailyEntries);
}

/** All schedule rows for a date (sorted by slot). Empty if unpublished. */
export function getScheduledDailyEntries(date: string): DailyEntry[] {
  return scheduledByDate.get(date) ?? [];
}

/** Featured (slot 1) schedule row for a date. */
export function getScheduledDailyEntry(date: string): DailyEntry | undefined {
  const list = scheduledByDate.get(date);
  if (!list?.length) return undefined;
  return list.find(isFeaturedDaily) ?? list[0];
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
  return date >= SITE.dailyStart && date <= currentDailyDate() && hasDailyPuzzle(date);
}

export function hasDailyPuzzle(date: string): boolean {
  return date === "2026-10-06" || scheduledByDate.has(date);
}

/** Featured daily for a date (slot 1). Same UX as the historic single daily. */
export function getDailyPuzzle(date: string): Puzzle {
  const scheduled = getScheduledDailyEntry(date);
  if (scheduled) return dailyEntryToPuzzle(scheduled);
  if (date === "2026-10-06") return launchPuzzle as Puzzle;
  throw new Error(`Daily puzzle not published: ${date}`);
}

/** All dailies for a date, featured first then slots 2–10. Launch day → [launch]. */
export function getDailyPuzzles(date: string): Puzzle[] {
  const list = getScheduledDailyEntries(date);
  if (list.length) return list.map(dailyEntryToPuzzle);
  if (date === "2026-10-06") return [launchPuzzle as Puzzle];
  throw new Error(`Daily puzzle not published: ${date}`);
}

export function getDailySiblingPuzzles(date: string): Puzzle[] {
  return getScheduledDailyEntries(date)
    .filter((e) => !isFeaturedDaily(e))
    .map(dailyEntryToPuzzle);
}

/** Archive dates, newest first (past + today only). */
export function getDailyArchive(limit = 30): string[] {
  const out: string[] = [];
  const start = new Date(`${SITE.dailyStart}T00:00:00Z`).getTime();
  let t = new Date(`${currentDailyDate()}T00:00:00Z`).getTime();
  while (t >= start && out.length < limit) {
    const date = new Date(t).toISOString().slice(0, 10);
    if (hasDailyPuzzle(date)) out.push(date);
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
  const archive = getDailyArchive(1);
  if (archive[0] && archive[0] > best) best = archive[0];
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
