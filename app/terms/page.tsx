import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use Words at Rest and its free word search puzzles.",
  alternates: { canonical: "/terms" },
};

/**
 * Usable English terms for a free US-facing puzzle site.
 * Not legal advice. No company street address — contact is email only.
 */
export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Terms of Use", href: "/terms" }]} />
      <Prose>
        <h1 className="text-4xl font-semibold tracking-tight">Terms of Use</h1>
        <p className="text-base text-stone-600">Last updated: {SITE.lastUpdatedLegal}</p>
        <p>
          Welcome to {SITE.name}. By accessing or using {SITE.domain} (the “Site”), you agree to
          these Terms of Use. If you do not agree, please do not use the Site.
        </p>

        <h2>1. The Site</h2>
        <p>
          The Site offers free word search puzzles for personal, non-commercial entertainment. Features
          may include themed puzzles, large-print layouts, and a daily puzzle. Puzzles are provided
          “as is”; we may add, change or remove content at any time.
        </p>

        <h2>2. Eligibility and acceptable use</h2>
        <p>
          You must use the Site in a lawful manner. You agree not to: disrupt or overload the Site;
          scrape or harvest content at scale; attempt to bypass security or access non-public systems;
          reverse engineer our services except where permitted by law; or use the Site to send spam,
          malware or unlawful material.
        </p>

        <h2>3. Intellectual property</h2>
        <p>
          The puzzles, word lists, text, design, graphics and software on the Site are owned by{" "}
          {SITE.name} or its licensors and are protected by copyright and other laws. You may play
          puzzles online and print a reasonable number of single copies for personal or classroom use.
          You may not republish, sell, sublicense or redistribute our puzzles, word lists or site
          code without prior written permission.
        </p>

        <h2>4. Accounts and progress</h2>
        <p>
          The Site does not require an account. Progress may be stored in your browser
          (localStorage). Clearing site data, switching devices or browsers, or using private mode
          may erase progress. We do not guarantee that progress will be preserved.
        </p>

        <h2>5. Advertising and third-party services</h2>
        <p>
          The Site is supported, or intended to be supported, by advertising (including Google
          AdSense) and may use analytics and hosting providers (including Cloudflare and Google).
          Third-party services are governed by their own terms and privacy policies. We are not
          responsible for third-party content, products or practices. Ads must not be clicked
          fraudulently or encouraged in ways that violate ad-network policies.
        </p>

        <h2>6. Feedback</h2>
        <p>
          If you send suggestions (theme ideas, word lists, bug reports), you grant us a
          non-exclusive, worldwide, royalty-free license to use them without obligation to you.
        </p>

        <h2>7. Disclaimer of warranties</h2>
        <p>
          THE SITE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
          We do not warrant that the Site will be uninterrupted, error-free, or free of harmful
          components.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, {SITE.name.toUpperCase()} AND ITS OPERATORS WILL
          NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR
          ANY LOSS OF DATA OR PROFITS, ARISING FROM YOUR USE OF THE SITE. OUR TOTAL LIABILITY FOR ANY
          CLAIM ARISING OUT OF THESE TERMS OR THE SITE WILL NOT EXCEED USD $50.
        </p>

        <h2>9. Children</h2>
        <p>
          The Site is intended for a general audience and is not directed at children under 13. If
          you are under 13, do not use the Site or send us personal information.
        </p>

        <h2>10. Changes</h2>
        <p>
          We may update these Terms from time to time. The “Last updated” date shows the latest
          revision. Continued use after changes means you accept the updated Terms.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these Terms:{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. We do not publish a
          separate business street address on this Site.
        </p>
      </Prose>
    </>
  );
}
