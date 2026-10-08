import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { readContentDates } from "./content-dates.ts";

test("Merged content records the integration date without changing original publication", () => {
  const dir = mkdtempSync(join(tmpdir(), "war-content-dates-"));
  const git = (...args) => execFileSync("git", args, { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const commit = (date, ...args) => execFileSync("git", args, { cwd: dir, stdio: "ignore", env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date } });
  try {
    git("init", "-b", "main");
    git("config", "user.name", "Content date test");
    git("config", "user.email", "test@example.invalid");
    mkdirSync(join(dir, "app"));
    writeFileSync(join(dir, "app/page.tsx"), "initial\n");
    git("add", ".");
    commit("2026-10-01T00:00:00Z", "commit", "-m", "initial");
    git("checkout", "-b", "feature");
    writeFileSync(join(dir, "app/page.tsx"), "improved\n");
    git("add", ".");
    commit("2026-10-02T00:00:00Z", "commit", "-m", "improve");
    git("checkout", "main");
    commit("2026-10-03T00:00:00Z", "merge", "--no-ff", "feature", "-m", "integrate");
    const dates = readContentDates(dir)["app/page.tsx"];
    assert.equal(Date.parse(dates.published), Date.parse("2026-10-01T00:00:00Z"));
    assert.equal(Date.parse(dates.modified), Date.parse("2026-10-03T00:00:00Z"));
  } finally {
    // Delete only the unique directory created above, after confirming its temporary-root boundary.
    assert.ok(resolve(dir).startsWith(resolve(tmpdir()) + "\\") || resolve(dir).startsWith(resolve(tmpdir()) + "/"));
    rmSync(dir, { recursive: true, force: true });
  }
});
