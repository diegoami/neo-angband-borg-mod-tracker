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

Required exact PR and actual-master check results will be recorded in the
checkpoint and final follow-up receipt. Source41/48 closure waits for those
normal incorporation gates; Mandos independently owns consumer adoption.
