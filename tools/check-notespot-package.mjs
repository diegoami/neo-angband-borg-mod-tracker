#!/usr/bin/env node
/** FORK: package-boundary control for carried engine #4 / upstream #429.
 * Source: engine19ff25ea set-feat-memory tests. Reads installed exports only;
 * no extra view/memory update may conceal a missing live setFeat hook.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import * as Core from "@rpgm-tools/neo-angband-core";
const root = dirname(createRequire(import.meta.url).resolve("@rpgm-tools/neo-angband-content/pack/constants.json"));
const json = (name) => JSON.parse(readFileSync(join(root, `${name}.json`), "utf8"));
const records = (name) => json(name).records;
const fields = (mapping, load) => Object.fromEntries(Object.entries(mapping).map(([name, file]) => [name, load(file)]));
const pack = {
  constants: json("constants"),
  ...fields({ terrain: "terrain", roomTemplates: "room_template", vaults: "vault", dungeonProfiles: "dungeon_profile", projection: "projection", trap: "trap", names: "names", quest: "quest" }, records),
  obj: fields({ objectBase: "object_base", object: "object", egoItem: "ego_item", artifact: "artifact", curse: "curse", brand: "brand", slay: "slay", activation: "activation", objectProperty: "object_property", flavor: "flavor" }, json),
  mon: fields({ pain: "pain", blowMethods: "blow_methods", blowEffects: "blow_effects", monsterSpells: "monster_spell", monsterBases: "monster_base", monsters: "monster", summons: "summon", pits: "pit" }, records),
  player: fields({ races: "p_race", classes: "class", properties: "player_property", timed: "player_timed", shapes: "shape", bodies: "body", history: "history", realms: "realm" }, records),
};
const { state } = Core.startGame(pack, { seed: 1, depth: 0 });
const player = state.actor.grid;
const grid = { x: player.x > 3 ? player.x - 2 : player.x + 2, y: player.y };
const checks = [];
function check(name, fn) {
  try { fn(); checks.push({ name, pass: true }); }
  catch (error) { checks.push({ name, pass: false, error: error.message }); }
}
check("seen change updates remembered terrain immediately", () => {
  state.chunk.setFeat(grid, Core.FEAT.CLOSED);
  Core.squareMemorize(state, grid);
  state.chunk.sqinfoOn(grid, Core.SQUARE.SEEN);
  state.chunk.setFeat(grid, Core.FEAT.OPEN);
  assert.equal(Core.knownFeat(state, grid), Core.FEAT.OPEN);
});
check("unseen remote change preserves prior memory", () => {
  state.chunk.sqinfoOff(grid, Core.SQUARE.SEEN);
  const before = Core.knownFeat(state, grid);
  state.chunk.setFeat(grid, Core.FEAT.GRANITE);
  assert.equal(Core.knownFeat(state, grid), before);
});
check("player square updates without seen flag", () => {
  Core.squareMemorize(state, player);
  state.chunk.sqinfoOff(player, Core.SQUARE.SEEN);
  state.chunk.setFeat(player, Core.FEAT.OPEN);
  assert.equal(Core.knownFeat(state, player), Core.FEAT.OPEN);
});
check("generation without live hook does not memorize", () => {
  const hook = state.chunk.onFeatSet;
  state.chunk.onFeatSet = undefined;
  state.chunk.sqinfoOn(grid, Core.SQUARE.SEEN);
  const before = Core.knownFeat(state, grid);
  try { state.chunk.setFeat(grid, Core.FEAT.CLOSED); }
  finally { state.chunk.onFeatSet = hook; }
  assert.equal(Core.knownFeat(state, grid), before);
});
console.log(JSON.stringify({ package: createRequire(import.meta.url)("@rpgm-tools/neo-angband-core/package.json").version, checks }, null, 2));
if (checks.some((item) => !item.pass)) process.exitCode = 1;
