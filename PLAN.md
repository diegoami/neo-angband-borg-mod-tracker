# Port-repair session plan

1. Read the checkpoint and this fork's current issues. Inspect upstream Neo
   mod/engine boards and source movement before another fix. Reconcile actual
   code, package/build consumers, applied backports and issue state.
2. Prioritize reproduced failures and the transferred play/rest coverage
   investigation (original Mandos123). Its published beta.1 setup executes
   ten cases with explicit content: six pass, four repeated-open failures.
   Compare existing engine fixes/stall handling before inventing another bug.
3. For a port defect, compare C4.2.6/current C and the TypeScript implementation.
   Restore a proved omission using available declared APIs. A C defect copied
   faithfully belongs in the engine/C fork; do not silently change parity
   or take over C-fix translation. Mandos owns those TS translations; this
   tracker fixes omissions against the explicitly pinned C baseline.
4. Keep one owner issue and one isolated repair branch from pristine
   upstream/master. Existing proposal branches63–66 and Mandos-side carry
   receipts remain linked history. Do not rewrite their published commits.
5. Reproduce a legal natural/synthetic scenario, retain controls, then show
   fail-before/pass-after on the declared engine/content/SDK. Relevant skipped
   tests are not a pass. Attribute baseline failures instead of changing
   assertions or seeds. Record full-gate limits and plugin currency honestly.
6. Offer the confirmed port fix upstream through a topic branch in this fork,
   excluding our bootstrap docs and Mandos-only strategy/product changes.
7. Link the source correction to a distinct Mandos consumer issue. This
   session updates source resolution/proposal evidence; the Mandos session
   pulls/adopts it, rebuilds and verifies downstream before closing its issue
   as fixed. Keep a locally carried consumer open while upstream delivery is
   missing. Do not edit/deploy the Mandos checkout from this port session.

8. Update issue/checkpoint at merge/stop. No new gameplay features, local lab
   deployments or engine/C fixes in this port workspace.
