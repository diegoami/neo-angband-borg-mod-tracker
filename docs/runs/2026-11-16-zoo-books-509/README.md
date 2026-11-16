# Zoo book-fix repeat: version, evaluation and death triage

Analysed 2026-11-16. The latest Neo cohort is [workflow43759670685](https://github.com/diegoami/borg-zoo/actions/runs/43759670685), completed successfully at04:43UTC. All1800 assignments are present. [Immutable run records](https://github.com/diegoami/borg-zoo/tree/results/results/neo-books-509-seeded-v2-1800/43759670685-1), [catalogue proposal121](https://github.com/diegoami/borg-zoo/pull/121).

## What actually ran

| Component | Recorded identity |
|---|---|
| Borg | Fork experimental source `d6215a8e63d101e0c6d392120fb8eacef9544480`; manifest1.4.0-beta.5 |
| Change from previous measurement | Previous `967b28f` plus carried-book value/count correction `c46849a`, rebuilt plugin and regressions |
| Engine | `b4af703493d314aa35cb719604f06103aa4918f4`; core/content/SDK package strings1.23.0-beta.3 |
| Host toolkit | `967b28f5fe12c4974a6a793040f73246eb7d1200` |
| Catalogue | `2bb49d75d9d74e2abd08b7a06a797adf0b0dc9fc` |
| Bundle SHA256 | `631118074039a04fbe2f1406b1438b86f43ae66eb606e579ada51cb49fd4985c` |
| Runtime | Node26.13.1 |

This evaluates that explicit fork candidate, not whatever official master now contains. The unchanged toolkit includes message delivery and durable perceived-monster truth consent. Every one of1800 raw journals contains the truth-use receipt. All cells name the same Borg/engine/toolkit/bundle tuple.

Profile:200 starts per class; C-seeded recommended point buy; no-selling; native-menu startup/Borg seed and GCC coordinate-order adapters; exact100000-tick cap;600-second watchdog;36 shards, two processes/job, four concurrent jobs. Effective flags agree across1798 completed summaries: selfScum=true; munchkinStart, playsRisky and all worship flags=false. The two timeouts have raw streams but no final summary.

The engine manifest records dirty=true. The pinned builder rejects tracked content changes, allows only the two SDK executable-bit changes, and includes untracked files in that flag. The build receipt does not enumerate the working-tree status, so it should not be described as a completely clean engine checkout. The two declared runtime startup adapters are explicit in the manifest. [Clock640](https://github.com/diegoami/neo-angband-tracker/issues/640) remains unresolved; no native-C trajectory equivalence follows.

## Outcomes and evaluation

| Outcome | Previous43702732056 | Latest43759670685 |
|---|---:|---:|
| Death |989|860|
| Alive at cap |732|843|
| Controller stall |75|95|
| Wall timeout |4|2|
| Total |1800|1800|

Deaths are47.78% of all assigned starts, down descriptively from54.94% (129 fewer;7.17 percentage points). Alive-at-cap starts rise from40.67% to46.83%. Stalls increase20 and remain counted. Among death/cap endpoints only, mortality is50.50% (860/1703); this conditional denominator omits97 abnormal endpoints and is not the assigned-start rate.

This is a historical repeat on the same development assignments in a different workflow run, not a prespecified fresh-seed confirmation. Node versions match, but runner/date differ. The source change and strong negative control support investigating the descriptive gain; they do not establish a confirmed population survival improvement.

| Class | Previous deaths | Latest deaths | Caps | Stalls | Timeouts | Lives issuing cast attempts |
|---|---:|---:|---:|---:|---:|---:|
| Blackguard |69|72|98|30|0|198|
| Druid |155|152|40|8|0|200|
| Mage |182|149|51|0|0|200|
| Necromancer |155|123|39|38|0|200|
| Paladin |90|56|142|2|0|191|
| Priest |96|71|126|3|0|196|
| Ranger |124|116|80|4|0|102|
| Rogue |78|81|115|4|0|25|
| Warrior |40|40|152|6|2|0|

All200 Warrior command hashes exactly match the previous run. Books do not affect this class, so that is a useful negative control. The largest descriptive death reductions are Paladin34, Mage33, Necromancer32 and Priest25. Rogue and Blackguard do not improve.

The defined book correction is exercised:1594/1600 casters retain a starting-book kind at the endpoint; the six exceptions all have explicit book-theft messages. All200 Mages issue cast attempts, versus93 in the prior verified investigation. Counts describe accepted cast intents, which can still fail concentration or be rejected by game rules. They are not successful spell counts. Foreign/surplus books can still be dropped legitimately; this analysis does not equate every book-drop message with loss of the sole useful book.

Progress remains shallow:1460/1800 never exceed dungeon level2. Of843 caps,628 never exceed level2. Reaching the cap therefore does not imply substantial dungeon progress.

## Death diagnosis: observed sequences versus source attribution

All860 deaths are indexed in [deaths.csv](deaths.csv). Machine-readable counts, archive receipts and selected command/message/state/inventory evidence are in [analysis.json](analysis.json). Every death is retained; the selected mechanisms below are not a claim that every death has an established source-level root cause.

625/860 deaths occur at character levels1–2;709 occur on dungeon level1. Leading recorded killers: Grip99, Fang82, wild cat82, grey mold56, crow46, small kobold46, grey mushroom43 and poison41. Grip/Fang together account for181 deaths (21.0%); eye/mold/mushroom together111 (12.9%).

1. **Fast early attackers overwhelm attempted movement/escape.** High-Elf Druid1977286422 reads Word of Recall at170, then walks while Grip bites every five ticks; death209 precedes recall activation. Human Ranger2096475642 repeatedly walks west and dies to a wild cat at446, carrying no Phase Door or healing. These support immediate escape/provisioning and retreat-route investigation. They do not prove incorrect speed arithmetic or a new port omission. Existing leads: [port89](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/89).

2. **Stationary-monster contact remains lethal after truth delivery is repaired.** Half-Troll Priest490275608 alternates south/north between paralysis episodes and dies to a floating eye at6434, still carrying a Phase Door scroll. Its final perceived eye record includes PARALYZE and NEVER_MOVE; this is not the old blanket missing-truth receipt. Human Priest1926850603 repeatedly tries walking into walls while confused, briefly clears confusion, becomes confused again and dies to grey mushroom spores at1470; four Cure Light Wounds and a Phase Door remain. Confusion and paralysis constrain what can actually be used, so retained resources are not a proof of preventability. Half-Troll Priest557466218 uses its last Phase Door at1300, then alternates directions, fails a cast, drinks Neutralize Poison while taking mold damage, and dies at1479 with three Cure Light Wounds remaining. The source branch selecting each move still needs a bounded probe. Existing lead: [port88](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/88).

3. **Recovery selection deserves priority over assuming missing supplies.**671/860 deaths end with a healing potion kind carried;239 retain Phase Door. Of41 poison deaths,37 retain a healing potion and seven retain Neutralize Poison. These are inventory observations, not671 preventable deaths. Blackguard716899722 walks through poison warnings and dies at2090 with Cure Light Wounds still carried. The clearest diagnostic case is Half-Orc Mage956898190: it successfully neutralizes poison at36101; later destroys a worm at36171, drinks Poison at36181 and Slime Mold Juice at36191, walks, and dies of poison at36230. Two Neutralize Poison and five Cure Light Wounds remain. Unknown-item fallback, healing eligibility and fleeing-state ordering need examination; do not assume an item-handle mismatch merely from these messages.

   Pinned source already has healing/cure logic (`src/fight/caution.ts`). The main heal/defend call is skipped while goal.fleeing is set; ordinary healing has danger gates; poison/cut cures return early above20% of avoidance. These existing predicates make unused healing possible without proving a missing-heal implementation. Compare the exact failing decision against pinned C before attributing a new port defect. The saved streams do not include internal rung/danger values at every callback.

4. **A high-level outlier has a mundane recorded explanation.** Blackguard1006979927 reaches character level30 at65399 by drinking an Experience potion, then dies to a crow at65407 while carrying five Cure Light Wounds. Its level is not evidence of deep progress or a spurious level counter: maximum dungeon depth is3. The experience gain raised maxHP without rescuing the low currentHP trajectory.

## Abnormal endpoints, kept separate

The95 controller stops break down as tunnel26, read20, shop-sell16, cast16, hold8, study3, walk3, rest2, drop1. These are scene-watchdog classifications; a stop alone does not establish an engine hang.

- Blackguard506150403 repeatedly chips quartz futilely; the game clock advances until the controller releases at80594.
- Necromancer58289369 repeatedly issues the same HOME/shop-sell at tick4241 with repeated cloak messages.
- Necromancer253804935 repeats cast at89560 while the engine says it cannot see; Necromancer1210427833 repeats study under the same visibility refusal at67000. Accepted intents do not imply successful game actions.
- Necromancer2119408317 repeatedly reads Remove Curse; the host cancels the item-selection prompt. This is an explicit headless interaction limitation requiring target/prompt investigation.
- Both wall timeouts are live repeated tunnel intents against empty squares. Warrior569362773 alternates directions at tick32588; Warrior285367097 repeats directions at17747. The clock does not advance and the engine repeatedly reports nothing to tunnel. Their preceding-run Warrior command hashes match. These are persistent loops, rather than simply600 seconds of slow advancing gameplay.

## Evidence and next exact work

Downloaded all36 cell artifacts,36 raw archives and the build archive. Verified all36 raw tarball SHA256 receipts; all10798 inventoried files exist and match their byte counts/SHA256. The retained bundle matches the manifest and every cell. All1800 journals have a truth-use entry. Both timeout streams are retained. No new games, local replay, soak, broad test suite or runtime deployment was run for this assessment.

Local raw evidence and the audit script: `/tmp/neo-zoo-review-43759670685/`. Durable originals remain in the workflow artifacts and append-only Zoo results. Raw artifacts expire in February2027; cell artifacts in December2026. This report and its compact evidence are new repository documentation; no historical result was edited.

The owner's follow-up broadened the work to an explicit search for porting errors. The [source audit](../../audits/2026-11-16-port-fidelity/README.md) now demonstrates six error groups against current official master, including missing late cures/flee triggers, eager side effects and omitted curse-item selection. It also identifies the measured build's premature unknown-item branch as known upstream502, corrected in current master but absent from this run. These helper/source findings do not prove that correcting them would prevent all related deaths. No gameplay fix or new replay was performed.

Next exact death investigation: instrument the frozen Mage956898190 trajectory with an unchanged-command-prefix control to identify the selected emergency branch, then isolate Priest490275608's oscillation and the zero-tick tunnel loop. The source audit records the separate correction priorities.
