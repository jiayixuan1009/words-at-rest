import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { matchSelection, restoreProgress, moveGridFocus } from "../lib/game.ts";
import { placementCells, DIRECTIONS_BY_DIFFICULTY, DIRECTION_VECTORS } from "../lib/engine.ts";
import { readConsent, setConsent, trackEvent } from "../lib/analytics.ts";
import { bandGeometry } from "../lib/puzzle-feedback.ts";

test("Feedback bands follow actual cell centres in every direction and at resized widths", () => {
  const metrics = { width: 300, height: 300, x: 20, y: 20, dx: 30, dy: 30, thickness: 21 };
  assert.equal(bandGeometry([], metrics), null);
  assert.deepEqual(bandGeometry([[1, 1]], metrics), { x1: 50, y1: 50, x2: 50, y2: 50 });
  for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
    const a = [2, 2], b = [2 + dr * 3, 2 + dc * 3];
    const forward = bandGeometry([a, b], metrics), reverse = bandGeometry([b, a], metrics);
    assert.deepEqual(reverse, { x1: forward.x2, y1: forward.y2, x2: forward.x1, y2: forward.y1 });
    const enlarged = bandGeometry([a, b], { ...metrics, x: 40, y: 40, dx: 60, dy: 60 });
    assert.deepEqual(enlarged, Object.fromEntries(Object.entries(forward).map(([k, v]) => [k, v * 2])));
  }
});

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const halloween = read("../data/puzzles/halloween-easy-01.json");
const catalog = readdirSync(new URL("../data/puzzles/", import.meta.url)).filter((p) => p.endsWith(".json")).map((p) => read("../data/puzzles/" + p));
const daily = read("../data/daily.json").entries;

test("Both BAT occurrences count, either endpoint order", () => {
  for (const [a, b] of [[[1, 1], [3, 1]], [[3, 3], [3, 5]]]) {
    assert.equal(matchSelection(halloween.grid, halloween.words, "easy", a, b)?.word, "BAT");
    assert.equal(matchSelection(halloween.grid, halloween.words, "easy", b, a)?.word, "BAT");
  }
});
test("Persist the actual path, migrate legacy progress, reject forged paths", () => {
  const cells = [[3, 3], [3, 4], [3, 5]];
  const restore = (raw) => restoreProgress(raw, halloween.grid, halloween.words, halloween.placements, "easy");
  assert.deepEqual(restore({ version: 2, found: { BAT: cells } }), { BAT: cells });
  assert.deepEqual(restore(["BAT", "BOGUS", "BAT"]), { BAT: [[1, 1], [2, 1], [3, 1]] });
  assert.deepEqual(restore({ version: 2, found: { BAT: [[3, 3], [9, 9], [3, 5]], BOGUS: cells } }), {});
  assert.deepEqual(restore({ version: 2, found: { BAT: [[-1, 0], [0, 0], [1, 0]] } }), {});
});
test("Reject disallowed word directions and non-straight selections", () => {
  const g = [["B", "X", "T"], ["X", "A", "X"], ["B", "X", "T"]];
  assert.equal(matchSelection(g, ["BAT"], "easy", [0, 0], [2, 2]), null);
  assert.equal(matchSelection(g, ["BAT"], "medium", [0, 0], [2, 2])?.word, "BAT");
  assert.equal(matchSelection(g, ["BAT"], "easy", [0, 0], [1, 2]), null);
  assert.equal(matchSelection(g, ["BAT"], "hard", [0, 0], [100000, 0]), null);
  assert.equal(matchSelection(g, ["BAT"], "hard", [0.5, 0], [2, 2]), null);
});
test("Every published placement and legal extra occurrence is selectable", () => {
  let occurrences = 0;
  for (const p of [...catalog, ...daily]) {
    for (const placement of p.placements) {
      const cells = placementCells(placement);
      assert.equal(matchSelection(p.grid, p.words, p.difficulty, cells[0], cells.at(-1))?.word, placement.word, p.id);
    }
    for (const word of p.words) for (const direction of DIRECTIONS_BY_DIFFICULTY[p.difficulty]) {
      const [dr, dc] = DIRECTION_VECTORS[direction];
      for (let r = 0; r < p.grid.length; r++) for (let c = 0; c < p.grid.length; c++) {
        if (![...word].every((letter, i) => p.grid[r + dr * i]?.[c + dc * i] === letter)) continue;
        const end = [r + dr * (word.length - 1), c + dc * (word.length - 1)];
        assert.equal(matchSelection(p.grid, p.words, p.difficulty, [r, c], end)?.word, word, p.id + " " + word);
        occurrences++;
      }
    }
  }
  console.log(`Validated ${catalog.length} catalog + ${daily.length} daily puzzles, ${occurrences} occurrences.`);
});
test("Keyboard boundaries, row ends and grid ends", () => {
  assert.deepEqual(moveGridFocus([0, 0], "ArrowUp", 10), [0, 0]);
  assert.deepEqual(moveGridFocus([9, 9], "ArrowRight", 10), [9, 9]);
  assert.deepEqual(moveGridFocus([3, 4], "ArrowDown", 10), [4, 4]);
  assert.deepEqual(moveGridFocus([3, 4], "Home", 10), [3, 0]);
  assert.deepEqual(moveGridFocus([3, 4], "End", 10, true), [9, 9]);
  assert.deepEqual(moveGridFocus([3, 4], "Home", 10, true), [0, 0]);
});
test("Analytics rejects unconsented events, queues only accepted activity, clears on withdrawal", () => {
  const values = new Map();
  const hits = [];
  globalThis.window = { dispatchEvent() {}, gtag: (...a) => hits.push(a) };
  globalThis.localStorage = { getItem: (k) => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) };
  globalThis.document = { cookie: "" };
  globalThis.location = { hostname: "wordsatrest.com" };
  assert.equal(readConsent(), null);
  assert.equal(trackEvent("puzzle_start", { puzzle_id: "test" }), false);
  setConsent("accepted");
  assert.equal(trackEvent("puzzle_start", { puzzle_id: "test" }), true);
  assert.equal(window.warAnalyticsQueue.length, 1);
  window.warAnalyticsReady = true;
  trackEvent("word_found", { found_count: 1 });
  assert.equal(hits.length, 1);
  setConsent("rejected");
  assert.equal(window.warAnalyticsQueue.length, 0);
  assert.equal(trackEvent("puzzle_complete", { word_count: 1 }), false);
  assert.equal(hits.length, 1);
  delete globalThis.window; delete globalThis.localStorage; delete globalThis.document; delete globalThis.location;
});
