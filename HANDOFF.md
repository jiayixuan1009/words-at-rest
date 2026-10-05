# HANDOFF — Words at Rest Week-1 scaffold

**Path:** `/workspace/words-at-rest/` (git repo initialised, 1 commit on `main`; no remote yet)
**Date:** 2026-10-06 (Asia/Shanghai)

## How it was made
- Followed Cloudflare guidance for NEW Next.js projects on Cloudflare: `npx skills add cloudflare/vinext`
  (installed skill `migrate-to-vinext`, migration-oriented) + upstream README "Starting a new vinext project".
- Scaffolded with `npx create-vinext-app@latest words-at-rest --platform cloudflare --data-cache none
  --cdn-cache none --image-optimization none --no-prerender --no-warm-cache --use-npm --yes`.
  → vinext 1.0.1, Vite 8, `@cloudflare/vite-plugin` v2 beta, `cf` CLI, `cloudflare.config.ts` (Worker `words-at-rest`).
  Not OpenNext.

## Commands (verified)
| Command | Result |
|---|---|
| `npm run build` | ✅ succeeds (~4 s), output `.cloudflare/output/` |
| `npm run typecheck` | ✅ clean |
| `npm run start` (vite preview on workerd) | ✅ all routes smoke-tested |
| `npm run dev` | ✅ 200 on `/` and puzzle pages |
| `npm run generate` | ✅ deterministic (same JSON on re-run) |
| `npm run deploy:dry-run` | ✅ "Dry run complete" |
| `npm run deploy` | ⛔ NOT run — `cf auth whoami` → not logged in |

Headless Chrome test: completed a 14-word puzzle via drag + tap-tap, completion state shown, progress persisted
across reload, large-print toggle works, zero console errors.

## Routes (all SSR, grid letters in initial HTML)
`/` · `/daily` · `/daily/[date]` (valid from DAILY_START to today UTC, else 404) · `/themes` · `/themes/[theme]` ·
`/themes/[theme]/[slug]` · `/difficulty/easy|medium|hard` · `/large-print` · `/how-to-play` (HowTo JSON-LD) · `/adults` ·
`/privacy` · `/terms` · `/about` · `/contact` · `/sitemap.xml` · `/robots.txt` · `/icon.svg` · custom 404.
Each page: unique title/description, canonical (https://wordsatrest.com/...), breadcrumbs + BreadcrumbList JSON-LD;
puzzle pages add WebPage/Game JSON-LD.

## Content
- Themes (self-written, no IP): `halloween`, `animals`, `large-print-pack` (40 words each).
- 7 puzzles: halloween-easy-01 / -medium-01 / -hard-01, animals-easy-01 / -medium-01,
  large-print-pack-large-01 / -02 (9×9 large print).
- English drafts: Privacy (AdSense/GA/cookies/opt-out/under-13/GDPR-CCPA wording), Terms, About, Contact,
  How to Play, Adults.

## Stubbed / TODO
- `lib/engine.ts`: self-written deterministic placer (mulberry32). Harden or swap to MIT engine (wordfind) — TBD.
- Daily = FNV hash of UTC date over non-large-print pool → move to committed `data/daily.json` schedule.
- `DAILY_START` defaults to **2026-10-06** (launch day); override with env. Pre-launch dates 404 / omitted from sitemap.
- `hello@wordsatrest.com` placeholder — needs a real inbox (Cloudflare Email Routing works) before AdSense.
- `AdSlot` reserves space only; GA4 loads only if `NEXT_PUBLIC_GA_ID` is set; cookie banner stub behind `NEXT_PUBLIC_COOKIE_CONSENT=1`.
- Sitemap is single file; split into index (P1).
- Only 7 puzzles / 3 themes — launch target is ≥40 puzzles / 15 themes (add specs in `scripts/generate-puzzles.ts`).

## ⚠️ Deploy target mismatch (needs a decision)
vinext deploys a **Worker**, not a Pages project. The existing Pages project `words-at-rest` + its custom domains
(`wordsatrest.com`, `www`, CNAMEs → `words-at-rest.pages.dev`) cannot serve this app as-is.
Plan: deploy Worker `words-at-rest` → verify on `*.workers.dev` → detach domains from Pages, delete the 2 CNAMEs,
add both hostnames as Worker Custom Domains → add www→apex redirect → optionally delete the Pages project.
(The domain move briefly takes the site offline — currently there is no content, so low risk. Needs user OK since
it changes their Cloudflare account.)

## Next steps for Git connect
1. User creates a GitHub repo (e.g. `words-at-rest`); `git remote add origin … && git push -u origin main`.
2. Dashboard → Workers & Pages → Create → **Import a repository** → *Worker* named `words-at-rest`;
   build `npm run build`, deploy `npx vinext-cloudflare deploy --skip-build`; env `CLOUDFLARE_ACCOUNT_ID` if needed.
   (Git OAuth link can't be done via API — user must click it.)
3. Then do the domain move above.
CLI alternative: `npx cf auth login` (interactive, user) or `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`, then `npm run deploy`.
