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
  golf: "a golf tee, ball and putter on cropped grass",
  baseball: "a baseball glove, ball and bat on a wooden bench",
  tennis: "a tennis racket, balls and a folded towel by a clay court edge",
  fishing: "a fishing rod, reel and tackle box by a quiet lakeshore",
  baking: "a loaf of bread, a rolling pin and a bowl of flour on a kitchen table",
  desserts: "a slice of cake, a berry tart and a cream jug on cream paper",
  herbs: "bundles of basil, thyme and rosemary with a mortar and pestle",
  fruits: "a market basket of apples, citrus and berries",
  instruments: "a violin, flute and sheet music on a music stand",
  jazz: "a muted trumpet, brushes and a small combo stool under soft light",
  classical: "a conductor's baton, score and a quiet concert hall chair",
  "music-terms": "an open theory workbook, a pencil and a metronome",
  bible: "a closed old Bible with a ribbon bookmark, an olive branch and an oil lamp on a wooden table",
  thanksgiving: "a harvest table still life with a pumpkin, corn, acorns and a linen napkin",
  winter: "a mug of cocoa, wool mittens and pine beside a frosted window",
  valentines: "a sealed letter with a wax seal, a dried rose and a ribbon on cream paper",
  easter: "a woven basket, a few pale eggs, daffodils and willow on a wooden table",
  "new-year": "a desk calendar turned to January, a sparkler and confetti on cream paper",
  "st-patricks": "a three-leaf clover, a tin whistle and green ribbon on linen",
  "mothers-day": "a small bouquet, a handwritten card and a breakfast tray on a table",
  "fathers-day": "a wooden toolbox, a folded newspaper and a coffee mug on a porch rail",
  "independence-day": "a picnic blanket, a small flag and sparklers beside a summer pie",
  spring: "daffodils, a bird nest and soft rain on a garden path",
  summer: "a lemonade glass, sunhat and shell on a porch table",
  vegetables: "a wooden crate of carrots, greens and peppers on a kitchen table",
  breakfast: "toast, a soft-boiled egg and a coffee cup on a breakfast tray",
  "coffee-tea": "a ceramic mug, loose tea leaves and a coffee press on linen",
  kitchen: "a wooden spoon, mixing bowl and folded apron on a kitchen counter",
  birds: "a robin on a branch, feathers and a small nest sketch",
  flowers: "a vase of mixed blooms and loose petals on a garden table",
  trees: "an oak leaf, acorn and pine cone on weathered wood",
  weather: "a barometer, umbrella and cloud sketch beside a window",
  "us-states": "a folded map of the United States, a compass and a travel stamp",
  "world-capitals": "a globe, a small flag pin and an open atlas on a desk",
  "human-body": "an anatomy sketchbook, a pencil and reading glasses on cream paper",
  camping: "a tent peg, lantern and folded map beside pine needles",
  horses: "a leather bridle, horseshoe and soft brush on barn wood",
  cars: "a classic key fob, road map and spare tire sketch on a workbench",
  trains: "a ticket stub, conductor's punch and miniature locomotive on linen",
  airplanes: "a paper airplane, boarding pass stub and cloud sketch on a desk",
  farming: "a wooden rake, seed packet and wheat sheaf on a farm table",
  beach: "a seashell, towel and straw hat on sun-warmed sand",
  mountains: "a hiking boot, trail map and pine cone against a ridge sketch",
  lakes: "a wooden dock, canoe paddle and calm water reflection",
  school: "an open notebook, pencil and reading glasses on a wooden desk",
  jobs: "a fountain pen, name badge and tidy notepad on a desk",
  friendship: "two teacups, a shared letter and a small pressed flower",
  kindness: "a shared umbrella, a handwritten thank-you note and a small flower",
  gratitude: "a small journal, a pressed leaf and a cup of tea on linen",
  mindfulness: "a quiet cushion, a tea bowl and soft morning light on a mat",
  colors: "paint swatches, a soft brush and a folded cloth in warm light",
  tools: "a wooden-handled hammer, nails and a folded work apron",
  soccer: "a soccer ball, grass cleats and a folded jersey on a bench",
  basketball: "a basketball, hoop net and chalk court lines on warm wood",
  "american-history": "an open history book, a quill and a folded parchment map",
  presidents: "a small bust silhouette, a quill and a presidential seal sketch (generic)",
  dinosaurs: "a fossil sketch, a small bone cast and a field notebook",
  insects: "a beetle sketch, a magnifying glass and a leaf with dew",
  reptiles: "a turtle shell sketch, a smooth stone and dry grass",
  cooking: "a wooden spoon, simmering pot and recipe card on a stove edge",
  shopping: "a woven basket, paper receipt and folded cloth tote",
  money: "a coin dish, a small ledger and a fountain pen on a desk",
  countries: "a small globe, border stamps and an open atlas on a desk",
  continents: "a flat world map with continent outlines and a brass compass",
  cities: "a skyline sketch, a metro ticket stub and a city map fold",
  knitting: "knitting needles, a ball of yarn and a folded scarf on linen",
  reading: "an open book, reading glasses and a bookmark ribbon",
  painting: "a paintbrush, palette and small canvas on a wooden easel edge",
  birthday: "a small cake, candles and a wrapped gift on cream paper",
  wedding: "a simple gold band, a dried flower and a vow card on linen",
  chemistry: "a flask sketch, a periodic table corner and a lab notebook",
  mythology: "an olive wreath, a clay lamp and an open myth anthology",
  volcanoes: "a crater sketch, cooled lava rock and a field notebook",
  forests: "fern fronds, moss and a winding forest path sketch",
  rivers: "a winding river map, a smooth stone and reed sketch",
  deserts: "a sand dune sketch, a cactus and a water flask",
  museums: "a gallery bench, a framed sketch and an exhibit label card",
  sewing: "a needle, spool of thread and folded fabric on a sewing table",
  quilting: "a quilt block, batting scrap and binding strip on cream cloth",
  swimming: "goggles, a swim cap and lane-line sketch on blue paper",
  hiking: "hiking boots, a trail map and a walking pole on pine needles",
  cycling: "a bicycle wheel, helmet and folded route map on a bench",
  geology: "rock samples, a hand lens and a field notebook on sandstone",
  architecture: "a small facade sketch, a scale ruler and tracing paper",
  islands: "a small island map, shell and ferry ticket stub",
  emotions: "a small journal, a soft pencil and a pressed flower",
  photography: "a simple camera outline, a lens cap and a contact sheet strip",
  chess: "a chessboard corner, a king and a pawn on wood",
  "national-parks": "a park map, ranger hat outline and pine vista sketch",
  landmarks: "a small tower sketch, bridge outline and postcard stamp",
  "farm-animals": "a barn outline, hen and hay bale on cream paper",
  home: "a porch light, key and small house sketch",
  astronomy: "a small telescope, star chart and crescent moon",
  "board-games": "dice, a token and a folded board edge on a table",
  yoga: "a rolled mat, block and soft studio light sketch",
  pottery: "a clay bowl on a wheel, sponge and glaze jar",
  woodworking: "a wood plane, chisel and scrap of oak on a bench",
  calligraphy: "a nib pen, ink bottle and flourish on cream paper",
  libraries: "stacked books, a library card and reading lamp",
  volunteering: "a name badge, tote and sign-up clipboard",
  "gardening-tools": "a trowel, pruners and coiled hose on a potting bench",
  meditation: "a cushion, bowl and soft morning light on a mat",
  birdwatching: "binoculars, a field notebook and a perched songbird sketch",
  lighthouses: "a lighthouse tower, lamp and rocky shore sketch",
  journaling: "an open journal, pen and soft desk lamp",
  apothecary: "herb jars, a mortar and a small brass scale on a shelf",
  "large-print-pack": "reading glasses on an open puzzle book under a lamp",
  "hard-pack": "a dense puzzle grid with a fountain pen",
};

/** Theme slug → 1200×900 painted cover (with a 640w variant).
 *
 * TEMPORARY covers for holiday Wave 1 (thanksgiving / winter / valentines / easter):
 * public/images/themes/<slug>.webp (+ -640) currently reuse nearby seasonal art
 * (fall / christmas / food / garden) until dedicated paintings from
 * design/HOLIDAY-IMAGE-REQUEST.md land — swap those files only; no code change needed.
 * Matching OG bases live at design/og-base/og-theme-<slug>.png (same swap rule).
 *
 * TEMPORARY covers for sub-theme Wave 1 (golf/baseball/tennis/fishing,
 * baking/desserts/herbs/fruits, instruments/jazz/classical/music-terms):
 * reuse parent sports/food/music art until design/SUBTHEME-IMAGE-REQUEST.md lands.
 * Swap public/images/themes/<slug>.webp (+ -640) and design/og-base/og-theme-<slug>.png only.
 *
 * TEMPORARY covers for Wave C (new-year, st-patricks, mothers-day, fathers-day,
 * independence-day, spring, summer, vegetables, breakfast, coffee-tea, kitchen,
 * birds, flowers, trees, weather): borrow nearby seasonal/parent art until dedicated
 * paintings land. Swap webp (+ -640) and og-base PNG / public/og/themes JPG only.
 *
 * TEMPORARY covers for Wave D (us-states, world-capitals, human-body, camping, horses,
 * cars, trains, airplanes, farming, beach, mountains, lakes, school, jobs, friendship):
 * borrow travel/ocean/fall/animals/space/garden/bible/valentines art until dedicated
 * paintings land. Swap webp (+ -640) and og-base PNG / public/og/themes JPG only.
 *
 * TEMPORARY covers for Wave E (kindness, gratitude, mindfulness, colors, tools, soccer,
 * basketball, american-history, presidents, dinosaurs, insects, reptiles, cooking,
 * shopping, money): borrow nearby art until dedicated paintings land. Swap webp/OG only.
 *
 * TEMPORARY covers for Wave F (countries…museums): borrow nearby art; swap webp/OG only.
 *
 * TEMPORARY covers for Wave G (sewing…photography): borrow nearby art; swap webp/OG only.
 *
 * TEMPORARY covers for Wave H (chess…yoga): borrow nearby art; swap webp/OG only.
 *
 * TEMPORARY covers for Wave I (pottery…gardening-tools): borrow nearby art; swap webp/OG only.
 *
 * TEMPORARY covers for Wave JK (meditation…apothecary): borrow nearby art; swap webp/OG only.
 */

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

/**
 * Themes that have the progressive Easy/Medium/Hard art set (design/DIFFICULTY-IMAGE-REQUEST.md):
 * public/images/themes/<slug>-<easy|medium|hard>.webp (1200×900) plus -640 and -320 variants.
 * The Workers runtime can't stat files, so this list is the source of truth;
 * scripts/check-images.mjs fails the build check if a listed file is missing.
 * Add a slug here only after all three levels exist.
 */
export const DIFFICULTY_ART_THEMES: ReadonlySet<string> = new Set([
  "animals", "bible", "cats", "christmas", "dogs", "easter", "fall", "food", "garden",
  "hard-pack", "halloween", "large-print-pack", "music", "ocean", "space", "sports",
  "thanksgiving", "travel", "valentines", "winter",
]);

/** What the painting shows at each level (same scene, fuller as difficulty rises). */
const LEVEL_MOTIF: Record<string, Record<DifficultyKey, string>> = {
  animals: { easy: "a red fox standing alone on a patch of grass", medium: "a red fox with a small bird and a few ferns", hard: "a red fox among ferns, wildflowers, a bird and a rabbit" },
  bible: { easy: "a closed old Bible with a ribbon bookmark on a wooden table", medium: "a closed Bible beside an olive branch and a clay oil lamp", hard: "a closed Bible with an olive branch, an oil lamp and wheat stalks" },
  cats: { easy: "a ball of yarn on a sunny windowsill", medium: "a ball of yarn on a windowsill in warm evening light", hard: "a cat asleep on a sunny windowsill beside a ball of yarn" },
  christmas: { easy: "a single pine sprig on a wooden table", medium: "a pine sprig and a bundle of cinnamon sticks", hard: "pine sprigs, cinnamon, a ribbon, a pine cone and a lit white candle" },
  dogs: { easy: "a green dog lead on a wooden floor", medium: "a dog lead and a collar with a name tag", hard: "a golden dog resting beside its lead, collar and water bowl" },
  fall: { easy: "a single maple leaf on a wooden table", medium: "a maple leaf and an acorn", hard: "a maple leaf, acorns and a folded plaid blanket" },
  food: { easy: "a bowl of vegetable soup on a kitchen table", medium: "a bowl of soup with a wooden spoon and fresh herbs", hard: "a bowl of soup, herbs, a wooden spoon and a loaf of fresh bread" },
  garden: { easy: "one seedling in a clay pot on a potting bench", medium: "a few potted plants and a trowel on a potting bench", hard: "a potting bench crowded with lavender, herbs and flowering pots" },
  halloween: { easy: "a single pumpkin on a wooden table", medium: "a pumpkin with a lit candle and autumn leaves", hard: "a pumpkin, a lit candle, autumn leaves and a paper bat" },
  "hard-pack": { easy: "a fountain pen on a wooden desk", medium: "a fountain pen, an ink bottle and a notebook", hard: "a desk full of pens, ink, notebooks and a brass tray" },
  "large-print-pack": { easy: "a pair of reading glasses on cream paper", medium: "reading glasses on a reading table under a lamp", hard: "reading glasses on an open puzzle book under a lamp, with books and a plant" },
  music: { easy: "a pair of headphones on a small side table", medium: "headphones and a vinyl record on a side table", hard: "headphones, a record, a teapot and a music stand with sheet music" },
  ocean: { easy: "a single seashell on the sand", medium: "a seashell on the sand with gentle waves", hard: "a seashell, pebbles, waves and a distant lighthouse" },
  space: { easy: "a crescent moon in a pale sky", medium: "a crescent moon above soft clouds and a few stars", hard: "a telescope on a hill under a crescent moon, clouds and stars" },
  sports: { easy: "a tennis ball on a wooden bench", medium: "a tennis ball and a pair of trainers on a bench", hard: "a tennis ball, trainers and a bicycle wheel by a bench" },
  thanksgiving: { easy: "a single small pumpkin on a warm wooden harvest table", medium: "a pumpkin with ears of corn and a folded linen napkin", hard: "a harvest table with a pumpkin, corn, acorns, napkin, wooden spoon and gravy boat" },
  winter: { easy: "a single mug of cocoa on a frosted window ledge", medium: "a cocoa mug with a pair of wool mittens on the ledge", hard: "cocoa, mittens, a pine sprig and soft frost on the window" },
  valentines: { easy: "a sealed cream envelope with a soft wax seal", medium: "a sealed letter beside a dried rose", hard: "a sealed letter, dried rose, ribbon and fountain pen on cream paper" },
  easter: { easy: "a single pale egg in a small woven nest", medium: "a woven basket with a few pale eggs and a daffodil", hard: "a woven basket, pale eggs, daffodils and willow on a wooden table" },
  travel: { easy: "a brass compass on a wooden table", medium: "a compass with postcards and a stamp", hard: "a compass, postcards, a folded map and an old suitcase" },
};

/** Puzzle level → art level. Large-print puzzles reuse the Easy painting (per the manifest). */
export function artLevel(p: { difficulty: DifficultyKey; largePrint?: boolean }): DifficultyKey {
  return p.largePrint ? "easy" : p.difficulty;
}

/**
 * Art for one puzzle: the theme's <slug>-<level> painting when the set exists,
 * otherwise the theme cover. Alt names the puzzle level and describes the scene.
 */
export function puzzleArt(p: { themeId: string; difficulty: DifficultyKey; largePrint?: boolean }, themeName: string): Art {
  const level = artLevel(p);
  if (!DIFFICULTY_ART_THEMES.has(p.themeId)) return themeArt(p.themeId, themeName);
  const motif = LEVEL_MOTIF[p.themeId]?.[level];
  const label = p.largePrint ? "large print" : level;
  const alt = motif
    ? `${themeName} word search, ${label} — painted illustration of ${motif}`
    : `${themeName} word search, ${label} — painted illustration`;
  return art(`/images/themes/${p.themeId}-${level}.webp`, 1200, 900, alt, [320, 640]);
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
