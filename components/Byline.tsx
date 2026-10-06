import Link from "next/link";
import { SITE } from "@/lib/site";
import { formatIsoDate } from "@/lib/seo";
import type { PageDates } from "@/lib/content-dates";

/**
 * Visible author + freshness line. Uses the same dates as the page's JSON-LD
 * (datePublished / dateModified), so what readers see matches the schema.
 */
export default function Byline({
  dates,
  updated,
  className = "mt-3",
}: {
  dates?: PageDates;
  /** @deprecated pass `dates` */
  updated?: string;
  className?: string;
}) {
  const modified = dates?.modified ?? updated ?? SITE.contentUpdated;
  const published = dates?.published;
  const showPublished = published && published.slice(0, 10) !== modified.slice(0, 10);
  return (
    <p className={`${className} font-sans text-base text-[var(--ink-soft)]`}>
      By <Link href={SITE.editor.aboutPath} rel="author">{SITE.editor.name}</Link>
      {showPublished && (
        <>
          <span className="mx-2 text-[#b8a990]">·</span>
          Published <time dateTime={published}>{formatIsoDate(published)}</time>
        </>
      )}
      <span className="mx-2 text-[#b8a990]">·</span>
      Updated <time dateTime={modified}>{formatIsoDate(modified)}</time>
    </p>
  );
}
