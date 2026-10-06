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
