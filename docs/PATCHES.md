# Port source proposals and verification

Source state is separate from Mandos adoption. These records do not authorize
changing a consumer patch, rebuild, lab, save or profile.

| Source scope | Actual correction/proposal | Default source at reconciliation | Adoption owner |
| --- | --- | --- | --- |
| Escape stairs, source #23 | [Neo PR #63](https://github.com/neostryder/neo-angband-mod-borg/pull/63), `7c4992164b1c9c5c48d10b97a01f2d760a3c6372` | Open proposal; absent from `74a017d` | [Mandos #148](https://github.com/diegoami/mandos/issues/148) |
| Store knowledge/unit values, source #22 | [Neo PR #64](https://github.com/neostryder/neo-angband-mod-borg/pull/64), `329459c0b35e5370363340b3df07694a52ee8a2a` | Open proposal; absent | [Mandos #146](https://github.com/diegoami/mandos/issues/146) |
| Home random powers, source #22 | [Neo PR #65](https://github.com/neostryder/neo-angband-mod-borg/pull/65), `5416c6118bd016030cdbf00ee6644b2c13337267` | Open proposal; absent | Mandos #146 |
| Spell content coverage, source #24 | [Neo PR #66](https://github.com/neostryder/neo-angband-mod-borg/pull/66), `e71bd21df75010486c10a8e1c6748c4b546d1f10` | Open proposal; absent | [Mandos #149](https://github.com/diegoami/mandos/issues/149) |
| Stall affliction visibility, source #15 | `1909262` adds status to the scene; `6c7bc298278ba66d67eb71029c20ee0ac2b75c6e` ([Neo PR #51](https://github.com/neostryder/neo-angband-mod-borg/pull/51)) tests the production bridge/grade floors | Present; within-grade countdown still invisible, source issue stays open | [Mandos #140](https://github.com/diegoami/mandos/issues/140) |
| Play/rest content, source #25 | [Neo issue #468](https://github.com/neostryder/neo-angband/issues/468), [draft port PR #67](https://github.com/neostryder/neo-angband-mod-borg/pull/67), `1d1793258b887efae5c862a15a92683b8258c33c` | Draft test-only proposal; absent. Published-engine runtime gate remains red | [Mandos #150](https://github.com/diegoami/mandos/issues/150) |
| Play/rest engine boundary, source #25 links to engine #4 | Engine `noteSpot`: [engine source #4](https://github.com/diegoami/neo-angband-tracker/issues/4), [Neo PR #429](https://github.com/neostryder/neo-angband/pull/429), `2553cb496da46692fd64eade5f089acecdc5088e` | Open engine proposal, used only in a private diagnostic core copy; not applied to port source | [Mandos #126](https://github.com/diegoami/mandos/issues/126) |

The 2026-11-05 reconciliation and exact verification receipts are in
[the run record](runs/2026-11-05-port-reconciliation/README.md). Earlier scenario
receipts on the canonical source issues remain authoritative for their named
versions; this table does not re-certify every historical correction.

[Hosted-check reconciliation](runs/2026-11-05-hosted-reconciliation/README.md)
confirms unchanged upstream heads and completed checks: default CI passes
830 tests but skips36; draft67 CI runs the ten play/rest cases and reproduces
the four baseline failures (836 passed / 4 failed / 26 spell cases skipped).
Draft67 stays draft; none of these source/adoption states change.
