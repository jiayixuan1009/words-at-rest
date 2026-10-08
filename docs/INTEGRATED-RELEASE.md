# Integrated SEO release — 2026-10-08

The SEO branch must be merged into master before production deployment. A deployment from the old master removed the printables and discovery features; this integration restores them while retaining the homepage introduction artwork, consented Microsoft Clarity and the global AdSense publisher script.

Before a release, fetch master, merge its latest commits, run predeploy and typecheck, commit the integrated changes, then build. Use that tested commit for both master and the Worker upload. Avoid deploying an old checkout simply because its build passes. Run the production route and JSON-LD scripts after publishing, including actual PDF and ads.txt checks.

The existing master Daily entries are preserved exactly; subsequent queued entries continue through November 7. Generation targets 30 days and validation requires at least seven. This is a content buffer, not a recurring scheduler: top up, review, commit and publish regularly.

ads.txt uses the actual publisher already installed in the global script and Google's documented DIRECT format. No new advertising unit, auto-ad setting or certified advertising CMP is fabricated. AdSense approval, advertising consent configuration and actual impressions/revenue require the account interface. GA4 event delivery/deduplication and GSC indexation likewise require their account data. Clarity retains its existing analytics consent and withdrawal behavior.

The new Bible names change titles only; grids, puzzle IDs, seeds and progress remain stable. Topic FAQs describe existing words, difficulty and available printable packs. Shared Picture uses a 1px mobile source only for explicitly desktop-only artwork. Calendar month dates track published puzzles in that month plus genuine template changes.
