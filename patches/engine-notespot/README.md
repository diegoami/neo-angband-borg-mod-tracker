# Explicit core beta.1 noteSpot carry

This is an owned-fork engine dependency carry, not a Neo Borg behavior change.
The declared profile is **published beta.1 + explicit carried noteSpot**:
core `1.23.0-beta.1` with the named pnpm patch; SDK/content remain unmodified
published `1.23.0-beta.1`. The package version is not changed or represented
as containing an upstream-delivered fix.

Canonical owner: [engine issue4](https://github.com/diegoami/neo-angband-tracker/issues/4).
Proposal: [upstream429](https://github.com/neostryder/neo-angband/pull/429),
commit `2553cb496da46692fd64eade5f089acecdc5088e`; merged engine fork source
`19ff25eac8997e8feb6b5e62eefa7ffe4d134631`. The original source restores
`square_note_spot` from C `cave-square.c:1261`, updating memory only for seen
or player grids through the existing `noteSpot` guard. This restores an
omitted engine call; it does not translate a C gameplay correction.

The patch adds only the `noteSpot` import/call and adjacent FORK citation to
`src/game/trap.ts` and the shipped runtime `dist/game/trap.js`. The published
source blob `ecc0a3a40bf404b4f6c50b30379d7b0d9aebf160` matches the canonical
proposal's parent source. Existing source credit/licensing stays intact.
Patch SHA256 / pnpm patch hash:
`87d2625eb64471e652a60c895d58dc56152f069007b8670f1b2e096bb99a79dd`.

Created using normal `pnpm patch --edit-dir` / `pnpm patch-commit`, with a
private edit directory and task-private store. The workspace declares the
exact package/version and checked-in patch; the lock records that hash.
Ordinary `pnpm install --frozen-lockfile` installs the carry reproducibly.
No shared store/dependency is edited in place.

`pnpm check:engine-carry` exercises the installed exports directly: seen
and player-square updates, unseen remote non-revelation and generation
without a live hook. Ordinary `CI=1 pnpm verify` includes these controls,
all 866 existing port cases and plugin currency. No assertions, seeds, caps
or timeouts in those cases change.

Upstream port PR67 remains a clean separate DRAFT at `1d1793258b887efae5c862a15a92683b8258c33c`;
this owned dependency carry is not injected there. Engine4/upstream429 and
port25 remain open until actual upstream resolution; no source carry labels
are used. Later delivery/adoption must recheck exact source and all controls
before removing this carry. The alternate exact-source19ff25ea profile
already contains the call: only the exact beta.1 declaration is removed in
its generated scratch tree before installing the three hash-pinned artifacts.
No other patch entry or existing consumer carry is removed.
