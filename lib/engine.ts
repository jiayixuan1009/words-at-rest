/**
 * Words at Rest — build-time word-search placement engine.
 *
 * Deterministic (mulberry32 seed). Generation runs in `npm run generate`; committed
 * JSON is what the site SSRs. Do not regenerate in the request path.
 *
 * Known gaps (acceptable for v1; fix before large catalog growth):
 * - Fill letters can accidentally spell a listed word along another path; the
 *   UI accepts any correct occurrence in the allowed directions. Generation also
 *   reduces extra occurrences with `scrubAccidentalWords`.
 * - No overlap-quality scoring; placement is random-fit.
 * - Backwards words only on hard.
 *
 * MIT swap candidate (same pre-generate → JSON workflow):
 * - `wordfind` (npm; upstream often cited as bunkat/wordfind or forks such as
 *   tcha-tcho/wordfind). Keep `generateGrid`’s `{ grid, placements, skipped }`
 *   shape as the adapter boundary.
 */
import type { Difficulty, Direction, Placement } from "./types.ts";

export const DIRECTION_VECTORS: Record<Direction, [number, number]> = {
  E: [0, 1],
  S: [1, 0],
  SE: [1, 1],
  NE: [-1, 1],
  W: [0, -1],
  N: [-1, 0],
  NW: [-1, -1],
  SW: [1, -1],
};

/** Directions allowed per difficulty (hard adds backwards words). */
export const DIRECTIONS_BY_DIFFICULTY: Record<Difficulty, Direction[]> = {
  easy: ["E", "S"],
  medium: ["E", "S", "SE", "NE"],
  hard: ["E", "S", "SE", "NE", "W", "N", "NW", "SW"],
};

/** mulberry32 — tiny seeded PRNG so the same seed always yields the same grid. */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface GenerateOptions {
  words: string[];
  size: number;
  difficulty: Difficulty;
  seed: number;
  maxAttemptsPerWord?: number;
}

export interface GenerateResult {
  grid: string[][];
  placements: Placement[];
  skipped: string[];
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function normalizeWord(word: string): string {
  return word.toUpperCase().replace(/[^A-Z]/g, "");
}

export function generateGrid(opts: GenerateOptions): GenerateResult {
  const { size, difficulty, seed, maxAttemptsPerWord = 400 } = opts;
  const rng = createRng(seed);
  const pick = <T,>(arr: T[]) => arr[Math.floor(rng() * arr.length)];
  const cells: (string | null)[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null),
  );
  const placements: Placement[] = [];
  const skipped: string[] = [];
  const dirs = DIRECTIONS_BY_DIFFICULTY[difficulty];

  // Dedupe + longest first for a higher placement rate.
  const words = [...new Set(opts.words.map(normalizeWord))]
    .filter((w) => w.length >= 3 && w.length <= size)
    .sort((a, b) => b.length - a.length);

  for (const word of words) {
    let placed = false;
    for (let attempt = 0; attempt < maxAttemptsPerWord && !placed; attempt++) {
      const direction = pick(dirs);
      const [dr, dc] = DIRECTION_VECTORS[direction];
      const row = Math.floor(rng() * size);
      const col = Math.floor(rng() * size);
      const endR = row + dr * (word.length - 1);
      const endC = col + dc * (word.length - 1);
      if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const existing = cells[row + dr * i][col + dc * i];
        if (existing !== null && existing !== word[i]) {
          fits = false;
          break;
        }
      }
      if (!fits) continue;
      for (let i = 0; i < word.length; i++) cells[row + dr * i][col + dc * i] = word[i];
      placements.push({ word, row, col, direction });
      placed = true;
    }
    if (!placed) skipped.push(word);
  }

  // Mark cells that belong to intentional placements (must not be scrubbed).
  const locked = new Set<string>();
  for (const p of placements) {
    for (const [r, c] of placementCells(p)) locked.add(`${r},${c}`);
  }

  let grid = cells.map((r) => r.map((c) => c ?? pick([...ALPHABET])));
  grid = scrubAccidentalWords(grid, words, placements, dirs, locked, rng);

  // Sanity: every placement must still spell its word.
  for (const p of placements) {
    const spelled = placementCells(p)
      .map(([r, c]) => grid[r][c])
      .join("");
    if (spelled !== p.word) {
      throw new Error(`generateGrid: placement corrupted for ${p.word} (got ${spelled})`);
    }
  }

  return { grid, placements, skipped };
}

/**
 * Light post-fill pass: if a listed word appears on an allowed direction but is
 * not an intentional placement, re-roll unlocked fill cells on that path.
 * Bounded attempts; not a perfect guarantee.
 */
function scrubAccidentalWords(
  grid: string[][],
  words: string[],
  placements: Placement[],
  dirs: Direction[],
  locked: Set<string>,
  rng: () => number,
): string[][] {
  const size = grid.length;
  const intentional = new Set(
    placements.map((p) => `${p.word}|${p.row},${p.col}|${p.direction}`),
  );
  const pickLetter = () => ALPHABET[Math.floor(rng() * ALPHABET.length)];

  for (let pass = 0; pass < 3; pass++) {
    let dirty = false;
    for (const word of words) {
      for (const direction of dirs) {
        const [dr, dc] = DIRECTION_VECTORS[direction];
        for (let row = 0; row < size; row++) {
          for (let col = 0; col < size; col++) {
            const endR = row + dr * (word.length - 1);
            const endC = col + dc * (word.length - 1);
            if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;
            let match = true;
            for (let i = 0; i < word.length; i++) {
              if (grid[row + dr * i][col + dc * i] !== word[i]) {
                match = false;
                break;
              }
            }
            if (!match) continue;
            const id = `${word}|${row},${col}|${direction}`;
            if (intentional.has(id)) continue;
            // Accidental — re-roll unlocked cells on this path.
            for (let i = 0; i < word.length; i++) {
              const r = row + dr * i;
              const c = col + dc * i;
              if (!locked.has(`${r},${c}`)) {
                grid[r][c] = pickLetter();
                dirty = true;
              }
            }
          }
        }
      }
    }
    if (!dirty) break;
  }
  return grid;
}

/** Cells covered by a placement, in order. */
export function placementCells(p: Placement): Array<[number, number]> {
  const [dr, dc] = DIRECTION_VECTORS[p.direction];
  return Array.from({ length: p.word.length }, (_, i) => [p.row + dr * i, p.col + dc * i]);
}

/**
 * Cells on a straight line between two cells (horizontal, vertical or 45° diagonal).
 * Returns null if the two cells are not aligned.
 */
export function lineCells(
  a: [number, number],
  b: [number, number],
): Array<[number, number]> | null {
  const dr = b[0] - a[0];
  const dc = b[1] - a[1];
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  const sr = Math.sign(dr);
  const sc = Math.sign(dc);
  return Array.from({ length: steps + 1 }, (_, i) => [a[0] + sr * i, a[1] + sc * i]);
}
