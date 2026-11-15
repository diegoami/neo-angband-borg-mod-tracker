#!/usr/bin/env bash
set -euo pipefail
# FORK: RAW official d27ed50 beta.4/API2.1+ source profile; separate from registry artifacts.
# Only a disposable archive is built/packed. Node26.13.1 and pnpm12.3.4 match producer.
# Invoke: bash tools/build-notespot-artifacts.sh /path/to/engine-checkout /new/artifact-root
test "$(node --version)" = v26.13.1
exec 9>/tmp/angband-validation.lock
flock 9
engine_repo=$1
artifact_root=$2
mkdir "$artifact_root"
artifact_root=$(realpath "$artifact_root")
mkdir "$artifact_root/source" "$artifact_root/tarballs"
git -C "$engine_repo" archive d27ed50f9e3b650a43cceda5a0c007d03cc321df | tar -x -C "$artifact_root/source"
cd "$artifact_root/source"
test "$(pnpm --version)" = 12.3.4
ELECTRON_SKIP_BINARY_DOWNLOAD=1 pnpm install --frozen-lockfile --store-dir "$artifact_root/store"
pnpm --filter @rpgm-tools/neo-angband-mod-sdk build
pnpm --filter @rpgm-tools/neo-angband-core build
pnpm --filter @rpgm-tools/neo-angband-content build
# Pin only this disposable archive's workspace ranges before reproducing pnpm packs.
node tools/pin-workspace-ranges.mjs --write
for pkg in core mod-sdk content; do
  pnpm --dir "packages/$pkg" pack --pack-destination "$artifact_root/tarballs" > "$artifact_root/pack-$pkg.log"
done
(cd "$artifact_root/tarballs" && sha256sum *.tgz > ../SHA256SUMS)
