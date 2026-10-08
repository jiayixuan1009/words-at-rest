import { srcSetOf, type Art } from "@/lib/images";

/**
 * Plain <img> with intrinsic width/height (no CLS), srcset for derived variants and
 * lazy loading by default. Pass `priority` for the LCP image (eager + fetchpriority=high).
 *
 * Priority images are wrapped in a layout-neutral <picture> (display: contents). React
 * emits a <link rel=preload> for every eager <img> outside a <picture> — both in the HTML
 * and in RSC payloads — so without the wrapper, prefetching a link (e.g. the "Hard" nav
 * item) made phones download that page's hero image too. The image itself is still in
 * the initial HTML with fetchpriority=high, so the browser finds it just as early.
 *
 * Lazy images that are display:none on phones (e.g. `hidden sm:block`) are never fetched
 * there, which is how decorative art is skipped on mobile without hiding any text.
 */
export default function Picture({
  art,
  sizes = "100vw",
  className,
  priority = false,
  desktopOnly = false,
  alt,
  decorative = false,
}: {
  art: Art;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** CSS-hidden below sm: use a tiny source so eager desktop art does not download on phones. */
  desktopOnly?: boolean;
  /** Override the default alt from lib/images. */
  alt?: string;
  decorative?: boolean;
}) {
  const srcSet = srcSetOf(art);
  const img = (
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
  return priority || desktopOnly ? (
    <picture style={{ display: "contents" }}>
      {desktopOnly && <source media="(max-width: 639px)" srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />}
      {img}
    </picture>
  ) : img;
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
