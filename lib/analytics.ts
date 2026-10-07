import { SITE } from "./site.ts";

export const CONSENT_KEY = "war:analytics-consent";
export const CONSENT_EVENT = "war:analytics-consent-change";
export type AnalyticsConsent = "accepted" | "rejected";
export type GameEvent = "puzzle_start" | "word_found" | "puzzle_complete" | "next_puzzle" | "progress_resume" | "reset" | "grid_size_change" | "printable_download";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    warAnalyticsConsent?: AnalyticsConsent;
    warAnalyticsReady?: boolean;
    warAnalyticsQueue?: { name: GameEvent; params: Record<string, string | number> }[];
  }
}

export function readConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  if (window.warAnalyticsConsent) return window.warAnalyticsConsent;
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch { return null; }
}

export function trackEvent(name: GameEvent, params: Record<string, string | number>) {
  if (typeof window === "undefined" || !/^G-[A-Z0-9]+$/i.test(SITE.gaId) || readConsent() !== "accepted") return false;
  if (!window.warAnalyticsReady || !window.gtag) {
    // Only consented events wait for the loader; never replay rejected activity.
    (window.warAnalyticsQueue ??= []).push({ name, params });
    return true;
  }
  window.gtag("event", name, params);
  return true;
}

export function setConsent(value: AnalyticsConsent) {
  window.warAnalyticsConsent = value;
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* Keep the choice for this page. */ }
  if (value === "rejected") {
    window.warAnalyticsReady = false;
    window.warAnalyticsQueue = [];
    // Disable new hits immediately, before React updates the loader.
    const flags = window as unknown as Record<string, unknown>;
    for (const name of Object.keys(flags)) if (name.startsWith("ga-disable-")) flags[name] = true;
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (name !== "_ga" && !name.startsWith("_ga_")) continue;
      const parts = location.hostname.split(".");
      document.cookie = name + "=; Max-Age=0; path=/";
      for (let i = 0; i < parts.length - 1; i++) document.cookie = name + "=; Max-Age=0; path=/; domain=." + parts.slice(i).join(".");
    }
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
