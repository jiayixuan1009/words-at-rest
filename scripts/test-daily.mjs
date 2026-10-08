#!/usr/bin/env node
// Exercise the real publication implementation, not a copy of the date/hash logic.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { tsImport } from "tsx/esm/api";
const data = await tsImport("../lib/data.ts", import.meta.url);
const daily = await tsImport("../lib/daily.ts", import.meta.url);
const { addUtcDays, listDatesInclusive, DAILY_PER_DATE, isFeaturedDaily, dailySlotOf } = daily;
const schedule = JSON.parse(readFileSync(new URL("../data/daily.json", import.meta.url), "utf8"));
const initialToday = process.env.DAILY_TODAY;
try {
  process.env.DAILY_TODAY = "2026-10-06";
  const launch = JSON.stringify(data.getDailyPuzzle("2026-10-06"));
  assert.equal(data.getDailyPuzzle("2026-10-06").id, "animals-hard-01");
  assert.equal(data.getDailyPuzzles("2026-10-06").length, 1);
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
  // 2026-10-07 is a past single-entry legacy day when "today" is 10-07 in this sim —
  // at least the featured exists.
  assert.ok(data.getDailyPuzzles("2026-10-07").length >= 1);

  // Simulate an exhausted buffer: no invented puzzle, no archive/sitemap links.
  const lastDate = schedule.entries.map((e) => e.date).sort().at(-1);
  const firstMissing = addUtcDays(lastDate, 1);
  process.env.DAILY_TODAY = firstMissing;
  assert.equal(data.isValidDailyDate(firstMissing), false);
  assert.equal(data.getDailyArchive(366).includes(firstMissing), false);
  assert.equal(data.latestVisibleDailyDate(), lastDate);
  assert.throws(() => data.getDailyPuzzle(firstMissing), /not published/);
  assert.equal(data.getDailyPuzzle("2026-10-06").id, "animals-hard-01");

  if (initialToday === undefined) delete process.env.DAILY_TODAY;
  else process.env.DAILY_TODAY = initialToday;
  const horizon = addUtcDays(data.todayUtc(), 7);
  const dates = new Set(schedule.entries.map((e) => e.date));
  for (const date of listDatesInclusive("2026-10-07", horizon)) {
    assert.ok(dates.has(date), "Missing daily buffer: " + date);
  }

  // Multi-slot invariants on schedule file (when topped up)
  const byDate = new Map();
  for (const e of schedule.entries) {
    const list = byDate.get(e.date) ?? [];
    list.push(e);
    byDate.set(e.date, list);
  }
  const realToday = data.todayUtc();
  for (const [date, list] of byDate) {
    const featured = list.filter((e) => (e.featured === true) || (e.slot ?? 1) === 1);
    assert.equal(featured.length, 1, date + " featured count");
    if (date >= realToday) {
      assert.equal(list.length, DAILY_PER_DATE, date + " should have " + DAILY_PER_DATE);
      const slots = new Set(list.map((e) => e.slot ?? 1));
      for (let s = 1; s <= DAILY_PER_DATE; s++) assert.ok(slots.has(s), date + " missing slot " + s);
    }
  }

  console.log(
    "daily:test OK — pinned launch, catalog expansion, UTC/future/malformed dates, exhausted-buffer publication, continuity, multi-slot.",
  );
} finally {
  if (initialToday === undefined) delete process.env.DAILY_TODAY;
  else process.env.DAILY_TODAY = initialToday;
}
