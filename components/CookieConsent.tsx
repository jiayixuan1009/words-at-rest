"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readConsent, setConsent } from "@/lib/analytics";
import { SITE } from "@/lib/site";

export default function CookieConsent() {
  // Present in SSR for new visitors; the head script hides saved choices before paint.
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(readConsent() === null);
    const open = () => {
      document.documentElement.removeAttribute("data-analytics-choice-saved");
      setVisible(true);
    };
    window.addEventListener("war:open-analytics-choices", open);
    return () => window.removeEventListener("war:open-analytics-choices", open);
  }, []);
  if ((!/^G-[A-Z0-9]+$/i.test(SITE.gaId) && (SITE.clarityId === "off" || !/^[a-z0-9]+$/i.test(SITE.clarityId))) || !visible) return null;
  const choose = (value: "accepted" | "rejected") => {
    setConsent(value);
    setVisible(false);
  };
  return (
    <aside aria-label="Analytics choices" className="analytics-notice no-print border-y border-[#d4cbb8] bg-[#efe7d9]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 font-sans text-base sm:px-8">
        <p className="flex-1 basis-64">Allow optional analytics to help improve our puzzles? Playing and saving progress work either way. <Link prefetch={false} href="/privacy#analytics" className="underline underline-offset-4">Privacy details</Link></p>
        <button type="button" onClick={() => choose("rejected")} className="min-h-11 rounded-full border border-[#b8a990] px-4 py-2">Reject analytics</button>
        <button type="button" onClick={() => choose("accepted")} className="min-h-11 rounded-full border border-[#b8a990] px-4 py-2">Allow analytics</button>
      </div>
    </aside>
  );
}
