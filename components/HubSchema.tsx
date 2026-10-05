import JsonLd from "./JsonLd";
import { absoluteUrl, SITE } from "@/lib/site";
import { EDITOR_ID, ORG_ID, WEBSITE_ID } from "@/lib/seo";

/** WebPage JSON-LD for content hubs: author, publisher, dates, optional Speakable. */
export default function HubSchema({
  name,
  description,
  path,
  type = "WebPage",
  image,
  speakable,
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  image?: string;
  speakable?: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${absoluteUrl(path)}#webpage`,
        name,
        description,
        url: absoluteUrl(path),
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, name: SITE.name, url: SITE.url },
        publisher: { "@id": ORG_ID },
        author: { "@type": "Person", "@id": EDITOR_ID, name: SITE.editor.name },
        datePublished: SITE.dailyStart,
        dateModified: SITE.contentUpdated,
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image ?? SITE.ogImage) },
        ...(speakable ? { speakable: { "@type": "SpeakableSpecification", cssSelector: speakable } } : {}),
      }}
    />
  );
}
