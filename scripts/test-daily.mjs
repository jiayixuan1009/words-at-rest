#!/usr/bin/env node
/**
 * Unit-style checks for the daily schedule without a running server.
 * Proves: launch-day hash fallback, scheduled entry for 2026-10-07,
 * future dates rejected by isValidDailyDate logic, buffer continuity.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schedule = JSON.parse(readFileSync(join(root, "data/daily.json"), "utf8"));
const puzzles = [];
import { readdirSync } from "node:fs";
for (const f of readdirSync(join(root, "data/puzzles")).filter((x) => x.endsWith(".json"))) {
  puzzles.push(JSON.parse(readFileSync(join(root, "data/puzzles", f), "utf8")));
}

let failures = 0;
const ok = (cond, msg) => {
  if (!cond) {
    failures++;
    console.error(`  ✗ ${msg}`);
  } else console.log(`  ✓ ${msg}`);
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function todayUtc() {
  return (process.env.DAILY_TODAY || new Date().toISOString().slice(0, 10)).slice(0, 10);
}
function currentDailyDate(start = "2026-10-06") {
  const t = todayUtc();
  return t >= start ? t : start;
}
function isValidDailyDate(date, start = "2026-10-06") {
  if (!DATE_RE.test(date)) return false;
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== date) return false;
  return date >= start && date <= currentDailyDate(start);
}
function hashPick(date) {
  const pool = puzzles.filter((p) => !p.largePrint);
  let h = 2166136261;
  for (const ch of date) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return pool[(h >>> 0) % pool.length];
}

console.log(`test-daily — simulated today ${todayUtc()}`);

// 1) Launch day unchanged
const launch = hashPick("2026-10-06");
ok(launch.id === "christmas-hard-01", `2026-10-06 hash pick is christmas-hard-01 (got ${launch.id})`);
ok(!schedule.entries.some((e) => e.date === "2026-10-06"), "2026-10-06 not in schedule");

// 2) Scheduled unique content for 2026-10-07
const e7 = schedule.entries.find((e) => e.date === "2026-10-07");
ok(!!e7, "schedule has 2026-10-07");
ok(e7?.themeId === "halloween" && e7?.difficulty === "easy", "2026-10-07 is Halloween easy");
ok(e7?.id !== launch.id, "2026-10-07 is not the launch hash puzzle");

// 3) Future 404 with today=2026-10-06
process.env.DAILY_TODAY = "2026-10-06";
ok(isValidDailyDate("2026-10-06") === true, "today 2026-10-06 is valid");
ok(isValidDailyDate("2026-10-07") === false, "future 2026-10-07 is invalid when today is 2026-10-06");
ok(isValidDailyDate("calendar") === false, "'calendar' is not a valid daily date");

// 4) When today advances, scheduled day becomes valid
process.env.DAILY_TODAY = "2026-10-07";
ok(isValidDailyDate("2026-10-07") === true, "2026-10-07 valid when today is 2026-10-07");
ok(isValidDailyDate("2026-10-08") === false, "2026-10-08 still future");

// 5) Buffer through today+7 from real/default today
delete process.env.DAILY_TODAY;
const today = todayUtc();
const horizonMs = new Date(`${today}T00:00:00Z`).getTime() + 7 * 86400000;
const horizon = new Date(horizonMs).toISOString().slice(0, 10);
const byDate = new Set(schedule.entries.map((e) => e.date));
let d = "2026-10-07";
let missing = 0;
while (d <= horizon) {
  if (!byDate.has(d)) missing++;
  d = new Date(new Date(`${d}T00:00:00Z`).getTime() + 86400000).toISOString().slice(0, 10);
}
ok(missing === 0, `continuous schedule 2026-10-07…${horizon}`);

if (failures) {
  console.error(`\n${failures} failure(s)`);
  process.exit(1);
}
console.log("\ntest-daily OK");
