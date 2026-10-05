import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/daily", label: "Daily" },
  { href: "/themes", label: "Themes" },
  { href: "/large-print", label: "Large Print" },
  { href: "/difficulty/hard", label: "Hard" },
  { href: "/how-to-play", label: "How to Play" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-[#d4cbb8]/60 bg-[#f4efe6]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-4 px-5 py-5 sm:px-6">
        <Link href="/" className="font-serif text-2xl tracking-tight text-[var(--ink)] no-underline sm:text-[1.65rem]">
          {SITE.name}
          <span className="mt-0.5 block text-xs font-sans font-normal uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Word search, unhurried
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-sans">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]">
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
