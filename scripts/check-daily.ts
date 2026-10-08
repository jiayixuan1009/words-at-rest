/**
 * Validate data/daily.json: continuity, uniqueness, grid/word rules, buffer.
 * Multi-slot: today+future dates require DAILY_PER_DATE entries (slots 1–10);
 * past dates may still have a single legacy entry.
 * Usage: npm run daily:check
 * Optional: DAILY_TODAY=YYYY-MM-DD
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DIRECTION_VECTORS } from "../lib/engine.ts";
import type { Puzzle, Theme } from "../lib/types.ts";
import {
  DAILY_BUFFER_DAYS,
  DAILY_PER_DATE,
  DAILY_EXCLUDED_THEMES,
  DAILY_MAX_WORD_OVERLAP,
  DAILY_SCHEDULE_START,
  DAILY_SIZES,
  DAILY_THEME_GAP_DAYS,
  DAILY_WORD_COUNTS,
  addUtcDays,
  compareDailyEntries,
  dailySlotOf,
  difficultyForDailySlot,
  difficultyForUtcDate,
  gridFingerprint,
  isFeaturedDaily,
  isLegacyDailyId,
  listDatesInclusive,
  wordSetOverlap,
  type DailyEntry,
  type DailyScheduleFile,
} from "../lib/daily.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schedulePath = join(root, "data/daily.json");
const puzzlesDir = join(root, "data/puzzles");

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
  console.log(
    `daily:check — today ${today}, horizon ${horizon}, entries ${schedule.entries.length}, target ${DAILY_PER_DATE}/day`,
  );

  if (schedule.version !== 1) fail(`version ${schedule.version}`);
  const entries = [...schedule.entries].sort(compareDailyEntries);
  const byDate = new Map<string, DailyEntry[]>();
  const fingerprints = new Set<string>();
  const ids = new Set<string>();

  const catalog: Puzzle[] = readdirSync(puzzlesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(puzzlesDir, f), "utf8")) as Puzzle);

  const themes = new Map<string, Theme>(
    readdirSync(join(root, "data/themes"))
      .filter((f) => f.endsWith(".json"))
      .map((f) => {
        const t = JSON.parse(readFileSync(join(root, "data/themes", f), "utf8")) as Theme;
        return [t.id, t];
      }),
  );

  for (const e of entries) {
    const list = byDate.get(e.date) ?? [];
    list.push(e);
    byDate.set(e.date, list);

    if (e.date < DAILY_SCHEDULE_START) fail(`${e.date}: before schedule start`);
    if (ids.has(e.id)) fail(`duplicate id ${e.id}`);
    ids.add(e.id);

    const slot = dailySlotOf(e);
    if (slot < 1 || slot > DAILY_PER_DATE) fail(`${e.date} ${e.id}: slot ${slot} out of range`);

    const legacy = isLegacyDailyId(e.id, e.date);
    if (legacy) {
      if (slot !== 1) fail(`${e.date}: legacy id must be slot 1`);
      if (e.slug !== e.id) fail(`${e.date}: legacy slug must match id`);
    } else {
      const expectPrefix = `${e.themeId}-${e.difficulty}-`;
      if (!e.id.startsWith(expectPrefix) || e.slug !== e.id) {
        fail(`${e.date} slot ${slot}: id/slug must be ${expectPrefix}nn`);
      }
      if (!existsSync(join(puzzlesDir, `${e.id}.json`))) {
        fail(`${e.date} slot ${slot}: missing catalog file data/puzzles/${e.id}.json`);
      }
    }

    if (e.largePrint !== false) fail(`${e.date} ${e.id}: largePrint must be false`);
    if (DAILY_EXCLUDED_THEMES.has(e.themeId)) fail(`${e.date} ${e.id}: excluded theme ${e.themeId}`);
    if (!themes.has(e.themeId)) fail(`${e.date} ${e.id}: unknown theme ${e.themeId}`);

    const expectedDiff = difficultyForDailySlot(e.date, slot);
    // Legacy featured rows used weekday pattern only (slot 1) — same as difficultyForDailySlot(date,1)
    if (e.difficulty !== expectedDiff) {
      fail(`${e.date} slot ${slot}: difficulty ${e.difficulty}, expected ${expectedDiff}`);
    }
    if (isFeaturedDaily(e) && e.difficulty !== difficultyForUtcDate(e.date)) {
      fail(`${e.date}: featured difficulty must match weekday pattern`);
    }
    if (e.gridSize !== DAILY_SIZES[e.difficulty]) fail(`${e.date} ${e.id}: gridSize ${e.gridSize}`);
    const need = DAILY_WORD_COUNTS[e.difficulty];
    if (e.words.length !== need || e.placements.length !== need) {
      fail(`${e.date} ${e.id}: words/placements ${e.words.length}/${e.placements.length}, need ${need}`);
    }
    if (e.grid.length !== e.gridSize || e.grid.some((r) => r.length !== e.gridSize)) {
      fail(`${e.date} ${e.id}: grid dimensions`);
    }
    for (const p of e.placements) {
      const spelled = placementSpells(e, p);
      if (spelled !== p.word) fail(`${e.date} ${e.id}: placement ${p.word} spells ${spelled}`);
      if (!e.words.includes(p.word)) fail(`${e.date} ${e.id}: placement word missing from words[]`);
    }
    const fp = gridFingerprint(e.grid);
    if (fingerprints.has(fp)) fail(`${e.date} ${e.id}: duplicate grid fingerprint`);
    fingerprints.add(fp);
    for (const p of catalog) {
      // Catalog copy of the same id is expected; other ids must not share the grid
      if (p.id !== e.id && gridFingerprint(p.grid) === fp) {
        fail(`${e.date} ${e.id}: grid matches catalog ${p.id}`);
      }
    }
  }

  // Per-date slot uniqueness + theme uniqueness + counts
  for (const [date, list] of byDate) {
    const slots = new Set<number>();
    const themeIds = new Set<string>();
    let featured = 0;
    for (const e of list) {
      const s = dailySlotOf(e);
      if (slots.has(s)) fail(`${date}: duplicate slot ${s}`);
      slots.add(s);
      if (themeIds.has(e.themeId)) fail(`${date}: duplicate theme ${e.themeId}`);
      themeIds.add(e.themeId);
      if (isFeaturedDaily(e)) featured++;
    }
    if (featured !== 1) fail(`${date}: expected exactly 1 featured, got ${featured}`);
    if (!slots.has(1)) fail(`${date}: missing slot 1 (featured)`);

    if (date >= today && date <= horizon) {
      if (list.length !== DAILY_PER_DATE) {
        fail(`${date}: expected ${DAILY_PER_DATE} entries for today/future buffer, got ${list.length}`);
      }
      for (let s = 1; s <= DAILY_PER_DATE; s++) {
        if (!slots.has(s)) fail(`${date}: missing slot ${s}`);
      }
    } else if (date < today) {
      if (list.length < 1) fail(`${date}: past date has no entries`);
    }
  }

  // Continuity + buffer (at least a featured entry every day)
  const needed = listDatesInclusive(DAILY_SCHEDULE_START, horizon);
  for (const d of needed) {
    if (!byDate.has(d)) fail(`missing schedule entry for ${d}`);
  }

  // Theme gap: featured-to-featured only (siblings diversify via generator heuristics)
  for (const e of entries) {
    if (!isFeaturedDaily(e)) continue;
    for (let i = 1; i <= DAILY_THEME_GAP_DAYS; i++) {
      const prevDate = addUtcDays(e.date, -i);
      const prevList = byDate.get(prevDate) ?? [];
      for (const prev of prevList) {
        if (!isFeaturedDaily(prev)) continue;
        if (prev.themeId === e.themeId) {
          fail(
            `${e.date} featured: theme ${e.themeId} also featured on ${prev.date} (gap ${DAILY_THEME_GAP_DAYS})`,
          );
        }
      }
    }
  }

  // Word overlap vs catalog + other dailies of same theme (skip self catalog twin)
  for (const e of entries) {
    const others = [
      ...catalog.filter((p) => p.themeId === e.themeId && p.id !== e.id),
      ...entries.filter((x) => x.themeId === e.themeId && x.id !== e.id),
    ];
    for (const o of others) {
      const words = o.words;
      const ov = wordSetOverlap(e.words, words);
      if (ov >= DAILY_MAX_WORD_OVERLAP) {
        const label = "id" in o ? o.id : (o as DailyEntry).date;
        fail(`${e.date} ${e.id}: word overlap ${ov.toFixed(2)} with ${label}`);
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
