# Latest Borg source and raw edge.218 compatibility

Task [port43](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/43),
parent workspace26. Base3ff8406 is the independently verified port41 delivery.
Normal merge6c8b88e imports ALL official Borg a4437882, including release
v1.4.0-beta.3/c103aae and previously missing94d5f19. This is not an SDK-only
version change. No new upstream report is filed for already accepted mod68.

## Actual import audit

The missed official94d writes identification, empty-pack, food-cure, ammunition
branding and previous-HP fields and processes quiver inventory correctly. At3ff,
those functions/tests were absent and package/manifest still said Borg beta.2.
The normal merge preserves owned weapon-backup/HOME source2/PR72 and zero-light
source41/PR74 corrections, rules and owned CI. Only generated plugin and two
owned backup blocks (imports/evaluator) conflicted; both owned blocks were retained
with upstream common knowledge wiring, then the plugin was rebuilt.

Records/controller/item dependencies/enchantment/wiring allowlist now match
latest official a443 byte-for-byte. Trait/config differs only for owned backup
and zero-light behavior. No original-C correction is silently translated here.
The inherited double light modifier and now-reachable branding counter20 remain
faithful. C240's previous Mandos intake N/A reason (missing producer) must be
re-evaluated upon downstream adoption; this import is not its correction.

Existing resolved source22/23/24/25/32 scopes remain resolved. Escape, store-home,
store knowledge, installed spell/play coverage are already present, not missing
again. Neo460 remains open only for its separate unavailable SAURON_DEAD field;
importing the accepted six-field correction does not resolve that remainder.

Borg manifest/package/version tests now agree on1.4.0-beta.3. Default
Core/SDK/content remain the matching unpatched published1.23.0-beta.3 graph;
its lock is unchanged. The existing publishing workflow stays disabled; no tag,
release/npm publication, lab deployment or installed-mod change occurs.

## Exact-source profile is independently pinned

[pins.json](pins.json) records actual tuple identities from producer372,
engine receipt047f9a6. Select **official06a-source-beta3**, source
06a2321ce30a414df20d1b20d486446e7688171c. All three artifacts retain beta.3 version
labels but their hashes/source differ from registry beta.3. Each supplied file
was independently hashed and size-checked. The separate edge.218-stamped tuple
and downloaded desktop are not selected or treated as npm publication/UI proof.

The hosted recipe archives official06a to disposable storage; Node26.13.0 and
pnpm12.3.4 build SDK→Core→content. Workspace ranges are pinned only inside that
archive, then pnpm packs reproduce the producer tuple. No engine gameplay source
is patched or active checkout manifest changed. The verifier checks all three
hashes BEFORE installing, then sets the supported pnpm-workspace SDK override
and requires direct/transitive SDK realpath identity. Its full gate stays separate
from the unmodified published default. Historical f576 receipts are preserved;
version equality is not evidence those artifacts are equivalent.

The current session port baseline is a443. Source package selection and exact
compatibility identity belong to these explicit profile receipts, not a guessed
release number. Core/harness checks do not certify desktop/worker/controller
installation or a refreshed private lab.

## Verification so far

[Default focus](default-focused.log):127 tests/9 files/zero skips, including
upstream wiring and owned backup/light/version controls. Types/current671.3KiB
plugin pass. Actual Vitest collection gives951 tests/51 files: previous932 plus
nineteen upstream cases (16trait,2public-food,1oldHP). The exact full-suite guard
and Node negative controls now require951, rejecting old932, skips and failures.
[CI controls](ci-controls.log) pass31 Node cases independently of Vitest.
Raw-source focus and required hosted ordinary/source gates remain pending.
Engine375 required and actual-main results are independent merge prerequisites.
No duplicate local full is run.

## Source ownership and upstream reporting

All Neo issues, including Borg port issues, centralize in neostryder/neo-angband
per the maintainer's move of mod73→Neo478. Code PRs still target the relevant
engine/mod repository. Local port ownership remains this repository; consumer
adoption belongs in Mandos. The closed moved report is not a fixed resolution.
Native-C/BetterC sessions remain independent. No Rust polling, private data,
source-policy relaxation or new strategy work occurs in this task.

## Independently qualified raw-source consumer

Frozen candidate95aa912 was archived to a fresh disposable consumer. All three
producer tarball SHA256/size checks passed before install; only that copy's
devDependencies/workspace SDK override changed. Bare imports report Core/SDK
beta.3, Core.ENGINE_VERSION beta.3,250 SDK exports, resolved content and the SAME
actual direct/transitive SDK file ([graph](raw-source-graph.json)). No local-Core
or content-checkout override was set. The source identity is06a, not registry
beta.3 and not a stamped edge package.

Types, [four installed-package controls](raw-source-package-controls.log),
[own committed plugin currency](raw-source-plugin.log) and [source focus](raw-source-focused.log)
passed:127tests/9files/zero skips,4.80s,671.3KiB plugin. Thus the same source and
committed plugin work in the supported published default and the exact latest
source graph. This focus is not a full/default/desktop acceptance claim. The
hosted recipe will reproduce the tuple and independently execute all951 cases.
No local engine rebuild or duplicate full was used. Parent review and producer
plus consumer required/actual-main results still control merges/adoption.
