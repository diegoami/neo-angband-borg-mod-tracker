# Neo Angband Borg port repairs

This is diegoami's working repair fork of the TypeScript Borg port. It owns
upstream port-defect trackers, reproductions and isolated proposals to
neostryder/neo-angband-mod-borg. Mandos development and its own integration
live in diegoami/mandos. Original C Borg/game and Neo engine defects belong
in diegoami/neo-angband-tracker, not this port queue.

Start at [AGENTS](AGENTS.md), [RULES](RULES.md), [PLAN](PLAN.md) and the latest
checkpoint. [Three-session map](docs/SESSION.md). Root master intentionally
contains fork session docs; source-fix branches start at upstream/master so
those docs never leak into an upstream repair PR.

Use Node22+ and the packageManager in package.json; install with
pnpm install --frozen-lockfile. Gate relevant work with pnpm typecheck,
focused fail-before/pass-after tests, rebuild plugin.js when runtime source
changes, and pnpm verify. Record required content and engine pins explicitly.
The upstream baseline has documented optional content-suite skips and known
play failures; the checkpoint/port issue transferred from Mandos123 owns that
investigation. Never report a full no-skip gate unless it actually executed.

Upstream PRs63–66 use isolated topic branches; their presence does
not imply this default source or a running Mandos consumer includes them.
Consumer carry/fixed labels live only on linked Mandos adoption issues; source issues here track source resolution.
[Upstream product README](docs/upstream-reference/README.md) and
[upstream planning snapshot](docs/upstream-reference/PLANNED.md) remain
reference material; they do not authorize new features in this session.

Upstream credit/licence/AI policy is preserved. No official C submissions.

The source port's purpose is fidelity to its C Borg baseline. A faithfully
copied C defect is routed to neo-angband-tracker; proposed C fixes are not
translated here as a separate correction service. Mandos handles applicable
TS correction translations in its own derivative. Rust adoption belongs to
borg-rs and carries no Neo dependency.
