# Borg beta.4 and accepted port-fix reconciliation

Owner dispatch: [workspace35](https://github.com/diegoami/angband-workspace/issues/35).
Previous verified repair fork:28c0b9ba7bf0e6eb37b5a63faaf0bf4801daa9b2.
Official released tag v1.4.0-beta.4 is48ee6e1c4640ca66bdcb946952539690f558a5d9.
Current incorporated upstream is a10655c3b8113848092a7d66405ca3ec5e2222f9.

## Accepted source scope

- [PR74](https://github.com/neostryder/neo-angband-mod-borg/pull/74) merged at56ed0b869c0c0d0b86eaec38f9ad2615964fbe65; canonical Neo478, local41.
- [PR78](https://github.com/neostryder/neo-angband-mod-borg/pull/78) merged at13fb0e20b2ee02c1086e07b9f99cacb18e63c607; canonical Neo485, local48.
- [PR79](https://github.com/neostryder/neo-angband-mod-borg/pull/79) remains a separate unaccepted tactical/SR proposal, canonical Neo486/local50.

Both accepted changes postdate the beta.4 tag. The tag is immutable and does
not contain them; the unchanged package version does not identify the source
commit. This repair fork preserves its separate pending tactical/SR delta.

## Merge proof and limits

Normal merge of official a106 into verified28c0 has conflicts only in armour
state/notice declarations and the generated plugin. Keeping the already verified
tactical capability additions resolves the source conflicts. A fresh build
produces plugin.js byte-identical to28c0; runtime and tests are unchanged.
The merge delta is only CHANGELOG.md, package/manifest Borg beta.4 version and
the version-sync assertion. Existing1056 tests and strict zero-skip/count gates
are unchanged. No original-C corrections, engine patch, grants, runtime policy,
seed, timeout or assertion weakening is introduced. Existing failures and
optional floor-inspection limits remain preserved in older receipts.

The default Core/SDK/content dependencies stay matching published1.23.0-beta.3.
RAW official06a compatibility is a separate source profile, not an npm release
or the newer official edge225/API2.1 source. No engine source upgrade, lab
deployment, profile/save/data change or tag/release is performed here.

## Verified delivery

Owned PR54 exact a6176d0aac036b7daf06f4e4a471dcd2ffef523e normally merged as
78e271c21690b0d72a01bd7416ce6476921d325a. Its [required gate42487980780](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42487980780)
passed1056 tests/57 files/zero skips in each profile: published276.27s and
RAW06a219.53s. [Actual-master42488477042](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/42488477042)
passed1056/57/zero in each profile: published264.32s and RAW240.90s. Both
include types/current691.0KiB plugin/session/profile/privacy/final gate.
Plugin SHA256 is25c2835df1e6cbf92924bbd642fd1ec83031c55e64fa778a19c7df4e53d290fd,
byte-identical to the prior verified28c0. Local types/current/session,31CI
controls and5docs/version contracts also passed; no extra local full was run.

Source41 and48 can now close for accepted upstream corrections actually
incorporated and normally verified here. Source51 stays completed local
proposal repair. Source50 and aggregate2 stay OPEN for the still-unaccepted
tactical proposal. Mandos independently owns its consumer adoption/state.

## Clean tactical proposal

The original published6956308 topic normally merged accepted a106 as
cc64c1ccc62f7197f5bef24a4a6d23cc96155e5f; no amend/rebase/force. The delta
against current official a106 is exactly15 tactical source/test/plugin files,
without bootstrap/internal metadata or original-C corrections. Runtime/tests/
plugin match the verified owned producer. Its separate [upstream CI42488085030](https://github.com/neostryder/neo-angband-mod-borg/actions/runs/42488085030)
passed1056/57/zero319.21s/current691.0KiB; [privacy42488085038](https://github.com/neostryder/neo-angband-mod-borg/actions/runs/42488085038)
passed. Local clean types/current and114/9 focus passed.

PR79 is now ready for review and mergeable, because78 is accepted and this
new head passed its own gate. It is still OPEN/unaccepted; green CI or our
fork merge is not upstream acceptance. The older clean1048-case result
remains historical; the accepted light8 now explains its1056-case inventory.

An additional optional5-file focus was queued behind a valid independent
native shared-lock job, never started, and only our empty waiter was
canceled after checking it had no child. No native job was interrupted and
no optional focus result is claimed. No local validation job remains.
