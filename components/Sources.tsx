import type { Citation } from "@/lib/citations";
import type { ThemeSource } from "@/lib/citations";

/** Short, exact quotation with a visible source link (blockquote cite + <cite>). */
export function Quote({ c, className = "" }: { c: Citation; className?: string }) {
  return (
    <figure className={`not-prose my-5 border-l-4 border-[#cbbfa6] pl-4 ${className}`}>
      <blockquote cite={c.url} className="font-serif text-lg italic leading-relaxed text-[var(--ink)]">
        <p>“{c.quote}”</p>
      </blockquote>
      <figcaption className="mt-1 font-sans text-base text-[var(--ink-soft)]">
        — {c.publisher},{" "}
        <cite>
          <a href={c.url} rel="noopener" target="_blank">
            {c.title}
          </a>
        </cite>
      </figcaption>
    </figure>
  );
}

/** One-line theme / page source note: claim + linked citation (not a fake quote). */
export function SourceNote({
  source,
  heading = "Sources",
  className = "",
}: {
  source: ThemeSource;
  heading?: string;
  className?: string;
}) {
  const c = source.citation;
  return (
    <section aria-labelledby="source-note-heading" className={`mt-8 max-w-3xl ${className}`}>
      <h2 id="source-note-heading" className="font-serif text-2xl text-[var(--ink)]">
        {heading}
      </h2>
      <p className="mt-2 text-lg leading-relaxed text-[var(--ink-soft)]">
        {source.claim}{" "}
        <cite>
          <a href={c.url} rel="noopener" target="_blank">
            {c.publisher}: {c.title}
          </a>
        </cite>
        .
      </p>
      <figure className="not-prose mt-4 border-l-4 border-[#cbbfa6] pl-4">
        <blockquote cite={c.url} className="font-serif text-base italic leading-relaxed text-[var(--ink)]">
          <p>“{c.quote}”</p>
        </blockquote>
        <figcaption className="mt-1 font-sans text-base text-[var(--ink-soft)]">
          — {c.publisher}
        </figcaption>
      </figure>
    </section>
  );
}

/** Compact inline cite for puzzle About sections (claim + <cite> link; optional short <q>). */
export function InlineSource({ source }: { source: ThemeSource }) {
  const c = source.citation;
  const line = source.shortClaim ?? source.claim;
  const shortEnough = c.quote.length <= 110;
  return (
    <p className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
      <strong className="font-medium text-stone-800">Source: </strong>
      {line}{" "}
      {shortEnough ? (
        <>
          (<q cite={c.url}>{c.quote}</q>){" "}
        </>
      ) : null}
      <cite>
        <a href={c.url} rel="noopener" target="_blank">
          {c.publisher}: {c.title}
        </a>
      </cite>
      .
    </p>
  );
}

/** Numbered source list for the bottom of a guide page. De-duplicates by URL. */
export default function Sources({ items }: { items: Citation[] }) {
  const seen = new Set<string>();
  const list = items.filter((c) => (seen.has(c.url) ? false : (seen.add(c.url), true)));
  return (
    <section aria-labelledby="sources-heading" className="mt-12 max-w-3xl">
      <h2 id="sources-heading" className="font-serif text-2xl">Sources</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-6 font-sans text-base text-[var(--ink-soft)]">
        {list.map((c) => (
          <li key={c.url}>
            {c.publisher}.{" "}
            <cite>
              <a href={c.url} rel="noopener" target="_blank">
                {c.title}
              </a>
            </cite>
            {c.date ? ` (${c.date.slice(0, 4)})` : ""}.
          </li>
        ))}
      </ol>
    </section>
  );
}
