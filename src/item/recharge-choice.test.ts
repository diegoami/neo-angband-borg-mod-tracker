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
import { borgEnchanting } from "./item-enchant.js";

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

describe("borg_recharging names the item it recharges (#85)", () => {
  const scroll = view({ handle: 4, tval: TV.SCROLL, sval: SVAL.scroll.recharging! });

  it("reads Recharging for an empty wand and records that wand", () => {
    const ctx = carrying([view({ handle: 7, tval: TV.WAND, pval: 0 }), scroll]);
    /* cmd_set_arg_item "tgtitem": the read carries the wand, so the game asks nothing. */
    expect(borgRecharging(ctx)).toEqual({ code: "read", args: { handle: 4, tgtitem: { handle: 7 } } });
    expect(ctx.world.itemChoice).toBe(7);
  });

  it("control: a charged wand needs nothing and chooses nothing", () => {
    const ctx = carrying([view({ handle: 7, tval: TV.WAND, pval: 5 }), scroll]);
    expect(borgRecharging(ctx)).toBeNull();
    expect(ctx.world.itemChoice).toBeNull();
  });
});

describe("enchanting names the item it enchants (borg-item-enchant.c, #85)", () => {
  it("reads Enchant Armour for the least enchanted armour, carrying it", () => {
    const body = view({ handle: 21, tval: TV.SOFT_ARMOR, ac: 8, toA: 2 });
    const boots = view({ handle: 22, tval: TV.BOOTS, ac: 2, toA: 0 });
    const scroll = view({ handle: 5, tval: TV.SCROLL, sval: SVAL.scroll.enchant_armor! });
    const base = makeScenarioView();
    const equipment: Array<ItemView | null> = Array(12).fill(null);
    equipment[6] = body;
    equipment[11] = boots;
    const ctx: BorgContext = { world: new BorgWorld(), view: { ...base, equipment: () => equipment, inventory: () => [scroll] }, act: makeFakeActions(), rng: makeBorgRng() };
    for (const [k, v] of [[BI.LIGHT, 1], [BI.NEED_ENCHANT_TO_A, 1], [BI.AENCH_ARM, 1]] as const) ctx.world.self.trait[k] = v;
    expect(borgEnchanting(ctx)).toEqual({ code: "read", args: { handle: 5, tgtitem: { handle: 22 } } });
  });
});

