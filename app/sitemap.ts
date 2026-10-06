import type { MetadataRoute } from "next";
import { currentDailyDate, getDailyArchive, getPuzzles, getThemes, puzzlePath } from "@/lib/data";
import { CALENDAR_FIRST_MONTH, monthKey, nextMonth } from "@/lib/daily";
import { absoluteUrl, SITE } from "@/lib/site";
import { DIFFICULTIES } from "@/lib/types";

// TODO (P1): split into sitemap index (pages / themes / puzzles / daily) via generateSitemaps.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/", "/daily", "/calendar", "/themes", "/large-print", "/how-to-play", "/adults",
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
    ...DIFFICULTIES.map((d) => ({ url: absoluteUrl(`/difficulty/${d}`), lastModified: SITE.contentUpdated, priority: 0.7 })),
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
