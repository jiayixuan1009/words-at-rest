import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Ornament } from "@/components/Picture";
import { ART } from "@/lib/images";
import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Words at Rest handles information, cookies, analytics and advertising, including Google AdSense and your choices.",
  alternates: { canonical: "/privacy" },
};

/**
 * Usable English privacy policy for a free US-facing puzzle site.
 * Not legal advice. Update when AdSense / GA4 / a consent banner go live.
 * No company street address on file — contact is email only.
 */
export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />
      <Prose>
        <Ornament art={ART.legalOrnament} width={200} className="!justify-start" />
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-base text-[var(--ink-soft)]">Last updated: {SITE.lastUpdatedLegal}</p>
        <section
          aria-labelledby="privacy-summary"
          className="rounded-[4px] border border-[#cbbfa6] bg-[var(--paper-deep)] p-5 [&_li]:ml-5"
        >
          <h2 id="privacy-summary" className="!mt-0">Privacy in plain English</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <strong>What we collect:</strong> aggregate traffic statistics from Google Analytics 4, such
              as which pages are visited, roughly from where, and on what kind of device. GA4 uses
              cookies to do this. Our host, Cloudflare, also processes standard technical data such as IP
              addresses to deliver and protect the Site.{" "}
              <a href="#analytics">How analytics works</a>
            </li>
            <li>
              <strong>What we don’t:</strong> there are no accounts, so we never ask for your name or
              email address. We only have your email if you write to us.{" "}
              <a href="#collect">What we collect</a>
            </li>
            <li>
              <strong>Your puzzle progress</strong> (found words and your large-print setting) is saved
              only in your own browser. We never receive it, and clearing your browser data erases it.{" "}
              <a href="#cookies">Cookies and storage</a>
            </li>
            <li>
              <strong>We do not sell your personal information.</strong> Ads are planned to keep the
              site free; this policy explains what changes when they go live.{" "}
              <a href="#advertising">Advertising</a>
            </li>
            <li>
              <strong>Your choices:</strong> you can opt out of Google Analytics and ask us about your
              data at any time. <a href="#your-rights">Your rights</a>
            </li>
          </ul>
        </section>
        <p>
          This Privacy Policy describes how {SITE.name} (“we”, “us”) operates the website{" "}
          {SITE.domain} (the “Site”) and how information is handled when you visit. The Site offers
          free word search puzzles. We do not require an account. By using the Site you agree to
          this policy.
        </p>

        <h2>Who we are</h2>
        <p>
          {SITE.name} is a small independent puzzle website. For privacy questions or requests,
          email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. We do not publish a
          separate business street address on this Site.
        </p>

        <h2 id="collect">Information we collect</h2>
        <ul>
          <li>
            <strong>Information stored only on your device.</strong> Puzzle progress (which words you
            have found) and your large-print preference are saved in your browser’s{" "}
            <code>localStorage</code>. That data stays on your device; we do not receive or sync it
            to our servers.
          </li>
          <li>
            <strong>Automatic technical data.</strong> Like most websites, our hosting and security
            provider (Cloudflare), our analytics provider (Google Analytics) and any advertising partners we enable may process
            technical information such as IP address, approximate location derived from IP, browser
            and device type, referring URL, pages viewed, and timestamps. This is used to deliver the
            Site, keep it secure, understand usage and (when enabled) show ads.
          </li>
          <li>
            <strong>Information you send us.</strong> If you email us, we receive your email address,
            the message content, and any attachments you include.
          </li>
        </ul>
        <p>
          We do not knowingly collect sensitive personal information (such as government IDs, precise
          health data, or payment card numbers). The Site does not process payments.
        </p>

        <h2 id="cookies">Cookies and similar technologies</h2>
        <p>
          We and our partners may use cookies, local storage, pixels and similar technologies to:
        </p>
        <ul>
          <li>Remember preferences (for example large print) on your device;</li>
          <li>Understand how the Site is used (Google Analytics 4);</li>
          <li>Serve, personalize and measure advertising (when AdSense or similar is enabled).</li>
        </ul>
        <p>
          You can control or delete cookies in your browser settings. Blocking some cookies may
          affect site features. A cookie / consent banner may be shown in regions where required
          before non-essential cookies are used.
        </p>

        <h2 id="analytics">Analytics</h2>
        <p>
          We use Google Analytics 4 (GA4) to see aggregate traffic statistics — for example which
          pages and puzzles are popular — so we can improve the Site. GA4 sets cookies and collects
          usage data such as pages viewed, referring site, device and browser type, and approximate
          location; we do not send your name or email address to Google Analytics. Learn more at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
            How Google uses information from sites that use its services
          </a>
          . You can opt out with the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>
          , or by blocking cookies in your browser.
        </p>

        <h2 id="advertising">Advertising (Google AdSense)</h2>
        <p>
          The Site is intended to be supported by advertising. We use, or plan to use, Google AdSense
          (and may use related Google advertising services). Third-party vendors, including Google,
          use cookies to serve ads based on your prior visits to this Site or other sites. Google’s
          use of advertising cookies enables it and its partners to serve ads based on your visits to
          this and/or other sites on the Internet.
        </p>
        <ul>
          <li>
            Opt out of personalized advertising:{" "}
            <a href="https://adssettings.google.com" rel="noopener noreferrer">Google Ads Settings</a>.
          </li>
          <li>
            Opt out of some third-party vendors’ cookies:{" "}
            <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer">
              www.aboutads.info
            </a>
            .
          </li>
        </ul>
        <p>
          Visitors in the European Economic Area, the United Kingdom and Switzerland will be asked
          for consent before personalized advertising cookies are used, where required by law
          (including via Google Consent Mode where implemented). Until AdSense is approved and
          enabled in code, ad requests may not run even though placeholder space is reserved.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To operate, maintain, secure and improve the Site and its puzzles;</li>
          <li>To understand usage trends and diagnose problems;</li>
          <li>To show and measure advertising that keeps the Site free (when enabled);</li>
          <li>To respond to messages you send us;</li>
          <li>To protect against abuse and to comply with law.</li>
        </ul>

        <h2 id="sharing">Sharing</h2>
        <p>
          We do not sell your personal information for money. We share information only with service
          providers that help us run the Site (such as hosting/CDN, analytics and advertising
          partners), when required by law, or to protect our rights and users. Those partners process
          data under their own privacy policies (for example Cloudflare and Google).
        </p>

        <h2 id="your-rights">Your rights and choices</h2>
        <p>
          Depending on where you live (for example under the GDPR, UK GDPR, or California privacy
          laws such as the CCPA/CPRA), you may have the right to access, correct, delete or obtain a
          copy of personal information, to object to or restrict certain processing, and to opt out
          of “sale” or “sharing” of personal information for cross-context behavioral advertising.
          To make a request, email{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> with “Privacy request” in
          the subject line. We will respond as required by applicable law. You may also use the
          advertising opt-outs linked above.
        </p>
        <p>
          <strong>California “Do Not Sell or Share”.</strong> We do not sell personal information for
          money. If advertising partners engage in “sharing” for personalized ads as defined by
          California law, you can opt out via Google Ads Settings / aboutads.info, or by emailing us.
        </p>

        <h2>Children’s privacy</h2>
        <p>
          The Site is intended for a general audience (primarily adults and seniors) and is not
          directed at children under 13. We do not knowingly collect personal information from
          children under 13. If you believe a child has provided us with personal information,
          contact us and we will delete it.
        </p>

        <h2>International visitors</h2>
        <p>
          The Site is operated with a US-facing audience in mind and is hosted on global
          infrastructure (including Cloudflare). If you visit from outside the United States, your
          information may be processed in the United States or other countries where our providers
          operate.
        </p>

        <h2>Data retention and security</h2>
        <p>
          Device-local puzzle progress remains until you clear site data or use Reset. Emails we
          receive are kept only as long as needed to respond and operate the Site. We use reasonable
          safeguards, including HTTPS; no method of transmission or storage is completely secure.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. The “Last updated” date above shows when it
          last changed. Continued use of the Site after an update means you accept the revised
          policy.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          Privacy questions or requests:{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>
      </Prose>
    </>
  );
}
