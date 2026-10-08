import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import MobileMore from "@/components/MobileMore";
import PuzzleCard from "@/components/PuzzleCard";
import AdSlot from "@/components/AdSlot";
import Byline from "@/components/Byline";
import HubSchema from "@/components/HubSchema";
import ThemeCard from "@/components/ThemeCard";
import { getChildThemes, getPuzzlesByTheme, getTheme, getThemes, puzzlePath } from "@/lib/data";
import { ART, themeArt, themeOgImage } from "@/lib/images";
import Picture from "@/components/Picture";
import { THEME_EXTRA } from "@/lib/theme-content";
import { THEME_SOURCES, THEME_GENERIC_SOURCE } from "@/lib/citations";
import { SourceNote } from "@/components/Sources";
import { clamp, seo, themeNoun } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { themeDates } from "@/lib/content-dates";
import { PRINTABLES } from "@/lib/printables";
import Faq from "@/components/Faq";
import { THEME_FAQ } from "@/lib/theme-faq";

type Props = { params: Promise<{ theme: string }> };

// Render per request (no ISR cache). vinext places generateMetadata() output in a
// hidden <body> div for requests without a User-Agent, and the ISR cache would then
// serve that variant to every crawler. Rendering is cheap (static data).
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getThemes().map((t) => ({ theme: t.slug }));
}

function themeTitle(name: string, slug?: string): string {
  // Primary keyword target: "bible word search" + large-print intent (≤43 so + site suffix ≤60).
  if (slug === "bible") return "Bible Word Search — Free & Large Print";
  if (slug === "large-print-pack") return "Large Print Word Search Activity Pack";
  if (slug === "hard-pack") return "Hard Word Search Challenge Pack";
  const long = `${name} Word Search — Free Online Puzzles`;
  return long.length <= 43 ? long : `${name} Word Search — Free Puzzles`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const theme = getTheme((await params).theme);
  if (!theme) return { title: "Theme not found", robots: { index: false } };
  const puzzles = getPuzzlesByTheme(theme.id);
  const sample = theme.words.slice(0, 3).map((w) => w.toLowerCase()).join(", ");
  return seo({
    title: themeTitle(theme.name, theme.slug),
    description: clamp(
      `${puzzles.length} free ${themeNoun(theme.name)} word search puzzles for adults — ${sample} and more. Play online, no timer, large print on every grid.`,
      158,
    ),
    path: `/themes/${theme.slug}`,
    image: themeOgImage(theme.slug),
    imageAlt: `${theme.name} word search — Words at Rest`,
  });
}

export default async function ThemePage({ params }: Props) {
  const theme = getTheme((await params).theme);
  if (!theme) notFound();
  const puzzles = getPuzzlesByTheme(theme.id);
  const extra = THEME_EXTRA[theme.slug];
  const printable = PRINTABLES.find(p => p.theme === theme.slug);
  const themeSource = THEME_SOURCES[theme.slug] ?? THEME_GENERIC_SOURCE;
  const parent = theme.parentSlug ? getTheme(theme.parentSlug) : undefined;
  const children = getChildThemes(theme.slug);
  const all = getThemes();
  const idx = all.findIndex((t) => t.id === theme.id);
  const others = [1, 2, 3]
    .map((k) => all[(idx + k) % all.length])
    .filter((t) => t.id !== theme.id);
  const words = [...theme.words].sort();
  const dates = themeDates(puzzles, theme.id);
  const pageUrl = absoluteUrl(`/themes/${theme.slug}`);
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Themes", href: "/themes" },
          ...(parent
            ? [{ name: parent.name, href: `/themes/${parent.slug}` }]
            : []),
          { name: theme.name, href: `/themes/${theme.slug}` },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-sm border border-[#d4cbb8] sm:grid sm:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <h1 className="font-serif text-4xl tracking-tight">{theme.slug.endsWith("-pack") ? themeTitle(theme.name, theme.slug) : `${theme.name} Word Search`}</h1>
          <nav aria-label={`${theme.name} puzzles to play`} className="mt-3 flex flex-wrap gap-2 font-sans text-base">
            {(["easy", "medium", "hard"] as const).map((level) => {
              const p = puzzles.find((p) => p.difficulty === level && !p.largePrint);
              return p ? <Link key={level} href={puzzlePath(p)} className="chip min-h-11 capitalize">Play {level}</Link> : null;
            })}
            {puzzles.find((p) => p.largePrint) && <Link href={puzzlePath(puzzles.find((p) => p.largePrint)!)} className="chip min-h-11">Play large print</Link>}
          </nav>
          <Byline dates={dates} />
          <MobileMore id={`theme-intro-${theme.slug}`}>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">{theme.description}</p>
          </MobileMore>
        </div>
        <Picture
          art={themeArt(theme.slug, theme.name)}
          priority
          desktopOnly
          sizes="(min-width: 1152px) 500px, (min-width: 640px) 45vw, 340px"
          className="hidden aspect-[4/3] w-full object-cover sm:block sm:aspect-auto sm:h-full"
        />
      </div>

      <h2 className="font-serif text-3xl">{theme.name} puzzles</h2>
      {theme.slug === "large-print-pack" && <p className="mt-3 max-w-2xl text-lg">A small activity collection with 9×9 grids and eight words per puzzle. For the full catalog across all themes, browse <Link href="/large-print">large print word searches</Link>; for ready-to-print sheets and answers, choose <Link href="/printables/large-print">the printable activity pack</Link>.</p>}
      {theme.slug === "hard-pack" && <p className="mt-3 max-w-2xl text-lg">A focused collection of challenging grids with all eight word directions. For every hard puzzle across the site's themes, browse <Link href="/difficulty/hard">the complete hard word search catalog</Link>. Preview each word list to choose your challenge.</p>}
      {printable && <p className="mt-3 text-lg"><Link href={`/printables/${printable.slug}`}>Free printable {theme.name.toLowerCase()} large print PDFs with answer keys</Link></p>}
      {puzzles.length === 0 ? (
        <div className="mt-4 max-w-md text-center">
          <Picture art={ART.empty} sizes="320px" className="mx-auto h-auto w-80" />
          <p className="mt-2 text-lg text-[var(--ink-soft)]">No puzzles in this theme yet — try <Link href="/daily">today&apos;s daily puzzle</Link>.</p>
        </div>
      ) : (
        <div className="mt-2 max-w-2xl">
          {puzzles.map((p) => (
            <PuzzleCard key={p.id} puzzle={p} />
          ))}
        </div>
      )}

      {children.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl">Explore {theme.name.toLowerCase()} themes</h2>
          <p className="mt-2 max-w-2xl text-lg text-[var(--ink-soft)]">
            More focused word lists under {theme.name.toLowerCase()} — same calm adult style, no licensed names.
          </p>
          <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {children.map((child) => (
              <li key={child.id}>
                <ThemeCard theme={child} compact />
              </li>
            ))}
          </ul>
        </section>
      )}

      {parent && (
        <p className="mt-8 text-lg text-[var(--ink-soft)]">
          Part of our <Link href={`/themes/${parent.slug}`}>{parent.name} word search</Link> collection.
        </p>
      )}

      <MobileMore id="theme-about" className="mt-12">
      <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-[var(--ink-soft)]">
        {extra && (
          <>
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">
              What words are in the {themeNoun(theme.name)} word search?
            </h2>
            <p>{extra.vocabulary}</p>
          </>
        )}
        <p>
          The full {themeNoun(theme.name)} word bank has {theme.words.length} words. Each puzzle
          picks a set from this list, so no two grids are quite the same:
        </p>
        <p className="font-sans text-base uppercase tracking-[0.08em] text-[var(--ink)]">
          {words.join(" · ")}
        </p>
        {extra && (
          <>
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">
              Who is this theme good for?
            </h2>
            <p>{extra.goodFor}</p>
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">A solving tip</h2>
            <p>{extra.tip}</p>
          </>
        )}
        <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">How these puzzles work</h2>
        <p>
          Every puzzle is free and plays in your browser on a phone, tablet or computer. Drag across
          a word, or tap its first and last letter. Easy grids are 10×10 with words across and down;
          medium grids are 12×12 and add diagonals; hard grids are 15×15 with words in all eight
          directions. Choose <em>Grid size → Larger</em> above any grid for bigger letters. Progress is saved
          on your device, and there is never a timer. New to word searches? Read{" "}
          <Link href="/how-to-play">how to play</Link>.
        </p>
      </div>
      </MobileMore>

      <SourceNote source={themeSource} heading="Sources & notes" />
      {THEME_FAQ[theme.slug] && <Faq items={THEME_FAQ[theme.slug]} path={`/themes/${theme.slug}`} heading={`${theme.name} word search questions`} />}

      <AdSlot slot="theme-hub" />

      <section className="mt-12">
        <h2 className="font-serif text-2xl">More themes to try</h2>
        <ul className="mt-6 grid gap-8 sm:grid-cols-3">
          {others.map((t) => (
            <li key={t.id}>
              <ThemeCard theme={t} compact />
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/themes">Browse all themes →</Link>
        </p>
      </section>

      <HubSchema
        type="CollectionPage"
        name={`${theme.name} Word Search`}
        description={theme.description}
        path={`/themes/${theme.slug}`}
        image={themeOgImage(theme.slug)}
        dates={dates}
        citations={[themeSource.citation]}
        extra={{ mainEntity: { "@id": `${pageUrl}#itemlist` } }}
        nodes={[
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#itemlist`,
            name: `${theme.name} word search puzzles`,
            numberOfItems: puzzles.length,
            itemListElement: puzzles.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: absoluteUrl(puzzlePath(p)),
            })),
          },
        ]}
      />
    </>
  );
}
