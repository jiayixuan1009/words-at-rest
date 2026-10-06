# Pending difficulty art (not public)

Holiday Wave 1 Easy/Medium/Hard masters (easter, thanksgiving, valentines, winter)
were moved into `public/images/themes/` on branch `holidays-rebase` when wiring
the launch package. This folder is empty until the next parked set arrives.

Wire checklist (already done for holidays):
1. `git mv design/pending-difficulty/<slug>-*.webp public/images/themes/`
2. `node scripts/derive-images.mjs`
3. Add `<slug>` to `DIFFICULTY_ART_THEMES` + `LEVEL_MOTIF` in `lib/images.ts`
4. `node scripts/check-images.mjs`
