export const SITE = {
  name: "Words at Rest",
  domain: "wordsatrest.com",
  url: (process.env.SITE_URL || "https://wordsatrest.com").replace(/\/$/, ""),
  tagline: "Calm, free word search puzzles for adults — large print, daily and seasonal.",
  /** Contact inbox — enable Cloudflare Email Routing (or Workspace) before AdSense. */
  contactEmail: "hello@wordsatrest.com",
  /**
   * First official date in the Daily archive (UTC, YYYY-MM-DD).
   * Dates before this 404; sitemap/archive never list pre-launch days.
   * Launch day (Asia/Shanghai calendar): 2026-10-06. Override with env DAILY_START.
   */
  dailyStart: process.env.DAILY_START || "2026-10-06",
  lastUpdatedLegal: "October 6, 2026",
};

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
