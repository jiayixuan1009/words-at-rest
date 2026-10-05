/** Local Unsplash-sourced images under /public/images (royalty-free). Temporary until the
 * hand-made art set from design/IMAGE-BRIEF.md lands. Alts describe what is actually shown. */

export const IMAGES = {
  hero: "/images/hero-cafe.jpg",
  howTo: "/images/how-to-paper.jpg",
  // Previously adults-reading.jpg (business-book spines) and large-print-glasses.jpg (a stock
  // portrait that did not match its alt). Swapped for calmer, accurately described photos.
  adults: "/images/empty-desk.jpg",
  largePrint: "/images/theme-letters.jpg",
  empty: "/images/empty-desk.jpg",
  coffee: "/images/theme-coffee.jpg",
  autumn: "/images/theme-autumn.jpg",
  letters: "/images/theme-letters.jpg",
  garden: "/images/theme-garden.jpg",
  ocean: "/images/theme-ocean.jpg",
  cozy: "/images/theme-cozy.jpg",
} as const;

export const IMAGE_ALT: Record<keyof typeof IMAGES, string> = {
  hero: "Three cups of coffee raised together over a café table",
  howTo: "A dark notebook and a pencil on a wooden table, ready for a puzzle",
  adults: "Someone writing on paper at a desk beside a cup of coffee",
  largePrint: "Open book pages laid out side by side, printed text up close",
  empty: "Someone writing on paper at a desk beside a cup of coffee",
  coffee: "A pile of roasted coffee beans",
  autumn: "Sunlight through tall trees on a quiet forest path",
  letters: "Open book pages laid out side by side, printed text up close",
  garden: "A garden trowel and fresh soil on a potting bench",
  ocean: "Gentle waves on a sandy beach at sunset",
  cozy: "A cup of black coffee seen from above",
};

const THEME_IMAGE_KEY: Record<string, keyof typeof IMAGES> = {
  halloween: "autumn",
  fall: "autumn",
  christmas: "cozy",
  animals: "garden",
  space: "letters",
  sports: "coffee",
  food: "coffee",
  ocean: "ocean",
  dogs: "cozy",
  cats: "cozy",
  travel: "ocean",
  music: "letters",
  garden: "garden",
  "large-print-pack": "largePrint",
  "hard-pack": "letters",
};

/** Theme slug → calm lifestyle image (no IP characters). */
export function themeImage(slug: string): string {
  return IMAGES[THEME_IMAGE_KEY[slug] ?? "letters"];
}

/** Meaningful alt for a theme card / hero: names the theme + describes the photo. */
export function themeImageAlt(slug: string, themeName: string): string {
  return `${themeName} word search puzzles — ${IMAGE_ALT[THEME_IMAGE_KEY[slug] ?? "letters"].toLowerCase()}`;
}

/** Per-theme 1200×630 social card (scripts/generate-og.mjs). */
export function themeOgImage(slug: string): string {
  return `/og/themes/${slug}.jpg`;
}
