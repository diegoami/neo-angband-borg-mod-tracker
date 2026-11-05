# Normal declared fork dependency integration

The owner requested completion of ordinary PR28 integration after its actual
unpatched default failures. The declared default proposal is now **published
beta.1 + explicit carried noteSpot**, not a renamed published package or a
waived failing check. [Patch provenance, scope and removal rules](../../../patches/engine-notespot/README.md).

Core/SDK/content all remain `1.23.0-beta.1`. Only core receives the named
checked-in pnpm patch, SHA256/lock patch hash
`87d2625eb64471e652a60c895d58dc56152f069007b8670f1b2e096bb99a79dd`.
Source and dist each gain only canonical noteSpot import/call and FORK
citation. No port runtime/plugin or existing test assertion/seed/cap/timeout
changes. Node24.21.0 / pnpm12.16.1 / TypeScript5.9.3 / Vitest4.1.11 locally.

Normal pnpm patch/edit/patch-commit used task-private directories/store;
subsequent `pnpm install --frozen-lockfile` succeeds. The package-boundary
control reads only installed core/content exports: [before](package-before.json)
exits1 with two genuine failures (seen/player memory), while unseen and
no-live-hook generation controls pass. The identical [after](package-after.json)
exits0 with all four passing. The ordinary verify chain now includes these
four package controls alongside the existing complete 866-case suite.

The prior [unpatched hosted default](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42127172027)
remains a genuine 862-pass/4-fail negative control. Prior raw receipts and the
initial single-hunk timeout remain append-only history. The separately
verified exact engine source19ff25ea profile remains available; its generated
scratch tree removes only the exact beta.1 carry declaration because that
source already includes noteSpot. There is no unused-patch waiver.

No upstream PR67 source change or draft graduation follows. Engine4/429 and
port25 stay open; Mandos126/150 independently own their carry and adoption.
No npm publication, release, live lab/data change or C/Rust work occurs here.
Owned PR28 remains unmerged until ordinary hosted gates and parent review.

## Completed ordinary local gate

`CI=1 pnpm verify` on the declared beta.1-plus-carry dependency exits **0**:
typecheck, four installed-package controls, **866/866 tests across 44 files,
zero skips, 186.93s**, and committed plugin currency all pass. All ten
play/rest and 26 spell cases execute. No local-core alias or external/sibling
content environment is set; the installed packages are the dependency under
test. Manifest grants, session, syntax and diff checks also pass.
[Full gate](full-gate.log) / [numeric exit](full-gate.exit).

Ordinary hosted push and pull-request checks, retained exact-source profile
and parent review remain required before any owned integration merge.
