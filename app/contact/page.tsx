import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Words at Rest with puzzle suggestions, accessibility feedback, corrections or privacy requests.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <Prose>
        <h1 className="text-4xl font-semibold tracking-tight">Contact us</h1>
        <p>We read every message and aim to reply within a few business days.</p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>
        <h2>Helpful things to include</h2>
        <ul>
          <li><strong>Puzzle feedback or a typo:</strong> the page address (URL) and the word in question.</li>
          <li><strong>Theme ideas:</strong> the topic and a few words you would like to see.</li>
          <li><strong>Accessibility:</strong> your device, browser and what made the puzzle hard to use.</li>
          <li>
            <strong>Privacy requests:</strong> please put “Privacy request” in the subject line. See our{" "}
            <a href="/privacy">Privacy Policy</a> for details.
          </li>
          <li>
            <strong>Copyright concerns:</strong> identify the content and your rights in it, and we will
            review it promptly.
          </li>
        </ul>
        <p className="text-base text-stone-600">
          We do not sell puzzles or accept paid placements. Please do not send personal information
          you do not need to share.
        </p>
      </Prose>
    </>
  );
}
