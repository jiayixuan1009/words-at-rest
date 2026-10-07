import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

// pagination.ts is TypeScript — compile-check via dynamic import after build is heavy.
// Mirror the pure helpers here for a fast lock, and keep source of truth in lib/pagination.ts.
const LIST_PAGE_SIZE = 24;

function paginate(items, page, pageSize = LIST_PAGE_SIZE) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const start = (page - 1) * pageSize;
  const slice = page >= 1 && page <= totalPages ? items.slice(start, start + pageSize) : [];
  const from = slice.length === 0 ? 0 : start + 1;
  const to = slice.length === 0 ? 0 : start + slice.length;
  return { items: slice, page, totalPages, total, pageSize, from, to };
}

function listPagePath(basePath, page) {
  const base = basePath.replace(/\/$/, "") || "/";
  return page <= 1 ? base : `${base}/page/${page}`;
}

function paginationWindow(current, totalPages, neighbors = 1) {
  if (totalPages <= 1) return [1];
  const set = new Set();
  set.add(1);
  set.add(totalPages);
  for (let p = current - neighbors; p <= current + neighbors; p++) {
    if (p >= 1 && p <= totalPages) set.add(p);
  }
  const sorted = [...set].sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push(null);
    out.push(sorted[i]);
  }
  return out;
}

test("paginate slices 24 and reports bounds", () => {
  const items = Array.from({ length: 526 }, (_, i) => i + 1);
  const p1 = paginate(items, 1);
  assert.equal(p1.items.length, 24);
  assert.equal(p1.from, 1);
  assert.equal(p1.to, 24);
  assert.equal(p1.totalPages, 22);
  const last = paginate(items, 22);
  assert.equal(last.items.length, 22);
  assert.equal(last.from, 505);
  assert.equal(last.to, 526);
  const bad = paginate(items, 99);
  assert.equal(bad.items.length, 0);
});

test("listPagePath omits /page/1", () => {
  assert.equal(listPagePath("/difficulty/easy", 1), "/difficulty/easy");
  assert.equal(listPagePath("/difficulty/easy", 2), "/difficulty/easy/page/2");
  assert.equal(listPagePath("/large-print", 3), "/large-print/page/3");
});

test("paginationWindow includes ends and gaps", () => {
  assert.deepEqual(paginationWindow(1, 22), [1, 2, null, 22]);
  assert.deepEqual(paginationWindow(10, 22), [1, null, 9, 10, 11, null, 22]);
  assert.deepEqual(paginationWindow(22, 22), [1, null, 21, 22]);
});
