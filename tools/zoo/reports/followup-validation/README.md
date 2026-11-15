# Reporting and real-game launch validation

This is a synthetic validation recording, not another cohort or a survival result.

- The real Neo frontend at official engine `d27ed50f9e3b650a43cceda5a0c007d03cc321df`
  launched both Human Druid seed1746645326 and Half-Elf Druid seed305119160 from
  recorded turn-zero births. The exact recorded Borg plugin started automatically.
- The crow-case browser check measured actual start turn0, Half-Elf/Druid,
  HP12/SP2/gold388, birth stats17/10/16/10/16 and grid25,4, matching the retained
  birth. The normal Borg banner appeared; after seven seconds the game was at
  tick210, with inventory, equipment, messages and monster panels visible. No
  browser runtime errors were reported. This checks real UI startup and play;
  it does not assert equality of the full graphical and headless trajectories.
- A retained legacy-bundle control repeats the crow death at2442. A reconstructed
  wild-cat clip matches all original command events (SHA256
  `c9916e4a6aea7e80bccaa821d6d28ebffed54a616b22c9e08e6fb97bf51d4233`).
  Display observations do not become independent lives in the report.
- Lightweight process/report/host controls:35passing, no skips. Pinned-engine
  point-buy/native-menu RNG controls:8passing. The actual API2/production-session
  truth-host gate passes, including full floating-eye attacks, no actual-map
  grant, durable receipt, failed-write denial and cleanup.
- The reused gameplay source still passes its ordinary1194-test suite; final PR
  CI independently verifies the published branch. No gameplay or engine source
  is changed by this follow-up.

![Actual Neo frontend with Borg and side panels](actual-neo-frontend.png)

The screenshot is from Neo's normal renderer. The separate report's known-state
animation is labelled as reconstructed observations, not an original screenshot.

## Delay and live resume follow-up

Real-frontend browser regression: `autodelay=250ms`, `startDelay=3000ms` leaves
actual turn0 visible with no controller running during the initial delay. The
Borg starts, Escape pauses at turn40, and the game remains at40 through a
600ms observation. Ctrl-Z resumes ordinary Borg play to turn50, with no runtime
errors and no reload/reseed. The final lightweight suite has36passing controls,
including rejection of invalid delay values before any game/output is created.
