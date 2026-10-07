/** Shared list pagination for heavy catalog hubs (difficulty, large-print). */

export const LIST_PAGE_SIZE = 24;

export type PageSlice<T> = {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  /** 1-based index of first item on this page (0 when empty). */
  from: number;
  /** 1-based index of last item on this page (0 when empty). */
  to: number;
};

/**
 * Slice `items` for a 1-based page. Out-of-range pages still return an empty
 * slice with the requested `page` so callers can 404.
 */
export function paginate<T>(items: T[], page: number, pageSize: number = LIST_PAGE_SIZE): PageSlice<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const start = (page - 1) * pageSize;
  const slice = page >= 1 && page <= totalPages ? items.slice(start, start + pageSize) : [];
  const from = slice.length === 0 ? 0 : start + 1;
  const to = slice.length === 0 ? 0 : start + slice.length;
  return { items: slice, page, totalPages, total, pageSize, from, to };
}

/** Parse a path segment like "2". Returns null when missing/invalid. */
export function parsePageParam(raw: string | undefined | null): number | null {
  if (raw == null || raw === "") return null;
  if (!/^\d+$/.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1) return null;
  return n;
}

/** Canonical path for list page N (page 1 has no /page/ suffix). */
export function listPagePath(basePath: string, page: number): string {
  const base = basePath.replace(/\/$/, "") || "/";
  return page <= 1 ? base : `${base}/page/${page}`;
}

/**
 * Page numbers to show in the control, with null as an ellipsis gap.
 * Always includes 1, last, current, and neighbors.
 */
export function paginationWindow(current: number, totalPages: number, neighbors = 1): Array<number | null> {
  if (totalPages <= 1) return [1];
  const set = new Set<number>();
  set.add(1);
  set.add(totalPages);
  for (let p = current - neighbors; p <= current + neighbors; p++) {
    if (p >= 1 && p <= totalPages) set.add(p);
  }
  const sorted = [...set].sort((a, b) => a - b);
  const out: Array<number | null> = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) out.push(null);
    out.push(sorted[i]!);
  }
  return out;
}

/** How many list pages a catalog of `total` items needs. */
export function pageCount(total: number, pageSize: number = LIST_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / pageSize) || 1);
}
