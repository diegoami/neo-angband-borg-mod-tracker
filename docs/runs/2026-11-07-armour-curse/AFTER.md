# Narrow armour curse-predicate correction

Runtime frozen producer: d9beead34594e52ab5a00b064f0aac395471945b.
Base verified4ab623535f0422c1d212f0523bd0ace0d6b78c3c; canonical source51, linked48/50/2/Mandos125.
The only runtime change is using existing isCursed(item) for armour eligibility and
its removable-curse5000 penalty. This consumes the already-public known-item analyzer;
no new knowledge producer or engine interface is introduced. Weapon asymmetry and all
existing Deathwreaker controls remain unchanged. Source50 tactical/SR work stays paused
on its separate preserved branch096b602; none of that runtime is included here.

Before39099484564b5c4fce85948892d4c1154e30f552:3 expected failures/3 controls.
The same6 assertions pass afterward. [Affected focus](after-focused.log):209 tests/10 files,
zero skips,2.80s. Types, build/current678.3KiB plugin, grants, session and public scans pass.
Actual collected inventory is1000/55; [31 guard controls](ci-controls.log) reject old994,
skipped and failed suites. Plugin SHA256: `127cc7f6061b67292b739d26a3da97df83e04542aab865157c261be99e651a66`.
Published beta.3 default dependencies/lock/manifest and qualified RAW06a profile are unchanged;
required hosted ordinary/source full verification remains pending parent frozen-head review.
No extra local full, C change/proposal, engine/native/Rust/lab/cohort/strategy work.

The actual Razorback object's negative flag and empty named-curse list are never rewritten.
Its real analyzer cursed=true is checked. An explicit true uncursable scorer seam is a
labelled model-input arithmetic control (exact22159), not a claim that the game can remove
AGGRAVATE or that a production producer supplies that knowledge. Unknown and explicitfalse
knowledge now reject it as C does. Full notice, legal noncursed armour and named-curse
refusal controls use the same registered known objects as the frozen before proof.

Parent owns normal merge/actual-main/pins and independent Mandos adoption. Source48's
upstream Neo485/mod78 remains OPEN; its clean proposal may receive a new reviewed commit
after qualification, with no amend/force or upstream-fixed claim from our fork's merge.
