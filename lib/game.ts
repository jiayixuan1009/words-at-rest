import { DIRECTIONS_BY_DIFFICULTY, DIRECTION_VECTORS, lineCells, placementCells } from "./engine.ts";
import type { Difficulty, Placement } from "./types.ts";

export type Cell = [number, number];
export type FoundPaths = Record<string, Cell[]>;
export const cellKey = ([r, c]: Cell) => `${r},${c}`;

/** Match selected letters, including a correct unplanned occurrence. */
export function matchSelection(grid: string[][], words: string[], difficulty: Difficulty, a: Cell, b: Cell) {
  if (![a, b].every(([r, c]) => Number.isInteger(r) && Number.isInteger(c) && r >= 0 && c >= 0 && r < grid.length && c < grid[r].length)) return null;
  const cells = lineCells(a, b);
  if (!cells || cells.length < 2 || cells.some(([r, c]) => !grid[r]?.[c])) return null;
  const text = cells.map(([r, c]) => grid[r][c]).join("");
  const dr = Math.sign(b[0] - a[0]), dc = Math.sign(b[1] - a[1]);
  const allowed = DIRECTIONS_BY_DIFFICULTY[difficulty].map((d) => DIRECTION_VECTORS[d]);
  const forward = allowed.some(([r, c]) => r === dr && c === dc);
  const reverse = allowed.some(([r, c]) => r === -dr && c === -dc);
  const word = words.find((w) => (forward && w === text) || (reverse && w === [...text].reverse().join("")));
  return word ? { word, cells } : null;
}

/** Validate saved paths, or migrate the old found-word array. */
export function restoreProgress(raw: unknown, grid: string[][], words: string[], placements: Placement[], difficulty: Difficulty): FoundPaths {
  const out: FoundPaths = {};
  if (Array.isArray(raw)) {
    for (const word of raw) {
      const p = placements.find((p) => p.word === word && words.includes(p.word));
      if (p) out[p.word] = placementCells(p);
    }
    return out;
  }
  if (!raw || typeof raw !== "object" || !("version" in raw) || raw.version !== 2 || !("found" in raw)) return out;
  const paths = raw.found;
  if (!paths || typeof paths !== "object" || Array.isArray(paths)) return out;
  for (const [word, value] of Object.entries(paths)) {
    if (!words.includes(word) || !Array.isArray(value) || value.length !== word.length) continue;
    if (!value.every((c) => Array.isArray(c) && c.length === 2 && c.every(Number.isInteger))) continue;
    const cells = value as Cell[];
    const hit = matchSelection(grid, words, difficulty, cells[0], cells[cells.length - 1]);
    if (hit?.word === word && hit.cells.every((c, i) => cellKey(c) === cellKey(cells[i]))) out[word] = hit.cells;
  }
  return out;
}

export function moveGridFocus([r, c]: Cell, key: string, size: number, ctrl = false): Cell {
  switch (key) {
    case "ArrowUp": return [Math.max(0, r - 1), c];
    case "ArrowDown": return [Math.min(size - 1, r + 1), c];
    case "ArrowLeft": return [r, Math.max(0, c - 1)];
    case "ArrowRight": return [r, Math.min(size - 1, c + 1)];
    case "Home": return ctrl ? [0, 0] : [r, 0];
    case "End": return ctrl ? [size - 1, size - 1] : [r, size - 1];
    default: return [r, c];
  }
}
