// Build-time content dates from git history (no fabricated dates).
// For every tracked file under app/, data/, lib/ we record:
//   published = author date of the first commit that touched the file
//   modified  = author date of the latest commit that touched the file
// Exposed to the app as the virtual module `virtual:content-dates`.
// If git is unavailable (e.g. a tarball build), the map is empty and the app
// falls back to SITE.contentUpdated / SITE.dailyStart.
import { execFileSync } from "node:child_process";

export type ContentDates = Record<string, { published: string; modified: string }>;

export function readContentDates(cwd = process.cwd()): ContentDates {
  const out: ContentDates = {};
  let log = "";
  try {
    log = execFileSync(
      "git",
      ["log", "--no-renames", "--format=@@%aI", "--name-only", "--", "app", "data", "lib", "components"],
      { cwd, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] },
    );
  } catch {
    return out;
  }
  let date = "";
  // git log is newest first: first sighting = modified, last sighting = published.
  for (const line of log.split("\n")) {
    if (line.startsWith("@@")) {
      date = line.slice(2).trim();
      continue;
    }
    const f = line.trim();
    if (!f || !date) continue;
    if (!out[f]) out[f] = { published: date, modified: date };
    else out[f].published = date;
  }
  return out;
}

/** Vite plugin: `import dates from "virtual:content-dates"`. */
export function contentDatesPlugin() {
  const id = "virtual:content-dates";
  const resolved = "\0" + id;
  return {
    name: "war-content-dates",
    resolveId(source: string) {
      return source === id ? resolved : null;
    },
    load(loadId: string) {
      if (loadId !== resolved) return null;
      return `export default ${JSON.stringify(readContentDates())};`;
    },
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const d = readContentDates();
  console.log(JSON.stringify(Object.fromEntries(Object.entries(d).filter(([k]) => /page\.tsx|bible-easy-01|halloween-easy-01/.test(k))), null, 2));
}
