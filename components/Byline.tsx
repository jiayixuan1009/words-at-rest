import Link from "next/link";
import { SITE } from "@/lib/site";
import { formatIsoDate } from "@/lib/seo";

/** Visible author + freshness line for content hubs. */
export default function Byline({ updated = SITE.contentUpdated }: { updated?: string }) {
  return (
    <p className="mt-3 font-sans text-sm text-[var(--ink-soft)]">
      By <Link href={SITE.editor.aboutPath} rel="author">{SITE.editor.name}</Link>
      <span className="mx-2 text-[#b8a990]">·</span>
      Updated <time dateTime={updated}>{formatIsoDate(updated)}</time>
    </p>
  );
}
