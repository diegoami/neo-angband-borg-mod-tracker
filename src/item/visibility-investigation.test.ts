import {readFileSync} from 'node:fs';
import {describe,it,expect} from 'vitest';
import * as Core from '@rpgm-tools/neo-angband-core';
import type {KnownWorldData} from '@rpgm-tools/neo-angband-mod-sdk';
import type {BorgContext} from '../context.js';
import {createBridge} from '../api2/host.js';
import {fakeGame} from '../harness-api2.js';
import {makeFakeActions} from '../harness.js';
import {registeredPack,records} from '../../test/fixtures/registered-items.js';
import {makeCoreResolvers} from '../resolvers.js';
import {BorgWorld} from '../world/model.js';
import {makeBorgRng} from '../rng.js';
import {borgNotice} from '../trait/trait.js';
import {perceive,makePerceiveMemo} from '../perceive.js';
import {contextSpellSeam} from '../trait/spell-seam.js';
import {BI} from '../trait/trait-index.js';
import {noLight} from './deps.js';
import {borgSpell,Spell} from './magic.js';
import {borgPlayMagic} from './magic-play.js';

const registration=Core.startGame(registeredPack(),{seed:441,depth:0,raceName:"Human",className:"Warrior"});
async function observation(known:KnownWorldData){
 const fake=fakeGame({engine:{api:'1',core:Core}});fake.mod.content.records=async name=>({ok:true,value:records(name)});
 fake.mod.content.boundRecords=async name=>({ok:true,value:name==="object"?registration.booted.registries.objects.kinds.map(kind=>({key:kind.name,name:kind.name,index:kind.kidx,tval:kind.tval,owner:"core"})):[]});
 fake.mod.view.world=async()=>({ok:true,value:known});
 const bridge=createBridge(fake.mod);await bridge.prime();const w=await bridge.readWorld();expect(w).not.toBeNull();
 const res=makeCoreResolvers(bridge.resolverInput());
 const ctx:BorgContext={world:new BorgWorld(),view:w!.view,act:makeFakeActions(),rng:makeBorgRng(1),bookKind:res.bookKind,spellEffect:res.spellEffect,frame:res.frame,spellSeam:c=>contextSpellSeam(c,res.resolveActivation)};
 borgNotice(ctx);perceive(ctx.world,ctx.view,makePerceiveMemo());
 return {ctx,bridge};
}
describe('recorded observation replay (no game loop)',()=>{
 for(const seed of ['1125182320','1211397579'])it('reports production guards for '+seed,async()=>{
  const known=JSON.parse(readFileSync(new URL('../../docs/investigations/no-light-2026-11-16/'+seed+'.json',import.meta.url),'utf8')) as KnownWorldData;
  const {ctx,bridge}=await observation(known);const p=ctx.view.player();const raw=known.level?.cells.find(c=>c.x===p.grid.x&&c.y===p.grid.y);
  const observed=({seed,light:ctx.world.self.trait[BI.LIGHT],blind:ctx.world.self.trait[BI.ISBLIND],study:ctx.world.self.trait[BI.ISSTUDY],sp:ctx.world.self.trait[BI.CURSP],rawCell:raw??null,cell:ctx.view.cell(p.grid.x,p.grid.y),noLight:noLight(ctx),cast:borgSpell(ctx,seed==='1125182320'?Spell.DETECT_MONSTERS:Spell.NETHER_BOLT),studyCommand:borgPlayMagic(ctx,true)});
  expect(observed.noLight).toBe(false);
  expect(observed.cast).toEqual({code:"cast",args:{spell:0}});
  if(seed==="1211397579") {expect(raw?.seen).toBe(false);expect(observed.light).toBe(1);}
  else expect(observed.studyCommand).toEqual({code:"study",args:{handle:6,spell:1}});
  await bridge.dispose();
 });
});

// A controlled visibility pair preserves every recorded player/item/spell field.
// This is an observation-boundary experiment, not a generated native scenario.
describe('current-square visibility control',()=>{
 for(const seen of [false,true])it('Nether Bolt with seen='+seen,async()=>{
  const known=JSON.parse(readFileSync(new URL('../../docs/investigations/no-light-2026-11-16/1211397579.json',import.meta.url),'utf8')) as KnownWorldData;
  const {x,y}=known.player!.grid;
  const cell=known.level!.cells.find(c=>c.x===x&&c.y===y)!;
  Object.assign(cell,{seen,lit:seen});
  const {ctx,bridge}=await observation(known);
  // C and the engine's command guard read !seen. The Borg ignores the pair.
  const cNoLight=!seen;
  expect(noLight(ctx)).toBe(false);
  expect(borgSpell(ctx,Spell.NETHER_BOLT)).toEqual({code:'cast',args:{spell:0}});
  expect(noLight(ctx)===cNoLight).toBe(seen);
  await bridge.dispose();
 });
});
// Opt-in prospective parity assertion: fails on the measured source.
it.runIf(process.env['VERIFY_C_VISIBILITY_PARITY']==='1')('matches C no_light on the recorded unseen square',async()=>{
 const known=JSON.parse(readFileSync(new URL('../../docs/investigations/no-light-2026-11-16/1211397579.json',import.meta.url),'utf8')) as KnownWorldData;
 const {ctx,bridge}=await observation(known);
 try {expect(noLight(ctx)).toBe(true);expect(borgSpell(ctx,Spell.NETHER_BOLT)).toBeNull();}
 finally {await bridge.dispose();}
});
