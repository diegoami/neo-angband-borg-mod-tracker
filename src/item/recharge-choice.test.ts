/**
 * borg_recharging (borg-item-use.c:1182) chooses the wand or staff, then reads,
 * casts or activates Recharging and presses that item's letter. The port records
 * the chosen item so the game's "recharge which item?" prompt is answered (#85).
 */

import { describe, expect, it } from "vitest";
import type { ItemView } from "@rpgm-tools/neo-angband-core";
import { BorgWorld } from "../world/model.js";
import { makeScenarioView, makeFakeActions } from "../harness.js";
import { makeBorgRng } from "../rng.js";
import type { BorgContext } from "../context.js";
import { BI } from "../trait/trait-index.js";
import { TV, SVAL } from "./svals.js";
import { borgRecharging } from "./item-use.js";

const view = (over: Partial<ItemView> & { handle: number; tval: number }): ItemView => ({
  kindKey: "", aware: true, nameColor: "", label: "item", sval: 1, pval: 0, number: 1, weight: 10, ac: 0, toA: 0, toH: 0, toD: 0,
  dd: 0, ds: 0, ego: false, artifact: false, flags: [], modifiers: [], brands: [], slays: [], resists: [], curses: [], timeout: 0, ...over,
} as unknown as ItemView);

function carrying(items: ItemView[]): BorgContext {
  const base = makeScenarioView();
  const ctx: BorgContext = { world: new BorgWorld(), view: { ...base, inventory: () => items }, act: makeFakeActions(), rng: makeBorgRng() };
  ctx.world.self.trait[BI.LIGHT] = 1;
  return ctx;
}

describe("borg_recharging remembers the item it recharges (#85)", () => {
  const scroll = view({ handle: 4, tval: TV.SCROLL, sval: SVAL.scroll.recharging! });

  it("reads Recharging for an empty wand and records that wand", () => {
    const ctx = carrying([view({ handle: 7, tval: TV.WAND, pval: 0 }), scroll]);
    expect(borgRecharging(ctx)).toMatchObject({ code: "read", args: { handle: 4 } });
    expect(ctx.world.itemChoice).toBe(7);
  });

  it("control: a charged wand needs nothing and chooses nothing", () => {
    const ctx = carrying([view({ handle: 7, tval: TV.WAND, pval: 5 }), scroll]);
    expect(borgRecharging(ctx)).toBeNull();
    expect(ctx.world.itemChoice).toBeNull();
  });
});
