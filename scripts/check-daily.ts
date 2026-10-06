/**
 * Validate data/daily.json: continuity, uniqueness, grid/word rules, buffer.
 * Usage: npm run daily:check
 * Optional: DAILY_TODAY=YYYY-MM-DD
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DIRECTION_VECTORS } from "../lib/engine.ts";
import type { Puzzle, Theme } from "../lib/types.ts";
import {
  DAILY_BUFFER_DAYS,
  DAILY_EXCLUDED_THEMES,
  DAILY_MAX_WORD_OVERLAP,
  DAILY_SCHEDULE_START,
  DAILY_SIZES,
  DAILY_THEME_GAP_DAYS,
  DAILY_WORD_COUNTS,
  addUtcDays,
  difficultyForUtcDate,
  gridFingerprint,
  listDatesInclusive,
  wordSetOverlap,
  type DailyEntry,
  type DailyScheduleFile,
} from "../lib/daily.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schedulePath = join(root, "data/daily.json");

function todayUtc(): string {
  return (process.env.DAILY_TODAY || new Date().toISOString().slice(0, 10)).slice(0, 10);
}

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};

function placementSpells(e: DailyEntry, p: DailyEntry["placements"][number]): string {
  const [dr, dc] = DIRECTION_VECTORS[p.direction];
  return Array.from({ length: p.word.length }, (_, i) => e.grid[p.row + dr * i]?.[p.col + dc * i] ?? "?").join("");
}

function main() {
  const today = todayUtc();
  const horizon = addUtcDays(today, DAILY_BUFFER_DAYS);
  const schedule = JSON.parse(readFileSync(schedulePath, "utf8")) as DailyScheduleFile;
  console.log(`daily:check — today ${today}, horizon ${horizon}, entries ${schedule.entries.length}`);

  if (schedule.version !== 1) fail(`version ${schedule.version}`);
  const entries = [...schedule.entries].sort((a, b) => a.date.localeCompare(b.date));
  const byDate = new Map<string, DailyEntry>();
  const fingerprints = new Set<string>();
  const ids = new Set<string>();

  const catalog: Puzzle[] = readdirSync(join(root, "data/puzzles"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(root, "data/puzzles", f), "utf8")) as Puzzle);

  const themes = new Map<string, Theme>(
    readdirSync(join(root, "data/themes"))
      .filter((f) => f.endsWith(".json"))
      .map((f) => {
        const t = JSON.parse(readFileSync(join(root, "data/themes", f), "utf8")) as Theme;
        return [t.id, t];
      }),
  );

  for (const e of entries) {
    if (byDate.has(e.date)) fail(`duplicate date ${e.date}`);
    byDate.set(e.date, e);
    if (e.date < DAILY_SCHEDULE_START) fail(`${e.date}: before schedule start`);
    if (ids.has(e.id)) fail(`duplicate id ${e.id}`);
    ids.add(e.id);
    if (e.id !== `daily-${e.date}` || e.slug !== e.id) fail(`${e.date}: id/slug must be daily-YYYY-MM-DD`);
    if (e.largePrint !== false) fail(`${e.date}: largePrint must be false`);
    if (DAILY_EXCLUDED_THEMES.has(e.themeId)) fail(`${e.date}: excluded theme ${e.themeId}`);
    if (!themes.has(e.themeId)) fail(`${e.date}: unknown theme ${e.themeId}`);
    const expectedDiff = difficultyForUtcDate(e.date);
    if (e.difficulty !== expectedDiff) fail(`${e.date}: difficulty ${e.difficulty}, expected ${expectedDiff}`);
    if (e.gridSize !== DAILY_SIZES[e.difficulty]) fail(`${e.date}: gridSize ${e.gridSize}`);
    const need = DAILY_WORD_COUNTS[e.difficulty];
    if (e.words.length !== need || e.placements.length !== need) {
      fail(`${e.date}: words/placements ${e.words.length}/${e.placements.length}, need ${need}`);
    }
    if (e.grid.length !== e.gridSize || e.grid.some((r) => r.length !== e.gridSize)) {
      fail(`${e.date}: grid dimensions`);
    }
    for (const p of e.placements) {
      const spelled = placementSpells(e, p);
      if (spelled !== p.word) fail(`${e.date}: placement ${p.word} spells ${spelled}`);
      if (!e.words.includes(p.word)) fail(`${e.date}: placement word missing from words[]`);
    }
    const fp = gridFingerprint(e.grid);
    if (fingerprints.has(fp)) fail(`${e.date}: duplicate grid fingerprint`);
    fingerprints.add(fp);
    for (const p of catalog) {
      if (gridFingerprint(p.grid) === fp) fail(`${e.date}: grid matches catalog ${p.id}`);
    }
  }

  // Continuity + buffer
  const needed = listDatesInclusive(DAILY_SCHEDULE_START, horizon);
  for (const d of needed) {
    if (!byDate.has(d)) fail(`missing schedule entry for ${d}`);
  }

  // Theme gap
  for (const e of entries) {
    for (let i = 1; i <= DAILY_THEME_GAP_DAYS; i++) {
      const prev = byDate.get(addUtcDays(e.date, -i));
      if (prev && prev.themeId === e.themeId) {
        fail(`${e.date}: theme ${e.themeId} also on ${prev.date} (gap ${DAILY_THEME_GAP_DAYS})`);
      }
    }
  }

  // Word overlap vs catalog + other dailies of same theme
  for (const e of entries) {
    const others = [
      ...catalog.filter((p) => p.themeId === e.themeId),
      ...entries.filter((x) => x.themeId === e.themeId && x.date !== e.date),
    ];
    for (const o of others) {
      const words = "words" in o ? o.words : [];
      const ov = wordSetOverlap(e.words, words);
      if (ov >= DAILY_MAX_WORD_OVERLAP) {
        const label = "id" in o ? o.id : (o as DailyEntry).date;
        fail(`${e.date}: word overlap ${ov.toFixed(2)} with ${label}`);
      }
    }
  }

  if (failures) {
    console.error(`\n${failures} problem(s)`);
    process.exit(1);
  }
  console.log("daily:check OK");
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
