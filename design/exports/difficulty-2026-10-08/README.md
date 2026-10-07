# Remaining difficulty illustrations — 2026-10-08

Scope: one holiday collection sharing background plus 101 missing theme series, each with Easy / Medium / Hard (303 separate difficulty illustrations). Generation mode: builtin imagegen, one call per asset. Easy establishes each series; Medium and Hard reference its master.

Final difficulty assets are saved to `public/images/themes/{slug}-{easy|medium|hard}.webp` (1200×900), plus `-640.webp` (640×480) and `-320.webp` (320×240). The original 20 theme series are excluded from the plan.

Holiday background: `design/og-base/og-holidays.png` (1200×630). Its old placeholder is backed up in `previous-og-holidays.png`. The motif sits at the left, with the right 60% reserved for a title.

This batch is local image delivery. Page wiring and deployment are outside this image request.

- `plan.json`, `prompt-set.md`: full requested difficulty assets and exact prompts.
- `holiday-prompt.md`: exact holiday generation prompt.
- `masters/`: copies of generated source PNGs.
- `receipts/`: source paths, exported dimensions, bytes and SHA-256 checksums.
- `validation.json`: last checked completion count and missing assets.
- `contact-sheets/`: Easy / Medium / Hard comparisons, 12 themes per sheet.
- `batch.cjs`: plan and export tool; refuses to overwrite existing difficulty assets.
- `validate.cjs`: dimension/format validation and contact sheet generation.

Completion means exported files with receipts, not generation requests started. On a service stall, resume from missing assets only.

## Completed delivery

304 artworks delivered: 303 new difficulty images for 101 themes, plus one holiday background. All 121 theme series now exist locally. 909 difficulty WebP exports and both holiday PNG copies passed dimension, format, opacity and SHA-256 validation. Main difficulty exports are unique. All nine contact sheets were reviewed, with four frames corrected and backed up.

Final exact prompts (including corrections): `effective-prompt-set.md`. Full generation receipts: `generation-manifest.json`. Validation: `final-validation.json`.

The holiday background is also available inside the image folder at `public/images/holidays/og-holidays.png`.
