/**
 * Pre-generates puzzle JSON so pages SSR stable, indexable grids.
 * Run: npm run generate
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { generateGrid, createRng } from "../lib/engine.ts";
import type { Difficulty, Puzzle, Theme } from "../lib/types.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const themesDir = join(root, "data/themes");
const puzzlesDir = join(root, "data/puzzles");
mkdirSync(puzzlesDir, { recursive: true });

interface Spec {
  themeId: string;
  difficulty: Difficulty;
  n: number;
  largePrint?: boolean;
  title: string;
  primaryKeyword: string;
  seed: number;
  /** When set, use this ordered list instead of sampling the theme bank (sub-topic puzzles). */
  fixedWords?: string[];
}

const SIZES: Record<Difficulty, number> = { easy: 10, medium: 12, hard: 15 };
const WORD_COUNTS: Record<Difficulty, number> = { easy: 10, medium: 14, hard: 18 };

const PUZZLE_SPECS: Spec[] = [
  // Seasonal — Halloween
  { themeId: "halloween", difficulty: "easy", n: 1, title: "Easy Halloween Word Search", primaryKeyword: "halloween word search", seed: 1031 },
  { themeId: "halloween", difficulty: "medium", n: 1, title: "Medium Halloween Word Search", primaryKeyword: "halloween word search", seed: 1032 },
  { themeId: "halloween", difficulty: "hard", n: 1, title: "Hard Halloween Word Search", primaryKeyword: "hard word search", seed: 1033 },
  // Seasonal — Fall
  { themeId: "fall", difficulty: "easy", n: 1, title: "Easy Fall Word Search", primaryKeyword: "fall word search", seed: 1101 },
  { themeId: "fall", difficulty: "medium", n: 1, title: "Medium Fall Word Search", primaryKeyword: "fall word search", seed: 1102 },
  { themeId: "fall", difficulty: "hard", n: 1, title: "Hard Fall Word Search", primaryKeyword: "hard word search", seed: 1103 },
  // Seasonal — Christmas
  { themeId: "christmas", difficulty: "easy", n: 1, title: "Easy Christmas Word Search", primaryKeyword: "christmas word search", seed: 1225 },
  { themeId: "christmas", difficulty: "medium", n: 1, title: "Medium Christmas Word Search", primaryKeyword: "christmas word search", seed: 1226 },
  { themeId: "christmas", difficulty: "hard", n: 1, title: "Hard Christmas Word Search", primaryKeyword: "christmas word search", seed: 1227 },
  // Evergreen
  { themeId: "animals", difficulty: "easy", n: 1, title: "Easy Animals Word Search", primaryKeyword: "animals word search", seed: 2001 },
  { themeId: "animals", difficulty: "medium", n: 1, title: "Medium Animals Word Search", primaryKeyword: "animals word search", seed: 2002 },
  { themeId: "animals", difficulty: "hard", n: 1, title: "Hard Animals Word Search", primaryKeyword: "hard word search", seed: 2003 },
  { themeId: "space", difficulty: "easy", n: 1, title: "Easy Space Word Search", primaryKeyword: "space word search", seed: 2101 },
  { themeId: "space", difficulty: "medium", n: 1, title: "Medium Space Word Search", primaryKeyword: "space word search", seed: 2102 },
  { themeId: "space", difficulty: "hard", n: 1, title: "Hard Space Word Search", primaryKeyword: "hard word search", seed: 2103 },
  { themeId: "sports", difficulty: "easy", n: 1, title: "Easy Sports Word Search", primaryKeyword: "sports word search", seed: 2201 },
  { themeId: "sports", difficulty: "medium", n: 1, title: "Medium Sports Word Search", primaryKeyword: "sports word search", seed: 2202 },
  { themeId: "food", difficulty: "easy", n: 1, title: "Easy Food Word Search", primaryKeyword: "food word search", seed: 2301 },
  { themeId: "food", difficulty: "medium", n: 1, title: "Medium Food Word Search", primaryKeyword: "food word search", seed: 2302 },
  { themeId: "ocean", difficulty: "easy", n: 1, title: "Easy Ocean Word Search", primaryKeyword: "ocean word search", seed: 2401 },
  { themeId: "ocean", difficulty: "medium", n: 1, title: "Medium Ocean Word Search", primaryKeyword: "ocean word search", seed: 2402 },
  { themeId: "ocean", difficulty: "hard", n: 1, title: "Hard Ocean Word Search", primaryKeyword: "hard word search", seed: 2403 },
  { themeId: "dogs", difficulty: "easy", n: 1, title: "Easy Dogs Word Search", primaryKeyword: "dogs word search", seed: 2501 },
  { themeId: "dogs", difficulty: "medium", n: 1, title: "Medium Dogs Word Search", primaryKeyword: "dogs word search", seed: 2502 },
  { themeId: "cats", difficulty: "easy", n: 1, title: "Easy Cats Word Search", primaryKeyword: "cats word search", seed: 2601 },
  { themeId: "cats", difficulty: "medium", n: 1, title: "Medium Cats Word Search", primaryKeyword: "cats word search", seed: 2602 },
  { themeId: "travel", difficulty: "easy", n: 1, title: "Easy Travel Word Search", primaryKeyword: "travel word search", seed: 2701 },
  { themeId: "travel", difficulty: "medium", n: 1, title: "Medium Travel Word Search", primaryKeyword: "travel word search", seed: 2702 },
  { themeId: "music", difficulty: "easy", n: 1, title: "Easy Music Word Search", primaryKeyword: "music word search", seed: 2801 },
  { themeId: "music", difficulty: "medium", n: 1, title: "Medium Music Word Search", primaryKeyword: "music word search", seed: 2802 },
  { themeId: "garden", difficulty: "easy", n: 1, title: "Easy Garden Word Search", primaryKeyword: "garden word search", seed: 2901 },
  { themeId: "garden", difficulty: "medium", n: 1, title: "Medium Garden Word Search", primaryKeyword: "garden word search", seed: 2902 },
  { themeId: "garden", difficulty: "hard", n: 1, title: "Hard Garden Word Search", primaryKeyword: "hard word search", seed: 2903 },
  // Evergreen — Bible / Christian (fixed sub-topic lists; respectful, non-denominational)
  { themeId: "bible", difficulty: "easy", n: 1, title: "Bible: Old Testament Books", primaryKeyword: "bible word search", seed: 5001, fixedWords: ["GENESIS", "EXODUS", "LEVITICUS", "NUMBERS", "JOSHUA", "JUDGES", "SAMUEL", "KINGS", "ESTHER", "PSALMS"] },
  { themeId: "bible", difficulty: "easy", n: 2, title: "Bible: New Testament Books", primaryKeyword: "bible word search", seed: 5002, fixedWords: ["MATTHEW", "MARK", "LUKE", "JOHN", "ACTS", "ROMANS", "HEBREWS", "JAMES", "PETER", "JUDE"] },
  { themeId: "bible", difficulty: "medium", n: 1, title: "Bible: Old Testament People", primaryKeyword: "bible word search", seed: 5003, fixedWords: ["ABRAHAM", "MOSES", "DAVID", "SOLOMON", "ESTHER", "RUTH", "DANIEL", "JOSEPH", "NOAH", "ELIJAH", "ISAIAH", "SAMSON", "GIDEON", "JONAH"] },
  { themeId: "bible", difficulty: "medium", n: 2, title: "Bible: Disciples & Apostles", primaryKeyword: "bible word search", seed: 5004, fixedWords: ["PETER", "ANDREW", "JAMES", "JOHN", "PHILIP", "THOMAS", "MATTHEW", "SIMON", "PAUL", "BARNABAS", "TIMOTHY", "LYDIA", "MARTHA", "STEPHEN"] },
  { themeId: "bible", difficulty: "hard", n: 1, title: "Hard Bible: Places & Cities", primaryKeyword: "bible word search", seed: 5005, fixedWords: ["JERUSALEM", "BETHLEHEM", "NAZARETH", "GALILEE", "JORDAN", "EGYPT", "BABYLON", "CANAAN", "SINAI", "JERICHO", "DAMASCUS", "ANTIOCH", "EPHESUS", "GETHSEMANE", "CALVARY", "CAPERNAUM", "NINEVEH", "SAMARIA"] },
  { themeId: "bible", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Bible: Virtues", primaryKeyword: "large print bible word search", seed: 5006, fixedWords: ["LOVE", "JOY", "PEACE", "FAITH", "HOPE", "GRACE", "MERCY", "KINDNESS"] },
  // Packs
  { themeId: "hard-pack", difficulty: "hard", n: 1, title: "Hard Word Search: Quiet Focus", primaryKeyword: "hard word search", seed: 4001 },
  { themeId: "hard-pack", difficulty: "hard", n: 2, title: "Hard Word Search: Craft & Curiosity", primaryKeyword: "hard word search", seed: 4002 },
  { themeId: "hard-pack", difficulty: "hard", n: 3, title: "Hard Word Search: Labyrinth Letters", primaryKeyword: "hard word search", seed: 4003 },
  { themeId: "large-print-pack", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Word Search: Garden & Home", primaryKeyword: "large print word search", seed: 3001 },
  { themeId: "large-print-pack", difficulty: "easy", n: 2, largePrint: true, title: "Large Print Word Search: Seasons & Strolls", primaryKeyword: "large print word search", seed: 3002 },
  { themeId: "large-print-pack", difficulty: "easy", n: 3, largePrint: true, title: "Large Print Word Search: Kitchen Calm", primaryKeyword: "large print word search", seed: 3003 },
  { themeId: "large-print-pack", difficulty: "easy", n: 4, largePrint: true, title: "Large Print Word Search: Soft Afternoons", primaryKeyword: "large print word search", seed: 3004 },
];

const themes = new Map<string, Theme>(
  readdirSync(themesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const t = JSON.parse(readFileSync(join(themesDir, f), "utf8")) as Theme;
      return [t.id, t];
    }),
);

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const onlyTheme = onlyArg ? onlyArg.slice("--only=".length) : null;

const slugs: string[] = [];
for (const spec of PUZZLE_SPECS) {
  const theme = themes.get(spec.themeId);
  if (!theme) throw new Error(`Unknown theme ${spec.themeId}`);
  const suffix = spec.largePrint ? "large" : spec.difficulty;
  const slug = `${spec.themeId}-${suffix}-${String(spec.n).padStart(2, "0")}`;
  const outPath = join(puzzlesDir, `${slug}.json`);

  // --only=<themeId> regenerates that theme's puzzles and leaves every other grid file untouched.
  if (onlyTheme && spec.themeId !== onlyTheme) {
    if (!existsSync(outPath)) throw new Error(`Missing puzzle ${slug}; run a full generate first`);
    slugs.push(slug);
    continue;
  }

  const size = spec.largePrint ? 9 : SIZES[spec.difficulty];
  const count = spec.largePrint ? 8 : WORD_COUNTS[spec.difficulty];
  let chosen: string[];
  if (spec.fixedWords?.length) {
    chosen = spec.fixedWords.map((w) => w.toUpperCase().replace(/[^A-Z]/g, "")).filter((w) => w.length <= size);
    if (chosen.length < count) {
      throw new Error(`${slug}: fixedWords has ${chosen.length} placeable words, need ${count}`);
    }
    chosen = chosen.slice(0, count);
  } else {
    const rng = createRng(spec.seed * 7 + 13);
    const pool = theme.words.filter((w) => w.length <= size);
    const shuffled = [...pool].sort(() => rng() - 0.5);
    chosen = shuffled.slice(0, count);
  }
  const { grid, placements, skipped } = generateGrid({
    words: chosen,
    size,
    difficulty: spec.difficulty,
    seed: spec.seed,
  });
  if (skipped.length) console.warn(`[${spec.themeId}] skipped: ${skipped.join(", ")}`);
  const puzzle: Puzzle = {
    id: slug,
    slug,
    themeId: spec.themeId,
    title: spec.title,
    primaryKeyword: spec.primaryKeyword,
    difficulty: spec.difficulty,
    gridSize: size,
    largePrint: Boolean(spec.largePrint),
    words: placements.map((p) => p.word).sort(),
    grid,
    placements,
    createdAt: "2026-10-06",
    seed: spec.seed,
  };
  writeFileSync(outPath, JSON.stringify(puzzle, null, 2) + "\n");
  slugs.push(slug);
  console.log(`wrote ${slug} (${size}x${size}, ${placements.length} words)`);
}

const ident = (s: string) => "p_" + s.replace(/-/g, "_");
const registry =
  "// AUTO-GENERATED by scripts/generate-puzzles.ts — do not edit by hand.\n" +
  'import type { Puzzle } from "../../lib/types";\n' +
  slugs.map((s) => `import ${ident(s)} from "./${s}.json";`).join("\n") +
  "\n\nexport const puzzles = [\n" +
  slugs.map((s) => `  ${ident(s)},`).join("\n") +
  "\n] as Puzzle[];\n";
writeFileSync(join(puzzlesDir, "index.ts"), registry);
console.log(`registry: ${slugs.length} puzzles`);
