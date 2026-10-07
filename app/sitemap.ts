import type { MetadataRoute } from "next";
import {
  currentDailyDate,
  getDailyArchive,
  getLargePrintPuzzles,
  getPuzzles,
  getPuzzlesByDifficulty,
  getThemes,
  puzzlePath,
} from "@/lib/data";
import { CALENDAR_FIRST_MONTH, monthKey, nextMonth } from "@/lib/daily";
import { LIST_PAGE_SIZE, listPagePath, pageCount } from "@/lib/pagination";
import { absoluteUrl, SITE } from "@/lib/site";
import { DIFFICULTIES } from "@/lib/types";

// TODO (P1): split into sitemap index (pages / themes / puzzles / daily) via generateSitemaps.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/", "/daily", "/calendar", "/themes", "/holidays", "/large-print", "/how-to-play", "/adults",
    "/about", "/accessibility", "/contact", "/privacy", "/terms",
  ];
  const daily = getDailyArchive(366); // dated pages from DAILY_START → current daily date (UTC)
  return [
    ...staticPaths.map((p) => ({
      url: absoluteUrl(p),
      lastModified: p === "/" || p === "/daily" || p === "/calendar" ? daily[0] ?? SITE.contentUpdated : SITE.contentUpdated,
      changeFrequency: (p === "/" || p === "/daily" || p === "/calendar" ? "daily" : "monthly") as "daily" | "monthly",
      priority: p === "/" ? 1 : p === "/privacy" || p === "/terms" ? 0.3 : p === "/calendar" ? 0.7 : 0.6,
    })),
    ...difficultyListUrls(),
    ...largePrintListUrls(),
    ...getThemes().map((t) => ({ url: absoluteUrl(`/themes/${t.slug}`), lastModified: SITE.contentUpdated, priority: 0.8 })),
    ...getPuzzles().map((p) => ({ url: absoluteUrl(puzzlePath(p)), lastModified: p.createdAt, priority: 0.7 })),
    ...daily.map((d) => ({ url: absoluteUrl(`/daily/${d}`), lastModified: d, changeFrequency: "yearly" as const, priority: 0.4 })),
    ...calendarMonths().map((ym) => ({
      url: absoluteUrl(`/calendar/${ym}`),
      lastModified: daily[0] ?? SITE.contentUpdated,
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
        lastModified: SITE.contentUpdated,
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
      lastModified: SITE.contentUpdated,
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
