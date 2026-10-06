import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Byline from "@/components/Byline";
import HubSchema from "@/components/HubSchema";
import {
  currentDailyDate,
  formatLongDate,
  getDailyPuzzle,
  getDailyScheduleEntries,
  getTheme,
  latestVisibleDailyDate,
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
import { seo } from "@/lib/seo";
export const dynamic = "force-dynamic";

const DESCRIPTION =
  "Browse every free daily word search by date. Month calendar and a reverse-chronological log of new daily puzzles since October 6, 2026. Same HTML for everyone — no account needed.";

export const metadata: Metadata = seo({
  title: "Daily Word Search Calendar & Archive",
  description: DESCRIPTION,
  path: "/calendar",
  image: "/og/daily.jpg",
  imageAlt: "Daily word search calendar — Words at Rest",
});

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MonthGrid({ ym, today }: { ym: string; today: string }) {
  const dim = daysInMonth(ym);
  const startWd = monthStartWeekday(ym);
  const cells: Array<{ date: string; day: number } | null> = [];
  for (let i = 0; i < startWd; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) {
    const day = String(d).padStart(2, "0");
    cells.push({ date: `${ym}-${day}`, day: d });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const prev = prevMonth(ym);
  const next = nextMonth(ym);
  const canPrev = prev >= CALENDAR_FIRST_MONTH;
  const canNext = next <= monthKey(today);

  return (
    <section aria-labelledby="cal-month-heading" className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="cal-month-heading" className="font-serif text-2xl font-semibold text-[var(--ink)]">
          {formatMonthLong(ym)}
        </h2>
        <nav aria-label="Other months" className="flex gap-2">
          {canPrev ? (
            <Link
              href={`/calendar/${prev}`}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-[#d4cbb8] px-3 text-base no-underline hover:bg-[#efe7d9]"
            >
              ← {formatMonthLong(prev)}
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center px-3 text-base text-stone-400">←</span>
          )}
          {canNext ? (
            <Link
              href={`/calendar/${next}`}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-[#d4cbb8] px-3 text-base no-underline hover:bg-[#efe7d9]"
            >
              {formatMonthLong(next)} →
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center px-3 text-base text-stone-400">→</span>
          )}
        </nav>
      </div>

      {/* Desktop / tablet month grid */}
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
                  if (beforeLaunch || isFuture) {
                    return (
                      <td
                        key={date}
                        className={`h-20 border border-[#efe7d9] p-2 align-top ${isFuture ? "bg-[#f0ebe3] text-stone-400" : "text-stone-400"}`}
                      >
                        <span className="text-base font-semibold">{day}</span>
                        {isFuture && <span className="mt-1 block text-sm">Coming soon</span>}
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

      {/* Mobile: list (320px-friendly) */}
      <ol className="mt-4 space-y-2 sm:hidden">
        {Array.from({ length: dim }, (_, i) => {
          const day = i + 1;
          const date = `${ym}-${String(day).padStart(2, "0")}`;
          if (date < SITE.dailyStart) return null;
          if (date > today) {
            return (
              <li
                key={date}
                className="rounded border border-[#efe7d9] bg-[#f0ebe3] px-4 py-3 text-base text-stone-400"
              >
                <span className="font-semibold">{formatLongDate(date)}</span>
                <span className="mt-1 block">Coming soon</span>
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
    </section>
  );
}

function WhatsNew({ today }: { today: string }) {
  const scheduled = getDailyScheduleEntries()
    .filter((e) => e.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Include launch day (hash pick) if visible and not in schedule
  const items: Array<{ date: string; title: string; themeId: string; difficulty: string }> = [];
  if (SITE.dailyStart <= today && !scheduled.some((e) => e.date === SITE.dailyStart)) {
    const p = getDailyPuzzle(SITE.dailyStart);
    items.push({
      date: SITE.dailyStart,
      title: p.title,
      themeId: p.themeId,
      difficulty: p.difficulty,
    });
  }
  for (const e of scheduled) {
    items.push({
      date: e.date,
      title: e.title,
      themeId: e.themeId,
      difficulty: e.difficulty,
    });
  }
  items.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section aria-labelledby="whats-new-heading" className="mt-12">
      <h2 id="whats-new-heading" className="font-serif text-2xl font-semibold text-[var(--ink)]">
        What’s new
      </h2>
      <p className="mt-2 max-w-2xl text-lg leading-relaxed text-stone-700">
        A reverse-chronological log of daily puzzles that are live. Future days stay hidden until
        midnight UTC.
      </p>
      {items.length === 0 ? (
        <p className="mt-4 text-base text-[var(--ink-soft)]">No daily puzzles yet.</p>
      ) : (
        <ol className="mt-4 space-y-2">
          {items.map((item) => {
            const theme = getTheme(item.themeId);
            return (
              <li key={item.date}>
                <Link
                  href={`/daily/${item.date}`}
                  className="flex min-h-11 flex-col rounded border border-[#d4cbb8] px-4 py-3 no-underline hover:bg-[#efe7d9] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="text-base font-semibold text-[var(--ink)]">
                    <time dateTime={item.date}>{formatLongDate(item.date)}</time>
                  </span>
                  <span className="mt-1 text-[1rem] text-stone-700 sm:mt-0 sm:text-right">
                    {item.title}
                    <span className="mt-0.5 block text-sm capitalize text-[var(--ink-soft)] sm:mt-0 sm:inline sm:before:content-['·_']">
                      {theme?.name ?? item.themeId} · {item.difficulty}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

export default function CalendarPage() {
  const today = currentDailyDate();
  const ym = monthKey(today);
  const modified = latestVisibleDailyDate();
  const dates = { published: SITE.dailyStart, modified };

  const visibleDates = (() => {
    const out: string[] = [];
    let d = SITE.dailyStart;
    while (d <= today) {
      out.push(d);
      const t = new Date(`${d}T00:00:00Z`).getTime() + 86400000;
      d = new Date(t).toISOString().slice(0, 10);
    }
    return out;
  })();

  const itemList = {
    "@type": "ItemList",
    "@id": `${absoluteUrl("/calendar")}#dailies`,
    name: "Daily word search archive",
    numberOfItems: visibleDates.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: [...visibleDates].reverse().slice(0, 30).map((date, i) => {
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
        name="Daily Word Search Calendar & Archive"
        description={DESCRIPTION}
        path="/calendar"
        image="/og/daily.jpg"
        dates={dates}
        nodes={[itemList]}
      />
      <Breadcrumbs items={[{ name: "Calendar", href: "/calendar" }]} />
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Daily word search calendar</h1>
      <Byline dates={dates} />
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-700">
        One free puzzle each day since {formatLongDate(SITE.dailyStart)}. Open any past or today&apos;s
        date to play. New puzzles unlock at midnight UTC — future days stay greyed out here and return
        404 if you guess the URL. Prefer today&apos;s grid?{" "}
        <Link href="/daily">Play today&apos;s daily word search</Link>.
      </p>
      <MonthGrid ym={ym} today={today} />
      <WhatsNew today={today} />
      <p className="mt-10 text-base text-[var(--ink-soft)]">
        Difficulty by weekday (UTC): Sunday, Monday and Wednesday easy; Tuesday, Thursday and Friday
        medium; Saturday hard.
      </p>
    </>
  );
}
