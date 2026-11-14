# Explicit C birth/options alignment pilot

This is an opt-in **measurement profile**, not a Borg policy or RNG repair.
`c-point-buy-v1` uses the pinned C recommended point-buy algorithm and explicitly
supplies all46 Boolean game options from C e473720. At activation it matches
C borg-init.c:418/427's pickup_always/pickup_inven values. The ordinary no-profile
runner retains its historical settings and command behavior; old frozen suites
and results must not be relabelled as aligned.

Core06a2321c and Borg9c17cb0 are the measured pins. `--birth-profile` selects the
profile at run time; `--alignment-probes true` adds read-only HP/age/history RNG
snapshots at bundle-build time. Runtime birth/options/terrain observations are
written immediately, before game iteration, so a timeout retains them. Unknown
profiles and invalid explicit race/class fail closed. Full starting gear,
HP/SP, gold and placement are recorded; matching birth *rules* does not promise
matching random gear quantities, future HP rolls, worlds or Borg decisions.

Build using Node26 and the usual built pinned engine/source checkouts:

```sh
node tools/zoo/build.mjs --engine-dir ENGINE --borg-dir BORG \
  --engine-pin 06a2321ce30a414df20d1b20d486446e7688171c \
  --borg-pin 9c17cb0c582fe129008899491372787e91abdade \
  --alignment-probes true --out FRESH_BUILD
node tools/zoo/run.mjs --bundle FRESH_BUILD/bundle.mjs \
  --birth-profile c-point-buy-v1 --seed 303 --race Human --class Warrior \
  --turns 2000 --out FRESH_RUN
```

Use `flock /tmp/angband-validation.lock` for heavy local commands in the shared
workspace. No large experiment is authorized by these commands.

For native C, use an isolated checkout of better-borg-c at
fc9d97cb46aa0aaa27773e5c83a41ec395d515fc solely for its pinned measurement tools
and archive of C e473720. `native-driver.py` checks those tool bytes against Git,
then invokes the runner with observation-only birth/RNG additions in the
**exported build tree**, never in the reference checkout. It also selects the
headless test frontend without X11, preventing CMake's graphical fallback.
No C gameplay policy, player state or RNG values are changed. CMake and a C
compiler are prerequisites. Preserve the generated source delta and binary/data
hashes; the extension is an observer, not pristine uninstrumented source.

```sh
python tools/zoo/alignment/native-driver.py build \
  --harness PINNED_HARNESS --build FRESH_NATIVE_BUILD
python tools/zoo/alignment/native-driver.py run \
  --harness PINNED_HARNESS --build FRESH_NATIVE_BUILD \
  --seed 303 --race Human --cls Warrior --cap 2000 --out FRESH_NATIVE_RUN
```

The completed pilot covers Human births in all nine classes, plus a repeat per
engine, at2000ticks. It checks starting policy/options, not population survival
or every race. Native C's slot sentinel is its body slot count (12 for these
Human births); the report normalizes that to Neo's -1 for pack items.

Meaningful controls against actual native observations:

```sh
ALIGNMENT_ENGINE=ENGINE ALIGNMENT_PACK=FRESH_BUILD/pack \
  node --test tools/zoo/alignment/profile-checks.mjs
```

The fixture records native C's observed allocations/options, not expectations
copied from the TS implementation. The no-profile real-Core control exposes the
old rolled-birth/no-selling mismatch. Also compare ordinary old/new command
hashes and aligned probe-on/probe-off hashes; all those controls passed in the
reported pilot. Build final formatting follow-ups are replayed separately and
must preserve the measured command stream before being offered for review.

RNG finding: C's initial32-word state matches Neo for shared seeds. In native
seed303's birth-menu path, four player_generate age/history passes consume48
main-stream draws before roll_hp; the headless TS path starts rollHp at draw0,
then performs one age/history pass. Before store generation C is at draw97,
Neo at61. This establishes an actual startup-consumption divergence, not a
broken RNG kernel or proof that every downstream engine algorithm matches.
C also draws the Borg-local startup seed from the game stream, while this port
defaults to0x00c0ffee. That behavior is recorded separately and is not changed
by this measurement profile. A universal integer seed offset is not a justified
solution: call ordering, rejection counts and later actions can differ.

The tools are not yet a dispatched catalogue specimen. A future cohort needs a
new frozen suite/specimen with explicit toolkit/profile pins and separate owner
approval. Do not reuse an old run ID or silently change a frozen birth rule.
