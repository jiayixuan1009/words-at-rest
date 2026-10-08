import Link from "next/link";
import { SITE } from "@/lib/site";
import { ART } from "@/lib/images";
import { Ornament } from "./Picture";
import TrustFacts from "./TrustFacts";
import BrandLockup from "./BrandLockup";

export default function SiteFooter() {
  return (
    <footer className="site-footer mt-auto border-t border-[#d4cbb8]/70">
      <Ornament art={ART.flourish} width={120} className="-mt-5 mb-2" />
      <div className="mx-auto max-w-6xl px-5 pb-2 sm:px-8">
        <TrustFacts className="border-b border-[#d4cbb8]/70 pb-4" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-10 pt-4 text-[1rem] text-[var(--ink-soft)] sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div>
          <BrandLockup />
          <p className="mt-3 max-w-sm leading-relaxed">
            Free word search puzzles for adults — large print, daily and seasonal. No timer, no fuss.
          </p>
          <p className="mt-2 max-w-sm font-sans text-base leading-relaxed">
            Large-print online play plus free printable PDFs for home, libraries and senior centers — no account needed.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 [&_a]:inline-flex [&_a]:min-h-10 [&_a]:items-center">
            <li><Link prefetch={false} href="/daily">Daily</Link></li>
            <li><Link prefetch={false} href="/calendar">Calendar</Link></li>
            <li><Link prefetch={false} href="/printables">Printable PDFs</Link></li>
            <li><Link prefetch={false} href="/difficulty/hard">Hard puzzles</Link></li>
            <li><Link prefetch={false} href="/about">About</Link></li>
            <li><Link prefetch={false} href="/holidays">Holidays</Link></li>
            <li><Link prefetch={false} href="/adults">For adults</Link></li>
            <li><Link prefetch={false} href="/accessibility">Accessibility</Link></li>
            <li><Link prefetch={false} href="/privacy">Privacy</Link></li>
            <li><Link prefetch={false} href="/privacy#analytics">Analytics choices</Link></li>
            <li><Link prefetch={false} href="/terms">Terms</Link></li>
            <li><Link prefetch={false} href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
