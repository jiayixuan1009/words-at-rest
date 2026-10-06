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
  // Seasonal — Thanksgiving (fixed sub-topic lists)
  { themeId: "thanksgiving", difficulty: "easy", n: 1, title: "Thanksgiving: Harvest Table", primaryKeyword: "thanksgiving word search", seed: 1121, fixedWords: ["GRAVY", "MAIZE", "CIDER", "ROLL", "YAMS", "PIE", "FEAST", "AUTUMN", "GUEST", "TABLE"] },
  { themeId: "thanksgiving", difficulty: "easy", n: 2, title: "Thanksgiving: Grateful Words", primaryKeyword: "thanksgiving word search", seed: 1122, fixedWords: ["THANKS", "KIND", "SHARE", "HOME", "FAMILY", "WARMTH", "BLESSING", "PEACE", "HARVEST", "JOY"] },
  { themeId: "thanksgiving", difficulty: "medium", n: 1, title: "Thanksgiving: Kitchen Prep", primaryKeyword: "thanksgiving word search", seed: 1123, fixedWords: ["STUFFING", "CRANBERRY", "POTATO", "TURKEY", "CARVING", "GIBLET", "CORNBREAD", "CASSEROLE", "LEFTOVER", "PARSLEY", "BUTTER", "OVEN", "BASTE", "PLATTER"] },
  { themeId: "thanksgiving", difficulty: "medium", n: 2, title: "Thanksgiving: Autumn Walk", primaryKeyword: "thanksgiving word search", seed: 1124, fixedWords: ["GOURD", "ACORN", "SQUASH", "HAYRIDE", "ORCHARD", "CORNFIELD", "FOLIAGE", "PUMPKIN", "SCARECROW", "HARVEST", "CIDER", "BARN", "WAGON", "CORNUCOPIA"] },
  { themeId: "thanksgiving", difficulty: "hard", n: 1, title: "Hard Thanksgiving: Tradition & Travel", primaryKeyword: "thanksgiving word search", seed: 1125, fixedWords: ["PILGRIM", "MAYFLOWER", "PLYMOUTH", "PARADE", "FOOTBALL", "REUNION", "HOSPITALITY", "GRATITUDE", "ABUNDANCE", "PROVISION", "FEASTING", "GATHERING", "HOMESTEAD", "FIREPLACE", "TABLECLOTH", "CENTERPIECE", "WISHBONE", "LEFTOVERS"] },
  { themeId: "thanksgiving", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Thanksgiving: Simple Thanks", primaryKeyword: "large print thanksgiving word search", seed: 1126, fixedWords: ["PIE", "YAMS", "ROLL", "FEAST", "HOME", "THANKS", "WARM", "SHARE"] },
  // Seasonal — Winter
  { themeId: "winter", difficulty: "easy", n: 1, title: "Winter: Snow Day", primaryKeyword: "winter word search", seed: 1201, fixedWords: ["SNOW", "FROST", "COCOA", "MITTEN", "SCARF", "BOOTS", "ICICLE", "FLURRY", "CHILL", "SKATE"] },
  { themeId: "winter", difficulty: "easy", n: 2, title: "Winter: By the Fire", primaryKeyword: "winter word search", seed: 1202, fixedWords: ["BLANKET", "SWEATER", "THERMOS", "WINDOW", "EVENING", "SILENCE", "CANDLE", "WOOL", "HEARTH", "WARM"] },
  { themeId: "winter", difficulty: "medium", n: 1, title: "Winter: Midwinter Words", primaryKeyword: "winter word search", seed: 1203, fixedWords: ["BLIZZARD", "EVERGREEN", "WOODSMOKE", "MITTEN", "SCARF", "BOOTS", "FLURRY", "CHILL", "PARKA", "GLOVES", "SWEATER", "THERMOS", "WINDOW", "HEARTH"] },
  { themeId: "winter", difficulty: "medium", n: 2, title: "Winter: Cold Snap", primaryKeyword: "winter word search", seed: 1204, fixedWords: ["FROSTLINE", "COLDSNAP", "OVERCAST", "TWILIGHT", "SNOWBANK", "WINDCHILL", "FIREWOOD", "SNOWBOUND", "LONGNIGHT", "STILLNESS", "PARKA", "GLOVES", "SHIVER", "ICICLE"] },
  { themeId: "winter", difficulty: "hard", n: 1, title: "Hard Winter: Deep Freeze", primaryKeyword: "winter word search", seed: 1205, fixedWords: ["SNOWFLAKE", "BLIZZARD", "SOLSTICE", "EVERGREEN", "WOODSMOKE", "AVALANCHE", "HIBERNATE", "MIDWINTER", "SNOWDRIFT", "ICECRYSTAL", "FROSTWORK", "WINTERIZE", "WINDCHILL", "SNOWBOUND", "STILLNESS", "TWILIGHT", "FIREWOOD", "NORTHERN"] },
  { themeId: "winter", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Winter: Soft Chill", primaryKeyword: "large print winter word search", seed: 1206, fixedWords: ["SNOW", "FROST", "COCOA", "SCARF", "BOOTS", "CHILL", "WOOL", "WARM"] },
  // Seasonal — Valentine's Day
  { themeId: "valentines", difficulty: "easy", n: 1, title: "Valentine's: Hearts & Notes", primaryKeyword: "valentine word search", seed: 2141, fixedWords: ["HEART", "ROSE", "CARD", "KISS", "LOVE", "NOTE", "BLOOM", "SWEET", "GIFT", "DANCE"] },
  { themeId: "valentines", difficulty: "easy", n: 2, title: "Valentine's: Kind Gestures", primaryKeyword: "valentine word search", seed: 2142, fixedWords: ["HUG", "POEM", "TEA", "FRIEND", "WARMTH", "KINDNESS", "GIFT", "NOTE", "ROSE", "CARD"] },
  { themeId: "valentines", difficulty: "medium", n: 1, title: "Valentine's: Letters & Ribbons", primaryKeyword: "valentine word search", seed: 2143, fixedWords: ["ROMANCE", "LETTER", "ENVELOPE", "RIBBON", "BOUQUET", "CHOCOLATE", "CANDLELIT", "AFFECTION", "DEVOTION", "SWEETHEART", "VALENTINE", "SERENADE", "PROMISE", "CHERISH"] },
  { themeId: "valentines", difficulty: "medium", n: 2, title: "Valentine's: Quiet Affection", primaryKeyword: "valentine word search", seed: 2144, fixedWords: ["TENDERNESS", "ADMIRATION", "HANDHOLD", "WISHLIST", "KEEPSAKE", "MEMENTO", "COURTSHIP", "FONDNESS", "KINDNESS", "WARMTH", "FRIEND", "POEM", "BLOOM", "DANCE"] },
  { themeId: "valentines", difficulty: "hard", n: 1, title: "Hard Valentine's: Deep Fondness", primaryKeyword: "valentine word search", seed: 2145, fixedWords: ["ROMANCE", "ENVELOPE", "CHOCOLATE", "CANDLELIT", "AFFECTION", "DEVOTION", "SWEETHEART", "VALENTINE", "SERENADE", "TENDERNESS", "ADMIRATION", "COURTSHIP", "FONDNESS", "KEEPSAKE", "MEMENTO", "PROMISE", "CHERISH", "BOUQUET"] },
  { themeId: "valentines", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Valentine's: Soft Words", primaryKeyword: "large print valentine word search", seed: 2146, fixedWords: ["HEART", "ROSE", "LOVE", "CARD", "GIFT", "SWEET", "NOTE", "KISS"] },
  // Seasonal — Easter
  { themeId: "easter", difficulty: "easy", n: 1, title: "Easter: Spring Morning", primaryKeyword: "easter word search", seed: 4011, fixedWords: ["EGG", "BASKET", "LILY", "SPRING", "DAWN", "BLOOM", "CHICK", "LAMB", "GRASS", "HARE"] },
  { themeId: "easter", difficulty: "easy", n: 2, title: "Easter: Quiet Hope", primaryKeyword: "easter word search", seed: 4012, fixedWords: ["HOPE", "JOY", "PEACE", "FAITH", "GRACE", "LIGHT", "DAWN", "LILY", "NEST", "BLOOM"] },
  { themeId: "easter", difficulty: "medium", n: 1, title: "Easter: Garden Blooms", primaryKeyword: "easter word search", seed: 4013, fixedWords: ["DAFFODIL", "TULIP", "BLOSSOM", "HATCH", "PASTEL", "BONNET", "PARADE", "SUNRISE", "REFRESH", "GARDEN", "WILLOW", "NEST", "MEADOW", "VIOLET"] },
  { themeId: "easter", difficulty: "medium", n: 2, title: "Easter: Chapel & Hymn", primaryKeyword: "easter word search", seed: 4014, fixedWords: ["REBIRTH", "RENEWAL", "HYMN", "CHAPEL", "SERVICE", "ALLELUIA", "PASCHAL", "MORNING", "CROSS", "FAITH", "GRACE", "HOPE", "PEACE", "LIGHT"] },
  { themeId: "easter", difficulty: "hard", n: 1, title: "Hard Easter: Spring Awakening", primaryKeyword: "easter word search", seed: 4015, fixedWords: ["DAFFODIL", "BLOSSOM", "SUNRISE", "REFRESH", "WILLOW", "MEADOW", "REBIRTH", "RENEWAL", "ALLELUIA", "PASCHAL", "MORNING", "CROCUSES", "PRIMROSE", "BLUEBELL", "HATCHLING", "SERVICE", "CHAPEL", "VIOLET"] },
  { themeId: "easter", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Easter: Soft Dawn", primaryKeyword: "large print easter word search", seed: 4016, fixedWords: ["EGG", "LILY", "DAWN", "LAMB", "NEST", "BLOOM", "SPRING", "HOPE"] },
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

  // Sub-themes — Sports children
  { themeId: "golf", difficulty: "easy", n: 1, title: "Golf: On the Tee", primaryKeyword: "golf word search", seed: 6011, fixedWords: ["TEE", "PAR", "PUTT", "DRIVE", "SWING", "GREEN", "FLAG", "IRON", "WOOD", "CUP"] },
  { themeId: "golf", difficulty: "easy", n: 2, title: "Golf: Scorecard Basics", primaryKeyword: "golf word search", seed: 6012, fixedWords: ["BOGEY", "BIRDIE", "EAGLE", "FORE", "PIN", "GRIP", "STANCE", "CHIP", "LOB", "HOLE"] },
  { themeId: "golf", difficulty: "medium", n: 1, title: "Golf: Fairway & Rough", primaryKeyword: "golf word search", seed: 6013, fixedWords: ["FAIRWAY", "BUNKER", "HAZARD", "ROUGH", "DIVOT", "WEDGE", "DRIVER", "PUTTER", "STROKE", "CADDIE", "LINKS", "COURSE", "FOLLOW", "MATCH"] },
  { themeId: "golf", difficulty: "medium", n: 2, title: "Golf: Approach Shots", primaryKeyword: "golf word search", seed: 6014, fixedWords: ["APPROACH", "BACKSWING", "SANDTRAP", "HANDICAP", "SCORECARD", "MULLIGAN", "FAIRWAY", "BUNKER", "WEDGE", "CHIP", "PUTT", "GREEN", "FLAG", "PAR"] },
  { themeId: "golf", difficulty: "hard", n: 1, title: "Hard Golf: Full Round", primaryKeyword: "golf word search", seed: 6015, fixedWords: ["FAIRWAY", "BUNKER", "HAZARD", "HANDICAP", "SCORECARD", "MULLIGAN", "SANDTRAP", "APPROACH", "BACKSWING", "CADDIE", "DRIVER", "PUTTER", "STROKE", "LINKS", "COURSE", "BIRDIE", "EAGLE", "BOGEY"] },
  { themeId: "golf", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Golf: Quiet Green", primaryKeyword: "large print golf word search", seed: 6016, fixedWords: ["TEE", "PAR", "PUTT", "GREEN", "FLAG", "IRON", "CUP", "HOLE"] },

  { themeId: "baseball", difficulty: "easy", n: 1, title: "Baseball: Diamond Basics", primaryKeyword: "baseball word search", seed: 6021, fixedWords: ["BAT", "BALL", "BASE", "GLOVE", "MITT", "HIT", "RUN", "CAP", "THROW", "CATCH"] },
  { themeId: "baseball", difficulty: "easy", n: 2, title: "Baseball: In the Field", primaryKeyword: "baseball word search", seed: 6022, fixedWords: ["PITCH", "BUNT", "FOUL", "TAG", "FORCE", "STEAL", "SINGLE", "DOUBLE", "TRIPLE", "CLEATS"] },
  { themeId: "baseball", difficulty: "medium", n: 1, title: "Baseball: Positions", primaryKeyword: "baseball word search", seed: 6023, fixedWords: ["INNING", "DIAMOND", "DUGOUT", "OUTFIELD", "INFIELD", "CATCHER", "PITCHER", "UMPIRE", "STRIKE", "SLIDER", "CURVE", "RELAY", "LINEUP", "WARMUP"] },
  { themeId: "baseball", difficulty: "medium", n: 2, title: "Baseball: Pitch & Swing", primaryKeyword: "baseball word search", seed: 6024, fixedWords: ["FASTBALL", "HOMERUN", "SHORTSTOP", "BULLPEN", "SCOREBOOK", "BALLFOUR", "OUTFIELD", "INFIELD", "SLIDER", "CURVE", "BUNT", "STEAL", "FORCE", "RELAY"] },
  { themeId: "baseball", difficulty: "hard", n: 1, title: "Hard Baseball: Full Box Score", primaryKeyword: "baseball word search", seed: 6025, fixedWords: ["SHORTSTOP", "OUTFIELD", "INFIELD", "FASTBALL", "HOMERUN", "BULLPEN", "SCOREBOOK", "BALLFOUR", "DIAMOND", "DUGOUT", "CATCHER", "PITCHER", "UMPIRE", "LINEUP", "WARMUP", "SLIDER", "CURVE", "RELAY"] },
  { themeId: "baseball", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Baseball: Easy Inning", primaryKeyword: "large print baseball word search", seed: 6026, fixedWords: ["BAT", "BALL", "BASE", "HIT", "RUN", "GLOVE", "CAP", "MITT"] },

  { themeId: "tennis", difficulty: "easy", n: 1, title: "Tennis: Court Basics", primaryKeyword: "tennis word search", seed: 6031, fixedWords: ["ACE", "SERVE", "RALLY", "NET", "LET", "SET", "MATCH", "SPIN", "LOB", "GRIP"] },
  { themeId: "tennis", difficulty: "easy", n: 2, title: "Tennis: Stroke Names", primaryKeyword: "tennis word search", seed: 6032, fixedWords: ["VOLLEY", "SMASH", "DROP", "SLICE", "TOSS", "RETURN", "COURT", "FAULT", "CLAY", "GRASS"] },
  { themeId: "tennis", difficulty: "medium", n: 1, title: "Tennis: Baseline Play", primaryKeyword: "tennis word search", seed: 6033, fixedWords: ["FOREHAND", "BACKHAND", "BASELINE", "ADVANTAGE", "DEUCE", "RACKET", "RACQUET", "UMPIRE", "SINGLES", "DOUBLES", "FOOTWORK", "WINNER", "PASSING", "APPROACH"] },
  { themeId: "tennis", difficulty: "medium", n: 2, title: "Tennis: Match Point", primaryKeyword: "tennis word search", seed: 6034, fixedWords: ["TIEBREAK", "HARDCOURT", "LINESMAN", "BALLBOY", "UNFORCED", "DOUBLEFAULT", "FOREHAND", "BACKHAND", "ADVANTAGE", "BASELINE", "FOOTWORK", "RETURN", "VOLLEY", "SMASH"] },
  { themeId: "tennis", difficulty: "hard", n: 1, title: "Hard Tennis: Full Court", primaryKeyword: "tennis word search", seed: 6035, fixedWords: ["FOREHAND", "BACKHAND", "ADVANTAGE", "BASELINE", "TIEBREAK", "HARDCOURT", "DOUBLEFAULT", "FOOTWORK", "UNFORCED", "PASSING", "APPROACH", "LINESMAN", "SINGLES", "DOUBLES", "RACQUET", "UMPIRE", "WINNER", "RALLY"] },
  { themeId: "tennis", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Tennis: Soft Rally", primaryKeyword: "large print tennis word search", seed: 6036, fixedWords: ["ACE", "SERVE", "NET", "SET", "LOB", "GRIP", "SPIN", "COURT"] },

  { themeId: "fishing", difficulty: "easy", n: 1, title: "Fishing: Rod & Reel", primaryKeyword: "fishing word search", seed: 6041, fixedWords: ["ROD", "REEL", "LINE", "HOOK", "BAIT", "LURE", "CAST", "NET", "DOCK", "HAT"] },
  { themeId: "fishing", difficulty: "easy", n: 2, title: "Fishing: By the Water", primaryKeyword: "fishing word search", seed: 6042, fixedWords: ["LAKE", "POND", "RIVER", "TIDE", "SHORE", "PIER", "BOAT", "FLY", "CATCH", "VEST"] },
  { themeId: "fishing", difficulty: "medium", n: 1, title: "Fishing: Tackle Box", primaryKeyword: "fishing word search", seed: 6043, fixedWords: ["TACKLE", "SINKER", "LEADER", "BOBBER", "FLOAT", "NYMPH", "STREAM", "CURRENT", "EDDY", "WADER", "CREEL", "KAYAK", "REELIN", "COOLER"] },
  { themeId: "fishing", difficulty: "medium", n: 2, title: "Fishing: Freshwater Catch", primaryKeyword: "fishing word search", seed: 6044, fixedWords: ["TROUT", "BASS", "SALMON", "PERCH", "CATFISH", "RELEASE", "CURRENT", "STREAM", "WADER", "CREEL", "TACKLE", "SINKER", "LEADER", "SHORE"] },
  { themeId: "fishing", difficulty: "hard", n: 1, title: "Hard Fishing: Full Day Out", primaryKeyword: "fishing word search", seed: 6045, fixedWords: ["TACKLE", "SINKER", "LEADER", "BOBBER", "CURRENT", "RELEASE", "CATFISH", "SALMON", "TROUT", "STREAM", "WADER", "CREEL", "KAYAK", "REELIN", "NYMPH", "FLOAT", "EDDY", "COOLER"] },
  { themeId: "fishing", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Fishing: Quiet Shore", primaryKeyword: "large print fishing word search", seed: 6046, fixedWords: ["ROD", "REEL", "LINE", "HOOK", "BAIT", "LAKE", "CAST", "NET"] },

  // Sub-themes — Food children
  { themeId: "baking", difficulty: "easy", n: 1, title: "Baking: Pantry Basics", primaryKeyword: "baking word search", seed: 6111, fixedWords: ["FLOUR", "YEAST", "DOUGH", "OVEN", "BAKE", "MIX", "EGG", "MILK", "SALT", "ROLL"] },
  { themeId: "baking", difficulty: "easy", n: 2, title: "Baking: Sweet Shelf", primaryKeyword: "baking word search", seed: 6112, fixedWords: ["SUGAR", "BUTTER", "CREAM", "LOAF", "BUN", "PIE", "TART", "ICING", "GLAZE", "RACK"] },
  { themeId: "baking", difficulty: "medium", n: 1, title: "Baking: Technique", primaryKeyword: "baking word search", seed: 6113, fixedWords: ["KNEAD", "PROOF", "PREHEAT", "WHISK", "FOLD", "BATTER", "CRUST", "CRUMB", "MUFFIN", "SCONE", "PASTRY", "VANILLA", "CINNAMON", "STEAM"] },
  { themeId: "baking", difficulty: "medium", n: 2, title: "Baking: Oven Day", primaryKeyword: "baking word search", seed: 6114, fixedWords: ["COOKIE", "BISCUIT", "FROST", "SCORE", "ZEST", "TIMER", "PREHEAT", "PROOF", "KNEAD", "BATTER", "CRUST", "MUFFIN", "SCONE", "PASTRY"] },
  { themeId: "baking", difficulty: "hard", n: 1, title: "Hard Baking: Full Bake", primaryKeyword: "baking word search", seed: 6115, fixedWords: ["PREHEAT", "KNEAD", "PROOF", "BATTER", "CRUST", "CRUMB", "MUFFIN", "SCONE", "PASTRY", "VANILLA", "CINNAMON", "COOKIE", "BISCUIT", "FROST", "SCORE", "STEAM", "WHISK", "TIMER"] },
  { themeId: "baking", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Baking: Warm Loaf", primaryKeyword: "large print baking word search", seed: 6116, fixedWords: ["FLOUR", "YEAST", "DOUGH", "OVEN", "BAKE", "LOAF", "ROLL", "PIE"] },

  { themeId: "desserts", difficulty: "easy", n: 1, title: "Desserts: Sweet Basics", primaryKeyword: "desserts word search", seed: 6121, fixedWords: ["CAKE", "PIE", "TART", "CREAM", "ICING", "SLICE", "SCOOP", "SPOON", "PLATE", "BAKE"] },
  { themeId: "desserts", difficulty: "easy", n: 2, title: "Desserts: Cold Treats", primaryKeyword: "desserts word search", seed: 6122, fixedWords: ["SORBET", "GELATO", "SUNDAE", "MOUSSE", "FUDGE", "TOFFEE", "BERRY", "CHILL", "WHIP", "SERVE"] },
  { themeId: "desserts", difficulty: "medium", n: 1, title: "Desserts: Bakery Case", primaryKeyword: "desserts word search", seed: 6123, fixedWords: ["PUDDING", "CUSTARD", "PARFAIT", "BROWNIE", "COOKIE", "TRIFLE", "COBBLER", "CRUMBLE", "MERINGUE", "GANACHE", "CARAMEL", "LAYER", "FROSTING", "VANILLA"] },
  { themeId: "desserts", difficulty: "medium", n: 2, title: "Desserts: After Dinner", primaryKeyword: "desserts word search", seed: 6124, fixedWords: ["SHORTCAKE", "CHEESECAKE", "ECLAIR", "TRUFFLE", "CHOCOLATE", "PROFITEROLE", "COBBLER", "CRUMBLE", "MERINGUE", "GANACHE", "PARFAIT", "CUSTARD", "BROWNIE", "TRIFLE"] },
  { themeId: "desserts", difficulty: "hard", n: 1, title: "Hard Desserts: Pastry Cart", primaryKeyword: "desserts word search", seed: 6125, fixedWords: ["CHEESECAKE", "SHORTCAKE", "PROFITEROLE", "CHOCOLATE", "MERINGUE", "GANACHE", "CARAMEL", "COBBLER", "CRUMBLE", "PARFAIT", "CUSTARD", "BROWNIE", "TRUFFLE", "ECLAIR", "FROSTING", "VANILLA", "TRIFLE", "PUDDING"] },
  { themeId: "desserts", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Desserts: Soft Sweet", primaryKeyword: "large print desserts word search", seed: 6126, fixedWords: ["CAKE", "PIE", "TART", "CREAM", "FUDGE", "SCOOP", "SLICE", "BAKE"] },

  { themeId: "herbs", difficulty: "easy", n: 1, title: "Herbs: Kitchen Garden", primaryKeyword: "herbs and spices word search", seed: 6131, fixedWords: ["BASIL", "THYME", "MINT", "DILL", "SAGE", "BAY", "HERB", "SALT", "GARLIC", "ONION"] },
  { themeId: "herbs", difficulty: "easy", n: 2, title: "Herbs: Fresh Leaves", primaryKeyword: "herbs and spices word search", seed: 6132, fixedWords: ["PARSLEY", "CHIVES", "PEPPER", "SPICE", "BLEND", "GINGER", "CHILI", "ANISE", "FENNEL", "CLOVE"] },
  { themeId: "herbs", difficulty: "medium", n: 1, title: "Spices: Warm Pantry", primaryKeyword: "herbs and spices word search", seed: 6133, fixedWords: ["ROSEMARY", "OREGANO", "CILANTRO", "TARRAGON", "CUMIN", "PAPRIKA", "TURMERIC", "SAFFRON", "CINNAMON", "NUTMEG", "CARDAMOM", "ALLSPICE", "MUSTARD", "CAYENNE"] },
  { themeId: "herbs", difficulty: "medium", n: 2, title: "Spices: World Shelf", primaryKeyword: "herbs and spices word search", seed: 6134, fixedWords: ["CORIANDER", "STARANISE", "SHALLOT", "VANILLA", "SUMAC", "ZATAR", "SAFFRON", "TURMERIC", "CARDAMOM", "PAPRIKA", "ROSEMARY", "OREGANO", "CILANTRO", "CINNAMON"] },
  { themeId: "herbs", difficulty: "hard", n: 1, title: "Hard Herbs & Spices: Full Rack", primaryKeyword: "herbs and spices word search", seed: 6135, fixedWords: ["ROSEMARY", "OREGANO", "CILANTRO", "TARRAGON", "CORIANDER", "TURMERIC", "SAFFRON", "CINNAMON", "CARDAMOM", "ALLSPICE", "STARANISE", "MUSTARD", "CAYENNE", "SHALLOT", "VANILLA", "PAPRIKA", "CUMIN", "NUTMEG"] },
  { themeId: "herbs", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Herbs: Soft Pinch", primaryKeyword: "large print herbs word search", seed: 6136, fixedWords: ["BASIL", "THYME", "MINT", "SAGE", "DILL", "HERB", "SALT", "BAY"] },

  { themeId: "fruits", difficulty: "easy", n: 1, title: "Fruits: Orchard Basket", primaryKeyword: "fruits word search", seed: 6141, fixedWords: ["APPLE", "PEAR", "PEACH", "PLUM", "GRAPE", "MELON", "LEMON", "LIME", "FIG", "DATE"] },
  { themeId: "fruits", difficulty: "easy", n: 2, title: "Fruits: Citrus Bowl", primaryKeyword: "fruits word search", seed: 6142, fixedWords: ["ORANGE", "BANANA", "MANGO", "KIWI", "BERRY", "OLIVE", "PRUNE", "RAISIN", "CHERRY", "QUINCE"] },
  { themeId: "fruits", difficulty: "medium", n: 1, title: "Fruits: Berry Patch", primaryKeyword: "fruits word search", seed: 6153, fixedWords: ["APRICOT", "PAPAYA", "ORANGE", "BANANA", "MANGO", "CHERRY", "MELON", "GRAPE", "LEMON", "PEACH", "PLUM", "APPLE", "PEAR", "KIWI"] },
  { themeId: "fruits", difficulty: "medium", n: 2, title: "Fruits: Market Stall", primaryKeyword: "fruits word search", seed: 6154, fixedWords: ["ORANGE", "BANANA", "MANGO", "PAPAYA", "COCONUT", "AVOCADO", "CHERRY", "APRICOT", "RAISIN", "PRUNE", "OLIVE", "QUINCE", "FIG", "DATE"] },
  { themeId: "fruits", difficulty: "hard", n: 1, title: "Hard Fruits: Full Harvest", primaryKeyword: "fruits word search", seed: 6145, fixedWords: ["STRAWBERRY", "BLUEBERRY", "RASPBERRY", "BLACKBERRY", "CRANBERRY", "PINEAPPLE", "GRAPEFRUIT", "POMEGRANATE", "CLEMENTINE", "GOOSEBERRY", "PERSIMMON", "NECTARINE", "TANGERINE", "COCONUT", "AVOCADO", "PAPAYA", "APRICOT", "MULBERRY"] },
  { themeId: "fruits", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Fruits: Soft Basket", primaryKeyword: "large print fruits word search", seed: 6146, fixedWords: ["APPLE", "PEAR", "PEACH", "GRAPE", "LEMON", "MELON", "MANGO", "BERRY"] },

  // Sub-themes — Music children
  { themeId: "instruments", difficulty: "easy", n: 1, title: "Instruments: Strings", primaryKeyword: "musical instruments word search", seed: 6211, fixedWords: ["VIOLIN", "VIOLA", "CELLO", "BASS", "HARP", "GUITAR", "BANJO", "LUTE", "PIANO", "ORGAN"] },
  { themeId: "instruments", difficulty: "easy", n: 2, title: "Instruments: Wind & Brass", primaryKeyword: "musical instruments word search", seed: 6212, fixedWords: ["FLUTE", "OBOE", "HORN", "TUBA", "DRUM", "GONG", "BELLS", "CORNET", "PICCOLO", "KOTO"] },
  { themeId: "instruments", difficulty: "medium", n: 1, title: "Instruments: Orchestra Pit", primaryKeyword: "musical instruments word search", seed: 6213, fixedWords: ["CLARINET", "BASSOON", "TRUMPET", "TROMBONE", "CYMBAL", "TIMPANI", "MARIMBA", "RECORDER", "UKULELE", "SITAR", "BAGPIPE", "HARMONICA", "MANDOLIN", "TRIANGLE"] },
  { themeId: "instruments", difficulty: "medium", n: 2, title: "Instruments: World Stage", primaryKeyword: "musical instruments word search", seed: 6254, fixedWords: ["CLARINET", "BASSOON", "TRUMPET", "TROMBONE", "CYMBAL", "TIMPANI", "MARIMBA", "RECORDER", "UKULELE", "SITAR", "HARMONICA", "MANDOLIN", "TRIANGLE", "PICCOLO"] },
  { themeId: "instruments", difficulty: "hard", n: 1, title: "Hard Instruments: Full Ensemble", primaryKeyword: "musical instruments word search", seed: 6215, fixedWords: ["SAXOPHONE", "ACCORDION", "TAMBOURINE", "XYLOPHONE", "CLARINET", "BASSOON", "TRUMPET", "TROMBONE", "TIMPANI", "MARIMBA", "HARMONICA", "MANDOLIN", "UKULELE", "BAGPIPE", "CASTANET", "TRIANGLE", "RECORDER", "PICCOLO"] },
  { themeId: "instruments", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Instruments: Soft Duo", primaryKeyword: "large print instruments word search", seed: 6216, fixedWords: ["PIANO", "FLUTE", "HARP", "DRUM", "HORN", "BASS", "LUTE", "BELLS"] },

  { themeId: "jazz", difficulty: "easy", n: 1, title: "Jazz: Night Basics", primaryKeyword: "jazz word search", seed: 6221, fixedWords: ["JAZZ", "SWING", "BLUES", "SOLO", "RIFF", "JAM", "CLUB", "MUTE", "HEAD", "HORN"] },
  { themeId: "jazz", difficulty: "easy", n: 2, title: "Jazz: Small Combo", primaryKeyword: "jazz word search", seed: 6222, fixedWords: ["COMBO", "SAX", "BASS", "PIANO", "DRUMS", "GROOVE", "LICK", "SCAT", "WALK", "VOCAL"] },
  { themeId: "jazz", difficulty: "medium", n: 1, title: "Jazz: Session Night", primaryKeyword: "jazz word search", seed: 6223, fixedWords: ["BEBOP", "IMPROVISE", "QUARTET", "QUINTET", "TRUMPET", "BRUSHES", "CHORUS", "BRIDGE", "BALLAD", "SESSION", "CABARET", "STRIDE", "CHANGES", "MELODY"] },
  { themeId: "jazz", difficulty: "medium", n: 2, title: "Jazz: Groove & Form", primaryKeyword: "jazz word search", seed: 6224, fixedWords: ["STANDARDS", "POLYRHYTHM", "BLUENOTE", "TURNAROUND", "RHYTHM", "IMPROVISE", "QUARTET", "BALLAD", "SESSION", "CABARET", "STRIDE", "CHANGES", "CHORUS", "BRIDGE"] },
  { themeId: "jazz", difficulty: "hard", n: 1, title: "Hard Jazz: Late Set", primaryKeyword: "jazz word search", seed: 6225, fixedWords: ["IMPROVISE", "POLYRHYTHM", "STANDARDS", "TURNAROUND", "BLUENOTE", "QUARTET", "QUINTET", "TRUMPET", "BRUSHES", "CABARET", "SESSION", "BALLAD", "CHANGES", "STRIDE", "CHORUS", "BRIDGE", "MELODY", "RHYTHM"] },
  { themeId: "jazz", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Jazz: Soft Swing", primaryKeyword: "large print jazz word search", seed: 6226, fixedWords: ["JAZZ", "SWING", "BLUES", "SOLO", "RIFF", "JAM", "MUTE", "HORN"] },

  { themeId: "classical", difficulty: "easy", n: 1, title: "Classical: Forms", primaryKeyword: "classical music word search", seed: 6231, fixedWords: ["SONATA", "OPERA", "SUITE", "ARIA", "DUET", "TRIO", "TEMPO", "THEME", "SCORE", "BATON"] },
  { themeId: "classical", difficulty: "easy", n: 2, title: "Classical: Tempo Marks", primaryKeyword: "classical music word search", seed: 6232, fixedWords: ["ALLEGRO", "ADAGIO", "LARGO", "FORTE", "PIANO", "LEGATO", "MOTIF", "FINALE", "CHOIR", "ETUDE"] },
  { themeId: "classical", difficulty: "medium", n: 1, title: "Classical: Concert Hall", primaryKeyword: "classical music word search", seed: 6233, fixedWords: ["SYMPHONY", "CONCERTO", "OVERTURE", "PRELUDE", "FUGUE", "NOCTURNE", "QUARTET", "ORCHESTRA", "ANDANTE", "PRESTO", "VIVACE", "STACCATO", "MOVEMENT", "SOLOIST"] },
  { themeId: "classical", difficulty: "medium", n: 2, title: "Classical: Score Study", primaryKeyword: "classical music word search", seed: 6234, fixedWords: ["CRESCENDO", "DIMINUENDO", "CONDUCTOR", "CADENZA", "VARIATION", "REPRISE", "SYMPHONY", "CONCERTO", "OVERTURE", "NOCTURNE", "ORCHESTRA", "MOVEMENT", "SOLOIST", "STACCATO"] },
  { themeId: "classical", difficulty: "hard", n: 1, title: "Hard Classical: Full Programme", primaryKeyword: "classical music word search", seed: 6235, fixedWords: ["SYMPHONY", "CONCERTO", "OVERTURE", "PRELUDE", "NOCTURNE", "ORCHESTRA", "CRESCENDO", "DIMINUENDO", "CONDUCTOR", "CADENZA", "VARIATION", "REPRISE", "MOVEMENT", "SOLOIST", "STACCATO", "ANDANTE", "PRESTO", "VIVACE"] },
  { themeId: "classical", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Classical: Soft Aria", primaryKeyword: "large print classical word search", seed: 6236, fixedWords: ["ARIA", "DUET", "TEMPO", "THEME", "SCORE", "SUITE", "CHOIR", "PIANO"] },

  { themeId: "music-terms", difficulty: "easy", n: 1, title: "Musical Terms: Basics", primaryKeyword: "musical terms word search", seed: 6241, fixedWords: ["TEMPO", "BEAT", "NOTE", "REST", "KEY", "CLEF", "FLAT", "SHARP", "TONE", "PITCH"] },
  { themeId: "music-terms", difficulty: "easy", n: 2, title: "Musical Terms: On the Staff", primaryKeyword: "musical terms word search", seed: 6242, fixedWords: ["SCALE", "CHORD", "BAR", "SLUR", "TIE", "HALF", "WHOLE", "TIME", "STAFF", "METER"] },
  { themeId: "music-terms", difficulty: "medium", n: 1, title: "Musical Terms: Theory Desk", primaryKeyword: "musical terms word search", seed: 6243, fixedWords: ["RHYTHM", "MELODY", "HARMONY", "OCTAVE", "INTERVAL", "MEASURE", "NATURAL", "ACCENT", "FERMATA", "QUARTER", "TRILL", "VOLUME", "UNISON", "PHRASE"] },
  { themeId: "music-terms", difficulty: "medium", n: 2, title: "Musical Terms: Rehearsal Marks", primaryKeyword: "musical terms word search", seed: 6264, fixedWords: ["DYNAMICS", "CADENCE", "SIGNATURE", "HARMONIZE", "MODULATE", "LEDGER", "INTERVAL", "FERMATA", "OCTAVE", "MEASURE", "QUARTER", "PHRASE", "VOLUME", "TRILL"] },
  { themeId: "music-terms", difficulty: "hard", n: 1, title: "Hard Musical Terms: Full Lexicon", primaryKeyword: "musical terms word search", seed: 6245, fixedWords: ["RHYTHM", "MELODY", "HARMONY", "INTERVAL", "MEASURE", "FERMATA", "DYNAMICS", "CADENCE", "SIGNATURE", "HARMONIZE", "MODULATE", "OCTAVE", "NATURAL", "ACCENT", "QUARTER", "VOLUME", "UNISON", "PHRASE"] },
  { themeId: "music-terms", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Musical Terms: Soft Beat", primaryKeyword: "large print musical terms word search", seed: 6246, fixedWords: ["TEMPO", "BEAT", "NOTE", "REST", "KEY", "CLEF", "FLAT", "TONE"] },

  // Wave C — holidays wave 2 + kitchen/nature (competitor-aligned, IP-safe)
  { themeId: "new-year", difficulty: "easy", n: 1, title: "New Year: Countdown Night", primaryKeyword: "new year word search", seed: 7011, fixedWords: ["YEAR","CLOCK","TOAST","WISH","HOPE","FRESH","START","DAWN","PARTY","BALLOON"] },
    { themeId: "new-year", difficulty: "easy", n: 2, title: "New Year: Fresh Start", primaryKeyword: "new year word search", seed: 7012, fixedWords: ["JANUARY","CALENDAR","PLAN","GOAL","HABIT","CHANGE","PEACE","JOY","OPENING","MORNING"] },
    { themeId: "new-year", difficulty: "medium", n: 1, title: "New Year: Resolutions", primaryKeyword: "new year word search", seed: 7013, fixedWords: ["MIDNIGHT","COUNTDOWN","FIREWORK","CONFETTI","RESOLUTION","PROMISE","FUTURE","MEMORY","CELEBRATE","SPARKLER","STREAMER","INTENTION","REFRESH","RENEW"] },
    { themeId: "new-year", difficulty: "medium", n: 2, title: "New Year: Quiet January", primaryKeyword: "new year word search", seed: 7014, fixedWords: ["FIREWORKS","NOISEMAKER","GRATITUDE","REFLECT","JOURNAL","COURAGE","PATIENCE","KINDNESS","HORIZON","OUTLOOK","CHAMPAGNE","BEGIN","FOCUS","HEALTH"] },
    { themeId: "new-year", difficulty: "hard", n: 1, title: "Hard New Year: Full Calendar", primaryKeyword: "new year word search", seed: 7015, fixedWords: ["MIDNIGHT","COUNTDOWN","FIREWORKS","RESOLUTION","CELEBRATE","NOISEMAKER","INTENTION","GRATITUDE","REFLECT","JOURNAL","PATIENCE","KINDNESS","HORIZON","OUTLOOK","CONFETTI","SPARKLER","CHAMPAGNE","MEMORY"] },
    { themeId: "new-year", difficulty: "easy", n: 1, largePrint: true, title: "Large Print New Year: Soft Dawn", primaryKeyword: "large print new year word search", seed: 7016, fixedWords: ["YEAR","TOAST","WISH","HOPE","DAWN","PLAN","JOY","PEACE"] },
  
    { themeId: "st-patricks", difficulty: "easy", n: 1, title: "St. Patrick's: Green Hills", primaryKeyword: "st patricks day word search", seed: 7021, fixedWords: ["GREEN","CLOVER","IRISH","PIPE","HARP","DANCE","PARADE","MARCH","RAIN","LUCK"] },
    { themeId: "st-patricks", difficulty: "easy", n: 2, title: "St. Patrick's: Quiet Luck", primaryKeyword: "st patricks day word search", seed: 7022, fixedWords: ["SHAMROCK","HILL","STONE","COAST","MIST","CHARM","TOAST","TEA","SONG","JOY"] },
    { themeId: "st-patricks", difficulty: "medium", n: 1, title: "St. Patrick's: Emerald Day", primaryKeyword: "st patricks day word search", seed: 7023, fixedWords: ["EMERALD","CELTIC","GAELIC","BAGPIPE","FIDDLE","POTATO","CABBAGE","LEGEND","FOLKLORE","BLESSING","RAINBOW","CHURCH","SAINT","SPRING"] },
    { themeId: "st-patricks", difficulty: "medium", n: 2, title: "St. Patrick's: Spring March", primaryKeyword: "st patricks day word search", seed: 7024, fixedWords: ["TINWHISTLE","CASTLE","BUTTER","HONEY","THYME","VERSE","WISH","HOPE","CROSS","SAINT","EMERALD","PARADE","CLOVER","FIDDLE"] },
    { themeId: "st-patricks", difficulty: "hard", n: 1, title: "Hard St. Patrick's: Full Parade", primaryKeyword: "st patricks day word search", seed: 7025, fixedWords: ["SHAMROCK","EMERALD","CELTIC","GAELIC","BAGPIPE","TINWHISTLE","FOLKLORE","BLESSING","RAINBOW","POTATO","CABBAGE","CASTLE","PARADE","LEGEND","FIDDLE","CHURCH","SPRING","IRELAND"] },
    { themeId: "st-patricks", difficulty: "easy", n: 1, largePrint: true, title: "Large Print St. Patrick's: Soft Clover", primaryKeyword: "large print st patricks day word search", seed: 7026, fixedWords: ["GREEN","CLOVER","PIPE","HARP","LUCK","RAIN","TEA","JOY"] },
  
    { themeId: "mothers-day", difficulty: "easy", n: 1, title: "Mother's Day: Morning Card", primaryKeyword: "mothers day word search", seed: 7031, fixedWords: ["MOTHER","MOM","CARD","ROSE","HUG","LOVE","THANKS","HOME","TEA","GIFT"] },
    { themeId: "mothers-day", difficulty: "easy", n: 2, title: "Mother's Day: Gentle Thanks", primaryKeyword: "mothers day word search", seed: 7032, fixedWords: ["MAMA","TULIP","LILY","VASE","NOTE","POEM","RIBBON","MAY","CARE","WARM"] },
    { themeId: "mothers-day", difficulty: "medium", n: 1, title: "Mother's Day: Bloom & Note", primaryKeyword: "mothers day word search", seed: 7033, fixedWords: ["BOUQUET","FLOWER","BREAKFAST","PANCAKE","COFFEE","LETTER","PHOTO","GARDEN","BLOOM","FAMILY","QUILT","APRON","KITCHEN","LAUGH"] },
    { themeId: "mothers-day", difficulty: "medium", n: 2, title: "Mother's Day: Quiet May", primaryKeyword: "mothers day word search", seed: 7034, fixedWords: ["GRATITUDE","BLESSING","CHERISH","ADMIRE","HONOR","RESPECT","PATIENCE","COMFORT","SUPPORT","WISDOM","MEMORY","STORY","LISTEN","SHARE"] },
    { themeId: "mothers-day", difficulty: "hard", n: 1, title: "Hard Mother's Day: Full Bouquet", primaryKeyword: "mothers day word search", seed: 7035, fixedWords: ["BOUQUET","BREAKFAST","GRATITUDE","BLESSING","CHERISH","PATIENCE","COMFORT","SUPPORT","WISDOM","MEMORY","FAMILY","KITCHEN","PANCAKE","LETTER","RESPECT","HONOR","LISTEN","SHARE"] },
    { themeId: "mothers-day", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Mother's Day: Soft Hug", primaryKeyword: "large print mothers day word search", seed: 7036, fixedWords: ["MOM","ROSE","HUG","LOVE","CARD","TEA","GIFT","HOME"] },
  
    { themeId: "fathers-day", difficulty: "easy", n: 1, title: "Father's Day: Porch Morning", primaryKeyword: "fathers day word search", seed: 7041, fixedWords: ["FATHER","DAD","CARD","TIE","TOOLS","GRILL","LAWN","HUG","THANKS","HOME"] },
    { themeId: "fathers-day", difficulty: "easy", n: 2, title: "Father's Day: Quiet Pride", primaryKeyword: "fathers day word search", seed: 7042, fixedWords: ["PAPA","SOCK","HAMMER","PATIO","SHED","MUG","CHAIR","JUNE","PRIDE","REST"] },
    { themeId: "fathers-day", difficulty: "medium", n: 1, title: "Father's Day: Tools & Thanks", primaryKeyword: "fathers day word search", seed: 7043, fixedWords: ["FISHING","WORKSHOP","NEWSPAPER","GARAGE","MOWER","WRENCH","COFFEE","FAMILY","WISDOM","ADVICE","PATIENCE","STRENGTH","MEMORY","STORY"] },
    { themeId: "fathers-day", difficulty: "medium", n: 2, title: "Father's Day: June Sunday", primaryKeyword: "fathers day word search", seed: 7044, fixedWords: ["SUPPORT","COMFORT","RESPECT","HONOR","LISTEN","SHARE","PORCH","RADIO","CATCH","TRAIL","CAMP","BENCH","GUIDE","TEACH"] },
    { themeId: "fathers-day", difficulty: "hard", n: 1, title: "Hard Father's Day: Full Day Out", primaryKeyword: "fathers day word search", seed: 7045, fixedWords: ["WORKSHOP","NEWSPAPER","FISHING","PATIENCE","STRENGTH","SUPPORT","COMFORT","RESPECT","MEMORY","FAMILY","GARAGE","WISDOM","ADVICE","LISTEN","HONOR","PORCH","TRAIL","GUIDE"] },
    { themeId: "fathers-day", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Father's Day: Soft Rest", primaryKeyword: "large print fathers day word search", seed: 7046, fixedWords: ["DAD","TIE","GRILL","HUG","CARD","MUG","HOME","REST"] },
  
    { themeId: "independence-day", difficulty: "easy", n: 1, title: "Independence Day: Picnic Park", primaryKeyword: "fourth of july word search", seed: 7051, fixedWords: ["JULY","FLAG","PARADE","PICNIC","PARK","GRILL","CORN","BAND","STAR","SKY"] },
    { themeId: "independence-day", difficulty: "easy", n: 2, title: "Independence Day: Evening Spark", primaryKeyword: "fourth of july word search", seed: 7052, fixedWords: ["FOURTH","BANNER","MARCH","DRUM","CROWD","CHEER","SHADE","PIE","ICE","NIGHT"] },
    { themeId: "independence-day", difficulty: "medium", n: 1, title: "Independence Day: Parade Day", primaryKeyword: "fourth of july word search", seed: 7053, fixedWords: ["FIREWORK","SPARKLER","LEMONADE","WATERMELON","SUMMER","BLANKET","BASKET","LIBERTY","NATION","ANTHEM","HISTORY","FOUNDING","HARBOR","BRIDGE"] },
    { themeId: "independence-day", difficulty: "medium", n: 2, title: "Independence Day: Summer Fourth", primaryKeyword: "fourth of july word search", seed: 7054, fixedWords: ["FREEDOM","CITIZEN","COURTHOUSE","TWILIGHT","GATHER","FAMILY","FLOAT","PLEDGE","UNION","STRIPE","SPEECH","EVENING","SPARK","GLOW"] },
    { themeId: "independence-day", difficulty: "hard", n: 1, title: "Hard Independence Day: Full Sky", primaryKeyword: "fourth of july word search", seed: 7055, fixedWords: ["FIREWORK","SPARKLER","LEMONADE","WATERMELON","LIBERTY","FREEDOM","FOUNDING","COURTHOUSE","TWILIGHT","GATHER","HISTORY","ANTHEM","CITIZEN","BLANKET","HARBOR","BRIDGE","EVENING","PARADE"] },
    { themeId: "independence-day", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Independence Day: Soft Flag", primaryKeyword: "large print fourth of july word search", seed: 7056, fixedWords: ["JULY","FLAG","PARK","GRILL","STAR","PIE","BAND","SKY"] },
  
    { themeId: "spring", difficulty: "easy", n: 1, title: "Spring: Morning Thaw", primaryKeyword: "spring word search", seed: 7061, fixedWords: ["SPRING","BUD","BLOOM","RAIN","MIST","BREEZE","NEST","LAMB","DEW","DAWN"] },
    { themeId: "spring", difficulty: "easy", n: 2, title: "Spring: Garden Wake", primaryKeyword: "spring word search", seed: 7062, fixedWords: ["THAW","LEAF","GREEN","FRESH","SEED","PATH","WALK","SONG","OPEN","SOFT"] },
    { themeId: "spring", difficulty: "medium", n: 1, title: "Spring: Soft Showers", primaryKeyword: "spring word search", seed: 7063, fixedWords: ["BLOSSOM","SHOWER","SUNLIGHT","DAFFODIL","TULIP","WILLOW","MEADOW","SPROUT","EQUINOX","DAYLIGHT","GARDEN","ROBIN","CHORUS","WARMTH"] },
    { themeId: "spring", difficulty: "medium", n: 2, title: "Spring: Longer Light", primaryKeyword: "spring word search", seed: 7064, fixedWords: ["HYACINTH","CROCUSES","POLLEN","BUTTERFLY","RENEWAL","REBIRTH","MIGRATION","FOAL","BIRCH","LAWN","WINDOW","CLOUD","SHOOT","HOPE"] },
    { themeId: "spring", difficulty: "hard", n: 1, title: "Hard Spring: Full Bloom", primaryKeyword: "spring word search", seed: 7065, fixedWords: ["BLOSSOM","DAFFODIL","HYACINTH","CROCUSES","EQUINOX","DAYLIGHT","BUTTERFLY","RENEWAL","REBIRTH","SUNLIGHT","MEADOW","WILLOW","CHORUS","POLLEN","GARDEN","SHOWER","WARMTH","MIGRATION"] },
    { themeId: "spring", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Spring: Soft Dawn", primaryKeyword: "large print spring word search", seed: 7066, fixedWords: ["BUD","RAIN","NEST","DEW","DAWN","LEAF","SOFT","HOPE"] },
  
    { themeId: "summer", difficulty: "easy", n: 1, title: "Summer: Shade & Lawn", primaryKeyword: "summer word search", seed: 7071, fixedWords: ["SUMMER","HEAT","SHADE","FAN","LAWN","PARK","BEACH","SAND","WAVE","LAKE"] },
    { themeId: "summer", difficulty: "easy", n: 2, title: "Summer: Lake Day", primaryKeyword: "summer word search", seed: 7072, fixedWords: ["BREEZE","PORCH","PICNIC","TOWEL","SHELL","DOCK","SWIM","CORN","PEACH","REST"] },
    { themeId: "summer", difficulty: "medium", n: 1, title: "Summer: Porch Breeze", primaryKeyword: "summer word search", seed: 7073, fixedWords: ["HAMMOCK","LEMONADE","SUNHAT","BASKET","SOLSTICE","DAYLIGHT","TWILIGHT","FIREFLY","CRICKET","GARDEN","PATIO","COOLER","SPLASH","SHORE"] },
    { themeId: "summer", difficulty: "medium", n: 2, title: "Summer: Long Light", primaryKeyword: "summer word search", seed: 7074, fixedWords: ["SUNSCREEN","VACATION","GOLDEN","EVENING","CICADA","TOMATOES","CANOE","FLOAT","GRILL","SMOKE","CHAIR","HUM","STAR","NIGHT"] },
    { themeId: "summer", difficulty: "hard", n: 1, title: "Hard Summer: Full Afternoon", primaryKeyword: "summer word search", seed: 7075, fixedWords: ["HAMMOCK","LEMONADE","SUNSCREEN","SOLSTICE","DAYLIGHT","TWILIGHT","FIREFLY","VACATION","SUNHAT","CRICKET","GARDEN","COOLER","SPLASH","GOLDEN","EVENING","PICNIC","BASKET","SHORE"] },
    { themeId: "summer", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Summer: Soft Heat", primaryKeyword: "large print summer word search", seed: 7076, fixedWords: ["HEAT","SHADE","LAWN","SAND","WAVE","LAKE","REST","FAN"] },
  
    { themeId: "vegetables", difficulty: "easy", n: 1, title: "Vegetables: Market Crate", primaryKeyword: "vegetables word search", seed: 7111, fixedWords: ["CARROT","PEAS","BEAN","CORN","ONION","LEEK","CELERY","RADISH","FRESH","CRISP"] },
    { themeId: "vegetables", difficulty: "easy", n: 2, title: "Vegetables: Kitchen Garden", primaryKeyword: "vegetables word search", seed: 7112, fixedWords: ["GARLIC","POTATO","BEET","KALE","PEPPER","SQUASH","HERB","SOUP","CHOP","SLICE"] },
    { themeId: "vegetables", difficulty: "medium", n: 1, title: "Vegetables: Chop Board", primaryKeyword: "vegetables word search", seed: 7113, fixedWords: ["SPINACH","LETTUCE","CABBAGE","BROCCOLI","TOMATO","CUCUMBER","PUMPKIN","PARSNIP","SHALLOT","CHARD","STEW","ROAST","STEAM","DICE"] },
    { themeId: "vegetables", difficulty: "medium", n: 2, title: "Vegetables: Soup Pot", primaryKeyword: "vegetables word search", seed: 7114, fixedWords: ["CAULIFLOWER","ASPARAGUS","ZUCCHINI","EGGPLANT","ARTICHOKE","FENNEL","RUTABAGA","SCALLION","COLLARD","ENDIVE","SAUTE","TURNIP","YAM","OKRA"] },
    { themeId: "vegetables", difficulty: "hard", n: 1, title: "Hard Vegetables: Full Harvest", primaryKeyword: "vegetables word search", seed: 7115, fixedWords: ["BROCCOLI","CAULIFLOWER","ASPARAGUS","ZUCCHINI","ARTICHOKE","RUTABAGA","SPINACH","CUCUMBER","PUMPKIN","COLLARD","WATERCRESS","EGGPLANT","PARSNIP","SHALLOT","LETTUCE","CABBAGE","FENNEL","SCALLION"] },
    { themeId: "vegetables", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Vegetables: Soft Crisp", primaryKeyword: "large print vegetables word search", seed: 7116, fixedWords: ["PEAS","BEAN","CORN","LEEK","BEET","KALE","SOUP","HERB"] },
  
    { themeId: "breakfast", difficulty: "easy", n: 1, title: "Breakfast: Toast & Egg", primaryKeyword: "breakfast word search", seed: 7121, fixedWords: ["EGG","TOAST","BUTTER","JAM","HONEY","OATS","MILK","TEA","JUICE","PLATE"] },
    { themeId: "breakfast", difficulty: "easy", n: 2, title: "Breakfast: Morning Tray", primaryKeyword: "breakfast word search", seed: 7122, fixedWords: ["CREAM","CEREAL","BANANA","BERRY","BAGEL","SCONE","SUGAR","SALT","KNIFE","OVEN"] },
    { themeId: "breakfast", difficulty: "medium", n: 1, title: "Breakfast: Pantry Shelf", primaryKeyword: "breakfast word search", seed: 7123, fixedWords: ["PORRIDGE","GRANOLA","MUFFIN","PANCAKE","WAFFLE","SYRUP","OMELET","BISCUIT","ORANGE","YOGURT","MORNING","SKILLET","KETTLE","SPREAD"] },
    { themeId: "breakfast", difficulty: "medium", n: 2, title: "Breakfast: Slow Table", primaryKeyword: "breakfast word search", seed: 7124, fixedWords: ["WAFFLE","CROISSANT","PASTRY","DANISH","MARMALADE","FRITTATA","GRAPEFRUIT","HASH","POTATO","BACON","SAUSAGE","NAPKIN","TRAY","DAWN"] },
    { themeId: "breakfast", difficulty: "hard", n: 1, title: "Hard Breakfast: Full Spread", primaryKeyword: "breakfast word search", seed: 7125, fixedWords: ["PORRIDGE","GRANOLA","PANCAKE","OMELET","CROISSANT","MARMALADE","FRITTATA","GRAPEFRUIT","SYRUP","MUFFIN","BISCUIT","YOGURT","SKILLET","PASTRY","SAUSAGE","POTATO","MORNING","WAFFLE"] },
    { themeId: "breakfast", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Breakfast: Soft Plate", primaryKeyword: "large print breakfast word search", seed: 7126, fixedWords: ["EGG","TOAST","JAM","OATS","TEA","MILK","SCONE","PLATE"] },
  
    { themeId: "coffee-tea", difficulty: "easy", n: 1, title: "Coffee & Tea: Quiet Cup", primaryKeyword: "coffee and tea word search", seed: 7131, fixedWords: ["COFFEE","TEA","MUG","CUP","BREW","STEAM","BEAN","LEAF","MILK","HONEY"] },
    { themeId: "coffee-tea", difficulty: "easy", n: 2, title: "Coffee & Tea: Morning Brew", primaryKeyword: "coffee and tea word search", seed: 7132, fixedWords: ["POT","POUR","ROAST","GRIND","FOAM","CREAM","MINT","BLEND","WARM","TRAY"] },
    { themeId: "coffee-tea", difficulty: "medium", n: 1, title: "Coffee & Tea: Leaf & Bean", primaryKeyword: "coffee and tea word search", seed: 7133, fixedWords: ["KETTLE","SAUCER","FILTER","PRESS","DRIP","GREEN","BLACK","HERBAL","JASMINE","OOLONG","AROMA","SPOON","SUGAR","BISCUIT"] },
    { themeId: "coffee-tea", difficulty: "medium", n: 2, title: "Coffee & Tea: Afternoon Pause", primaryKeyword: "coffee and tea word search", seed: 7134, fixedWords: ["ESPRESSO","LATTE","CHAMOMILE","CINNAMON","VANILLA","COCOA","STEEP","AFTERNOON","MORNING","PAUSE","QUIET","TABLE","SPICE","SCONE"] },
    { themeId: "coffee-tea", difficulty: "hard", n: 1, title: "Hard Coffee & Tea: Full Pot", primaryKeyword: "coffee and tea word search", seed: 7135, fixedWords: ["ESPRESSO","CHAMOMILE","CINNAMON","AFTERNOON","FILTER","HERBAL","JASMINE","AROMA","VANILLA","LATTE","KETTLE","SAUCER","BISCUIT","STEEP","OOLONG","PRESS","MORNING","SPICE"] },
    { themeId: "coffee-tea", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Coffee & Tea: Soft Steam", primaryKeyword: "large print coffee and tea word search", seed: 7136, fixedWords: ["TEA","MUG","BREW","BEAN","LEAF","MILK","WARM","CUP"] },
  
    { themeId: "kitchen", difficulty: "easy", n: 1, title: "Kitchen: Counter Basics", primaryKeyword: "kitchen word search", seed: 7141, fixedWords: ["SPOON","FORK","KNIFE","PLATE","BOWL","PAN","POT","OVEN","SALT","PEPPER"] },
    { themeId: "kitchen", difficulty: "easy", n: 2, title: "Kitchen: Utensil Drawer", primaryKeyword: "kitchen word search", seed: 7142, fixedWords: ["CUP","MUG","LID","SINK","SHELF","APRON","TOWEL","TIMER","CHOP","STIR"] },
    { themeId: "kitchen", difficulty: "medium", n: 1, title: "Kitchen: Pantry Shelf", primaryKeyword: "kitchen word search", seed: 7143, fixedWords: ["STOVE","DRAWER","PANTRY","WHISK","LADLE","SPATULA","GRATER","PEELER","BOARD","RECIPE","SIMMER","BOIL","ROAST","BAKE"] },
    { themeId: "kitchen", difficulty: "medium", n: 2, title: "Kitchen: Recipe Day", primaryKeyword: "kitchen word search", seed: 7144, fixedWords: ["COLANDER","BLENDER","KETTLE","TOASTER","MIXER","SIEVE","ROLLING","BAKING","FRY","STEAM","SERVE","SPICE","TAP","PIN"] },
    { themeId: "kitchen", difficulty: "hard", n: 1, title: "Hard Kitchen: Full Cook", primaryKeyword: "kitchen word search", seed: 7145, fixedWords: ["SPATULA","COLANDER","BLENDER","TOASTER","PANTRY","GRATER","PEELER","RECIPE","SIMMER","ROLLING","BAKING","WHISK","LADLE","DRAWER","MIXER","STEAM","SPICE","BOARD"] },
    { themeId: "kitchen", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Kitchen: Soft Spoon", primaryKeyword: "large print kitchen word search", seed: 7146, fixedWords: ["SPOON","BOWL","PAN","OVEN","SALT","APRON","CHOP","BAKE"] },
  
    { themeId: "birds", difficulty: "easy", n: 1, title: "Birds: Dawn Chorus", primaryKeyword: "birds word search", seed: 7151, fixedWords: ["ROBIN","WREN","DOVE","CROW","OWL","HAWK","SWAN","DUCK","NEST","SONG"] },
    { themeId: "birds", difficulty: "easy", n: 2, title: "Birds: Garden Watch", primaryKeyword: "birds word search", seed: 7152, fixedWords: ["FINCH","GULL","TERN","EGGS","WING","BEAK","PERCH","SKY","TREE","DAWN"] },
    { themeId: "birds", difficulty: "medium", n: 1, title: "Birds: Wing & Nest", primaryKeyword: "birds word search", seed: 7153, fixedWords: ["SPARROW","PIGEON","RAVEN","EAGLE","FALCON","HERON","EGRET","GOOSE","CARDINAL","THRUSH","FEATHER","BRANCH","FEEDER","CHORUS"] },
    { themeId: "birds", difficulty: "medium", n: 2, title: "Birds: Quiet Perch", primaryKeyword: "birds word search", seed: 7154, fixedWords: ["CHICKADEE","NUTHATCH","WARBLER","STARLING","BLACKBIRD","ORIOLE","MIGRATION","FLOCK","SOAR","GLIDE","HOVER","CLOUD","CHICK","TANAGER"] },
    { themeId: "birds", difficulty: "hard", n: 1, title: "Hard Birds: Full Flock", primaryKeyword: "birds word search", seed: 7155, fixedWords: ["CHICKADEE","NUTHATCH","WARBLER","STARLING","BLACKBIRD","MIGRATION","CARDINAL","SPARROW","FALCON","FEATHER","CHORUS","FEEDER","HERON","ORIOLE","THRUSH","BRANCH","FLOCK","TANAGER"] },
    { themeId: "birds", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Birds: Soft Song", primaryKeyword: "large print birds word search", seed: 7156, fixedWords: ["ROBIN","OWL","DUCK","NEST","SONG","WING","SKY","DAWN"] },
  
    { themeId: "flowers", difficulty: "easy", n: 1, title: "Flowers: Garden Bed", primaryKeyword: "flowers word search", seed: 7161, fixedWords: ["ROSE","LILY","IRIS","TULIP","DAISY","POPPY","BUD","STEM","VASE","SOFT"] },
    { themeId: "flowers", difficulty: "easy", n: 2, title: "Flowers: Cut Blooms", primaryKeyword: "flowers word search", seed: 7162, fixedWords: ["VIOLET","PANSY","ASTER","PEONY","BLOOM","PETAL","BED","CUT","BEE","LIGHT"] },
    { themeId: "flowers", difficulty: "medium", n: 1, title: "Flowers: Petal Soft", primaryKeyword: "flowers word search", seed: 7163, fixedWords: ["DAFFODIL","HYACINTH","CROCUS","DAHLIA","ZINNIA","MARIGOLD","LAVENDER","JASMINE","LILAC","BOUQUET","GARDEN","BORDER","POLLEN","NECTAR"] },
    { themeId: "flowers", difficulty: "medium", n: 2, title: "Flowers: Quiet Vase", primaryKeyword: "flowers word search", seed: 7164, fixedWords: ["PETUNIA","BEGONIA","WISTERIA","MAGNOLIA","CAMELLIA","AZALEA","HIBISCUS","ORCHID","FRAGRANCE","BUTTERFLY","SPRING","SUMMER","COLOR","MUM"] },
    { themeId: "flowers", difficulty: "hard", n: 1, title: "Hard Flowers: Full Border", primaryKeyword: "flowers word search", seed: 7165, fixedWords: ["DAFFODIL","HYACINTH","LAVENDER","WISTERIA","MAGNOLIA","CAMELLIA","RHODODENDRON","FRAGRANCE","BUTTERFLY","MARIGOLD","BOUQUET","PETUNIA","HIBISCUS","ORCHID","JASMINE","DAHLIA","AZALEA","BORDER"] },
    { themeId: "flowers", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Flowers: Soft Rose", primaryKeyword: "large print flowers word search", seed: 7166, fixedWords: ["ROSE","LILY","IRIS","DAISY","BUD","VASE","BEE","SOFT"] },
  
    { themeId: "trees", difficulty: "easy", n: 1, title: "Trees: Woodland Walk", primaryKeyword: "trees word search", seed: 7171, fixedWords: ["OAK","ELM","ASH","PINE","FIR","MAPLE","BIRCH","LEAF","ROOT","SHADE"] },
    { themeId: "trees", difficulty: "easy", n: 2, title: "Trees: Leaf & Bark", primaryKeyword: "trees word search", seed: 7172, fixedWords: ["CEDAR","WILLOW","YEW","HOLLY","TRUNK","BARK","TWIG","CONE","GROVE","WOODS"] },
    { themeId: "trees", difficulty: "medium", n: 1, title: "Trees: Quiet Grove", primaryKeyword: "trees word search", seed: 7173, fixedWords: ["SPRUCE","BEECH","POPLAR","ASPEN","ALDER","CHESTNUT","WALNUT","HICKORY","BRANCH","NEEDLE","ACORN","CANOPY","FOREST","FOLIAGE"] },
    { themeId: "trees", difficulty: "medium", n: 2, title: "Trees: Canopy Shade", primaryKeyword: "trees word search", seed: 7174, fixedWords: ["SYCAMORE","MAGNOLIA","DOGWOOD","REDBUD","CYPRESS","HEMLOCK","JUNIPER","LARCH","TIMBER","AUTUMN","GROWTH","SAP","RING","HAWTHORN"] },
    { themeId: "trees", difficulty: "hard", n: 1, title: "Hard Trees: Full Forest", primaryKeyword: "trees word search", seed: 7175, fixedWords: ["SYCAMORE","MAGNOLIA","CHESTNUT","HAWTHORN","DOGWOOD","CYPRESS","HEMLOCK","JUNIPER","CANOPY","FOLIAGE","FOREST","BRANCH","NEEDLE","WALNUT","HICKORY","AUTUMN","TIMBER","REDBUD"] },
    { themeId: "trees", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Trees: Soft Oak", primaryKeyword: "large print trees word search", seed: 7176, fixedWords: ["OAK","PINE","MAPLE","LEAF","ROOT","SHADE","CONE","BARK"] },
  
    { themeId: "weather", difficulty: "easy", n: 1, title: "Weather: Rain & Wind", primaryKeyword: "weather word search", seed: 7181, fixedWords: ["RAIN","SNOW","FOG","MIST","WIND","CLOUD","SUN","HEAT","COLD","SKY"] },
    { themeId: "weather", difficulty: "easy", n: 2, title: "Weather: Clear Skies", primaryKeyword: "weather word search", seed: 7182, fixedWords: ["HAIL","SLEET","DEW","GALE","STORM","FROST","ICE","DRY","COAT","HAT"] },
    { themeId: "weather", difficulty: "medium", n: 1, title: "Weather: Storm Watch", primaryKeyword: "weather word search", seed: 7183, fixedWords: ["BREEZE","THUNDER","SHOWER","DRIZZLE","BLIZZARD","FLURRY","OVERCAST","HUMID","FORECAST","PRESSURE","DEGREE","UMBRELLA","PARKA","SHADE"] },
    { themeId: "weather", difficulty: "medium", n: 2, title: "Weather: Quiet Forecast", primaryKeyword: "weather word search", seed: 7184, fixedWords: ["LIGHTNING","DOWNPOUR","TORRENT","CLEAR","SYSTEM","FRONT","TEMPERATURE","THERMOMETER","BAROMETER","BOOTS","SCARF","HORIZON","LOW","HIGH"] },
    { themeId: "weather", difficulty: "hard", n: 1, title: "Hard Weather: Full System", primaryKeyword: "weather word search", seed: 7185, fixedWords: ["THUNDER","LIGHTNING","BLIZZARD","OVERCAST","FORECAST","PRESSURE","TEMPERATURE","THERMOMETER","BAROMETER","DOWNPOUR","DRIZZLE","UMBRELLA","FLURRY","HORIZON","SHOWER","SYSTEM","PARKA","BREEZE"] },
    { themeId: "weather", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Weather: Soft Mist", primaryKeyword: "large print weather word search", seed: 7186, fixedWords: ["RAIN","SNOW","FOG","WIND","SUN","COLD","SKY","COAT"] },

  // Wave D — geography/education + outdoors/transport + soft (competitor-aligned, IP-safe)
  { themeId: "us-states", difficulty: "easy", n: 1, title: "U.S. States: Coast & Plains", primaryKeyword: "us states word search", seed: 8011, fixedWords: ["TEXAS","OHIO","IOWA","UTAH","MAINE","IDAHO","NEVADA","OREGON","STATE","COAST"] },
    { themeId: "us-states", difficulty: "easy", n: 2, title: "U.S. States: Quiet Map", primaryKeyword: "us states word search", seed: 8012, fixedWords: ["FLORIDA","GEORGIA","KANSAS","MONTANA","ALASKA","HAWAII","BORDER","PLAINS","VALLEY","DESERT"] },
    { themeId: "us-states", difficulty: "medium", n: 1, title: "U.S. States: Border Roads", primaryKeyword: "us states word search", seed: 8013, fixedWords: ["ALABAMA","ARIZONA","COLORADO","MICHIGAN","VIRGINIA","WYOMING","ILLINOIS","INDIANA","KENTUCKY","OKLAHOMA","TENNESSEE","WISCONSIN","REGION","CAPITAL"] },
    { themeId: "us-states", difficulty: "medium", n: 2, title: "U.S. States: Capitol Tour", primaryKeyword: "us states word search", seed: 8014, fixedWords: ["ARKANSAS","DELAWARE","MARYLAND","MISSOURI","NEBRASKA","VERMONT","ALABAMA","OREGON","MONTANA","FLORIDA","GEORGIA","KANSAS","IDAHO","NEVADA"] },
    { themeId: "us-states", difficulty: "hard", n: 1, title: "Hard U.S. States: Full Atlas", primaryKeyword: "us states word search", seed: 8015, fixedWords: ["CALIFORNIA","CONNECTICUT","MASSACHUSETTS","PENNSYLVANIA","WASHINGTON","MISSISSIPPI","MINNESOTA","LOUISIANA","TENNESSEE","WISCONSIN","COLORADO","ILLINOIS","MICHIGAN","VIRGINIA","OKLAHOMA","ARKANSAS","ALABAMA","WYOMING"] },
    { themeId: "us-states", difficulty: "easy", n: 1, largePrint: true, title: "Large Print U.S. States: Soft State", primaryKeyword: "large print us states word search", seed: 8016, fixedWords: ["OHIO","IOWA","UTAH","TEXAS","MAINE","STATE","COAST","IDAHO"] },
  
    { themeId: "world-capitals", difficulty: "easy", n: 1, title: "World Capitals: City Lights", primaryKeyword: "world capitals word search", seed: 8021, fixedWords: ["PARIS","ROME","OSLO","CAIRO","TOKYO","DELHI","LIMA","QUITO","KYIV","BERN"] },
    { themeId: "world-capitals", difficulty: "easy", n: 2, title: "World Capitals: Quiet Atlas", primaryKeyword: "world capitals word search", seed: 8022, fixedWords: ["LONDON","MADRID","DUBLIN","ATHENS","SEOUL","HAVANA","ACCRA","ANKARA","PRAGUE","LAGOS"] },
    { themeId: "world-capitals", difficulty: "medium", n: 1, title: "World Capitals: River Capitals", primaryKeyword: "world capitals word search", seed: 8023, fixedWords: ["BERLIN","LISBON","VIENNA","BEIJING","HANOI","OTTAWA","BOGOTA","NAIROBI","MOSCOW","WARSAW","BEIRUT","RIYADH","TEHRAN","MANILA"] },
    { themeId: "world-capitals", difficulty: "medium", n: 2, title: "World Capitals: World Desk", primaryKeyword: "world capitals word search", seed: 8024, fixedWords: ["BANGKOK","JAKARTA","CANBERRA","SANTIAGO","BRASILIA","PRETORIA","BAGHDAD","DAMASCUS","BUDAPEST","HELSINKI","AMSTERDAM","BRUSSELS","STOCKHOLM","COPENHAGEN"] },
    { themeId: "world-capitals", difficulty: "hard", n: 1, title: "Hard World Capitals: Full Globe", primaryKeyword: "world capitals word search", seed: 8025, fixedWords: ["STOCKHOLM","COPENHAGEN","AMSTERDAM","BRUSSELS","BUDAPEST","HELSINKI","CANBERRA","BRASILIA","PRETORIA","JAKARTA","BANGKOK","SANTIAGO","DAMASCUS","BAGHDAD","BEIJING","OTTAWA","MOSCOW","WARSAW"] },
    { themeId: "world-capitals", difficulty: "easy", n: 1, largePrint: true, title: "Large Print World Capitals: Soft Capital", primaryKeyword: "large print world capitals word search", seed: 8026, fixedWords: ["PARIS","ROME","OSLO","TOKYO","LIMA","KYIV","CAIRO","BERN"] },
  
    { themeId: "human-body", difficulty: "easy", n: 1, title: "Human Body: Bones & Skin", primaryKeyword: "human body word search", seed: 8031, fixedWords: ["BONE","SKIN","HAIR","NOSE","EAR","EYE","ARM","HAND","LEG","FOOT"] },
    { themeId: "human-body", difficulty: "easy", n: 2, title: "Human Body: Quiet Pulse", primaryKeyword: "human body word search", seed: 8032, fixedWords: ["LIP","NECK","KNEE","HIP","RIB","HEART","LUNG","BACK","TOE","PALM"] },
    { themeId: "human-body", difficulty: "medium", n: 1, title: "Human Body: Joint Study", primaryKeyword: "human body word search", seed: 8033, fixedWords: ["FINGER","ELBOW","WRIST","ANKLE","SHOULDER","SPINE","SKULL","LIVER","KIDNEY","STOMACH","BRAIN","MUSCLE","NERVE","JOINT"] },
    { themeId: "human-body", difficulty: "medium", n: 2, title: "Human Body: Breath & Blood", primaryKeyword: "human body word search", seed: 8034, fixedWords: ["TENDON","VEIN","ARTERY","BLOOD","PULSE","BREATH","THUMB","HEEL","CHEST","WAIST","THROAT","TOOTH","NAIL","JOINTS"] },
    { themeId: "human-body", difficulty: "hard", n: 1, title: "Hard Human Body: Full Anatomy", primaryKeyword: "human body word search", seed: 8035, fixedWords: ["SHOULDER","STOMACH","MUSCLE","TENDON","ARTERY","FINGER","ANKLE","ELBOW","WRIST","KIDNEY","SPINE","SKULL","BREATH","PULSE","THROAT","CHEST","BRAIN","LIVER"] },
    { themeId: "human-body", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Human Body: Soft Bone", primaryKeyword: "large print human body word search", seed: 8036, fixedWords: ["BONE","SKIN","ARM","HAND","LEG","EYE","HEART","LUNG"] },
  
    { themeId: "camping", difficulty: "easy", n: 1, title: "Camping: Tent Night", primaryKeyword: "camping word search", seed: 8041, fixedWords: ["TENT","PEG","POLE","FIRE","LOG","PATH","HIKE","CAMP","PACK","MAP"] },
    { themeId: "camping", difficulty: "easy", n: 2, title: "Camping: Trail Pack", primaryKeyword: "camping word search", seed: 8042, fixedWords: ["FLY","BAG","PAD","MAT","ASH","WOODS","LAKE","POT","PAN","ROPE"] },
    { themeId: "camping", difficulty: "medium", n: 1, title: "Camping: Lantern Glow", primaryKeyword: "camping word search", seed: 8043, fixedWords: ["SLEEP","FLAME","SPARK","SMOKE","LANTERN","TORCH","LIGHT","TRAIL","SITE","STREAM","COOK","STOW","KNIFE","COMPASS"] },
    { themeId: "camping", difficulty: "medium", n: 2, title: "Camping: Woods Walk", primaryKeyword: "camping word search", seed: 8044, fixedWords: ["FLASH","GROVE","RIVER","WHISTLE","CANTEEN","BOTTLE","SNACK","MARSH","STAR","NIGHT","DAWN","DEW","STAKE","COT"] },
    { themeId: "camping", difficulty: "hard", n: 1, title: "Hard Camping: Full Campsite", primaryKeyword: "camping word search", seed: 8045, fixedWords: ["LANTERN","COMPASS","CANTEEN","WHISTLE","STREAM","TRAIL","SLEEP","FLAME","SPARK","SMOKE","TORCH","BOTTLE","SNACK","MARSH","GROVE","RIVER","STAKE","SITE"] },
    { themeId: "camping", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Camping: Soft Tent", primaryKeyword: "large print camping word search", seed: 8046, fixedWords: ["TENT","FIRE","HIKE","CAMP","PACK","MAP","PATH","LAKE"] },
  
    { themeId: "horses", difficulty: "easy", n: 1, title: "Horses: Pasture Day", primaryKeyword: "horses word search", seed: 8051, fixedWords: ["HORSE","PONY","FOAL","MARE","HERD","BARN","HAY","OATS","MANE","TAIL"] },
    { themeId: "horses", difficulty: "easy", n: 2, title: "Horses: Barn Quiet", primaryKeyword: "horses word search", seed: 8052, fixedWords: ["COLT","FILLY","STALL","GATE","TROT","WALK","RIDE","LEAD","COAT","SUN"] },
    { themeId: "horses", difficulty: "medium", n: 1, title: "Horses: Saddle Up", primaryKeyword: "horses word search", seed: 8053, fixedWords: ["STALLION","PASTURE","PADDOCK","STABLE","TROUGH","SADDLE","BRIDLE","REIN","HOOF","GALLOP","CANTER","TRAIL","JUMP","FENCE"] },
    { themeId: "horses", difficulty: "medium", n: 2, title: "Horses: Trail Ride", primaryKeyword: "horses word search", seed: 8054, fixedWords: ["ARENA","GROOM","BRUSH","COMB","BLANKET","HALTER","SPUR","CROP","LANE","FIELD","MEADOW","BIT","RING","WATER"] },
    { themeId: "horses", difficulty: "hard", n: 1, title: "Hard Horses: Full Stable", primaryKeyword: "horses word search", seed: 8055, fixedWords: ["STALLION","PASTURE","PADDOCK","STABLE","SADDLE","BRIDLE","GALLOP","CANTER","BLANKET","HALTER","TROUGH","ARENA","MEADOW","TRAIL","GROOM","FENCE","JUMP","FIELD"] },
    { themeId: "horses", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Horses: Soft Mane", primaryKeyword: "large print horses word search", seed: 8056, fixedWords: ["HORSE","PONY","FOAL","BARN","HAY","MANE","TAIL","RIDE"] },
  
    { themeId: "cars", difficulty: "easy", n: 1, title: "Cars: Open Road", primaryKeyword: "cars word search", seed: 8061, fixedWords: ["CAR","AUTO","WHEEL","TIRE","RIM","DOOR","SEAT","BELT","ROAD","PARK"] },
    { themeId: "cars", difficulty: "easy", n: 2, title: "Cars: Garage Shelf", primaryKeyword: "cars word search", seed: 8062, fixedWords: ["BRAKE","PEDAL","GEAR","HOOD","TRUNK","HORN","LANE","DRIVE","KEY","LOCK"] },
    { themeId: "cars", difficulty: "medium", n: 1, title: "Cars: Highway Mile", primaryKeyword: "cars word search", seed: 8063, fixedWords: ["ENGINE","MOTOR","WINDOW","MIRROR","DASH","STEER","RADIO","LIGHT","BEAM","STREET","GARAGE","RAMP","EXIT","SIGNAL"] },
    { themeId: "cars", difficulty: "medium", n: 2, title: "Cars: Signal Turn", primaryKeyword: "cars word search", seed: 8064, fixedWords: ["CLUTCH","AXLE","HIGHWAY","SPEED","FUEL","TANK","OIL","FILTER","WIPER","JACK","SPARE","TURN","ODOMETER","DASH"] },
    { themeId: "cars", difficulty: "hard", n: 1, title: "Hard Cars: Full Drive", primaryKeyword: "cars word search", seed: 8065, fixedWords: ["ENGINE","MIRROR","GARAGE","HIGHWAY","SIGNAL","CLUTCH","FILTER","WIPER","ODOMETER","STREET","WINDOW","MOTOR","RADIO","SPEED","SPARE","BRAKE","PEDAL","AXLE"] },
    { themeId: "cars", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Cars: Soft Lane", primaryKeyword: "large print cars word search", seed: 8066, fixedWords: ["CAR","TIRE","DOOR","SEAT","ROAD","PARK","KEY","LANE"] },
  
    { themeId: "trains", difficulty: "easy", n: 1, title: "Trains: Platform Wait", primaryKeyword: "trains word search", seed: 8071, fixedWords: ["TRAIN","RAIL","TRACK","TIE","COACH","CAR","BELL","STOP","LINE","CREW"] },
    { themeId: "trains", difficulty: "easy", n: 2, title: "Trains: Quiet Coach", primaryKeyword: "trains word search", seed: 8072, fixedWords: ["ENGINE","DEPOT","SMOKE","STEAM","LOCAL","BOARD","ROUTE","YARD","WHEEL","CAB"] },
    { themeId: "trains", difficulty: "medium", n: 1, title: "Trains: Signal Green", primaryKeyword: "trains word search", seed: 8073, fixedWords: ["BALLAST","CABOOSE","CARRIAGE","PLATFORM","STATION","SIGNAL","SWITCH","SIDING","TUNNEL","BRIDGE","CROSSING","WHISTLE","FREIGHT","TICKET"] },
    { themeId: "trains", difficulty: "medium", n: 2, title: "Trains: Long Haul", primaryKeyword: "trains word search", seed: 8074, fixedWords: ["PASSENGER","CONDUCTOR","PORTER","LUGGAGE","TIMETABLE","SCHEDULE","EXPRESS","JOURNEY","COUPLER","BUFFER","DIESEL","ALIGHT","SHUNT","AXLE"] },
    { themeId: "trains", difficulty: "hard", n: 1, title: "Hard Trains: Full Line", primaryKeyword: "trains word search", seed: 8075, fixedWords: ["PLATFORM","STATION","CROSSING","WHISTLE","PASSENGER","CONDUCTOR","TIMETABLE","SCHEDULE","CARRIAGE","FREIGHT","LUGGAGE","EXPRESS","JOURNEY","COUPLER","TUNNEL","BRIDGE","DIESEL","SIGNAL"] },
    { themeId: "trains", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Trains: Soft Rail", primaryKeyword: "large print trains word search", seed: 8076, fixedWords: ["TRAIN","RAIL","TRACK","STOP","LINE","BELL","CREW","CAB"] },
  
    { themeId: "airplanes", difficulty: "easy", n: 1, title: "Airplanes: Gate Call", primaryKeyword: "airplanes word search", seed: 8081, fixedWords: ["PLANE","JET","WING","TAIL","NOSE","SEAT","BELT","GATE","SKY","CREW"] },
    { themeId: "airplanes", difficulty: "easy", n: 2, title: "Airplanes: Quiet Cabin", primaryKeyword: "airplanes word search", seed: 8082, fixedWords: ["CABIN","AISLE","DOOR","RAMP","TAXI","BAG","WIND","MAP","FUEL","CLOUD"] },
    { themeId: "airplanes", difficulty: "medium", n: 1, title: "Airplanes: Runway Light", primaryKeyword: "airplanes word search", seed: 8083, fixedWords: ["COCKPIT","WINDOW","RUNWAY","TAKEOFF","LANDING","FLIGHT","PILOT","LUGGAGE","TICKET","BOARD","DEPART","ARRIVE","ROUTE","TOWER"] },
    { themeId: "airplanes", difficulty: "medium", n: 2, title: "Airplanes: High Cloud", primaryKeyword: "airplanes word search", seed: 8084, fixedWords: ["FUSELAGE","ATTENDANT","PASSPORT","ALTITUDE","HORIZON","TURBULENCE","RADAR","RADIO","COMPASS","AIRPORT","TERMINAL","HANGAR","ENGINE","PROPELLER"] },
    { themeId: "airplanes", difficulty: "hard", n: 1, title: "Hard Airplanes: Full Flight", primaryKeyword: "airplanes word search", seed: 8085, fixedWords: ["TAKEOFF","LANDING","FUSELAGE","ATTENDANT","PASSPORT","ALTITUDE","TURBULENCE","AIRPORT","TERMINAL","PROPELLER","COCKPIT","RUNWAY","LUGGAGE","HORIZON","COMPASS","HANGAR","FLIGHT","WINDOW"] },
    { themeId: "airplanes", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Airplanes: Soft Wing", primaryKeyword: "large print airplanes word search", seed: 8086, fixedWords: ["PLANE","JET","WING","SEAT","GATE","SKY","CREW","CLOUD"] },
  
    { themeId: "farming", difficulty: "easy", n: 1, title: "Farming: Field Dawn", primaryKeyword: "farming word search", seed: 8091, fixedWords: ["FARM","FIELD","SOIL","SEED","CROP","BARN","HAY","CORN","COW","HEN"] },
    { themeId: "farming", difficulty: "easy", n: 2, title: "Farming: Barn Chore", primaryKeyword: "farming word search", seed: 8092, fixedWords: ["ACRE","PLOW","SILO","OATS","PIG","EGG","MILK","GATE","ROW","SUN"] },
    { themeId: "farming", difficulty: "medium", n: 1, title: "Farming: Harvest Row", primaryKeyword: "farming word search", seed: 8093, fixedWords: ["HARVEST","TRACTOR","STRAW","WHEAT","BARLEY","SHEEP","GOAT","CREAM","CHEESE","BUTTER","FENCE","PASTURE","MEADOW","ORCHARD"] },
    { themeId: "farming", difficulty: "medium", n: 2, title: "Farming: Market Day", primaryKeyword: "farming word search", seed: 8094, fixedWords: ["FURROW","IRRIGATE","HOE","RAKE","SPADE","BASKET","MARKET","DAWN","CHORE","SEASON","RAIN","RYE","SOY","BEAN"] },
    { themeId: "farming", difficulty: "hard", n: 1, title: "Hard Farming: Full Acre", primaryKeyword: "farming word search", seed: 8095, fixedWords: ["HARVEST","TRACTOR","PASTURE","MEADOW","ORCHARD","IRRIGATE","BASKET","MARKET","CHEESE","BUTTER","FURROW","SEASON","BARLEY","STRAW","WHEAT","CREAM","CHORE","FENCE"] },
    { themeId: "farming", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Farming: Soft Seed", primaryKeyword: "large print farming word search", seed: 8096, fixedWords: ["FARM","FIELD","SEED","BARN","HAY","CORN","COW","SUN"] },
  
    { themeId: "beach", difficulty: "easy", n: 1, title: "Beach: Tide Line", primaryKeyword: "beach word search", seed: 8101, fixedWords: ["BEACH","SAND","SHORE","TIDE","WAVE","SHELL","CRAB","HAT","SWIM","SUN"] },
    { themeId: "beach", difficulty: "easy", n: 2, title: "Beach: Quiet Shore", primaryKeyword: "beach word search", seed: 8102, fixedWords: ["SURF","FOAM","GULL","TOWEL","SHADE","CHAIR","DIVE","FLOAT","ROCK","REST"] },
    { themeId: "beach", difficulty: "medium", n: 1, title: "Beach: Sand Castle", primaryKeyword: "beach word search", seed: 8103, fixedWords: ["UMBRELLA","BLANKET","PICNIC","COOLER","SPLASH","BOARD","CASTLE","BUCKET","SPADE","DUNE","DRIFT","SEAWEED","PEBBLE","CLIFF"] },
    { themeId: "beach", difficulty: "medium", n: 2, title: "Beach: Sunset Walk", primaryKeyword: "beach word search", seed: 8104, fixedWords: ["LIGHTHOUSE","BREEZE","HEAT","SALT","SPRAY","HORIZON","SUNSET","TWILIGHT","WALK","PRINT","BAREFOOT","QUIET","PIER","DOCK"] },
    { themeId: "beach", difficulty: "hard", n: 1, title: "Hard Beach: Full Coast", primaryKeyword: "beach word search", seed: 8105, fixedWords: ["UMBRELLA","LIGHTHOUSE","SEAWEED","HORIZON","SUNSET","TWILIGHT","BAREFOOT","BLANKET","PICNIC","COOLER","CASTLE","BUCKET","PEBBLE","CLIFF","BREEZE","SPLASH","DRIFT","SPADE"] },
    { themeId: "beach", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Beach: Soft Sand", primaryKeyword: "large print beach word search", seed: 8106, fixedWords: ["SAND","TIDE","WAVE","SHELL","HAT","SWIM","SUN","REST"] },
  
    { themeId: "mountains", difficulty: "easy", n: 1, title: "Mountains: Ridge Path", primaryKeyword: "mountains word search", seed: 8111, fixedWords: ["PEAK","RIDGE","SLOPE","PASS","TRAIL","PATH","HIKE","ROCK","SNOW","VIEW"] },
    { themeId: "mountains", difficulty: "easy", n: 2, title: "Mountains: Quiet Peak", primaryKeyword: "mountains word search", seed: 8112, fixedWords: ["CLIFF","CRAG","VALLEY","CLIMB","STREAM","ICE","WIND","BOOT","MAP","CAMP"] },
    { themeId: "mountains", difficulty: "medium", n: 1, title: "Mountains: Alpine Air", primaryKeyword: "mountains word search", seed: 8113, fixedWords: ["SUMMIT","CANYON","ASCENT","DESCENT","ALPINE","MEADOW","CASCADE","GLACIER","BOULDER","LEDGE","CAVE","VISTA","HORIZON","CLOUD"] },
    { themeId: "mountains", difficulty: "medium", n: 2, title: "Mountains: Valley View", primaryKeyword: "mountains word search", seed: 8114, fixedWords: ["TIMBERLINE","MIST","CHILL","PACK","POLE","COMPASS","SHELTER","CABIN","LODGE","RANGE","SPUR","SADDLE","COL","MOUNTAIN"] },
    { themeId: "mountains", difficulty: "hard", n: 1, title: "Hard Mountains: Full Range", primaryKeyword: "mountains word search", seed: 8115, fixedWords: ["SUMMIT","CANYON","ASCENT","DESCENT","ALPINE","CASCADE","GLACIER","BOULDER","TIMBERLINE","SHELTER","HORIZON","COMPASS","MEADOW","VISTA","CABIN","LODGE","RANGE","MOUNTAIN"] },
    { themeId: "mountains", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Mountains: Soft Trail", primaryKeyword: "large print mountains word search", seed: 8116, fixedWords: ["PEAK","TRAIL","HIKE","ROCK","SNOW","VIEW","PATH","CAMP"] },
  
    { themeId: "lakes", difficulty: "easy", n: 1, title: "Lakes: Still Water", primaryKeyword: "lakes word search", seed: 8121, fixedWords: ["LAKE","POND","WATER","SHORE","BANK","DOCK","BOAT","FISH","SWIM","CALM"] },
    { themeId: "lakes", difficulty: "easy", n: 2, title: "Lakes: Quiet Dock", primaryKeyword: "lakes word search", seed: 8122, fixedWords: ["POOL","PIER","OAR","REEL","CAST","DIVE","FLOAT","DUCK","MIST","SAND"] },
    { themeId: "lakes", difficulty: "medium", n: 1, title: "Lakes: Canoe Morning", primaryKeyword: "lakes word search", seed: 8123, fixedWords: ["CANOE","KAYAK","PADDLE","SPLASH","ISLAND","INLET","COVE","BAY","OUTLET","STREAM","RIVER","REED","LILY","FROG"] },
    { themeId: "lakes", difficulty: "medium", n: 2, title: "Lakes: Shore Mist", primaryKeyword: "lakes word search", seed: 8124, fixedWords: ["HERON","LOON","DAWN","TWILIGHT","REFLECT","MIRROR","STILL","DEPTH","SHALLOW","ROCK","STONE","PEBBLE","DAM","WEIR"] },
    { themeId: "lakes", difficulty: "hard", n: 1, title: "Hard Lakes: Full Lake", primaryKeyword: "lakes word search", seed: 8125, fixedWords: ["PADDLE","ISLAND","OUTLET","STREAM","TWILIGHT","REFLECT","MIRROR","SHALLOW","PEBBLE","CANOE","KAYAK","SPLASH","HERON","INLET","COVE","DEPTH","RIVER","DAWN"] },
    { themeId: "lakes", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Lakes: Soft Calm", primaryKeyword: "large print lakes word search", seed: 8126, fixedWords: ["LAKE","POND","SHORE","DOCK","BOAT","FISH","SWIM","CALM"] },
  
    { themeId: "school", difficulty: "easy", n: 1, title: "School: Desk & Book", primaryKeyword: "school word search", seed: 8131, fixedWords: ["CLASS","ROOM","DESK","BOOK","PAGE","PEN","BELL","TEST","MATH","YEAR"] },
    { themeId: "school", difficulty: "easy", n: 2, title: "School: Quiet Study", primaryKeyword: "school word search", seed: 8132, fixedWords: ["CHAIR","BOARD","CHALK","PENCIL","BAG","HALL","GRADE","SCORE","MAP","LUNCH"] },
    { themeId: "school", difficulty: "medium", n: 1, title: "School: Lesson Bell", primaryKeyword: "school word search", seed: 8133, fixedWords: ["MARKER","ERASER","RULER","LOCKER","LESSON","SUBJECT","HISTORY","SCIENCE","READING","WRITING","ESSAY","QUIZ","TEACHER","STUDENT"] },
    { themeId: "school", difficulty: "medium", n: 2, title: "School: Library Shelf", primaryKeyword: "school word search", seed: 8134, fixedWords: ["HOMEWORK","STUDY","LIBRARY","SHELF","GLOBE","CLOCK","RECESS","TERM","SEMESTER","NOTES","FOLDER","BINDER","PUPIL","SCHOOL"] },
    { themeId: "school", difficulty: "hard", n: 1, title: "Hard School: Full Term", primaryKeyword: "school word search", seed: 8135, fixedWords: ["HISTORY","SCIENCE","READING","WRITING","TEACHER","STUDENT","HOMEWORK","LIBRARY","SEMESTER","SUBJECT","LESSON","MARKER","ERASER","LOCKER","FOLDER","BINDER","RECESS","SCHOOL"] },
    { themeId: "school", difficulty: "easy", n: 1, largePrint: true, title: "Large Print School: Soft Page", primaryKeyword: "large print school word search", seed: 8136, fixedWords: ["DESK","BOOK","PAGE","PEN","BELL","TEST","MATH","MAP"] },
  
    { themeId: "jobs", difficulty: "easy", n: 1, title: "Jobs: Shift Start", primaryKeyword: "jobs careers word search", seed: 8141, fixedWords: ["JOB","WORK","TRADE","CRAFT","SHIFT","WAGE","DESK","SHOP","BANK","COOK"] },
    { themeId: "jobs", difficulty: "easy", n: 2, title: "Jobs: Quiet Desk", primaryKeyword: "jobs careers word search", seed: 8142, fixedWords: ["SKILL","PAY","FARM","NURSE","BAKER","CHEF","PILOT","CLERK","GUARD","HELP"] },
    { themeId: "jobs", difficulty: "medium", n: 1, title: "Jobs: Trade Skill", primaryKeyword: "jobs careers word search", seed: 8143, fixedWords: ["CAREER","SALARY","OFFICE","FACTORY","KITCHEN","CLINIC","SCHOOL","COURT","DOCTOR","TEACHER","DRIVER","SAILOR","FARMER","BUILDER"] },
    { themeId: "jobs", difficulty: "medium", n: 2, title: "Jobs: Career Path", primaryKeyword: "jobs careers word search", seed: 8144, fixedWords: ["CARPENTER","PLUMBER","MECHANIC","TAILOR","BARBER","TELLER","WRITER","EDITOR","ARTIST","MUSICIAN","GUIDE","SERVER","MANAGER","HELPER"] },
    { themeId: "jobs", difficulty: "hard", n: 1, title: "Hard Jobs: Full Roster", primaryKeyword: "jobs careers word search", seed: 8145, fixedWords: ["CAREER","SALARY","FACTORY","CARPENTER","PLUMBER","MECHANIC","MUSICIAN","MANAGER","TEACHER","DOCTOR","BUILDER","ELECTRICIAN","EDITOR","ARTIST","DRIVER","SAILOR","SERVER","OFFICE"] },
    { themeId: "jobs", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Jobs: Soft Work", primaryKeyword: "large print jobs careers word search", seed: 8146, fixedWords: ["JOB","WORK","WAGE","DESK","SHOP","COOK","HELP","SKILL"] },
  
    { themeId: "friendship", difficulty: "easy", n: 1, title: "Friendship: Shared Tea", primaryKeyword: "friendship word search", seed: 8151, fixedWords: ["FRIEND","PAL","ALLY","VISIT","NOTE","CARD","CHAT","CARE","KIND","WARM"] },
    { themeId: "friendship", difficulty: "easy", n: 2, title: "Friendship: Quiet Note", primaryKeyword: "friendship word search", seed: 8152, fixedWords: ["BUDDY","GUEST","HOST","CALL","TALK","SHARE","TRUST","TRUE","HELP","JOY"] },
    { themeId: "friendship", difficulty: "medium", n: 1, title: "Friendship: Loyal Circle", primaryKeyword: "friendship word search", seed: 8153, fixedWords: ["COMPANION","PARTNER","NEIGHBOR","LETTER","LISTEN","LOYAL","GENTLE","HONEST","SUPPORT","COMFORT","CHEER","LAUGH","SMILE","PEACE"] },
    { themeId: "friendship", difficulty: "medium", n: 2, title: "Friendship: Warm Visit", primaryKeyword: "friendship word search", seed: 8154, fixedWords: ["MEMORY","STORY","TIME","TEA","WALK","TABLE","HOME","HUG","HAND","HEART","BOND","TIE","CIRCLE","HOPE"] },
    { themeId: "friendship", difficulty: "hard", n: 1, title: "Hard Friendship: Full Bond", primaryKeyword: "friendship word search", seed: 8155, fixedWords: ["COMPANION","PARTNER","NEIGHBOR","SUPPORT","COMFORT","LISTEN","MEMORY","LETTER","GENTLE","HONEST","LOYAL","CIRCLE","CHEER","TABLE","SHARE","TRUST","HEART","STORY"] },
    { themeId: "friendship", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Friendship: Soft Pal", primaryKeyword: "large print friendship word search", seed: 8156, fixedWords: ["PAL","NOTE","CARD","CARE","KIND","WARM","HELP","JOY"] },

  // Wave E — soft virtues + colors/tools + sports kids + history/science + kitchen/errands
  { themeId: "kindness", difficulty: "easy", n: 1, title: "Kindness: Gentle Day", primaryKeyword: "kindness word search", seed: 8211, fixedWords: ["KIND","CARE","HELP","SHARE","GIVE","WARM","TRUE","TRUST","SMILE","HOME"] },
    { themeId: "kindness", difficulty: "easy", n: 2, title: "Kindness: Quiet Care", primaryKeyword: "kindness word search", seed: 8212, fixedWords: ["SOFT","CALM","FAIR","HOPE","JOY","HAND","HEART","NOTE","CARD","TEA"] },
    { themeId: "kindness", difficulty: "medium", n: 1, title: "Kindness: Warm Share", primaryKeyword: "kindness word search", seed: 8213, fixedWords: ["GENTLE","HONEST","LOYAL","PATIENT","POLITE","RESPECT","LISTEN","CHEER","COMFORT","SUPPORT","MERCY","GRACE","PEACE","THANKS"] },
    { themeId: "kindness", difficulty: "medium", n: 2, title: "Kindness: Soft Thanks", primaryKeyword: "kindness word search", seed: 8214, fixedWords: ["COURTESY","APOLOGY","FORGIVE","WELCOME","INVITE","OFFER","SERVE","NEIGHBOR","GUEST","FRIEND","TABLE","HUG","AID","LIFT"] },
    { themeId: "kindness", difficulty: "hard", n: 1, title: "Hard Kindness: Full Heart", primaryKeyword: "kindness word search", seed: 8215, fixedWords: ["COURTESY","PATIENT","RESPECT","COMFORT","SUPPORT","FORGIVE","WELCOME","NEIGHBOR","APOLOGY","LISTEN","HONEST","GENTLE","MERCY","GRACE","INVITE","THANKS","FRIEND","TABLE"] },
    { themeId: "kindness", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Kindness: Soft Kind", primaryKeyword: "large print kindness word search", seed: 8216, fixedWords: ["KIND","CARE","HELP","WARM","HOPE","JOY","NOTE","HOME"] },
  
    { themeId: "gratitude", difficulty: "easy", n: 1, title: "Gratitude: Quiet Thanks", primaryKeyword: "gratitude word search", seed: 8221, fixedWords: ["THANKS","JOY","PEACE","HOPE","LOVE","HOME","REST","MEAL","DAWN","NOTE"] },
    { themeId: "gratitude", difficulty: "easy", n: 2, title: "Gratitude: Morning Grace", primaryKeyword: "gratitude word search", seed: 8222, fixedWords: ["FAMILY","FRIEND","HEALTH","BREAD","WATER","LIGHT","QUIET","GIFT","CARE","KIND"] },
    { themeId: "gratitude", difficulty: "medium", n: 1, title: "Gratitude: Shared Table", primaryKeyword: "gratitude word search", seed: 8223, fixedWords: ["THANKFUL","GRATEFUL","BLESSING","PRAISE","MORNING","EVENING","MEMORY","STORY","LETTER","SHARE","WARM","COMFORT","SUPPORT","GRACE"] },
    { themeId: "gratitude", difficulty: "medium", n: 2, title: "Gratitude: Evening Peace", primaryKeyword: "gratitude word search", seed: 8224, fixedWords: ["APPRECIATE","STILL","MERCY","FAITH","HEART","HAND","TABLE","GUEST","HOST","VISIT","SMILE","LAUGH","SONG","PRAYER"] },
    { themeId: "gratitude", difficulty: "hard", n: 1, title: "Hard Gratitude: Full Blessing", primaryKeyword: "gratitude word search", seed: 8225, fixedWords: ["THANKFUL","GRATEFUL","BLESSING","APPRECIATE","MORNING","EVENING","MEMORY","COMFORT","SUPPORT","LETTER","FAMILY","FRIEND","HEALTH","PRAISE","PRAYER","VISIT","TABLE","MERCY"] },
    { themeId: "gratitude", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Gratitude: Soft Thanks", primaryKeyword: "large print gratitude word search", seed: 8226, fixedWords: ["THANKS","JOY","PEACE","HOME","REST","MEAL","NOTE","KIND"] },
  
    { themeId: "mindfulness", difficulty: "easy", n: 1, title: "Mindfulness: Quiet Breath", primaryKeyword: "mindfulness word search", seed: 8231, fixedWords: ["BREATH","PAUSE","STILL","QUIET","CALM","SOFT","SLOW","REST","SIT","WALK"] },
    { themeId: "mindfulness", difficulty: "easy", n: 2, title: "Mindfulness: Still Moment", primaryKeyword: "mindfulness word search", seed: 8232, fixedWords: ["NOTICE","AWARE","FOCUS","LISTEN","FEEL","SEE","HEAR","AIR","SKY","LEAF"] },
    { themeId: "mindfulness", difficulty: "medium", n: 1, title: "Mindfulness: Gentle Pause", primaryKeyword: "mindfulness word search", seed: 8233, fixedWords: ["PRESENT","MOMENT","GENTLE","ATTEND","SENSE","TOUCH","TASTE","SCENT","BODY","MIND","SPACE","GROUND","CENTER","BALANCE"] },
    { themeId: "mindfulness", difficulty: "medium", n: 2, title: "Mindfulness: Soft Focus", primaryKeyword: "mindfulness word search", seed: 8234, fixedWords: ["EASE","STRETCH","RELEASE","RELAX","SETTLE","ANCHOR","INHALE","EXHALE","SILENCE","PEACE","LIGHT","CLOUD","WATER","GROUND"] },
    { themeId: "mindfulness", difficulty: "hard", n: 1, title: "Hard Mindfulness: Full Presence", primaryKeyword: "mindfulness word search", seed: 8235, fixedWords: ["PRESENT","MOMENT","BALANCE","STRETCH","RELEASE","RELAX","SETTLE","ANCHOR","INHALE","EXHALE","SILENCE","ATTEND","GROUND","CENTER","GENTLE","SCENT","CLOUD","WATER"] },
    { themeId: "mindfulness", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Mindfulness: Soft Calm", primaryKeyword: "large print mindfulness word search", seed: 8236, fixedWords: ["BREATH","PAUSE","CALM","SOFT","REST","SIT","WALK","LEAF"] },
  
    { themeId: "colors", difficulty: "easy", n: 1, title: "Colors: Paint Box", primaryKeyword: "colors word search", seed: 8241, fixedWords: ["RED","BLUE","GREEN","YELLOW","PINK","BROWN","BLACK","WHITE","GOLD","NAVY"] },
    { themeId: "colors", difficulty: "easy", n: 2, title: "Colors: Quiet Hue", primaryKeyword: "colors word search", seed: 8242, fixedWords: ["ORANGE","PURPLE","GRAY","SILVER","CREAM","TEAL","CORAL","OLIVE","MINT","ROSE"] },
    { themeId: "colors", difficulty: "medium", n: 1, title: "Colors: Fabric Shelf", primaryKeyword: "colors word search", seed: 8243, fixedWords: ["BRONZE","IVORY","BEIGE","CYAN","AQUA","MAROON","CRIMSON","INDIGO","VIOLET","LAVENDER","MAGENTA","TURQUOISE","AMBER","COPPER"] },
    { themeId: "colors", difficulty: "medium", n: 2, title: "Colors: Garden Tint", primaryKeyword: "colors word search", seed: 8244, fixedWords: ["SCARLET","LIME","SAGE","RUST","PEACH","PLUM","CHARCOAL","SAND","SKY","SEA","LEAF","GREY","TAN","IVORY"] },
    { themeId: "colors", difficulty: "hard", n: 1, title: "Hard Colors: Full Spectrum", primaryKeyword: "colors word search", seed: 8245, fixedWords: ["TURQUOISE","LAVENDER","MAGENTA","CRIMSON","SCARLET","CHARCOAL","MAROON","INDIGO","VIOLET","COPPER","AMBER","BRONZE","BEIGE","CYAN","OLIVE","PEACH","PLUM","CREAM"] },
    { themeId: "colors", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Colors: Soft Tint", primaryKeyword: "large print colors word search", seed: 8246, fixedWords: ["RED","BLUE","GREEN","PINK","GOLD","NAVY","ROSE","MINT"] },
  
    { themeId: "tools", difficulty: "easy", n: 1, title: "Tools: Bench Basics", primaryKeyword: "tools word search", seed: 8251, fixedWords: ["NAIL","SCREW","BOLT","NUT","SAW","FILE","TAPE","BRUSH","BROOM","MOP"] },
    { themeId: "tools", difficulty: "easy", n: 2, title: "Tools: Quiet Mend", primaryKeyword: "tools word search", seed: 8252, fixedWords: ["HAMMER","WRENCH","DRILL","BIT","LEVEL","RULER","BUCKET","LADDER","RAKE","HOE"] },
    { themeId: "tools", difficulty: "medium", n: 1, title: "Tools: Workshop Shelf", primaryKeyword: "tools word search", seed: 8253, fixedWords: ["PLIERS","CLAMP","VISE","CHISEL","PLANE","SQUARE","PENCIL","SHOVEL","SPADE","AXE","MALLET","PUNCH","SNIPS","CUTTER"] },
    { themeId: "tools", difficulty: "medium", n: 2, title: "Tools: Yard Kit", primaryKeyword: "tools word search", seed: 8254, fixedWords: ["SCISSORS","KNIFE","GLUE","OIL","RAG","APRON","BENCH","SHELF","BOX","KIT","MEND","FIX","STEP","DRILL"] },
    { themeId: "tools", difficulty: "hard", n: 1, title: "Hard Tools: Full Toolbox", primaryKeyword: "tools word search", seed: 8255, fixedWords: ["HAMMER","WRENCH","PLIERS","CHISEL","MALLET","SCISSORS","LADDER","SHOVEL","SQUARE","PENCIL","CLAMP","CUTTER","APRON","BENCH","SPADE","LEVEL","PLANE","SNIPS"] },
    { themeId: "tools", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Tools: Soft Nail", primaryKeyword: "large print tools word search", seed: 8256, fixedWords: ["NAIL","BOLT","SAW","TAPE","BROOM","RAKE","FIX","KIT"] },
  
    { themeId: "soccer", difficulty: "easy", n: 1, title: "Soccer: Pitch Night", primaryKeyword: "soccer word search", seed: 8261, fixedWords: ["BALL","GOAL","NET","KICK","PASS","SHOT","SAVE","FIELD","MATCH","GAME"] },
    { themeId: "soccer", difficulty: "easy", n: 2, title: "Soccer: Quiet Pass", primaryKeyword: "soccer word search", seed: 8262, fixedWords: ["PITCH","CROSS","CORNER","FOUL","CARD","BOOTS","BENCH","SUB","SCORE","COACH"] },
    { themeId: "soccer", difficulty: "medium", n: 1, title: "Soccer: Match Day", primaryKeyword: "soccer word search", seed: 8263, fixedWords: ["DRIBBLE","TACKLE","HEADER","PENALTY","OFFSIDE","REFEREE","WHISTLE","STRIKER","KEEPER","DEFENDER","WINGER","CAPTAIN","CLEATS","CORNER"] },
    { themeId: "soccer", difficulty: "medium", n: 2, title: "Soccer: Training Drill", primaryKeyword: "soccer word search", seed: 8264, fixedWords: ["MIDFIELD","FREEKICK","YELLOW","ASSIST","TRAIN","DRILL","WARMUP","SHIN","GUARD","KIT","CLEAN","SHEET","SOCCER","PITCH"] },
    { themeId: "soccer", difficulty: "hard", n: 1, title: "Hard Soccer: Full Pitch", primaryKeyword: "soccer word search", seed: 8265, fixedWords: ["DRIBBLE","TACKLE","PENALTY","OFFSIDE","REFEREE","DEFENDER","MIDFIELD","FREEKICK","CAPTAIN","WARMUP","STRIKER","HEADER","WHISTLE","CLEATS","ASSIST","WINGER","KEEPER","CORNER"] },
    { themeId: "soccer", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Soccer: Soft Goal", primaryKeyword: "large print soccer word search", seed: 8266, fixedWords: ["BALL","GOAL","NET","KICK","PASS","SAVE","MATCH","SCORE"] },
  
    { themeId: "basketball", difficulty: "easy", n: 1, title: "Basketball: Court Basics", primaryKeyword: "basketball word search", seed: 8271, fixedWords: ["BALL","HOOP","NET","COURT","PASS","SHOT","FOUL","SCORE","POINT","HALF"] },
    { themeId: "basketball", difficulty: "easy", n: 2, title: "Basketball: Quiet Shot", primaryKeyword: "basketball word search", seed: 8272, fixedWords: ["RIM","LAYUP","DUNK","BLOCK","STEAL","JUMP","ZONE","BENCH","GUARD","CLOCK"] },
    { themeId: "basketball", difficulty: "medium", n: 1, title: "Basketball: Practice Hour", primaryKeyword: "basketball word search", seed: 8273, fixedWords: ["BASKET","DRIBBLE","REBOUND","ASSIST","THROW","TIPOFF","PIVOT","SCREEN","PRESS","TIMEOUT","COACH","FORWARD","CENTER","JERSEY"] },
    { themeId: "basketball", difficulty: "medium", n: 2, title: "Basketball: Game Clock", primaryKeyword: "basketball word search", seed: 8274, fixedWords: ["BACKBOARD","FREE","FASTBREAK","STARTER","SNEAKER","SWEAT","QUARTER","WHISTLE","REF","WARMUP","DRILL","PICK","ROLL","MAN"] },
    { themeId: "basketball", difficulty: "hard", n: 1, title: "Hard Basketball: Full Court", primaryKeyword: "basketball word search", seed: 8275, fixedWords: ["DRIBBLE","REBOUND","BACKBOARD","FASTBREAK","TIMEOUT","FORWARD","CENTER","WARMUP","BASKET","ASSIST","STARTER","SNEAKER","QUARTER","WHISTLE","PIVOT","SCREEN","PRESS","JERSEY"] },
    { themeId: "basketball", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Basketball: Soft Hoop", primaryKeyword: "large print basketball word search", seed: 8276, fixedWords: ["BALL","HOOP","NET","PASS","SHOT","SCORE","COURT","JUMP"] },
  
    { themeId: "american-history", difficulty: "easy", n: 1, title: "American History: Frontier Map", primaryKeyword: "american history word search", seed: 8281, fixedWords: ["STATE","UNION","COURT","PEACE","VOTE","FARM","SHIP","PORT","TRAIL","FORT"] },
    { themeId: "american-history", difficulty: "easy", n: 2, title: "American History: Quiet Ballot", primaryKeyword: "american history word search", seed: 8282, fixedWords: ["COLONY","SENATE","HOUSE","RIGHTS","CANAL","WAGON","SCHOOL","REFORM","WAR","TREATY"] },
    { themeId: "american-history", difficulty: "medium", n: 1, title: "American History: Capitol Era", primaryKeyword: "american history word search", seed: 8283, fixedWords: ["SETTLER","PIONEER","FRONTIER","CONGRESS","CAPITAL","BALLOT","CENSUS","RAILROAD","HARBOR","MISSION","CHURCH","FACTORY","STRIKE","SUFFRAGE"] },
    { themeId: "american-history", difficulty: "medium", n: 2, title: "American History: Memorial Walk", primaryKeyword: "american history word search", seed: 8284, fixedWords: ["CONSTITUTION","AMENDMENT","LIBERTY","FREEDOM","ABOLITION","CIVIL","DEPRESSION","ALLIES","ARMISTICE","MEMORIAL","EMANCIPATION","NEWDEAL","FRONTIER","RAILROAD"] },
    { themeId: "american-history", difficulty: "hard", n: 1, title: "Hard American History: Full Chronicle", primaryKeyword: "american history word search", seed: 8285, fixedWords: ["CONSTITUTION","AMENDMENT","FRONTIER","RAILROAD","SUFFRAGE","ABOLITION","EMANCIPATION","DEPRESSION","ARMISTICE","MEMORIAL","CONGRESS","PIONEER","FACTORY","LIBERTY","FREEDOM","SETTLER","HARBOR","REFORM"] },
    { themeId: "american-history", difficulty: "easy", n: 1, largePrint: true, title: "Large Print American History: Soft State", primaryKeyword: "large print american history word search", seed: 8286, fixedWords: ["STATE","UNION","VOTE","PEACE","FARM","SHIP","TRAIL","WAR"] },
  
    { themeId: "presidents", difficulty: "easy", n: 1, title: "U.S. Presidents: Oval Desk", primaryKeyword: "us presidents word search", seed: 8291, fixedWords: ["ADAMS","POLK","TAFT","FORD","BUSH","TERM","VETO","GRANT","HAYES","TYLER"] },
    { themeId: "presidents", difficulty: "easy", n: 2, title: "U.S. Presidents: Quiet Term", primaryKeyword: "us presidents word search", seed: 8292, fixedWords: ["MONROE","TAYLOR","PIERCE","WILSON","NIXON","CARTER","OBAMA","BIDEN","CABINET","OFFICE"] },
    { themeId: "presidents", difficulty: "medium", n: 1, title: "U.S. Presidents: Cabinet List", primaryKeyword: "us presidents word search", seed: 8293, fixedWords: ["JACKSON","LINCOLN","JOHNSON","GARFIELD","CLEVELAND","HARDING","COOLIDGE","HOOVER","KENNEDY","CLINTON","PRESIDENT","INAUGURAL","MONROE","WILSON"] },
    { themeId: "presidents", difficulty: "medium", n: 2, title: "U.S. Presidents: Surname Tour", primaryKeyword: "us presidents word search", seed: 8294, fixedWords: ["WASHINGTON","JEFFERSON","MADISON","HARRISON","FILLMORE","BUCHANAN","MCKINLEY","ROOSEVELT","EISENHOWER","WHITEHOUSE","OVAL","ARTHUR","VANBUREN","TRUMP"] },
    { themeId: "presidents", difficulty: "hard", n: 1, title: "Hard U.S. Presidents: Full Roster", primaryKeyword: "us presidents word search", seed: 8295, fixedWords: ["WASHINGTON","JEFFERSON","ROOSEVELT","EISENHOWER","CLEVELAND","HARRISON","BUCHANAN","MCKINLEY","FILLMORE","INAUGURAL","PRESIDENT","WHITEHOUSE","LINCOLN","MADISON","JACKSON","KENNEDY","MONROE","WILSON"] },
    { themeId: "presidents", difficulty: "easy", n: 1, largePrint: true, title: "Large Print U.S. Presidents: Soft Term", primaryKeyword: "large print us presidents word search", seed: 8296, fixedWords: ["ADAMS","POLK","FORD","BUSH","TERM","VETO","GRANT","TAFT"] },
  
    { themeId: "dinosaurs", difficulty: "easy", n: 1, title: "Dinosaurs: Fossil Dig", primaryKeyword: "dinosaurs word search", seed: 8301, fixedWords: ["BONE","SKULL","TEETH","CLAW","TAIL","NEST","EGG","ROCK","DIG","SITE"] },
    { themeId: "dinosaurs", difficulty: "easy", n: 2, title: "Dinosaurs: Quiet Bone", primaryKeyword: "dinosaurs word search", seed: 8302, fixedWords: ["FOSSIL","SCALE","TRACK","PRINT","ERA","AGE","CAST","LAYER","MUSEUM","WILD"] },
    { themeId: "dinosaurs", difficulty: "medium", n: 1, title: "Dinosaurs: Museum Hall", primaryKeyword: "dinosaurs word search", seed: 8303, fixedWords: ["DINOSAUR","REPTILE","PREDATOR","EXTINCT","JURASSIC","PERIOD","AMBER","SEDIMENT","EXHIBIT","THEROPOD","SAUROPOD","ALLOSAUR","IGUANODON","NEST"] },
    { themeId: "dinosaurs", difficulty: "medium", n: 2, title: "Dinosaurs: Ancient Age", primaryKeyword: "dinosaurs word search", seed: 8304, fixedWords: ["HERBIVORE","CARNIVORE","STEGOSAUR","TRICERATOPS","PTEROSAUR","ALLOSAUR","IGUANODON","SAUROPOD","THEROPOD","FOSSIL","MUSEUM","SEDIMENT","AMBER","EXTINCT"] },
    { themeId: "dinosaurs", difficulty: "hard", n: 1, title: "Hard Dinosaurs: Full Exhibit", primaryKeyword: "dinosaurs word search", seed: 8305, fixedWords: ["DINOSAUR","CRETACEOUS","TRICERATOPS","DIPLODOCUS","VELOCIRAPTOR","BRACHIOSAUR","HERBIVORE","CARNIVORE","STEGOSAUR","PTEROSAUR","JURASSIC","SEDIMENT","THEROPOD","SAUROPOD","IGUANODON","ALLOSAUR","FOSSIL","MUSEUM"] },
    { themeId: "dinosaurs", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Dinosaurs: Soft Bone", primaryKeyword: "large print dinosaurs word search", seed: 8306, fixedWords: ["BONE","CLAW","TAIL","NEST","EGG","ROCK","DIG","FOSSIL"] },
  
    { themeId: "insects", difficulty: "easy", n: 1, title: "Insects: Garden Watch", primaryKeyword: "insects word search", seed: 8311, fixedWords: ["BUG","BEE","ANT","FLY","MOTH","WING","NEST","LEAF","BUZZ","GNAT"] },
    { themeId: "insects", difficulty: "easy", n: 2, title: "Insects: Quiet Wing", primaryKeyword: "insects word search", seed: 8312, fixedWords: ["WASP","HIVE","HONEY","SOIL","POND","GLOW","HORNET","LEG","BARK","SWARM"] },
    { themeId: "insects", difficulty: "medium", n: 1, title: "Insects: Meadow Buzz", primaryKeyword: "insects word search", seed: 8313, fixedWords: ["INSECT","BEETLE","LADYBUG","CRICKET","BUTTERFLY","LARVA","PUPA","COCOON","THORAX","ABDOMEN","ANTENNA","POLLEN","NECTAR","GARDEN"] },
    { themeId: "insects", difficulty: "medium", n: 2, title: "Insects: Pond Edge", primaryKeyword: "insects word search", seed: 8314, fixedWords: ["GRASSHOPPER","DRAGONFLY","DAMSELFLY","CATERPILLAR","FIREFLY","TERMITE","APHID","CICADA","LOCUST","MANTIS","WEEVIL","MIDGE","MEADOW","CHIRP"] },
    { themeId: "insects", difficulty: "hard", n: 1, title: "Hard Insects: Full Swarm", primaryKeyword: "insects word search", seed: 8315, fixedWords: ["BUTTERFLY","GRASSHOPPER","DRAGONFLY","CATERPILLAR","ABDOMEN","ANTENNA","FIREFLY","LADYBUG","CRICKET","TERMITE","CICADA","DAMSELFLY","POLLEN","NECTAR","THORAX","MEADOW","BEETLE","MANTIS"] },
    { themeId: "insects", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Insects: Soft Bee", primaryKeyword: "large print insects word search", seed: 8316, fixedWords: ["BEE","ANT","MOTH","WING","NEST","LEAF","HIVE","BUG"] },
  
    { themeId: "reptiles", difficulty: "easy", n: 1, title: "Reptiles: Warm Rock", primaryKeyword: "reptiles word search", seed: 8321, fixedWords: ["SNAKE","LIZARD","TURTLE","SCALE","SHELL","CLAW","TAIL","EGG","NEST","SUN"] },
    { themeId: "reptiles", difficulty: "easy", n: 2, title: "Reptiles: Quiet Scale", primaryKeyword: "reptiles word search", seed: 8322, fixedWords: ["GECKO","SKINK","BOA","ROCK","WARM","COLD","HISS","CRAWL","POND","LAKE"] },
    { themeId: "reptiles", difficulty: "medium", n: 1, title: "Reptiles: Habitat Walk", primaryKeyword: "reptiles word search", seed: 8323, fixedWords: ["REPTILE","TORTOISE","IGUANA","CHAMELEON","ADDER","PYTHON","VIPER","COBRA","TONGUE","BURROW","DESERT","SWAMP","RIVER","BASK"] },
    { themeId: "reptiles", difficulty: "medium", n: 2, title: "Reptiles: River Bank", primaryKeyword: "reptiles word search", seed: 8324, fixedWords: ["SHED","MOLT","SLITHER","HUNT","PREY","FANG","VENOM","HABITAT","WILD","FOREST","GRASS","STONE","LOG","BANK"] },
    { themeId: "reptiles", difficulty: "hard", n: 1, title: "Hard Reptiles: Full Habitat", primaryKeyword: "reptiles word search", seed: 8325, fixedWords: ["CHAMELEON","TORTOISE","REPTILE","HABITAT","SLITHER","DESERT","PYTHON","IGUANA","BURROW","VENOM","FOREST","SWAMP","ADDER","COBRA","BASK","PREY","TONGUE","VIPER"] },
    { themeId: "reptiles", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Reptiles: Soft Scale", primaryKeyword: "large print reptiles word search", seed: 8326, fixedWords: ["SNAKE","LIZARD","SHELL","TAIL","EGG","NEST","SUN","ROCK"] },
  
    { themeId: "cooking", difficulty: "easy", n: 1, title: "Cooking: Stove Basics", primaryKeyword: "cooking word search", seed: 8331, fixedWords: ["COOK","BAKE","ROAST","GRILL","FRY","BOIL","CHOP","SALT","OIL","PAN"] },
    { themeId: "cooking", difficulty: "easy", n: 2, title: "Cooking: Quiet Simmer", primaryKeyword: "cooking word search", seed: 8332, fixedWords: ["STEAM","STIR","DICE","SLICE","PEEL","HERB","OVEN","POT","TASTE","SERVE"] },
    { themeId: "cooking", difficulty: "medium", n: 1, title: "Cooking: Pantry Skill", primaryKeyword: "cooking word search", seed: 8333, fixedWords: ["SAUTE","SIMMER","POACH","BRAISE","SEAR","TOAST","BLEND","WHISK","FOLD","KNEAD","MINCE","GRATE","SEASON","PEPPER"] },
    { themeId: "cooking", difficulty: "medium", n: 2, title: "Cooking: Recipe Night", primaryKeyword: "cooking word search", seed: 8334, fixedWords: ["SPICE","BUTTER","STOCK","BROTH","SAUCE","GRAVY","BATTER","DOUGH","CRUST","TIMER","HEAT","STOVE","SKILLET","LADLE"] },
    { themeId: "cooking", difficulty: "hard", n: 1, title: "Hard Cooking: Full Kitchen", primaryKeyword: "cooking word search", seed: 8335, fixedWords: ["SIMMER","BRAISE","WHISK","KNEAD","SKILLET","BATTER","GRAVY","SEASON","PEPPER","STOCK","BROTH","SAUCE","DOUGH","CRUST","SAUTE","POACH","BLEND","LADLE"] },
    { themeId: "cooking", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Cooking: Soft Stir", primaryKeyword: "large print cooking word search", seed: 8336, fixedWords: ["COOK","BAKE","BOIL","CHOP","SALT","PAN","OVEN","SERVE"] },
  
    { themeId: "shopping", difficulty: "easy", n: 1, title: "Shopping: Market List", primaryKeyword: "shopping word search", seed: 8341, fixedWords: ["SHOP","STORE","CART","BAG","LIST","PRICE","SALE","CASH","CARD","BUY"] },
    { themeId: "shopping", difficulty: "easy", n: 2, title: "Shopping: Quiet Aisle", primaryKeyword: "shopping word search", seed: 8342, fixedWords: ["AISLE","SHELF","BASKET","TOTE","TAG","DEAL","LINE","GIFT","SIZE","SOAP"] },
    { themeId: "shopping", difficulty: "medium", n: 1, title: "Shopping: Errand Day", primaryKeyword: "shopping word search", seed: 8343, fixedWords: ["MARKET","MALL","COUPON","RECEIPT","CHANGE","CHECKOUT","COUNTER","CLERK","QUEUE","BROWSE","CHOOSE","PURCHASE","RETURN","EXCHANGE"] },
    { themeId: "shopping", difficulty: "medium", n: 2, title: "Shopping: Checkout Line", primaryKeyword: "shopping word search", seed: 8344, fixedWords: ["WRAP","BOX","FIT","COLOR","FABRIC","FRESH","PRODUCE","BAKERY","DAIRY","MEAT","BREAD","PAPER","HOME","ERRAND"] },
    { themeId: "shopping", difficulty: "hard", n: 1, title: "Hard Shopping: Full Basket", primaryKeyword: "shopping word search", seed: 8345, fixedWords: ["CHECKOUT","PURCHASE","EXCHANGE","RECEIPT","COUNTER","PRODUCE","BAKERY","COUPON","BROWSE","CHOOSE","FABRIC","MARKET","RETURN","QUEUE","CLERK","DAIRY","ERRAND","BASKET"] },
    { themeId: "shopping", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Shopping: Soft Bag", primaryKeyword: "large print shopping word search", seed: 8346, fixedWords: ["SHOP","CART","BAG","LIST","SALE","CASH","BUY","GIFT"] },
  
    { themeId: "money", difficulty: "easy", n: 1, title: "Money: Coin Dish", primaryKeyword: "money word search", seed: 8351, fixedWords: ["CASH","COIN","BILL","NOTE","CENT","BANK","SAVE","COST","PRICE","WAGE"] },
    { themeId: "money", difficulty: "easy", n: 2, title: "Money: Quiet Budget", primaryKeyword: "money word search", seed: 8352, fixedWords: ["DOLLAR","CHANGE","WALLET","PURSE","SAFE","SPEND","VALUE","WORTH","TAX","TIP"] },
    { themeId: "money", difficulty: "medium", n: 1, title: "Money: Ledger Page", primaryKeyword: "money word search", seed: 8353, fixedWords: ["MONEY","ACCOUNT","BALANCE","DEPOSIT","SAVING","BUDGET","CREDIT","DEBIT","CHECK","INTEREST","RATE","SALARY","INCOME","EXPENSE"] },
    { themeId: "money", difficulty: "medium", n: 2, title: "Money: Savings Habit", primaryKeyword: "money word search", seed: 8354, fixedWords: ["WITHDRAW","LOAN","DEBT","DRAFT","LEDGER","RECEIPT","INVOICE","PAYMENT","TRANSFER","CURRENCY","GOLD","SILVER","POCKET","VAULT"] },
    { themeId: "money", difficulty: "hard", n: 1, title: "Hard Money: Full Ledger", primaryKeyword: "money word search", seed: 8355, fixedWords: ["DEPOSIT","WITHDRAW","BALANCE","INTEREST","TRANSFER","CURRENCY","ACCOUNT","BUDGET","SALARY","INCOME","EXPENSE","RECEIPT","INVOICE","PAYMENT","CREDIT","LEDGER","SAVING","DOLLAR"] },
    { themeId: "money", difficulty: "easy", n: 1, largePrint: true, title: "Large Print Money: Soft Coin", primaryKeyword: "large print money word search", seed: 8356, fixedWords: ["CASH","COIN","BILL","BANK","SAVE","COST","WAGE","TIP"] },

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
/** Comma-separated theme ids; omit to regenerate everything. */
const onlyThemes = onlyArg
  ? new Set(onlyArg.slice("--only=".length).split(",").map((s) => s.trim()).filter(Boolean))
  : null;

const slugs: string[] = [];
for (const spec of PUZZLE_SPECS) {
  const theme = themes.get(spec.themeId);
  if (!theme) throw new Error(`Unknown theme ${spec.themeId}`);
  const suffix = spec.largePrint ? "large" : spec.difficulty;
  const slug = `${spec.themeId}-${suffix}-${String(spec.n).padStart(2, "0")}`;
  const outPath = join(puzzlesDir, `${slug}.json`);

  // --only=a,b regenerates those themes and leaves every other grid file untouched.
  // Missing files for themes outside --only are skipped from the registry until generated.
  if (onlyThemes && !onlyThemes.has(spec.themeId)) {
    if (!existsSync(outPath)) continue;
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
