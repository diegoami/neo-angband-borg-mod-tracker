# Port reconciliation, 2026-11-05

This is a source verification record, not a Mandos build or lab update.
The old lab, reference checkouts, saves, profiles and lab data were not changed.
All experiments used disposable task worktrees and copied dependencies.

## Upstream source and boards

Fetched port master is `74a017d2f695939eb2f046b7c9ff286ef1e82568`.
Fetched engine master is `0cc75b4afcbe6f5128730e4b910408c7be4ac5c5`.
Neither moved from the session pins. Owned port master
`33552ab8504f5431d02f63a3b340757a47739661` already contains that port master;
its runtime, plugin, package and lockfile compare identical. There is no new
upstream source to merge. Do not manufacture an upstream-refresh merge or apply
an unmerged proposal to the default branch.

Reviewed the current port and consolidated engine issue boards and PRs, not just
their closure markers. PRs 63–66 are still open at the heads in
[the patch ledger](../../PATCHES.md). PR #66 repairs only the spell suite, not
the two play/rest loaders. Engine proposals #429, #432 and #433 remain open at
`2553cb496da46692fd64eade5f089acecdc5088e`,
`e8729a285474325ca25a03534db14f8c10808794` and
`cc838821a8ca9f003642e5f30ea068c2b1b21ba3` respectively.
Their presence in Mandos's existing bundle is not upstream integration.

`node tools/check-session.mjs` passes. The upstream watcher reports 194 trackers,
72 references and no audit problems. Its scratch cache is a standalone snapshot;
the primary tracker had no saved baseline, so its no-movement sentence does not
establish a historical comparison. The fetched commits and live PR heads above
provide that comparison. Board JSON and the watcher output are retained here.
Older issue closures/correction receipts are not newly certified by this audit.

Workflow audit: live CI, privacy and session checks are active. GitHub release,
Nexus publish and issue redirection are `disabled_manually`. The inherited
release/publish/redirect YAML still lacks repository guards; preserve the live
disablement and re-audit before any future source refresh. This pass changes no
workflow, tag, release, deployment or workflow setting.

## Pins and method

See [pins.json](pins.json) for exact source/file hashes. Port core and SDK are
both published `1.23.0-beta.1`; Node is `v24.21.0`, pnpm `12.16.1`, Vitest
`4.1.11`, TypeScript `5.9.3`. Baseline content is the engine checkout's
`1.23.0-beta.2` pack at the exact engine commit above, Git tree
`d72413a575ea48cb94da046ce5e47370e2932a97`. The loader proposal declares installed
content `1.23.0-beta.1`; recursive comparison establishes byte-identical pack
files between these two named content sources.

Every heavy command uses `flock /tmp/angband-validation.lock`, with output logged
and the running sessions watched. In the commands below, `VERIFY_ENGINE` is the
disposable checkout at the engine pin. `PORT_TASK` is the documentation-bearing
task worktree with a private copy of node_modules. Neither is the owner's lab.

```sh
NEO_ANGBAND_REPO="$VERIFY_ENGINE" CI=1 flock /tmp/angband-validation.lock \
  pnpm exec vitest run src/play.test.ts src/rest-and-store-verification.test.ts
```

The four play seeds are 1, 7, 42 and 99, each capped at 1500 decisions, with the
engine's birth defaults and Borg RNG `(seed * 2654435761) >>> 0 || 1`. They run
generated levels and normal command/energy rules. No assertions, seeds, decision
caps or timeouts were changed. The rest/store file also includes deliberately
constructed legal HP/shop scenarios, as described in its source.

Baseline: exit 1, 6 passed / 4 failed / zero skips, 213.56 seconds. The four
non-movement-dominance failures are `open` counts 1363, 1227, 1348 and 1457 of
1500 respectively. See [play-baseline.log](play-baseline.log).

## Isolating the engine hunk

In the task's copied published core only, import `noteSpot` from `./known.js`
in `dist/game/trap.js` and call `noteSpot(state, grid)` immediately after
`squareSetFeatTrapSideEffect(state, grid)` in `installChunkFeatHook`.
This is the executable counterpart of the exact diff in upstream engine
PR #429, commit `2553cb496da46692fd64eade5f089acecdc5088e`. No #432/#433,
book-count correction or other lab hunk is added. Source maps/declarations are
not rebuilt; this is explicitly a package-runtime experiment, not an engine
build or release certification.

Repeat the identical command above. Initial result: exit 1, 9 passed / 1 failed /
zero skips, 289.52 seconds. Seeds 1, 7 and 99 now pass their original assertions.
Seed 42 exceeded its unchanged 120000 ms timeout (132793 ms), so this run does
not verify that scenario. The timeout is retained in the raw log and requires a
separate unchanged focused run; it is not counted as a pass.

The explicit-content focused retry subsequently passes seed 42 in 78766 ms,
exit 0, with the original loader and unchanged 120000 ms timeout:

```sh
NEO_ANGBAND_REPO="$VERIFY_ENGINE" CI=1 flock /tmp/angband-validation.lock \
  pnpm exec vitest run src/play.test.ts -t 'seed 42' --reporter=verbose
```

See [the focused log](play-notespot-seed42.log). Its five filtered tests are
outside this focused claim; the unfiltered installed-content run below verifies
all ten. An earlier retry accidentally omitted the content environment and
skipped all six cases; [that log](invalid-no-content-retry.log) is retained as
an invalid verification attempt and contributes no pass evidence.

The later installed-package-only loader run executes the same assertions with
the byte-identical pack and this same single-hunk core copy: **10 passed / zero
skips**, exit 0, 243.69 seconds. See
[loader-installed-notespot.log](loader-installed-notespot.log). Thus the four
baseline repeated-open failures have completed passing counterparts; the
earlier timeout remains a recorded failed run, not a green gate.

The existing patched-lab 10/10 receipt remains bundle-level historical evidence.
The new controlled comparison attributes the completed play corrections to one
engine hunk; it does not prove every engine test, desktop/API2 tick behavior,
all possible seeds, or the within-grade confusion scenario. The port's play harness
installs the headless Borg controller and does not exercise the API2 tick's
stall-release boundary.

## Stall-affliction correction, source issue #15

Actual source changes: `1909262bfcd7a7f54a225c5e27bc752d5f8c5645` adds status
fields to the scene key; `6c7bc298278ba66d67eb71029c20ee0ac2b75c6e` refines
typed access/documentation and production-bridge grade regressions. Both are
in current master. PR #51's merge marker alone is not the evidence.

```sh
flock /tmp/angband-validation.lock pnpm exec vitest run src/api2/controller.test.ts
```

Current source: 33/33, zero skips. Negative control removes only `afflictions`
from the serialized scene key, retains all tests, and produces exactly 9 failed /
24 passed. A finally block restores the source; repeating gives 33/33, zero
skips. Seven clearing effects and two cut/stun grade crossings are the failing
regressions. Constant grades and food-only changes remain real-stall controls.
These use the public API2 host bridge/playerView with synthetic known-world
grades; they do not execute a natural confused-door countdown. The view still
hides changes within a grade. Source #15 and Mandos adoption #140 stay open.

## Play/rest loader proposal, source issue #25

A separate topic from pristine upstream master adds the matching content
devDependency and installed-pack fallback to both loaders. It throws on missing
content in CI and warns before explicit local skips. It does not alter runtime
Borg source, plugin, engine pins, rules, assertions or timeouts. It remains a
proposal while the published engine has the failures above. Its installed-only
and missing-content receipts are recorded separately from engine verification.
Published head is `1d1793258b887efae5c862a15a92683b8258c33c`, branch
`pr/play-rest-test-content`, [upstream draft PR #67](https://github.com/neostryder/neo-angband-mod-borg/pull/67),
[upstream report #468](https://github.com/neostryder/neo-angband/issues/468).
It contains only two test files, package.json and pnpm-lock.yaml; it excludes
bootstrap docs and all runtime/plugin changes. Existing proposal heads and tags
are preserved.

`pnpm install --frozen-lockfile --offline` succeeds. Typecheck and `pnpm check`
pass; committed plugin.js is current and unchanged. The
installed-only test selects the copied core through `NEO_ANGBAND_LOCAL_CORE=1`
and a disposable engine root containing only the core dist link, **no content
pack**. No sibling checkout supplies content; package fallback is required.
The retained [loader control script](loader-controls.py) records exact commands
and exit codes. Hiding only the disposable content-package symlink makes CI
exit 1 with a required-content error in both files. Non-CI warns and explicitly
reports ten skips (a negative control, not scenario verification). The symlink
is restored in finally; installed-only then passes 10/10, zero skips.

No full 866-test gate is claimed in this pass. PR #66's separate spell-content
coverage is still unmerged. Unpatched supported beta.1 remains red with the four
baseline failures, so draft #67 is not merged into either default branch.
Hosted fork CI run `42114449365` and privacy run `42114449319` are queued at
the final check; they are not described as passing. No complete hosted gate
is inferred from the local focused results.

The private runtime patch is restored to its original bytes after verification;
all diagnostic changes are confined to the retained records. Default runtime
source remains upstream `74a017d`.

Source issue #25 owns the loader/runtime investigation; engine source issue #4
owns the `noteSpot` defect/proposal. Mandos #150 and #126 independently own
consumer adoption/rebuild/verification. No Mandos state or patch is changed
by these source results. Applicable C corrections remain Mandos's independent
TS translation work, not this fidelity tracker's implementation scope.

The public install log normalizes only the private pnpm store path; the original
local log is untouched. Test results, timings and diagnostics are unchanged.
