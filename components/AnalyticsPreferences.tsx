"use client";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, setConsent } from "@/lib/analytics";
import { SITE } from "@/lib/site";

export default function AnalyticsPreferences() {
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    const sync = () => setAccepted(readConsent() === "accepted");
    sync(); window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);
  if (!/^G-[A-Z0-9]+$/i.test(SITE.gaId)) return <p>Analytics is disabled on this site.</p>;
  return <div className="my-4 flex flex-wrap items-center gap-3 font-sans text-base">
    <span>Analytics: {accepted ? "allowed" : "not allowed"}.</span>
    <button type="button" className="min-h-11 rounded-full border border-[#b8a990] px-4 py-2" onClick={() => setConsent(accepted ? "rejected" : "accepted")}>{accepted ? "Withdraw analytics consent" : "Allow analytics"}</button>
  </div>;
}
