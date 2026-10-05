import Link from "next/link";
import { IMAGES } from "@/lib/images";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-8 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMAGES.empty}
        alt=""
        className="mx-auto mb-8 aspect-[16/10] w-full max-w-md rounded-sm object-cover opacity-90"
      />
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="mt-4 text-lg text-[var(--ink-soft)]">That puzzle seems to have wandered off the page.</p>
      <p className="mt-8 text-lg">
        <Link href="/daily">Play today&apos;s puzzle</Link>
        <span className="mx-3 text-[#d4cbb8]">·</span>
        <Link href="/themes">Browse themes</Link>
      </p>
    </div>
  );
}
