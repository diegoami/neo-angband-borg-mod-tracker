# Published beta.3 consumer preparation

Canonical [port39](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/39),
parent [workspace22](https://github.com/diegoami/angband-workspace/issues/22).
Base 5d18be3. This is an isolated consumer candidate, not an adopted main profile
or a lab deployment. Parent GO authorized dependency changes and focused checks;
required full profiles/PR remain held for the final producer source handoff.

## Declared packages and patch replacement

Core, SDK and content are pinned exactly to published 1.23.0-beta.3, npm gitHead
97ceec2925e6715ba725624a61866ab93a196a12. The lock contains the registry SHA-512
identities independently supplied in the engine audit. Actual module resolution
confirms Core's transitive SDK and direct SDK are the same beta.3 instance.
No unrelated dependency changed. No beta.1 patchedDependency remains active.
The historical noteSpot patch file/provenance and old negative records remain.

Four unchanged installed-package controls pass on the unpatched beta.3 package:
seen memory updates immediately; remote unseen changes preserve old memory;
player-square changes update memory without SEEN; generation without the live
hook does not memorize. This is actual package behavior, not a version assertion.

## Focused verification

Under the shared validation lock, the four package controls and unchanged
src/play.test.ts, src/rest-and-store-verification.test.ts and
src/item/magic-play.test.ts passed: **42 tests / 3 files / zero skips**, 119.48s,
exit 0. These whole suites include the required installed-content play/rest and
spell cases, plus their existing scenario controls; no tests/seeds/assertions/
caps/timeouts were changed. [Terminal log](focused.log), [exit](focused.exit).

Typecheck, declared grants, plugin build and currency passed. The generated
plugin remains byte-identical to base (669.3 KiB); no runtime source/grant/manifest
change was needed. [Preparation receipt](preparation.json) records the hash.
No full ordinary 924-case or exact-source gate has run for this candidate yet.
Existing required full-suite guards and source CI are not waived. The old 19ff
source artifact tuple is pending replacement only by the final verified producer
handoff, with disposable workspace-range pinning and exact SDK override retained.
No source profile is claimed from a matching package-version label.

## Bug states and scope

Port25 and engine4 are already closed after explicit accepted/imported fixes;
upstream67 was accepted through70/440d8d9 despite its own closed-unmerged marker.
Upstream468 still being open does not undo the defined accepted scope. Sources2
(backup armour/tactics and API/capacity limits) and35 (local timeout attribution)
stay open; upstream72 stays open. Existing weapon/HOME source and all 924 owned
cases are unchanged. Input-flush432 and seed433 are not port package units;
engine/Mandos own their independent carries. Original-C295/296 are not silently
translated as port fixes and resolved16 remains closed.

## Limits and next step

Wait for the engine producer's normal full/merge/post-main receipts and parent
final GO. Then refresh exact-source workflow/recipe/hash identities, run required
ordinary and source profiles with no skips, and send the exact reviewed PR/head
for parent merge. No mass upstream Borg merge or product version bump, source2
feature work, native C/engine/Mandos edit, official C post, Rust polling, tag/
release/npm publication, lab/profile/data or deployment action.
