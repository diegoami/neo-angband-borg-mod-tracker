#!/usr/bin/env bash
set -euo pipefail
# Prerequisites: git with immutable commit available; Node26.13.0; pnpm12.3.4; npm11.20.0.
# FORK: engine-owned recipe: diegoami/neo-angband-tracker#4 comment6671740340.
# Invoke: bash reproduce.sh /path/to/neo-angband-tracker /new/disposable/directory
test "$(node --version)" = v26.13.0
test "$(npm --version)" = 11.20.0
engine_repo=$1
artifact_root=$2
mkdir "$artifact_root"
artifact_root=$(realpath "$artifact_root")
mkdir "$artifact_root/source" "$artifact_root/tarballs"
git -C "$engine_repo" archive 19ff25eac8997e8feb6b5e62eefa7ffe4d134631 | tar -x -C "$artifact_root/source"
cd "$artifact_root/source"
test "$(pnpm --version)" = 12.3.4
ELECTRON_SKIP_BINARY_DOWNLOAD=1 pnpm install --frozen-lockfile --store-dir "$artifact_root/store"
flock /tmp/angband-validation.lock sh -c 'node packages/mod-sdk/scripts/sync-docs.mjs && pnpm exec tsc -b packages/mod-sdk packages/core packages/content'
# Only this disposable archive's manifests change; source checkout remains untouched.
node tools/pin-workspace-ranges.mjs --write
for pkg in mod-sdk core content; do
  (cd "packages/$pkg" && npm pack --pack-destination "$artifact_root/tarballs" --json > "$artifact_root/pack-$pkg.json")
done
(cd "$artifact_root/tarballs" && sha256sum *.tgz > ../SHA256SUMS)
