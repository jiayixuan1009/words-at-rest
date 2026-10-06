import Link from "next/link";
import { SITE } from "@/lib/site";
import { ART } from "@/lib/images";

const NAV = [
  { href: "/daily", label: "Daily" },
  { href: "/themes", label: "Themes" },
  { href: "/large-print", label: "Large Print" },
  { href: "/difficulty/hard", label: "Hard" },
  { href: "/how-to-play", label: "How to Play" },
];

export default function SiteHeader() {
  return (
    <header className="site-header border-b border-[#d4cbb8]/70">
      <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-hidden px-4 py-2.5 sm:gap-6 sm:overflow-visible sm:px-8 sm:py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-[var(--ink)] no-underline sm:gap-3"
          aria-label={`${SITE.name} — home`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ART.headerMark.src}
            width={40}
            height={40}
            alt=""
            className="h-8 w-8 sm:h-10 sm:w-10"
            decoding="async"
          />
          <span className="leading-none">
            <span className="block font-serif text-[1.25rem] font-semibold tracking-tight sm:text-[1.75rem]">
              {SITE.name}
            </span>
            <span className="mt-1 hidden font-sans text-[0.7rem] uppercase tracking-[0.22em] text-[var(--ink-soft)] sm:block">
              Word search, unhurried
            </span>
          </span>
        </Link>
        <nav aria-label="Main" className="min-w-0 flex-1">
          <ul
            className="chip-scroll flex max-w-full flex-nowrap gap-x-4 font-sans text-[0.95rem] sm:flex-wrap sm:justify-end sm:gap-x-5 sm:overflow-visible sm:text-[1rem]"
          >
            {NAV.map((n) => (
              <li key={n.href} className="shrink-0">
                <Link
                  href={n.href}
                  className="nav-link inline-flex min-h-11 items-center text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
