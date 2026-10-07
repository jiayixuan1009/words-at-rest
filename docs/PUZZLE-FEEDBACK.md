# Calm puzzle feedback

## Stronger feedback update — 2026-10-07 (released)

The current implementation supersedes the initial motion timings below. Every PuzzleGrid now draws continuous rounded bands through measured cell centres: a warm live selection preview, then one of four soft persistent answer colors. The selected path is retained even for an alternate occurrence or reverse endpoint order. An SVG layer ignores pointer input and leaves the stable, server-rendered letters above it. ResizeObserver keeps it aligned when the board, text size or breakpoint changes; the original cell backgrounds remain as a pre-hydration/no-JS fallback.

New answers receive a 550ms path sweep, a 1100ms visual success message above the board, a 350ms count/progress/strike update and a persistent word-list check. Remaining words stay visible. The existing single polite live region supplies accessible feedback; decorative success messages do not create duplicate live announcements.

Fresh completion receives a 900ms edge glow, twelve small leaf-shaped particles (950ms with up to 88ms stagger), a 650ms card entrance, the total found and the next puzzle's name. Particles stay within the board wrapper and never block interaction. Feedback expires at 1100ms. Reset/unmount clear all feedback timers; unmount also disconnects the resize observer. Restored and duplicate answers never replay success or celebration.

Reduced-motion CSS hides sweeps and particles and disables success/count/list/card/glow animations and progress transitions; persistent bands, checks, count and success text remain. Print hides SVG and animated decoration while preserving found-cell backgrounds. No sounds, dependencies or new analytics events were added.

Integrated upstream `01e3bf8`: kept the twenty expanded theme hubs and canonical eight-entry Daily schedule through October 14. Typecheck/build and seven game test groups plus Daily tests passed (1,043 catalog + eight Daily puzzles; 12,943 legal occurrences). Browser checks verified pointer alternate BAT, a keyboard 10/10 game, nine simultaneous sweeps and twelve completion particles, one live region, endpoint focus retained, restored 10/10 without replay, duplicate/Reset cleanup, 320px Larger without overflow, reverse diagonal CAULDRON with a running sweep, and pointer-drag LANTERN. OS reduced-motion and screen-reader tests have not been performed.

[PR #3](https://github.com/jiayixuan1009/words-at-rest/pull/3) merged as `44bf5f1`. GitHub's canonical source tree matched the tested local tree; the canonical merge was rebuilt before release. Deployed at 2026-10-07 10:56 Asia/Shanghai, Worker version `0d471ad6-5d65-4b34-8ca5-75584265ac23` serves 100% of production traffic. Rollback point: `c97af9aa-6df3-46da-94e1-07d6f8caebfd`. Worker startup 16ms is not page LCP.

Production passed 16-page JSON-LD and HTTP metadata/canonical/404/noindex/robots/sitemap checks. The browser restored prior 10/10 with ten bands and no transient feedback, then reset and completed a fresh 10/10 using pointer BAT plus nine keyboard selections. All paths, checks, totals and the new completion card were present. The next-puzzle link navigated to Halloween: Quiet Porch with independent 0/10 progress. Production automation latency prevented reliable capture of transient animation frames; those were verified locally. Saved screenshot: `research/release-strong-feedback-2026-10-07/production-complete.png` in the workspace.

Evidence: workspace `research/release-strong-feedback-2026-10-07/`. Prior production history below is retained as historical release evidence.

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
