import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Words at Rest handles information, cookies, analytics and advertising, including Google AdSense and your choices.",
  alternates: { canonical: "/privacy" },
};

// DRAFT — reasonable starting point, not legal advice. Review before launch,
// especially once AdSense / GA4 / a consent banner are actually enabled.
export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />
      <Prose>
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-base text-stone-600">Last updated: {SITE.lastUpdatedLegal}</p>
        <p>
          This Privacy Policy explains how {SITE.name} (“we”, “us”) at {SITE.domain} collects, uses
          and shares information when you visit our website. By using the site you agree to this
          policy.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Information stored on your device.</strong> Puzzle progress and your large print
            preference are saved in your browser’s local storage. This data stays on your device; we
            do not receive it.
          </li>
          <li>
            <strong>Usage and device data.</strong> Like most websites, our hosting provider and
            analytics tools may automatically collect technical information such as IP address,
            browser type, device type, referring page, pages viewed and the date and time of your
            visit.
          </li>
          <li>
            <strong>Information you send us.</strong> If you email us, we receive your email address
            and the contents of your message.
          </li>
        </ul>
        <p>We do not require an account and we do not knowingly collect sensitive personal information.</p>

        <h2>Cookies and similar technologies</h2>
        <p>
          We and our partners may use cookies, local storage, web beacons and similar technologies
          to remember preferences, understand how the site is used, and serve and measure
          advertising. You can control or delete cookies through your browser settings. Blocking
          some cookies may affect how the site works.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use Google Analytics to understand how visitors use the site, such as which
          puzzles are popular. Google Analytics uses cookies and collects information such as pages
          viewed and approximate location. Learn more at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">
            How Google uses information from sites that use its services
          </a>
          . You can opt out using the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <h2>Advertising (Google AdSense)</h2>
        <p>
          We use, or may use, Google AdSense to show ads. Third-party vendors, including Google, use
          cookies to serve ads based on your prior visits to this website or other websites.
          Google’s use of advertising cookies enables it and its partners to serve ads to you based
          on your visit to this site and/or other sites on the Internet.
        </p>
        <ul>
          <li>
            You may opt out of personalized advertising by visiting{" "}
            <a href="https://adssettings.google.com" rel="noopener">Google Ads Settings</a>.
          </li>
          <li>
            You can also opt out of some third-party vendors’ use of cookies for personalized
            advertising at{" "}
            <a href="https://www.aboutads.info/choices/" rel="noopener">www.aboutads.info</a>.
          </li>
        </ul>
        <p>
          Visitors in the European Economic Area, the United Kingdom and Switzerland will be asked
          for consent before personalized advertising cookies are used, where required by law.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To operate, maintain and improve the site and its puzzles.</li>
          <li>To understand usage trends and fix problems.</li>
          <li>To show and measure advertising that keeps the site free.</li>
          <li>To respond to messages you send us.</li>
          <li>To protect the site against abuse and comply with legal obligations.</li>
        </ul>

        <h2>Sharing</h2>
        <p>
          We do not sell your personal information for money. We share information only with
          service providers that help us run the site (such as hosting, analytics and advertising
          partners), when required by law, or to protect our rights.
        </p>

        <h2>Your rights and choices</h2>
        <p>
          Depending on where you live (for example under the GDPR, UK GDPR or California privacy
          laws), you may have the right to access, correct or delete personal information, to
          object to or restrict certain processing, and to opt out of “sale” or “sharing” of
          personal information for targeted advertising. To make a request, email{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> with “Privacy request” in
          the subject line.
        </p>

        <h2>Children’s privacy</h2>
        <p>
          {SITE.name} is intended for a general audience and is not directed at children under 13.
          We do not knowingly collect personal information from children under 13. If you believe a
          child has provided us with personal information, please contact us and we will delete it.
        </p>

        <h2>Data retention and security</h2>
        <p>
          We keep information only as long as needed for the purposes above. We use reasonable
          safeguards, including HTTPS across the site, but no method of transmission or storage is
          completely secure.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The “Last updated” date above shows when it
          last changed.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>
      </Prose>
    </>
  );
}
