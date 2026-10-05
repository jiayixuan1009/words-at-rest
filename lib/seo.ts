import type { Metadata } from "next";
import { absoluteUrl, SITE } from "./site";

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const EDITOR_ID = `${SITE.url}/about#editor`;

const TEMPLATE_SUFFIX = ` | ${SITE.name}`;

export interface SeoInput {
  /** Page title WITHOUT the " | Words at Rest" suffix (template adds it). */
  title: string;
  description: string;
  path: string;
  /** Social card path under /public (1200×630). Defaults to SITE.ogImage. */
  image?: string;
  imageAlt?: string;
  /** Set when the title already contains the brand (skips template). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
}

/**
 * Full per-page metadata: title, description, canonical, Open Graph and a
 * summary_large_image Twitter card — every page gets an og:image.
 */
export function seo({ title, description, path, image, imageAlt, absoluteTitle, type = "website", noindex }: SeoInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title}${TEMPLATE_SUFFIX}`;
  const img = { url: absoluteUrl(image ?? SITE.ogImage), width: 1200, height: 630, alt: imageAlt ?? fullTitle };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE.name,
      locale: "en_US",
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      images: [img],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [img.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Trim to ≤max chars on a word boundary. */
export function clamp(text: string, max = 158): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/[\s,;:—-]+\S*$/, "") + "…";
}

/** Human list: "a, b and c". */
export function humanList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: absoluteUrl(SITE.logo), width: 512, height: 512 },
    image: absoluteUrl(SITE.ogImage),
    description: SITE.tagline,
    email: SITE.contactEmail,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.contactEmail,
        availableLanguage: ["en"],
      },
    ],
    founder: { "@id": EDITOR_ID },
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

export function editorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": EDITOR_ID,
    name: SITE.editor.name,
    jobTitle: SITE.editor.role,
    url: absoluteUrl(SITE.editor.aboutPath),
    worksFor: { "@id": ORG_ID },
    knowsAbout: ["Word search puzzles", "Large print puzzles", "Puzzle accessibility"],
  };
}

export function formatIsoDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const PROPER_THEMES = new Set(["Halloween", "Christmas"]);
/** Theme name for use mid-sentence: proper nouns keep their capital, others lower-case. */
export function themeNoun(name: string): string {
  return PROPER_THEMES.has(name) ? name : name.toLowerCase();
}
