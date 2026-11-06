# Agent entry: Neo Angband Borg TypeScript port fixes

This session owns **diegoami/neo-angband-borg-mod-tracker**. Start here, then read [RULES.md](RULES.md),
[PLAN.md](PLAN.md), [session.json](session.json), [the session map](docs/SESSION.md)
and the latest issue labelled checkpoint in this repository:

```sh
git status --short
git remote -v
gh issue list -R diegoami/neo-angband-borg-mod-tracker --label checkpoint --state open
node tools/check-session.mjs
```

Broad upstream reconciliation is a weekly manual batch or owner request. Use
targeted checks for active blockers, duplicate avoidance and closure evidence.
Audit a watcher's complete scope before running it: inherited Threads references
can follow external Rust links. No routine borg-rs repository/file/issue polling
is authorised; reports arrive directly on the engine/C tracker board.

Use this repository's issue board, not Mandos's former upstream queue.
Preserve transferred history and link component/integration work across repos.
The default branch contains our session docs; upstream source references and
fix branches remain separate. Follow the source-base rules in PLAN before
editing. Implementation uses isolated task worktrees; do not disturb the old
running lab or pristine reference checkouts. Owner scope and posting limits
in RULES take precedence over historical upstream roadmap/reference prose.

[Upstream technical README](docs/upstream-reference/README.md) is reference
material, not this fork's task queue or autonomous feature authorization.
