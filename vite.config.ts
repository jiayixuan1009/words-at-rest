import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { contentDatesPlugin } from "./scripts/content-dates.ts";

export default defineConfig({
  // Local QA only: DAILY_TODAY=YYYY-MM-DD npm run build — inlines into the worker bundle.
  // Leave unset in production deploys so todayUtc() uses the real UTC date.
  define: {
    "process.env.DAILY_TODAY": JSON.stringify(process.env.DAILY_TODAY ?? ""),
  },
  plugins: [
    contentDatesPlugin(),
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
