# Working rules

1. Work only in this session's repository and scope. Read AGENTS.md, this
   file, PLAN.md, session.json and the latest checkpoint issue before acting.
   The umbrella is a router, not a shared repository or shared task scope.
2. Current bug state and upstream-board/source review comes first; then
   triage/evidence and list maintenance, then fixes. Do not turn a reported
   lead into a verified defect. A closed upstream thread is not proof of a fix.
   Priority applies within this session's component; the independent C/engine
   stream does not wait for the port-repair queue to become empty.
3. One canonical defect issue in its owner repository. Link other repository
   work as a distinct integration/adoption task; do not copy live defect state.
   Preserve transferred issue history and old redirects; qualify cross-repo
   references as owner/repo#number or full URLs, never bare numbers.
4. Name the origin: C Borg, C game, Neo engine, Neo port or Mandos-only.
   Compare pinned current C and imported4.2.6 when attributing port behavior.
   A faithful copy of a C defect belongs to the engine/C repository; the Neo
   port follows C. Do not use the mod tracker as a C-correction translation
   service. Mandos independently translates applicable C fixes into its own
   TS derivative; borg-rs independently translates/adopts them in Rust. Neither
   translation is a port-fidelity defect. Mark Mandos departures explicitly.
5. No angband/angband issues, PRs or comments from us under the standing pause.
   Keep C proposals in diegoami repositories with reproducible native legal
   scenarios, controls, human consequence and patch links. Confirmed Neo
   engine/port issue reports go to neostryder/neo-angband after reproduction,
   provenance and duplicate checks: the maintainer centralizes ALL Neo issues
   there (mod73 was moved to Neo478). Code proposals use the appropriate engine
   or mod repository. Local source ownership is unchanged. Local proposals may be
   closed/unmerged with c-proposal/postponed while retaining branches/patches.
6. Owned default branches contain session docs. Preserve those commits and
   integrate upstream by normal merge when needed; do not reset them to a
   pristine mirror. Remote upstream references are refreshed fast-forward.
   Start actual fix/proposal branches from the correct pristine source base,
   excluding our session docs. C and Neo have different source trees/bases.
   No amend or force-push; preserve every published topic head and all tags.
7. Mark intentional code divergence beside its source reference with FORK
   and explain what/why in the commit. Preserve upstream credit, licensing,
   AI_USAGE_POLICY and original technical docs. No AI attribution trailers.
8. Relevant fail-before/pass-after and controls precede a fix claim. Use the
   correct C or TypeScript build environment; state pins/options/RNG/perception
   and practical limits. Do not change assertions/seeds or waive relevant
   skips to get green. Baseline failures require attribution and tracking.
9. Source issues track a defined upstream defect, separately from Mandos
   adoption. Accept upstream's claimed-fixed/accepted resolution, incorporate
   the correction with our changes and run the normal required checks, then
   close the whole defined original source issue. Do not hold it open for a
   release, consumer deployment, exhaustive absence proof or hypothetical
   residual. A concrete failure found after adoption gets a NEW linked bug;
   the original remains closed.
   `merged-upstream` is TEMPORARY only when that upstream correction is
   accepted but our fork still awaits import/verification. Remove it on
   verified incorporation/closure. An open PR's proposed Fixes text, an own-fork
   merge, a duplicate/wontfix closure or a merged link covering only another
   scope does not qualify. Split or narrow real distinct bucket scopes rather
   than claim the vendor fixed a broader case it never claimed to fix.
   `triage:needed` marks only an unassessed incoming report; remove it once
   assessed. Known proposals and verified corrections are already assessed.
   Consumer carried/fixed/partial/patch-active labels belong on
   the linked consumer issue only. Consumer verification/state stays with its
   owner and does not gate closing an incorporated source correction.
   Internal CI tasks, audit tasks and checkpoints have their own completion
   criteria and do not acquire upstream delivery labels.
10. Preserve owner saves, browser profiles, install data and the running lab.
    A source merge is not a deployment. Read-only references stay pristine;
    work in task worktrees. Run records/evidence already committed are append-only.
11. Coordinate heavy local checks across all three sessions with the shared
    lock: flock /tmp/angband-validation.lock <command>. Log long runs, watch
    progress and keep one heavy local gate at a time. Do not launch background
    agents without owner direction. Reviews inspect; they do not mutate code.
12. Record decisions/receipts and the next exact action on the owner issue and
    checkpoint at each merge or stop. Update source monitors, patch ledgers and
    affected links in the same pass. Never silently drop a superseded hunk.
13. Current work is bugs, triage, workflow maintenance and owner-requested
    rework. Backlogged gameplay strategies/learning/unattended stage-resume
    features stay parked unless the owner explicitly changes that scope.
