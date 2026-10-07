import Link from "next/link";
import { listPagePath, paginationWindow } from "@/lib/pagination";

/**
 * Crawlable numbered pagination for catalog hubs.
 * Large tap targets and plain Previous/Next labels suit large-print / senior UX.
 * Page 1 uses the bare base path (no /page/1) so canonicals stay clean.
 */
export default function Pagination({
  basePath,
  page,
  totalPages,
  total,
  from,
  to,
  label,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  /** Short name for aria, e.g. "easy puzzles". */
  label: string;
}) {
  if (totalPages <= 1 || total === 0) {
    return (
      <p className="mt-6 font-sans text-base text-[var(--ink-soft)]" aria-live="polite">
        {total === 0 ? `No ${label} yet.` : `Showing all ${total} ${label}.`}
      </p>
    );
  }

  const pages = paginationWindow(page, totalPages, 1);
  const prevHref = page > 1 ? listPagePath(basePath, page - 1) : null;
  const nextHref = page < totalPages ? listPagePath(basePath, page + 1) : null;

  return (
    <nav className="mt-8 border-t border-[#d4cbb8] pt-6" aria-label={`${label} pages`}>
      <p className="font-sans text-base text-[var(--ink-soft)]" aria-live="polite">
        Showing <span className="font-semibold text-[var(--ink)]">{from}–{to}</span> of{" "}
        <span className="font-semibold text-[var(--ink)]">{total}</span> {label}
        <span className="mx-2 text-stone-400" aria-hidden="true">
          ·
        </span>
        Page {page} of {totalPages}
      </p>
      <ul className="mt-4 flex flex-wrap items-center gap-2">
        <li>
          {prevHref ? (
            <Link
              href={prevHref}
              rel="prev"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] border border-[#d4cbb8] bg-[#faf6ee] px-4 py-2 font-sans text-base text-[var(--ink)] no-underline hover:border-[var(--accent)]"
            >
              Previous
            </Link>
          ) : (
            <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] border border-transparent px-4 py-2 font-sans text-base text-stone-400">
              Previous
            </span>
          )}
        </li>
        {pages.map((p, i) =>
          p == null ? (
            <li key={`gap-${i}`} className="px-1 font-sans text-base text-stone-400" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              {p === page ? (
                <span
                  aria-current="page"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] border border-[var(--accent)] bg-[#efe7d9] px-3 py-2 font-sans text-base font-semibold text-[var(--ink)]"
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={listPagePath(basePath, p)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] border border-[#d4cbb8] bg-[#faf6ee] px-3 py-2 font-sans text-base text-[var(--ink)] no-underline hover:border-[var(--accent)]"
                >
                  {p}
                </Link>
              )}
            </li>
          ),
        )}
        <li>
          {nextHref ? (
            <Link
              href={nextHref}
              rel="next"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] border border-[#d4cbb8] bg-[#faf6ee] px-4 py-2 font-sans text-base text-[var(--ink)] no-underline hover:border-[var(--accent)]"
            >
              Next
            </Link>
          ) : (
            <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] border border-transparent px-4 py-2 font-sans text-base text-stone-400">
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
