# Daily puzzles — schedule, calendar, and routine

## How the schedule works

- **Timezone:** All daily dates use **UTC**. A new puzzle unlocks at **00:00 UTC** (08:00 Asia/Shanghai). Every visitor worldwide sees the same dated puzzle.
- **Launch day:** `2026-10-06` is **not** in `data/daily.json`. `getDailyPuzzle("2026-10-06")` still uses the original hash pick over the non-large-print catalog so the already-live page never changes.
- **From `2026-10-07`:** Each day has a **unique** committed entry in `data/daily.json` (grid, words, placements, seed). Entries are generated ahead of time so midnight UTC does **not** need a deploy.
- **Never large print.** Daily puzzles use normal easy / medium / hard sizes (10×10 / 12×12 / 15×15).
- **Difficulty (UTC weekday):**
  - Sunday, Monday, Wednesday → **easy**
  - Tuesday, Thursday, Friday → **medium**
  - Saturday → **hard**
- **Theme rotation:** Live topical themes only (excludes `hard-pack` and `large-print-pack`). Prefer Halloween in October, Fall in Sep–Nov, Christmas in December. Do not repeat the same theme within the previous **5** days. Word-set Jaccard overlap with any same-theme catalog or daily puzzle must stay **&lt; 70%**; grids must be unique.
- **Buffer:** `npm run daily:add` keeps **7** future days beyond today UTC queued. Running it twice is a no-op when the buffer is full.
- **Future leakage:** `/daily/YYYY-MM-DD` for dates **after** today UTC returns **404** and never appears in the sitemap, calendar, or `llms.txt`. `/daily/calendar` is not a date (fails `YYYY-MM-DD`) and 404s — the real calendar is **`/calendar`**.

## URLs

| Path | Purpose |
|------|---------|
| `/daily` | Today’s puzzle |
| `/daily/YYYY-MM-DD` | Dated archive (≤ today UTC) |
| `/calendar` | Current month + “What’s new” log |
| `/calendar/YYYY-MM` | Specific month (from `2026-10` through current month) |

## Daily routine (operator)

Run this once per day (or whenever the buffer may have slipped). From the repo root on the deploy machine:

```bash
git pull origin master
npm run daily:add
npm run daily:check
npm run typecheck
npm run build
git add data/daily.json
git status   # confirm only the schedule (and nothing unexpected)
git commit -m "daily: add YYYY-MM-DD"
# replace YYYY-MM-DD with the newest date that was added (or the horizon date)
git push origin master
CLOUDFLARE_ACCOUNT_ID=b79c11a97188ceeb150acb0b6c4cda97 npm run deploy
```

Then verify:

1. https://wordsatrest.com/daily — today’s title matches the schedule (or launch hash pick on 2026-10-06).
2. https://wordsatrest.com/calendar — today is linked; tomorrow is greyed.
3. Tomorrow’s URL (`/daily/YYYY-MM-DD` for a future day) returns **404** until that UTC day.
4. Optional: `DAILY_TODAY=YYYY-MM-DD npm run daily:check` to simulate another “today”.

**Do not commit** `tsconfig.tsbuildinfo`.

## If a day was missed

1. Set `DAILY_TODAY` to the **real** current UTC date (or leave unset).
2. Run `npm run daily:add` — it backfills every missing date from `2026-10-07` through today+7.
3. Run `npm run daily:check`. If it fails (overlap / placement), inspect the error, delete the bad entry from `data/daily.json` if needed, and re-run `daily:add` (seeds retry automatically).
4. Commit, push, deploy as above.

Past dates that were already public must **not** be regenerated with a different grid — only fill **missing** dates. `daily:add` never overwrites an existing date.

## Local QA overrides

```bash
DAILY_TODAY=2026-10-07 npm run daily:check
DAILY_TODAY=2026-10-07 npm run build && npx vite preview --port 4191
node scripts/test-daily.mjs
```

`DAILY_TODAY` is inlined at **build** time via `vite.config.ts` `define` (Cloudflare Workers do not inherit your shell env). The add/check scripts and `node scripts/test-daily.mjs` read it from the process env directly. Never set `DAILY_TODAY` on a production deploy.

## Related files

- `data/daily.json` — schedule
- `lib/daily.ts` — helpers (difficulty, theme ranking, overlap)
- `lib/data.ts` — `getDailyPuzzle`, archive, validity
- `scripts/add-daily.ts` / `scripts/check-daily.ts`
- `app/calendar/` — calendar UI
