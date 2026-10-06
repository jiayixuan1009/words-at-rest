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
      "Dog puzzles use everyday companion vocabulary — leashes, walks, fetch, collars, kennels — plus training words and a few broad breed groups such as terrier, spaniel and retriever. No breed-club or pet-brand names.",
    goodFor:
      "For dog owners, dog walkers and anyone who misses having a dog around. It is a cheerful, low-pressure theme with mostly short, familiar words.",
    tip: "Short words like SIT, PAW and TOY are hardest to see. Leave them for last, and look for them along the edges of the grid, where short words are often tucked away.",
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
    vocabulary: "Baking lists gather pantry and technique words — flour, yeast, knead, proof, crust — with no bakery brands.",
    goodFor: "Home bakers and anyone who likes a warm kitchen-minded puzzle.",
    tip: "Double letters in BUTTER, BATTER and MUFFIN jump out of a grid quickly.",
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
    vocabulary: "Musical-terms lists cover theory English — tempo, interval, fermata, cadence — with no artist names.",
    goodFor: "Rehearsal warm-ups, adult learners and choir members refreshing vocabulary.",
    tip: "Short words like BAR, KEY and TIE hide on edges; find DYNAMICS and SIGNATURE first on harder grids.",
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
      "The Valentine's list keeps a calm adult tone: hearts, roses, cards and notes, plus longer affection words such as devotion, cherish, keepsake and courtship. No glitter cartoon hearts and no trademarked characters — just ordinary English for a gentle February puzzle.",
    goodFor:
      "A grown-up choice for Valentine's Day, anniversary afternoons or any quiet evening when you want a soft theme. Large print uses eight short words; the hard grid stretches into longer affection vocabulary.",
    tip: "Words ending in “-NESS” or “-TION” (KINDNESS, AFFECTION, DEVOTION, ADMIRATION) reverse cleanly — look for SEN or NOIT clusters when you are stuck.",
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
      "The St. Patrick's list mixes green hills, shamrocks, pipes and gentle Irish spring vocabulary with a few folklore words such as legend and blessing. No cartoon leprechaun brands and no trademarked characters.",
    goodFor:
      "March afternoons, parish or community tables, and adults who want a seasonal green puzzle that stays calm. Large print keeps eight short words on a 9×9 grid.",
    tip: "Unusual letter clusters help: the SH in SHAMROCK, the LD in EMERALD, the double G in BAGPIPE. Find those first on harder grids.",
  },
  "mothers-day": {
    vocabulary:
      "Mother's Day lists lean into flowers, cards, breakfast trays and everyday appreciation words — hug, thanks, cherish, patience — without gift-brand names.",
    goodFor:
      "A gentle May puzzle for family mornings, care-home activity hours and anyone who prefers a quiet card-table mood.",
    tip: "Long appreciation words such as GRATITUDE and PATIENCE stand out; leave short ones like MOM and HUG for the edges.",
  },
  "fathers-day": {
    vocabulary:
      "Father's Day lists use porch, grill, tools, fishing and everyday appreciation English — pride, wisdom, respect — with no brand tools or team names.",
    goodFor:
      "June Sundays, family gatherings and seniors who like a familiar domestic-outdoor mix.",
    tip: "Compound and longer words like WORKSHOP and NEWSPAPER anchor the hard grid; short ones like DAD hide along edges.",
  },
  "independence-day": {
    vocabulary:
      "Independence Day lists cover picnics, parades, fireworks, flags and summer gathering words, plus a few civic English terms such as liberty and founding. No campaign brands.",
    goodFor:
      "A calm Fourth of July afternoon for adults who want seasonal vocabulary without loud party graphics.",
    tip: "Long words such as WATERMELON, FIREWORK and COURTHOUSE are easier to spot than FLAG or PIE — find them first.",
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
      "Vegetable lists use common market and garden produce — roots, greens, pods and everyday cooking verbs — with no grocery brands.",
    goodFor:
      "Home cooks, gardeners and a calm food-cluster companion to fruits and herbs.",
    tip: "Long produce names like CAULIFLOWER and ASPARAGUS anchor harder grids; short ones like PEA hide on edges.",
  },
  breakfast: {
    vocabulary:
      "Breakfast lists cover eggs, toast, oats, coffee and pantry staples for a slow morning table — no restaurant chains.",
    goodFor:
      "Morning coffee breaks and seniors who like familiar kitchen English.",
    tip: "Double letters in BUTTER, WAFFLE and MUFFIN stand out quickly in a grid.",
  },
  "coffee-tea": {
    vocabulary:
      "Coffee and tea lists name brew methods, leaves, mugs and quiet café English without brand beans or tea labels.",
    goodFor:
      "A mid-morning pause theme for adults who live by the kettle.",
    tip: "Unusual clusters help: the SS in ESPRESSO, the MM in CHAMOMILE, the double F in COFFEE.",
  },
  kitchen: {
    vocabulary:
      "Kitchen lists gather utensils, cookware and pantry verbs — whisk, ladle, simmer, roast — with no appliance brands.",
    goodFor:
      "Home cooks and anyone who likes a domestic, practical word list.",
    tip: "Long utensil words such as SPATULA and COLANDER are easier than short ones like PAN or LID.",
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
      "State names in everyday American English — coasts, plains and border states — with no campaign brands.",
    goodFor:
      "A calm geography theme for adults who like maps without trivia pressure.",
    tip: "Long names such as MASSACHUSETTS and PENNSYLVANIA stand out; leave short ones like OHIO for the edges.",
  },
  "world-capitals": {
    vocabulary:
      "Familiar capital-city names from several continents — everyday atlas English, not obscure trivia.",
    goodFor:
      "Armchair travellers and anyone refreshing world geography at a gentle pace.",
    tip: "Unusual letter pairs help: the JJ in JAKARTA when it appears, double letters in TALLINN-style names, or QQ rarely — scan rare letters first.",
  },
  "human-body": {
    vocabulary:
      "Everyday anatomy words — bones, organs and senses — in plain adult English. No medical claims.",
    goodFor:
      "A practical evergreen theme for curious adults and gentle vocabulary practice.",
    tip: "Long words like SHOULDER and STOMACH anchor harder grids; short ones like EYE hide on edges.",
  },
  camping: {
    vocabulary:
      "Tent, trail, lantern and outdoor camp English without gear brands.",
    goodFor:
      "Quiet evenings, outdoor clubs and seniors who like woods vocabulary.",
    tip: "Compound and longer words such as LANTERN and COMPASS are easier than PEG or LOG.",
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
      "Care, help, patience and everyday good manners — no brand slogans.",
    goodFor:
      "A soft evergreen for seniors' hours and calm evenings.",
    tip: "Long words like COURTESY and COMFORT stand out; leave KIND and HUG for the edges.",
  },
  gratitude: {
    vocabulary:
      "Thanks, blessing and everyday appreciation English.",
    goodFor:
      "Quiet reflection themes; pairs well with Thanksgiving without repeating that holiday list.",
    tip: "Long words such as APPRECIATE and GRATEFUL anchor harder grids.",
  },
  mindfulness: {
    vocabulary:
      "Present-moment English — breath, pause, notice — with no medical claims.",
    goodFor:
      "Adults who want a gentle, non-clinical calm list.",
    tip: "Compound and long words like PRESENT and SILENCE are easier than SIT or AIR.",
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
      "Pitch and match English — no club or league brands.",
    goodFor:
      "Sports fans who want a calm soccer list; child of Sports.",
    tip: "Long words like DEFENDER and PENALTY are easier than GOAL or NET.",
  },
  basketball: {
    vocabulary:
      "Court English without team brands.",
    goodFor:
      "A sports child theme for practice-minded adults.",
    tip: "Compound words such as BACKBOARD and FASTBREAK jump out of a grid.",
  },
  "american-history": {
    vocabulary:
      "Civic and period English — colony, constitution, frontier — no campaign brands.",
    goodFor:
      "Adults who like calm history vocabulary without trivia noise.",
    tip: "Long words like CONSTITUTION and EMANCIPATION anchor the hard grid.",
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
      "Yarn and needle English — stitch, purl, scarf — no yarn brands.",
    goodFor:
      "A calm craft theme for quiet evenings.",
    tip: "Long words like STOCKINETTE and SWEATER stand out first.",
  },
  reading: {
    vocabulary:
      "Book and library English — page, chapter, shelf — no publisher brands.",
    goodFor:
      "Lifelong readers and quiet lamp-side solvers.",
    tip: "Long words such as LIBRARY and EPILOGUE anchor the hard grid.",
  },
  painting: {
    vocabulary:
      "Studio English — brush, canvas, palette — no gallery brands.",
    goodFor:
      "Adults who like art vocabulary without jargon overload.",
    tip: "Long words like WATERCOLOR and PORTRAIT jump out quickly.",
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
      "Woodland English — canopy, moss, trail. Companion to Trees.",
    goodFor:
      "Walkers and nature readers.",
    tip: "Long words like UNDERSTORY and DECIDUOUS anchor the hard grid.",
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
      "Arid-land English — dune, oasis, canyon.",
    goodFor:
      "Adults who like open-horizon vocabulary.",
    tip: "Long words like PLATEAU and HORIZON are easier than SUN or DRY.",
  },
  museums: {
    vocabulary:
      "Gallery and exhibit English — curator, artifact, hall — no chain brands.",
    goodFor:
      "Culture-minded adults and quiet visitors.",
    tip: "Long words such as SCULPTURE and COLLECTION anchor harder grids.",
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
