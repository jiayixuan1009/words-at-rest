/**
 * External sources quoted on the site. Every quote below was checked
 * word-for-word against the live source on 2026-10-06 (Asia/Shanghai).
 * Keep quotes short and exact; update `checked` when re-verifying.
 * Claims that are not quotes are paraphrases that still match the source;
 * they are listed in design/CITATIONS.md with the supporting sentence.
 */
export interface Citation {
  id: string;
  title: string;
  publisher: string;
  url: string;
  /** Source's own published / reviewed / adopted date, if it states one (ISO). */
  date?: string;
  /** Exact short quotation from the source. */
  quote: string;
}

export const CITATIONS = {
  niaCognitiveHealth: {
    id: "nia-cognitive-health",
    title: "Cognitive Health and Older Adults",
    publisher: "National Institute on Aging (NIH)",
    url: "https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults",
    date: "2024-06-11",
    quote:
      "Overall, it’s important to know that evidence for a lasting beneficial cognitive effect of these types of activities is not definitive.",
  },
  niaBrainGames: {
    id: "nia-brain-games",
    title: "Cognitive Health and Older Adults",
    publisher: "National Institute on Aging (NIH)",
    url: "https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults",
    date: "2024-06-11",
    quote: "Beware of claims that playing certain computer and online games can improve your memory and thinking.",
  },
  alzSocBrainTraining: {
    id: "alzheimers-society-brain-training",
    title: "Brain training and dementia",
    publisher: "Alzheimer’s Society",
    url: "https://www.alzheimers.org.uk/about-dementia/managing-the-risk-of-dementia/questions-about-risk/brain-training",
    quote: "There is no strong evidence that brain training activities will reduce a person's risk of developing dementia.",
  },
  acbLargePrint: {
    id: "acb-large-print-guidelines",
    title: "Large Print Guidelines",
    publisher: "American Council of the Blind",
    url: "https://www.acb.org/large-print-guidelines",
    date: "2025-05-06",
    quote: "Arial, not bold, 18 point",
  },
  wcagResizeText: {
    id: "wcag-1-4-4",
    title: "Understanding SC 1.4.4: Resize Text (Level AA), WCAG 2.2",
    publisher: "W3C Web Accessibility Initiative",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html",
    quote:
      "text can be resized without assistive technology up to 200 percent without loss of content or functionality.",
  },
  wcagContrast: {
    id: "wcag-1-4-3",
    title: "Understanding SC 1.4.3: Contrast (Minimum) (Level AA), WCAG 2.2",
    publisher: "W3C Web Accessibility Initiative",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    quote: "20/40 is commonly reported as typical visual acuity of elders at roughly age 80.",
  },
  nasaEightPlanets: {
    id: "nasa-eight-planets",
    title: "Planets",
    publisher: "NASA Science",
    url: "https://science.nasa.gov/solar-system/planets/",
    quote:
      "Our solar system has eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
  },
  noaaOceanWater: {
    id: "noaa-ocean-water",
    title: "How much water is in the ocean?",
    publisher: "NOAA Ocean Service",
    url: "https://oceanservice.noaa.gov/facts/oceanwater.html",
    quote: "About 97 percent of Earth's water is in the ocean.",
  },
  usdaHardiness: {
    id: "usda-plant-hardiness",
    title: "2023 USDA Plant Hardiness Zone Map",
    publisher: "USDA Agricultural Research Service",
    url: "https://planthardiness.ars.usda.gov/",
    quote:
      "The USDA Plant Hardiness Zone Map is the standard by which gardeners and growers can determine which perennial plants are most likely to thrive at a location.",
  },
  gutenbergKjv: {
    id: "gutenberg-kjv",
    title: "The King James Version of the Bible",
    publisher: "Project Gutenberg",
    url: "https://www.gutenberg.org/ebooks/10",
    date: "1989-08-01",
    quote: "Public domain in the USA.",
  },
  mwColour: {
    id: "merriam-webster-colour",
    title: "colour",
    publisher: "Merriam-Webster",
    url: "https://www.merriam-webster.com/dictionary/colour",
    quote: "chiefly British spelling of color",
  },
} satisfies Record<string, Citation>;

/** Theme hub notes backed by a verified source. Only themes with a clean fit. */
export interface ThemeSource {
  citation: Citation;
  /** Honest claim in our voice; not presented as a quotation. */
  claim: string;
  /** Shorter line for puzzle About sections. */
  shortClaim?: string;
}

export const THEME_SOURCES: Partial<Record<string, ThemeSource>> = {
  bible: {
    citation: CITATIONS.gutenbergKjv,
    claim:
      "Proper names on this list follow common English / King James spellings. Project Gutenberg records the King James Version as public domain in the USA — we use those spellings for names, not verse quotations on the grid.",
    shortClaim:
      "Names follow common King James spellings; Project Gutenberg lists the KJV as public domain in the USA.",
  },
  garden: {
    citation: CITATIONS.usdaHardiness,
    claim:
      "Gardeners in the United States often check the USDA Plant Hardiness Zone Map when choosing perennials; USDA ARS describes it as the standard for which plants are most likely to thrive at a location.",
    shortClaim:
      "USDA ARS calls the Plant Hardiness Zone Map the standard for which perennials are most likely to thrive at a location.",
  },
  ocean: {
    citation: CITATIONS.noaaOceanWater,
    claim:
      "NOAA notes that about 97 percent of Earth's water is in the ocean, and that the ocean covers more than 70 percent of the planet's surface — a useful scale for an ocean-themed word list.",
    shortClaim: "NOAA: about 97 percent of Earth's water is in the ocean.",
  },
  space: {
    citation: CITATIONS.nasaEightPlanets,
    claim:
      "Our space list names the eight planets of the solar system as NASA lists them: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune (no franchise names).",
    shortClaim:
      "Planet names follow NASA's eight-planet list (Mercury through Neptune).",
  },
};

/** Fallback cite for theme hubs that do not yet have a theme-specific source. */
export const THEME_GENERIC_SOURCE: ThemeSource = {
  citation: CITATIONS.mwColour,
  claim:
    "Word lists on Words at Rest use American English spelling (for example color, not colour). Merriam-Webster records colour as chiefly the British spelling of color.",
  shortClaim:
    "Word lists use American English spelling (color, not colour), per Merriam-Webster.",
};
