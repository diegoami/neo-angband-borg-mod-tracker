import test from 'node:test';
import assert from 'node:assert/strict';
import { aggregate,render } from './report.mjs';
import { loadSuite,shardCases } from './suite.mjs';
const suite=loadSuite(new URL('./suites/smoke-v1.json',import.meta.url));
const row=c=>({...c,suite:suite.id,outcome:'death',turn:42,level:1,maxDepth:1,cause:'a rat | <tag> `text`'});
test('shards partition the frozen suite exactly once',()=>{
 assert.deepEqual(Array.from({length:4},(_,i)=>shardCases(suite,i,4)).flat().map(c=>c.id).sort(),suite.cases.map(c=>c.id).sort());
 assert.throws(()=>shardCases(suite,4,4));
});
test('missing cells are counted as failures rather than dropped',()=>{
 const report=aggregate(suite,[row(suite.cases[0])]);assert.equal(report.assigned,18);assert.equal(report.recorded,1);assert.equal(report.counts.death,1);assert.equal(report.counts.harness_failure,17);
});
test('duplicate and wrong-birth rows cannot create successful coverage',()=>{
 const a=row(suite.cases[0]);const r=aggregate(suite,[a,a,{...row(suite.cases[1]),race:'wrong'}]);assert.equal(r.recorded,1);assert.equal(r.errors.length,2);
});
test('death, timeout, stall and cap remain distinct with reproduction details',()=>{
 const rows=suite.cases.map(row);rows[1].outcome='wall_timeout';rows[2].outcome='stalled';rows[3].outcome='turn_cap';const r=aggregate(suite,rows);
 assert.equal(r.counts.death,15);assert.equal(r.counts.wall_timeout,1);assert.equal(r.counts.stalled,1);assert.equal(r.counts.turn_cap,1);const md=render(r);assert.match(md,/--seed 3000/);assert.match(md,/--birth-profile c-seeded-point-buy-v2/);assert.ok(!md.includes('<tag>'));
});
