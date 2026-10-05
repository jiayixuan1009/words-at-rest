import Script from "next/script";

/**
 * GA4 loader. Renders nothing unless NEXT_PUBLIC_GA_ID is set at build time
 * (e.g. G-XXXXXXXXXX). Do not invent a real Measurement ID — paste yours in
 * Cloudflare Worker env / .env and redeploy.
 *
 * Consent Mode / EEA gating is intentionally out of scope until
 * NEXT_PUBLIC_COOKIE_CONSENT is enabled.
 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
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
