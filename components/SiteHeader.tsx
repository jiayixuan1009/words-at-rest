import Link from "next/link";
import { SITE } from "@/lib/site";
import BrandLockup from "./BrandLockup";

const NAV = [
  { href: "/daily", label: "Daily" },
  { href: "/themes", label: "Themes" },
  { href: "/large-print", label: "Large Print" },
  { href: "/how-to-play", label: "How to Play" },
];

export default function SiteHeader() {
  return (
    <header className="site-header border-b border-[#d4cbb8]/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 px-4 pt-2.5 sm:flex-nowrap sm:gap-6 sm:px-8 sm:py-4">
        <Link prefetch={false}
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center text-[var(--ink)] no-underline"
          aria-label={`${SITE.name} — Word search, unhurried — home`}
        >
          <BrandLockup tagline />
        </Link>
        {/*
          Mobile (< sm): the nav drops to its own full-width row under the logo and the
          four items are spread edge to edge at 17px, so nothing scrolls or clips at 320–639px
          (if a wide system font ever overflows, the row wraps instead of scrolling).
          "Hard" moved to the footer to make room (Large Print stays up here). Each link keeps
          ≥40px width and 44px height for touch. Desktop (sm+) is a single row, right-aligned;
          the tagline only shows from md so the row also fits at 640px.
        */}
        <nav aria-label="Main" className="w-full min-w-0 sm:w-auto sm:flex-1">
          <ul
            className="flex flex-wrap justify-between gap-x-1 font-sans text-[1.0625rem] sm:justify-end sm:gap-x-4 md:gap-x-6"
          >
            {NAV.map((n) => (
              <li key={n.href} className="shrink-0">
                <Link prefetch={false}
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
