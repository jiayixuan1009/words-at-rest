# Calm puzzle feedback

Implemented on 2026-10-07 (Asia/Shanghai). Applies to all pages using PuzzleGrid, including catalog, large-print and Daily puzzles.

- Selected cells form a warm band with defined endpoints. Arming the first letter by pointer or keyboard adds a single 180ms ring.
- A newly found word lights along the actual selected path (260ms opacity animation, up to 80ms stagger). The word-list strike unfolds in 200ms; the count pulses in 220ms and progress advances in 220ms.
- An unmatched selection fades out in 180ms with a gentle text message. A previously found word does not score or replay success feedback.
- Completing a new game adds a single 580ms border glow and a 500ms completion-card entrance. The card and next-puzzle action sit beside/below the word list at every breakpoint.
- Letters and cell geometry do not animate. Overlays ignore pointer input. Independent short-lived feedback records allow consecutive finds, including crossing words; input is never locked. Reset and unmount clear timers.
- Restored progress receives stable found colors, strike marks, progress and completion state without replaying animations. Reduced-motion CSS disables the animation and transition properties while retaining static visual and accessible text states. Printed output omits feedback decorations.
- No particles, sounds, dependencies or extra analytics events were added.

Validation: typecheck, production build, existing game and Daily tests passed (46 catalog puzzles, 7 Daily puzzles, 691 legal occurrences). In-browser checks covered a keyboard 10/10 game, simultaneous feedback, actual alternate BAT path, stable keyboard focus, duplicate/miss handling, restored 10/10 without feedback records or progress transitions, next puzzle, pointer selection, reset cleanup, 320px Larger without horizontal overflow, and no console errors. The compiled reduced-motion overrides were inspected; separate OS preference and screen-reader testing have not been performed.

The prior SEO review remains separate work: Daily replenishment, Bible title updates, printable resources, hidden-image loading, GSC/GA account verification and other SEO findings are not part of this motion release.

Before release, integrated master `532fd09` (Wave G: 102 themes / 605 catalog puzzles). Both sides of the CHANGELOG were retained. Typecheck, the real Daily tests, all 7,594 legal occurrences across the expanded catalog plus 7 Daily puzzles, and the full production build passed again. The gameplay component and CSS had no upstream conflicts.

## Production release

[PR #2](https://github.com/jiayixuan1009/words-at-rest/pull/2) merged as `9ecd5c3`, including the latest Wave JK catalog (121 themes / 1,043 puzzles). Final master passed typecheck, Daily checks, all 12,932 legal occurrences and production build before deployment. Released at 2026-10-07 02:36 Asia/Shanghai to https://wordsatrest.com; Worker version `ef2aeba3-961d-46cf-a60f-359c857e89d1` serves 100% of traffic. Prior version `19995dd6-b720-4ef6-b47b-5ce591aed4dc` is recorded for rollback. Worker startup was 53ms, not a measurement of page LCP.

Production verification passed 16-page JSON-LD and HTTP metadata/404/noindex/robots/sitemap checks. The browser restored existing 10/10 progress with the new card, then completed a fresh game using pointer plus keyboard to 10/10 with the alternate BAT path, live progress and completion action. Local browser checks provided transient animation, concurrency, reset, restore and 320px evidence; production browser automation was slow, so selections were verified in smaller batches. Screenshot: workspace `research/release-motion-2026-10-07/production-complete.png`.
