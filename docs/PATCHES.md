# Port source reconciliation and patch ledger — 2026-11-06

Snapshot date: 2026-11-06. Linked canonical issues and PRs are authoritative
for live bug/PR status. This ledger records disposition and patch provenance
at this reconciliation. The resumed targeted update below covers sources2/23/22/24/25/32
and validation35; untouched rows retain their earlier snapshot, not a fresh
broad upstream audit.

Source state is separate from Mandos adoption. These records do not authorize
changing a consumer patch, rebuild, lab, save or profile.

| Source scope | Actual correction/proposal | Fork disposition at this reconciliation | Adoption owner |
| --- | --- | --- | --- |
| Backup swaps, source #2 | [Neo469](https://github.com/neostryder/neo-angband/issues/469): weapon-backup value/HOME acquisition; armour/tactical work remains separate. Ring [Neo462/PR62](https://github.com/neostryder/neo-angband-mod-borg/pull/62) is resolved history | OPEN for backups only; never claimed fixed by ring62 | [Mandos #125](https://github.com/diegoami/mandos/issues/125) |
| Escape stairs, source #23 | [Neo PR #63](https://github.com/neostryder/neo-angband-mod-borg/pull/63), `7c4992164b1c9c5c48d10b97a01f2d760a3c6372` | Accepted via upstream69 at `b8de975`; incorporated by owned34/`223f6d4`, normal full checks passed; source23 CLOSED | [Mandos #148](https://github.com/diegoami/mandos/issues/148) |
| Store knowledge/unit values, source #22 | [Neo PR #64](https://github.com/neostryder/neo-angband-mod-borg/pull/64), `329459c0b35e5370363340b3df07694a52ee8a2a` | Accepted via upstream69 at `5915f9b`; incorporated by owned34/`223f6d4`, normal full checks passed; source22 CLOSED | [Mandos #146](https://github.com/diegoami/mandos/issues/146) |
| Home random powers, source #32 | [Neo PR #65](https://github.com/neostryder/neo-angband-mod-borg/pull/65), `5416c6118bd016030cdbf00ee6644b2c13337267` | Accepted via upstream69 at `2a7bf7a`; incorporated by owned34/`223f6d4`, normal full checks passed; source32 CLOSED | Mandos #146 (existing aggregate consumer) |
| Spell content coverage, source #24 | [Neo PR #66](https://github.com/neostryder/neo-angband-mod-borg/pull/66), `e71bd21df75010486c10a8e1c6748c4b546d1f10` | Accepted via upstream69 at `f7699de`; exact owned loader incorporated/normal checks passed; source24 CLOSED | [Mandos #149](https://github.com/diegoami/mandos/issues/149) |
| Stall affliction visibility, source #15 | `1909262` plus accepted `6c7bc298278ba66d67eb71029c20ee0ac2b75c6e` ([Neo PR #51](https://github.com/neostryder/neo-angband-mod-borg/pull/51)) | Incorporated and verified; source15 CLOSED. Bounded current-runtime follow-up establishes no new failure | [Mandos #140](https://github.com/diegoami/mandos/issues/140), independently owned |
| Play/rest content, source #25 | [Neo issue #468](https://github.com/neostryder/neo-angband/issues/468), [port PR #67](https://github.com/neostryder/neo-angband-mod-borg/pull/67), `1d1793258b887efae5c862a15a92683b8258c33c` | Accepted via upstream70 at `440d8d9`; exact owned loaders incorporated and normal beta.1 + explicit noteSpot verified; source25 CLOSED | [Mandos #150](https://github.com/diegoami/mandos/issues/150) |
| Play/rest engine boundary, source #25 links to engine #4 | Engine `noteSpot`: [engine source #4](https://github.com/diegoami/neo-angband-tracker/issues/4), [Neo PR #429](https://github.com/neostryder/neo-angband/pull/429), `2553cb496da46692fd64eade5f089acecdc5088e` | Upstream429 accepted (maintainer cites non-public `394825525`); accessible `0e24e79c47adb9fd14eacdf87ba1f9be269759fa` matches owned hook; engine source4 CLOSED; owned beta.1 noteSpot declaration unchanged | [Mandos #126](https://github.com/diegoami/mandos/issues/126) |

The 2026-11-05 reconciliation and exact verification receipts are in
[the run record](runs/2026-11-05-port-reconciliation/README.md). Earlier scenario
receipts on the canonical source issues remain authoritative for their named
versions; this table does not re-certify every historical correction.

[Historical hosted-check reconciliation](runs/2026-11-05-hosted-reconciliation/README.md)
retains its recorded heads and completed checks: default CI passes
830 tests but skips36; draft67 CI runs the ten play/rest cases and reproduces
the four baseline failures (836 passed / 4 failed / 26 spell cases skipped).
This historical coverage does not override the current source state below.

## Current incorporation and source lifecycle

Engine [PR200](https://github.com/diegoami/neo-angband-tracker/pull/200) is merged
and post-merge verified at `19ff25eac8997e8feb6b5e62eefa7ffe4d134631`.
Owned port [PR28](https://github.com/diegoami/neo-angband-borg-mod-tracker/pull/28)
merged at `8a1a54c25727034bf668ad18c010dd331738b47a`: both content-loader
proposals are incorporated and the normal declared dependency is **published
beta.1 + explicit carried noteSpot**. [Named dependency/provenance](../patches/engine-notespot/README.md)
and [full ordinary before/after receipts](runs/2026-11-06-beta1-notespot-carry/README.md).
The unpatched published beta.1 negative control remains a real four-failure
baseline; it is not the current declared fork profile. Independent
[exact-source compatibility](runs/2026-11-05-supported-engine/README.md) stays
separate. At that earlier stage, normal/source full gates executed866 cases without skips.
The resumed carry verification below supersedes that count and the earlier
open63–65 status. Accepted66/67 loader corrections are reconciled below; canonical
issues remain authoritative. Our own28/30 merges alone were not upstream acceptance.

The owner-approved [source lifecycle audit](https://github.com/diegoami/angband-workspace/issues/11)
keeps real scopes separate: source2 now names only never-delivered backup
swaps; source22 owns Neo464/mod64 store knowledge/unit-value wiring; new
[source32](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/32)
owns the independent Neo465/mod65 home random-power predicates. Imported
helper/ring work is resolved history, not a permanent partial bucket.
Existing Mandos146 remains the aggregate consumer link for22/32; its owner
decides consumer adoption/state independently.

Accept an upstream-defined report's fixed/merged resolution, incorporate it
and run normal checks, then close the original source issue. `merged-upstream`
is temporary only while an accepted correction awaits our import/verification;
remove it after incorporation/closure. Never use it for an own-fork merge or
just any linked partial PR. `triage:needed` is only unassessed incoming work.
A concrete post-adoption failure gets a new linked bug; an unproved API or
within-grade limitation does not keep an old fixed issue open.

Source15's accepted51 correction is incorporated/verified and the original is
closed. [One bounded current-runtime follow-up](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/15#issuecomment-6673764088)
found **no new bug**: shipped plugin/real engine/public bridge, confusion 50→0,
47 decisions, raw and public turn 0→500, no release; real zero-energy control
releases on entry 41 as designed. The old within-grade-open note is superseded.
This does not alter Mandos140 or establish any new source failure. Historical
run records remain unchanged; no gameplay fix or new upstream report follows.

## Owned proposal carry batch — 2026-11-06

Owned [PR34](https://github.com/diegoami/neo-angband-borg-mod-tracker/pull/34)
merged at `223f6d4c0734429e5334f6a046c39a469dae0afa`, incorporating existing
63/64/65 as separate attributed imports. The original carry preceded upstream
acceptance; the resumed targeted reconciliation below closes23/22/32. [Immutable before/after integration
receipts](runs/2026-11-06-owned-port-carries/README.md) record original/new
commits and the complete896-case suite (866 baseline +16/9/5 unchanged new
proposal cases). The beta.1 core/SDK/content selection and explicit noteSpot
patch stay unchanged; source19ff compatibility exercises the same896 cases.
The carry alone was not upstream acceptance or Mandos adoption. Backup
source2 is an assigned bounded follow-up and is not claimed implemented here.


## Resumed targeted reconciliation — 2026-11-06

Upstream maintainer explicitly confirms63/64/65 landed through merged
[upstream69](https://github.com/neostryder/neo-angband-mod-borg/pull/69), merge
`7ed986b1b09970d8dbcc593b9c2a5198b2747788`, with authorship retained.
Accepted corrections `b8de9750b5970cb73d141fbf088f78cc0d601ad6`,
`5915f9bdd68982b9b28201d1d5dda99011ab75b4` and
`2a7bf7a878995a6db59cccc8907fee2800975b4c` match the respective imported
runtime paths. Upstream63–65 are CLOSED without individual merge records;
69 is the actual delivery. Engine-board463–465 still OPEN does not override
the maintainer's explicit accepted/landed statements.

Already completed required hosted42147590447 passed896/896 with zero skips
in ordinary beta.1+noteSpot and exact-source19ff profiles; actual post-merge
42149096196 passed. Sources23/22/32 therefore CLOSED under RULES9. No new
full suite is required for this unchanged-code bookkeeping. Mandos148/146
adoption is independently owned and notified through the parent.

Backup source2 now links [Neo469](https://github.com/neostryder/neo-angband/issues/469)
and [public before-case](https://github.com/diegoami/neo-angband-borg-mod-tracker/tree/b769bc955060bbca81fce54c97d64b91934375f5/evidence/backup-weapon):
2 expected parity failures/2 controls. Targeted current upstreama443788
backup paths still match owned223f6d4. Weapon-backup value/selected handle,
power contribution and HOME strict-improvement/retrieval are the proposed
first faithful slice; no implementation, armour/tactical work, native-C
execution or survival claim is included.

[Validation35](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/35)
separately tracks the preserved local seed42 timeouts, UNCLASSIFIED despite
hosted green. Its bounded unchanged-base comparison and durable evidence
are on that issue. Unfixed deadbfce also timed out (137.93s,exit1) under
the same Node24/install/flags, so the failure is not introduced solely by
63–65. [Exact baseline logs/exit/hashes](https://github.com/diegoami/neo-angband-borg-mod-tracker/tree/6748f5f/evidence/validation-seed42)
are preserved; exact cause remains unclassified. No test cap/seed/assertion/timeout is weakened.


The same targeted pass reconciles [maintainer acceptance66](https://github.com/neostryder/neo-angband-mod-borg/pull/66#issuecomment-6675552256)
at `f7699dec10b9c3b1f0e5c3dfdb89f9054b62f265` through69 and
[acceptance67](https://github.com/neostryder/neo-angband-mod-borg/pull/67#issuecomment-6676556092)
at `440d8d98917b434a4441547c18e4e73915f239fb` through70. The spell/play/rest
loader files exactly match owned223f6d4, whose normal896-case gates execute
them without skips; sources24/25 CLOSED. Vendor reports915 tests/Borgbeta.3
with enginebeta.3; that does not silently upgrade this fork's beta.1+explicit
carry profile. Parent owns engine source4 resolution and Mandos owns149/150.
Engine429's original acceptance initially left428 open; live428 is now
CLOSED/completed, and its closure evidence belongs to the engine parent pass.

Parent engine reconciliation closes source4 after upstream428 completed and 429
accepted. The maintainer-cited394825525 is not publicly resolvable; accessible
`0e24e79c47adb9fd14eacdf87ba1f9be269759fa` supplies source equivalence against
owned19ff25ea/5928146b (hook differs only in comment). This does not remove
the owned beta.1 carry or claim an owned dependency upgrade.


## Weapon-backup/HOME local proposal — 2026-11-06

Source2/Neo469: clean source commit `a2d73659140be6913c4abed6aaa80ae48b96da10`
restores selected carried weapon-backup handle/value, power contribution
and HOME strict-improvement evaluation/retrieval. The owned attributable
import keeps core/SDK/contentbeta.1 plus explicit noteSpot, with no dependency
upgrade. [Bounded scope and verification](runs/2026-11-06-weapon-backup/README.md).
Armour/tactical swaps remain open; named-curse power is not publicly produced
and is conservatively excluded by default. HOME retrieval requires a real
free slot, including when replacing an existing backup; that host-capacity
limit is not evidence of a native C defect.

## Beta.3 package replacement — task39

The new declared profile selects matching published Core/SDK/content
1.23.0-beta.3 from release 97ceec2925e6715ba725624a61866ab93a196a12.
The sole beta.1 noteSpot patchedDependency is removed from the candidate
workspace/lock only after its four unchanged installed-package controls and
all 42 focused play/rest/spell cases pass against unpatched beta.3. Historical
patch bytes and every earlier receipt remain unchanged. No source2 gameplay
change or independent C correction is imported.

[Task39 receipts](runs/2026-11-06-beta3-consumer/README.md) distinguish the focused
replacement proof from the required ordinary and exact-source full gates.
Source25/engine4 remain closed for their accepted/imported original scopes;
upstream72/source2 and timing35 remain open. A beta.3 version does not close
input-flush432 or seed433, and this port did not carry those package units.
Mandos owns those independently. No consumer or lab update is implied.
