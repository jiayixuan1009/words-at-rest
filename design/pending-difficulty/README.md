# Pending difficulty art (not public)

1200×900 Easy/Medium/Hard masters for themes that only exist on unreleased branches
(`holidays-wave1`): easter, thanksgiving, valentines, winter.

When a theme goes live:
1. `git mv design/pending-difficulty/<slug>-*.webp public/images/themes/`
2. `node scripts/derive-images.mjs` (makes the -640 and -320 variants)
3. Add `<slug>` to `DIFFICULTY_ART_THEMES` and a `LEVEL_MOTIF` entry in `lib/images.ts`
4. `node scripts/check-images.mjs`
