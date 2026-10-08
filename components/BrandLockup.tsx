import { ART } from "@/lib/images";

/** Keep the symbol separate from the live, readable wordmark at every size. */
export default function BrandLockup({ tagline = false }: { tagline?: boolean }) {
  return (
    <span className="brand-lockup">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ART.headerMark.src}
        width={96}
        height={96}
        alt=""
        aria-hidden="true"
        className="brand-symbol"
        decoding="async"
      />
      <span className="brand-copy">
        <span className="brand-name">Words <span className="brand-at">at</span> Rest</span>
        {tagline && <span className="brand-tagline">Word search, unhurried</span>}
      </span>
    </span>
  );
}
