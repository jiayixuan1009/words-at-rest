import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Always resolve generateMetadata() before the shell and emit <title>, meta
  // description, canonical and Open Graph tags in <head>. vinext (like Next.js)
  // otherwise "streams" metadata for non-listed user agents into a hidden <div>
  // at the end of <body> that only JavaScript moves into <head> — and the ISR
  // cache then serves that variant to every crawler (GPTBot, ClaudeBot,
  // PerplexityBot…). Our metadata is synchronous data, so blocking costs nothing.
  // (An empty User-Agent still streams; the generateMetadata routes are therefore
  // force-dynamic so that variant is never cached.)
  htmlLimitedBots: /.*/,
  async headers() {
    return [
      {
        // Keep an exact root rule: vinext's wildcard header matcher excludes '/'.
        source: "/",
        headers: [{ key: "X-Robots-Tag", value: "max-image-preview:large" }],
      },
      {
        source: "/:path*",
        // Indexing stays page-specific in metadata; don't contradict a noindex page.
        headers: [{ key: "X-Robots-Tag", value: "max-image-preview:large" }],
      },
    ];
  },
};

export default nextConfig;
