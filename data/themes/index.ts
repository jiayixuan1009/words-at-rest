import type { Theme } from "../../lib/types";
import halloween from "./halloween.json";
import fall from "./fall.json";
import christmas from "./christmas.json";
import thanksgiving from "./thanksgiving.json";
import winter from "./winter.json";
import valentines from "./valentines.json";
import easter from "./easter.json";
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
import golf from "./golf.json";
import baseball from "./baseball.json";
import tennis from "./tennis.json";
import fishing from "./fishing.json";
import baking from "./baking.json";
import desserts from "./desserts.json";
import herbs from "./herbs.json";
import fruits from "./fruits.json";
import instruments from "./instruments.json";
import jazz from "./jazz.json";
import classical from "./classical.json";
import musicTerms from "./music-terms.json";

/** Theme order: seasonal first, then evergreen, then packs. */
export const themes = [
  halloween,
  fall,
  thanksgiving,
  christmas,
  winter,
  valentines,
  easter,
  animals,
  space,
  sports,
  golf,
  baseball,
  tennis,
  fishing,
  food,
  baking,
  desserts,
  herbs,
  fruits,
  ocean,
  dogs,
  cats,
  travel,
  music,
  instruments,
  jazz,
  classical,
  musicTerms,
  garden,
  bible,
  largePrintPack,
  hardPack,
] as Theme[];
