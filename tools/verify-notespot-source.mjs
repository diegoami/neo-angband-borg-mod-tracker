#!/usr/bin/env node
/** FORK: exact-source consumer verification; never changes this checkout's dependencies. */
import { createHash } from "node:crypto";
import { execFileSync, spawn } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const artifacts = resolve(process.argv[2] ?? "");
if (!process.argv[2]) throw new Error("Usage: node tools/verify-notespot-source.mjs /path/to/engine-tarballs");
const tuple = {
  core: "a33bf9f1fa5dc32f32ad55ecf465490f187a7c247752e3a02453ed4a02da0130",
  "mod-sdk": "7e172c870a61679990413b24607efe9f966ca52caf21166d1bc50c582a1ccc0d",
  content: "cb407e8349a87a8c3658302c1646741a6d2545a0c06ea0bb3efbc5103e491e7c",
};
const files = Object.keys(tuple).map((name) => {
  const file = join(artifacts, `rpgm-tools-neo-angband-${name}-1.23.0-beta.2.tgz`);
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
run("pnpm", ["install", "--frozen-lockfile", "--store-dir", join(receipt, "store")]);
writeFileSync(join(tree, "pnpm-workspace.yaml"), readFileSync(join(tree, "pnpm-workspace.yaml"), "utf8") +
  `\n# FORK: transitive SDK must select the same exact artifact.\noverrides:\n  "@rpgm-tools/neo-angband-mod-sdk": ${JSON.stringify("file:" + files[1])}\n`);
run("pnpm", ["add", "-D", ...files, "--store-dir", join(receipt, "store")]);
run("node", ["tools/check-grants.mjs"]);
// Each runner coordinates with every engine/port/Mandos lane through the shared lock.
// The required verify chain remains typecheck -> complete suite -> plugin currency.
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
const plain = output.replace(/\x1b\[[0-9;]*m/g, "");
if (!/Tests\s+866 passed \(866\)/.test(plain) || /\d+ skipped/.test(plain)) {
  throw new Error(`Expected all 866 cases with zero skips; inspect ${receipt}`);
}
console.log(`Exact-source port gate passed; source engine 19ff25eac8997e8feb6b5e62eefa7ffe4d134631; receipts ${receipt}`);
