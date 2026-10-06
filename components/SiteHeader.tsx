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
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-[var(--ink)] no-underline" aria-label={`${SITE.name} — home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ART.headerMark.src} width={40} height={40} alt="" className="h-10 w-10" decoding="async" />
          <span className="leading-none">
            <span className="block font-serif text-[1.6rem] font-semibold tracking-tight sm:text-[1.75rem]">{SITE.name}</span>
            <span className="mt-1 block font-sans text-[0.7rem] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
              Word search, unhurried
            </span>
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-sans text-[1rem]">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="nav-link text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]">
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
