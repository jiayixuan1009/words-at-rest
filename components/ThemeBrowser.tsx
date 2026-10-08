"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { matchesTheme, type ThemeGroup } from "@/lib/discovery";
import type { Theme } from "@/lib/types";

type Entry = { theme: Pick<Theme, "name" | "slug" | "season">; card: ReactNode };

/** Cards are rendered on the server: every theme link remains present without JS. */
export default function ThemeBrowser({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<ThemeGroup>("all");
  const count = entries.filter(e => matchesTheme(e.theme, query, group)).length;
  return (
    <section className="mt-8" aria-label="Find a theme">
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex min-w-0 flex-1 flex-col gap-2 font-sans">
          <span>Search themes</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try garden, Bible or Christmas"
            className="min-h-11 w-full rounded-sm border border-[#b6ad9c] bg-[#faf6ee] px-3 text-base" />
        </label>
        <label className="flex flex-col gap-2 font-sans">
          <span>Theme group</span>
          <select value={group} onChange={e => setGroup(e.target.value as ThemeGroup)}
            className="min-h-11 max-w-full rounded-sm border border-[#b6ad9c] bg-[#faf6ee] px-3 text-base">
            <option value="all">All themes</option><option value="seasonal">Seasonal</option>
            <option value="anytime">Anytime</option><option value="packs">Large print & challenge packs</option>
          </select>
        </label>
        {(query || group !== "all") && <button type="button" className="chip min-h-11" onClick={() => { setQuery(""); setGroup("all"); }}>Clear filters</button>}
      </div>
      <p role="status" aria-live="polite" className="mt-3 font-sans text-base text-[var(--ink-soft)]">{count} of {entries.length} themes</p>
      {count === 0 && <p className="mt-4">No matching themes. Try a shorter name or clear the filters.</p>}
      <ul className="mt-5 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(({ theme, card }) => <li key={theme.slug} hidden={!matchesTheme(theme, query, group)}>{card}</li>)}
      </ul>
    </section>
  );
}
