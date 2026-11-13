#!/usr/bin/env node
/** FORK: conservative CI routing; unknown paths/events/diffs keep both full gates. */
import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const prose = new Set([
  "AGENTS.md", "CLAUDE.md", "RULES.md", "PLAN.md", "README.md", "CONTRIBUTING.md",
  "SECURITY.md", "CODE_OF_CONDUCT.md", "AI_USAGE_POLICY.md", "LICENSE.md", "PLANNED.md",
  "CHANGELOG.md", "SETTINGS.md", "docs/README.md", "docs/API2-MIGRATION.md",
  "docs/SESSION.md", "docs/PATCHES.md", "docs/CI.md", "docs/upstream-reference/README.md",
  "docs/upstream-reference/PLANNED.md",
]);
const full = (reason, paths = []) => ({ profile: "full", full: true, source: true, reason, paths });
export function classifyPaths(paths) {
  if (!Array.isArray(paths) || paths.length === 0) return full("empty or unavailable diff");
  for (const path of paths) {
    if (typeof path !== "string" || path.includes("\\") || path.split("/").some((p) => !p || p === "." || p === "..")) return full("invalid path", paths);
    // Audit: receipt prose/logs/text snapshots are not imported by runtime/tests/tools.
    // Data and executable fixtures stay full even below docs/runs or docs/fixtures.
    const receipt = /^docs\/runs\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\.(md|log|exit|txt)$/.test(path);
    if (!prose.has(path) && !receipt) return full(`non-allowlisted path: ${path}`, paths);
  }
  return { profile: "docs", full: false, source: false, reason: "audited prose/inert receipts only; documentation contracts still run", paths };
}
export function classifyEvent(name, event, cwd = process.cwd()) {
  if (name === "workflow_dispatch") return full("manual full verification");
  let base, head;
  if (name === "pull_request") {
    base = event?.pull_request?.base?.sha;
    head = event?.pull_request?.head?.sha;
  } else if (name === "push" && event?.ref === "refs/heads/master") {
    base = event.before;
    head = event.after;
  } else return full("unsupported event/ref");
  if (![base, head].every((sha) => typeof sha === "string" && /^[a-f0-9]{40}$/.test(sha) && !/^0+$/.test(sha))) return full("missing or invalid immutable diff endpoints");
  try {
    const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    if (name === "pull_request") base = git("merge-base", base, head).trim();
    const summary = git("diff", "--no-renames", "--summary", base, head);
    if (/mode change|\bmode (?!100644)\d{6}/.test(summary)) return full("file type or mode change");
    const stats = git("diff", "--no-renames", "--numstat", "-z", base, head);
    if (stats.split("\0").some((row) => row.startsWith("-\t-\t"))) return full("binary diff");
    const names = git("diff", "--no-renames", "--name-only", "-z", base, head);
    return classifyPaths(names.split("\0").filter(Boolean));
  } catch { return full("git diff unavailable"); }
}
export function assertFullSuite(log) {
  const plain = log.replace(/\x1b\[[0-9;]*m/g, "");
  if (!/Tests\s+1061 passed \(1061\)/.test(plain) || /\d+ skipped/.test(plain)) throw new Error("Required full gate must execute all 1061 tests with zero skips");
}
export function assertGate(needs) {
  for (const name of ["profile", "checks", "scan"]) if (needs[name]?.result !== "success") throw new Error(`${name} did not succeed`);
  const profile = needs.profile.outputs;
  if (!["docs", "full"].includes(profile.profile) || profile.full !== String(profile.profile === "full") || profile.source !== profile.full) throw new Error("Invalid or inconsistent profile outputs");
  const required = profile.source === "true";
  if (needs["exact-source"]?.result !== (required ? "success" : "skipped")) throw new Error("Exact-source gate result disagrees with the required profile");
}
export function validateTriggers(text, kind) {
  const lines = text.split("\n").filter((line) => /^on:/.test(line));
  if (lines.length !== 1) throw new Error("Expected exactly one explicit JSON-compatible event mapping");
  const events = JSON.parse(lines[0].slice(3).trim());
  const expected = kind === "ci" ? ["pull_request", "push", "workflow_dispatch"] : ["workflow_call", "workflow_dispatch"];
  if (JSON.stringify(Object.keys(events).sort()) !== JSON.stringify(expected.sort())) throw new Error("Unexpected CI trigger");
  if (kind === "ci") {
    if (JSON.stringify(events.push) !== JSON.stringify({ branches: ["master"] })) throw new Error("Only default-master pushes may run CI");
    if (Object.keys(events.pull_request).length) throw new Error("PR paths/event filters must not bypass the final gate");
    if (!text.includes("group: ci-${{ github.event_name }}-${{ github.event.pull_request.number || github.ref }}") || !text.includes("cancel-in-progress: ${{ github.event_name != 'workflow_dispatch' }}")) throw new Error("Missing safe event/PR concurrency policy");
  }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === "--verify-log") assertFullSuite(readFileSync(process.argv[3], "utf8"));
  else if (process.argv[2] === "--gate") {
    const needs = JSON.parse(process.env.CI_NEEDS ?? "null");
    assertGate(needs);
    const profile = needs.profile.outputs.profile;
    const message = profile === "full"
      ? "Full profile passed: ordinary typecheck, package controls, all 1061 tests without skips, grants/plugin, privacy/session and exact-source compatibility."
      : "Docs profile passed: session, routing controls, privacy and real settings/version documentation contracts.";
    console.log(message);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, message + "\n");
  }
  else {
    let event;
    try { event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")); } catch { event = null; }
    const result = classifyEvent(process.env.GITHUB_EVENT_NAME, event);
    console.log(JSON.stringify(result, null, 2));
    if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `profile=${result.profile}\nfull=${result.full}\nsource=${result.source}\n`);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `CI profile: **${result.profile}**. ${result.reason}\n`);
  }
}
