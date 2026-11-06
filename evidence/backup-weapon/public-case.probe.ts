import { beforeAll, afterAll, it, expect } from "vitest";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { AgentView, ItemView, StoreView } from "@rpgm-tools/neo-angband-core";
import type { KnownItem } from "@rpgm-tools/neo-angband-mod-sdk";
import { itemAnalyzer, type ItemAnalyzer } from "../../src/api2/records.js";
import { itemView } from "../../src/api2/world.js";
import { makeScenarioView, makeFakeActions } from "../../src/harness.js";
import { BorgWorld } from "../../src/world/model.js";
import { borgNotice } from "../../src/trait/trait.js";
import { borgPower } from "../../src/trait/power.js";
import { perceive, makePerceiveMemo } from "../../src/perceive.js";
import { makeBorgRng } from "../../src/rng.js";
import { makeCoreResolvers } from "../../src/resolvers.js";
import { buildThinkSession, buildStoreDeps, primeSession } from "../../src/think-session.js";
import { borgThinkHomeBuySwapWeapon, borgThinkShopBuy } from "../../src/store/buy.js";
import { borgUsesSwaps, borgInventoryFull, isAware, isIdent } from "../../src/store/store.js";
import { BI } from "../../src/trait/trait-index.js";
import { TV } from "../../src/item/svals.js";
import type { BorgContext } from "../../src/context.js";
const root=dirname(createRequire(import.meta.url).resolve("@rpgm-tools/neo-angband-content/pack/constants.json"));
const rec=(name:string)=>JSON.parse(readFileSync(join(root,name+".json"),"utf8")).records;
let analyze:ItemAnalyzer;
const evidence:any={fork:"223f6d4c0734429e5334f6a046c39a469dae0afa",reference:"C4.2.6 f3082213/current e473720",cases:[]};
beforeAll(async()=>{analyze=await itemAnalyzer({content:{records:async(name:string)=>({ok:true,value:rec(name)})}} as never);});
function weapon(name:string,handle:number):ItemView{
 const a=rec("artifact").find((x:any)=>x.name===name);
 const kind=rec("object").findIndex((x:any)=>x.name.replace(/^& /,"").replace(/~/g,"")===a["base-object"].sval);
 const dice=/^(\d+)d(\d+)$/.exec(a.attack.hd)!;
 const values=(a.values??[]).join("|").split("|").map((x:string)=>x.trim());
 const modifiers:any[]=[],resists:any[]=[];
 for(const value of values){const m=/^(\w+)\[(-?\d+)\]$/.exec(value);if(!m)continue;if(m[1].startsWith("RES_"))resists.push({element:m[1].slice(4),level:Number(m[2])});else modifiers.push({code:m[1],value:Number(m[2])});}
 return itemView({handle,kindKey:`kind:${kind}`,aware:true,nameColor:"",label:`known ${a['base-object'].sval} ${name}`,baseName:a['base-object'].sval,carried:handle!==0,tval:a['base-object'].tval==='sword'?TV.SWORD:TV.POLEARM,sval:1,pval:0,number:1,weight:a.weight,ac:0,toA:0,toH:a.attack['to-h'],toD:a.attack['to-d'],dd:Number(dice[1]),ds:Number(dice[2]),ego:false,artifact:true,flags:(a.flags??[]).flatMap((x:string)=>x.split('|').map(y=>y.trim())),modifiers,brands:a.brand??[],slays:a.slay??[],resists,curses:[],egoName:null,artifactName:name,activation:false,charging:0,inscription:null,unknownRunes:false,value:a.cost} as KnownItem,analyze);
}
function scene({carry=false,home=true,maxDepth=60,usesSwaps=true}={}){
 const main=weapon("of Pain",1),candidate=weapon("of Éowyn",carry?2:0);
 const base=makeScenarioView({player:{cls:"Warrior",race:"Human",depth:0,maxDepth,level:40,maxLevel:40,hp:500,maxHp:500,sp:0,maxSp:0,stats:[118,118,118,118,118],blows:400,toHit:20,toDam:10,light:2,grid:{x:10,y:10}}});
 const shops=Array.from({length:8},(_,feat):StoreView=>({feat,featName:feat===7?"Your Home":"shop",isHome:feat===7,owner:{name:"keeper",purse:30000},stock:feat===7&&home?[{...candidate,index:0}]:[]}));
 const equip=Array<ItemView|null>(12).fill(null);equip[0]=main;
 const view:AgentView={...base,inventory:()=>carry?[candidate]:[],equipment:()=>equip,stores:()=>shops};
 const ctx:BorgContext={view,world:new BorgWorld(),act:makeFakeActions(),rng:makeBorgRng(1)};
 borgNotice(ctx);perceive(ctx.world,view,makePerceiveMemo());borgPower(ctx);
 ctx.world.self.goal.shop=-1;ctx.world.self.goal.ware=-1;ctx.world.self.goal.item=-1;ctx.world.self.goal.doBest=false;
 let queries=0;
 const resolvers=makeCoreResolvers({}),original=resolvers.loadoutPower!;
 resolvers.loadoutPower=(c,change)=>{queries++;return original(c,change);};
 const session=buildThinkSession(resolvers);primeSession(session,ctx);
 const deps={...buildStoreDeps(session),usesSwaps};
 return{ctx,deps,candidate,queries:()=>queries};
}
it("maps an actual legal known artifact and eligible public HOME context",()=>{
 const s=scene();
 const data={name:s.candidate.artifactName,stats:s.candidate,maxDepth:s.ctx.world.self.trait[BI.MAXDEPTH],nether:s.ctx.world.self.trait[BI.RNTHR],aware:isAware(s.candidate,s.deps),identified:isIdent(s.candidate,s.deps),usesSwaps:borgUsesSwaps(s.ctx,s.deps),packFull:borgInventoryFull(s.ctx,s.deps),evaluator:typeof s.deps.weaponSwapEval};evidence.mapping=data;
 evidence.cInputs=Object.fromEntries(["MAXDEPTH","BLOWS","TOHIT","TODAM","RNTHR","RCOLD","RDARK","RFEAR","WS_ANIMAL","WS_EVIL","WS_UNDEAD","WS_GIANT","WB_ELEC"].map(k=>[k,s.ctx.world.self.trait[(BI as any)[k]]]));
 evidence.cEligibility={aware:data.aware,wearableWeapon:true,quantity:s.candidate.number,ordinaryWeaponDepthFloor:data.maxDepth>=50,usesSwaps:data.usesSwaps,capacityAvailable:!data.packFull,curses:s.candidate.curses,aggravate:s.candidate.flags.includes("AGGRAVATE"),unknownRunes:(s.candidate as any).unknownRunes,netherMissing:data.nether===0,netherTermsOnly:105500,exactTotalNotClaimed:true};
 expect(data.maxDepth).toBe(60);expect(data.nether).toBe(0);expect(data.aware).toBe(true);expect(data.identified).toBe(true);expect(data.usesSwaps).toBe(true);expect(data.packFull).toBe(false);expect(s.candidate.resists).toContainEqual({element:"NETHER",level:1});
});
it("C-qualified HOME backup should select its retrieval goal (current omission before-case)",()=>{
 const s=scene();const selected=borgThinkHomeBuySwapWeapon(s.ctx,s.deps);const action=selected?borgThinkShopBuy(s.ctx,7,s.deps):null;
 evidence.cases.push({name:"home-qualified",selected,goal:{...s.ctx.world.self.goal},action,normalLoadoutQueries:s.queries(),currentPower:s.ctx.world.self.power,expectedNetherScoreTerms:105500});
 expect(selected).toBe(true);expect(action).toMatchObject({code:"home-get",args:{index:0}});
});
it("carrying a C-qualified weapon backup should add the missing C backup benefit (before-case)",()=>{
 const base=scene({home:false}),carried=scene({carry:true,home:false});
 const delta=carried.ctx.world.self.power-base.ctx.world.self.power;
 evidence.cases.push({name:"carried-qualified",basePower:base.ctx.world.self.power,carriedPower:carried.ctx.world.self.power,delta,netherTerms:105500,rawCNoneSentinel:-1});
 expect(delta).toBeGreaterThan(100000);
});
it("preserves existing option/depth and empty-home controls",()=>{
 expect(borgUsesSwaps(scene({usesSwaps:false}).ctx,{usesSwaps:false})).toBe(false);
 expect(borgUsesSwaps(scene({maxDepth:90}).ctx)).toBe(false);
 const s=scene({home:false});expect(borgThinkHomeBuySwapWeapon(s.ctx,s.deps)).toBe(false);
 evidence.controls={disabled:false,depth90:false,emptyHome:false};
});
afterAll(()=>writeFileSync("/tmp/neo-borg-backup-public-evidence.json",JSON.stringify(evidence,null,2)));
