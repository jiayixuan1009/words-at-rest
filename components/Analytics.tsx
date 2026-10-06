"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { CONSENT_EVENT, CONSENT_KEY, readConsent } from "@/lib/analytics";

/** Basic consent mode: no Google tag is requested until analytics is accepted. */
export default function Analytics() {
  const pathname = usePathname();
  const id = SITE.gaId;
  const [accepted, setAccepted] = useState(() => readConsent() === "accepted");
  const lastPage = useRef("");
  useEffect(() => {
    const sync = () => setAccepted(readConsent() === "accepted");
    const storage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY || e.key === null) {
        window.warAnalyticsConsent = undefined;
        sync();
      }
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", storage);
    };
  }, []);

  useEffect(() => {
    if (!/^G-[A-Z0-9]+$/i.test(id)) return;
    const flags = window as unknown as Record<string, unknown>;
    flags["ga-disable-" + id] = !accepted;
    if (!accepted) {
      window.warAnalyticsReady = false;
      window.warAnalyticsQueue = [];
      lastPage.current = "";
      window.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      document.getElementById("war-ga4")?.remove();
      return;
    }
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer!.push(arguments); };
      window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      window.gtag("js", new Date());
      window.gtag("config", id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    }
    window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.warAnalyticsReady = true;
    for (const item of window.warAnalyticsQueue ?? []) window.gtag("event", item.name, item.params);
    window.warAnalyticsQueue = [];
    if (!document.getElementById("war-ga4")) {
      const script = document.createElement("script");
      script.id = "war-ga4";
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
      document.head.appendChild(script);
    }
    // History-based automatic page views must be disabled in GA4 Enhanced Measurement.
    if (lastPage.current !== pathname) {
      lastPage.current = pathname;
      window.gtag("event", "page_view", { page_path: pathname, page_location: location.href, page_title: document.title });
    }
  }, [accepted, pathname, id]);
  return null;
}
