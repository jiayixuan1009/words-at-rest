import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * GA4 loader — rendered once from the root layout, so exactly one Google tag per page.
 * The Measurement ID comes from SITE.gaId (lib/site.ts; env NEXT_PUBLIC_GA_ID
 * overrides, "off" disables). Both scripts load afterInteractive so they never
 * compete with the LCP image or block hydration.
 *
 * Consent Mode v2 / EEA-UK gating is NOT wired yet: the audience is US-focused and
 * NEXT_PUBLIC_COOKIE_CONSENT is off. Wire gtag('consent', 'default', …) here before
 * enabling the banner or targeting EEA/UK traffic.
 */
export default function Analytics() {
  const id = SITE.gaId;
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
