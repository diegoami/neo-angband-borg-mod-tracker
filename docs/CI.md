# Fork CI routing

Owner maintenance issue: [port29](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/29),
coordinated by [workspace9](https://github.com/diegoami/angband-workspace/issues/9).
This policy changes CI scheduling only. Engine dependency/carry, runtime,
assertions, seeds, caps, timeouts and upstream proposals are unchanged.

One automatic `ci` workflow runs on each PR update and default-master push.
Feature-branch pushes, issues and comments do not run it. Manual CI dispatch
runs full verification. Event/PR/ref concurrency cancels superseded automatic
runs; manual work uses a separate event group and is not interrupted by a PR.
Session/docs and privacy checks remain within that same workflow. Publishing,
Nexus and issue redirection remain disabled and untouched.

The stable final `verify` result requires successful classification, checks
and privacy. A full profile also requires successful exact-source compatibility;
a docs profile requires that expensive job to be skipped as selected. Missing
or inconsistent outputs, cancellation, failure or a skipped required job fail
the final result. Job summaries identify which profile actually executed.
There is no top-level path filter that can strand required checks.

| Changed inputs | Required checks |
| --- | --- |
| Explicit audited prose names; inert receipt `.md`, `.log`, `.exit`, `.txt` files immediately below a run directory | Session, routing controls, privacy, actual `docs-sync.test.ts` and `version-sync.test.ts` contracts |
| Source, tests, dependencies/lockfiles, patches, scripts, CI/workflows, JSON/data or executable fixtures anywhere, unknown paths, empty/unavailable/invalid diff | Full ordinary typecheck, four installed-package memory controls, all 951 port tests with zero skips, grants/plugin currency, session/privacy/routing controls, exact-source compatibility |

The allowlist is intentionally narrow, not `docs/**`. `docs/README.md` is
read as settings data by the docs contract; `CHANGELOG.md` is read by the
version contract. Both contracts execute in the lightweight profile, and
broken defaults/version headers are rejected. Current runtime/test/tool file
reads were audited: executable/data files under documentation remain full,
including existing JSON receipts, Python controls and future fixture directories.
Inert run text/log/prose snapshots are not imported by those checks. New
unknown prose stays full until deliberately audited and allowlisted.

PR diffs use the immutable merge-base and head; default pushes use immutable
before/after commits. Renames include both old and new paths so moving code
to a documentation name cannot hide it. Failed Git reads, invalid endpoints, binary changes and file-type/mode
changes select full. A cumulative runtime/CI PR remains full after a later inert
receipt commit: a latest-commit shortcut could otherwise skip an unfinished
or superseded ancestor gate. No unverified receipt reuse is implemented.

The existing `notespot-source` workflow is reusable/manual-only. Automatic
CI calls it only for a relevant full profile, including workflow changes;
it no longer separately reacts to every PR. Direct manual invocation remains
available. This independent source-artifact compatibility receipt never
substitutes for the ordinary declared published-beta.3 gate.

Run `node --test tools/ci-profile-checks.mjs` for routing controls. They exercise
real Git diffs/merge bases/renames and CLI outputs, unknown/data fixtures,
trigger/concurrency negative controls, final-gate failure/cancellation paths,
and missing/skipped full-suite rejection. They are explicit Node controls
outside Vitest discovery; routing controls do not add or remove gameplay cases.

The current 951 cases retain the earlier 932 baseline (including the eight
registered light cases) and add nineteen official94d wiring regressions: sixteen
trait cases, two public-content food cases and one previous-HP case. The shared ordinary/source
full-suite guard rejects skipped or incomplete output. Historical run records
retain their original counts and dependency profiles; beta.3 upgrade task39
updates the source artifact recipe only from the engine producer's verified pin.
