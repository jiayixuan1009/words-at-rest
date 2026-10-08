/**
 * Plain facts row ("trust strip"). Every claim here must stay literally true —
 * re-check the code before editing:
 * - Free: no paywall, no purchases anywhere on the site.
 * - No sign-up: there are no accounts, logins or forms.
 * - No timer: PuzzleGrid has no clock or countdown (Calm Mode).
 * - Printable PDFs: free Letter/A4 packs at /printables (with answer keys).
 * - Saved paths + grid size preference stay in localStorage. Consented analytics
 *   may report found-word counts and game events, never the selected paths.
 * Deliberately NOT claimed: "ad-free" / "ad-light" (AdSense is planned) and
 * "no tracking" (GA4 runs after analytics is accepted).
 */
const ICON = "h-[1.05em] w-[1.05em] shrink-0 text-[var(--moss)]";
const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

export const TRUST_FACTS: { label: string; icon: React.ReactNode }[] = [
  {
    label: "Free",
    // gift tag
    icon: (
      <svg {...svg} className={ICON}>
        <path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.3 7.3a1 1 0 0 1-1.4 0z" />
        <circle cx="8" cy="8" r="1.4" />
      </svg>
    ),
  },
  {
    label: "No sign-up",
    // person with a small "x"
    icon: (
      <svg {...svg} className={ICON}>
        <circle cx="10" cy="8" r="3.5" />
        <path d="M3.5 20c.6-3.6 3.2-5.8 6.5-5.8 1.2 0 2.3.3 3.2.8" />
        <path d="m16.5 15.5 4 4m0-4-4 4" />
      </svg>
    ),
  },
  {
    label: "No timer",
    // clock, struck through
    icon: (
      <svg {...svg} className={ICON}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l2.5 1.5" />
        <path d="m4.5 4.5 15 15" />
      </svg>
    ),
  },
  {
    label: "Printable PDFs",
    // document / page
    icon: (
      <svg {...svg} className={ICON}>
        <path d="M7 3.5h7l3 3V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
        <path d="M14 3.5V7h3" />
        <path d="M9 12h6M9 15h6M9 18h4" />
      </svg>
    ),
  },
  {
    label: "Progress stays on your device",
    // phone with a check
    icon: (
      <svg {...svg} className={ICON}>
        <rect x="6.5" y="2.5" width="11" height="19" rx="2" />
        <path d="m9.5 12 1.8 1.8 3.3-3.6" />
        <path d="M11 18.5h2" />
      </svg>
    ),
  },
];

/**
 * `footer` — centered row above the footer columns (all pages).
 * `compact` — small left-aligned row under the puzzle grid.
 */
export default function TrustFacts({ variant = "footer", className = "" }: { variant?: "footer" | "compact"; className?: string }) {
  const compact = variant === "compact";
  return (
    <ul
      aria-label="About this site"
      className={`flex flex-wrap items-center gap-y-1.5 font-sans text-[var(--ink-soft)] ${
        compact ? "gap-x-4 text-base" : "justify-center gap-x-5 text-base sm:gap-x-7"
      } ${className}`}
    >
      {TRUST_FACTS.map((f) => (
        <li key={f.label} className="inline-flex items-center gap-1.5 whitespace-nowrap">
          {f.icon}
          <span>{f.label}</span>
        </li>
      ))}
    </ul>
  );
}
