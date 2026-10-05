/** Local Unsplash-sourced images under /public/images (royalty-free). */

export const IMAGES = {
  hero: "/images/hero-cafe.jpg",
  howTo: "/images/how-to-paper.jpg",
  adults: "/images/adults-reading.jpg",
  largePrint: "/images/large-print-glasses.jpg",
  empty: "/images/empty-desk.jpg",
  coffee: "/images/theme-coffee.jpg",
  autumn: "/images/theme-autumn.jpg",
  letters: "/images/theme-letters.jpg",
  garden: "/images/theme-garden.jpg",
  ocean: "/images/theme-ocean.jpg",
  cozy: "/images/theme-cozy.jpg",
} as const;

/** Theme slug → calm lifestyle image (no IP characters). */
export function themeImage(slug: string): string {
  const map: Record<string, string> = {
    halloween: IMAGES.autumn,
    fall: IMAGES.autumn,
    christmas: IMAGES.cozy,
    animals: IMAGES.garden,
    space: IMAGES.letters,
    sports: IMAGES.coffee,
    food: IMAGES.coffee,
    ocean: IMAGES.ocean,
    dogs: IMAGES.cozy,
    cats: IMAGES.cozy,
    travel: IMAGES.ocean,
    music: IMAGES.letters,
    garden: IMAGES.garden,
    "large-print-pack": IMAGES.largePrint,
    "hard-pack": IMAGES.letters,
  };
  return map[slug] ?? IMAGES.letters;
}
