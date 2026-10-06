"use client";

/**
 * Interactive word-search grid (client component).
 * The full letter grid is rendered on the server too, so crawlers and no-JS
 * visitors still get the puzzle text in the initial HTML.
 *
 * Interaction: drag across a word, or tap the first letter then the last letter.
 * Progress is saved in localStorage (per puzzle id). No timer by design (Calm Mode).
 *
 * Grid size (Standard | Larger) is one site-wide preference, not per puzzle. It is stored in
 * localStorage ("war:gridSize") and applied before first paint by the inline script in
 * app/layout.tsx as <html data-grid-size="…">, so all size/layout styling is pure CSS
 * (globals.css, "Grid size") and nothing shifts after hydration. With no stored choice,
 * Large print puzzles (data-lp-default) open in Larger and everything else in Standard.
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
  /** Large print puzzles open in the Larger grid unless the visitor has chosen Standard. */
  defaultLargePrint?: boolean;
}

type GridSize = "standard" | "larger";
const GRID_SIZE_KEY = "war:gridSize";

export default function PuzzleGrid({
  puzzleId,
  grid,
  words,
  placements,
  defaultLargePrint = false,
}: PuzzleGridProps) {
  const size = grid.length;
  const storageKey = `war:progress:${puzzleId}`;
  // Prefer placement word list so UI count matches what can actually be found.
  const targetWords = useMemo(() => {
    const fromPlacements = placements.map((p) => p.word);
    if (fromPlacements.length > 0) return fromPlacements;
    return words.map((w) => w.toUpperCase());
  }, [placements, words]);
  const targetCount = targetWords.length;
  const longestWord = targetWords.reduce((m, w) => Math.max(m, w.length), 0);

  const [found, setFound] = useState<Set<string>>(() => new Set());
  // Only drives aria-pressed; the visual state comes from CSS on <html data-grid-size>.
  const [gridSize, setGridSize] = useState<GridSize>(defaultLargePrint ? "larger" : "standard");
  const [dragStart, setDragStart] = useState<Cell | null>(null);
  const [hover, setHover] = useState<Cell | null>(null);
  const [pending, setPending] = useState<Cell | null>(null);
  const [message, setMessage] = useState<string>("");
  const gridRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);

  // Restore saved progress after hydration.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as string[];
        const allowed = new Set(targetWords);
        setFound(new Set(saved.filter((w) => allowed.has(w))));
      }
    } catch {
      /* storage unavailable — play without saving */
    }
    const chosen = document.documentElement.dataset.gridSize;
    if (chosen === "standard" || chosen === "larger") setGridSize(chosen);
  }, [storageKey, targetWords]);

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
      setFound((prev) => {
        const hit = placementKeys.find(
          (pk) => !prev.has(pk.word) && (pk.fwd === sig || pk.rev === sig),
        );
        if (!hit) return prev;
        const next = new Set(prev).add(hit.word);
        persist(next);
        setMessage(
          next.size === targetCount ? "Puzzle complete — well done." : `Found ${hit.word}.`,
        );
        return next;
      });
    },
    [placementKeys, persist, targetCount],
  );

  const cellFromPoint = (x: number, y: number): Cell | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    // Walk up in case a child text node / nested element is hit.
    let node: HTMLElement | null = el;
    while (node && node !== gridRef.current) {
      const r = node.dataset?.r;
      const c = node.dataset?.c;
      if (r !== undefined && c !== undefined) return [Number(r), Number(c)];
      node = node.parentElement;
    }
    return null;
  };

  const releasePointer = () => {
    const id = pointerIdRef.current;
    if (id !== null && gridRef.current?.hasPointerCapture?.(id)) {
      try {
        gridRef.current.releasePointerCapture(id);
      } catch {
        /* already released */
      }
    }
    pointerIdRef.current = null;
  };

  const onPointerDown = (e: React.PointerEvent, cell: Cell) => {
    // Avoid scroll/zoom stealing the gesture on mobile.
    e.preventDefault();
    if (pending && key(pending) !== key(cell)) {
      evaluate(pending, cell);
      setPending(null);
      return;
    }
    try {
      gridRef.current?.setPointerCapture?.(e.pointerId);
      pointerIdRef.current = e.pointerId;
    } catch {
      /* capture unsupported */
    }
    setDragStart(cell);
    setHover(cell);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart) return;
    const c = cellFromPoint(e.clientX, e.clientY);
    if (c && (!hover || key(c) !== key(hover))) setHover(c);
  };

  const onPointerUp = () => {
    if (!dragStart) {
      releasePointer();
      return;
    }
    if (hover && key(hover) !== key(dragStart)) {
      evaluate(dragStart, hover);
      setPending(null);
    } else {
      // Tap: arm as first letter (tap again to cancel).
      setPending((p) => (p && key(p) === key(dragStart) ? null : dragStart));
    }
    setDragStart(null);
    setHover(null);
    releasePointer();
  };

  const reset = () => {
    const empty = new Set<string>();
    setFound(empty);
    persist(empty);
    setPending(null);
    setMessage("Progress cleared.");
  };

  const chooseGridSize = (next: GridSize) => {
    document.documentElement.dataset.gridSize = next;
    setGridSize(next);
    try {
      localStorage.setItem(GRID_SIZE_KEY, next);
      localStorage.removeItem("war:largePrint"); // legacy per-device toggle, migrated in layout.tsx
    } catch {
      /* ignore — the choice still applies until the page is closed */
    }
  };

  const complete = found.size === targetCount && targetCount > 0;

  return (
    <section
      aria-label="Word search puzzle"
      className="puzzle-ui space-y-4"
      data-lp-default={defaultLargePrint ? "" : undefined}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[1.0625rem]">
        <div role="group" aria-label="Grid size" className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="text-[var(--ink-soft)]">Grid size</span>
          <span className="grid-size">
            {(["standard", "larger"] as const).map((s) => (
              <button
                key={s}
                type="button"
                data-size={s}
                aria-pressed={gridSize === s}
                onClick={() => chooseGridSize(s)}
                className="grid-size__btn"
              >
                {s === "standard" ? "Standard" : "Larger"}
              </button>
            ))}
          </span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-full border border-[#b8a990] px-4 py-2 hover:bg-[#ebe4d6]/60"
        >
          Reset
        </button>
        <span className="inline-flex min-h-11 items-center text-[var(--ink-soft)]" aria-live="polite">
          {found.size} / {targetCount} found{message ? ` · ${message}` : ""}
        </span>
      </div>

      <div className="puzzle-layout flex flex-col gap-6 lg:flex-row lg:items-start">
        <div
          ref={gridRef}
          role="grid"
          aria-label={`${size} by ${size} letter grid`}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="puzzle-board grid w-full max-w-xl select-none touch-none p-1.5 sm:p-2"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`, ["--n" as string]: size }}
        >
          {grid.map((row, r) => (
            // display:contents keeps every cell a direct CSS-grid item while giving
            // assistive tech / crawlers a proper grid > row > gridcell structure.
            <div key={r} role="row" aria-rowindex={r + 1} className="contents">
              {row.map((letter, c) => {
                const k = `${r},${c}`;
                // Shared cell styles live in globals.css (.puzzle-cell) to keep the HTML small.
                const state = selectionCells.has(k) ? " is-sel" : foundCells.has(k) ? " is-found" : "";
                return (
                  <div
                    key={k}
                    role="gridcell"
                    aria-colindex={c + 1}
                    data-r={r}
                    data-c={c}
                    onPointerDown={(e) => onPointerDown(e, [r, c])}
                    className={`puzzle-cell${state}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="word-panel min-w-48">
          <h2 className="mb-2 text-xl font-semibold">Words to find</h2>
          <ul
            className="word-list grid gap-x-6 gap-y-1 text-[1.125rem] leading-snug [overflow-wrap:anywhere] lg:grid-cols-1 lg:text-[1.25rem]"
            style={{ ["--wl" as string]: longestWord }}
          >
            {targetWords.map((w) => (
              <li
                key={w}
                className={found.has(w) ? "text-[#736452] line-through" : "text-[var(--ink)]"}
              >
                {w}
              </li>
            ))}
          </ul>
          {complete && (
            <p className="mt-4 flex items-center gap-3 rounded-sm bg-[var(--found)] p-3 text-[var(--moss)] lg:hidden" role="status">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/puzzle/complete-compact.png" width={48} height={48} alt="" className="h-12 w-12 shrink-0" />
              All words found. Take a breath, then try another puzzle.
            </p>
          )}
        </div>
      </div>
      {complete && (
        <figure className="no-print paper-deep hidden items-center gap-6 rounded-[4px] border border-[#cbbfa6] p-4 lg:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/puzzle/complete.webp"
            width={900}
            height={500}
            alt="A finished puzzle — an empty coffee cup and a ticked tile, well done"
            className="h-auto w-72 shrink-0"
          />
          <figcaption className="text-[var(--moss)]" role="status">
            <span className="block font-serif text-3xl text-[var(--ink)]">Puzzle complete — well done.</span>
            <span className="mt-1 block text-lg">All words found. Take a breath, then try another puzzle.</span>
          </figcaption>
        </figure>
      )}
      <p className="font-sans text-[1.0625rem] text-[var(--ink-soft)]">
        Tip: drag across a word, or tap its first letter and then its last letter.
      </p>
    </section>
  );
}
