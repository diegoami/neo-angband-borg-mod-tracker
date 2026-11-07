/** Frozen selected-backup globals from borg-trait-swap.c; no hidden object reads. */
import type { ItemView } from "@rpgm-tools/neo-angband-core";
import type { BorgContext } from "../context.js";
import type { BorgDerived } from "./state.js";
import type { BorgSpellSeam } from "./config.js";
import { BI } from "./trait-index.js";
import { hasFlag, resLevel } from "./item-util.js";
import { Spell, borgSpellLegalFail } from "../item/magic.js";
export type BackupCaps = Readonly<Partial<Record<BI, boolean>>>;
export const noBackupCaps = (): BackupCaps => Object.freeze({});
export function backupCaps(item: ItemView | undefined, weapon: boolean): BackupCaps {
  if (!item) return noBackupCaps();
  const caps: Partial<Record<BI, boolean>> = {};
  for (const [sr, element] of [[BI.SRACID, weapon ? "ELEC" : "ACID"], [BI.SRELEC,"ELEC"], [BI.SRFIRE,"FIRE"], [BI.SRCOLD,"COLD"],
    [BI.SRPOIS,"POIS"], [BI.SRLITE,"LIGHT"], [BI.SRDARK,"DARK"], [BI.SRSND,"SOUND"], [BI.SRSHRD,"SHARD"],
    [BI.SRNXUS,"NEXUS"], [BI.SRNTHR,"NETHER"], [BI.SRKAOS,"CHAOS"], [BI.SRDIS,"DISEN"]] as const) caps[sr] = resLevel(item,element)>0;
  // Preserve the C weapon acid-tail ELEC lookup. Both backup fear flags are never populated.
  for (const [sr,flag] of [[BI.SRBLIND,"PROT_BLIND"], [BI.SRCONF,"PROT_CONF"], [BI.SHLIFE,"HOLD_LIFE"], [BI.SFRACT,"FREE_ACT"]] as const)
    caps[sr]=hasFlag(item,flag);
  return Object.freeze(caps);
}
/** C folds after both full selectors, or their FALSE-retained globals. */
export function foldBackupCaps(ctx: BorgContext, d: BorgDerived, spells?: BorgSpellSeam): void {
  const t=ctx.world.self.trait;
  const legal=(name:"RESISTANCE"|"RESIST_POISON") => spells ? spells.spellLegalFail(name,15) : borgSpellLegalFail(ctx,Spell[name],15);
  const resist=legal("RESISTANCE"), poison=legal("RESIST_POISON");
  for (const [sr,base] of [[BI.SRACID,BI.RACID],[BI.SRELEC,BI.RELEC],[BI.SRFIRE,BI.RFIRE],[BI.SRCOLD,BI.RCOLD],
    [BI.SRPOIS,BI.RPOIS],[BI.SRFEAR,BI.RFEAR],[BI.SRLITE,BI.RLITE],[BI.SRDARK,BI.RDARK],[BI.SRBLIND,BI.RBLIND],
    [BI.SRCONF,BI.RCONF],[BI.SRSND,BI.RSND],[BI.SRSHRD,BI.RSHRD],[BI.SRNXUS,BI.RNXUS],[BI.SRNTHR,BI.RNTHR],
    [BI.SRKAOS,BI.RKAOS],[BI.SRDIS,BI.RDIS],[BI.SHLIFE,BI.HLIFE],[BI.SFRACT,BI.FRACT]] as const) {
    const spell=sr===BI.SRPOIS ? poison : [BI.SRACID,BI.SRELEC,BI.SRFIRE,BI.SRCOLD].includes(sr) && resist;
    t[sr]=t[base] || d.weaponSwapCaps[sr] || d.armourSwapCaps[sr] || spell ? 1 : 0;
  }
}
