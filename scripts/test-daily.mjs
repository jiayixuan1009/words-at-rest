#!/usr/bin/env node
// Exercise the real publication implementation, not a copy of the date/hash logic.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { tsImport } from "tsx/esm/api";
const data = await tsImport("../lib/data.ts", import.meta.url);
const { addUtcDays, listDatesInclusive } = await tsImport("../lib/daily.ts", import.meta.url);
const schedule = JSON.parse(readFileSync(new URL("../data/daily.json", import.meta.url), "utf8"));
const initialToday = process.env.DAILY_TODAY;
try {
  process.env.DAILY_TODAY = "2026-10-06";
  const launch = JSON.stringify(data.getDailyPuzzle("2026-10-06"));
  assert.equal(data.getDailyPuzzle("2026-10-06").id, "animals-hard-01");
  assert.equal(data.isValidDailyDate("2026-10-06"), true);
  assert.equal(data.isValidDailyDate("2026-10-07"), false);
  assert.equal(data.isValidDailyDate("calendar"), false);
  assert.equal(data.isValidDailyDate("2026-02-30"), false);
  assert.equal(data.isValidDailyDate("2026-10-05"), false);

  const catalog = data.getPuzzles();
  const before = [...catalog];
  const frozenCatalogPuzzle = catalog.find((p) => p.id === "animals-hard-01");
  const letter = frozenCatalogPuzzle.grid[0][0];
  try {
    catalog.reverse();
    catalog.push({ ...catalog[0], id: "added-for-test" });
    frozenCatalogPuzzle.grid[0][0] = "?";
    assert.equal(JSON.stringify(data.getDailyPuzzle("2026-10-06")), launch, "catalog edits must not change launch archive");
  } finally {
    frozenCatalogPuzzle.grid[0][0] = letter;
    catalog.splice(0, catalog.length, ...before);
  }

  process.env.DAILY_TODAY = "2026-10-07";
  assert.equal(data.isValidDailyDate("2026-10-07"), true);
  assert.equal(data.isValidDailyDate("2026-10-08"), false);
  assert.equal(data.getDailyPuzzle("2026-10-07").id, "daily-2026-10-07");
  assert.equal(data.getDailyPuzzle("2026-10-07").difficulty, "easy");

  // Simulate an exhausted buffer: no invented puzzle, no archive/sitemap links.
  const firstMissing = addUtcDays(schedule.entries.at(-1).date, 1);
  process.env.DAILY_TODAY = firstMissing;
  assert.equal(data.isValidDailyDate(firstMissing), false);
  assert.equal(data.getDailyArchive(366).includes(firstMissing), false);
  assert.equal(data.latestVisibleDailyDate(), schedule.entries.at(-1).date);
  assert.throws(() => data.getDailyPuzzle(firstMissing), /not published/);
  assert.equal(data.getDailyPuzzle("2026-10-06").id, "animals-hard-01");

  if (initialToday === undefined) delete process.env.DAILY_TODAY;
  else process.env.DAILY_TODAY = initialToday;
  const horizon = addUtcDays(data.todayUtc(), 7);
  const dates = new Set(schedule.entries.map((e) => e.date));
  for (const date of listDatesInclusive("2026-10-07", horizon)) assert.ok(dates.has(date), "Missing daily buffer: " + date);
  console.log("daily:test OK — pinned launch, catalog expansion, UTC/future/malformed dates, exhausted-buffer publication, continuity.");
} finally {
  if (initialToday === undefined) delete process.env.DAILY_TODAY;
  else process.env.DAILY_TODAY = initialToday;
}
