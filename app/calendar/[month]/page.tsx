import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Byline from "@/components/Byline";
import HubSchema from "@/components/HubSchema";
import {
  currentDailyDate,
  formatLongDate,
  getDailyPuzzle,
  isValidDailyDate,
  getTheme,
} from "@/lib/data";
import {
  CALENDAR_FIRST_MONTH,
  daysInMonth,
  formatMonthLong,
  monthKey,
  monthStartWeekday,
  nextMonth,
  prevMonth,
} from "@/lib/daily";
import { absoluteUrl, SITE } from "@/lib/site";
import { clamp, seo } from "@/lib/seo";
import { datesFor, latestModified } from "@/lib/content-dates";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ month: string }> };

const MONTH_RE = /^\d{4}-\d{2}$/;

function isValidMonth(ym: string, today: string): boolean {
  if (!MONTH_RE.test(ym)) return false;
  const [, m] = ym.split("-").map(Number);
  if (m < 1 || m > 12) return false;
  if (ym < CALENDAR_FIRST_MONTH || ym > monthKey(today)) return false;
  const d = new Date(`${ym}-01T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 7) !== ym) return false;
  return true;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { month } = await params;
  const today = currentDailyDate();
  if (!isValidMonth(month, today)) {
    return { title: { absolute: "Page not found | Words at Rest" }, robots: { index: false } };
  }
  const label = formatMonthLong(month);
  return seo({
    title: `Daily Word Search — ${label}`,
    description: clamp(
      `Free daily word search puzzles for ${label}. Browse the calendar archive on Words at Rest — calm grids for adults, no timer or sign-up.`,
    ),
    path: `/calendar/${month}`,
    image: "/og/daily.jpg",
  });
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default async function CalendarMonthPage({ params }: Props) {
  const { month: ym } = await params;
  const today = currentDailyDate();
  if (!isValidMonth(ym, today)) notFound();

  const dim = daysInMonth(ym);
  const startWd = monthStartWeekday(ym);
  const cells: Array<{ date: string; day: number } | null> = [];
  for (let i = 0; i < startWd; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) {
    cells.push({ date: `${ym}-${String(d).padStart(2, "0")}`, day: d });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const prev = prevMonth(ym);
  const next = nextMonth(ym);
  const canPrev = prev >= CALENDAR_FIRST_MONTH;
  const canNext = next <= monthKey(today);
  const label = formatMonthLong(ym);

  const visibleInMonth: string[] = [];
  for (let d = 1; d <= dim; d++) {
    const date = `${ym}-${String(d).padStart(2, "0")}`;
    if (isValidDailyDate(date)) visibleInMonth.push(date);
  }
  const dates = {
    published: ym === CALENDAR_FIRST_MONTH ? SITE.dailyStart : `${ym}-01`,
    modified: latestModified(datesFor("app/calendar/[month]/page.tsx").modified, visibleInMonth.at(-1) ?? `${ym}-01`),
  };

  const itemList = {
    "@type": "ItemList",
    "@id": `${absoluteUrl(`/calendar/${ym}`)}#dailies`,
    name: `Daily word searches — ${label}`,
    numberOfItems: visibleInMonth.length,
    itemListElement: [...visibleInMonth].reverse().map((date, i) => {
      const p = getDailyPuzzle(date);
      return {
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/daily/${date}`),
        name: `${formatLongDate(date)} — ${p.title}`,
      };
    }),
  };

  return (
    <>
      <HubSchema
        type="CollectionPage"
        name={`Daily Word Search — ${label}`}
        description={`Free daily word search puzzles for ${label}.`}
        path={`/calendar/${ym}`}
        image="/og/daily.jpg"
        dates={dates}
        nodes={[itemList]}
      />
      <Breadcrumbs
        items={[
          { name: "Calendar", href: "/calendar" },
          { name: label, href: `/calendar/${ym}` },
        ]}
      />
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">{label}</h1>
      <Byline dates={dates} />
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-700">
        Daily puzzles for {label}.{" "}
        <Link href="/calendar">Back to the full calendar</Link>
        {" · "}
        <Link href="/daily">Today&apos;s puzzle</Link>.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {canPrev ? (
          <Link
            href={`/calendar/${prev}`}
            className="inline-flex min-h-11 items-center rounded border border-[#d4cbb8] px-3 text-base no-underline hover:bg-[#efe7d9]"
          >
            ← {formatMonthLong(prev)}
          </Link>
        ) : null}
        {canNext ? (
          <Link
            href={`/calendar/${next}`}
            className="inline-flex min-h-11 items-center rounded border border-[#d4cbb8] px-3 text-base no-underline hover:bg-[#efe7d9]"
          >
            {formatMonthLong(next)} →
          </Link>
        ) : null}
      </div>

      <div className="mt-4 hidden sm:block">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr>
              {WEEKDAYS.map((w) => (
                <th key={w} scope="col" className="border-b border-[#d4cbb8] px-2 py-2 text-base font-semibold text-[var(--ink-soft)]">
                  {w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: cells.length / 7 }, (_, row) => (
              <tr key={row}>
                {cells.slice(row * 7, row * 7 + 7).map((cell, i) => {
                  if (!cell) {
                    return <td key={`e-${row}-${i}`} className="h-20 border border-[#efe7d9] bg-[#f7f2e8]/50 p-2" />;
                  }
                  const { date, day } = cell;
                  const beforeLaunch = date < SITE.dailyStart;
                  const isFuture = date > today;
                  const isToday = date === today;
                  if (beforeLaunch || isFuture || !isValidDailyDate(date)) {
                    return (
                      <td
                        key={date}
                        className={`h-20 border border-[#efe7d9] p-2 align-top ${isFuture ? "bg-[#f0ebe3] text-stone-400" : "text-stone-400"}`}
                      >
                        <span className="text-base font-semibold">{day}</span>
                        {isFuture && <span className="mt-1 block text-sm">Coming soon</span>}
                        {!beforeLaunch && !isFuture && <span className="mt-1 block text-sm">Not published</span>}
                      </td>
                    );
                  }
                  const puzzle = getDailyPuzzle(date);
                  const theme = getTheme(puzzle.themeId);
                  return (
                    <td key={date} className={`h-20 border border-[#d4cbb8] p-1 align-top ${isToday ? "bg-[#efe7d9]" : "bg-white"}`}>
                      <Link
                        href={`/daily/${date}`}
                        className="flex h-full min-h-11 flex-col rounded p-1.5 text-[var(--ink)] no-underline hover:bg-[#efe7d9]"
                      >
                        <span className="text-base font-semibold">
                          {day}
                          {isToday ? " · Today" : ""}
                        </span>
                        <span className="mt-0.5 text-[0.9375rem] leading-snug text-stone-700">
                          {theme?.name ?? puzzle.themeId}
                        </span>
                        <span className="text-sm capitalize text-[var(--ink-soft)]">{puzzle.difficulty}</span>
                      </Link>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="mt-4 space-y-2 sm:hidden">
        {Array.from({ length: dim }, (_, i) => {
          const day = i + 1;
          const date = `${ym}-${String(day).padStart(2, "0")}`;
          if (date < SITE.dailyStart) return null;
          if (!isValidDailyDate(date)) {
            return (
              <li key={date} className="rounded border border-[#efe7d9] bg-[#f0ebe3] px-4 py-3 text-base text-stone-400">
                <span className="font-semibold">{formatLongDate(date)}</span>
                <span className="mt-1 block">{date > today ? "Coming soon" : "Not published"}</span>
              </li>
            );
          }
          const puzzle = getDailyPuzzle(date);
          const theme = getTheme(puzzle.themeId);
          const isToday = date === today;
          return (
            <li key={date}>
              <Link
                href={`/daily/${date}`}
                className={`flex min-h-11 flex-col rounded border border-[#d4cbb8] px-4 py-3 text-[var(--ink)] no-underline hover:bg-[#efe7d9] ${isToday ? "bg-[#efe7d9]" : "bg-white"}`}
              >
                <span className="text-base font-semibold">
                  {formatLongDate(date)}
                  {isToday ? " · Today" : ""}
                </span>
                <span className="mt-1 text-[1rem] text-stone-700">
                  {theme?.name ?? puzzle.themeId} · <span className="capitalize">{puzzle.difficulty}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}
