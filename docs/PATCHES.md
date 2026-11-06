# Port source reconciliation and patch ledger — 2026-11-06

Snapshot date: 2026-11-06. Linked canonical issues and PRs are authoritative
for live bug/PR status. This ledger records disposition and patch provenance
at this reconciliation.

Source state is separate from Mandos adoption. These records do not authorize
changing a consumer patch, rebuild, lab, save or profile.

| Source scope | Actual correction/proposal | Fork disposition at this reconciliation | Adoption owner |
| --- | --- | --- | --- |
| Backup swaps, source #2 | Existing weapon/armour backup and store-swap valuation scope; no upstream backup report yet. Ring [Neo462/PR62](https://github.com/neostryder/neo-angband-mod-borg/pull/62) is resolved history | OPEN for backups only; never claimed fixed by ring62 | [Mandos #125](https://github.com/diegoami/mandos/issues/125) |
| Escape stairs, source #23 | [Neo PR #63](https://github.com/neostryder/neo-angband-mod-borg/pull/63), `7c4992164b1c9c5c48d10b97a01f2d760a3c6372` | Open proposal; absent from `74a017d` | [Mandos #148](https://github.com/diegoami/mandos/issues/148) |
| Store knowledge/unit values, source #22 | [Neo PR #64](https://github.com/neostryder/neo-angband-mod-borg/pull/64), `329459c0b35e5370363340b3df07694a52ee8a2a` | Open proposal; absent | [Mandos #146](https://github.com/diegoami/mandos/issues/146) |
| Home random powers, source #32 | [Neo PR #65](https://github.com/neostryder/neo-angband-mod-borg/pull/65), `5416c6118bd016030cdbf00ee6644b2c13337267` | Open independent proposal; absent | Mandos #146 (existing aggregate consumer) |
| Spell content coverage, source #24 | [Neo PR #66](https://github.com/neostryder/neo-angband-mod-borg/pull/66), `e71bd21df75010486c10a8e1c6748c4b546d1f10` | Upstream66 open; owned loader adopted and normal full gate verified | [Mandos #149](https://github.com/diegoami/mandos/issues/149) |
| Stall affliction visibility, source #15 | `1909262` plus accepted `6c7bc298278ba66d67eb71029c20ee0ac2b75c6e` ([Neo PR #51](https://github.com/neostryder/neo-angband-mod-borg/pull/51)) | Incorporated and verified; source15 CLOSED. Bounded current-runtime follow-up establishes no new failure | [Mandos #140](https://github.com/diegoami/mandos/issues/140), independently owned |
| Play/rest content, source #25 | [Neo issue #468](https://github.com/neostryder/neo-angband/issues/468), [draft port PR #67](https://github.com/neostryder/neo-angband-mod-borg/pull/67), `1d1793258b887efae5c862a15a92683b8258c33c` | Upstream draft/unmerged; owned loaders incorporated and normal beta.1 + explicit noteSpot carry verified | [Mandos #150](https://github.com/diegoami/mandos/issues/150) |
| Play/rest engine boundary, source #25 links to engine #4 | Engine `noteSpot`: [engine source #4](https://github.com/diegoami/neo-angband-tracker/issues/4), [Neo PR #429](https://github.com/neostryder/neo-angband/pull/429), `2553cb496da46692fd64eade5f089acecdc5088e` | Upstream429 open; engine fork19ff25ea merged and owned port declares the explicit beta.1 noteSpot dependency carry | [Mandos #126](https://github.com/diegoami/mandos/issues/126) |

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
separate. Current normal/source full gates execute all 866 cases without skips.
Upstream63–67 remain open; our own28/30 merges are not upstream acceptance.

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

The next owned integration applies the existing clean63/64/65 proposals as
separate attributed imports, while their linked source issues23/22/32 remain
open for actual upstream resolution. [Immutable before/after integration
receipts](runs/2026-11-06-owned-port-carries/README.md) record original/new
commits and the complete896-case suite (866 baseline +16/9/5 unchanged new
proposal cases). The beta.1 core/SDK/content selection and explicit noteSpot
patch stay unchanged; source19ff compatibility exercises the same896 cases.
This is an owned carry, not upstream acceptance or Mandos adoption. Backup
source2 is an assigned bounded follow-up and is not claimed implemented here.
