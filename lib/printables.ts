import packs from "../data/printables.json";
export const PRINTABLES = packs;
export function printableForPuzzle(id: string) { return packs.find(p => p.ids.includes(id)); }
