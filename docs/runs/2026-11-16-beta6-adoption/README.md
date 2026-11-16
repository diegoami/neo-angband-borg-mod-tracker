# Owner-requested upstream reports and beta.6 adoption

Release: [v1.4.0-beta.6](https://github.com/neostryder/neo-angband-mod-borg/releases/tag/v1.4.0-beta.6), source622b2ba82ee48b26c1be0517181eb29b8a8239e1.
Integration: [fork PR105](https://github.com/diegoami/neo-angband-borg-mod-tracker/pull/105).
GitHub's releases/latest endpoint reports the older non-prerelease beta.2;
the release list and beta.6 tag identify the requested newer release.

The six [source findings](../../audits/2026-11-16-port-fidelity/README.md) were
posted first as neostryder/neo-angband514–519, after targeted duplicate checks.
Their source, synthetic fixtures and limitations are independent of release
adoption. The connector could not create upstream issues (app403); existing
authenticated gh created all six successfully. Evidence commit777bce131f7c6c3da0483e90f993dd744c16ad7b
was pushed before posting. The native oracle fixture now takes a C checkout
argument instead of a machine-specific local path; no C block or assertion changed.

Fork basece02f4f normally merges the exact release. Existing gameplay and host
tooling remain; root session docs win the two documentation conflicts, and
upstream README/PLANNED snapshots are refreshed. Ordinary published beta.4
dependencies and exact-source engined27ed50f remain unchanged. The branch
preserves upstream500/502/503 corrections and ten new ordinary cases.

The new180-life experiment stays opt-in via explicit BORG_SOAK=1 registration;
its birth/shopping regression is always registered. The default full gate
requires1275 passed/zero skips, up from1265. The guard changes no gameplay,
assertions, seed, cap or experiment timeout. The separate carried-book
proposal113/104 is not part of released beta.6.

Local lightweight validation:124 focused fight/flow/manifest/version cases
pass,31 routing controls pass, grant/session checks pass. Shared existing
node_modules is stale: local typecheck lacks the TypeScript6 alias and current
SDK countdown type, and local plugin check sees an API2.0 SDK rather than the
declared API2.1 dependency. Those attempts failed and are not release gates.
No broad local suite, game or soak was started. Hosted CI installs the frozen
declared dependencies and must pass ordinary/exact-source1275-case suites,
plugin/type checks, real truth-host checks and privacy before merge.

First hosted run43838155200 exposed the audit oracle's hardcoded local-home
path in privacy scan; the fixture was parameterized in a new commit, preserving
published history. Final-head validation and adoption merge receipts belong
on PR105 and checkpoint26. No consumer or lab deployment is included.
