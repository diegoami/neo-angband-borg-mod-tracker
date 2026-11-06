# Owned integration of existing port proposals — 2026-11-06

Base: published owned policy head `deadbfce4ede467960c1647f2f0622c13927c298`.
Targeted upstream read confirmed63/64/65 OPEN at the exact recorded source
heads. This integration reuses those clean proposals, not a duplicate upstream
fix PR. Source23/22/32 remain open pending upstream resolution. Mandos consumer
state and existing independent carries are not changed by this integration.

| Source | Original proposal | New attributed import | Added unchanged cases |
| --- | --- | --- | --- |
|23: escape-stair return|Neo63 `7c4992164b1c9c5c48d10b97a01f2d760a3c6372`|`5340ab0`|16|
|22: production store knowledge/unit values|Neo64 `329459c0b35e5370363340b3df07694a52ee8a2a`|`9ac3816`|9|
|32: home random-power predicates|Neo65 `5416c6118bd016030cdbf00ee6644b2c13337267`|`8a6078a`|5|

Each import is a separate normal `cherry-pick -x`, preserving original author
and source credit, without amend/force or changing a published proposal head.
All apply cleanly; the cumulative generated plugin is current at662.3KiB.
No runtime code beyond the original proposals is introduced. C corrections
or new gameplay strategies are not translated here.

## Genuine fail-before controls

The exact three new fixture files were copied unchanged from the proposal
commits into an isolated base checkout before any source fix. Declared core,
SDK and content remain matching published `1.23.0-beta.1`; core uses the same
explicit noteSpot pnpm patch87d2625e. Fresh frozen install uses a task-private
store. Node24.21.0 / pnpm12.16.1 / TypeScript5.9.3 / Vitest4.1.11 locally.
All focused/whole local gates use `/tmp/angband-validation.lock` fairly.

| Unfixed source with proposed fixtures | Actual result |
| --- | --- |
|escape-stair|10 fail /6 pass,16cases,zero skips,1.65s|
|store knowledge|8 fail /1 pass,9cases,zero skips,1.36s|
|home random power|3 fail /2 pass,5cases,zero skips,1.35s|

Complete before logs and numeric exits are adjacent. These are normal public
item/known-stair contexts using the original notice/perception/store helpers;
no hidden engine reads, forced controller result or revised assertion/seed/
timeout is added. They prove selector/appraisal consequences, not a natural
prevented death or an executed native C save.

The baseline866 cases are untouched; the three new files add16+9+5=30 actual
cases, so the declared complete suite is **896**. Both ordinary and exact-source
count guards now require896/no skips; baseline-only866 is an explicit failing
CI control. No case, assertion, seed, cap or timeout is removed/weakened.

Affected and full local gates may queue behind independent engine/native-C
validation; no parallel local live gates or lock bypass is used. Hosted full
ordinary/source19ff compatibility and parent review are required before merge.
No supported-engine version change is needed: normal beta.1+explicit noteSpot
carry stays pinned, and separate source19ff artifacts remain a compatibility
profile with the full expanded suite.

## Backup follow-up boundary

Canonical own2 remains open. Its assigned first weapon-backup value/selected-
handle producer plus HOME candidate/strict-improvement/retrieval scope is
[recorded here](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/2#issuecomment-6674649571)
and workspace12. Rings are already imported from62. No armour/tactical/full
backup subsystem or new backup runtime code is included in this three-fix
integration. Concrete follow-up scenarios/report proceed after this batch is
locally verified/reviewable and only under the parent-approved stage boundary.
