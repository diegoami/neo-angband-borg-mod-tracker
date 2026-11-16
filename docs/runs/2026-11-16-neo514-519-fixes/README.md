# Neo514–519 source proposals and combined verification

Owner requested fixing the six validated port errors as PRs. Each topic starts
from pristine upstream622b2ba82ee48b26c1be0517181eb29b8a8239e1, includes its
regressions and rebuilt plugin, and excludes fork session documentation.

| Source issue | Upstream PR | Fork source PR | Before: parity failures / controls | After: relevant focused cases |
|---|---|---|---:|---:|
| neostryder/neo-angband514 | [116](https://github.com/neostryder/neo-angband-mod-borg/pull/116) | [106](https://github.com/diegoami/neo-angband-borg-mod-tracker/pull/106) |19 /5|133|
| neostryder/neo-angband515 | [117](https://github.com/neostryder/neo-angband-mod-borg/pull/117) | [107](https://github.com/diegoami/neo-angband-borg-mod-tracker/pull/107) |4 /6|119|
| neostryder/neo-angband516 | [118](https://github.com/neostryder/neo-angband-mod-borg/pull/118) | [108](https://github.com/diegoami/neo-angband-borg-mod-tracker/pull/108) |1 /1|127|
| neostryder/neo-angband517 | [119](https://github.com/neostryder/neo-angband-mod-borg/pull/119) | [109](https://github.com/diegoami/neo-angband-borg-mod-tracker/pull/109) |7 /2|46|
| neostryder/neo-angband518 | [120](https://github.com/neostryder/neo-angband-mod-borg/pull/120) | [110](https://github.com/diegoami/neo-angband-borg-mod-tracker/pull/110) |4 /9|46|
| neostryder/neo-angband519 | [121](https://github.com/neostryder/neo-angband-mod-borg/pull/121) | [111](https://github.com/diegoami/neo-angband-borg-mod-tracker/pull/111) |6 /4|41|

Exact topic heads and links: [sources.json](sources.json). Fork source PRs
target upstream-master and must not merge into that pristine mirror. Actual
upstream PRs are separate. The integration branch normally merges the same six
topics into fork638979d; it does not close source issues before upstream acceptance.

The combined candidate passes all73 new cases, typecheck and current728.1KiB
plugin.31 routing controls pass. The full ordinary/exact-source contract is
1348 (1275 retained plus73 new), zero skips; hosted full CI is required.
Matching published beta.4 dependencies were freshly installed in an isolated
task worktree and shared by the other task worktrees. No lockfile or engine
dependency changes, broad local suite or dungeon cohort were needed.

The caution conflict preserves C order: late confusion/fear cures, low-HP and
bleeding/poison flags, reserve healing, recall and unknown-item fallback.
Eager alternatives in both caution and escape now defer their helpers.
Registered Remove Curse commands verify real pack, worn and quiver handles
and the first of two removable curses, without an item prompt. Registered
Ranger branding verifies the chosen quiver stack and unrelated stack for both
controlled spell-success and spell-failure rolls. The trained Wisdom18/100
fixture supplies spell cost plus the unchanged C reserve, and consumes the
ordinary RNG draw when pinning the failure branch; no seed is changed.

Curse targeting derives live pack/equipment/quiver order because the port's
FIRST_CURSED value is a presence marker, not a gear identity. Core's default
first-removable-curse selection matches C's final Enter without a hidden read.
Branding keeps the20-item, identification, type, ego, best-to-hit and last-tie
rules. Enchanting reads the configured limit while retaining ordinary-scroll8.

Before logs show the reproduced omissions; after logs are focused checks for
each topic, not a claim of full verification. The tiny original audit fixtures
were made fully typed using the real seeded RNG instance rather than spreading
its prototype; assertions, seed and controlled draws remain unchanged. Real
item command fixture setup uses calcInventory's normal automatic quiver
allocation. No pre-existing gameplay assertion was weakened.

No source proposal or integration PR is merged, no product is deployed and no
population survival improvement is claimed. Master stays638979d. The separate
book proposal113/104 remains independent. Canonical source issues retain their
live state; post-review adoption belongs to the relevant consumer session.
