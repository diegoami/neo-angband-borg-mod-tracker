import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

/**
 * `docs/ZOO-INTERFACE.md` is the contract borg-zoo's adapter relies on. This
 * fails when the documented flags, schema names, outcomes, output files or the
 * engine commit drift from `tools/zoo/` and `session.json`.
 */
const read = (p: string): string => readFileSync(new URL(p, import.meta.url), "utf8");
const doc = read("./docs/ZOO-INTERFACE.md");
const build = read("./tools/zoo/build.mjs");
const run = read("./tools/zoo/run.mjs");
const session = read("./tools/zoo/session.ts");

describe("docs/ZOO-INTERFACE.md and tools/zoo", () => {
  it("documents the exact command lines", () => {
    expect(doc).toContain(
      "node tools/zoo/build.mjs --engine-dir D --borg-dir D --out FRESH [--engine-pin SHA --borg-pin SHA]",
    );
    expect(doc).toContain(
      "node tools/zoo/run.mjs --bundle FRESH/bundle.mjs --seed N --race R --class C --turns T --out FRESH2",
    );
  });

  it("documents only flags the scripts read, and every script flag", () => {
    const flags = (text: string): Set<string> =>
      new Set([...text.matchAll(/--([a-z]+(?:-[a-z]+)*)/g)].map((m) => m[1]!));
    const documented = flags(doc);
    for (const flag of ["engine-dir", "borg-dir", "out", "engine-pin", "borg-pin"]) {
      expect(documented.has(flag), `doc mentions --${flag}`).toBe(true);
      expect(build.includes(`"${flag}"`), `build.mjs reads --${flag}`).toBe(true);
    }
    for (const flag of ["bundle", "seed", "race", "class", "turns", "out", "decisions"]) {
      expect(documented.has(flag), `doc mentions --${flag}`).toBe(true);
      expect(run.includes(`a.${flag}`) || run.includes(`"${flag}"`), `run.mjs reads --${flag}`).toBe(true);
    }
    // No documented flag that no script reads.
    const known = new Set([
      "engine-dir", "borg-dir", "out", "engine-pin", "borg-pin",
      "bundle", "seed", "race", "class", "turns", "decisions", "frozen-lockfile",
    ]);
    for (const flag of documented) expect(known.has(flag), `unexpected --${flag} in docs`).toBe(true);
  });

  it("keeps the schema names the zoo's parser reads", () => {
    for (const [name, source] of [
      ["neo-original-build@1", build],
      ["neo-original/run@1", run],
    ] as const) {
      expect(doc).toContain(name);
      expect(source).toContain(name);
    }
  });

  it("documents every outcome and output file the scripts produce", () => {
    for (const outcome of ["death", "turn_cap", "stalled", "borg_stopped", "decision_cap", "harness_failure"]) {
      expect(doc, `doc lists ${outcome}`).toContain(`\`${outcome}\``);
      expect(session + run, `scripts produce ${outcome}`).toContain(`"${outcome}"`);
    }
    for (const file of ["build.json", "bundle.mjs", "run.json", "states.jsonl", "commands.jsonl", "messages.jsonl"]) {
      expect(doc, `doc lists ${file}`).toContain(file);
      expect(build + run, `scripts write ${file}`).toContain(file);
    }
  });

  it("names the engine commit in session.json", () => {
    const engine = (JSON.parse(read("./session.json")) as { baselines: { engine: string } }).baselines.engine;
    expect(doc).toContain(engine);
  });
});
