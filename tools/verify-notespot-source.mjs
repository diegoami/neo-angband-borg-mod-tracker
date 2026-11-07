#!/usr/bin/env node
/** FORK: exact-source consumer verification; never changes this checkout's dependencies. */
import { createHash } from "node:crypto";
import { execFileSync, spawn } from "node:child_process";
import { mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { assertFullSuite } from "./ci-profile.mjs";

const artifacts = resolve(process.argv[2] ?? "");
if (!process.argv[2]) throw new Error("Usage: node tools/verify-notespot-source.mjs /path/to/engine-tarballs");
const tuple = {
  core: "ab7a0adf00d05b5e4ce07ba34b6f2b8f22989a5da0ea45068c3bbc8444a7acdc",
  "mod-sdk": "6f70f63c4ac9376101b8a2158100d66f0e041795b38d0bdb204b923cdede6917",
  content: "eeec7c55a996fc5cc452b89eab99ae2342dada8450274a68c582f1cf308c6cfb",
};
const files = Object.keys(tuple).map((name) => {
  const file = join(artifacts, `rpgm-tools-neo-angband-${name}-1.23.0-beta.3.tgz`);
  if (createHash("sha256").update(readFileSync(file)).digest("hex") !== tuple[name]) {
    throw new Error(`Wrong engine artifact: ${file}`);
  }
  return file;
});
const root = fileURLToPath(new URL("../", import.meta.url));
const receipt = mkdtempSync(join(tmpdir(), "neo-borg-notespot-verify-"));
const tree = join(receipt, "source");
execFileSync("mkdir", [tree]);
const archive = execFileSync("git", ["archive", "HEAD"], { cwd: root, maxBuffer: 32 * 1024 * 1024 });
execFileSync("tar", ["-x", "-C", tree], { input: archive });
const run = (command, args) => execFileSync(command, args, { cwd: tree, stdio: "inherit", env: { ...process.env, NEO_ANGBAND_REPO: "", NEO_ANGBAND_LOCAL_CORE: "", CI: "1" } });
console.log(`Preserved verification tree/logs: ${receipt}`);
// The declared beta.3 profile has retired the beta.1 carry. Never apply or
// silently remove a patch while selecting a source compatibility profile.
const workspace = readFileSync(join(tree, "pnpm-workspace.yaml"), "utf8");
if (workspace.includes("@rpgm-tools/neo-angband-core@1.23.0-beta.1")) {
  throw new Error("Retired beta.1 patch must not be applied in the source profile");
}
if (/^overrides:/m.test(workspace)) {
  throw new Error("Existing overrides require an explicit source-profile reconciliation");
}
run("pnpm", ["install", "--frozen-lockfile", "--store-dir", join(receipt, "store")]);
writeFileSync(join(tree, "pnpm-workspace.yaml"), workspace +
  `\n# FORK: transitive SDK must select the same exact artifact.\noverrides:\n  "@rpgm-tools/neo-angband-mod-sdk": ${JSON.stringify("file:" + files[1])}\n`);
run("pnpm", ["add", "-D", ...files, "--store-dir", join(receipt, "store")]);
const fromTree = createRequire(join(tree, "package.json"));
const coreManifest = fromTree.resolve("@rpgm-tools/neo-angband-core/package.json");
const directSDK = fromTree.resolve("@rpgm-tools/neo-angband-mod-sdk/package.json");
const transitiveSDK = createRequire(coreManifest).resolve("@rpgm-tools/neo-angband-mod-sdk/package.json");
const graph = {
  core: JSON.parse(readFileSync(coreManifest, "utf8")).version,
  directSDK: JSON.parse(readFileSync(directSDK, "utf8")).version,
  transitiveSDK: JSON.parse(readFileSync(transitiveSDK, "utf8")).version,
  sameSDK: realpathSync(directSDK) === realpathSync(transitiveSDK),
};
if (graph.core !== "1.23.0-beta.3" || graph.directSDK !== "1.23.0-beta.3" ||
    graph.transitiveSDK !== "1.23.0-beta.3" || !graph.sameSDK) {
  throw new Error(`Incoherent source dependency graph: ${JSON.stringify(graph)}`);
}
writeFileSync(join(receipt, "profile.json"), JSON.stringify({
  source: "06a2321ce30a414df20d1b20d486446e7688171c",
  profile: "official06a-source-beta3",
  producerReceipt: "047f9a625b4d5c59a20f39daf7a0a2a955417e2d",
  artifacts: tuple, graph, sdkOverride: "exact checked SDK artifact",
}, null, 2) + "\n");
console.log(`Exact-source dependency graph: ${JSON.stringify(graph)}`);
run("node", ["tools/check-grants.mjs"]);
// Each runner coordinates with every engine/port/Mandos lane through the shared lock.
// Verify includes typecheck, installed-package controls, complete suite and plugin currency.
let output = "";
const code = await new Promise((resolveExit, reject) => {
  const child = spawn("flock", ["/tmp/angband-validation.lock", "pnpm", "verify"], {
    cwd: tree, env: { ...process.env, NEO_ANGBAND_REPO: "", NEO_ANGBAND_LOCAL_CORE: "", CI: "1", NO_COLOR: "1" },
  });
  for (const stream of [child.stdout, child.stderr]) stream.on("data", (data) => {
    output += data.toString();
    process.stdout.write(data);
    writeFileSync(join(receipt, "verify.log"), output);
  });
  child.on("error", reject);
  child.on("exit", resolveExit);
});
writeFileSync(join(receipt, "exit.json"), JSON.stringify({ code }) + "\n");
if (code !== 0) throw new Error(`Port verify failed: ${code}; ${receipt}`);
// Share the ordinary full-suite contract; added cases cannot leave a stale
// compatibility-only count that rejects a successful complete test run.
assertFullSuite(output);
console.log(`Exact-source port gate passed; source engine 06a2321ce30a414df20d1b20d486446e7688171c; receipts ${receipt}`);
