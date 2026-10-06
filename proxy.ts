import { NextResponse, type NextRequest } from "next/server";

/**
 * vinext streams metadata into <body> when the request has *no* User-Agent
 * (htmlLimitedBots cannot match an empty string), and the ISR cache would then
 * serve that variant to everyone. Give UA-less requests a neutral UA so every
 * render keeps <title>/description/canonical in <head>. Content is unchanged.
 */
export function proxy(request: NextRequest) {
  if (request.headers.get("user-agent")) return NextResponse.next();
  const headers = new Headers(request.headers);
  headers.set("user-agent", "Mozilla/5.0 (compatible; WordsAtRest-NoUA)");
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/|images/|og/|favicon|apple-touch-icon|site\\.webmanifest|robots\\.txt|sitemap\\.xml|llms\\.txt).*)"],
};
