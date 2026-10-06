/**
 * Hand-made art set (warm gouache + soft risograph grain) under /public/images.
 * Paths follow design/asset-manifest.csv `original_application_path`; alts come from the
 * design brief's alt_text_en (design/image-manifest.csv), rewritten where a page needs more
 * context. Decorative ornaments use alt="". Smaller "-640/-800…" variants are produced by
 * scripts/derive-images.mjs and exposed via srcset.
 */

export interface Art {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Extra smaller renditions for srcset: [path, intrinsic width]. */
  variants?: [string, number][];
}

const v = (base: string, w: number): [string, number] => [base.replace(/\.webp$/, `-${w}.webp`), w];
const art = (src: string, width: number, height: number, alt: string, variantWidths: number[] = []): Art => ({
  src,
  width,
  height,
  alt,
  variants: variantWidths.map((w) => v(src, w)),
});

export const ART = {
  heroDesktop: art("/images/home/hero-desktop.webp", 1600, 1200, "A quiet morning table by a window, with a cup of coffee and a folded puzzle page", [1200]),
  heroMobile: art("/images/home/hero-mobile.webp", 1200, 900, "A quiet morning table by a window, with a cup of coffee and a folded puzzle page", [800]),
  homeThemesOrnament: art("/images/home/section-themes-ornament.webp", 240, 80, ""),
  homeDifficulty: art("/images/home/section-difficulty.webp", 800, 400, "Painted letter grids beside a calendar, a puzzle page and coffee by a window", [480]),
  homeAsideLargePrint: art("/images/home/aside-large-print.webp", 1200, 900, "Reading glasses resting on a large-print puzzle page", [640]),
  themesBanner: art("/images/themes/_index-banner.webp", 1600, 500, "A shelf of painted theme motifs: a leaf, a shell, a teacup, a houseplant and a crescent moon", [960]),
  largePrintPromo: art("/images/large-print/promo-hero.webp", 1400, 1050, "Reading glasses resting on an open large-print book under a warm lamp", [800]),
  largePrintComfort: art("/images/large-print/comfort-spot.webp", 900, 600, "Hands holding a tablet showing a large, calm puzzle grid"),
  dailyHeader: art("/images/daily/header.webp", 1600, 480, "Morning light on a desk with a small calendar, a puzzle page and coffee", [960]),
  dailyArchiveEmpty: art("/images/daily/archive-empty.webp", 800, 500, "A small stack of blank puzzle cards — the archive fills up day by day"),
  howToBanner: art("/images/how-to/banner.webp", 1680, 720, "A fountain pen resting on a puzzle page", [960]),
  howToSteps: [
    art("/images/how-to/step-01-pick.webp", 800, 600, "Step 1: a hand picking one puzzle card from a fan of themed cards", [480]),
    art("/images/how-to/step-02-wordlist.webp", 800, 600, "Step 2: the word list laid beside the puzzle grid, with a pencil", [480]),
    art("/images/how-to/step-03-select.webp", 800, 600, "Step 3: a pencil marking one word in a straight line across the grid", [480]),
    art("/images/how-to/step-04-finish.webp", 800, 600, "Step 4: a finished puzzle page beside a cup of coffee", [480]),
  ],
  adultsHero: art("/images/adults/hero.webp", 1200, 900, "A quiet evening reading nook with stacked books, coffee and warm lamplight", [800]),
  adultsNoTimer: art("/images/adults/spot-no-timer.webp", 640, 480, "An hourglass — no timer, play at your own pace"),
  aboutSpot: art("/images/about/spot.webp", 900, 600, "A small desk where the puzzles are made: a puzzle notebook, coffee, a plant and letter stamps"),
  contactSpot: art("/images/contact/spot.webp", 800, 600, "A sealed envelope and a fountain pen"),
  legalOrnament: art("/images/legal/spot-ornament.webp", 400, 120, ""),
  notFound: art("/images/system/404.webp", 1280, 800, "An empty desk where a puzzle page has gone missing", [800]),
  empty: art("/images/system/empty-state.webp", 800, 600, "An empty folder holding a single pressed leaf — nothing here yet"),
  loading: art("/images/system/loading.webp", 256, 256, ""),
  puzzleComplete: art("/images/puzzle/complete.webp", 900, 500, "A finished puzzle — an empty coffee cup and a ticked tile, well done"),
  puzzleCompleteCompact: art("/images/puzzle/complete-compact.png", 256, 256, ""),
  ctaComeBack: art("/images/cta/newsletter.webp", 1000, 600, "A breakfast tray with coffee and a blank card — come back tomorrow for a new daily puzzle", [640]),
  dividerRule: art("/images/ornaments/divider-rule.png", 800, 40, ""),
  flourish: art("/images/ornaments/flourish.png", 200, 80, ""),
  corner: art("/images/ornaments/corner.png", 128, 128, ""),
  adSpacer: art("/images/ads/neutral-spacer.webp", 728, 40, ""),
  headerMark: art("/images/brand/header-mark-32.png", 64, 64, ""),
  lockup: art("/images/brand/logo-lockup-480.webp", 480, 144, "Words at Rest"),
} as const;

export type DifficultyKey = "easy" | "medium" | "hard";

export const DIFFICULTY_ART: Record<DifficultyKey, { image: Art; badge: Art }> = {
  easy: {
    image: art("/images/difficulty/easy.webp", 1200, 600, "Easy: an open painted grid with only a few squares filled", [640]),
    badge: art("/images/difficulty/badge-easy.png", 128, 128, ""),
  },
  medium: {
    image: art("/images/difficulty/medium.webp", 1200, 600, "Medium: a fuller painted grid with a fountain pen", [640]),
    badge: art("/images/difficulty/badge-medium.png", 128, 128, ""),
  },
  hard: {
    image: art("/images/difficulty/hard.webp", 1200, 600, "Hard: a dense cross-hatched grid of tiny squares", [640]),
    badge: art("/images/difficulty/badge-hard.png", 128, 128, ""),
  },
};

const THEME_MOTIF: Record<string, string> = {
  halloween: "a pumpkin, a lit candle, autumn leaves and a paper bat on a wooden table",
  fall: "a folded plaid blanket, a maple leaf and an acorn",
  christmas: "a white candle, pine sprigs, cinnamon and a striped ribbon",
  animals: "a fox resting among ferns beside a small bird",
  space: "a telescope on a hill under a crescent moon and stars",
  sports: "a tennis racket, a ball, trainers and a bicycle wheel",
  food: "fresh bread, a salad bowl and olive oil on a kitchen table",
  ocean: "a scallop shell on the sand, waves and a distant lighthouse",
  dogs: "a golden dog sitting in the sun beside its lead",
  cats: "a cat asleep on a sunny windowsill beside a ball of yarn",
  travel: "an old suitcase, a map, a compass and a stamp",
  music: "a music stand, a record, headphones and a kettle",
  garden: "a potted plant and a trowel on a potting bench",
  "large-print-pack": "reading glasses on an open puzzle book under a lamp",
  "hard-pack": "a dense puzzle grid with a fountain pen",
};

/** Theme slug → 1200×900 painted cover (with a 640w variant). */
export function themeArt(slug: string, themeName: string): Art {
  const src = `/images/themes/${slug}.webp`;
  return art(src, 1200, 900, themeImageAlt(slug, themeName), [640]);
}

export function themeImage(slug: string): string {
  return `/images/themes/${slug}.webp`;
}

/** Meaningful alt for a theme cover: names the theme + describes the painting. */
export function themeImageAlt(slug: string, themeName: string): string {
  const motif = THEME_MOTIF[slug];
  return motif ? `${themeName} word search — painted illustration of ${motif}` : `${themeName} theme illustration`;
}

/** Per-theme 1200×630 social card (scripts/generate-og.mjs). */
export function themeOgImage(slug: string): string {
  return `/og/themes/${slug}.jpg`;
}

/** srcset string for an Art (largest = original). */
export function srcSetOf(a: Art): string | undefined {
  if (!a.variants?.length) return undefined;
  return [...a.variants.map(([p, w]) => `${p} ${w}w`), `${a.src} ${a.width}w`].join(", ");
}
