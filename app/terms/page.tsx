import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use Words at Rest and its free word search puzzles.",
  alternates: { canonical: "/terms" },
};

// DRAFT — review before launch; not legal advice.
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

        <h2>1. Use of the Site</h2>
        <p>
          The Site offers free word search puzzles for personal, non-commercial entertainment. You
          agree not to misuse the Site, including by attempting to disrupt it, scraping it at scale,
          circumventing security features, or using it for any unlawful purpose.
        </p>

        <h2>2. Intellectual property</h2>
        <p>
          The puzzles, word lists, text, design and code on the Site are owned by {SITE.name} or
          its licensors and are protected by copyright and other laws. You may play puzzles and
          print single copies for personal or classroom use. You may not republish, sell or
          redistribute our puzzles or word lists without written permission.
        </p>

        <h2>3. Advertising and third-party links</h2>
        <p>
          The Site is supported by advertising and may contain links to third-party websites. We
          are not responsible for the content, products or practices of third parties.
        </p>

        <h2>4. Feedback</h2>
        <p>
          If you send us suggestions (for example, theme ideas or word lists), you grant us a
          non-exclusive, royalty-free right to use them without obligation to you.
        </p>

        <h2>5. Disclaimer</h2>
        <p>
          The Site is provided “as is” and “as available” without warranties of any kind, express
          or implied. We do not guarantee that the Site will be uninterrupted, error-free, or that
          saved progress will always be preserved.
        </p>

        <h2>6. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE.name} will not be liable for any indirect,
          incidental, special or consequential damages arising from your use of the Site.
        </p>

        <h2>7. Children</h2>
        <p>
          The Site is intended for a general audience and is not directed at children under 13.
        </p>

        <h2>8. Changes</h2>
        <p>
          We may update these Terms from time to time. Continued use of the Site after changes
          means you accept the updated Terms.
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions about these Terms: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>
      </Prose>
    </>
  );
}
