import type { Theme } from "../../lib/types";
import halloween from "./halloween.json";
import fall from "./fall.json";
import christmas from "./christmas.json";
import animals from "./animals.json";
import space from "./space.json";
import sports from "./sports.json";
import food from "./food.json";
import ocean from "./ocean.json";
import dogs from "./dogs.json";
import cats from "./cats.json";
import travel from "./travel.json";
import music from "./music.json";
import garden from "./garden.json";
import bible from "./bible.json";
import largePrintPack from "./large-print-pack.json";
import hardPack from "./hard-pack.json";

/** Theme order: seasonal first, then evergreen, then packs. */
export const themes = [
  halloween,
  fall,
  christmas,
  animals,
  space,
  sports,
  food,
  ocean,
  dogs,
  cats,
  travel,
  music,
  garden,
  bible,
  largePrintPack,
  hardPack,
] as Theme[];
