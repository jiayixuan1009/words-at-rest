# SEO growth changes — 2026-10-08

Started from production master `376024a`, then integrated `1261112` (all 121 themes' difficulty art) without dropping either changelog. Implemented in `fix/seo-growth`.

## Delivered

- Six distinct homepage recommendations chosen by UTC month, including large print and easy/medium/hard puzzles.
- Theme search, seasonal/anytime/pack filters, accessible result counts and clearing. All 121 links are rendered on the server; filters create no new URL variants.
- Four printable landing pages plus a printable hub. Each pack provides Letter and A4 PDFs, two puzzle sheets, two answer keys and both puzzle previews. The same eight catalog puzzles remain playable online.
- Eight PDFs / 32 pages visually reviewed after rendering. Grids use 24pt letters, word lists 18pt, and answers follow actual catalog placements. PDFs are marked binary in Git to preserve cross-reference offsets on Windows checkouts.
- Both PDF paper sizes declare their corresponding HTML landing page as canonical through the HTTP Link header.
- Printable links from homepage, footer, large-print, matching theme pages and the eight source puzzle pages. Download analytics uses the existing opt-in consent path.
- Renamed three duplicate puzzle titles, with matching generator specifications. IDs, seeds, grids, placements and progress keys are unchanged. All 1,043 catalog titles are now unique.
- Daily generation targets 30 future UTC days and retains the seven-day minimum validation. 23 entries added through 2026-11-06; the previous eight entries and frozen launch remain unchanged. Future dated URLs still return 404.
- Sitemap contains printable pages, retains the complete published Daily archive, and uses actual content modification dates instead of a single constant. New printable publication dates come from their own first commit.
- Analytics notice is rendered during SSR for new visitors, with saved choices hidden by the head script before paint. Returning rejected visitors load no Google analytics tag.
- Theme and puzzle cards stop bulk automatic page prefetching; ordinary link navigation remains available.
- Advertising copy accurately describes a planned integration. No ad script, invented publisher ID or placeholder ads.txt was published.

## Validation

- TypeScript and production build passed.
- 14 tests passed, including all catalog/daily legal word occurrences (13,243), pagination, consent, monthly recommendations, combined filters, title uniqueness and printable assets.
- HTTP checks passed: SSR head metadata, canonical, robots, sitemap, future/malformed-date 404/noindex, five printable pages, eight PDFs with application/pdf and PDF signatures, unknown-pack 404.
- 21-page JSON-LD checks passed, including every printable landing page.
- Browser checks: search "garden" gives Garden and Gardening Tools; adding Seasonal gives no results; Clear returns all 121 themes. PDF previews load; matching online links and both download formats are present. A rejected choice survives reload without a Google tag.
- The existing Daily entries and renamed-puzzle grids were compared directly with origin/master and are identical apart from the intended titles.

## Performance evidence and limits

Lighthouse 13.5.0, default mobile simulation, fresh profiles. These are single-run lab measurements, not field CWV or ranking guarantees.

| Existing production page | Performance | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: |
| Homepage | 92 | 1.4s | 0.167 | 0ms |
| Themes | 92 | 1.6s | 0.167 | 0ms |
| Halloween hard puzzle | 87 | 3.2s | 0 | 70ms |

The layout shift report identified main content moving after the analytics notice appeared. After the SSR/head-script fix, local production-preview Lighthouse measured CLS **0** on both homepage and Themes. Local preview responses are uncompressed; their simulated LCP (6.8s homepage, 3.2s Themes) must not be compared with compressed Cloudflare production as a speed regression or improvement. The old pre-fix local Themes run measured 7.8s LCP / 0.167 CLS.

The final card-prefetch adjustment requires a fresh production benchmark after release. The observed live puzzle LCP 3.2s remains a performance follow-up; this change does not claim all pages meet field CWV thresholds. INP requires real interaction/field data and is not equivalent to Lighthouse TBT.

Raw lab reports and rendered-page QA are retained in local ignored `tmp/pdfs/`. No account traffic, search positions, revenue or RPM was invented.

## Still requires account access

- AdSense approval, real publisher ID/unit IDs, certified advertising CMP and actual serving validation. ads.txt is highly recommended, not universally mandatory. Ads on game pages should follow Google's recommendation to remain at least 150px from gameplay.
- GSC sitemap acceptance, selected canonical/indexation and query/page performance baselines.
- GA4 DebugView/event arrival and reporting configuration. Opt-in users are only part of the audience; download tracking records a click, not confirmation that a person printed a PDF.
- Contact inbox delivery and any external resource outreach. No emails or outreach messages were sent.

## Maintenance

Run `npm run daily:add` and `npm run daily:check` regularly, then commit and deploy added entries. The new target provides a longer buffer but does not create a recurring job. Scripts preserve previously scheduled puzzles. Regenerate printables with `scripts/generate-printables.py` using reportlab/pypdf/pypdfium2/Pillow; review rendered pages before replacing PDFs.

After deployment, rerun `node scripts/check-routes.mjs https://wordsatrest.com` and `node scripts/check-jsonld.mjs https://wordsatrest.com`, benchmark mobile production again, and verify the new printable URLs in GSC. Increasing URL counts or downloads does not itself establish SEO or revenue success.
