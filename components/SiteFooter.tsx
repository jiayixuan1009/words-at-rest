import Link from "next/link";
import { SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#d4cbb8]/70 bg-[#ebe4d6]/50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 text-sm text-[var(--ink-soft)] sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-serif text-lg text-[var(--ink)]">{SITE.name}</p>
          <p className="mt-1 max-w-sm leading-relaxed">
            Free word search puzzles for adults — large print, daily and seasonal. No timer, no fuss.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/adults">For adults</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
