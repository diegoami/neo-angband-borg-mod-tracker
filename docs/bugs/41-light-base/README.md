# Port41: count equipment light from the C zero base

Canonical defect: [port41](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/41).
Consumer adoption: [Mandos196](https://github.com/diegoami/mandos/issues/196).
This is a port-fidelity correction, separate from inherited original-C238.

Runtime before proof: verified port118b3a27e59c2356864906eb4f086b69f69a21c5,
published Core/SDK/content1.23.0-beta.3. The fixture constructs disposable actual
registered Human Warrior/Necromancer games at depth1, seed441. It creates the
real stock Wooden Torch or Phial of Galadriel, learns runes and obtains a
same-loadout player/equipment pair from the declared Core simulateLoadout →
knownLoadoutSimulation → production API2 simulationView path. The equipment
is not paired with a synthetic PlayerView or a forced light trait. The real
engine's describeObject callback supplies the public description/fuel contract.
This is a legal constructed loadout proxy, not autonomous gameplay, a live UI
installation, measured occurrence rate or survival benefit.

Core calcLight starts curLight atzero and sums equipped flags/modifiers, fuel
and UNLIGHT. The live session exposes that already-derived value as player.light;
a shadow loadout supplies its matching derived.curLight. The API2 adapter passes
that player field unchanged. The port then initializes BI_LIGHT from player.light
and adds the equipment again. Both imported C4.2.6f308221 and current C e473720
instead clear the trait array before equipment and do not seed BI_LIGHT from the
player; current borg-trait.c2823–2825,2850,1513–1528,1761–1762.

## Frozen before result

Run `pnpm exec vitest run src/trait/light-base.test.ts` under the shared validation
lock. [before.log](before.log): **4 expected failures,4 controls pass**. The test
first asserts public player.light equals public derived stats.light; registered
Phial modifier4 and Torch fuel5000/flag LIGHT_2 are checked before the Borg result.

| Character/loadout | Public derived light | Original Borg | Faithful C expectation |
| --- | ---: | ---: | ---: |
| Warrior, none | 0 | 0 | 0 |
| Warrior, fueled Torch | 2 | 4 | 2 |
| Warrior, spent Torch | 0 | 0 | 0 |
| Warrior, Phial | 4 | 12 | 8 |
| Necromancer, none | 0 | 1 | 1 |
| Necromancer, fueled Torch | 2 | 4 | 2 |
| Necromancer, spent Torch | 0 | 1 | 1 |
| Necromancer, Phial | 3 | 10 | 7 |

The Phial's faithful-C8/7 still includes C238's duplicate modifier. That is
intentional: this port must preserve original-C behavior. Mandos separately
tracks/translates C238 under consumer186, after adopting this base correction.
Torch and empty/fuel/UNLIGHT controls keep the scopes distinct.

## Preserved fixture setup attempts

[initial-before.log](initial-before.log) had2 Phial failures/6 passes because the
simulator's description dependency was omitted; KnownItem fuel is parsed from the
actual public name, so Torch timeout silently became0. Adding registry alone did
not provide the describe callback: [registry-only-setup.log](registry-only-setup.log)
shows the explicit fuel5000 assertions fail. These are not accepted Torch proof.
The final fixture supplies stock describeObject, preserves those fuel assertions,
and gives the4 real trait failures above. No literal fuel, modifier, player light
or BI_LIGHT override was substituted. An initial TypeScript-only adapter issue
was corrected by asserting unresolved is empty before narrowing that empty
array and copying readonly public item arrays; no gameplay data was changed.

Stored log text drops trailing blank lines only; raw attempts remain in the task
artifacts. No failure text or assertions were altered.

## Scope

No engine/package/SDK change, no C238 repair, no other derived-stat correction,
no strategy change, owner save/profile/data, lab deployment or Rust polling.
Final focused/default and exact-source verification are recorded after repair.

## Correction and focused qualification

The port now retains the freshly cleared BI_LIGHT zero base before its existing
equipment scan. Only the extra PlayerView.light assignment is removed; the
original-C double modifier, fuel and Necromancer ordering are unchanged. The
incorrect fidelity prose is corrected. [Focused results](focused.log):120 tests
across7 files pass, including all8 registered public-frame cases. Types, session,
grants, own rebuild and [plugin currency](currency.log) pass (669.2KiB/API2).

The first broader focus gave112pass/8fail; its [output is preserved](focused-initial-failure.log).
Eight existing beam/recovery policy cases supplied only synthetic player.light,
with no corresponding equipment. They had depended on the incorrect assignment
for their chosen model radius. Their fixture now names that input lightRadius
and applies it explicitly to the model after Notice/before perception. This is
a model-level policy-test boundary, not legal gameplay/engine-light proof. Every
beam/recovery/threshold assertion remains unchanged; there is no seed, timeout or
policy waiver, default-radius override or production trait injection. The new
registered light-base tests never force BI_LIGHT and exercise real calculation.

Exact-head hosted ordinary and exact-source full verification remain required
before a ready-for-merge claim. No duplicate local full is run. Source41 remains
open pending actual official upstream acceptance/import; own-fork delivery is not
that acceptance. Parent owns merge, actual-master verification and consumer196.
