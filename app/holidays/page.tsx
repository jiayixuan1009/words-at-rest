import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ThemeCard from "@/components/ThemeCard";
import Byline from "@/components/Byline";
import Faq, { type FaqItem } from "@/components/Faq";
import HubSchema from "@/components/HubSchema";
import { getTheme } from "@/lib/data";
import { seo } from "@/lib/seo";
import { ART } from "@/lib/images";
import Picture from "@/components/Picture";

const DESCRIPTION =
  "Free holiday and seasonal word search puzzles for adults and seniors: Thanksgiving, winter, Valentine's, Easter, New Year, St. Patrick's, Mother's Day, Father's Day, Independence Day, spring and summer. Calm grids, large print available, no licensed characters.";

export const metadata: Metadata = seo({
  title: "Holiday Word Search — Seasonal Puzzles for Adults",
  description: DESCRIPTION,
  path: "/holidays",
  image: "/og/holidays.jpg",
  imageAlt: "Holiday word search — Words at Rest",
});

const HOLIDAY_SLUGS = [
  "thanksgiving",
  "winter",
  "valentines",
  "easter",
  "new-year",
  "st-patricks",
  "mothers-day",
  "fathers-day",
  "independence-day",
  "spring",
  "summer",
] as const;

const FAQ: FaqItem[] = [
  {
    q: "Which holiday word searches do you have?",
    a: "This hub gathers Thanksgiving, winter, Valentine's Day, Easter, New Year, St. Patrick's Day, Mother's Day, Father's Day, Independence Day, spring and summer. Halloween, fall and Christmas live on the main Themes page as well — they follow the same calm adult style.",
  },
  {
    q: "Are these puzzles free? Do I need an account?",
    a: "Yes. Every holiday word search is free to play in your browser. There is no sign-up, no app download and no timer. Progress saves on your device so you can pause and come back.",
  },
  {
    q: "Is large print available?",
    a: "Each holiday theme includes a dedicated large-print puzzle with a 9×9 grid and eight short words. You can also enlarge the grid on any puzzle with the Grid size switch above the board.",
  },
  {
    q: "Are the word lists free of licensed characters?",
    a: "Yes. Holiday lists use everyday seasonal English — harvest tables, frost and cocoa, roses and letters, spring blooms, quiet New Year resolutions and summer picnic words — with no trademarked characters or brand names.",
  },
  {
    q: "Who are these puzzles for?",
    a: "Adults and seniors who want a quiet seasonal puzzle. They suit family afternoons, care-home activity hours, church-group tables and anyone who prefers calm pages over kids' apps.",
  },
];

export default function HolidaysPage() {
  const themes = HOLIDAY_SLUGS.map((slug) => {
    const theme = getTheme(slug);
    if (!theme) throw new Error(`Missing holiday theme: ${slug}`);
    return theme;
  });
  return (
    <>
      <Breadcrumbs items={[{ name: "Holidays", href: "/holidays" }]} />
      <div className="mb-10 grid gap-8 sm:grid-cols-2 sm:items-end">
        <div>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Holiday word search</h1>
          <Byline />
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Seasonal puzzles for the year&apos;s quieter holidays — written for adults, easy on the
            eyes, and free of licensed characters.
          </p>
        </div>
        <Picture
          art={ART.themesBanner}
          priority
          sizes="(min-width: 640px) 50vw, 100vw"
          className="aspect-[16/5] w-full rounded-[3px] border border-[#d4cbb8] object-cover sm:aspect-[4/3]"
        />
      </div>
      <p className="max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)]">
        Each theme has six puzzles: two easy, two medium, one hard and one large-print. Browse by
        the holiday you are in, or start with today&apos;s{" "}
        <Link href="/daily">daily word search</Link>. Looking for Halloween, fall or Christmas? See{" "}
        <Link href="/themes">all themes</Link>.
      </p>
      <ul className="mt-10 grid gap-10 sm:grid-cols-2">
        {themes.map((t) => (
          <li key={t.id}>
            <ThemeCard theme={t} />
          </li>
        ))}
      </ul>
      <section className="mt-14 max-w-3xl space-y-4 text-lg leading-relaxed text-[var(--ink-soft)]">
        <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">How the holiday themes work</h2>
        <p>
          <strong className="text-[var(--ink)]">Thanksgiving</strong> leans into harvest tables and
          gratitude. <strong className="text-[var(--ink)]">Winter</strong> and{" "}
          <strong className="text-[var(--ink)]">New Year</strong> cover frost, cocoa and fresh starts
          without Christmas mascots — pair them with our{" "}
          <Link href="/themes/christmas">Christmas</Link> theme if you want December carols.{" "}
          <strong className="text-[var(--ink)]">Valentine&apos;s Day</strong> and{" "}
          <strong className="text-[var(--ink)]">Mother&apos;s Day</strong> keep a quiet adult tone of
          letters and appreciation. <strong className="text-[var(--ink)]">Easter</strong> and{" "}
          <strong className="text-[var(--ink)]">spring</strong> mix blooms with gentle seasonal
          English; for Scripture vocabulary see <Link href="/themes/bible">Bible</Link>.{" "}
          <strong className="text-[var(--ink)]">St. Patrick&apos;s Day</strong>,{" "}
          <strong className="text-[var(--ink)]">Father&apos;s Day</strong>,{" "}
          <strong className="text-[var(--ink)]">Independence Day</strong> and{" "}
          <strong className="text-[var(--ink)]">summer</strong> round out the year with green hills,
          porch days, picnics and shade — still without licensed characters.
        </p>
        <p>
          Prefer bigger letters? Open any theme&apos;s large-print puzzle, or visit the{" "}
          <Link href="/large-print">large print</Link> hub. Prefer a harder grid? Each holiday theme
          includes a 15×15 hard puzzle with words in all eight directions.
        </p>
      </section>
      <Faq items={FAQ} />
      <HubSchema type="CollectionPage" name="Holiday word search" description={DESCRIPTION} path="/holidays" />
    </>
  );
}
