/**
 * AdSense placeholder. Reserves space (avoids layout shift) but loads NO ad script.
 * After AdSense approval: render <ins class="adsbygoogle" data-ad-client={ADSENSE_CLIENT}
 * data-ad-slot={slot}> here, lazy-load the script, and honour Consent Mode v2 for EEA/UK.
 * Rules: never overlay the grid, never interrupt selection, no fake "Play" buttons.
 */
export default function AdSlot({ slot, label = "Advertisement" }: { slot: string; label?: string }) {
  if (process.env.NODE_ENV === "production" && !process.env.SHOW_AD_PLACEHOLDERS) {
    // Keep space reserved but invisible in production until ads are enabled.
    return <div data-ad-slot={slot} aria-hidden="true" className="my-8 min-h-[90px]" />;
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
