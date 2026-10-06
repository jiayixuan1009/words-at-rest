import type { Metadata } from "next";
import { absoluteUrl, ORG_SAME_AS, SITE } from "./site";
import type { Citation } from "./citations";
import type { PageDates } from "./content-dates";

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
/** Stable @id of the editor's Person node (Reggie J). */
export const PERSON_ID = `${SITE.url}/about#reggie-j`;
/** @deprecated alias kept for older imports. */
export const EDITOR_ID = PERSON_ID;

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
      locale: SITE.ogLocale,
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

export type Node = Record<string, unknown>;

/** Compact author reference used on every page-level node. */
export function authorRef(): Node {
  return { "@type": "Person", "@id": PERSON_ID, name: SITE.editor.name, url: absoluteUrl("/about") };
}

export function organizationNode(): Node {
  return {
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
        availableLanguage: [SITE.language],
      },
    ],
    founder: { "@id": PERSON_ID },
    ...(ORG_SAME_AS.length ? { sameAs: ORG_SAME_AS } : {}),
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.tagline,
    inLanguage: SITE.language,
    publisher: { "@id": ORG_ID },
  };
}

export function personNode(): Node {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.editor.name,
    jobTitle: SITE.editor.role,
    url: absoluteUrl("/about"),
    mainEntityOfPage: absoluteUrl("/about"),
    worksFor: { "@id": ORG_ID },
    knowsAbout: ["Word search puzzles", "Large print puzzles", "Puzzle accessibility"],
    ...(SITE.editor.sameAs.length ? { sameAs: SITE.editor.sameAs } : {}),
  };
}

/** Site-wide entity graph (Organization, WebSite, Person) — emitted once per page by the root layout. */
export function siteGraph(): Node {
  return { "@context": "https://schema.org", "@graph": [organizationNode(), websiteNode(), personNode()] };
}

/** @deprecated use siteGraph(); kept for compatibility. */
export function organizationSchema() {
  return { "@context": "https://schema.org", ...organizationNode() };
}

export function citationNodes(citations: Citation[]): Node[] {
  return citations.map((c) => ({
    "@type": "CreativeWork",
    name: c.title,
    url: c.url,
    publisher: { "@type": "Organization", name: c.publisher },
    ...(c.date ? { datePublished: c.date } : {}),
  }));
}

export type PageType = "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" | "ItemPage";

export interface WebPageInput {
  type?: PageType;
  name: string;
  description?: string;
  path: string;
  image?: string;
  dates: PageDates;
  citations?: Citation[];
  /** Extra properties merged into the WebPage node (mainEntity, about, speakable…). */
  extra?: Node;
}

/** Page-level WebPage node: author, publisher, dates, image, optional citations. */
export function webPageNode({ type = "WebPage", name, description, path, image, dates, citations, extra }: WebPageInput): Node {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: SITE.language,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    author: authorRef(),
    datePublished: dates.published,
    dateModified: dates.modified,
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image ?? SITE.ogImage) },
    ...(citations && citations.length ? { citation: citationNodes(citations) } : {}),
    ...(extra ?? {}),
  };
}

/** "October 6, 2026" from an ISO date or date-time (uses the calendar date as written). */
export function formatIsoDate(iso: string): string {
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const PROPER_THEMES = new Set(["Halloween", "Christmas", "Bible"]);
/** Theme name for use mid-sentence: proper nouns keep their capital, others lower-case. */
export function themeNoun(name: string): string {
  return PROPER_THEMES.has(name) ? name : name.toLowerCase();
}
