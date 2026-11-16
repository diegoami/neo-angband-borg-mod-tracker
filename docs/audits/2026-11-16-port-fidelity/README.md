# Porting-error audit, 2026-11-16

Owner request: search for porting errors generally, beyond attributing the latest zoo deaths. This is a bounded source-and-helper audit, not a claim to have exhausted the port or proved a mortality effect for every finding.

## Pins and method

- Current official mod master: `622b2ba82ee48b26c1be0517181eb29b8a8239e1`, release1.4.0-beta.6, read live and fetched on2026-11-16.
- Zoo candidate: `d6215a8e63d101e0c6d392120fb8eacef9544480`, manifest1.4.0-beta.5. [Run evaluation](../../runs/2026-11-16-zoo-books-509/README.md).
- Original C4.2.6: `f3082213b73f3e463e3d0d60bff4b00462beae6e`.
- Pinned current C: `e473720ed88a0f0c7ca66815cef3000eb4a38bc3`.

Inspected caution/healing, escape, item use, curse removal, enchanting/branding, status-spell scoring, API2 monster adaptation, and configuration/trait wiring. Compared source before calling an apparent oddity a porting error. Targeted searches of the source board checked known emergency-item, curse, branding, config and cure reports. No broad watcher or external Rust polling ran.

An isolated detached worktree at `/tmp/neo-port-audit-20261116` holds diagnostic tests only. Product code is unchanged. Two focused files run27 tests: **24 expected C-parity assertion failures, three passing controls**, no skips, about0.9seconds after transform cache. Node26.13.0 / installed Vitest4.1.11; dependencies are shared read-only from the existing workspace rather than freshly installed to the current upstream manifest. This is a helper-level diagnostic result, not full-release CI qualification.

## Confirmed porting-error groups

### 1. C's second confusion/fear cure pass is missing

**Origin: inherited Neo port omission; not a C policy change.**

C executes a second confusion cure after back-away, followed by fear cures. Those are outside the earlier `!goal.fleeing` heal/defend block. Current TypeScript returns after its recall/unknown-item tail and has neither pass. Its comment says remaining work belongs to later subsystems, but later general item use does not reproduce these predicates, actions or ordering.

Evidence: a fleeing character carrying Cure Serious Wounds yields no action instead of quaffing it; a fleeing frightened character with Boldness also yields. Both assertions fail independently for each of the nine classes:18 failures. A nonfleeing ordinary confusion-heal control passes.

Native controls extract the unchanged C cure/flee block and supply fixed traits, deterministic RNG and stub item/engine functions. Both C pins return a cure for both scenarios. This is a direct branch oracle, not a full native gameplay replay.

[C4.2.6 caution tail](https://github.com/angband/angband/blob/f3082213b73f3e463e3d0d60bff4b00462beae6e/src/borg/borg-caution.c#L1850), [current TS tail](https://github.com/neostryder/neo-angband-mod-borg/blob/622b2ba82ee48b26c1be0517181eb29b8a8239e1/src/fight/caution.ts#L652).

Practical effect: C can still cure a disabling condition after early healing was bypassed while fleeing. The port can continue to movement instead. This is relevant to the confused trajectories, but no specific zoo death has been replayed under this correction.

### 2. C's late low-HP and bleeding/poison flee triggers are absent

**Origin: inherited Neo port omission.**

Between late cures and reserve healing, C probabilistically sets leaving/fleeing when HP is low and reserves are lacking, and separately below half HP while cut/poisoned. TypeScript omits both blocks.

With the draw pinned to0, HP30/100, no CCW/healing reserves and dungeon depth1, C sets both flags; TypeScript leaves both false. At HP45/100 with bleeding, the separate status trigger also fails. Two regression failures; both native C pins produce the expected flags. These fixtures intentionally suppress unrelated escape/retreat availability to reach the tail.

[Pinned C low-HP/status triggers](https://github.com/angband/angband/blob/e473720ed88a0f0c7ca66815cef3000eb4a38bc3/src/borg/borg-caution.c#L1900). This does not mean the port never flees: other flee triggers already exist.

### 3. Eager command selection mutates state for actions never selected

**Origin: Neo translation error in replacing short-circuit C `||` with `firstCmd(a(), b(), ...)`.**

`firstCmd` picks the first nonnull result only after JavaScript has evaluated every argument. Several helpers have state/RNG side effects. C stops evaluating as soon as an earlier command succeeds.

Demonstrated with the real item helpers: confused character carries a Clear Mind mushroom and three CCW potions. `borgHeal` returns eating the mushroom, but it also evaluates the later `borgQuaffCrit(false)` and updates the last-quaff timestamp. On the next tick, a normal CCW attempt is suppressed as though a potion had already been consumed. The same direct CCW call without that earlier selection passes. One regression failure and one passing control.

[TS eager selection](https://github.com/neostryder/neo-angband-mod-borg/blob/622b2ba82ee48b26c1be0517181eb29b8a8239e1/src/fight/caution.ts#L140), [timestamp mutation](https://github.com/neostryder/neo-angband-mod-borg/blob/622b2ba82ee48b26c1be0517181eb29b8a8239e1/src/item/item-use.ts#L72), [C short-circuit equivalent](https://github.com/angband/angband/blob/f3082213b73f3e463e3d0d60bff4b00462beae6e/src/borg/borg-caution.c#L150).

The pattern also occurs widely in escape and other caution branches. The proved scope is the false CCW timestamp; other RNG, shopping-goal and targeting consequences need separate controls. Pinned current C has a later timer representation; that does not change the short-circuit property, and is not silently reinterpreted as the 4.2.6 cooldown predicate.

### 4. Remove Curse omits C's chosen-item step

**Origin: inherited Neo port omission, exposed by command/prompt interaction.**

C chooses the first cursed pack/equipment/quiver item after invoking removal and then chooses a curse. TypeScript returns the bare read/use/cast command and explicitly defers selection. It does not carry `tgtitem`, despite the existing `withItemTarget` mechanism used by recharge/enchant/identify. Its FIRST_CURSED bookkeeping also does not retain C's full location identity consistently.

Fixture: Remove Curse scroll plus a single known cursed armor item. Expected read targets armor handle10; returned read contains only the scroll handle3. One regression failure. The latest zoo has20 read stalls in total; the retained example Necromancer2119408317 repeatedly reads Remove Curse and receives cancelled `Uncurse which item?` prompts. The unit test plus raw prompt gives a concrete source-to-host chain for that example;20 is not claimed as the count of this one defect.

[C item/curse selection](https://github.com/angband/angband/blob/f3082213b73f3e463e3d0d60bff4b00462beae6e/src/borg/borg-item-decurse.c#L111), [TS decurse command](https://github.com/neostryder/neo-angband-mod-borg/blob/622b2ba82ee48b26c1be0517181eb29b8a8239e1/src/item/item-decurse.ts#L60).

Fix scope must include item location and curse choice, and verify actual engine prompt behavior; adding an arbitrary first inventory handle is not sufficient.

### 5. Ammo branding is an unconditional yielding stub

**Origin: inherited Neo port omission.**

C scans identified quiver stacks of at least20 matching ammo, excludes ego ammo, selects the most enchanted stack and uses firebrand activation or BRAND_AMMUNITION. The TS function checks NEED_BRAND_WEAPON and ABRAND and then always returns null. The API2 adapter now supplies a quiver view and item-target helpers exist, so the old missing-quiver comment does not by itself justify keeping it inert.

Fixture supplies20 known ordinary arrows, matching ammo type, need/availability traits and a firebrand activation handle. C's selection is eligible; the TS enchanting entry yields instead of returning activation with the ammo target. One regression failure. Activation readiness and legal real-engine branding still require integration qualification before a fix claim.

[C branding](https://github.com/angband/angband/blob/f3082213b73f3e463e3d0d60bff4b00462beae6e/src/borg/borg-item-enchant.c#L513), [TS stub](https://github.com/neostryder/neo-angband-mod-borg/blob/622b2ba82ee48b26c1be0517181eb29b8a8239e1/src/item/item-enchant.ts#L132).

### 6. Enchant selection hardcodes12 despite configurable enchantLimit

**Origin: inherited Neo port configuration mismatch.**

Trait notice reads configured enchantLimit when calculating need; C's item-selection routines read the same configuration. TS item-enchant instead has `const ENCHANT_LIMIT = 12` for armor and weapon selection.

Fixture: active enchantLimit20, +13 armor, available *Enchant Armour* scroll, enchant need/availability set. C permits improving it; TS rejects the target at its hardcoded12. Ordinary +7 armor with the same scroll passes. One regression failure and one passing control. This concerns the existing programmatic configuration seam; the stock limit12 and normal UI are not claimed to expose a changed numeric setting.

[C configured threshold](https://github.com/angband/angband/blob/e473720ed88a0f0c7ca66815cef3000eb4a38bc3/src/borg/borg-item-enchant.c#L143), [TS hardcoded threshold](https://github.com/neostryder/neo-angband-mod-borg/blob/622b2ba82ee48b26c1be0517181eb29b8a8239e1/src/item/item-enchant.ts#L25), [trait config consumer](https://github.com/neostryder/neo-angband-mod-borg/blob/622b2ba82ee48b26c1be0517181eb29b8a8239e1/src/trait/trait.ts#L703).

## Provenance and nonfindings

The relevant omission/translation forms are already visible in the official initial port commit `dce85c58cb77f4acbf6e2c63f45a32b2c58daa2b` (caution, enchanting and decurse histories), and survive current master. These are upstream-port behaviors inherited by the fork, not new Mandos strategies. The historical Mandos import marker70145c5 is not present in this repository's objects; no exact boundary claim is manufactured from it.

The [premature unknown-item emergency branch502](https://github.com/neostryder/neo-angband/issues/502) is a **known corrected source error**: current master contains `bde955e`'s correction. The measured Zoo source does not. Mage956898190's observed Poison/Juice quaffing therefore belongs in evaluation of the older branch, not evidence that the corrected master still has502. The exact internal branch selected at each death tick has not been instrumented.

Carried-book scoring is already reported as [509](https://github.com/neostryder/neo-angband/issues/509); the Zoo candidate includes its proposed fix. Do not open a duplicate.

An apparent missing Enlightenment quaff in `borgUseThings` was checked and rejected as a port error: C4.2.6's corresponding branch also does not quaff it. Faithful C behavior belongs in the C lane if pursued. Other declared gaps, including race-speed status-spell guards, branding integration, vault seams and rest/flow behavior, were not inflated into additional tested findings.

## Reproduction and retained evidence

Fixtures are stored as text so expected failures do not enter the normal suite:

- [caution.fixture.ts.txt](caution.fixture.ts.txt)
- [items.fixture.ts.txt](items.fixture.ts.txt)
- [expected-failures.log](expected-failures.log)
- [native-caution-oracle.py.txt](native-caution-oracle.py.txt), [4.2.6 extracted C](oracle-4.2.6.c.txt), [pinned-current extracted C](oracle-e473720e.c.txt)

Copy the first fixture to `src/fight/port-audit.test.ts` and the second to `src/item/port-audit.test.ts` in an isolated checkout at622b2ba. With dependencies and the normal test setup present:

```sh
node node_modules/vitest/vitest.mjs run src/item/port-audit.test.ts src/fight/port-audit.test.ts --maxWorkers 1 --no-file-parallelism
```

Exit1 is expected:24 C-parity failures, three controls pass. Mocked danger=0, disabled escape and walled-off surroundings isolate the missing caution tail; item helpers are real. These synthetic scenarios do not instantiate a game or claim a natural death replay.

The native script extracts unchanged C blocks from both pins and compiles tiny standalone oracles with `cc -std=c11`. Set its repository/root paths to local pinned references before using it outside this machine. Both pins print:

```text
0 command=1 fleeing=1 leaving=0
1 command=1 fleeing=1 leaving=0
2 command=0 fleeing=1 leaving=1
3 command=0 fleeing=1 leaving=1
```

No gameplay source was edited, no fixes merged, no new cohort dispatched, and no large local game or test run started. Reports, test text and logs are retained here; transient worktree and raw Zoo artifacts are under/tmp.

Next exact work: prioritize the omitted caution tail and eager evaluation, then curse selection because it has a natural repeated-prompt example. Each correction needs its own isolated source branch, relevant controls and actual engine interaction where required. File canonical reports only after the source-owner routing and final duplicate/provenance check; the current audit does not claim those reports or any fixes have been published.

## Upstream reports posted at owner request

- [Borg: late confusion and fear cures from borg_caution are missing](https://github.com/neostryder/neo-angband/issues/514)
- [Borg: late low-HP and bleeding/poison flee triggers are omitted](https://github.com/neostryder/neo-angband/issues/515)
- [Borg: eager firstCmd evaluation records a CCW quaff that was never selected](https://github.com/neostryder/neo-angband/issues/516)
- [Borg: Remove Curse omits the chosen item and repeatedly reaches an unanswered prompt](https://github.com/neostryder/neo-angband/issues/517)
- [Borg: ammo-branding action remains inert despite available quiver and activation seams](https://github.com/neostryder/neo-angband/issues/518)
- [Borg: enchanting ignores configured enchantLimit and hardcodes 12](https://github.com/neostryder/neo-angband/issues/519)

Evidence was published first at777bce131f7c6c3da0483e90f993dd744c16ad7b. These reports remain independent of adopting beta.6.
