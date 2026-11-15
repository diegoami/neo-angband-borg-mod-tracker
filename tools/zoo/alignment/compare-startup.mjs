// FORK: compare independently recorded native and Neo initial states.
// Normalizations are representation-only: native body-slot-count means pack;
// C's dormant quick RNG value is separate from its active 32-word game stream.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const manifestPath = resolve(process.argv[2]);
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const base = dirname(manifestPath);
const rows = [];
for (const pair of manifest.cases) {
  const lines = readFileSync(resolve(base,pair.native,'trace.txt'),'utf8').split('\n');
  const one = prefix => JSON.parse(lines.find(s=>s.startsWith(prefix)).slice(prefix.length));
  const birth = one('ALIGN_BIRTH '), terrain = one('ALIGN_TERRAIN ');
  const rngs = lines.filter(s=>s.startsWith('ALIGN_RNG ')).map(s=>JSON.parse(s.slice(10)));
  const world = rngs.find(s=>s.stage==='world-ready');
  const borg = rngs.find(s=>s.stage==='borg-ready');
  const neo = readFileSync(resolve(base,pair.neo,'states.jsonl'),'utf8').trim().split('\n').map(s=>JSON.parse(s));
  const start=neo.find(s=>s.kind==='alignment'), active=neo.find(s=>s.kind==='alignment-active');
  const checks = {};
  const check=(name,a,b)=>{try{assert.deepEqual(a,b);checks[name]=true;}catch{checks[name]=false;}};
  for (const name of ['race','class','stats','gold','hp','maxHp','sp','maxSp'])check(name,birth[name],start.birth[name]);
  check('grid',birth.grid,[start.birth.grid.x,start.birth.grid.y]);
  const fields=['tval','sval','number','weight','slot','timeout','dd','ds','toH','toD','toA'];
  const gear=(items,native)=>items.map(i=>Object.fromEntries(fields.map(k=>[k,k==='slot'&&native&&i[k]===pair.bodySlots?-1:i[k]])));
  check('gear',gear(birth.inventory,true),gear(start.birth.inventory,false));
  check('terrain',terrain,start.terrain);
  check('worldRng',{state:world.state,stateI:world.stateI,quick:world.quick},{state:start.worldRng.state,stateI:start.worldRng.stateI,quick:start.worldRng.quick});
  check('borgSeed',borg.value,active.seededBorgSeed);
  // Compare the underlying game stream after the single Borg startup seed draw.
  check('postSeedGameStream',[borg.state,borg.stateI],[active.worldRng.state,active.worldRng.stateI]);
  rows.push({seed:pair.seed,race:birth.race,class:birth.class,checks,pass:Object.values(checks).every(Boolean)});
}
console.log(JSON.stringify({schema:'c-neo-startup-comparison@1',cases:rows,pass:rows.every(r=>r.pass)},null,2));
if(rows.some(r=>!r.pass))process.exitCode=1;
