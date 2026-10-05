"use client";

/**
 * Interactive word-search grid (client component).
 * The full letter grid is rendered on the server too, so crawlers and no-JS
 * visitors still get the puzzle text in the initial HTML.
 *
 * Interaction: drag across a word, or tap the first letter then the last letter.
 * Progress is saved in localStorage (per puzzle id). No timer by design (Calm Mode).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { lineCells, placementCells } from "@/lib/engine";
import type { Placement } from "@/lib/types";

type Cell = [number, number];
const key = (c: Cell) => `${c[0]},${c[1]}`;

export interface PuzzleGridProps {
  puzzleId: string;
  grid: string[][];
  words: string[];
  placements: Placement[];
  defaultLargePrint?: boolean;
}

export default function PuzzleGrid({
  puzzleId,
  grid,
  words,
  placements,
  defaultLargePrint = false,
}: PuzzleGridProps) {
  const size = grid.length;
  const storageKey = `war:progress:${puzzleId}`;
  const [found, setFound] = useState<Set<string>>(() => new Set());
  const [largePrint, setLargePrint] = useState(defaultLargePrint);
  const [dragStart, setDragStart] = useState<Cell | null>(null);
  const [hover, setHover] = useState<Cell | null>(null);
  const [pending, setPending] = useState<Cell | null>(null);
  const [message, setMessage] = useState<string>("");
  const gridRef = useRef<HTMLDivElement>(null);

  // Restore saved progress after hydration.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setFound(new Set(JSON.parse(raw) as string[]));
      const lp = localStorage.getItem("war:largePrint");
      if (lp !== null && !defaultLargePrint) setLargePrint(lp === "1");
    } catch {
      /* storage unavailable — play without saving */
    }
  }, [storageKey, defaultLargePrint]);

  const persist = useCallback(
    (next: Set<string>) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  const placementKeys = useMemo(
    () =>
      placements.map((p) => {
        const cells = placementCells(p).map(key);
        return { word: p.word, fwd: cells.join("|"), rev: [...cells].reverse().join("|"), cells };
      }),
    [placements],
  );

  const foundCells = useMemo(() => {
    const s = new Set<string>();
    for (const pk of placementKeys) if (found.has(pk.word)) pk.cells.forEach((c) => s.add(c));
    return s;
  }, [found, placementKeys]);

  const selectionCells = useMemo(() => {
    const s = new Set<string>();
    if (dragStart && hover) lineCells(dragStart, hover)?.forEach((c) => s.add(key(c)));
    else if (dragStart) s.add(key(dragStart));
    if (pending) s.add(key(pending));
    return s;
  }, [dragStart, hover, pending]);

  const evaluate = useCallback(
    (a: Cell, b: Cell) => {
      const line = lineCells(a, b);
      if (!line) return;
      const sig = line.map(key).join("|");
      const hit = placementKeys.find((pk) => !found.has(pk.word) && (pk.fwd === sig || pk.rev === sig));
      if (hit) {
        const next = new Set(found).add(hit.word);
        setFound(next);
        persist(next);
        setMessage(
          next.size === words.length ? "Puzzle complete — well done." : `Found ${hit.word}.`,
        );
      }
    },
    [found, placementKeys, persist, words.length],
  );

  const cellFromPoint = (x: number, y: number): Cell | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const r = el?.dataset?.r;
    const c = el?.dataset?.c;
    if (r === undefined || c === undefined) return null;
    return [Number(r), Number(c)];
  };

  const onPointerDown = (e: React.PointerEvent, cell: Cell) => {
    e.preventDefault();
    if (pending && key(pending) !== key(cell)) {
      evaluate(pending, cell);
      setPending(null);
      return;
    }
    gridRef.current?.setPointerCapture?.(e.pointerId);
    setDragStart(cell);
    setHover(cell);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart) return;
    const c = cellFromPoint(e.clientX, e.clientY);
    if (c && (!hover || key(c) !== key(hover))) setHover(c);
  };

  const onPointerUp = () => {
    if (!dragStart) return;
    if (hover && key(hover) !== key(dragStart)) {
      evaluate(dragStart, hover);
      setPending(null);
    } else {
      // Tap: arm as first letter (tap again to cancel).
      setPending((p) => (p && key(p) === key(dragStart) ? null : dragStart));
    }
    setDragStart(null);
    setHover(null);
  };

  const reset = () => {
    const empty = new Set<string>();
    setFound(empty);
    persist(empty);
    setMessage("Progress cleared.");
  };

  const toggleLargePrint = () => {
    setLargePrint((v) => {
      try {
        localStorage.setItem("war:largePrint", v ? "0" : "1");
      } catch {
        /* ignore */
      }
      return !v;
    });
  };

  const complete = found.size === words.length;

  return (
    <section aria-label="Word search puzzle" className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <button
          type="button"
          onClick={toggleLargePrint}
          aria-pressed={largePrint}
          className="rounded-full border border-[#b8a990] px-4 py-2 font-medium hover:bg-[#ebe4d6]/60"
        >
          {largePrint ? "Standard print" : "Large print"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-[#d4cbb8] px-4 py-2 hover:bg-[#ebe4d6]/60"
        >
          Reset
        </button>
        <span className="text-[var(--ink-soft)]" aria-live="polite">
          {found.size} / {words.length} found{message ? ` · ${message}` : ""}
        </span>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div
          ref={gridRef}
          role="grid"
          aria-label={`${size} by ${size} letter grid`}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`puzzle-board grid select-none touch-none p-1.5 sm:p-2 ${
            largePrint ? "w-full max-w-2xl" : "w-full max-w-xl"
          }`}
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const k = `${r},${c}`;
              const isFound = foundCells.has(k);
              const isSel = selectionCells.has(k);
              return (
                <div
                  key={k}
                  role="gridcell"
                  data-r={r}
                  data-c={c}
                  onPointerDown={(e) => onPointerDown(e, [r, c])}
                  className={`puzzle-cell flex aspect-square cursor-pointer items-center justify-center uppercase transition-colors ${
                    largePrint ? "text-2xl sm:text-4xl" : "text-base sm:text-xl"
                  } ${
                    isSel
                      ? "bg-[var(--highlight)] text-[var(--ink)]"
                      : isFound
                        ? "bg-[var(--found)] text-[var(--moss)]"
                        : "bg-transparent text-[var(--ink)]"
                  }`}
                >
                  {letter}
                </div>
              );
            }),
          )}
        </div>

        <div className="min-w-48">
          <h2 className={`mb-2 font-semibold ${largePrint ? "text-2xl" : "text-lg"}`}>Words to find</h2>
          <ul className={`grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1 ${largePrint ? "text-2xl" : "text-base"}`}>
            {words.map((w) => (
              <li
                key={w}
                className={found.has(w) ? "text-[#a89880] line-through" : "text-[var(--ink)]"}
              >
                {w}
              </li>
            ))}
          </ul>
          {complete && (
            <p className="mt-4 rounded-sm bg-[var(--found)] p-3 text-[var(--moss)]" role="status">
              All words found. Take a breath, then try another puzzle.
            </p>
          )}
        </div>
      </div>
      <p className="text-sm text-[var(--ink-soft)]">
        Tip: drag across a word, or tap its first letter and then its last letter.
      </p>
    </section>
  );
}
