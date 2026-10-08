import type { FaqItem } from "../components/Faq";

/** Topic-specific answers based on the real catalog and available printable packs. */
export const THEME_FAQ: Record<string, FaqItem[]> = {
  halloween: [
    { q: "Are these Halloween word searches scary?", a: "The word bank includes costumes, harvest vocabulary and familiar folklore words, rather than graphic horror or film characters. Preview each puzzle's word list before choosing an activity. Easy grids use only across and down directions; hard grids add backwards and diagonal words." },
    { q: "Can I print a Halloween activity with answers?", a: "Yes. The Halloween printable pack includes two 9×9 puzzles and their answer keys in A4 and US Letter. Each puzzle has eight words with across and down directions. Download the pack for personal, classroom or community activities and keep the Words at Rest credit." },
  ],
  thanksgiving: [
    { q: "What is included in a Thanksgiving word search?", a: "These puzzles draw on the Thanksgiving word bank shown on this page. Each individual puzzle lists its exact words before you start, so you can choose vocabulary that fits your gathering. Pick easy for across and down words, medium for added diagonals, or hard for all eight directions." },
    { q: "Is there a printable Thanksgiving activity pack?", a: "Yes. The printable Thanksgiving pack provides two large print puzzles with separate answer keys. Choose US Letter or A4; both versions use the same 9×9 grids and eight-word lists. No account is needed, and the same puzzles are available to play online." },
  ],
  christmas: [
    { q: "Are these Christmas word searches suitable for a group activity?", a: "You can choose a difficulty and preview the full word list to suit your group. The Christmas theme uses seasonal vocabulary such as wreaths, carols, candles and holly. There is no timer online, and the large print printable pack offers two short activities with answer sheets for the organizer." },
    { q: "Can I get Christmas word searches in A4 and Letter?", a: "Both sizes are available from the Christmas printable pack linked above. Each file contains two large print puzzle pages and two answer pages, using the same grids as the online puzzles. Print just the puzzle pages for participants and retain the answers for checking." },
  ],
  winter: [
    { q: "How is the winter theme different from Christmas?", a: "Winter focuses on the season: snow, cold-weather clothing, cocoa and other midwinter vocabulary. Christmas has its own holiday collection. Use the exact word list on a puzzle page to choose between them; winter is also a useful option for activities after the December holidays." },
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
