/** FORK: explicit Node controls; filename deliberately excluded from Vitest discovery. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, chmodSync, symlinkSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { classifyPaths, classifyEvent, assertFullSuite, assertGate, validateTriggers } from "./ci-profile.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
const ci = readFileSync(join(root, ".github/workflows/ci.yml"), "utf8");
const source = readFileSync(join(root, ".github/workflows/notespot-source.yml"), "utf8");
const expectProfile = (paths, profile) => assert.equal(classifyPaths(paths).profile, profile);
test("audited prose and inert run receipts use real docs contracts", () => {
  expectProfile(["README.md", "docs/README.md", "CHANGELOG.md", "docs/runs/new/README.md", "docs/runs/new/gate.log", "docs/runs/new/gate.exit", "docs/runs/new/package.json.txt"], "docs");
  assert.match(ci, /pnpm exec vitest run docs-sync\.test\.ts version-sync\.test\.ts/);
});
for (const path of ["plugin.ts", "src/play.test.ts", "package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "patches/engine-notespot/README.md", ".github/workflows/ci.yml", "tools/ci-profile.mjs", "tools/build-notespot-artifacts.sh", "docs/runs/new/result.json", "docs/runs/new/control.py", "docs/runs/new/repro.sh", "docs/fixtures/input.md", "docs/fixture.json", "docs/new-unknown.md", "new-config", "docs/img/borg-autoplay.jpg"]) {
  test(`${path} keeps ordinary and source full gates`, () => {
    const result = classifyPaths(["README.md", path]);
    assert.equal(result.full, true);
    assert.equal(result.source, true);
  });
}
test("empty, unavailable and malformed paths fail safe", () => {
  for (const paths of [[], undefined, ["../README.md"], ["docs//README.md"], ["docs\\README.md"], [null]]) expectProfile(paths, "full");
});
test("manual and unsupported or malformed events do not silently choose docs", () => {
  for (const [name, event] of [["workflow_dispatch", {}], ["issues", {}], ["issue_comment", {}], ["push", {ref:"refs/heads/topic"}], ["pull_request", {}], ["pull_request", {pull_request:{base:{sha:"$(false)"},head:{sha:"f".repeat(40)}}}]]) assert.equal(classifyEvent(name, event).full, true);
});
function fixture(run) {
  const cwd = mkdtempSync(join(tmpdir(), "port-ci-routing-"));
  const git = (...args) => execFileSync("git", args, {cwd, encoding:"utf8", stdio:["ignore","pipe","pipe"]}).trim();
  const put = (path, text) => { mkdirSync(join(cwd, path, ".."), {recursive:true}); writeFileSync(join(cwd,path),text); };
  const commit = () => { git("add", "."); git("-c","user.name=CI Fixture","-c","user.email=ci@example.invalid","commit","-m","fixture"); return git("rev-parse","HEAD"); };
  try { git("init","-b","master"); git("config","core.fileMode","true"); git("config","core.hooksPath",join(cwd,"empty-hooks")); put("README.md","base\n"); const base=commit(); run({cwd,git,put,commit,base}); }
  finally { rmSync(cwd,{recursive:true,force:true}); }
}
test("PR merge-base diff excludes unrelated default-branch movement", () => fixture(({cwd,git,put,commit,base}) => {
  git("checkout","-b","topic"); put("README.md","prose\n"); const head=commit();
  git("checkout","master"); put("src/unrelated.ts","export {};\n"); const currentBase=commit();
  assert.notEqual(base,currentBase);
  const event={pull_request:{base:{sha:currentBase},head:{sha:head}}};
  assert.equal(classifyEvent("pull_request",event,cwd).profile,"docs");
}));
test("default push diffs and code-to-doc renames cannot hide source changes", () => fixture(({cwd,git,put,commit,base}) => {
  put("README.md","edited\n"); const docs=commit();
  assert.equal(classifyEvent("push",{ref:"refs/heads/master",before:base,after:docs},cwd).profile,"docs");
  put("src/fixture.json","{}\n"); const code=commit();
  mkdirSync(join(cwd,"docs/runs/new"),{recursive:true});
  assert.equal(classifyPaths(["docs/runs/new/result.txt"]).profile,"docs");
  git("mv","src/fixture.json","docs/runs/new/result.txt"); const renamed=commit();
  assert.equal(classifyEvent("pull_request",{pull_request:{base:{sha:code},head:{sha:renamed}}},cwd).profile,"full");
  assert.equal(classifyEvent("push",{ref:"refs/heads/master",before:docs,after:code},cwd).profile,"full");
}));
for (const kind of ["binary", "mode", "symlink"]) test(`${kind} documentation changes remain full`, () => fixture(({cwd,put,commit,base}) => {
  if (kind === "binary") put("README.md",Buffer.from([0,1,2,0,255]));
  else if (kind === "mode") chmodSync(join(cwd,"README.md"),0o755);
  else { unlinkSync(join(cwd,"README.md")); symlinkSync("missing",join(cwd,"README.md")); }
  const head=commit();
  assert.equal(classifyEvent("push",{ref:"refs/heads/master",before:base,after:head},cwd).profile,"full");
}));
test("unavailable git objects and empty commit diffs stay full", () => fixture(({cwd,base}) => {
  for (const head of [base,"f".repeat(40),"0".repeat(40)]) assert.equal(classifyEvent("push",{ref:"refs/heads/master",before:base,after:head},cwd).profile,"full");
}));
test("CLI writes complete boolean outputs on an actual git diff", () => fixture(({cwd,put,commit,base}) => {
  put("README.md","docs\n"); const head=commit(); const event=join(cwd,"event.json"),output=join(cwd,"output");
  writeFileSync(event,JSON.stringify({ref:"refs/heads/master",before:base,after:head}));
  execFileSync(process.execPath,[join(root,"tools/ci-profile.mjs")],{cwd,env:{...process.env,GITHUB_EVENT_NAME:"push",GITHUB_EVENT_PATH:event,GITHUB_OUTPUT:output,GITHUB_STEP_SUMMARY:join(cwd,"summary")},stdio:"pipe"});
  assert.equal(readFileSync(output,"utf8"),"profile=docs\nfull=false\nsource=false\n");
}));
test("one automatic workflow preserves PR/master/manual triggers and concurrency", () => {
  validateTriggers(ci,"ci"); validateTriggers(source,"source");
  assert.deepEqual(readdirSync(join(root,".github/workflows")).sort(),["ci.yml","dependabot-automerge.yml","github-release.yml","nexus-publish.yml","notespot-source.yml","push-scan.yml","redirect-issue.yml"]);
  assert.equal(existsSync(join(root,".github/workflows/privacy.yml")),false);
  assert.equal(existsSync(join(root,".github/workflows/fork-session-docs.yml")),false);
  assert.match(ci,/uses: neostryder\/neo-angband\/\.github\/actions\/private-scan@master/);
  assert.match(ci,/if: always\(\)/);
  assert.match(ci,/needs: \[profile, checks, scan, exact-source\]/);
  assert.match(ci,/if: needs\.profile\.outputs\.source == 'true'/);
  assert.match(ci,/uses: \.\/\.github\/workflows\/notespot-source\.yml/);
  assert.match(ci,/pnpm verify \| tee/);
  assert.match(ci,/--verify-log/);
});
test("trigger negative controls reject duplicates, issue events and bypasses", () => {
  for (const broken of [ci.replace('"branches":["master"]','"branches":["**"]'),ci.replace('"pull_request":{}','"pull_request":{"paths-ignore":["docs/**"]}'),ci.replace('"workflow_dispatch":{}','"issue_comment":{}'),ci.replace('cancel-in-progress:','cancel-disabled:')]) assert.throws(()=>validateTriggers(broken,"ci"));
  assert.throws(()=>validateTriggers(source.replace('"workflow_call":{}','"pull_request":{}'),"source"));
});
const needs = (profile) => ({profile:{result:"success",outputs:{profile,full:String(profile==="full"),source:String(profile==="full")}},checks:{result:"success"},scan:{result:"success"},"exact-source":{result:profile==="full"?"success":"skipped"}});
test("stable final gate accepts only complete matching profiles", () => {
  assertGate(needs("docs")); assertGate(needs("full"));
  for (const name of ["profile","checks","scan","exact-source"]) {
    for (const result of ["failure","cancelled","skipped"]) { const n=needs("full"); n[name].result=result; assert.throws(()=>assertGate(n)); }
  }
  const missing=needs("docs"); missing.profile.outputs={}; assert.throws(()=>assertGate(missing));
  const inconsistent=needs("docs"); inconsistent.profile.outputs.source="true"; assert.throws(()=>assertGate(inconsistent));
  const unexpected=needs("docs"); unexpected["exact-source"].result="success"; assert.throws(()=>assertGate(unexpected));
});
test("ordinary and exact-source shared logs reject missing cases, failures and any skips", () => {
  assertFullSuite("Tests 1194 passed (1194)\n");
  for (const text of ["Tests 830 passed | 36 skipped (866)","Tests 862 passed | 4 failed (866)","Tests 866 passed (866)","Tests 896 passed (896)","Tests 924 passed (924)","Tests 932 passed (932)","Tests 951 passed (951)","Tests 954 passed (954)","Tests 994 passed (994)","Tests 1000 passed (1000)","Tests 1056 passed (1056)","Tests 1074 passed (1074)","Tests 1079 passed (1079)","Tests 1156 passed (1156)","Tests 1163 passed (1163)","Tests 1164 passed (1164)","Tests 1165 passed (1165)","Tests 1170 passed (1170)","Tests 1194 passed (1194)\n1 skipped","Tests 1194 passed | 1 failed (1195)", "Tests 5 passed (5)", ""]) assert.throws(()=>assertFullSuite(text));
});
