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
    <header className="border-b border-stone-200 bg-[#fbf8f3]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-2xl font-semibold tracking-tight text-stone-900 no-underline">
          {SITE.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-base">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-stone-700 no-underline hover:text-stone-950">
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
