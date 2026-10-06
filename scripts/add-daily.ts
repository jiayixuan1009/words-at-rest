/**
 * Top up the daily puzzle schedule so there are always DAILY_BUFFER_DAYS
 * future days beyond today UTC (first schedulable date: 2026-10-07).
 * Idempotent: a second run with a full buffer writes nothing.
 *
 * Usage: npm run daily:add
 * Optional: DAILY_TODAY=YYYY-MM-DD to simulate "today" (UTC).
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { generateGrid, createRng } from "../lib/engine.ts";
import type { Difficulty, Puzzle, Theme } from "../lib/types.ts";
import {
  DAILY_BUFFER_DAYS,
  DAILY_DIFFICULTY_PATTERN,
  DAILY_EXCLUDED_THEMES,
  DAILY_MAX_WORD_OVERLAP,
  DAILY_SCHEDULE_START,
  DAILY_SIZES,
  DAILY_THEME_GAP_DAYS,
  DAILY_WORD_COUNTS,
  addUtcDays,
  dailyTitle,
  difficultyForUtcDate,
  gridFingerprint,
  listDatesInclusive,
  rankDailyThemes,
  wordSetOverlap,
  type DailyEntry,
  type DailyScheduleFile,
} from "../lib/daily.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schedulePath = join(root, "data/daily.json");
const themesDir = join(root, "data/themes");
const puzzlesDir = join(root, "data/puzzles");

function todayUtc(): string {
  return (process.env.DAILY_TODAY || new Date().toISOString().slice(0, 10)).slice(0, 10);
}

function loadSchedule(): DailyScheduleFile {
  const raw = JSON.parse(readFileSync(schedulePath, "utf8")) as DailyScheduleFile;
  if (raw.version !== 1 || !Array.isArray(raw.entries)) {
    throw new Error("data/daily.json: expected { version: 1, entries: [] }");
  }
  return raw;
}

function loadThemes(): Map<string, Theme> {
  const map = new Map<string, Theme>();
  for (const f of readdirSync(themesDir).filter((x) => x.endsWith(".json"))) {
    const t = JSON.parse(readFileSync(join(themesDir, f), "utf8")) as Theme;
    map.set(t.id, t);
  }
  return map;
}

function loadCatalogPuzzles(): Puzzle[] {
  return readdirSync(puzzlesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(puzzlesDir, f), "utf8")) as Puzzle);
}

function dateSeed(date: string): number {
  let h = 2166136261;
  for (const ch of `daily:${date}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0) || 1;
}

function recentThemes(entries: DailyEntry[], beforeDate: string, gap: number): string[] {
  const out: string[] = [];
  for (let i = 1; i <= gap; i++) {
    const d = addUtcDays(beforeDate, -i);
    const e = entries.find((x) => x.date === d);
    if (e) out.push(e.themeId);
  }
  return out;
}

function generateOne(
  date: string,
  themes: Map<string, Theme>,
  catalog: Puzzle[],
  existing: DailyEntry[],
): DailyEntry {
  const difficulty = difficultyForUtcDate(date);
  const size = DAILY_SIZES[difficulty];
  const count = DAILY_WORD_COUNTS[difficulty];
  const themeIds = [...themes.keys()].filter((id) => !DAILY_EXCLUDED_THEMES.has(id));
  const ranked = rankDailyThemes(date, themeIds, recentThemes(existing, date, DAILY_THEME_GAP_DAYS));
  if (!ranked.length) {
    throw new Error(`${date}: no theme candidates after gap filter`);
  }

  const existingFingerprints = new Set([
    ...catalog.map((p) => gridFingerprint(p.grid)),
    ...existing.map((e) => gridFingerprint(e.grid)),
  ]);

  const baseSeed = dateSeed(date);
  let lastErr = "";

  for (let themeIdx = 0; themeIdx < ranked.length; themeIdx++) {
    const themeId = ranked[themeIdx];
    const theme = themes.get(themeId)!;
    const sameThemeWords = [
      ...catalog.filter((p) => p.themeId === themeId).map((p) => p.words),
      ...existing.filter((e) => e.themeId === themeId).map((e) => e.words),
    ];

    for (let attempt = 0; attempt < 40; attempt++) {
      const seed = baseSeed + themeIdx * 1009 + attempt * 17;
      const rng = createRng(seed * 7 + 13);
      const pool = theme.words
        .map((w) => w.toUpperCase().replace(/[^A-Z]/g, ""))
        .filter((w) => w.length >= 3 && w.length <= size);
      const shuffled = [...pool].sort(() => rng() - 0.5);
      const chosen = shuffled.slice(0, count);
      if (chosen.length < count) {
        lastErr = `${themeId}: bank too small for ${difficulty}`;
        break;
      }

      let tooSimilar = false;
      for (const other of sameThemeWords) {
        if (wordSetOverlap(chosen, other) >= DAILY_MAX_WORD_OVERLAP) {
          tooSimilar = true;
          break;
        }
      }
      if (tooSimilar) {
        lastErr = `${themeId}: word overlap ≥ ${DAILY_MAX_WORD_OVERLAP}`;
        continue;
      }

      const { grid, placements, skipped } = generateGrid({
        words: chosen,
        size,
        difficulty,
        seed,
      });
      if (skipped.length || placements.length < count) {
        lastErr = `${themeId}: placed ${placements.length}/${count}, skipped ${skipped.join(",")}`;
        continue;
      }
      const fp = gridFingerprint(grid);
      if (existingFingerprints.has(fp)) {
        lastErr = `${themeId}: duplicate grid`;
        continue;
      }

      const words = placements.map((p) => p.word).sort();
      // Re-check overlap on final placed set
      for (const other of sameThemeWords) {
        if (wordSetOverlap(words, other) >= DAILY_MAX_WORD_OVERLAP) {
          tooSimilar = true;
          break;
        }
      }
      if (tooSimilar) continue;

      const id = `daily-${date}`;
      return {
        date,
        id,
        slug: id,
        themeId,
        difficulty,
        title: dailyTitle(theme.name, difficulty),
        primaryKeyword: `daily ${theme.primaryKeyword}`,
        gridSize: size,
        largePrint: false,
        words,
        grid,
        placements,
        seed,
        createdAt: new Date().toISOString(),
      };
    }
  }

  throw new Error(`${date}: failed to generate a unique daily puzzle (${lastErr})`);
}

function main() {
  const today = todayUtc();
  const horizon = addUtcDays(today, DAILY_BUFFER_DAYS);
  const needed = listDatesInclusive(DAILY_SCHEDULE_START, horizon);

  const schedule = loadSchedule();
  schedule.difficultyPattern = DAILY_DIFFICULTY_PATTERN;
  const byDate = new Map(schedule.entries.map((e) => [e.date, e]));
  const themes = loadThemes();
  const catalog = loadCatalogPuzzles();

  const missing = needed.filter((d) => !byDate.has(d));
  if (!missing.length) {
    console.log(`daily:add — buffer full through ${horizon} (today ${today}); nothing to do`);
    return;
  }

  const working = [...schedule.entries].sort((a, b) => a.date.localeCompare(b.date));
  const added: DailyEntry[] = [];
  for (const date of missing) {
    const entry = generateOne(date, themes, catalog, working);
    working.push(entry);
    working.sort((a, b) => a.date.localeCompare(b.date));
    added.push(entry);
    console.log(
      `+ ${date}  ${entry.title}  theme=${entry.themeId}  ${entry.difficulty}  seed=${entry.seed}  words=${entry.words.length}`,
    );
  }

  schedule.entries = working;
  writeFileSync(schedulePath, JSON.stringify(schedule, null, 2) + "\n");
  console.log(`wrote ${added.length} entr${added.length === 1 ? "y" : "ies"} → data/daily.json (through ${horizon})`);
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
