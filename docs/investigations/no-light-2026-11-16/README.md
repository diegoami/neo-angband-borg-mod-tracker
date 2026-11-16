# Recorded visibility-guard port mismatch

The small Zoo run43876073942 supplies a natural public-observation counterexample
to the Borg's approximation of C `no_light`. No runtime code is changed here.

Measured Borg source464a1555 and fork master2e468420 have identical runtime
source. Engine: d27ed50f9e3b650a43cceda5a0c007d03cc321df; published beta.4
core/SDK/content are used for this focused replay. Latest upstream `deps.ts`
was also read on 2026-11-16 and retains the same helper.

## Natural observation and command

Half-Troll Necromancer seed1211397579 stops at turn76449. The last public
observation publishes its own grid107,34 as `visible:true, seen:false,
lit:false, glow:false`, with no blindness. The game reports light0. The Borg
computes BI_LIGHT1, faithfully preserving C's Necromancer/unlight trait rule.
Its `noLight` therefore returns false and `borgSpell(NETHER_BOLT)` emits
`{code:"cast",args:{spell:0}}`. Raw messages repeat `You cannot see!` at the
same turn, until controller release after40 unchanged casts.

The replay primes the production API2 bridge, composed object registrations,
book/frame resolvers and spell seam, then runs notice/perception and the actual
spell helper. Recorded player, items, spell knowledge and map are unchanged.
The harness transports the captured observation; it does not reconstruct the
original live engine or entire Borg controller history. It reproduces the cast
guard's contribution to the recorded stall, not the upstream cause of an unseen
player square. The latter remains an independent engine/perception question.

## C provenance and controls

Imported C4.2.6 f3082213b73f3e463e3d0d60bff4b00462beae6e and pinned current C
e473720ed88a0f0c7ca66815cef3000eb4a38bc3 both implement `no_light` as
`!square_isseen(cave,p->grid)`. Both `borg_spell_okay` functions reject it before
the reserve-mana check. The accompanying C files retain the exact extracted
predicate with minimal dependency stubs. They are isolated predicate oracles,
not native-game reproductions. Compiling/running each yields:

```
seen=0 no_light=1
seen=1 no_light=0
```

The paired TS control changes only the current recorded cell's `seen` and `lit`
booleans. With either value the port returns false and emits Nether Bolt. C's
predicate changes its answer. This establishes a port mismatch at the guard.

API2 already supplies the needed information: pinned engine
`packages/core/src/agent/known-level.ts` sets `seen: squareIsSeen(chunk,grid)`.
`visible` is SQUARE_VIEW/LOS and is insufficient. The Borg's `src/api2/world.ts`
adapter drops `seen`/`lit`; `src/item/deps.ts:noLight` instead combines BI_LIGHT
and glow. A repair should forward current-square seen knowledge through the
declared Borg view and use it for this predicate, retaining normal light/glow
controls. Missing current-cell handling needs an explicit contract.

## Reproduction

With this branch's normal dependencies installed:

```sh
VERIFY_C_VISIBILITY_PARITY=1 node node_modules/vitest/vitest.mjs run src/item/visibility-investigation.test.ts --maxWorkers 1 --no-file-parallelism
cc -Wall -Wextra -Werror docs/investigations/no-light-2026-11-16/imported-predicate.c -o /tmp/no-light-imported
/tmp/no-light-imported
cc -Wall -Wextra -Werror docs/investigations/no-light-2026-11-16/current-predicate.c -o /tmp/no-light-current
/tmp/no-light-current
```

Observed:4 baseline/control assertions pass;1 prospective C-parity test FAILS
(`expected false to be true`). This is an investigation receipt, not a fix or
passing parity claim. No broad local suite or new Zoo games were run.

## Scope and related history

Neo455 is a closed earlier light-ladder/permanent-glow correction. This concrete
post-adoption counterexample warrants a new linked scope; it does not reopen455.
Neo220 covers an engine blind-transition view refresh. This report does not
assert that its original engine fix is absent.

Rogue seed1125182320's captured observation also reproduces its study spell1
command, but its own cell is missing from the public map. The C and TS study
guards match, and study does not use this `noLight` helper. Its stall is not
claimed solved by the cast-guard finding. The fear/curse split and double light
modifier accumulation were also checked against C and are faithful copies.

This finding explains a rejected-cast loop among the5 stalls. It does not
establish a cause for any of the46 deaths, or estimate a survival improvement.
The JSON snapshots are unchanged finalKnownWorld objects serialized from the
raw archives; receipt.json records their hashes and terminal raw evidence.
