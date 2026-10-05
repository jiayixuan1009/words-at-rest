import Link from "next/link";
import { SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-[#fbf8f3]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-stone-600 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-stone-800">{SITE.name}</p>
          <p className="mt-2">{SITE.tagline}</p>
        </div>
        <ul className="space-y-1">
          <li><Link href="/themes">All themes</Link></li>
          <li><Link href="/difficulty/easy">Easy puzzles</Link></li>
          <li><Link href="/difficulty/medium">Medium puzzles</Link></li>
          <li><Link href="/difficulty/hard">Hard puzzles</Link></li>
          <li><Link href="/adults">Word search for adults</Link></li>
        </ul>
        <ul className="space-y-1">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/privacy">Privacy Policy</Link></li>
          <li><Link href="/terms">Terms of Use</Link></li>
        </ul>
      </div>
      <p className="pb-8 text-center text-xs text-stone-500">
        © {new Date().getUTCFullYear()} {SITE.name}. Original puzzles and word lists.
      </p>
    </footer>
  );
}
