# Preserved local validation failures — pending classification

Runtime head78622e6d1f7d31fd9f4b63ea104538af228ee765, normally merged223f6d4.
Node24.21.0 / pnpm12.16.1 / Vitest4.1.11; declared published core/SDK/content
beta.1 + explicit noteSpot patch87d2625e. No version/assertion/seed/cap/timeout
changes. Both runs used the shared validation lock and CI=1 NO_COLOR=1.

- Full `pnpm verify`:895 passed/1 seed42 timed out at unchanged120000ms,
  295.89s total,47 files, exit1. Not a green local full receipt.
- Focused `pnpm exec vitest run src/play.test.ts -t "seed 42"`:1 timeout/
  5 FILTERED cases,167.21s total,exit1. Other cases are not verified by this run.

Independent full hosted42147590447 passed896/896 with zero skips in BOTH
ordinary(default252.33s) and source19ff(231.99s) profiles. Actual post-merge
42149096196 also passed. These do not erase the red local results.

Scope remains environment/performance/regression UNCLASSIFIED, not a confirmed
product or C bug. Owner stopped the session before a distinct owned validation
issue was created: PENDING DRAFT/NO SUBMISSION. Next bounded investigation, only
when resumed/authorised: unchanged seed42 against unfixed owned base deadbfce
under the same environment/flags, not another duplicate whole suite. Do not
weaken tests. Logs/exit codes are exact copies, private-data scan passed; hashes
are adjacent. This evidence is outside automatic test discovery; no runtime or
required896-case suite change is included.


## Resumed comparison — 2026-11-06

Tracked internally at [validation35](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/35).
Exact unfixed owned base `deadbfce4ede467960c1647f2f0622c13927c298`,
isolated detached worktree, same Node24.21.0/pnpm12.16.1/Vitest4.1.11 and
identical installed dependencies (shared read-only-by-intent node_modules link).
Package/lock/patch/test/config bytes match the carried78622e6/223f6d4.
Command unchanged: `CI=1 NO_COLOR=1 pnpm exec vitest run src/play.test.ts -t "seed 42"`,
under the shared validation lock. No NEO local-engine opt-in or assertion,
seed, cap, timeout change. Pnpm verified the existing lock/install, no
dependency version change. Host load/time-of-day was not controlled.

**Actual baseline result:1 timeout/5 filtered cases,137.93s total,exit1.**
The case logged134.912s and exceeded its unchanged120000ms timeout.
This reproduces a local timing failure on the pre63–65 code too; it is not
introduced solely by those three imports. It does not establish the exact
cause or exclude unrelated performance changes. Product-vs-host/environment
classification remains open; hosted896-case green remains independent.
No further full-suite rerun or threshold weakening follows from this result.
Exact log/exit/start receipt are adjacent, with baseline hashes below.
