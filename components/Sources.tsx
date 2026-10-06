import type { Citation } from "@/lib/citations";

/** Short, exact quotation with a visible source link (blockquote cite + <cite>). */
export function Quote({ c, className = "" }: { c: Citation; className?: string }) {
  return (
    <figure className={`not-prose my-5 border-l-4 border-[#cbbfa6] pl-4 ${className}`}>
      <blockquote cite={c.url} className="font-serif text-lg italic leading-relaxed text-[var(--ink)]">
        <p>“{c.quote}”</p>
      </blockquote>
      <figcaption className="mt-1 font-sans text-sm text-[var(--ink-soft)]">
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
