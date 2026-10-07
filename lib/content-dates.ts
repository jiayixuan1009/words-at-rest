import DATES from "virtual:content-dates";
import { SITE } from "./site";
import type { Puzzle } from "./types";

/** ISO 8601 date-times derived from git history at build time (see scripts/content-dates.mjs). */
export interface PageDates {
  published: string;
  modified: string;
}

const FALLBACK: PageDates = { published: SITE.dailyStart, modified: SITE.contentUpdated };

const t = (iso: string) => Date.parse(iso.length === 10 ? `${iso}T00:00:00Z` : iso);

/** Earliest first-commit and latest commit across the given repo files. */
export function datesFor(...files: string[]): PageDates {
  const hits = files.map((f) => DATES[f]).filter(Boolean);
  if (!hits.length) return FALLBACK;
  let { published, modified } = hits[0];
  for (const h of hits.slice(1)) {
    if (t(h.published) < t(published)) published = h.published;
    if (t(h.modified) > t(modified)) modified = h.modified;
  }
  return { published, modified };
}

/** Dates of a static route's page file, e.g. "/how-to-play" → app/how-to-play/page.tsx. */
export function routeDates(route: string): PageDates {
  return datesFor(route === "/" ? "app/page.tsx" : `app${route}/page.tsx`);
}

export function puzzleDates(p: Puzzle): PageDates {
  return datesFor(`data/puzzles/${p.id}.json`);
}

/** A theme hub: first/latest commit across theme JSON + puzzle files (hub copy edits bump modified). */
export function themeDates(puzzles: Puzzle[], themeId: string): PageDates {
  return datesFor(
    `data/themes/${themeId}.json`,
    ...puzzles.map((p) => `data/puzzles/${p.id}.json`),
  );
}
