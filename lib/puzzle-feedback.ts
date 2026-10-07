import type { Cell } from "./game.ts";

/** Measured cell centres keep the SVG aligned across board sizes and breakpoints. */
export type BoardMetrics = { width: number; height: number; x: number; y: number; dx: number; dy: number; thickness: number };
export const PATH_COLORS = [
  { fill: "#c5dfbf", edge: "#52754b" },
  { fill: "#e8cf9e", edge: "#947039" },
  { fill: "#c4dce5", edge: "#4c7585" },
  { fill: "#decde7", edge: "#7b5f8a" },
] as const;

export function bandGeometry(cells: Cell[], metrics: BoardMetrics) {
  if (!cells.length) return null;
  const first = cells[0], last = cells[cells.length - 1];
  return {
    x1: metrics.x + first[1] * metrics.dx,
    y1: metrics.y + first[0] * metrics.dy,
    x2: metrics.x + last[1] * metrics.dx,
    y2: metrics.y + last[0] * metrics.dy,
  };
}
