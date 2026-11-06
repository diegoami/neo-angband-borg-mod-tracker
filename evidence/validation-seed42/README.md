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
