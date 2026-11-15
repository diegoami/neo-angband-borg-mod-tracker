# Standalone headless Borg experiments

Run the checked-out Borg source against an explicit engine checkout, without a
borg-zoo checkout, Python runner, catalogue service, or deployment. Node 26 and
pnpm are required. The host uses the game's API2 host, intent gate and real
message/event bus. Gameplay source and the committed plugin are unchanged.

## Build and run

Build a clean engine checkout (Core, SDK and composed content), then this Borg.
The actual repositories, commits, content and bundle hashes are recorded. Use a
full SHA when choosing a version; keep the built bundle and pack with results.

```sh
git clone https://github.com/neostryder/neo-angband.git engine
cd engine
git checkout d27ed50f9e3b650a43cceda5a0c007d03cc321df
pnpm install --frozen-lockfile
pnpm exec tsc -b packages/core packages/mod-sdk packages/content
cd ../neo-angband-mod-borg
pnpm install --frozen-lockfile
node tools/zoo/build.mjs --engine-dir ../engine --borg-dir . --out /tmp/borg-build \
  --exact-tick-cap true --c-seed-startup true --c-gcc-coordinate-order true
pnpm experiment --bundle /tmp/borg-build/bundle.mjs --games 18 \
  --max-ticks 5000 --wall-seconds 120 --workers 2 --out /tmp/borg-experiment
```

`--max-ticks` counts engine ticks, not controller decisions or wall seconds.
A normal player action usually uses ten ticks. Limits: 1–1,800 games,
1–200,000 ticks, 1–3,600 seconds per game, 1–8 isolated worker processes.
`--race 'Half-Elf' --class Mage` restricts custom births; otherwise all nine
classes are dealt in order and eleven races cycle once per class round.
`--seed` selects a deterministic custom seed namespace (default 3000).
Every numeric game seed and assigned birth is materialized in `suite.json`.
`--help` lists arguments. `--plan-only` writes the plan without starting games.

`--out` can be any new directory, including a mounted persistent volume. Existing
directories are refused, preserving previous attempts. Retain the entire output:

- `experiment.json`: UTC start, exact arguments, Node/platform, source-suite ID,
  worker count, suite and orchestration-tool SHA256 hashes, and full build provenance;
- `suite.json`: immutable effective assignments, birth protocol and limits;
- `runs/worker-N/INDEX-SEED/run/`: per-game `run.json`, command, message and state
  JSONL streams; stdout/stderr are alongside it. Streams survive watchdog kills;
- `report/report.md` and `report/report.json`: death and class tables, both
  assigned and death-or-cap death rates, all abnormal outcomes, source identities,
  recent death traces, and commands to reproduce individual seeds.

`--save-games true` additionally writes the engine's `birth.save.json` and
`final.save.json` for completed games. A watchdog retains the birth save and
partial traces; there may be no final save. These are diagnostic engine snapshots;
they do not capture the full controller continuation or promise identical resumed
Borg play. Deterministic replay starts a new game with the recorded inputs.

Deaths are measured endpoints, not a failed harness. Timeout, crash/configuration
failure and missing/duplicate assignments fail the command while retaining their
records and producing the report. Stalls and caps are reported separately; neither
is counted as a death. No outcome is silently excluded from the assigned count.

## Reproduce the zoo protocols

Two frozen 1,800-game assignment files are checked in. No seed generator or zoo
installation is needed to use them. Select fewer games or a lower tick cap for a
pilot; overrides get a distinct saved plan ID and never rewrite the source suite.

```sh
pnpm experiment --bundle /tmp/borg-build/bundle.mjs \
  --suite tools/zoo/ci/suites/neo-seeded-v2-classes-1800.json \
  --games 18 --max-ticks 2000 --workers 2 --out /tmp/seeded-pilot
# Full protocol (explicit, potentially several hours):
pnpm experiment --bundle /tmp/borg-build/bundle.mjs \
  --suite tools/zoo/ci/suites/neo-seeded-v2-classes-1800.json \
  --workers 8 --out /data/seeded-1800
```

[The protocol record](reports/zoo-protocols.md) records both the last completed
report and the newer seeded-v2 cohort, including source pins, watchdogs, class/race
allocation, parallelism and observed limitations. Current upstream source is a new
measurement arm: selecting the same seeds does not reproduce old code's outcomes.

The default `c-seeded-point-buy-v2` profile explicitly selects recommended C point
buy, no-selling, native-menu startup RNG order, game-stream Borg RNG initialization
and a GCC 14.2 coordinate-evaluation adapter. These are **FORK measurement
adapters**, applied only to the headless bundle and named in provenance. They do
not modify the checkout. Adapter-site mismatches fail the build. No engine clock
correction or hidden perception refresh is applied. The historical rolled profile
uses an unadapted build and the engine's defaults, with an after-loop cap that may
overshoot; it cannot be mixed with a seeded-v2 bundle.

## Validation and CI

`pnpm test:headless` exercises actual Core event delivery plus worker death,
watchdog, wrong-birth and crash controls, aggregation completeness, frozen
assignments and CLI argument/output preservation. `pnpm verify` keeps the normal
Borg typecheck/test/plugin gate. A separate workflow runs these harness controls
on PRs and offers manually requested headless runs with retained artifacts.
There is no scheduled cohort, write token or automatic issue publication.
