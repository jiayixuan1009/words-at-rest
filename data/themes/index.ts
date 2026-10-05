import type { Theme } from "../../lib/types";
import halloween from "./halloween.json";
import animals from "./animals.json";
import largePrintPack from "./large-print-pack.json";

// Add new theme JSON files here (and to scripts/generate-puzzles.ts specs).
export const themes = [halloween, animals, largePrintPack] as Theme[];
