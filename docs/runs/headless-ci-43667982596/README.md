# First real repository headless CI report

[Run43667982596](https://github.com/diegoami/neo-angband-borg-mod-tracker/actions/runs/43667982596)
exercised the new workflow on proposal head2fd45ff:18assigned games at5000ticks,
17caps and one death, no missing records or harness/configuration errors.
Human Mage3010 died to a small kobold at2666, level1/depth1. The other17games
reached the cap. This is an acceptance sample, not a survival-improvement claim.

The original generated [Markdown](report.md) and JSON-as-inert-text
[record](report.txt) are retained unchanged. The Markdown includes the cause,
recent commands/messages/states, exact source/bundle identities and reproduction
command. Raw trace/build artifacts are on the run and retained90days. Diagnostic
absolute runner paths in the JSON identify the original artifact layout; they
are not local paths on a new machine.

The headless build, four game shards and report jobs all passed. The unrelated
main-CI workflow-list assertion initially rejected the newly requested workflow;
the follow-up1a92ac4 audits it explicitly, preserving the1170-test gate and
restricting issue publication to trusted default-branch manual dispatch. No
runtime/harness algorithm changed in that follow-up.
