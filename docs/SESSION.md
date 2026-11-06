# Port session and independent owners

This session owns diegoami/neo-angband-borg-mod-tracker: faithful TypeScript
Borg port repairs. Read AGENTS.md, RULES.md, PLAN.md, session.json and the latest
[checkpoint26](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/26)
comments before selecting work. Live canonical issues and actual checks retain
authority; this map is not another task-state database.

| Lane | Repository / checkpoint | Root under the umbrella | Responsibility |
| --- | --- | --- | --- |
| Parent coordination | [angband-workspace7](https://github.com/diegoami/angband-workspace/issues/7) | workspace root | Scoped dispatch, producer/consumer handoffs, verified recovery pins |
| Neo engine repairs | [neo-angband-tracker25](https://github.com/diegoami/neo-angband-tracker/issues/25) | neo-angband-tracker/ | Neo engine source repairs |
| Native C proposals | [neo-angband-tracker207](https://github.com/diegoami/neo-angband-tracker/issues/207) | neo-angband-tracker/.worktrees/angband-c/ | Independent C Borg/game source investigation lane in the same fork |
| Faithful TS port | [port26](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/26) | neo-angband-borg-mod-tracker/ | Missing or incorrect port behavior against the declared C baseline |
| Mandos consumer | [mandos36](https://github.com/diegoami/mandos/issues/36) | better-borg/ | Independent product, C-to-TS correction translation and verified adoption |
| Native C consumer | [better-borg-c1](https://github.com/diegoami/better-borg-c/issues/1) | better-borg-c/ | Direct C application, measurement and carried/fixed adoption |

The parent coordinates five lanes across four component repositories. Native C
proposals and Neo engine repairs share a fork but have separate bases, worktrees
and checkpoints. Native C is independently owner-launched; do not replace its
worker or merge C source into Neo master. The C consumer is a separate product,
not a second source board or a replacement native-C proposal session.

Each session reads its own rules/checkpoint and keeps one writer per task.
Implementation uses isolated topic worktrees; default branches retain bootstrap
docs. The old neo-angband lab, neo-angband-upstream and original
neo-angband-mod-borg are running/pristine references, not these workbenches.
Preserve their branches, profiles and mandos-lab-data.

## Source delivery and consumer boundaries

Canonical C Borg/C game and Neo engine defects belong to the engine/C tracker.
A C defect copied faithfully is not a port omission. Mandos independently
translates applicable C corrections into its TS derivative; better-borg-c
applies C directly. Their own linked consumer issues carry application/testing
and carried/fixed/patch-active states. Source issues do not acquire those labels.
An accepted correction incorporated and normally checked here closes the original
source scope; a genuine recurrence is a new linked report. An own-fork merge or
an open proposal is not upstream acceptance.

## Intake and reconciliation cadence

borg-rs reports directly on diegoami/neo-angband-tracker. It is an independent
Rust project, not a managed worker or required checkout in this session. Do not
routinely fetch/watch its repository, bug file or external issues. Preserve
historical discovery credit and triage direct C-board reports in their owner
session; do not dispatch Rust work from here.

Broad upstream reconciliation is weekly/manual by default or explicitly owner-
requested. Targeted active-blocker, duplicate and source-resolution checks remain
appropriate. Audit inherited watcher scope before execution, including Threads
references that could follow Rust links; use targeted manual reads when unsafe.
No daemon, source version chase or release wait is introduced by this map.

Official angband/angband posting remains paused for agents. Confirmed Neo offers
follow this fork's source/proposal rules and owner scope. No source merge is lab
deployment or consumer adoption; parent alone records verified workspace pins.
