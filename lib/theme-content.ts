/**
 * Extra, theme-specific hub copy (written in-house). Shown on /themes/[theme] under the
 * main description. Keep it honest: describe the word list and how the puzzles play.
 */
export interface ThemeExtra {
  /** What the word list covers, in plain language. */
  vocabulary: string;
  /** When / for whom this theme works well. */
  goodFor: string;
  /** One concrete solving tip that fits this word list. */
  tip: string;
}

export const THEME_EXTRA: Record<string, ThemeExtra> = {
  halloween: {
    vocabulary:
      "The Halloween list mixes harvest words (gourd, hayride, orchard, cider) with the gentler side of the holiday — lanterns, costumes, owls and moonlight — plus a handful of classic folklore names such as werewolf and vampire. Nothing gory, no film characters, and nothing aimed at small children.",
    goodFor:
      "It suits an October evening, a classroom of older students, a care-home activity hour or a quiet break between trick-or-treaters. The easy grid is a friendly warm-up; the hard grid hides 18 words in all eight directions, including backwards.",
    tip: "Long words with distinctive letters — the double O in BROOMSTICK, the two Ws in WEREWOLF — are easier to spot than short ones like BAT or OWL. Find the long words first and the short ones fall into place.",
  },
  fall: {
    vocabulary:
      "The fall list leans into the slow texture of the season: acorns, maple, chestnuts, woodsmoke, haybales, footpaths and frost. Color words such as amber, golden and rust sit beside months and walks, so the puzzle reads a little like a country diary.",
    goodFor:
      "A good choice for September to November mornings, autumn-themed clubs and anyone who wants a seasonal puzzle that is not about Halloween. Words are everyday English with no brand names.",
    tip: "Several fall words share endings — MIGRATION and MIGRATING, CORNFIELD and CORNMAZE. When you find one, check the letters nearby before you move on; the grid often places related words close together by chance.",
  },
  christmas: {
    vocabulary:
      "Our Christmas list is about the quiet parts of December: wreaths, carols, cocoa, candles, garlands, holly and ivy, icicles and the winter solstice. It avoids trademarked characters and keeps religious and secular words in a gentle balance.",
    goodFor:
      "It works well for family afternoons, holiday activity sheets for adults, and calm evenings by the fire. Grids range from a 10×10 easy puzzle to a 15×15 hard puzzle where words can run backwards and diagonally upwards.",
    tip: "Several Christmas words contain double letters — HOLLY, BELLS and GINGERBREAD. Scan for “LL” and “EE” pairs first; they jump out of a grid quickly.",
  },
  animals: {
    vocabulary:
      "The animals list ranges from back-garden creatures (hedgehog, robin, sparrow, mole) to the wider world (giraffe, kangaroo, walrus, flamingo). Every word is a common English animal name — no cartoon mascots, no zoo brands.",
    goodFor:
      "A good all-ages-adult theme: easy to recognize, pleasant to read aloud and well suited to grandparents solving with grandchildren of 13 and up. Animal names are also a classic choice for gentle memory and vocabulary practice.",
    tip: "Animal names often start with less common letters — K for KOALA and KANGAROO, Z for ZEBRA, W for WALRUS. Scan the grid for those first letters and follow each one outwards.",
  },
  space: {
    vocabulary:
      "Space puzzles use real astronomy vocabulary: the eight planets, nebulae, comets, quasars and pulsars, eclipses, equinoxes and constellations. There are no film or franchise names — just the sky as astronomers describe it.",
    goodFor:
      "Ideal for curious adults, stargazers and anyone who enjoys words with unusual letters. Longer words on the list such as CONSTELLATION, TELESCOPE and ASTRONOMY make the search feel satisfying.",
    tip: "Q and Z are rare in a grid, so QUASAR and ZENITH are quick wins whenever they appear. Look for the letter, then check all eight neighbors for the second letter of the word.",
  },
  sports: {
    vocabulary:
      "The sports list covers games and activities from around the world — tennis, cricket, rugby, badminton, archery, fencing, rowing and yoga — plus the language of training, stadiums and medals. No team names or brands.",
    goodFor:
      "A friendly pick for sports fans, retirement-community activity sessions and anyone who likes words they already know well. Familiar words make it a relaxing choice when you want an easy win.",
    tip: "Many sports words end in “-ING” (SWIMMING, CYCLING, ROWING, SAILING). Scan for the I-N-G cluster and work backwards to find the start of each word.",
  },
  food: {
    vocabulary:
      "Food puzzles gather herbs and spices (basil, thyme, saffron, cumin), baker’s staples (flour, yeast, sourdough), market fruit and everyday dishes such as risotto, broth and stew. Just ingredients and cooking words — no restaurant chains.",
    goodFor:
      "A warm, familiar theme for home cooks and anyone who likes to plan the next meal while solving. It also pairs well with a mid-morning coffee break.",
    tip: "Short food words such as TEA or HERB hide inside longer ones. If a word seems to vanish, it may be overlapping another — check crossings where two words share a letter.",
  },
  ocean: {
    vocabulary:
      "The ocean list moves from shoreline to deep water: tides, harbors, lagoons, estuaries, coral reefs, seabirds, lighthouses and shipwrecks. The words have a slow, rolling rhythm that suits the theme.",
    goodFor:
      "A calming choice for summer afternoons, coastal holidays or simply imagining one. The medium and hard grids add diagonal and reverse words for a longer, steadier search.",
    tip: "Several ocean words repeat the same few letters — CURRENT and CURRENTS, SEAL and SEABREEZE. Once you find one, mark it mentally so you do not mistake it for its longer cousin.",
  },
  dogs: {
    vocabulary:
      "Dog puzzles use everyday companion vocabulary — LEASH, COLLAR, HARNESS, KENNEL, FETCH, PAWPRINT, COMPANION, BLANKET, CUSHION, GROOM and PARK — plus quiet training words such as HEEL, COME and SIT and a few broad groups like BEAGLE, HOUND and MUTT. No breed-club registries, pet-store brands or cartoon characters. Short words like PAW, TOY, PUP and BED keep easy boards friendly; longer anchors like COMPANION, PAWPRINT and HARNESS steady harder ones.",
    goodFor:
      "For dog owners, dog walkers, seniors who miss having a dog around and activity rooms that want a cheerful pet theme. It pairs with Cats, Animals and Farm Animals for a wider companion hour. Large print suits shared tablets when walks are done. The tone stays grown-up and brand-free — a calm afternoon puzzle, not a veterinary guide and not a children's mascot sheet.",
    tip: "Short words like SIT, PAW and TOY are hardest to see — leave them for last and check the edges. Find COMPANION, PAWPRINT, HARNESS, BLANKET and KENNEL first; the double P in PAWPRINT and the NN in KENNEL jump out. On hard grids, dog words often run backwards along a walk path — if LEASH will not appear forwards, try right-to-left on the same row.",
  },
  cats: {
    vocabulary:
      "The cats list is soft and domestic: kittens, purrs, whiskers, sunbeams, windowsills, yarn and cushions, plus coat patterns like tabby and calico and a few breeds such as Siamese and Persian.",
    goodFor:
      "Perfect for a slow evening on the sofa — with or without a cat on your lap. The words are short to medium length, which makes the easy grid especially relaxing.",
    tip: "WINDOWSILL is the longest word in the bank and contains a rare “WS” pair. When it is in your puzzle, find it first; it often anchors one side of the grid and helps you rule out letters around it.",
  },
  travel: {
    vocabulary:
      "Travel puzzles draw on maps, trains, ferries, inns, markets, museums and postcards — the vocabulary of slow journeys rather than airports. No airline, hotel or booking brands.",
    goodFor:
      "A good theme for armchair travelers, retirees planning a trip and anyone who likes to daydream between words. The medium grid adds diagonals for a little extra wandering.",
    tip: "Longer travel words have patterns that stand out: the “OU” in SOUVENIR, the “SSP” in PASSPORT, the repeating I-T-I at the start of ITINERARY. Spot the pattern, then trace it in a straight line in both directions.",
  },
  music: {
    vocabulary:
      "Music puzzles use instruments (cello, oboe, clarinet, harp), musical forms (sonata, fugue, etude, lullaby) and concert-hall words such as rehearsal, baton and encore. No artist names or record labels.",
    goodFor:
      "A natural fit for choir members, music teachers, lifelong listeners and anyone who learned an instrument years ago. Several words make a pleasant small vocabulary refresher.",
    tip: "Words like RHYTHM (when it appears) have almost no vowels, which makes them stand out once you know to look for “THM”. Try spotting unusual consonant clusters before scanning letter by letter.",
  },
  garden: {
    vocabulary:
      "The garden list covers soil and seeds, tools (hoe, spade, trowel, rake), structures like trellises and arbors, and flowers from dahlias and peonies to lavender and tulips.",
    goodFor:
      "Made for gardeners in the off-season, allotment friends and anyone who finds plant names calming. It pairs well with a cup of tea on a rainy day when you cannot get outside.",
    tip: "Flower names are short and vowel-heavy (IRIS, LILY, ROSE). Start with the long, consonant-rich words such as GREENHOUSE and COMPOST, then hunt the flowers.",
  },


  golf: {
    vocabulary: "Golf lists use everyday course English — tee, par, birdie, fairway, bunker, putter — with no club brands or tournament trademarks.",
    goodFor: "A calm fit for golfers, armchair Open-watchers and seniors who know the scorecard language.",
    tip: "Long words like SCORECARD and HANDICAP stand out; find them first, then hunt short ones like PAR and TEE.",
  },
  baseball: {
    vocabulary: "Baseball lists stick to diamond vocabulary — inning, dugout, slider, shortstop — with no team or league names.",
    goodFor: "Summer afternoons, sports fans and anyone who likes familiar game words without scoreboard noise.",
    tip: "Look for distinctive clusters such as STR in STRIKE or OUT in OUTFIELD before scanning letter by letter.",
  },
  tennis: {
    vocabulary: "Tennis lists cover court talk — serve, rally, deuce, forehand, baseline — without tournament brands.",
    goodFor: "Players, spectators and adults who like a paced, grown-up sports puzzle.",
    tip: "Compound words such as FOREHAND and TIEBREAK are easier to spot than short ones like ACE or LET.",
  },
  fishing: {
    vocabulary: "Fishing lists use shoreline English — rod, reel, bait, current, trout — with no tackle-brand names.",
    goodFor: "A relaxed theme for anglers and seniors who prefer outdoor quiet over stadium sports.",
    tip: "Short words like ROD and NET hide along edges; leave them until the longer tackle words are found.",
  },
  baking: {
    vocabulary:
      "The baking bank stays pantry-plain: FLOUR, YEAST, KNEAD, PROOF, CRUST, BATTER, BUTTER, LOAF, PASTRY, MUFFIN, GLAZE, DOUGH, OVEN, CINNAMON and BISCUIT among others. Short kitchen bits such as EGG, MIX, BUN, PIE, BAKE and MILK keep easy grids friendly. No bakery brands and no dessert-chain slogans — only warm-kitchen English. Longer words like CINNAMON, PASTRY and BISCUIT anchor harder boards the way a cooled loaf anchors a counter.",
    goodFor:
      "Suited to home bakers, care-home kitchen clubs and anyone who likes a warm kitchen-minded puzzle without recipe-blog jargon. It pairs with Cooking and Kitchen for a longer pantry session, and with Desserts when you want a sweeter companion hub. Large print helps after a floury afternoon. Seniors who baked for decades often know every word without needing brand packaging.",
    tip: "Find CINNAMON, PASTRY, BISCUIT, BUTTER and BATTER before short words like EGG, BUN and MIX. Double letters help: the TT in BUTTER and BATTER, and the FF in MUFFIN. On hard grids, technique words often run on long horizontals like a rolled sheet — clear the middle rows early. KNEAD and DOUGH are a useful pair; spotting one often means bakery vocabulary is nearby."
  },
  desserts: {
    vocabulary: "Dessert lists lean into cakes, custards and cold treats — mousse, cobbler, ganache — without restaurant chains.",
    goodFor: "A sweet, low-pressure theme for after-dinner solving.",
    tip: "Long pastry words such as CHEESECAKE and SHORTCAKE anchor one side of the hard grid.",
  },
  herbs: {
    vocabulary: "Herbs and spices lists name kitchen plants and pantry spices — basil, thyme, cumin, saffron — with no brand jars.",
    goodFor: "Cooks, gardeners and anyone refreshing herb vocabulary.",
    tip: "Unusual letters help: the FF in SAFFRON, the Z in ZEST when it appears, the double M in CINNAMON.",
  },
  fruits: {
    vocabulary: "Fruit lists use common market names — apple, citrus, berries, stone fruit — in everyday English.",
    goodFor: "A gentle evergreen theme for all ages of adult solvers.",
    tip: "Berry names share endings; when you find BERRY, check nearby letters for BLUE or RASP.",
  },
  instruments: {
    vocabulary: "Instrument lists name strings, winds, brass and percussion — violin, clarinet, trumpet, timpani — with no brand names.",
    goodFor: "Music students, teachers and lifelong listeners.",
    tip: "Long names such as SAXOPHONE and TAMBOURINE are usually easier than short ones like HORN or DRUM.",
  },
  jazz: {
    vocabulary: "Jazz lists use style and session words — swing, blues, improvise, quartet — with no artist or label names.",
    goodFor: "Jazz listeners who want genre vocabulary without celebrity trivia.",
    tip: "Words ending in -ISE / -ION (IMPROVISE, SESSION) reverse cleanly; scan for ESI or NOI clusters.",
  },
  classical: {
    vocabulary: "Classical lists use forms and markings — sonata, symphony, allegro, crescendo — not composer-as-brand titles.",
    goodFor: "Concert-goers and anyone who remembers theory terms from school.",
    tip: "Italian tempo words (ALLEGRO, ADAGIO, ANDANTE) have distinctive vowel patterns — spot those first.",
  },
  "music-terms": {
    vocabulary:
      "Expect classroom and score words: ACCENT, BAR, BEAT, CADENCE, CHORD, CLEF, DYNAMICS, FERMATA, FLAT, HALF, HARMONIZE, HARMONY, INTERVAL, MAJOR, MEASURE, MINOR, NOTE, REST, RHYTHM, SCALE, SHARP, STAFF, TEMPO and TONE among the full bank. Nothing names a living performer or a streaming service. Short words like BAR, FLAT and NOTE suit easy grids; RHYTHM, DYNAMICS and FERMATA challenge harder ones with unusual letter patterns.",
    goodFor:
      "Choir members, teachers, returning adult students and listeners who enjoy knowing the difference between a fermata and a rest. It differs from Instruments by naming ideas rather than objects, and from Jazz or Classical by staying theory-neutral. Large print helps when rehearsal lighting is poor. After terms, try Instruments or Classical for a fuller music evening.",
    tip: "Consonant clusters win: RHYTHM has almost no vowels — hunt THM. DYNAMICS and FERMATA carry rare Y and F-M pairs. Find those long oddities before BAR, BEAT and NOTE. On hard grids, music terms often share a staff-like horizontal row; once you clear one line, scan the next as if reading a score.",
  },
  thanksgiving: {
    vocabulary:
      "The Thanksgiving list covers the harvest table (gravy, maize, cider, yams, pie), kitchen prep (stuffing, cranberry, cornbread, platter), autumn walks (gourd, orchard, hayride, cornucopia) and quieter gratitude words such as thanks, blessing, hospitality and reunion. Everyday English only — no brand names and no licensed characters.",
    goodFor:
      "A natural fit for November afternoons, family gatherings, care-home activity hours and anyone who wants a seasonal puzzle that feels grown-up. The easy grids warm up with short table words; the hard grid hides eighteen longer tradition words in all eight directions; large print keeps eight short words on a 9×9 grid.",
    tip: "Long words with distinctive letters — the double L in TABLECLOTH, the PH in HOSPITALITY, the OU in CORNUCOPIA — are easier to spot than short ones like PIE or YAMS. Find the long words first.",
  },
  winter: {
    vocabulary:
      "The winter list leans into snow and frost, wool layers (mitten, scarf, sweater, parka), cocoa by the fire, and midwinter words such as blizzard, evergreen, woodsmoke and snowdrift. It stays with the season itself rather than Christmas characters, so it pairs well beside our Christmas theme without overlapping licensed names.",
    goodFor:
      "Quiet December-to-February evenings, snow-day afternoons and anyone who likes cold-weather vocabulary without holiday pressure. Easy grids use short familiar words; hard grids pack longer freeze-and-fire words into a 15×15 board.",
    tip: "Several winter words share openings — SNOWFLAKE, SNOWDRIFT, SNOWBOUND. When you find SNOW, check the letters that follow before you move on.",
  },
  valentines: {
    vocabulary:
      "The Valentine's list keeps a calm adult tone: HEART, ROSE, CARD, BOUQUET, ENVELOPE, KEEPSAKE, MEMENTO, CHOCOLATE and TEA, plus longer affection words such as ADMIRATION, AFFECTION, DEVOTION, COURTSHIP, TENDERNESS and CHERISH. No glitter cartoon hearts, no trademarked characters and no greeting-card slogans — just ordinary English for a gentle February puzzle. Short words like HUG, GIFT and WISH keep easy boards warm; the longest affection nouns steady harder grids.",
    goodFor:
      "A grown-up choice for Valentine's Day, anniversary afternoons, care-home craft hours or any quiet evening when you want a soft theme. It pairs with Wedding, Friendship and Kindness for a wider kindness hour. Large print uses fewer words on a 9×9 grid when phones are passed around the table. Available all year, so February is optional — the same editorial promise as the rest of the site.",
    tip: "Words ending in -NESS or -TION (KINDNESS, AFFECTION, DEVOTION, ADMIRATION) reverse cleanly — look for SEN or NOIT clusters when you are stuck. Find ADMIRATION, COURTSHIP, TENDERNESS and BOUQUET before HUG, GIFT and ROSE. On hard grids, affection words often sit on long horizontals like a written note — clear the middle rows early.",
  },
  easter: {
    vocabulary:
      "The Easter list mixes spring garden words (lily, daffodil, blossom, willow, meadow) with baskets, dawn light and a handful of quiet faith words familiar from everyday English — hope, grace, hymn, chapel, alleluia. It avoids cartoon mascots and keeps religious and seasonal language in a gentle balance.",
    goodFor:
      "Spring mornings, church-group activity tables, seniors' hours and anyone who wants a calm Easter puzzle. Cross-link with our Bible theme if you prefer Scripture vocabulary; stay here for a broader spring mood.",
    tip: "Flower names are often short and vowel-heavy (LILY, TULIP). Start with longer words such as DAFFODIL, ALLELUIA and HATCHLING, then hunt the short ones along the edges.",
  },
  "new-year": {
    vocabulary:
      "The New Year list covers calendars, midnight countdowns, fireworks, resolutions and quieter fresh-start words such as intention, gratitude and renew. Everyday English only — no champagne brands and no licensed party characters.",
    goodFor:
      "A calm fit for January mornings, New Year's Eve quiet hours and anyone who wants a seasonal puzzle without a noisy party app. Easy grids warm up with short words; hard grids pack longer resolution vocabulary.",
    tip: "Long words with distinctive letters — the double N in COUNTDOWN, the TION in RESOLUTION and INTENTION — are easier to spot than short ones like YEAR or WISH.",
  },
  "st-patricks": {
    vocabulary:
      "The list mixes Irish-spring and folklore-light words: BAGPIPE, BLESSING, BREAD, BUTTER, CABBAGE, CASTLE, CELTIC, CHARM, CHURCH, CLOVER, COAST, COIN, GREEN, HARP, HILL, PIPE, RAIN, SHAMROCK and STONE among others. No studio mascots. Short words like COIN, HILL and PIPE suit easy puzzles; BAGPIPE, SHAMROCK and BLESSING fill harder grids. Food words such as CABBAGE, BREAD and BUTTER sit beside landscape words so the day feels domestic as well as festive.",
    goodFor:
      "March mornings, community centers and adults who enjoy Celtic-tinged vocabulary without loud party themes. It differs from Spring by carrying specific March traditions while staying respectful and brand-free. Large print helps when green decorations already fill the table. After St. Patrick's Day, Spring and Flowers continue the season. Readers who want green-season vocabulary without party noise will find this closer to Spring than to a costume aisle.",
    tip: "Long distinctive spellings — SHAMROCK, BAGPIPE, BLESSING, CELTIC — come first; then COIN, HILL and PIPE. The CK ending in SHAMROCK and the GP in BAGPIPE are rare landmarks. On hard boards, clover-words may run backwards; try reverse reading before you abandon a row. CLOVER and SHAMROCK are related ideas with different spellings — treat them as separate hunts.",
  },
  "mothers-day": {
    vocabulary:
      "The bank gathers soft May words: ADMIRE, APRON, BLESSING, BLOOM, BOUQUET, BREAKFAST, BRUNCH, CARD, CARE, CHERISH, COFFEE, COMFORT, FLOWER, GIFT, HUG, LOVE, MOM, NOTE and TEA among others. Nothing is a greeting-card trademark or cartoon mascot. Short words like MOM, HUG and TEA suit easy boards; BOUQUET, BREAKFAST and CHERISH stretch across harder ones. Quiet verbs such as ADMIRE and CHERISH keep the tone personal rather than commercial.",
    goodFor:
      "May family tables, care-home craft hours and anyone who wants seasonal warmth without shopping pressure. It sits beside Flowers for blooms and Spring for wider seasonal vocabulary. Large print keeps brunch words readable when phones are passed around the table. Kindness and Gratitude are natural follow-ons when the holiday weekend ends. It is meant for a slow May morning, not a shopping sprint — the same editorial promise as the rest of the site.",
    tip: "Long words first — BOUQUET, BREAKFAST, CHERISH, BLESSING — then MOM, HUG and TEA. Double letters in COFFEE and BLOOM help. On medium grids, flower-adjacent words often share diagonals; finding BLOOM can reveal FLOWER nearby. BRUNCH and BREAKFAST can overlap in letters mentally; confirm each full spelling on the printed list.",
  },
  "fathers-day": {
    vocabulary:
      "Words lean toward ordinary affection and shared pastimes: ADVICE, BENCH, BOAT, CAMP, CARD, CARE, CATCH, CHAIR, COFFEE, COMFORT, DAD, FAMILY, FISHING, GRILL, HUG, LESSON, TIE, TOOL and WALK among the bank. No retailer slogans or licensed characters. Short words like DAD, HUG and TIE keep easy puzzles warm; longer ones such as COMFORT and FISHING fill harder grids.",
    goodFor:
      "Families planning a low-key June gathering, activity groups in June and adults who want a seasonal puzzle that is not about shopping. It differs from Mother's Day by leaning into tools, boats and grill-side vocabulary while keeping the same gentle tone. Large print helps when cards and puzzles share the table. After Father's Day, Summer and Fishing extend the season.",
    tip: "Find FISHING, COMFORT and FAMILY before DAD, HUG and TIE. The double F in COFFEE and the CH in CATCH or CHAIR are useful anchors. On hard grids, short dad-words often hide backwards along the bottom row — check right-to-left before you give up.",
  },
  "independence-day": {
    vocabulary:
      "Expect summer-civic and picnic English: ANTHEM, BAND, BANNER, BASKET, BLANKET, BOOM, BRIDGE, CHEER, CITIZEN, COOLER, CORN, COURTHOUSE, FLAG, FIREWORK, PARADE, PICNIC, SPARKLER and STAR among the set. We avoid candidate names and advocacy slogans. Short words like BAND, FLAG and CORN hide on easy boards; FIREWORK, COURTHOUSE and SPARKLER challenge harder ones. Civic nouns such as CITIZEN and COURTHOUSE sit beside picnic gear so the day feels communal without becoming a lecture.",
    goodFor:
      "July family gatherings, quiet porches before fireworks and adults who want a patriotic-tinged puzzle without argument. It differs from American History by staying in the picnic-and-parade present. Large print helps at dusk when lighting is uneven. Summer and Beach make easy next themes after the cooler is empty. Families who want a printable-feeling online grid for the holiday table will find the tone closer to a porch than a rally.",
    tip: "Hunt FIREWORK, COURTHOUSE, SPARKLER and BANNER before FLAG, BAND and CORN. Double letters in BANNER and BASKET stand out. On hard grids, parade words sometimes march diagonally down the page — follow one diagonal as if it were a route on a town map. BOOM and BAND are short and easy to miss once fireworks words dominate your attention — leave a final edge sweep for them.",
  },
  spring: {
    vocabulary:
      "The spring list is about thaw, buds, showers, nests and longer daylight — garden and weather English rather than one holiday mascot set.",
    goodFor:
      "March to May mornings, garden clubs and anyone who wants a seasonal puzzle that is not Easter-only.",
    tip: "Flower names share endings; when you find DIL in DAFFODIL, check nearby for related blooms before moving on.",
  },
  summer: {
    vocabulary:
      "Summer lists gather shade, lemonade, beaches, lawns, fireflies and slow vacation English — no resort or sunscreen brands.",
    goodFor:
      "Long afternoons, porch solving and seniors who like familiar warm-weather words.",
    tip: "Compound words such as SUNHAT, SUNSCREEN and FIREFLY jump out; hunt short ones like FAN and HEAT last.",
  },
  vegetables: {
    vocabulary:
      "Expect market names: ARTICHOKE, ARUGULA, ASPARAGUS, BEAN, BEET, BROCCOLI, CABBAGE, CARROT, CAULIFLOWER, CELERY, CHARD, CORN, CUCUMBER, KALE, LEEK, LETTUCE, ONION, PEPPER, POTATO, SPINACH, SQUASH and TURNIP among others. Everyday English spellings only. Short words like BEAN, BEET and CORN hide on easy grids; CAULIFLOWER, ASPARAGUS and ARTICHOKE dominate hard ones. Leafy names and root names share the bank so spring and autumn cooks both feel at home.",
    goodFor:
      "Gardeners, cooks and seniors who grew up with a vegetable patch. It differs from Garden by listing edible plants rather than tools and blooms. Large print keeps long produce names readable. Fruits and Herbs round out a full kitchen-garden set. Market shoppers who already know the produce aisle will recognize every entry without needing a botany lesson.",
    tip: "Attack the long names first — CAULIFLOWER, ASPARAGUS, ARTICHOKE, BROCCOLI — then BEAN, BEET and CORN. Double L in BROCCOLI and CAULIFLOWER, and the GG in? — look for CC in BROCCOLI. On hard boards, vegetable words often run vertically like rows in a bed; scan columns after rows. ARUGULA and ASPARAGUS both start with A — scan the A's once, then branch outward for each word.",
  },
  breakfast: {
    vocabulary:
      "Morning foods and moments: BACON, BAGEL, BANANA, BERRY, BISCUIT, BUTTER, CEREAL, COFFEE, CREAM, CROISSANT, DANISH, DAWN, EGGS, JAM, JUICE, MUFFIN, OATMEAL, OMELET, PANCAKE, SYRUP, TOAST and YOGURT among the bank. No chain trademarks. Short words like JAM and EGGS suit easy boards; CROISSANT, OATMEAL and PANCAKE challenge harder ones. Time-of-day words such as DAWN keep the mood early and unhurried, matching the rest of Words at Rest.",
    goodFor:
      "Early risers, weekend brunch tables and quiet care-home mornings. It stays softer than full Cooking and sweeter than Kitchen utensils alone. Large print helps before glasses are found. Coffee & Tea is the natural companion cup beside this hub. Unlike a generic Food hub pass, every answer here belongs to the first meal, which makes reading the list aloud feel like setting a table.",
    tip: "Long pastry spellings — CROISSANT, PANCAKE, OATMEAL, BISCUIT — first; then JAM, EGGS and TOAST. Double letters in BUTTER, COFFEE and MUFFIN help. On hard grids, breakfast words may hide diagonally like crumbs — check both directions from any double T. CROISSANT's silent letters are still all present in the grid — trust the spelling on the list.",
  },
  "coffee-tea": {
    vocabulary:
      "The list mixes drinks and comforts: AFTERNOON, AROMA, BEAN, BISCUIT, BLACK, BLEND, BREW, CHAMOMILE, CINNAMON, COCOA, COFFEE, CREAM, CUP, HONEY, KETTLE, LEAF, MUG, POT, SAUCER, STEAM, SUGAR and TEA among others. We leave out chain trademarks and product lines. Short words like TEA, CUP and MUG hide easily; CHAMOMILE and CINNAMON stretch across harder boards. Herbal notes such as CHAMOMILE sit beside coffee words so tea drinkers are not treated as an afterthought.",
    goodFor:
      "Morning people, afternoon-tea traditionalists, care-home quiet hours and anyone who wants a kitchen theme softer than full Cooking. It sits beside Breakfast for early plates and Kitchen for utensils. Seniors often prefer this list because every word smells familiar. Large print keeps steam-and-biscuit words readable on tablets propped by the sofa. It is deliberately brand-free: no chain menus, only the shared English of cups, leaves and steam.",
    tip: "Long spice and herb spellings — CHAMOMILE, CINNAMON — are first targets; then sweep for TEA, CUP and MUG on the edges. Double letters in COFFEE and BISCUIT help. On medium grids, drink words often sit near each other like items on a tray — finding BREW can reveal BEAN one diagonal away. BLACK and BLEND are easy to confuse mid-scan — check the third letter before you mark.",
  },
  kitchen: {
    vocabulary:
      "Tools and actions fill the bank: APRON, BAKE, BAKING, BLENDER, BOARD, BOIL, BOWL, CHOP, COLANDER, CUP, DRAWER, FORK, KETTLE, KNIFE, LADLE, OVEN, PAN, PEEL, PLATE, POT, SINK, SKILLET, SPOON, STOVE and WHISK among others. No product lines. Short words like CUP, PAN and POT hide quickly; COLANDER, BLENDER and SKILLET stretch across hard grids. Prep verbs such as CHOP, BOIL and PEEL sit beside nouns so the list feels like a recipe without becoming one.",
    goodFor:
      "Home cooks, care-home baking clubs and anyone who finds kitchen nouns grounding. It differs from Cooking by naming objects more than techniques, and from Baking by staying general. Large print suits countertop tablet play. After kitchen tools, Breakfast or Desserts make tasty next stops. Home bakers can hop to Baking next; tea drinkers can open Coffee & Tea without leaving the kitchen mood.",
    tip: "Find COLANDER, BLENDER, SKILLET and DRAWER before CUP, PAN and POT. Double letters in OVEN? Look instead for LL in COLANDER and SKILLET's LL. On medium grids, utensil words often cluster like a drying rack — one find reveals another a row away. BAKE and BAKING may both appear — finish the longer word first so the shorter one does not steal its letters in your mind.",
  },
  birds: {
    vocabulary:
      "Bird lists use common English bird names plus nest, song and watching vocabulary — no cartoon mascots.",
    goodFor:
      "Birdwatchers, garden sitters and a calm nature companion to animals.",
    tip: "Long names like CHICKADEE and NUTHATCH stand out; leave ROBIN and OWL for last on harder grids.",
  },
  flowers: {
    vocabulary:
      "Flower lists name garden and florist blooms — rose, peony, lavender, magnolia — in everyday English.",
    goodFor:
      "Gardeners and anyone who finds bloom names calming; pairs well with the garden parent theme.",
    tip: "Short vowel-heavy names (IRIS, LILY, ROSE) hide easily; start with longer ones like DAFFODIL and WISTERIA.",
  },
  trees: {
    vocabulary:
      "Tree lists cover common tree names and woodland English — oak, maple, canopy, foliage — with no park brands.",
    goodFor:
      "Walkers, gardeners and seniors who like outdoor vocabulary year-round.",
    tip: "Look for distinctive clusters such as SYC in SYCAMORE or ACK in BLACK when related words appear.",
  },
  weather: {
    vocabulary:
      "Weather lists use rain, wind, frost, forecast and everyday sky English — no weather-app brands.",
    goodFor:
      "A practical evergreen theme for all seasons and calm indoor afternoons.",
    tip: "Long words like THERMOMETER, BAROMETER and LIGHTNING anchor the hard grid; short ones like FOG hide on edges.",
  },
  "us-states": {
    vocabulary:
      "The list includes state names such as ALABAMA, ALASKA, ARIZONA, ARKANSAS, CALIFORNIA, COLORADO, CONNECTICUT and DELAWARE plus helpful map nouns — BORDER, CAPITAL, COAST, DESERT — drawn from the theme bank. Spellings match everyday English maps. We omit party logos, candidate names and tourism slogans. Long names like CONNECTICUT and CALIFORNIA dominate hard grids; shorter ones such as OHIO (when present) and COAST keep easy puzzles kind.",
    goodFor:
      "A classic evergreen for American readers abroad, grandparents reviewing the map with older kids, classroom adults and anyone who finds state names oddly soothing. It complements American History and Presidents without turning into a civics exam. Large print helps with longer New England spellings. After states, World Capitals or Continents stretch the map further.",
    tip: "Double letters appear often — ALABAMA, TENNESSEE-style patterns, MISSISSIPPI when in the set — so scan for AA, SS or LL early. CONNECTICUT's CT cluster and ARIZONA's Z are rare landmarks. Work longest names first; short coastal words hide inside longer ones if you rush. On hard boards, state names may run diagonally like a border line — check both directions from any capital C or A you spot.",
  },
  "world-capitals": {
    vocabulary:
      "The bank lists widely recognized capitals such as ACCRA, AMSTERDAM, ANKARA, ATHENS, BAGHDAD, BANGKOK, BEIJING, BEIRUT, BERLIN, BERN, BOGOTA and BRASILIA, among others in the full set. Spellings follow common English map forms. We do not add airline brands, hotel chains or tourist-campaign slogans. Longer names like AMSTERDAM and BRASILIA anchor hard puzzles; shorter ones such as BERN and ACCRA keep easy grids moving.",
    goodFor:
      "Armchair travelers, quiz-night regulars who want a calmer format, students of maps and seniors who still love spinning a globe. It differs from Cities by sticking to capital status, and from Countries by naming seats of government rather than nations. Large print helps with longer foreign spellings on small screens. After a capitals session, Continents and Travel make natural next stops.",
    tip: "Double letters are gifts: AMSTERDAM, BANGKOK and others often show repeated consonants. Scan for MM, NN or KK patterns before reading every row. Unusual openings — Accra's A-C-C, Beijing's J — jump out once you look for them. On hard grids, capitals may run backwards; if ATHENS will not appear left-to-right, try the reverse path from the final S.",
  },
  "human-body": {
    vocabulary:
      "Words stay ordinary and non-clinical: ANKLE, ARM, ARTERY, BACK, BLOOD, BONE, BRAIN, BREATH, CHEST, EAR, ELBOW, EYE, FINGER, HEART, KNEE, LUNG, MUSCLE, NERVE, SPINE and WRIST appear in the wider bank. We avoid disease names, procedure jargon and pharmaceutical trademarks. Short words like EAR, EYE and ARM suit easy boards; longer ones such as ARTERY and MUSCLE give hard puzzles more cover.",
    goodFor:
      "Adults who like clear concrete nouns, ESL learners refreshing body vocabulary and seniors who prefer familiar words over abstract themes. Activity leaders often choose it because every answer is easy to picture and say aloud. It is not a substitute for medical advice — only a word list. Large print pairs well when reading glasses are already in use. Yoga and Mindfulness offer gentler neighboring moods after you finish the grid.",
    tip: "Longer anatomy words — ARTERY, MUSCLE, BREATH, FINGER — should be found before three-letter ones like EAR, EYE and ARM, which vanish into crossings. Letter pairs such as EE in KNEE and ELBOW's EW are handy landmarks. On hard grids, body words sometimes share a letter at a joint (literally): mark the shared cell carefully so both words stay visible in your progress.",
  },
  camping: {
    vocabulary:
      "The camping bank stays outdoors and brand-free: TENT, TRAIL, LANTERN, COMPASS, CANTEEN, GROVE, HIKE, KETTLE, FLASH, DAWN, DEW, MAP, LAKE and FIRE among others. Short camp bits such as LOG, BAG, ASH, PEG, COT and FLY keep easy grids friendly. No gear-company names and no park-franchise characters — only common woods English. Longer words like LANTERN, COMPASS and CANTEEN anchor harder boards the way a trail marker anchors a path.",
    goodFor:
      "Ideal for quiet evenings, outdoor clubs, care-home nature hours and seniors who like woods vocabulary without survival-show noise. It pairs with Hiking and Forests for a longer outdoor-minded session, and with National Parks when you want another trail-side hub. Large print helps after a bright day outside. Activity directors can run one sheet as a soft wind-down after a walk.",
    tip: "Find LANTERN, COMPASS, CANTEEN, TRAIL and GROVE before short words like LOG, ASH and PEG. Double letters help: the EE in DEED when present, or the double T in TENT. On hard grids, trail words often sit on long horizontals like a marked path — clear the middle rows early. FIRE and FLAME are a useful pair; spotting one often means camp vocabulary is clustered nearby."
  },
  horses: {
    vocabulary:
      "Barn, saddle and pasture English — no breed-club or brand names.",
    goodFor:
      "A calm animals child theme for riders and armchair horse people.",
    tip: "Long words like STALLION and PADDOCK stand out; leave PONY and HAY for last.",
  },
  cars: {
    vocabulary:
      "Wheels, roads and garage English without maker or model brands.",
    goodFor:
      "A practical transport theme for adults who know the driveway vocabulary.",
    tip: "Look for distinctive clusters such as HIGH in HIGHWAY or MET in ODOMETER.",
  },
  trains: {
    vocabulary:
      "Station, track and carriage English — no railroad brands.",
    goodFor:
      "A gentle transport theme for travellers and seniors who like timetable words.",
    tip: "Long words such as TIMETABLE and PASSENGER anchor the hard grid.",
  },
  airplanes: {
    vocabulary:
      "Flight vocabulary — wing, runway, cabin — without airline brands.",
    goodFor:
      "Calm sky-minded puzzles for adults; pairs well with travel.",
    tip: "Compound words like TAKEOFF and LANDING jump out of a grid quickly.",
  },
  farming: {
    vocabulary:
      "Field, barn and harvest English without agribusiness brands.",
    goodFor:
      "A seniors-friendly outdoor-kitchen theme year-round.",
    tip: "Double letters in BUTTER and CHEESE stand out; hunt short ones like HEN last.",
  },
  beach: {
    vocabulary:
      "Sand, tide and shore English — no resort brands. Companion to Ocean.",
    goodFor:
      "Summer afternoons and anyone who wants a coastal mood without swimwear ads.",
    tip: "Long words such as LIGHTHOUSE and UMBRELLA are easier than SUN or HAT.",
  },
  mountains: {
    vocabulary:
      "Peak, trail and alpine English without ski-resort brands.",
    goodFor:
      "Hikers and anyone who likes ridge vocabulary at a desk.",
    tip: "Words ending in -LINE or -ENT (TIMBERLINE, DESCENT) reverse cleanly — scan for those clusters.",
  },
  lakes: {
    vocabulary:
      "Still water, docks and quiet shores — no resort brands.",
    goodFor:
      "A calm water theme that pairs with fishing and ocean without overlapping lists.",
    tip: "Long words like REFLECT and TWILIGHT stand out; short ones like OAR hide on edges.",
  },
  school: {
    vocabulary:
      "Classroom English for adults — books and study words, not cartoon kids themes.",
    goodFor:
      "A gentle evergreen for lifelong learners and quiet desk mornings.",
    tip: "Long words such as SEMESTER and HOMEWORK anchor harder grids.",
  },
  jobs: {
    vocabulary:
      "Everyday work English — trades and callings without company brands.",
    goodFor:
      "Adults who like practical vocabulary; good for retirement-community activity hours.",
    tip: "Long trade names like CARPENTER and ELECTRICIAN are easier than JOB or PAY.",
  },
  friendship: {
    vocabulary:
      "Trust, kindness, letters and shared time — calm adult social vocabulary.",
    goodFor:
      "A soft theme for seniors' hours and anyone who wants a gentle list.",
    tip: "Words ending in -SHIP or -NESS (when present) and long ones like COMPANION stand out first.",
  },
  kindness: {
    vocabulary:
      "The kindness bank stays soft and brand-free: CARE, HELP, COURTESY, COMFORT, PATIENCE, FRIEND, GRACE, APOLOGY, HONEST, CHEER, INVITE, GENTLE, FORGIVE and THANKS among others when present. Short manners such as HUG, KIND, AID, JOY, HOPE and HAND keep easy grids friendly. No charity-brand slogans and no self-help catchphrases — only everyday courtesy English. Longer words like COURTESY, COMFORT and PATIENCE anchor harder boards.",
    goodFor:
      "A gentle evergreen for seniors' hours, care-home tables and calm evenings at home. It pairs with Friendship and Gratitude for a longer soft session, and with Volunteering when you want another community-minded hub. Large print helps shared tables. Use it as a quiet social puzzle, not as advice — the word list describes everyday manners, nothing more. No medical claims.",
    tip: "Find COURTESY, COMFORT, PATIENCE, APOLOGY and FORGIVE before short words like HUG, KIND and AID. Double letters help: the FF in OFFER when present, or repeated vowels in PEOPLE elsewhere. On hard grids, manner words often sit on long horizontals like a written note — clear the middle rows early. CARE and HELP are a useful pair; spotting one often means kindness vocabulary is clustered nearby."
  },
  gratitude: {
    vocabulary:
      "The gratitude bank stays reflective and brand-free: APPRECIATE, BLESSING, CARE, COMFORT, DAWN, EVENING, FAITH, FAMILY, FRIEND, GIFT, GRACE, GRATEFUL, GUEST, HEART, HOME, HOPE, HOST, LETTER, MEAL, MEMORY, MERCY, MORNING, NOTE, PEACE, PRAISE, PRAYER, QUIET, SHARE, SMILE, SUPPORT, TABLE, THANKFUL, THANKS, VISIT and WARM among others. Short words such as HAND, JOY, KIND, LOVE, REST and SONG keep easy boards friendly. No card-company slogans, no self-help brand names and no clinical claims — only everyday appreciation English. Longer anchors like APPRECIATE, GRATEFUL, THANKFUL and BLESSING steady harder grids.",
    goodFor:
      "Suited to quiet evenings, seniors' reflection hours, care-home activity tables and anyone who wants a soft theme without lecture. It pairs with Kindness and Friendship for a wider gentle hour, with Meditation for calm practice vocabulary, and with Thanksgiving when you want appreciation words outside a single November list. Large print helps when several people share one screen. Use it as a calm puzzle, not as therapy advice — the word list names ordinary thanks, nothing more.",
    tip: "Find APPRECIATE, GRATEFUL, THANKFUL, BLESSING and COMFORT before short words like JOY, KIND and LOVE. Double letters help: the PP in APPRECIATE, the FF in OFFER nearby in spirit — hunt GRATEFUL's TEF cluster and THANKFUL's NK. On hard grids, gratitude words often sit on long horizontals like a written note — clear the middle rows early. THANKS and THANKFUL share a stem; confirm each full spelling on the printed list so you do not stop too soon.",
  },
  mindfulness: {
    vocabulary:
      "The mindfulness bank stays present-tense and brand-free: ANCHOR, ATTEND, AWARE, BALANCE, BODY, BREATH, CALM, CENTER, EXHALE, FOCUS, GENTLE, GROUND, INHALE, LISTEN, MOMENT, NOTICE, PAUSE, PEACE, PRESENT, QUIET, RELAX, RELEASE, SETTLE, SILENCE, SIT, SLOW, SOFT, SPACE, STILL, STRETCH, TOUCH and WALK among others. Short words such as AIR, HEAR, LEAF, MIND, SEE and REST keep easy boards friendly. No meditation-app trademarks, no clinical diagnoses and no studio slogans — only everyday quiet-room English. Longer anchors like PRESENT, SILENCE, BALANCE and RELEASE steady harder grids.",
    goodFor:
      "Suited to adults and seniors who want a gentle calm theme without self-help jargon. Meditation is the natural child hub for a longer sit-word list; Yoga, Journaling and Gratitude widen the hour. Care homes and home solvers both do well with large print. Use it as a quiet evening puzzle, not as health advice — the word list describes noticing the moment, nothing more.",
    tip: "Find PRESENT, SILENCE, BALANCE, RELEASE and NOTICE before short words like AIR, SIT and SEE. Double letters help: the SS in SILENCE and SETTLE, the LL in STILL. On hard grids, calm words often sit on long horizontals like a held breath — clear the middle rows early. INHALE and EXHALE are a useful pair; spotting one often means the other is elsewhere, not overlapping.",
  },
  colors: {
    vocabulary:
      "Everyday colour names for paints, fabrics and nature hues — no paint brands.",
    goodFor:
      "A visual, low-pressure theme for all ages of adult solvers.",
    tip: "Long names such as TURQUOISE and LAVENDER stand out quickly.",
  },
  tools: {
    vocabulary:
      "Workshop and household tool English without brand names.",
    goodFor:
      "Handy adults and anyone who likes practical vocabulary.",
    tip: "Look for clusters like HAM in HAMMER or SSI in SCISSORS.",
  },
  soccer: {
    vocabulary:
      "Match-day words fill the list: ASSIST, BALL, BENCH, BOOTS, CAPTAIN, CARD, CLEATS, COACH, CORNER, CROSS, DEFENDER, FIELD, GOAL, KICK, MATCH, PASS, PITCH, REFEREE, SAVE, STRIKER, TACKLE, TEAM and WHISTLE among others. No club or sponsor names. Short words like GOAL, PASS and KICK suit easy puzzles; DEFENDER, REFEREE and WHISTLE stretch harder boards. The tone stays match-day practical: substitutions, sidelines and the shape of a quiet afternoon watching a game, still without naming any club.",
    goodFor:
      "Fans, casual players and seniors who watched decades of matches. It stays general — not a fantasy-league tool. Large print helps on sunny match-day porches. Basketball and Baseball offer other ball-sport moods after the final whistle. Compared with our general Sports hub, this list stays on one game so every word feels familiar to fans who never needed a rulebook refresher.",
    tip: "Find DEFENDER, REFEREE, WHISTLE and CAPTAIN before GOAL, PASS and KICK. Double letters in WHISTLE? Look for EE in REFEREE and CLEATS' EA. On hard grids, soccer words often cut diagonally like a through-ball — check long diagonals early. If ASSIST and PASS both appear, mark them carefully — they often cross on the letter S.",
  },
  basketball: {
    vocabulary:
      "Court talk includes ASSIST, BACKBOARD, BALL, BASKET, BENCH, BLOCK, CENTER, CLOCK, COACH, COURT, DRIBBLE, DRILL, FREE, GUARD, HOOP, JUMP, LAYUP, PASS, REBOUND, SHOT, SWISH, TEAM and TIMEOUT among the bank. No franchise names. Short words like HOOP, PASS and SHOT hide easily; BACKBOARD, DRIBBLE and REBOUND challenge hard grids. Practice words such as DRILL sit beside game words so the puzzle feels like a gym afternoon, not a merchandise catalogue.",
    goodFor:
      "Players, spectators and adults who like familiar sports words without scoreboard noise. Large print suits gym-bag phone play. Soccer and Baseball are natural sibling themes. Activity groups often pick basketball vocabulary because it is widely known across ages of adults. It is a focused sibling of Sports: same calm adult style, narrower court vocabulary, still free of franchise noise.",
    tip: "Long compounds first — BACKBOARD, DRIBBLE, REBOUND, TIMEOUT — then HOOP, PASS and SHOT. Double letters in DRIBBLE and BALL help. On hard boards, court words may run backwards from the baseline; try reverse traces along the bottom rows. When FREE and THROW-style fragments appear as separate list words, confirm each full entry on your list before you mark.",
  },
  "american-history": {
    vocabulary:
      "The list mixes civic nouns and period words: ABOLITION, ALLIES, AMENDMENT, ARMISTICE, BALLOT, CANAL, CAPITAL, CENSUS, COLONY, CONGRESS, CONSTITUTION, FRONTIER, LIBERTY, PIONEER, SENATE and TREATY appear beside quieter terms such as CHURCH and CIVIL. We deliberately skip living campaign brands, party logos and entertainment franchises. Long Latinate words such as CONSTITUTION and AMENDMENT give hard grids their backbone; shorter ones like CIVIL and CANAL keep easy puzzles approachable.",
    goodFor:
      "A thoughtful choice for lifelong learners, classroom adults, book-club evenings and seniors who enjoy history without a shouting match. It sits beside Presidents for personal names and offices, Independence Day for July vocabulary and U.S. States for geography. Because the tone is civic rather than sensational, it suits quiet libraries and care-home discussion hours. Large print keeps long words readable on phones.",
    tip: "Latinate endings help: scan for TION in CONSTITUTION, ABOLITION and AMENDMENT, and for NESS or ALLY patterns when they appear. Long words are your friends on hard grids — find them before hunting BALLOT or CANAL. Unusual letter pairs such as GZ? — look instead for NZ-less ARMISTICE (STI cluster) and the double S in CENSUS. Working longest-to-shortest prevents short civic words from vanishing inside longer ones.",
  },
  presidents: {
    vocabulary:
      "Common U.S. presidential surnames in everyday English — no party slogans.",
    goodFor:
      "A geography-adjacent civics theme for adults.",
    tip: "Long surnames such as WASHINGTON and EISENHOWER stand out; leave short ones like POLK for edges.",
  },
  dinosaurs: {
    vocabulary:
      "Scientific dinosaur and fossil English — not cartoon franchises.",
    goodFor:
      "Curious adults and museum-minded solvers.",
    tip: "Long names like TRICERATOPS and DIPLODOCUS are usually easier than BONE or EGG.",
  },
  insects: {
    vocabulary:
      "Garden and meadow insect English for adults.",
    goodFor:
      "Nature companions to garden and birds.",
    tip: "Long words such as GRASSHOPPER and BUTTERFLY stand out first.",
  },
  reptiles: {
    vocabulary:
      "Snake, turtle and lizard habitat English — no pet brands.",
    goodFor:
      "An animals child theme with a quieter wildlife tone.",
    tip: "Long words like CHAMELEON and HABITAT anchor harder grids.",
  },
  cooking: {
    vocabulary:
      "Technique and kitchen verbs — simmer, roast, whisk — no restaurant chains.",
    goodFor:
      "A food child theme for home cooks.",
    tip: "Double letters in BUTTER and BATTER jump out quickly.",
  },
  shopping: {
    vocabulary:
      "Market and errand English without store brands.",
    goodFor:
      "Everyday adult vocabulary for a practical break.",
    tip: "Long words like CHECKOUT and PURCHASE stand out; leave BAG and BUY for last.",
  },
  money: {
    vocabulary:
      "Everyday finance English — coin, budget, save — no bank brands.",
    goodFor:
      "A practical evergreen for adults; keep claims non-advisory.",
    tip: "Long words such as TRANSFER and INTEREST are easier than TAX or TIP.",
  },
  countries: {
    vocabulary:
      "Familiar nation names in everyday English — no campaign brands.",
    goodFor:
      "Adults who like calm world geography.",
    tip: "Long names such as AUSTRALIA and THAILAND stand out; leave short ones like PERU for edges.",
  },
  continents: {
    vocabulary:
      "The seven continents plus related geography English.",
    goodFor:
      "A map-minded evergreen for adults and seniors.",
    tip: "Long words like ANTARCTICA and HEMISPHERE anchor harder grids.",
  },
  cities: {
    vocabulary:
      "Familiar city names worldwide — not obscure trivia.",
    goodFor:
      "Armchair travellers refreshing place names.",
    tip: "Long names such as MELBOURNE and VANCOUVER are easier than ROME or LIMA.",
  },
  knitting: {
    vocabulary:
      "The knitting bank is a quiet craft drawer: ALPACA, BASKET, BLANKET, CABLE, CAST, CHART, CIRCULAR, COTTON, CROCHET, DECREASE, FIBER, GARTER, GAUGE, HANK, MITTEN, NEEDLE, PATTERN, PROJECT, PURL, RIBBING, SCARF, SHAWL, STOCKINETTE, SWEATER and YARN among others. Short tools such as HOOK, ROW, RIB, LOOP and HAT keep easy grids moving. Nothing is a yarn-shop brand or a pattern-company name — only common craft English. Longer compounds like STOCKINETTE and CIRCULAR anchor hard grids the way a finished cuff anchors a sleeve.",
    goodFor:
      "Ideal for evening knitters, craft-club tables, care-home activity hours and anyone who finds the click of needles more calming than a screen. It pairs with Sewing and Quilting for a wider handmade session, and with Reading when you want a lamp-side companion puzzle. Large print helps after a long project row. Seniors who learned to knit decades ago often recognize every word without needing a glossary.",
    tip: "Find STOCKINETTE, CIRCULAR, PATTERN, BLANKET and DECREASE before short tools like ROW, RIB and HAT. The double T in STOCKINETTE and the CIRC cluster stand out once you train your eye. On hard grids, craft words often run backwards along a row like a wrong-side pass — if PURL will not appear forwards, try reading right-to-left on the same line.",
  },
  reading: {
    vocabulary:
      "The reading bank walks a quiet shelf: AUTHOR, BIOGRAPHY, CHAPTER, EPILOGUE, FICTION, GLOSSARY, HISTORY, LIBRARY, NOVEL, PARAGRAPH, PASSAGE, PREFACE, BOOKMARK and JOURNAL among others, plus short desk nouns such as PAGE, NOTE, LINE, INK, LAMP and BOOK. No publisher, bookstore or software brands — only the calm English of an evening chapter. Longer anchors like EPILOGUE, BIOGRAPHY and PARAGRAPH steady the hard grid; PAGE, NOTE and LINE keep easy boards kind.",
    goodFor:
      "A natural pick for lifelong readers, book-club evenings, seniors rebuilding a reading habit and quiet rooms that already smell like paper. It pairs with Libraries and Journaling for a wider study hour, and with Calligraphy when you want desk craft after the chapter ends. Large print suits soft lamp light. Activity directors often choose this theme because every word is easy to picture and say aloud.",
    tip: "Find EPILOGUE, BIOGRAPHY, PARAGRAPH, GLOSSARY and LIBRARY before PAGE, NOTE and LINE. The GUE in EPILOGUE and the PH in PARAGRAPH jump out. On hard grids, bookish words often hide on long verticals like a spine — clear one column early. FICTION and HISTORY are a useful contrast pair; finding one rarely means the other overlaps.",
  },
  painting: {
    vocabulary:
      "The painting bank stays studio-plain: BRUSH, CANVAS, PALETTE, EASEL, GLAZE, HUE, LANDSCAPE, PORTRAIT, WATERCOLOR, ACRYLIC, IMPASTO, COMPOSITION, FRAME and GOUACHE among others. Short marks such as INK, LINE, DRY, ART, JAR and LIFE keep easy grids friendly. No gallery brands, no paint-brand slogans and no licensed cartoon motifs — only everyday studio English. Longer words like WATERCOLOR, COMPOSITION and LANDSCAPE anchor harder boards.",
    goodFor:
      "Suited to adults and seniors who want art vocabulary without critique-speak. It pairs with Photography and Museums for a longer looking afternoon, and with Calligraphy when you want another quiet handmade hub. Large print helps after a long mixing session under bright light. Home studios and activity rooms both do well with the calm list — color and craft, not commerce.",
    tip: "Find WATERCOLOR, LANDSCAPE, PORTRAIT, COMPOSITION and ACRYLIC before short words like INK, JAR and ART. Double letters help: the SS in BRUSH elsewhere? Prefer the double L in PALETTE and the repeated vowels in GOUACHE. On hard grids, medium names often sit on long diagonals — clear corners after the center. BRUSH and CANVAS are a useful pair; spotting one often means studio words are nearby."
  },
  birthday: {
    vocabulary:
      "Calm adult party English — cake, candle, wish — no licensed characters.",
    goodFor:
      "A gentle celebration theme year-round.",
    tip: "Long words such as BIRTHDAY and SURPRISE stand out; leave CAKE for edges.",
  },
  wedding: {
    vocabulary:
      "Ceremony English — vow, aisle, bouquet — no venue brands.",
    goodFor:
      "Adults who want a soft celebration list.",
    tip: "Long words like BOUQUET and LICENSE are easier than VOW or RING.",
  },
  chemistry: {
    vocabulary:
      "Classroom science English — atom, bond, flask — no product brands.",
    goodFor:
      "Curious adults; not medical or safety advice.",
    tip: "Long words such as HYDROGEN and MOLECULE anchor harder grids.",
  },
  mythology: {
    vocabulary:
      "Generic myth and tale English — hero, oracle, epic — no film franchises.",
    goodFor:
      "Readers of classic stories who want calm vocabulary.",
    tip: "Long words like LABYRINTH and POSEIDON stand out first.",
  },
  volcanoes: {
    vocabulary:
      "Geology English — magma, crater, ash.",
    goodFor:
      "Earth-science minded adults.",
    tip: "Long words such as OBSIDIAN and CALDERA are easier than ASH or HOT.",
  },
  forests: {
    vocabulary:
      "The forests bank stays woodland-plain and brand-free: BARK, CANOPY, CLEARING, CONIFER, CREEK, DAPPLE, DECIDUOUS, DEER, FERN, FLOOR, FOREST, FOX, GLADE, GROVE, HABITAT, LEAF, LOG, MIST, MOSS, NEEDLE, OWL, PATH, ROOT, SAPLING, SEEDLING, SHADE, SOIL, SQUIRREL, STREAM, STUMP, TIMBER, TRAIL, TRUNK, TWILIGHT, UNDERSTORY, WILDLIFE and WOODS among others. Short words such as DEW, FOX, LOG and OWL keep easy boards friendly. No timber-company names, no theme-park forests and no cartoon animals — only everyday woods English. Longer anchors like UNDERSTORY, DECIDUOUS, CLEARING and WILDLIFE steady harder grids.",
    goodFor:
      "Made for walkers, nature readers, seniors who love shaded paths and activity rooms that want a calm outdoor theme. It companions Trees and pairs with Hiking, Birds, Birdwatching and National Parks for a wider green hour. Large print helps when afternoon light is uneven. The tone stays observational and brand-free — a quiet woods puzzle, not a field guide lecture.",
    tip: "Find UNDERSTORY, DECIDUOUS, CLEARING, WILDLIFE and CANOPY before short words like DEW, LOG and OWL. Distinctive clusters help: the OU in UNDERSTORY and GROUND nearby in spirit — hunt UNDERSTORY's ND and RY. On hard grids, forest words often hang vertically like trunks — scan columns after rows. SAPLING and SEEDLING are related ideas with different spellings; confirm each full word on the printed list.",
  },
  rivers: {
    vocabulary:
      "Flowing-water English — current, delta, bank. Companion to Lakes.",
    goodFor:
      "Geography fans who like water themes.",
    tip: "Long words such as WATERFALL and ESTUARY stand out quickly.",
  },
  deserts: {
    vocabulary:
      "Arid vocabulary fills the bank: ARID, BLOOM, BUSH, BUTTE, CACTUS, CAMEL, CAMP, CANYON, DAWN, DESERT, DRY, DUNE, DUST, HAWK, HEAT, HORIZON, LIZARD, MESA, MIRAGE, OASIS, PLATEAU, SAND, SCORPION, SHADE, THORN, TRAIL, TWILIGHT and WADI among others. No tourism slogans. Short words like DRY, SUN and SAND hide on easy grids; PLATEAU, HORIZON and SCORPION anchor hard ones. Cool-night words such as DAWN, TWILIGHT and SHADE balance the heat words so the theme is not only about midday glare.",
    goodFor:
      "Geography lovers, travelers who remember dry-country roads and seniors who find desert nouns oddly peaceful. It differs from Beach by trading salt for sand and shade. Large print helps with longer words like SCORPION on small screens. Geology and Mountains continue the landform set. Pair it with National Parks when you want canyon overlooks after the dunes, or with Geology for rockier landforms.",
    tip: "Find PLATEAU, HORIZON, SCORPION and CANYON before DRY, SUN and SAND. Rare letters help: Q is absent, but Z in LIZARD and X? — look for Z and the SC in SCORPION. On hard grids, desert words often sit on long horizontals like a horizon line — clear the middle rows early. OASIS and ARID are useful contrast pair — finding one often means the other is elsewhere, not overlapping.",
  },
  museums: {
    vocabulary:
      "The museums bank stays visit-plain: GALLERY, CURATOR, ARTIFACT, EXHIBIT, COLLECTION, SCULPTURE, ARCHIVE, DOCENT, HALL, LABEL, FOSSIL, DISPLAY, BENCH and HISTORY among others. Short visit bits such as ART, LOOK, MAP, TOUR, ERA and CASE keep easy grids friendly. No museum-chain brands and no ticket-app slogans — only common gallery English. Longer words like COLLECTION, SCULPTURE and ARTIFACT anchor harder boards the way a long hall anchors a floor plan.",
    goodFor:
      "Suited to culture-minded adults, seniors who love quiet weekday visits, and activity rooms that want a soft educational theme. It pairs with Libraries and Painting for a longer culture session, and with Landmarks when you want another place-minded hub. Large print helps shared tables. Prefer the screen after a real visit? Large print online keeps the same calm pace.",
    tip: "Find COLLECTION, SCULPTURE, ARTIFACT, CURATOR and EXHIBIT before short words like ART, MAP and ERA. Double letters help: the LL in HALL and GALLERY, and the SS in FOSSIL. On hard grids, exhibit words often run on long horizontals like a labeled case — clear the middle rows early. GALLERY and HALL are a useful pair; spotting one often means visit vocabulary is clustered nearby."
  },
  sewing: {
    vocabulary:
      "The sewing bank stays hands-on and brand-free: APRON, BASTE, BIAS, BOBBIN, BUTTON, COTTON, DART, FABRIC, FACING, GATHER, GRAINLINE, HEM, INTERFACING, LINEN, LINING, MACHINE, MEND, NEEDLE, NOTCH, PATCH, PATTERN, PLEAT, PRESS, PRESSER, SCISSORS, SEAM, SHEARS, SILK, SPOOL, STITCH, THIMBLE, THREAD and ZIPPER among others. Short words such as PIN, CUT, SEW, EDGE, FOOT and BAG keep easy boards friendly. No machine trademarks, no pattern-company slogans and no cartoon craft mascots — only ordinary sewing-room English. Longer anchors like INTERFACING, GRAINLINE, SCISSORS and PATTERN steady harder grids.",
    goodFor:
      "Suited to home sewists, seniors who mend and make, craft clubs and anyone who wants a calm needle theme without shopping noise. It pairs with Knitting and Quilting for a wider handmade hour, and with Home when the project is a pillow or tote. Large print helps when thread spools already crowd the table. Use it as a quiet evening puzzle, not a how-to course — the word list names tools and cloth, nothing more.",
    tip: "Find INTERFACING, GRAINLINE, SCISSORS, PATTERN and THIMBLE before short words like PIN, CUT and SEW. Double letters help: the SS in SCISSORS and PRESS, the TT in BUTTON and COTTON. On hard grids, seam words often run along long horizontals like a basting line — clear the middle rows early. SEAM, SEAMALLOW and SEAMRIP look related on the printed list; hunt each full spelling separately so you do not mark the wrong neighbor.",
  },
  quilting: {
    vocabulary:
      "The quilting bank is a quiet sewing-room drawer: BACKING, BATTING, BINDING, BLOCK, BORDER, COTTON, FABRIC, PATTERN, PATCH, NEEDLE, LAYER, MEANDER, MITRE, PRESS, PRINT, DESIGN, CORNER and CHARM among others, plus short tools such as PIN, IRON, MAT, CLIP, EDGE and JOIN. Nothing is a quilt-shop brand, pattern-company title or licensed cartoon motif — only common patchwork English. Longer compounds like BINDING, BATTING and PATTERN anchor hard grids the way a finished border anchors a quilt top; short bits hide along edges on easy boards.",
    goodFor:
      "Ideal for evening piecers, guild tables, care-home craft hours and anyone who finds fabric more calming than a screen. It pairs with Knitting and Sewing for a wider handmade session, and with Reading when you want a lamp-side companion puzzle. Large print helps after a long pressing session. Seniors who learned to piece decades ago often recognize every word without needing a glossary. Activity directors can print a large-print sister pack, then send people back here for online play.",
    tip: "Find BINDING, BATTING, PATTERN, BACKING and BORDER before short tools like PIN, IRON and MAT. The double T in BATTING and the ND in BINDING stand out once you train your eye. On hard grids, craft words often run backwards along a row like a wrong-side pass — if PATCH will not appear forwards, try reading right-to-left on the same line. FABRIC and COTTON are solid mid-length wins between the giants and the tiny tools.",
  },
  swimming: {
    vocabulary:
      "The swimming bank stays pool-side and brand-free: BACKSTROKE, BREATH, BUTTERFLY, COACH, CURRENT, DISTANCE, DIVE, DRILL, ENDURANCE, FINISH, FLOAT, FREESTYLE, GLIDE, GOGGLE, INTERVAL, KICK, KICKBOARD, LANE, LAP, LOCKER, MEDLEY, OCEAN, PACE, POOL, PULLBUOY, RECOVERY, RELAY, SHALLOW, SHOWER, SNORKEL, SPLASH, SPRINT, STROKE, SWIM, TIMER, TOWEL, TURN, WALL, WARMUP and WAVE among others. Short words such as CAP, DEEP, FINS, PUSH, REST, SUIT and TEAM keep easy boards friendly. No swimwear logos, no meet branding and no cartoon mascots — only everyday water-sport English. Longer anchors like FREESTYLE, BACKSTROKE, ENDURANCE and KICKBOARD steady harder grids.",
    goodFor:
      "A friendly pick for lap swimmers, water-walkers, seniors who prefer pool exercise and sports fans who want paced vocabulary without stadium noise. It sits under Sports and pairs with Ocean, Lakes and Beach for a wider water hour. Large print suits shared tablets in the lobby after a swim. The tone stays grown-up and brand-free — a calm pool puzzle, not a training plan.",
    tip: "Find FREESTYLE, BACKSTROKE, ENDURANCE, KICKBOARD and BUTTERFLY before short words like CAP, LAP and SUIT. Distinctive clusters help: the CK in BACKSTROKE and KICKBOARD, the EE in FREESTYLE. On hard grids, stroke words often run long horizontals like a lane line — clear the middle rows early. BREAST and BREATH look similar mid-scan; check the fourth letter before you mark.",
  },
  hiking: {
    vocabulary:
      "The hiking bank stays trail-side and brand-free: ASCENT, BOOT, BOTTLE, CAIRN, CAMP, COMPASS, CONTOUR, CREEK, DESCENT, ELEVATION, FOREST, GAITER, LOOKOUT, MAP, MARKER, MEADOW, MILEAGE, PACK, PATH, POLE, RIDGE, SCENERY, SHELTER, SLOPE, STREAM, SUMMIT, SUNHAT, SWITCHBACK, TRAIL, TWILIGHT, VIEW and VISTA among others. Short words such as HAT, HIKE, MUD, REST, ROCK, SOCK and STEP keep easy boards friendly. No boot logos, no GPS app names and no resort brands — only everyday path English. Longer anchors like SWITCHBACK, ELEVATION, MILEAGE and LOOKOUT steady harder grids.",
    goodFor:
      "A natural fit for walkers, day-hikers, seniors who enjoy scenic paths and activity rooms that want an outdoor theme without stadium noise. It sits under Camping and pairs with Mountains, Forests, Birdwatching and National Parks for a wider nature hour. Large print suits shared tablets after a walk. The tone stays grown-up and gear-free — a calm trail puzzle, not a guidebook and not a gear catalog.",
    tip: "Find SWITCHBACK, ELEVATION, MILEAGE, LOOKOUT and DESCENT before short words like HAT, MUD and STEP. Distinctive clusters help: the CK in SWITCHBACK, the OU in LOOKOUT and CONTOUR. On hard grids, trail words often climb diagonally like a path on a map — follow one diagonal before you abandon a slope. ASCENT and DESCENT are a useful pair; spotting one often means the other is elsewhere, not overlapping.",
  },
  cycling: {
    vocabulary:
      "Bike and road English — no maker brands.",
    goodFor:
      "Sports child theme for riders.",
    tip: "Long words like HELMET and PELOTON are easier than BIKE or LOCK.",
  },
  geology: {
    vocabulary:
      "Rock and earth-science English for adults.",
    goodFor:
      "Curious adults who like field vocabulary.",
    tip: "Long words such as SANDSTONE and SEDIMENT anchor the hard grid.",
  },
  architecture: {
    vocabulary:
      "Building and design English — no firm brands.",
    goodFor:
      "Adults who like calm structure vocabulary.",
    tip: "Long words like FACADE and FOUNDATION stand out first.",
  },
  islands: {
    vocabulary:
      "Shore and reef English — no resort brands. Companion to Ocean.",
    goodFor:
      "Coastal mood without swimwear ads.",
    tip: "Long words such as LIGHTHOUSE and LAGOON are easier than BAY or ISLE.",
  },
  emotions: {
    vocabulary:
      "Calm feeling words — hope, courage, ease — no medical claims.",
    goodFor:
      "Soft evergreen for seniors' hours.",
    tip: "Long words like GRATITUDE and COMPASSION anchor harder grids.",
  },
  chess: {
    vocabulary:
      "The chess bank stays board-plain: PAWN, KING, QUEEN, ROOK, BISHOP, KNIGHT, CASTLE, ENDGAME, GAMBIT, FORK, CLOCK, DRAW, DEVELOP, STRATEGY and OPENING among others. Short play bits such as MOVE, TURN, FILE, RANK, MATE and PIN keep easy grids friendly. No chess-brand names and no titled-event slogans — only common board English. Longer words like ENDGAME, STRATEGY and MIDDLEGAME anchor harder boards the way a long diagonal anchors an attack.",
    goodFor:
      "Ideal for quiet strategy evenings, club tables, care-home game hours and adults who like piece names without streaming jargon. It pairs with Board Games and Reading for a longer thinking afternoon. Large print helps after a long study session under a desk lamp. Home solvers and activity rooms both do well — the list describes a board, not a brand.",
    tip: "Find ENDGAME, STRATEGY, MIDDLEGAME, CASTLING and GAMBIT before short words like PIN, FILE and RANK. Double letters help: the SS in CHESS and the LL in CASTLE. On hard grids, piece names often sit on long diagonals like a bishop line — clear corners after the center. KING and QUEEN are a useful pair; spotting one often means royal vocabulary is nearby."
  },
  "national-parks": {
    vocabulary:
      "Expect landscape and visit words: ARCH, BASIN, CANYON, CAVE, CLIFF, DESERT, MESA, OVERLOOK, RIDGE, TRAIL, VALLEY and VISTA alongside wildlife such as BEAR and BISON. Practical park English — BACKPACK, CAMP, CENTER, DRIVE, LODGE, MAP, RANGER, TRAILHEAD — keeps the list useful rather than trivia-heavy. We avoid naming specific branded lodges or concessionaires. Short words like CAMP, CAVE and MAP suit easy grids; longer ones such as TRAILHEAD and BACKPACK give hard puzzles their shape.",
    goodFor:
      "A strong evergreen theme for hikers, road-trippers, armchair travelers and seniors who remember family park visits. Activity directors often like it because the words are concrete and the tone stays calm — awe without adrenaline. Pair it with Camping for tents and cookfires, Hiking for footpath vocabulary or Mountains and Forests when you want elevation and trees after the overlook. Large print helps on bright porches and small phone screens alike.",
    tip: "Long landmark words — TRAILHEAD, BACKPACK, OVERLOOK, CANYON — are easier first finds than three- and four-letter words like MAP, CAMP or ARCH. Scan for uncommon clusters such as CK in BACKPACK or GH in OVERLOOK. On medium and hard grids, park words frequently sit on diagonals that follow a 'ridge line' across the board; once you find one vista word, check the neighboring diagonal for the next.",
  },
  landmarks: {
    vocabulary:
      "Monument and vista English — generic place nouns only.",
    goodFor:
      "Travel companion without named attractions.",
    tip: "Long words like CATHEDRAL and LIGHTHOUSE jump out quickly.",
  },
  "farm-animals": {
    vocabulary:
      "The farm-animals list stays close to the barnyard: ALPACA, BARN, BULL, CALF, CHICK, COW, DONKEY, DUCK, GOAT, HEN, LAMB, PIG, PONY, ROOSTER, SHEEP and TURKEY sit beside chore words such as FEED, HAY, TROUGH and PASTURE. You will also meet quiet yard details — FENCE, GATE, NEST, STALL and YARD — so the puzzle reads like a morning walk between the barn and the coop. Every name is common English. There are no licensed cartoon characters, no breed-registry jargon and no commercial farm brands. Short words such as CAT, DOG, EGG and PIG keep the easy grid friendly; longer ones such as DONKEY and ROOSTER give the hard grid something to hide.",
    goodFor:
      "A natural pick for adults who grew up near farms, grandparents solving with older grandchildren, care-home activity hours and anyone who prefers familiar animal names over exotic wildlife lists. It works as a soft companion to our broader Animals hub and to Horses when you want a more pastoral set. Large print suits tired eyes after a long day outdoors or on a phone screen. Because the vocabulary is concrete and visual, it is also a calm choice for English learners who already know farm words from childhood stories — still written for adults, not for preschool worksheets.",
    tip: "Start with longer, distinctive spellings — ALPACA, DONKEY, ROOSTER, TURKEY — before hunting three-letter words like CAT, DOG, HEN and PIG. Short animal names hide along edges and in crossings. The double letters in EGG, and the unusual C-K ending in CHICK, are useful landmarks once you know to look for them. If a word seems missing, check diagonals on medium and hard grids; farm words are often placed vertically in the easy set and wander more on harder boards.",
  },
  home: {
    vocabulary:
      "The home list names ordinary rooms and fixtures: ATTIC, BOOKCASE, CELLAR, FIREPLACE, HEARTH, KITCHEN, LANDING, PANTRY, PATIO, PORCH, CHIMNEY, CURTAIN, CLOSET and DWELLING among others, plus short living words such as DOOR, KEY, RUG, LAMP, HALL, ROOF and ROOM. No furniture-store or appliance brands — only shared household English. Longer anchors like FIREPLACE, BOOKCASE and DWELLING steady harder boards; DOOR, KEY and RUG tuck along edges on easy grids.",
    goodFor:
      "An evergreen fit for quiet evenings indoors, care-home activity hours and anyone who finds room nouns grounding. It pairs with Kitchen and Garden for a wider domestic hour, and with Reading when the lamp is already on. Large print helps on phones propped by the sofa. Seniors often prefer this list because every word names something they can picture without a glossary.",
    tip: "Hunt FIREPLACE, BOOKCASE, DWELLING, CHIMNEY and LANDING first; leave DOOR, KEY and RUG for last. Double letters help: the OO in BOOKCASE and DOOR, the LL in HALL. On hard grids, household words often sit on long horizontals like a hallway — clear the middle rows early. PORCH and PATIO are solid mid-length outdoor wins after the indoor fixtures are marked.",
  },
  astronomy: {
    vocabulary:
      "The astronomy bank stays sky-plain: NEBULA, ORBIT, TELESCOPE, ECLIPSE, CONSTELLATION, GALAXY, COMET, AURORA, HORIZON, EYEPIECE, CLUSTER, CRATER, CHART and SUPERNOVA among others when present. Short sky bits such as STAR, MOON, SUN, DAWN, DUSK and AXIS keep easy grids friendly. No planetarium brands and no app slogans — only common night-sky English, companion to Space rather than a duplicate. Longer words like CONSTELLATION, TELESCOPE and SUPERNOVA anchor harder boards.",
    goodFor:
      "Ideal for curious adults, seniors who watch clear nights from a porch, and quiet clubs that want sky vocabulary without jargon overload. It pairs with Space and Weather for a longer looking session. Large print helps after a long chart-reading evening. Home solvers and activity rooms both do well — the list describes the sky, not a product.",
    tip: "Find CONSTELLATION, TELESCOPE, SUPERNOVA, ECLIPSE and GALAXY before short words like STAR, SUN and AXIS. Double letters help: the SS in CLUSTER and the LL in GALAXY elsewhere? Prefer repeated vowels in AURORA and the long run in LIGHTYEAR when present. On hard grids, sky words often sit on long horizontals like a horizon line — clear the middle rows early. MOON and STAR are a useful pair; spotting one often means night vocabulary is nearby."
  },
  "board-games": {
    vocabulary:
      "The bank covers table habits and pieces: BOARD, CARD, DECK, DICE, DIE, TOKEN, DRAW, DEAL, TURN, BANK, CLOCK, SCORE and FAMILY, plus mood words such as COZY, CHANCE and PLAY. Nothing is a trademarked title, expansion name or publisher. That keeps the list honest and reusable across many evenings. Short words like DIE, DEAL and TURN hide quickly; longer ones such as FAMILY and SCOREPAD (when present) give harder grids more to conceal.",
    goodFor:
      "Perfect for rainy evenings, retirement-community game rooms, family visits where not everyone wants a loud party game and anyone who associates cardboard and dice with quiet company. It differs from Chess by staying general — no opening theory, just the furniture of play. Seniors who prefer large print can still enjoy the same grown-up word list. Pair with Friendship or Kindness for a softer social set after the dice are put away.",
    tip: "Find longer words first — FAMILY, BOARD, CHANCE, TOKEN — then hunt DIE, DEAL, DRAW and TURN along edges. Double letters in DICE? Wait — look for double letters in BOARD (none) and in SCORE when it appears; the CK in CLOCK and the CK-less DEAL are useful contrasts. On hard grids, remember DIE and DECK can share letters in crossings; mark carefully so one find does not hide another.",
  },
  pottery: {
    vocabulary:
      "The pottery bank stays studio-practical and brand-free: BISQUE, BOWL, CENTER, CLAY, COIL, ENGOBE, FINISH, FIRE, FOOT, FORM, GLAZE, GLOSS, HANDLE, JAR, KILN, MATTE, MUG, PINCH, PLATE, POT, RIB, RIM, SCULPT, SHAPE, SHELF, SLIP, SPONGE, SPOUT, STUDIO, THROW, TILE, TRIM, VASE, WARE, WEDGE, WHEEL and WIRE among others. Short words such as BAT, DRY, HAND, LIP and TOOL keep easy boards friendly. No clay-body trademarks, no kiln brands and no gallery slogans — only everyday wheel-room English. Longer anchors like STUDIO, BISQUE, ENGOBE and HANDLE steady harder grids.",
    goodFor:
      "Suited to hobby potters, seniors who remember a wheel class, craft clubs and anyone who wants a calm clay theme without shop talk overload. It pairs with Painting and Woodworking for a wider handmade hour, and with Home when the finished piece is a mug or bowl. Large print helps when clay dust already fills the table. Use it as a quiet evening puzzle, not a firing schedule — the word list names clay and tools, nothing more.",
    tip: "Find STUDIO, BISQUE, ENGOBE, HANDLE and GLAZE before short words like BAT, POT and LIP. Double letters help: the SS in GLOSS and the LL in HANDLE when it appears nearby in spirit — hunt HANDLE's ND pair and KILN's uncommon K. On hard grids, studio words often sit on long horizontals like a shelf of ware — clear the middle rows early. GLAZE, GLOSS and MATTE are related ideas with different spellings; treat each as a separate hunt.",
  },
  woodworking: {
    vocabulary:
      "The woodworking bank stays practical and brand-free: BENCH, CHISEL, CLAMP, DOVETAIL, GRAIN, JOINT, LATHE, MORTISE, PLANE, SAW, SQUARE, FINISH, KERF, MAPLE, CHERRY and LEVEL among others. Short shop bits such as BIT, CUT, EDGE, GLUE, PEG and END keep easy grids friendly. Nothing is a tool-company name or licensed workshop character — only common bench English. Longer words like DOVETAIL, MORTISE and FINISH anchor harder boards the way a squared edge anchors a carcass.",
    goodFor:
      "Ideal for evening makers, woodshop hobbyists, care-home craft hours and anyone who finds grain more calming than a screen. It pairs with Tools and Pottery for a wider handmade session, and with Hiking when you want outdoor wood vocabulary nearby. Large print helps after a long sanding afternoon. Seniors who learned hand tools decades ago often recognize every word without needing brand logos.",
    tip: "Find DOVETAIL, MORTISE, FINISH, CHISEL and CLAMP before short words like BIT, PEG and END. Double letters help: the LL in MILL when present, or repeated vowels in GRAIN. On hard grids, joinery words often run on long horizontals like a marked face — clear the middle rows early. PLANE and GRAIN are a useful pair; spotting one often means shop vocabulary is clustered nearby."
  },
  calligraphy: {
    vocabulary:
      "The calligraphy bank is a quiet desk drawer: ASCENDER, BASELINE, FLOURISH, CURSIVE, DESCENDER, ITALIC, MINUSCULE, INKWELL, INKSTONE, OBLIQUE, SCRIPT, PRESSURE, PRACTICE and QUILL among others, plus short tools such as NIB, PEN, INK, LINE, PAGE and DESK. No pen-maker, ink-bottle or software brands — only ordinary lettering English. Longer anchors like FLOURISH, ASCENDER and MINUSCULE steady harder boards; NIB, PEN and INK keep easy grids moving.",
    goodFor:
      "A gentle theme for adults who practice lettering, seniors rebuilding a handwriting habit and quiet clubs that want a desk-side puzzle. It sits under Painting and pairs well with Journaling, Reading and Libraries. Large print helps when the lamp is soft. Use it as vocabulary practice, not as art-school instruction — the words describe a page, nothing more.",
    tip: "Find FLOURISH, ASCENDER, MINUSCULE, BASELINE and DESCENDER before NIB, PEN and INK. The SH in FLOURISH and the SC in ASCENDER stand out. On hard grids, lettering words often run on long diagonals like a slanted hand — check diagonals after you clear the horizontals. CURSIVE and ITALIC are useful mid-length style words once the longest anchors are found.",
  },
  libraries: {
    vocabulary:
      "The libraries list walks quiet aisles: AISLE, ANNEX, ARCHIVE, ATLAS, AUTHOR, BINDING, BORROW, BROWSE, CARREL, CATALOG, CHAPTER, EDITION, FICTION, FOLIO, GENRE, HISTORY, INDEX, NOVEL, REFERENCE, RENEW, RESERVE, RETURN, SCIENCE, SHELF, STACK and VOLUME among others. Short desk words such as DUE, HOLD, LOAN, FINE, CARD and READ keep beginners moving. No publisher, bookstore or software brands — only the calm nouns of a public reading room. Longer anchors like REFERENCE, CATALOG and ARCHIVE steady the hard grid.",
    goodFor:
      "A natural fit for lifelong readers, library volunteers, seniors' book clubs and quiet activity rooms that already smell like paper. It sits under Reading and pairs well with Journaling, Museums and American History when you want a wider study hour. Large print suits afternoon reading glasses. Activity directors often print a large-print sister pack for shared tables, then send residents back here for online play.",
    tip: "Hunt REFERENCE, ARCHIVE, CATALOG, BINDING and CHAPTER first; leave DUE, HOLD and READ for the edges. Rare letter pairs help: the CH in CHAPTER, the IV in ARCHIVE. On hard grids, library words often hide on long verticals like a stack spine — clear one column early. FICTION and SCIENCE are useful contrast pair; finding one rarely means the other overlaps.",
  },
  volunteering: {
    vocabulary:
      "The volunteering list stays practical and brand-free: COMMUNITY, SHELTER, PANTRY, NEIGHBOR, DONATE, DELIVER, SERVICE, KINDNESS, COLLECT, EVENT, SHIFT, GUIDE and HOST among others, plus short verbs such as HELP, GIVE, PACK, SORT, SHARE and LIST. No charity logos, campaign slogans or organization names — only everyday service English from food drives and welcome desks. Longer anchors like COMMUNITY, SHELTER and VOLUNTEER (when present) steady harder boards; HELP, HAND and CARE tuck into corners on easy grids.",
    goodFor:
      "A thoughtful fit for adults who give a few hours a week, seniors' center helpers, library and pantry volunteers and activity rooms that want a community theme without politics. It sits under Kindness and pairs well with Gratitude, Libraries and Reading. Large print suits shared tablets after a shift. Use it as vocabulary, not as fundraising advice — the word list describes ordinary helping, nothing more.",
    tip: "Hunt COMMUNITY, SHELTER, PANTRY, NEIGHBOR and DELIVER first; leave HELP, PACK and LIST for the edges. Rare clusters help: the MM in COMMUNITY, the SH in SHELTER. On hard grids, service words often sit on long horizontals like a signup row — clear the middle early. DONATE and COLLECT are useful mid-length finds once the longest anchors are marked.",
  },
  meditation: {
    vocabulary:
      "The meditation bank stays soft and practical: ATTENTION, BALANCE, BREATH, CLARITY, CUSHION, EXHALE, FOCUS, INHALE, MINDFUL, MOMENT, PAUSE, PEACE, POSTURE, PRACTICE, PRESENT, QUIET, SESSION, SETTLE, SILENCE, STILL and TIMER among others. Short sits such as SIT, REST, EASE, BELL, BOWL, MAT and ROOM keep easy grids friendly. No app brands, no medical claims and no studio slogans — only everyday calm-room English. Longer words like ATTENTION, PRACTICE and CUSHION anchor harder boards.",
    goodFor:
      "Suited to adults and seniors who want a quiet theme without self-help jargon. It sits under Mindfulness and pairs well with Yoga, Journaling and Gratitude for a longer calm session. Care homes and home solvers both do well with large print. Use it as a gentle evening puzzle, not as health advice — the word list describes a quiet room, nothing more.",
    tip: "Find ATTENTION, PRACTICE, CUSHION, BALANCE and CLARITY before short words like SIT, BELL and MAT. Double letters help: the TT in ATTENTION and the SS in SESSION. On hard grids, practice words often sit on long horizontals like a held breath — clear the middle rows early. INHALE and EXHALE are a useful pair; spotting one often means the other is elsewhere, not overlapping.",
  },
  birdwatching: {
    vocabulary:
      "The birdwatching list mixes field craft and soft nature nouns: BINOCULAR, BRANCH, CANOPY, FEEDER, FLEDGE, FLOCK, MIGRATE, PATIENCE, PERCH, PLUMAGE, SCOPE, SHORE, MARSH, MEADOW, FOREST and GARDEN, plus short calls like BEAK, CHIRP, NEST, SEED, PATH and NOTE. No optics brands and no rare Latin species names — just adult English for a patient sit outdoors. Longer anchors such as BINOCULAR, PATIENCE and PLUMAGE steady the hard grid; short words hide along edges.",
    goodFor:
      "A calm fit for porch watchers, park walkers, seniors who keep a feeder log and nature clubs that want a puzzle after a stroll. It sits under Birds and pairs well with Forests, Hiking, Lakes and Flowers. Large print helps in bright daylight on a phone. Activity rooms can treat it as a gentle outdoor-memory theme without needing travel.",
    tip: "Hunt BINOCULAR, PATIENCE, MIGRATE, PLUMAGE and FEEDER first; leave BEAK, EGG and NOTE for last. The OC in BINOCULAR and the PL in PLUMAGE jump out. On hard grids, birding words often run diagonally like a flight path — check diagonals after you clear the long horizontals. FLOCK and SHORE are useful mid-length wins between the giants and the tiny calls.",
  },
  lighthouses: {
    vocabulary:
      "The lighthouses bank is coastal and steady: BEACON, CHANNEL, CLIFF, GALLERY, HARBOR, KEEPER, LANTERN, PRISM, ROTATE, SIGNAL, STAIR, TOWER words such as HOUSE and LIGHT, plus short shore nouns like FOG, REEF, ROCK, SAIL, SHIP, GLOW and BEAM. No tourist brands and no named monuments — only common beacon English. Longer anchors like CHANNEL, GALLERY and LANTERN hold the hard grid; FOG, COT and LOG tuck into corners on easy boards.",
    goodFor:
      "Ideal for seaside walkers, armchair coastal readers, seniors who remember harbor nights and anyone who finds foghorns oddly peaceful. It sits under Ocean and pairs well with Islands, Lakes, Travel and National Parks. Large print suits evening solving after a windy day. Activity directors often pair it with a short shoreline story before the puzzle starts.",
    tip: "Find CHANNEL, GALLERY, LANTERN, BEACON and HARBOR before FOG, ROCK and LOG. Rare clusters help: the CH in CHANNEL, the RN in LANTERN. On hard grids, lighthouse words often stand on tall verticals like a tower — scan columns early. SIGNAL and ROTATE are solid mid-length finds once the longest beacons are marked.",
  },
  journaling: {
    vocabulary:
      "The journaling list is desk-quiet: BINDING, CLARITY, ENTRY, GRATITUDE, JOURNAL, MARGIN, MEMORY, PROMPT, REFLECT, REVIEW, SCRIPT, THOUGHT and evening companions such as LAMP, CHAIR, DESK, INK, PAPER and PAGE. Short habits like PEN, NOTE, LIST, DATE, DAILY and REST keep easy grids kind. No notebook brands and no app names — only the nouns of an honest page. Longer anchors like GRATITUDE, JOURNAL and REFLECT steady harder boards.",
    goodFor:
      "A gentle theme for adults who keep a diary, seniors rebuilding a writing habit and quiet clubs that want a desk-side puzzle. It sits under Reading and pairs well with Libraries, Calligraphy, Mindfulness and Meditation. Large print helps when the lamp is soft. Use it as vocabulary practice, not as therapy advice — the words describe a notebook, nothing clinical.",
    tip: "Hunt GRATITUDE, JOURNAL, REFLECT, BINDING and CLARITY first; leave PEN, INK and NOTE for the margins. Double letters help: the TT in GRATITUDE and the LL in FILLED when it appears. On hard grids, journal words often hide backwards along a line like a crossed-out draft — try right-to-left on stubborn rows. MEMORY and PROMPT are useful middle finds.",
  },
  apothecary: {
    vocabulary:
      "The apothecary bank smells like a quiet counter: BEESWAX, CABINET, CHAMOMILE, LAVENDER, MORTAR, PESTLE, ROSEMARY, SACHET, TINCTURE, BOTTLE, BUNDLE, DRAWER, LEDGER, LINEN, SCALE and SHELF, plus short shop nouns such as JAR, LEAF, OIL, ROOT, SAGE, MINT and CORK. Common herb and craft English only — no medical claims, no pharmacy chains and no product slogans. Longer anchors like CHAMOMILE, LAVENDER and TINCTURE hold the hard grid.",
    goodFor:
      "Suited to herb-garden readers, craft-table makers, seniors who remember dry shops with glass jars and anyone who likes calm scent words without health promises. It sits under Herbs and pairs well with Gardening Tools, Flowers, Cooking and Coffee Tea. Large print suits evening glasses. Keep the tone culinary and crafty; this is a word puzzle, not advice.",
    tip: "Find CHAMOMILE, LAVENDER, TINCTURE, ROSEMARY and BEESWAX before JAR, OIL and LEAF. Distinctive clusters help: the CH in CHAMOMILE, the CT in TINCTURE. On hard grids, shop words often sit on long horizontals like a shelf row — clear middle rows early. MORTAR and PESTLE are a useful pair; finding one often means the other is elsewhere.",
  },
  "gardening-tools": {
    vocabulary:
      "The list leans into hand tools and shed furniture: TROWEL, PRUNER, CLIPPERS, RAKE, HOE, CULTIVATOR, SPADE, FORK, SHEARS, WHEELBARROW, BUCKET, CAN, CART, BENCH, APRON and BOOT. Structure words such as COLDFRAME, TRELLIS and GREENHOUSE appear beside craft and clean-up terms — CRAFT, CLEAN, BASKET — so the puzzle feels like unlocking the shed on a Saturday morning. Nothing is a brand name or a product SKU. Short words like CAN, HOE and RAKE keep beginners moving; longer compounds such as COLDFRAME and CULTIVATOR anchor harder grids.",
    goodFor:
      "Ideal for allotment keepers, balcony gardeners, retirees who still keep a tool wall and anyone who finds the vocabulary of soil more calming than flower Latin. It pairs with Garden for plant names, Tools for a wider workshop set and Flowers when you want blooms after you have found the trowel. Care homes and quiet clubs often prefer this concrete theme because every word names something you can picture. Large print helps when gloves come off and reading glasses go on.",
    tip: "Hunt long compounds first — COLDFRAME, CULTIVATOR, WHEELBARROW, CLIPPERS — then sweep for short tools like HOE, RAKE and CAN. The double P in CLIPPERS and the OW in TROWEL stand out once you train your eye. On hard grids, tool names often run backwards from the handle end of the word; if SPADE will not appear forwards, try reading right-to-left along the same row.",
  },
  yoga: {
    vocabulary:
      "The yoga bank stays prop-and-pace practical: BALANCE, BLANKET, BLOCK, BOLSTER, BREATH, EXHALE, INHALE, PRACTICE, RESTORE, SESSION, SHOULDER, SPINE, STRETCH words such as FOLD and FLOW, plus short studio nouns like MAT, POSE, REST, CORE, HIP and GAZE. No studio brands, no influencer names and no medical claims — only soft adult English for a quiet mat. Longer anchors like PRACTICE, BOLSTER and SHOULDER steady the hard grid.",
    goodFor:
      "A gentle fit for adults who stretch at home, seniors who prefer calm movement words and activity hours that want a soft theme after a walk. It sits under Sports yet stays quiet; it pairs well with Meditation, Mindfulness and Hiking. Large print helps on a phone beside the mat. Treat the list as vocabulary, not instruction — there is no pose guidance here.",
    tip: "Hunt PRACTICE, SHOULDER, BOLSTER, BLANKET and BALANCE first; leave MAT, HIP and GAZE for last. Letter clusters help: the ST in BOLSTER and the PR in PRACTICE. On hard grids, yoga words often run diagonally like a folded stretch — check diagonals after long horizontals. INHALE and EXHALE are a useful pair across the board.",
  },
  photography: {
    vocabulary:
      "The photography bank stays craft-first and brand-free: ALBUM, ANGLE, APERTURE, CAMERA, CAPTURE, COMPOSE, CROP, DARKROOM, DEPTH, EXPOSE, FILM, FILTER, FLASH, FOCUS, FRAME, GALLERY, LANDSCAPE, LENS, MACRO, NEGATIVE, PORTRAIT, PRINT, SHADOW, SHUTTER, SUBJECT, TRIPOD, VIEW and ZOOM among others. Short words such as SHOT, STILL, ROLL, EDIT and WIDE keep easy boards friendly. No camera trademarks, no editing-app names and no stock-agency brands — only everyday light-and-frame English. Longer anchors like APERTURE, DARKROOM, LANDSCAPE and PORTRAIT steady harder grids.",
    goodFor:
      "A calm fit for hobby photographers, seniors who still love albums, camera-club evenings and anyone who wants looking vocabulary without gear noise. It pairs with Painting and Museums for art-minded hours, and with Travel when the next subject is a vista. Large print suits shared tablets after a walk with a camera. The tone stays grown-up and brand-free — a quiet craft puzzle, not a camera review.",
    tip: "Find APERTURE, DARKROOM, LANDSCAPE, PORTRAIT and SHUTTER before short words like SHOT, ROLL and WIDE. Distinctive clusters help: the RT in APERTURE and PORTRAIT, the RK in DARKROOM. On hard grids, photo words often sit like frames on a contact sheet — clear one horizontal band, then the next. FOCUS and FRAME are easy to confuse mid-scan; check the third letter before you mark.",
  },
  bible: {
    vocabulary:
      "The Bible list is grouped by familiar Scripture vocabulary: books of the Old and New Testaments (Genesis, Exodus, Matthew, Acts), people of the Old Testament (Abraham, Moses, David, Esther), disciples and New Testament figures (Peter, Paul, Lydia, Martha), places named in the text (Jerusalem, Bethlehem, Nazareth, Galilee), and short virtue words drawn from everyday church English — love, joy, peace, faith, hope, grace, mercy and kindness. Names follow common English / King James spellings. There are no verse quotations on the grid, no denominational slogans, and no cartoon characters.",
    goodFor:
      "A calm fit for church groups, adult Sunday-school helpers, seniors' activity hours, and anyone who wants a quiet, faith-friendly puzzle for personal devotion time. The easy grids warm up with book names; the hard grid hides eighteen place-names in all eight directions; the large-print puzzle uses eight short virtue words on a 9×9 grid.",
    tip: "Long place-names such as JERUSALEM, BETHLEHEM and GETHSEMANE have distinctive letter pairs (RU, TH, THS). Find those first on the hard grid; shorter book names such as JOB or ACTS are easier to miss along the edges.",
  },
  "large-print-pack": {
    vocabulary:
      "The Large Print Pack uses short, friendly words — teapot, meadow, cottage, kettle, quilt, birdsong — chosen so that every word is easy to read at a glance. Each grid has eight words in a 9×9 layout.",
    goodFor:
      "Designed for seniors, readers with low vision, and anyone solving on a phone. Words run only across or down, letters are extra large, and contrast is high, so the puzzle stays comfortable for longer.",
    tip: "With only eight words, it helps to read the list aloud once before you start. Then trace each row from left to right — every word reads forwards, so there are no tricks.",
  },
  "hard-pack": {
    vocabulary:
      "The Hard Pack uses longer, more abstract words — perseverance, concentration, craftsmanship, solitude, manuscript, cipher — chosen to make a 15×15 grid genuinely demanding.",
    goodFor:
      "For experienced solvers who find standard puzzles too quick. Every grid uses all eight directions, including backwards and diagonally upwards, with 18 words to find.",
    tip: "Long words are easier to find backwards than you might think: look for a distinctive ending such as “-TION” reversed (NOIT) and follow it. Work one direction at a time across the whole grid.",
  },
};
