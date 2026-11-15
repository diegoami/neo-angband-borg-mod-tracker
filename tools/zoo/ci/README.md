# Headless game and death reports in this repository

The harness uses this repository's existing `tools/zoo` engine/host adapter;
there is no second Borg implementation. It runs the checked-out Borg source
against the full engine SHA in `engine.json`, records the actual Git repositories
and commits, and retains build/content hashes. No external zoo checkout is needed.

The **Headless Borg death reports** workflow runs `smoke-v1` on relevant PRs:
18 explicitly assigned births, all nine classes, 5,000 ticks each. Manually
choose `death-survey-v1` for 90 assigned births at100,000ticks. Four shards run
at most four jobs concurrently; each child process has a120-second watchdog.
Deaths are ordinary measured endpoints; harness/configuration errors, missing
records and wall timeouts fail the measurement check. Stalls and decision caps
remain visible separately. Suites are immutable once measured; add a new ID
for a changed seed list, cap or birth rule.

Every run explicitly selects `c-seeded-point-buy-v2`: recommended C point buy,
no-selling enabled, native-menu startup sequence and game-stream Borg seed.
The GCC14.2 coordinate adapter and exact tick cap are explicit build settings.
These are measurement startup adapters, not Borg strategy changes. The engine
clock still starts at0; engine tracker issue640 is unresolved. This workflow
makes no claim of C parity or improvement over old rolled-birth cohorts.

Artifacts retained for90days:

- `headless-build`: compiled bundle, composed pack, source identities, hashes
  and applied adapter names;
- `headless-cells-N`: every child's result, command/message/state JSONL,
  stdout/stderr and partial evidence after a watchdog kill;
- `headless-death-report`: self-contained Markdown/JSON with complete outcome
  counts, a death table, final level/depth/HP, recent messages/commands/states,
  source identities and an exact seed/birth/profile/cap reproduction recipe.

A default-branch manual dispatch can specify an existing issue number to append
an enduring summary and complete death table with the run link. Raw evidence
remains subject to artifact retention. PR and non-default-branch runs have no
issue-write permission. The default workflow uses no scheduled recurring cohort,
no production deployment, no pull_request_target, and no application secrets.

The initial engine pin is our fork with the stock-order and starting-kit-order
corrections. For upstream submission, choose the official engine commit once
those corrections are accepted; the runner does not pretend a fork commit is
available from the official repository.

Local usage (Node26, built pinned engine; shared workspaces take the validation
lock around builds and game runs):

```sh
node --test tools/zoo/ci/report-checks.mjs
node tools/zoo/build.mjs --engine-dir ENGINE --borg-dir . --out build \
  --exact-tick-cap true --c-seed-startup true --c-gcc-coordinate-order true
node tools/zoo/ci/run.mjs --bundle build/bundle.mjs \
  --suite tools/zoo/ci/suites/smoke-v1.json --shard 0 --shards 4 --out cells-0
# Run shards1–3 in separate output directories, then place all four below runs/.
node tools/zoo/ci/report.mjs --suite tools/zoo/ci/suites/smoke-v1.json \
  --runs runs --out report
```

A timeout is a wall_timeout, never a death. A missing result becomes an explicit
harness_failure row, and duplicate/unexpected/mismatched records fail aggregation.
No old results or suites are rewritten. Absolute evidence paths in report.json
are diagnostic; complete raw records remain in the corresponding shard artifact.
