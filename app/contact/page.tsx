import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Picture from "@/components/Picture";
import { ART } from "@/lib/images";
import Prose from "@/components/Prose";
import HubSchema from "@/components/HubSchema";
import { routeDates } from "@/lib/content-dates";
import { SITE } from "@/lib/site";
import { seo } from "@/lib/seo";

const DATES = routeDates("/contact");

const DESCRIPTION =
  "Contact Words at Rest by email with puzzle feedback, typo reports, theme ideas, accessibility issues, privacy requests or copyright concerns. We reply within a few business days.";

export const metadata: Metadata = seo({
  title: "Contact Us — Puzzle Feedback & Theme Ideas",
  description: DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <Prose>
        <h1 className="text-4xl font-semibold tracking-tight">Contact us</h1>
        <Picture art={ART.contactSpot} priority sizes="(min-width: 640px) 360px, 80vw" className="my-4 h-auto w-full max-w-[360px]" />
        <p>
          Words at Rest is an independent site edited by{" "}
          <Link href={SITE.editor.aboutPath}>{SITE.editor.name}</Link>. We read every message and aim
          to reply within a few business days.
        </p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>
        <p className="text-base">
          Email is the only way to reach us — we do not offer phone support, and we never ask for
          payment or passwords.
        </p>
        <h2>Helpful things to include</h2>
        <ul>
          <li><strong>Puzzle feedback or a typo:</strong> the page address (URL) and the word in question.</li>
          <li><strong>Theme ideas:</strong> the topic and a few words you would like to see.</li>
          <li><strong>Accessibility:</strong> your device, browser and what made the puzzle hard to use.</li>
          <li>
            <strong>Privacy requests:</strong> please put “Privacy request” in the subject line. See our{" "}
            <Link href="/privacy">Privacy Policy</Link> for details.
          </li>
          <li>
            <strong>Copyright concerns:</strong> identify the content and your rights in it, and we will
            review it promptly.
          </li>
        </ul>
        <h2>Before you write</h2>
        <p>
          Many questions about selecting words, large print and difficulty levels are answered on our{" "}
          <Link href="/how-to-play">how to play</Link> page. Progress is stored only in your own
          browser, so we cannot restore a puzzle you were part-way through on another device.
        </p>
        <p className="text-base text-[var(--ink-soft)]">
          We do not sell puzzles or accept paid placements. Please do not send personal information
          you do not need to share.
        </p>
      </Prose>
      <HubSchema dates={DATES} type="ContactPage" name="Contact Words at Rest" description={DESCRIPTION} path="/contact" />
    </>
  );
}
