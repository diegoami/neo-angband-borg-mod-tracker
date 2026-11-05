# Exact-source noteSpot consumer proposal

This fork-only proposal combines the installed-content loaders of upstream
[PR67](https://github.com/neostryder/neo-angband-mod-borg/pull/67), preserved at
`1d1793258b887efae5c862a15a92683b8258c33c`, and the exact spell loader from
[PR66](https://github.com/neostryder/neo-angband-mod-borg/pull/66), preserved at
`e71bd21df75010486c10a8e1c6748c4b546d1f10`. These are distinct source proposals:
PR67 alone leaves 26 spell cases skipped; they must be reconciled to verify the
complete 866-case suite. Runtime port code, plugin, assertions, seeds, caps and
timeouts are unchanged. Both published proposal heads remain untouched.

The selected dependency is engine source
`19ff25eac8997e8feb6b5e62eefa7ffe4d134631`, **not** the npm beta.2 label. All
three compatible core/SDK/content packages come from that source, built with
Node 26.13.0 / pnpm 12.3.4 / npm 11.20.0 / TypeScript 5.9.3. Exact source trees,
package integrity/size/exports and producer limits are in
[engine-artifacts.json](engine-artifacts.json); artifact SHA256s are in
[SHA256SUMS](SHA256SUMS). The
[engine-owned packaging handoff](https://github.com/diegoami/neo-angband-tracker/issues/4#issuecomment-6671740340)
retains the source build and empty-consumer import controls. The content pack
is unchanged at tree `d72413a575ea48cb94da046ce5e47370e2932a97`.

## Reproduce

Use a clean source checkout containing this proposal. The engine checkout
only needs the exact immutable source commit available; its working tree is
not read or modified. With the producer toolchain above:

```sh
bash tools/build-notespot-artifacts.sh /path/to/neo-angband-tracker /new/engine-artifacts
node tools/verify-notespot-source.mjs /new/engine-artifacts/tarballs
```

The first script archives the immutable engine source into a new directory,
installs its frozen lock with a private store, builds SDK/core/content under
the shared validation lock, synchronizes SDK docs, applies the engine's own
workspace-range pin tool only inside that archive, and packs the three
artifacts. Nothing is published.

The second script checks all three immutable SHA256s before using any artifact,
archives this port proposal's HEAD into a fresh sibling-free temporary tree,
installs its original frozen beta.1 manifest/lock using another private store,
and explicitly installs the three source artifacts. Its SDK override is
required: merely adding three tarballs selects a second registry SDK for the
core's transitive exact-beta.2 dependency. The override routes that dependency
to the same immutable SDK artifact. The consumer manifest/lock changes are
confined to this generated tree. No existing checkout, shared dependency file
or consumer patch is modified.

It checks manifest grants, then runs the unchanged required
`CI=1 pnpm verify` chain under `/tmp/angband-validation.lock`: typecheck,
complete tests and committed plugin currency. It preserves streaming logs and
numeric exit status and rejects any skipped case or a result other than
866 passed. Neither local-core aliases nor explicit/sibling content is used.
The fork-only `notespot-source` workflow runs the same recipe. The separate
original CI job continues to test the declared published beta.1 default.

## Source/upstream limits

The established unpatched published beta.1 play/rest baseline remains
6 pass / 4 repeated-open failures / zero skips. The initial single-hunk
9 pass / 1 unchanged timeout and subsequent 10/10 diagnostic remain historical,
scoped evidence in the prior port reconciliation receipts. No failed run is
superseded into a pass.

Upstream engine PR429 remains unmerged. Source issue25 stays open and upstream
port PR67 stays DRAFT; this exact-source fork compatibility proposal does not
change that default/upstream gate. No npm publication exists for the fix.
Mandos126/150 independently own carry reconciliation, adoption, rebuild and
consumer verification. No API2 desktop/live-lab, gameplay-strategy, within-grade
confusion or native-C claim follows from this port gate. No consumer/source
labels, protected lab or private data change.

## Completed local gate

`CI=1 pnpm verify` exits **0**: **866 passed / zero skips**, all 44 test files
passed,213.98s. All ten play/rest cases and26 previously hidden spell cases
execute in the unfiltered full suite. Typecheck passes and the committed
plugin is current (661.9KiB, API >=2.0.0 <3.0.0). Manifest grants also pass.
This is an observed full port compatibility receipt for the explicit fork
source/artifact tuple above, not a claim about registry beta.2.

Consumer toolchain: Node 24.21.0 / pnpm 12.16.1 / TypeScript 5.9.3 / Vitest 4.1.11.
[Complete gate log](full-gate.log), [numeric exit](full-gate.exit),
[exact single-artifact SDK selection](sdk-selection.log), and the three
`executed-*` manifest/lock/workspace receipts retain the executed selection;
only the disposable artifact-root path is generalized in those receipts.
The wrong-artifact negative control fails before install as intended;
script syntax and diff checks pass.

An already-running Mandos focused live-play check overlapped the beginning
of this local run before lock coordination arrived; all subsequent checks
queue through the shared lock. The port gate passed unchanged, including
its existing120s case limits. No assertion, timeout or seed was altered.

Hosted exact-source CI is a separate receipt; local success does not imply
its outcome. The original default/published beta.1 job remains an honest
blocked baseline; any failure there is retained rather than waived.

## Hosted profile reconciliation

At immutable proposal head `14004194cd70efae2d54832cf6b5d57b32282dbf`,
[exact-source CI42126504537](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42126504537)
**succeeds**, independently rebuilding all three byte-matching artifacts on
Node 26.13.0 and executing the generated sibling-free consumer recipe. All
866 cases pass with zero skips in 156.59s; typecheck, grants and plugin currency pass.
See [source excerpts](hosted-source-excerpt.log). The exact artifact SHA256
checks and final all 866/no-skips guard both execute successfully.

The required unchanged
[published-default CI42126504028](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42126504028)
**fails**:862 passed /4 failed /zero skips,121.39s. Seeds1/7/42/99 repeat
`open`1363/1227/1348/1457 times of1500, matching the original baseline.
All 26 spell cases now execute. Typecheck passes; the failed chain does not
reach plugin checking. See [default excerpts](hosted-default-excerpt.log).
Privacy/session checks pass.

PR28 and upstream67 stay DRAFT/unmerged; no required failing default check
is waived. The component primary/default remains `f8e7845acafa24d4f3971342c80cfaed76b0e03e`.
The task worktree's dependencies were restored to its declared published
beta.1 baseline after preserving the executed exact-source receipts.
The lane-only watch audits 6 active source trackers / 22 references without
problems; this was an isolated initial baseline, not a movement comparison; no Rust repository/feed polling is performed.

The final receipt/ledger update changes documentation only. Any CI created
by that append is separate from the exact immutable source-profile result
above; no new result is inferred. The next port action requires the actual
supported-default engine correction/delivery, then rechecking the full
default gate before considering either draft's graduation or integration.
