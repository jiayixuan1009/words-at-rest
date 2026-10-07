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
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { lineCells } from "@/lib/engine";
import { matchSelection, moveGridFocus, restoreProgress, type FoundPaths } from "@/lib/game";
import { trackEvent } from "@/lib/analytics";
import { bandGeometry, PATH_COLORS, type BoardMetrics } from "@/lib/puzzle-feedback";
import type { Difficulty, Placement } from "@/lib/types";

type Cell = [number, number];
const key = (c: Cell) => `${c[0]},${c[1]}`;

export interface PuzzleGridProps {
  puzzleId: string;
  grid: string[][];
  words: string[];
  placements: Placement[];
  difficulty: Difficulty;
  nextPuzzle?: { href: string; title: string };
  /** Large print puzzles open in the Larger grid unless the visitor has chosen Standard. */
  defaultLargePrint?: boolean;
}

type GridSize = "standard" | "larger";
const GRID_SIZE_KEY = "war:gridSize";
type Feedback = { id: number; kind: "found" | "miss"; cells: Cell[]; word?: string };

export default function PuzzleGrid({
  puzzleId,
  grid,
  words,
  placements,
  difficulty,
  nextPuzzle,
  defaultLargePrint = false,
}: PuzzleGridProps) {
  const size = grid.length;
  const storageKey = `war:progress:${puzzleId}`;
  // Prefer placement word list so UI count matches what can actually be found.
  const targetWords = useMemo(() => {
    const fromPlacements = placements.map((p) => p.word);
    return [...new Set((fromPlacements.length ? fromPlacements : words).map((w) => w.toUpperCase()))];
  }, [placements, words]);
  const targetCount = targetWords.length;
  const longestWord = targetWords.reduce((m, w) => Math.max(m, w.length), 0);

  const [progress, setProgress] = useState<FoundPaths>({});
  const progressRef = useRef<FoundPaths>({});
  const found = useMemo(() => new Set(Object.keys(progress)), [progress]);
  const restoredRef = useRef(false);
  const startedRef = useRef(false);
  const instructionsId = useId();
  const [active, setActive] = useState<Cell>([0, 0]);
  const event = useCallback((name: Parameters<typeof trackEvent>[0], params: Record<string, string | number> = {}) => {
    return trackEvent(name, { puzzle_id: puzzleId, difficulty, grid_size: size, grid_mode: document.documentElement.dataset.gridSize ?? (defaultLargePrint ? "larger" : "standard"), entry_path: location.pathname, ...params });
  }, [puzzleId, difficulty, size, defaultLargePrint]);
  // Only drives aria-pressed; the visual state comes from CSS on <html data-grid-size>.
  const [gridSize, setGridSize] = useState<GridSize>(defaultLargePrint ? "larger" : "standard");
  const [dragStart, setDragStart] = useState<Cell | null>(null);
  const [hover, setHover] = useState<Cell | null>(null);
  const [pending, setPending] = useState<Cell | null>(null);
  const [message, setMessage] = useState<string>("");
  const gridRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const feedbackIdRef = useRef(0);
  const feedbackTimersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const [boardMetrics, setBoardMetrics] = useState<BoardMetrics | null>(null);

  useEffect(() => {
    const board = gridRef.current;
    if (!board) return;
    const first = board.querySelector<HTMLElement>('[data-r="0"][data-c="0"]');
    const horizontal = board.querySelector<HTMLElement>('[data-r="0"][data-c="1"]');
    const vertical = board.querySelector<HTMLElement>('[data-r="1"][data-c="0"]');
    if (!first) return;
    const measure = () => {
      const bounds = board.getBoundingClientRect(), cell = first.getBoundingClientRect();
      setBoardMetrics({
        width: board.clientWidth, height: board.clientHeight,
        x: cell.left - bounds.left - board.clientLeft + cell.width / 2,
        y: cell.top - bounds.top - board.clientTop + cell.height / 2,
        dx: horizontal ? horizontal.getBoundingClientRect().left - cell.left : cell.width,
        dy: vertical ? vertical.getBoundingClientRect().top - cell.top : cell.height,
        thickness: Math.min(cell.width, cell.height) * 0.72,
      });
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(board); observer.observe(first);
    return () => observer.disconnect();
  }, [size]);

  // Feedback belongs only to new selections, never to restored progress. Independent
  // timers let consecutive finds finish without blocking input or losing a pulse.
  useEffect(() => () => {
    for (const timer of feedbackTimersRef.current.values()) clearTimeout(timer);
    feedbackTimersRef.current.clear();
  }, []);
  const showFeedback = useCallback((kind: Feedback["kind"], cells: Cell[], word?: string) => {
    const id = ++feedbackIdRef.current;
    setFeedbacks((current) => [...current, { id, kind, cells, word }]);
    const timer = setTimeout(() => {
      feedbackTimersRef.current.delete(id);
      setFeedbacks((current) => current.filter((item) => item.id !== id));
    }, kind === "found" ? 1100 : 220);
    feedbackTimersRef.current.set(id, timer);
  }, []);
  const latestFind = feedbacks.filter((item) => item.kind === "found").at(-1);
  const feedbackByCell = useMemo(() => {
    const cells = new Map<string, { feedback: Feedback; order: number }>();
    for (const feedback of feedbacks) feedback.cells.forEach((cell, order) => cells.set(key(cell), { feedback, order }));
    return cells;
  }, [feedbacks]);

  // Restore saved progress after hydration.
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = restoreProgress(JSON.parse(raw), grid, targetWords, placements, difficulty);
        progressRef.current = saved;
        setProgress(saved);
        if (Object.keys(saved).length) event("progress_resume", { found_count: Object.keys(saved).length });
      }
    } catch {
      /* storage unavailable — play without saving */
    }
    const chosen = document.documentElement.dataset.gridSize;
    if (chosen === "standard" || chosen === "larger") setGridSize(chosen);
  }, [storageKey, targetWords, grid, placements, difficulty, event]);

  const persist = useCallback(
    (next: FoundPaths) => {
      progressRef.current = next;
      setProgress(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify({ version: 2, found: next }));
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  const foundCells = useMemo(() => {
    const s = new Set<string>();
    Object.values(progress).flat().forEach((c) => s.add(key(c)));
    return s;
  }, [progress]);

  const selectionCells = useMemo(() => {
    const s = new Set<string>();
    if (dragStart && hover) lineCells(dragStart, hover)?.forEach((c) => s.add(key(c)));
    else if (dragStart) s.add(key(dragStart));
    if (pending && hover) lineCells(pending, hover)?.forEach((c) => s.add(key(c)));
    else if (pending) s.add(key(pending));
    return s;
  }, [dragStart, hover, pending]);
  const selectionPath = useMemo(() => {
    const anchor = dragStart ?? pending;
    return anchor ? lineCells(anchor, hover ?? anchor) ?? [anchor] : [];
  }, [dragStart, pending, hover]);
  const wordColor = (word: string) => PATH_COLORS[targetWords.indexOf(word) % PATH_COLORS.length];

  const evaluate = useCallback(
    (a: Cell, b: Cell) => {
      const hit = matchSelection(grid, targetWords, difficulty, a, b);
      if (!hit) {
        showFeedback("miss", lineCells(a, b) ?? [a, b]);
        setMessage("Try another selection — no matching word this time.");
        return;
      }
      if (progressRef.current[hit.word]) { setMessage(`${hit.word} was already found.`); return; }
      const next = { ...progressRef.current, [hit.word]: hit.cells };
      persist(next);
      showFeedback("found", hit.cells, hit.word);
      const count = Object.keys(next).length;
      event("word_found", { found_count: count, word_length: hit.word.length });
      if (count === targetCount) event("puzzle_complete", { word_count: targetCount });
      setMessage(count === targetCount ? "Puzzle complete — well done." : `Found ${hit.word}.`);
    },
    [grid, targetWords, difficulty, persist, targetCount, event, showFeedback],
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
    if (!e.isPrimary || e.button !== 0) return;
    // Avoid scroll/zoom stealing the gesture on mobile.
    e.preventDefault();
    start("pointer");
    setActive(cell);
    if (pending) {
      if (key(pending) !== key(cell)) evaluate(pending, cell);
      setPending(null);
      setHover(null);
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
    if (!dragStart || (pointerIdRef.current !== null && pointerIdRef.current !== e.pointerId)) return;
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
      setMessage("First letter selected. Tap the last letter.");
    }
    setDragStart(null);
    setHover(null);
    releasePointer();
  };

  const reset = () => {
    event("reset", { found_count: found.size });
    persist({});
    for (const timer of feedbackTimersRef.current.values()) clearTimeout(timer);
    feedbackTimersRef.current.clear();
    setFeedbacks([]);
    startedRef.current = false;
    cancelSelection();
    setMessage("Progress cleared.");
  };

  const chooseGridSize = (next: GridSize) => {
    if (next !== gridSize) event("grid_size_change", { grid_mode: next });
    document.documentElement.dataset.gridSize = next;
    setGridSize(next);
    try {
      localStorage.setItem(GRID_SIZE_KEY, next);
      localStorage.removeItem("war:largePrint"); // legacy per-device toggle, migrated in layout.tsx
    } catch {
      /* ignore — the choice still applies until the page is closed */
    }
  };

  const start = (input: "pointer" | "keyboard") => {
    if (startedRef.current) return;
    startedRef.current = event("puzzle_start", { input_method: input, grid_mode: gridSize, found_count: Object.keys(progressRef.current).length });
  };
  const cancelSelection = () => {
    setPending(null); setDragStart(null); setHover(null); releasePointer();
  };
  const onKeyDown = (e: React.KeyboardEvent, cell: Cell) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      const next = moveGridFocus(cell, e.key, size, e.ctrlKey || e.metaKey);
      setActive(next); setHover(next);
      gridRef.current?.querySelector<HTMLElement>(`[data-r="${next[0]}"][data-c="${next[1]}"]`)?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.repeat) return;
      start("keyboard");
      if (pending && key(pending) !== key(cell)) {
        evaluate(pending, cell); setPending(null); setHover(null);
      } else {
        setPending(pending ? null : cell); setHover(null);
        setMessage(pending ? "Selection cancelled." : "First letter selected. Move to the last letter and press Enter or Space.");
      }
    } else if (e.key === "Escape") {
      e.preventDefault(); cancelSelection(); setMessage("Selection cancelled.");
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
        <span className="inline-flex min-h-11 items-center text-[var(--ink-soft)]" role="status" aria-live="polite" aria-atomic="true">
          <span key={latestFind?.id ?? "steady"} className={latestFind ? "puzzle-count is-new-find" : "puzzle-count"}>{found.size} / {targetCount} found</span>
          {message ? <span className="ml-1"> · {message}</span> : null}
        </span>
      </div>

      <div className="puzzle-progress" role="progressbar" aria-label="Words found" aria-valuemin={0} aria-valuemax={targetCount} aria-valuenow={found.size} aria-valuetext={`${found.size} of ${targetCount} words found`}>
        <span className={latestFind ? "puzzle-progress__fill is-new-find" : "puzzle-progress__fill"} style={{ transform: `scaleX(${targetCount ? found.size / targetCount : 0})` }} />
      </div>
      <div className="puzzle-feedback-bar" aria-hidden="true">
        {latestFind ? <span key={latestFind.id} className="puzzle-found-toast"><span className="puzzle-check">✓</span> {latestFind.word} found</span> : <span>{complete ? "All words found" : found.size ? "Keep going — you're making progress" : "Find a word to begin"}</span>}
        <span className="puzzle-remaining">{complete ? "Complete" : `${targetCount - found.size} ${targetCount - found.size === 1 ? "word" : "words"} to go`}</span>
      </div>

      <p id={instructionsId} className="font-sans text-base text-[var(--ink-soft)]">
        Drag across a word, or tap its first and last letters. Keyboard: Tab into the grid, use arrow keys to move, Enter or Space to select each end, and Escape to cancel.
      </p>

      <div className="puzzle-layout flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="puzzle-board-wrap w-full max-w-xl">
        <div
          ref={gridRef}
          role="grid"
          aria-label={`${size} by ${size} letter grid`}
          aria-describedby={instructionsId}
          aria-rowcount={size}
          aria-colcount={size}
          aria-multiselectable="true"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={cancelSelection}
          className={`puzzle-board grid w-full max-w-xl select-none touch-none p-1.5 sm:p-2${boardMetrics ? " has-bands" : ""}${complete && latestFind ? " is-celebrating" : ""}`}
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`, ["--n" as string]: size }}
        >
          {boardMetrics && <svg className="puzzle-bands" aria-hidden="true" focusable="false" viewBox={`0 0 ${boardMetrics.width} ${boardMetrics.height}`} preserveAspectRatio="none">
            {Object.entries(progress).map(([word, cells]) => {
              const geometry = bandGeometry(cells, boardMetrics);
              if (!geometry) return null;
              const color = wordColor(word);
              const feedback = feedbacks.find((item) => item.word === word);
              return <g key={word} className="puzzle-band" style={{ ["--band-fill" as string]: color.fill, ["--band-edge" as string]: color.edge }}>
                <line {...geometry} stroke={color.edge} strokeWidth={boardMetrics.thickness + 3} strokeLinecap="round" />
                <line {...geometry} stroke={color.fill} strokeWidth={boardMetrics.thickness} strokeLinecap="round" />
                {feedback && <line key={feedback.id} {...geometry} className="puzzle-band-sweep" pathLength={1} stroke={color.edge} strokeWidth={boardMetrics.thickness + 4} strokeLinecap="round" />}
              </g>;
            })}
            {selectionPath.length > 0 && (() => {
              const geometry = bandGeometry(selectionPath, boardMetrics);
              return geometry && <g className="puzzle-selection-band">
                <line {...geometry} stroke="#956b2e" strokeWidth={boardMetrics.thickness + 3} strokeLinecap="round" />
                <line {...geometry} stroke="#efd09b" strokeWidth={boardMetrics.thickness} strokeLinecap="round" />
              </g>;
            })()}
          </svg>}
          {grid.map((row, r) => (
            // display:contents keeps every cell a direct CSS-grid item while giving
            // assistive tech / crawlers a proper grid > row > gridcell structure.
            <div key={r} role="row" aria-rowindex={r + 1} className="contents">
              {row.map((letter, c) => {
                const k = `${r},${c}`;
                // Shared cell styles live in globals.css (.puzzle-cell) to keep the HTML small.
                const state = selectionCells.has(k) ? " is-sel" : foundCells.has(k) ? " is-found" : "";
                const anchor = pending ?? dragStart;
                const endpoint = hover ?? anchor;
                const endpoints = anchor && (key(anchor) === k || (endpoint && key(endpoint) === k)) ? " is-endpoint" : "";
                const pulse = feedbackByCell.get(k);
                return (
                  <div
                    key={k}
                    role="gridcell"
                    aria-colindex={c + 1}
                    aria-label={`${letter}, row ${r + 1}, column ${c + 1}${foundCells.has(k) ? ", found" : selectionCells.has(k) ? ", selected" : ""}`}
                    aria-selected={selectionCells.has(k) || foundCells.has(k)}
                    tabIndex={active[0] === r && active[1] === c ? 0 : -1}
                    data-r={r}
                    data-c={c}
                    onFocus={() => { setActive([r, c]); if (pending) setHover([r, c]); }}
                    onKeyDown={(e) => onKeyDown(e, [r, c])}
                    onPointerDown={(e) => onPointerDown(e, [r, c])}
                    className={`puzzle-cell${state}${endpoints}${pending && key(pending) === k ? " is-armed" : ""}`}
                  >
                    <span className="puzzle-letter">{letter}</span>
                    {pulse?.feedback.kind === "miss" && <span key={pulse.feedback.id} aria-hidden="true" className="puzzle-cell-feedback is-miss" />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {complete && latestFind && <div key={latestFind.id} className="puzzle-celebration" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <span key={i} style={{ ["--i" as string]: i, ["--rise" as string]: `${65 + i % 4 * 18}px`, ["--tilt" as string]: `${i % 2 ? 85 : -85}deg`, ["--particle-color" as string]: PATH_COLORS[i % PATH_COLORS.length].edge }} />)}</div>}
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
                className={`puzzle-word${found.has(w) ? " is-found" : ""}${feedbacks.some((item) => item.word === w) ? " is-new-find" : ""}`}
                style={{ ["--word-color" as string]: wordColor(w).edge }}
              >
                <span className="puzzle-word__label">{w}</span>
                <span className="puzzle-word__check" aria-hidden="true">{found.has(w) ? "✓" : ""}</span>
                {found.has(w) && <span className="sr-only"> — found</span>}
              </li>
            ))}
          </ul>
          {complete && (
            <div className={`puzzle-complete-card mt-4${latestFind ? " is-new-completion" : ""}`}>
              <h3 className="font-serif text-xl font-semibold">Nicely done — all words found.</h3>
              <p className="mt-1 text-base text-[var(--ink-soft)]">You found all {targetCount} words. Take a breath and enjoy the moment.</p>
              {nextPuzzle && <p className="puzzle-next-preview">Up next: {nextPuzzle.title}</p>}
              {nextPuzzle && <Link href={nextPuzzle.href} className="btn-primary mt-3" onClick={() => event("next_puzzle", { next_puzzle_path: nextPuzzle.href })}>
                Play another puzzle <span className="sr-only">: {nextPuzzle.title}</span><span aria-hidden="true"> →</span>
              </Link>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
