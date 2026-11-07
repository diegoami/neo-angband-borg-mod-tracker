# Neo Angband Borg port repairs

This is diegoami's working repair fork of the TypeScript Borg port. It owns
upstream port-defect trackers, reproductions and isolated proposals to
neostryder/neo-angband-mod-borg. Mandos development and its own integration
live in diegoami/mandos. Original C Borg/game and Neo engine defects belong
in diegoami/neo-angband-tracker, not this port queue.

Start at [AGENTS](AGENTS.md), [RULES](RULES.md), [PLAN](PLAN.md) and the latest
checkpoint. [Component-session map](docs/SESSION.md). Root master intentionally
contains fork session docs; source-fix branches start at upstream/master so
those docs never leak into an upstream repair PR.

Use Node22+ and the packageManager in package.json; install with
pnpm install --frozen-lockfile. Gate relevant work with pnpm typecheck,
focused fail-before/pass-after tests, rebuild plugin.js when runtime source
changes, and pnpm verify. Record required content and engine pins explicitly.
The historical bootstrap baseline below records optional content-suite skips
and repeated-open failures. Their defined source scopes have since been
accepted, incorporated and closed. Current task39 owns the beta.3 dependency
upgrade; never infer a full no-skip gate or consumer deployment from a version.

Upstream PRs63–67 were accepted through successor PRs69/70 and their scoped
corrections are incorporated here. Source2's weapon-backup/HOME leaf is local
and accepted as upstream72. Armour-backup data/value and strict HOME retrieval
are restored in source48; tactical equip and SR-availability folds remain separate. The
canonical issues own live status, independently of Mandos adoption.
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

## Recorded baseline at session bootstrap

The owned docs branch changes no runtime source. With sibling content present,
published core/SDK beta.1 executes866 cases:862pass,4fail (the repeated-open
play assertions, no skips). This is the same known source investigation25,
not a green gameplay claim. Without content the old baseline skips36 cases;
do not use those skips as proof. A controlled patched-engine comparison is
recorded on25 before attributing a new source defect. Bootstrap/monitoring
checks are independent and must still pass.

The bootstrap control keeps this port and the same content but explicitly
selects the prebuilt Mandos lab engine (9d6ae21ec, its existing patch bundle):
the same ten play/rest cases pass10/10. That isolates an engine-version/patch
boundary as a bundle; it does not prove which individual hunk fixes each
published-beta.1 failure. Source issue25 retains the next attribution step.

On a fresh clone, add upstream=https://github.com/neostryder/neo-angband-mod-borg.git
and fetch its master before cutting an isolated source-fix branch.

## Owned fork engine dependency profile

[Integration task39](https://github.com/diegoami/neo-angband-borg-mod-tracker/issues/39)
upgrades the owned dependency profile to matching published Core, SDK and content
**1.23.0-beta.3**, npm gitHead 97ceec2925e6715ba725624a61866ab93a196a12.
The four installed-package memory controls and all 42 focused play/rest/spell
cases pass without the former beta.1 noteSpot patch. Its historical file and
[provenance](patches/engine-notespot/README.md) remain; no patch is applied to
beta.3. [Current scoped receipts and remaining gates](docs/runs/2026-11-06-beta3-consumer/README.md)
distinguish focused proof, required ordinary/exact-source profiles and deployment.

The separate exact fork-source profile retains its own verified source/artifact
identity and exact transitive SDK selection. It is not the registry artifact
merely because both manifests say beta.3. The default suite now retains all 994
cases: the previous 954 plus forty armour data/value/HOME and capacity controls. No source
policy, seed, assertion or timeout is weakened. The separate exact-source profile
selects official06a (edge.218 source) with raw beta.3-versioned artifacts; it is
not the registry beta.3 or the separately stamped desktop build.

Source25 and engine4 are CLOSED after explicit upstream acceptance and normal
incorporation checks; upstream67 closed without its own merge marker after
acceptance through70. Upstream468's remaining open state does not reopen the
accepted defined scope. Port source2/upstream72 and timing35 stay independently
open. Mandos owns its package carries and consumer state; no lab update follows
from this source task.
