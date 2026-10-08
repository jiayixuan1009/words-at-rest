import type { MetadataRoute } from "next";
import {
  currentDailyDate,
  getDailyArchive,
  getLargePrintPuzzles,
  getPuzzles,
  getPuzzlesByDifficulty,
  getPuzzlesByTheme,
  getThemes,
  puzzlePath,
} from "@/lib/data";
import { CALENDAR_FIRST_MONTH, monthKey, nextMonth } from "@/lib/daily";
import { LIST_PAGE_SIZE, listPagePath, pageCount } from "@/lib/pagination";
import { absoluteUrl, SITE } from "@/lib/site";
import { DIFFICULTIES } from "@/lib/types";
import { datesFor, latestModified, puzzleDates, routeDates, themeDates } from "@/lib/content-dates";
import { PRINTABLES } from "@/lib/printables";

// TODO (P1): split into sitemap index (pages / themes / puzzles / daily) via generateSitemaps.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/", "/daily", "/calendar", "/themes", "/holidays", "/large-print", "/how-to-play", "/adults",
    "/about", "/accessibility", "/contact", "/privacy", "/terms", "/printables",
  ];
  const daily = getDailyArchive(Infinity); // retain all published archive URLs, including after year one
  return [
    ...staticPaths.map((p) => ({
      url: absoluteUrl(p),
      lastModified: staticModified(p, daily[0]),
      changeFrequency: (p === "/" || p === "/daily" || p === "/calendar" ? "daily" : "monthly") as "daily" | "monthly",
      priority: p === "/" ? 1 : p === "/privacy" || p === "/terms" ? 0.3 : p === "/calendar" ? 0.7 : 0.6,
    })),
    ...difficultyListUrls(),
    ...largePrintListUrls(),
    ...getThemes().map((t) => ({ url: absoluteUrl(`/themes/${t.slug}`), lastModified: themeDates(getPuzzlesByTheme(t.id), t.id).modified, priority: 0.8 })),
    ...getPuzzles().map((p) => ({ url: absoluteUrl(puzzlePath(p)), lastModified: puzzleDates(p).modified, priority: 0.7 })),
    ...PRINTABLES.map(pack => ({ url: absoluteUrl(`/printables/${pack.slug}`), lastModified: datesFor("app/printables/[pack]/page.tsx", "data/printables.json", ...pack.ids.map(id => `data/puzzles/${id}.json`)).modified, priority: 0.7 })),
    ...daily.map((d) => ({ url: absoluteUrl(`/daily/${d}`), lastModified: d, changeFrequency: "yearly" as const, priority: 0.4 })),
    ...calendarMonths().map((ym) => ({
      url: absoluteUrl(`/calendar/${ym}`),
      lastModified: latestModified(datesFor("app/calendar/[month]/page.tsx").modified, daily.find(d => d.startsWith(ym)) ?? `${ym}-01`),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}

/** /difficulty/{level} plus crawlable /page/2… hubs (24 cards each). */
function difficultyListUrls(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const d of DIFFICULTIES) {
    const pages = pageCount(getPuzzlesByDifficulty(d).length, LIST_PAGE_SIZE);
    for (let p = 1; p <= pages; p++) {
      out.push({
        url: absoluteUrl(listPagePath(`/difficulty/${d}`, p)),
        lastModified: datesFor("app/difficulty/DifficultyLevelView.tsx", "lib/pagination.ts", "data/puzzles/index.ts").modified,
        priority: p === 1 ? 0.7 : 0.55,
      });
    }
  }
  return out;
}

/** /large-print plus /page/2… (same page size as difficulty hubs). */
function largePrintListUrls(): MetadataRoute.Sitemap {
  const pages = pageCount(getLargePrintPuzzles().length, LIST_PAGE_SIZE);
  const out: MetadataRoute.Sitemap = [];
  for (let p = 1; p <= pages; p++) {
    // page 1 is already in staticPaths as /large-print
    if (p === 1) continue;
    out.push({
      url: absoluteUrl(listPagePath("/large-print", p)),
      lastModified: datesFor("app/large-print/LargePrintView.tsx", "lib/pagination.ts", "data/puzzles/index.ts").modified,
      priority: 0.55,
    });
  }
  return out;
}

/** Months from CALENDAR_FIRST_MONTH through the current daily month (UTC). */
function calendarMonths(): string[] {
  const end = monthKey(currentDailyDate());
  const out: string[] = [];
  let ym = CALENDAR_FIRST_MONTH;
  while (ym <= end) {
    out.push(ym);
    ym = nextMonth(ym);
  }
  return out;
}

function staticModified(path: string, newestDaily?: string): string {
  let modified = routeDates(path).modified;
  if (path === "/large-print") modified = datesFor("app/large-print/LargePrintView.tsx", "data/puzzles/index.ts").modified;
  if (path === "/themes") modified = datesFor("app/themes/page.tsx", "components/ThemeBrowser.tsx", "data/themes/index.ts").modified;
  if (path === "/printables") modified = datesFor("app/printables/page.tsx", "data/printables.json").modified;
  if (path === "/") modified = datesFor("app/page.tsx", "lib/discovery.ts").modified;
  return ["/", "/daily", "/calendar"].includes(path) && newestDaily ? latestModified(modified, newestDaily) : modified;
}
