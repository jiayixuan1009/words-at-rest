import { srcSetOf, type Art } from "@/lib/images";

/**
 * Plain <img> with intrinsic width/height (no CLS), srcset for derived variants and
 * lazy loading by default. Pass `priority` for the LCP image (eager + fetchpriority=high).
 */
export default function Picture({
  art,
  sizes = "100vw",
  className,
  priority = false,
  alt,
  decorative = false,
}: {
  art: Art;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Override the default alt from lib/images. */
  alt?: string;
  decorative?: boolean;
}) {
  const srcSet = srcSetOf(art);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={art.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={art.width}
      height={art.height}
      alt={decorative ? "" : (alt ?? art.alt)}
      aria-hidden={decorative || (alt ?? art.alt) === "" ? true : undefined}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
}

/** Decorative ornament (divider rule, flourish, section ornament). Always alt="". */
export function Ornament({ art, width, className = "" }: { art: Art; width: number; className?: string }) {
  const height = Math.round((art.height / art.width) * width);
  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={art.src} width={width} height={height} alt="" loading="lazy" decoding="async" className="max-w-full" style={{ height: "auto" }} />
    </div>
  );
}
