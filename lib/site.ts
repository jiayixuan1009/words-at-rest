export const SITE = {
  name: "Words at Rest",
  domain: "wordsatrest.com",
  url: (process.env.SITE_URL || "https://wordsatrest.com").replace(/\/$/, ""),
  tagline: "Calm, free word search puzzles for adults — large print, daily and seasonal.",
  // TODO: replace with a real monitored inbox before applying for AdSense.
  contactEmail: "hello@wordsatrest.com",
  /** First date in the Daily archive (UTC). Set DAILY_START to the real launch day before going live. */
  dailyStart: process.env.DAILY_START || "2026-10-01",
  lastUpdatedLegal: "October 6, 2026",
};

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
