# Hosted-check reconciliation, 2026-11-05

This appends completed hosted results to the earlier
[source verification](../2026-11-05-port-reconciliation/README.md). The earlier
queued and failed receipts remain unchanged.

Fetched port master remains `74a017d2f695939eb2f046b7c9ff286ef1e82568`.
Engine master remains `0cc75b4afcbe6f5128730e4b910408c7be4ac5c5` (fresh fetch
into the existing disposable source-verification clone). Port default is
`20fce00e7eddaa97dea57e6ec6a4031395d80836` before this records-only update.
Runtime/plugin/package/lockfile still compare identical to pristine port master.
There is no upstream source update to integrate. No proposal is treated as
merged from GitHub's synthetic merge-commit field: all inspected PRs have
`merged: false`. Their exact heads are in [proposals.json](proposals.json).

The watcher completes successfully: 194 trackers / 75 references / no audit
problems. Its only reported movement is source issue25 (also through its linked
consumer reference), inspected as this session's prior evidence/body update.
The latest source comment still records the pinned single-hunk controls; no
new correction or maintainer response is being inferred from that movement.
See [upstream-watch.log](upstream-watch.log).

Upstream port PRs 63–66 remain open at their preserved heads; 67 remains draft
at `1d1793258b887efae5c862a15a92683b8258c33c`. Engine 429/432/433 remain open.
The consolidated upstream issue board was also checked, including open #468.
No newly corrected defect is claimed or closed in this pass.

## Completed hosted checks

| Head | Run | Outcome | Actual coverage |
| --- | --- | --- | --- |
| Default `20fce00` | [CI 42115581586](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42115581586) | Success | 830 passed / **36 skipped**, 22.30s |
| Default `20fce00` | [privacy 42115581770](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42115581770) | Success | Privacy scan |
| Default `20fce00` | [session 42115581784](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42115581784) | Success | Session check |
| Proposal `1d17932` | [CI 42114449365](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42114449365) | **Failure** | 836 passed / **4 failed / 26 skipped**, 166.97s |
| Proposal `1d17932` | [privacy 42114449319](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42114449319) | Success | Privacy scan |

The previous record-merge `074f8e8` CI42115105257, privacy42115104869 and
session42115104806 also completed successfully. This does not add runtime
scenario coverage beyond what those jobs actually execute.

Both CI runs use Node `v22.23.4`, pnpm `12.16.1`, TypeScript `5.9.3`, Vitest
`4.1.11`, published core/SDK `1.23.0-beta.1`, and `pnpm install --frozen-lockfile`
followed by `pnpm verify` (typecheck, tests, then plugin-current check).
Proposal 67 additionally installs content `1.23.0-beta.1`. Default declares no
content package, so its 36 skips comprise the 26 spell cases plus all ten
play/rest cases. The green default job does **not** verify those cases.

Proposal 67 actually executes all ten play/rest cases: six pass, four fail.
Seeds 1/7/42/99 issue `open` 1363/1227/1348/1457 times of 1500, exactly matching
the earlier local published-engine baseline. These are assertion failures,
not timeouts. The 26 skipped spell cases belong to separate pending PR66.
Typecheck passed before testing. The failed hosted verify chain never reached
its plugin-current stage; only the earlier explicitly recorded local plugin
check certifies that proposal artifact.

See [default excerpts](default-test-excerpt.log) and
[proposal excerpts](draft67-test-excerpt.log). These preserve relevant result,
version and timestamp lines from `gh run view --log`, with ANSI colors removed.
The complete logs remain accessible on their linked GitHub runs and in local
scratch; the excerpts are not represented as whole logs.

## Decisions and limits

Keep PR67 draft and source issue25 open. Actual upstream engine correction429
is still missing. Published npm core/SDK dist-tags checked in this pass remain
`latest: 1.22.0`, `next: 1.23.0-beta.2`; neither tag proves inclusion of429.
Do not change the supported engine pin merely to rename a failing baseline.
The earlier private single-noteSpot control10/10 remains valid only for its
exact recorded engine/content/port combination; this pass does not re-run it
or claim a new full-green gate.

Source15's within-grade countdown remains unresolved. Source23/22/24 proposals
remain pending; their earlier synthetic/control evidence remains attached to
their pinned revisions. No new source correction means no new fail-before/
pass-after claim and no reason to repeat unchanged heavy gates. Source byte
comparison and session checks pass. A sandbox EPERM on the task session
checker's Git subprocess was retried outside the sandbox and passed.

Release/Nexus/issue-redirection workflows remain disabled_manually;
CI/privacy/session stay active. The existing upstream push-disabled setting is
preserved. No workflows, tags, proposal heads or runtime code are changed.
Engine correction belongs to engine source4; Mandos150/126/140 own independent
adoption/rebuild/verification. No consumer state, lab, save, profile or data
changes. No new heavy gate, engine/C implementation or C submission.

Next: engine source4/upstream429 correction and supported-engine verification
must be resolved before draft67 can graduate. Then run the required full gate
with relevant content cases executing, without waived skips/failures. Mandos
independently adopts and verifies its consumers.
