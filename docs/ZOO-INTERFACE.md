# The zoo interface

borg-zoo measures this repository's Borg headless, from a commit id alone,
without Mandos and without pinned sources. This is the contract the zoo's adapter
(`zoo/neo_original.py`) relies on. `tools/zoo/` is a pin-free copy of the tracker
toolkit `diegoami/neo-angband-tracker` `2668adc5ab3e`, `tools/original-borg/`
(`build.mjs`, `run.mjs`, `session.ts`, `pack.ts`). It is session tooling, not an
upstream repair, and it does not change `plugin.ts`, `src/`, `manifest.json` or
`plugin.js`: the Borg it measures is exactly the checkout it is pointed at.
`zoo-interface.test.ts` fails when this page and the scripts drift apart.

The schema names stay `neo-original-build@1` and `neo-original/run@1`, and some
host description strings still say "original". That is deliberate: borg-zoo's
parser reads both schemas and a rename would break it. They name the record
format, not the Borg. The Borg is whatever `--borg-dir` points at, and
`build.json` records its repository (read from git) and commit.

## Engine

The Borg is built against the engine in `session.json` `baselines.engine`,
currently `06a2321ce30a414df20d1b20d486446e7688171c` (`neostryder/neo-angband`).
Engine package strings are 1.23.0-beta.3; the exact commit takes precedence.
Prepare the engine checkout once with
`pnpm install --frozen-lockfile && pnpm build`. Use Node 22 or newer; this
repository's `package.json` asks for Node 26 for its own tests.

## Build once

```sh
node tools/zoo/build.mjs --engine-dir D --borg-dir D --out FRESH [--engine-pin SHA --borg-pin SHA]
```

- `--engine-dir` is the built engine checkout, `--borg-dir` is a checkout of this
  repository (its root holds `plugin.ts` and `src/trait/config.ts`), `--out` is a
  directory that must not exist.
- `--engine-pin` and `--borg-pin` are optional full 40-character commit ids. When
  given, `git rev-parse HEAD` of that checkout must equal them, otherwise the
  build fails. When absent the commits are only recorded.
- Always checked: tracked sources unchanged (`git diff HEAD`), and the only
  allowed mode changes are the two executable-bit changes of the engine SDK bin
  scripts that pnpm makes. Untracked files only mark `dirty` in `build.json`.

`bundle.mjs` embeds checkout-relative `//#region` comments, so its hash depends on where the engine and Borg checkouts sit; code outside those comments is identical. Build at a fixed path when comparing bundle hashes.

Outputs in `FRESH/`: `build.json` (schema `neo-original-build@1`: package
versions, engine and Borg repository/commit/dirty flags, the Borg manifest, lock,
bundle, pack and content-file hashes, hashes of the four tool files),
`bundle.mjs` (portable, needs no checkout or dependencies at run time), `pack/`
(engine content), the intermediate `entry.ts` and `pack.ts`, and the engine web build's static assets (`docs/`, `fonts/`, `icons/`, `sounds/`, `tiles/`), which the run does not read.

## Run

```sh
node tools/zoo/run.mjs --bundle FRESH/bundle.mjs --seed N --race R --class C --turns T --out FRESH2
```

`--bundle`, `--seed`, `--turns` and `--out` are required; `--race` and `--class`
are the birth choice. `--decisions` is an optional safety bound on Core loop
calls (default 10000000). `--turns` counts Core game ticks from ordinary birth.
`--out` must not exist. The bundle and pack hashes are checked against
`build.json` before play.

Outputs in `FRESH2/`: `run.json` (schema `neo-original/run@1`: outcome, birth,
final counters, cause of death, first tick at each depth, effective Borg
settings, `playSha256`, provenance copied from `build.json`, runtime and wall
time), and the streamed evidence files `states.jsonl`, `commands.jsonl` and
`messages.jsonl`. `playSha256` hashes the ordered command event stream as
canonical JSON plus LF.

## Outcomes and exit codes

`run.json` `outcome` is one of `death`, `turn_cap`, `stalled`, `borg_stopped`,
`decision_cap` or `harness_failure`. Death, stall, the caps and ordinary stops
exit 0. `harness_failure` exits 1: a bundle or content hash mismatch, an engine
stop without a controller release, or a Core item-choice request (the tool never
chooses an item). A process timeout is classified by the zoo, not here, and the
streamed files keep the evidence. A timeout or stall is never a death.

A numeric seed names a different game from C's. These are plumbing outputs; they
say nothing about how well the Borg plays.
