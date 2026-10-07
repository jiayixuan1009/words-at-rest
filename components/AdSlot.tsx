import { ART } from "@/lib/images";

/**
 * AdSense placeholder. Reserves space (avoids layout shift) but loads NO ad script.
 * After AdSense approval: render <ins class="adsbygoogle" data-ad-client={ADSENSE_CLIENT}
 * data-ad-slot={slot}> here and integrate a Google-certified advertising CMP where required.
 * This component is not an advertising integration. Keep game ads at least 150px from play controls.
 * Rules: never overlay the grid, never interrupt selection, no fake "Play" buttons.
 */
export default function AdSlot({ slot, label = "Advertisement" }: { slot: string; label?: string }) {
  if (process.env.NODE_ENV === "production" && !process.env.SHOW_AD_PLACEHOLDERS) {
    // Space stays reserved; until ads are enabled it shows a quiet painted rule (decorative).
    return (
      <div data-ad-slot={slot} aria-hidden="true" className="no-print my-8 flex min-h-[90px] items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ART.adSpacer.src} width={364} height={20} alt="" loading="lazy" decoding="async" className="max-w-full opacity-70" style={{ height: "auto" }} />
      </div>
    );
  }
  return (
    <div
      data-ad-slot={slot}
      aria-hidden="true"
      className="my-8 flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-stone-300 text-xs uppercase tracking-wide text-stone-400"
    >
      {label} placeholder · {slot}
    </div>
  );
}
