# Tactical backup and SR availability before proof

Canonical source50/aggregate2/Mandos125; verified baseline4ab623535f0422c1d212f0523bd0ace0d6b78c3c.
This commit changes tests/evidence only. Actual registered known Éowyn and Dal-i-thalion
items pass through the production item adapter; the player and tactical absolute-danger
answers are explicitly modelled unit inputs, not an asserted full live game or survival run.
No positive backup score/selection is injected: current full notice produces the actual
weapon/armour handles before the missing tactical maneuver is queried.

Frozen before result: **8 expected missing-behavior failures /10 controls PASS**,18 tests,
0.636s, types pass. Four failures show absent selected-backup SR folds/FALSE/scratch retention;
four show no tactical wear command for C82's deliberately retained higher-danger winner,
weapon ties and single candidates. The callable optional export boundary lets the assertion
fail on missing behavior without a missing-module/import setup failure. No runtime edits.
Controls cover hunger/weakness/panel301/nonimprovement/native ceiling/missing or unresolved
evaluator/no backup/invalid absent0winner/swaps disabled. These controls also constrain the
new implementation; passing before does not claim an absent maneuver already evaluates them.
No seed/cap/timeout or old gameplay assertion changed. Later actual command/capacity/ring,
public option/scratch and exact C quirks require separate targeted controls.
