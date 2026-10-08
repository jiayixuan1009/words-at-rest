import type { FaqItem } from "../components/Faq";

/** Topic-specific answers based on the real catalog and available printable packs. */
export const THEME_FAQ: Record<string, FaqItem[]> = {
  halloween: [
    { q: "Are these Halloween word searches scary?", a: "The word bank includes costumes, harvest vocabulary and familiar folklore words, rather than graphic horror or film characters. Preview each puzzle's word list before choosing an activity. Easy grids use only across and down directions; hard grids add backwards and diagonal words." },
    { q: "Can I print a Halloween activity with answers?", a: "Yes. The Halloween printable pack includes two 9×9 puzzles and their answer keys in A4 and US Letter. Each puzzle has eight words with across and down directions. Download the pack for personal, classroom or community activities and keep the Words at Rest credit." },
    { q: "Are these Halloween puzzles suitable for seniors and adults?", a: "Yes. The tone is calm and grown-up — candlelit porches, owls, lanterns and harvest English rather than jump-scare lists. Large print is available when bigger letters feel better, and there is never a timer online." },
    { q: "What should I play after Halloween?", a: "Fall keeps autumn walks and foliage without costume words. Thanksgiving leans into home, sharing and a warm meal. Winter is ready when you want snow and cocoa after October. Browse holidays for the seasonal path." },
    { q: "Do Halloween grids use licensed characters?", a: "No. There are no film franchises, brand mascots or trademarked costume names — only common English holiday and harvest vocabulary from the word bank on this page." },
  ],
  thanksgiving: [
    { q: "What is included in a Thanksgiving word search?", a: "These puzzles draw on the Thanksgiving word bank shown on this page. Each individual puzzle lists its exact words before you start, so you can choose vocabulary that fits your gathering. Pick easy for across and down words, medium for added diagonals, or hard for all eight directions." },
    { q: "Is there a printable Thanksgiving activity pack?", a: "Yes. The printable Thanksgiving pack provides six large print puzzles with separate answer keys. Choose US Letter or A4; both versions use the same 9×9 grids and eight-word lists. No account is needed, and the same puzzles are available to play online." },
    { q: "Are Thanksgiving puzzles calm enough for a mixed adult group?", a: "Yes. Vocabulary stays about home, sharing, harvest and a warm meal — no brand slogans and no franchise characters. Activity directors can hand out odd-numbered puzzle pages and keep even-numbered answer keys." },
    { q: "What pairs well with Thanksgiving?", a: "Fall keeps orchard and foliage words nearby. Gratitude and Kindness keep a soft social mood after the meal. Christmas and Winter wait if you want December or snow themes next. See the Activity Director Kit for printable tips." },
    { q: "Letter or A4 — which Thanksgiving PDF should I print?", a: "Download Letter for US Letter paper or A4 for international A4 from the Thanksgiving printable pack. Print at actual size (100%). Puzzle pages sit on odd pages; answers on even pages." },
  ],
  christmas: [
    { q: "Are these Christmas word searches suitable for a group activity?", a: "You can choose a difficulty and preview the full word list to suit your group. The Christmas theme uses seasonal vocabulary such as wreaths, carols, candles and holly. There is no timer online, and the large print printable pack offers six short activities with answer sheets for the organizer." },
    { q: "Can I get Christmas word searches in A4 and Letter?", a: "Both sizes are available from the Christmas printable pack linked above. Each file contains six large print puzzle pages and six answer pages, using the same grids as the online puzzles. Print just the puzzle pages for participants and retain the answers for checking." },
    { q: "Are the Christmas words calm and adult-friendly?", a: "Yes. The lists lean into quiet December English — pine, cocoa, choir, parcels and soft home words — without franchise characters or brand slogans. Large print keeps eight words on a 9×9 grid when bigger letters feel better." },
    { q: "What should I open after Christmas puzzles?", a: "Winter keeps snow, frost and cocoa without holiday-specific lists. Thanksgiving looks back to November gatherings. Everyday large print works year-round for non-seasonal sessions. Holidays collects the seasonal path in one place." },
    { q: "Can senior centers photocopy the Christmas pack?", a: "Yes. Sheets are free for personal, classroom and community activity use, including libraries and senior centers. Keep the Words at Rest credit when sharing. See the Activity Director Kit for Letter vs A4 and answer-key tips." },
  ],
  winter: [
    { q: "How is the winter theme different from Christmas?", a: "Winter focuses on the season: snow, cold-weather clothing, cocoa and other midwinter vocabulary. Christmas has its own holiday collection. Use the exact word list on a puzzle page to choose between them; winter is also a useful option for activities after the December holidays." },
    { q: "Are winter word searches suitable for seniors?", a: "Yes. The tone is calm and grown-up — boots, scarves, hearth and quiet evenings rather than extreme-sport lists. Easy grids stay across and down; hard grids add diagonals and backwards words. Large print is available when you want bigger letters." },
    { q: "Is there a winter printable pack?", a: "Winter large print puzzles live in the online catalog and theme hub. For ready PDF packs with answer keys, start with Everyday Large Print or the Christmas pack in December, then return here for on-screen winter grids anytime." },
    { q: "What themes pair well with winter?", a: "Christmas keeps holiday vocabulary nearby in December. Fall and Thanksgiving look back to autumn gatherings. Home and Reading suit a long indoor evening after a cold walk. Browse holidays for the full seasonal route." },
    { q: "Do winter puzzles use brand or franchise names?", a: "No. The bank sticks to common English cold-weather words — frost, cocoa, evergreen, blizzard and quiet-room vocabulary — with no ski-resort brands or licensed characters." },
  ],
  valentines: [
    { q: "Can I play a Valentine's word search outside February?", a: "Yes. These puzzles are available all year and use words about affection, cards, roses and keepsakes. You can play at your own pace without signing up. Choose a dedicated 9×9 large print puzzle for fewer words, or try a harder grid for a longer vocabulary challenge." },
    { q: "Are these Valentine puzzles suitable for seniors and adults?", a: "Yes. The tone is calm and grown-up — no glitter cartoon hearts and no licensed characters. Easy grids keep words across and down; hard grids add diagonals and backwards spellings. Large print is available when bigger letters feel better." },
    { q: "What themes pair well after Valentine's Day?", a: "Wedding, Friendship and Kindness keep a soft social mood. Winter stays seasonal if you still want cold-weather vocabulary after mid-February. Open How to Play if you want a refresher on directions and large print." },
  ],
  dogs: [
    { q: "Which dog word search should I start with?", a: "Start with an easy grid if you prefer words that read across and down. Open the word list first to check the vocabulary, then scan for each word's first letter. Medium adds diagonals and hard includes backwards words; choose Grid size → Larger whenever you want bigger squares and letters." },
    { q: "Do these dog puzzles use breed-club or brand names?", a: "No. The list sticks to everyday companion English — walks, parks, coats, leashes and quiet training words — plus a few broad groups such as beagle, hound and mutt. There are no breed-registry titles, pet-store brands or cartoon characters." },
    { q: "What should I play after the Dogs theme?", a: "Cats offers a soft companion set; Animals and Farm Animals widen the mood. Large Print on this site keeps fewer words on a 9×9 grid when you want a shorter session." },
  ],
};
