import type { MetadataRoute } from "next";
import { getDailyArchive, getPuzzles, getThemes, puzzlePath } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";
import { DIFFICULTIES } from "@/lib/types";

// TODO (P1): split into sitemap index (pages / themes / puzzles / daily) via generateSitemaps.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/", "/daily", "/themes", "/large-print", "/how-to-play", "/adults",
    "/about", "/contact", "/privacy", "/terms",
  ];
  return [
    ...staticPaths.map((p) => ({
      url: absoluteUrl(p),
      changeFrequency: (p === "/" || p === "/daily" ? "daily" : "monthly") as "daily" | "monthly",
      priority: p === "/" ? 1 : 0.6,
    })),
    ...DIFFICULTIES.map((d) => ({ url: absoluteUrl(`/difficulty/${d}`), priority: 0.7 })),
    ...getThemes().map((t) => ({ url: absoluteUrl(`/themes/${t.slug}`), priority: 0.8 })),
    ...getPuzzles().map((p) => ({ url: absoluteUrl(puzzlePath(p)), lastModified: p.createdAt, priority: 0.7 })),
    ...getDailyArchive(90).map((d) => ({ url: absoluteUrl(`/daily/${d}`), priority: 0.4 })),
  ];
}
