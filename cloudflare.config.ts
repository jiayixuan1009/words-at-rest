import { bindings, defineConfig, defineWorker } from "cf/config";

// vinext deploys as a Cloudflare *Worker* (not a Pages project).
// Account: set CLOUDFLARE_ACCOUNT_ID in your shell/CI, or uncomment accountId below.
export default defineConfig({
  // accountId: "b79c11a97188ceeb150acb0b6c4cda97",
  worker: defineWorker({
    name: "words-at-rest",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-05",
    compatibilityFlags: ["nodejs_compat"],
    assets: { notFoundHandling: "none" },
    env: {
      ASSETS: bindings.assets(),
      // Optional runtime vars (defaults live in lib/site.ts / .env.example):
      // SITE_URL: "https://wordsatrest.com",
      // DAILY_START: "2026-10-06",
      // NEXT_PUBLIC_* must be available at build time for client bundles.
    },
  }),
});
