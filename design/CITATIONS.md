# Citations & quotations (checked 2026-10-06, Asia/Shanghai)

Every quotation below was copied verbatim from the live source URL on the check date.
Claims that are not quotations are our own wording; the “Supporting sentence” column is the exact source text that backs the claim.

| Page | Type | Claim or quote (as shown) | Source URL | Publisher | Supporting sentence on source | Date checked |
| --- | --- | --- | --- | --- | --- | --- |
| `/` (Why word puzzles?) | quote | Overall, it’s important to know that evidence for a lasting beneficial cognitive effect of these types of activities is not definitive. | https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults | National Institute on Aging (NIH) | Same (section “Keep your mind engaged”; content reviewed June 11, 2024) | 2026-10-06 |
| `/` | quote | There is no strong evidence that brain training activities will reduce a person's risk of developing dementia. | https://www.alzheimers.org.uk/about-dementia/managing-the-risk-of-dementia/questions-about-risk/brain-training | Alzheimer’s Society | Same (lead under “Does brain training reduce dementia risk?”) | 2026-10-06 |
| `/` | quote | text can be resized without assistive technology up to 200 percent without loss of content or functionality. | https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html | W3C WAI | Same (Success Criterion 1.4.4) | 2026-10-06 |
| `/themes` | quote | chiefly British spelling of color | https://www.merriam-webster.com/dictionary/colour | Merriam-Webster | Same (definition line for *colour*) | 2026-10-06 |
| `/themes` | quote | Overall, it’s important to know that evidence for a lasting beneficial cognitive effect of these types of activities is not definitive. | https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults | NIA (NIH) | Same | 2026-10-06 |
| `/themes/bible` | claim + quote | Names follow King James spellings; KJV is public domain in the USA. Quote: Public domain in the USA. | https://www.gutenberg.org/ebooks/10 | Project Gutenberg | Copyright field: “Public domain in the USA.” | 2026-10-06 |
| `/themes/garden` | claim + quote | USDA Plant Hardiness Zone Map is the standard for which perennials thrive. Quote: The USDA Plant Hardiness Zone Map is the standard by which gardeners and growers can determine which perennial plants are most likely to thrive at a location. | https://planthardiness.ars.usda.gov/ | USDA ARS | Same (page Description) | 2026-10-06 |
| `/themes/ocean` | claim + quote | About 97% of Earth’s water is in the ocean. Quote: About 97 percent of Earth's water is in the ocean. | https://oceanservice.noaa.gov/facts/oceanwater.html | NOAA Ocean Service | Same (lead + body); page also states “The ocean covers more than 70 percent of the surface of our planet.” | 2026-10-06 |
| `/themes/space` | claim + quote | Eight planets as NASA lists them. Quote: Our solar system has eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. | https://science.nasa.gov/solar-system/planets/ | NASA Science | Same (planets overview body) | 2026-10-06 |
| `/themes/*` (other themes) | claim + quote | American English spelling (color not colour). Quote: chiefly British spelling of color | https://www.merriam-webster.com/dictionary/colour | Merriam-Webster | Same | 2026-10-06 |
| Puzzle pages (`/themes/…/…`, `/daily`) | claim + short quote | Theme source note (as above) plus W3C resize-text quote linking to How to play | theme URL + https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html | theme publisher + W3C | Same as theme / WCAG rows | 2026-10-06 |
| `/about` | quote | chiefly British spelling of color | https://www.merriam-webster.com/dictionary/colour | Merriam-Webster | Same | 2026-10-06 |
| `/about` | quote (existing) | is not definitive (NIA); Alzheimer’s Society link | NIA + Alzheimer’s Society URLs above | NIA / Alzheimer’s Society | Same | 2026-10-06 |
| `/about` | cite (existing) | WCAG contrast ≥ 4.5:1 | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html | W3C | SC text: contrast ratio of at least 4.5:1 | 2026-10-06 |
| `/difficulty/*` | quote | WCAG resize-text + NIA “is not definitive” | W3C + NIA URLs above | W3C / NIA | Same | 2026-10-06 |
| `/daily` | quote | NIA lasting-benefit quote + WCAG resize-text | NIA + W3C | NIA / W3C | Same | 2026-10-06 |
| `/adults`, `/large-print`, `/how-to-play`, `/accessibility` | existing | Unchanged prior citations (NIA, Alzheimer’s Society, ACB, WCAG) | see `lib/citations.ts` | — | Re-verified 2026-10-06 | 2026-10-06 |

## Deliberately not cited

- **Halloween, fall, Christmas, sports, food, travel, music, cats, dogs, animals, packs:** no clean, non-brand, non-medical .gov/.edu fact that fits the word list without stretching. These hubs use the Merriam-Webster American-spelling note instead.
- **Medical / dementia prevention claims:** never stated. We only quote NIA / Alzheimer’s Society cautionary language.
- **Verse quotations on Bible grids:** none. We cite Project Gutenberg only for public-domain status of KJV spellings of names.
- **AKC / ASPCA / brand breed clubs:** skipped to stay IP-safe and brand-free.

## Implementation

- Registry: `lib/citations.ts` (`CITATIONS`, `THEME_SOURCES`, `THEME_GENERIC_SOURCE`)
- UI: `components/Sources.tsx` (`Quote`, `SourceNote`, `InlineSource`, `Sources`)
- JSON-LD: `citation` CreativeWork nodes via `webPageNode` / `HubSchema` where citations are passed
