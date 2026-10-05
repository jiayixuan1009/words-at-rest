"use client";

/**
 * Lightweight cookie-notice stub. Hidden unless NEXT_PUBLIC_COOKIE_CONSENT=1.
 * Does not block scripts yet — wire Consent Mode v2 before enabling AdSense
 * personalized ads for EEA/UK. Dismissal is stored in localStorage only.
 */
import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "war:cookie-consent";

export default function CookieConsent() {
  const enabled = process.env.NEXT_PUBLIC_COOKIE_CONSENT === "1";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [enabled]);

  if (!enabled || !visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#d4cbb8] bg-[#F4EFE6]/95 p-4 shadow-lg backdrop-blur sm:p-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--ink)]">
          We use cookies and similar technologies for preferences, analytics (when enabled), and
          advertising (when enabled). See our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-full border border-[#b8a990] bg-white px-4 py-2 text-sm font-medium hover:bg-[#ebe4d6]/60"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
