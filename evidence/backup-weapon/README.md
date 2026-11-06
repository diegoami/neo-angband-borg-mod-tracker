# Weapon-backup/HOME omission: bounded before-case

Executed on owned fork223f6d4c0734429e5334f6a046c39a469dae0afa after integrating
existing63/64/65. Relevant backup producer/power/HOME code remains the same
as upstream74a017d. This evidence branch changes no production implementation.
The manual fixture is outside default Vitest discovery and the required896-case
suite remains untouched. Expected result is **exit1:2 parity failures/2 passing
mapping/gating controls**, not a fixed feature.

```sh
pnpm install --frozen-lockfile --store-dir /tmp/a-new-private-backup-evidence-store
CI=1 NO_COLOR=1 pnpm exec vitest run --config tools/backup-weapon-evidence.config.mjs
```

[Exact executable fixture](public-case.probe.ts), [manual runner](../../tools/backup-weapon-evidence.config.mjs),
[observations](observed.json), [full output](observed.log), [numeric exit](observed.exit).
Actual executed result:2fail/2pass,3.13s. No live game/world loop, native C save,
producer implementation or survival outcome is claimed. No positive score or
controller result is injected: the real production resolver exists but the
HOME backup step exits without calling it.

## Public data and actual result

The public item adapter/itemAnalyzer read the real installed content records.
Candidate is the registered Bastard Sword of Éowyn, allocation min30, weight140,
4d4,+12/+16,PROT_FEAR,STR4/STEALTH2,NETHER/DARK/COLD resistance1 and its registered
slays. It is aware/fully known, uncursed, quantity1. At town/maxdepth60, swaps
are enabled, current equipment lacks nether protection, and the inventory has
space. Goal starts unset. This is a synthetic public-state selector fixture,
not a claim about a naturally encountered life or the complete shop chooser's
next action; other shopping selectors may choose active upgrades separately.

Actual TS: production `weaponSwapEval` is undefined; the HOME weapon-backup
selector returnsfalse, leaves shop/ware/item=-1, emits no retrieval action,
and performs zero ordinary loadout queries. Carrying the eligible artifact
instead of leaving it home leaves Borg power562630→562630(delta0). That
isolates the missing backup contribution/selection producer.

## C-derived oracle and guards (not executed C)

C4.2.6f3082213b73f3e463e3d0d60bff4b00462beae6e/currente473720ed88a0f0c7ca66815cef3000eb4a38bc3:
`borg-trait-swap.c:158–612`, `borg-power.c:1907`, `borg-store-buy.c:953–1060`,
`borg-trait.c:1025–1028`. Both source versions retain this path; changes in the
cited region rename a Tarrasque id, while this maxdepth60 case is below that
branch. This is source-derived expected behavior, not an executed C score.

Relevant guards are satisfied: aware, wearable sword, quantity1; non-digger
maxdepth>=50; swaps enabled and maxdepth<90; empty inventory hole/no prior
backup. No AGGRAVATE, named curse or uncursable penalty applies to this known
artifact. Published item/player fields expose all inputs used by this clean
case. Derived notice inputs are BLOWS4/TOHIT11/TODAM6, with missing nether,
cold and dark protection. C's nether terms alone contribute5500+100000; that
is **not the exact total score**. Initial -1 and additional nonnegative
physical/slay/resistance terms still exceed the C usefulness cutoff1000 and
empty-backup value-1. HOME evaluates carrying one ware, not wielding it, and
requires strict improvement before setting HOME/ware. The documented public
fields therefore suffice for this demonstrated clean-case omission; full
implementation still needs every C option/depth/digger/curse/capacity guard.

Passing executed controls confirm the mapping/aware/known/space/nether facts,
the existing disabled-option and maxdepth90 gates, and empty-home refusal.
Unknown/cursed/non-weapon/full-pack/no-improvement and all C edge cases are
**planned implementation acceptance**, not falsely reported as executed here.

## Follow-up boundary

Canonical owned source2; resolved upstream462/62 is ring history, not a backup
implementation. First assigned work is weapon-backup value/selected handle
plus HOME candidate/strict-improvement/retrieval only. Armour, tactical swapping
and the whole subsystem are outside this evidence/report. No engine upgrade,
hidden read, new C behavior correction, death-prevention or completed fix claim.
