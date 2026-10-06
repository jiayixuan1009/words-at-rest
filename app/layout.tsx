import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, SITE } from "@/lib/site";
import { organizationSchema } from "@/lib/seo";

const DEFAULT_TITLE = "Free Large Print & Daily Word Search | Words at Rest";
const DEFAULT_DESC =
  "Calm, free word search puzzles for adults and seniors. Large print, daily puzzles and seasonal themes — no download, no sign-up, no timer.";
const DEFAULT_IMAGE = {
  url: absoluteUrl(SITE.ogImage),
  width: 1200,
  height: 630,
  alt: "Words at Rest — calm word search puzzles for adults",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Words at Rest",
  },
  description: DEFAULT_DESC,
  applicationName: SITE.name,
  authors: [{ name: SITE.editor.name, url: absoluteUrl(SITE.editor.aboutPath) }],
  creator: SITE.editor.name,
  publisher: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [DEFAULT_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [DEFAULT_IMAGE.url] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col text-[var(--ink)]">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:p-3">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-8 sm:py-10">
          {children}
        </main>
        <SiteFooter />
        <CookieConsent />
        <Analytics />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
