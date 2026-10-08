# Daily puzzles — schedule, calendar, and routine

## How the schedule works

- **Timezone:** All daily dates use **UTC**. A new puzzle unlocks at **00:00 UTC** (08:00 Asia/Shanghai). Every visitor worldwide sees the same dated puzzle.
- **Launch day:** `2026-10-06` is frozen in `data/daily-launch.json` (`animals-hard-01` / Hard Animals Word Search), independent of catalog changes. It is not part of the generated schedule.
- **From `2026-10-07`:** Committed entries in `data/daily.json` (grid, words, placements, seed). Generated ahead of time so midnight UTC does **not** need a deploy.
- **10 puzzles per UTC day (from top-up onward):** Each date targets **10** schedule rows.
  - **Slot 1 / featured** — what `/daily`, the homepage embed, and the calendar “today” highlight play. Legacy rows may still use id `daily-YYYY-MM-DD`.
  - **Slots 2–10 / Also today** — listed on `/daily` and `/daily/YYYY-MM-DD`; each links to its theme puzzle URL (`/themes/{themeId}/{slug}`).
  - **Also theme catalog:** New entries (non-legacy) use id/slug `{theme}-{difficulty}-{nn}` and are written under `data/puzzles/` so theme hubs include them. Progress keys match whether you open from Daily or Themes.
  - **Past dates** already published with a single puzzle stay at 1 (grids never rewritten). `daily:add` tops up **today + future** to 10 without changing existing featured grids.
- **Never large print.** Daily puzzles use normal easy / medium / hard sizes (10×10 / 12×12 / 15×15).
- **Featured difficulty (UTC weekday, slot 1):**
  - Sunday, Monday, Wednesday → **easy**
  - Tuesday, Thursday, Friday → **medium**
  - Saturday → **hard**
- **Sibling difficulty (slots 2–10):** Cycles easy → medium → hard by slot index.
- **Theme rotation:** Live topical themes only (excludes `hard-pack` and `large-print-pack`). Prefer Halloween in October, Fall in Sep–Nov, Christmas in December. Featured themes do not repeat within the previous **5** days; themes within one date are unique (siblings also avoid recent/upcoming featured themes when generating). Word-set Jaccard overlap with any same-theme catalog or daily puzzle must stay **&lt; 70%**; grids must be unique.
- **Buffer:** `npm run daily:add` targets **30** future days (required minimum **7**) beyond today UTC, with **10** puzzles each. Running it twice is a no-op when the buffer is full.
- **Future leakage:** `/daily/YYYY-MM-DD` for dates **after** today UTC returns **404** and never appears in the sitemap, calendar, or `llms.txt`. `/daily/calendar` is not a date (fails `YYYY-MM-DD`) and 404s — the real calendar is **`/calendar`**.

## URLs

| Path | Purpose |
|------|---------|
| `/daily` | Today’s featured puzzle + “Also today” list |
| `/daily/YYYY-MM-DD` | Dated archive (≤ today UTC); featured + siblings |
| `/themes/{theme}/{slug}` | Same grid when the daily entry is a catalog puzzle |
| `/calendar` | Current month + “What’s new” log (featured only) |
| `/calendar/YYYY-MM` | Specific month (from `2026-10` through current month) |

## Publication safety

Launch day is frozen in `data/daily-launch.json` (original `animals-hard-01` ID, grid and progress key), independent of the catalog. There is no hash fallback. A missing date is **unpublished**: the dated URL returns 404, calendar/sitemap do not link it, and `/daily` and the homepage explain that today's puzzle is not ready. Do not replace an already public entry (featured grid) or the frozen launch snapshot. Adding sibling slots with new catalog ids is OK. `npm run deploy` runs the buffer check and regression tests first.

## Daily routine (operator)

Run this once per day (or whenever the buffer may have slipped). From the repo root on the deploy machine:

```bash
git pull origin master
npm run daily:add
npm run daily:check
npm run typecheck
npm run build
# Append one CHANGELOG line per newly added date (see “Changelog” below), then:
git add data/daily.json data/puzzles/ CHANGELOG.md
git status   # schedule + new catalog JSON + registry + changelog
git commit -m "daily: add YYYY-MM-DD (10/day)"
# replace YYYY-MM-DD with the newest date that was added (or the horizon date)
git push origin master
CLOUDFLARE_ACCOUNT_ID=b79c11a97188ceeb150acb0b6c4cda97 npm run deploy
```

Then verify:

1. https://wordsatrest.com/daily — today’s title matches the schedule (or frozen launch snapshot on 2026-10-06).
2. https://wordsatrest.com/calendar — today is linked; tomorrow is greyed.
3. Tomorrow’s URL (`/daily/YYYY-MM-DD` for a future day) returns **404** until that UTC day.
4. Optional: `DAILY_TODAY=YYYY-MM-DD npm run daily:check` to simulate another “today”.

**Do not commit** `tsconfig.tsbuildinfo`.

## If a day was missed

1. Set `DAILY_TODAY` to the **real** current UTC date (or leave unset).
2. Run `npm run daily:add` — it backfills every missing date from `2026-10-07` through today+30.
3. Run `npm run daily:check`. If it fails (overlap / placement), inspect the error, delete the bad entry from `data/daily.json` if needed, and re-run `daily:add` (seeds retry automatically).
4. Commit, push, deploy as above.

Past dates that were already public must **not** be regenerated with a different grid — only fill **missing** dates or **missing slots**. `daily:add` never overwrites an existing entry.

## Local QA overrides

```bash
DAILY_TODAY=2026-10-07 npm run daily:check
DAILY_TODAY=2026-10-07 npm run build && npx vite preview --port 4191
node scripts/test-daily.mjs
```

`DAILY_TODAY` is inlined at **build** time via `vite.config.ts` `define` (Cloudflare Workers do not inherit your shell env). The add/check scripts and `node scripts/test-daily.mjs` read it from the process env directly. Never set `DAILY_TODAY` on a production deploy.

## Changelog

Standing rule: every code change gets a `CHANGELOG.md` entry. Daily schedule tops-ups are **content**, not feature work — still log them, briefly:

1. Under `[未发布 Unreleased]` (or the current master date section once this branch is merged), keep or open a **Daily puzzles** bullet group.
2. For **each newly topped-up date** from `npm run daily:add`, append a short line, e.g.  
   `- 2026-10-14 — 10 puzzles (featured: Garden / easy; +9 catalog siblings).`
3. Do **not** skip the changelog on “data-only” commits: the date, title, theme and difficulty are what readers need. Feature changes to the calendar/scripts keep their own fuller bullets (like the `daily-calendar` entry).

Idempotent re-runs that add nothing → no new changelog lines.

## Related files

- `data/daily.json` — schedule
- `lib/daily.ts` — helpers (difficulty, theme ranking, overlap)
- `lib/data.ts` — `getDailyPuzzle` (featured), `getDailyPuzzles`, archive, validity
- `scripts/add-daily.ts` / `scripts/check-daily.ts`
- `app/calendar/` — calendar UI
