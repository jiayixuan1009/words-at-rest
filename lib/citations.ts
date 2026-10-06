/**
 * External sources quoted on guide pages. Every quote below was checked
 * word-for-word against the live source on 2026-10-06 (Asia/Shanghai).
 * Keep quotes short and exact; update `checked` when re-verifying.
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
} satisfies Record<string, Citation>;
