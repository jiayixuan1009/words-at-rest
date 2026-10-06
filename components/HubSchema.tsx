import JsonLd from "./JsonLd";
import { absoluteUrl } from "@/lib/site";
import { type Node, type PageType, webPageNode } from "@/lib/seo";
import { routeDates, type PageDates } from "@/lib/content-dates";
import type { Citation } from "@/lib/citations";

/**
 * Page-level JSON-LD as one @graph: the WebPage node (author → Person @id,
 * publisher → Organization @id, datePublished/dateModified from git history,
 * optional citations) plus any extra nodes for the page (ItemList, HowTo…).
 */
export default function HubSchema({
  name,
  description,
  path,
  type = "WebPage",
  image,
  dates,
  citations,
  extra,
  nodes = [],
  breadcrumb = true,
}: {
  name: string;
  description?: string;
  path: string;
  type?: PageType;
  image?: string;
  dates?: PageDates;
  citations?: Citation[];
  extra?: Node;
  nodes?: Node[];
  breadcrumb?: boolean;
}) {
  const url = absoluteUrl(path);
  const page = webPageNode({
    type,
    name,
    description,
    path,
    image,
    dates: dates ?? routeDates(path),
    citations,
    extra: { ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}), ...(extra ?? {}) },
  });
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [page, ...nodes] }} />;
}
