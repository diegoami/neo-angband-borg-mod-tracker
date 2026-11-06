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
  core: "00b4f1ad5644e06fdd085be39a8c7da427143ae21497f83884fa077b6dc1047b",
  "mod-sdk": "9f628c0103ff51c48787982353f5a6c28c4b15e77d93b85bcc17c39a9c6916d6",
  content: "50339f37ba3d71d2ca9e8f4215c9f5b33509266fa9770216b913491c16a6979a",
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
  source: "f576b099b18e0016e0827e43a5770a369f53e279",
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
console.log(`Exact-source port gate passed; source engine f576b099b18e0016e0827e43a5770a369f53e279; receipts ${receipt}`);
