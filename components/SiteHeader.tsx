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
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 px-4 pt-2.5 sm:flex-nowrap sm:gap-6 sm:px-8 sm:py-4">
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
        {/*
          Mobile (< sm): the nav drops to its own full-width row under the logo and the
          five items are spread edge to edge, so nothing scrolls or clips at 320–639px
          (font scales 13px at 320px → 15.2px at 380px+). Each link keeps ≥40px width and 44px height
          for touch. Desktop (sm+) is the original single row, right-aligned.
        */}
        <nav aria-label="Main" className="w-full min-w-0 sm:w-auto sm:flex-1">
          <ul
            className="flex flex-nowrap justify-between gap-x-0.5 font-sans text-[clamp(0.8125rem,4vw,0.95rem)] sm:flex-wrap sm:justify-end sm:gap-x-5 sm:text-[1rem]"
          >
            {NAV.map((n) => (
              <li key={n.href} className="shrink-0">
                <Link
                  href={n.href}
                  className="nav-link inline-flex min-h-11 min-w-10 items-center justify-center whitespace-nowrap text-[var(--ink-soft)] sm:min-w-0 sm:justify-start no-underline hover:text-[var(--ink)]"
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
