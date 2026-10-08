import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { featuredPuzzles, matchesTheme } from "../lib/discovery.ts";
const root = new URL("../", import.meta.url);
const puzzles = readdirSync(new URL("data/puzzles/", root)).filter(f => f.endsWith(".json"))
  .map(f => JSON.parse(readFileSync(new URL(`data/puzzles/${f}`, root))));
const packs = JSON.parse(readFileSync(new URL("data/printables.json", root)));

test("Every monthly home selection spans six themes and includes large print and all levels", () => {
  for (let month = 1; month <= 12; month++) {
    const picks = featuredPuzzles(puzzles, `2026-${String(month).padStart(2, "0")}-15`);
    assert.equal(picks.length, 6);
    assert.equal(new Set(picks.map(p => p.themeId)).size, 6);
    assert.ok(picks.some(p => p.largePrint));
    for (const level of ["easy", "medium", "hard"]) assert.ok(picks.some(p => p.difficulty === level));
  }
  assert.ok(featuredPuzzles(puzzles, "2026-10-08").some(p => p.themeId === "halloween"));
  assert.ok(featuredPuzzles(puzzles, "2026-11-08").some(p => p.themeId === "thanksgiving"));
  assert.ok(!featuredPuzzles(puzzles, "2026-01-08").some(p => p.themeId === "christmas"));
});
test("Theme search handles case, whitespace and groups together", () => {
  const t = { name: "Coffee & Tea", slug: "coffee-tea", season: "evergreen" };
  assert.equal(matchesTheme(t, "  TEA coffee  ", "anytime"), true);
  assert.equal(matchesTheme(t, "tea", "seasonal"), false);
  assert.equal(matchesTheme(t, "dog", "all"), false);
  assert.equal(matchesTheme({ name: "Large Print Pack", slug: "large-print-pack", season: "evergreen" }, "large print", "packs"), true);
});
test("Catalog titles remain distinguishable without changing puzzle IDs", () => {
  const titles = puzzles.map(p => p.title);
  assert.equal(new Set(titles).size, titles.length, "Duplicate puzzle title");
});
test("Every printable has matching catalog puzzles, Letter/A4 PDFs and both previews", () => {
  for (const pack of packs) {
    for (const id of pack.ids) {
      const p = puzzles.find(p => p.id === id);
      assert.ok(p && p.largePrint && p.gridSize === 9);
    }
    for (const format of ["letter", "a4"]) {
      const file = new URL(`public/printables/${pack.slug}-${format}.pdf`, root);
      assert.equal(readFileSync(file).subarray(0, 5).toString(), "%PDF-");
    }
    for (const n of [1, 2]) assert.ok(existsSync(new URL(`public/printables/${pack.slug}-${n}.png`, root)));
  }
});
