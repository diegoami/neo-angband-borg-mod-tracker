// FORK: count every assignment; missing/duplicate records cannot disappear.
import { readdirSync,readFileSync,mkdirSync,writeFileSync,appendFileSync,existsSync } from 'node:fs';
import { resolve,join,dirname,relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadSuite,flags } from './suite.mjs';
export function aggregate(suite,rows){
 const expected=new Map(suite.cases.map(c=>[c.id,c])),found=new Map(),errors=[];
 for(const row of rows){const c=expected.get(row.id);if(!['death','turn_cap','stalled','wall_timeout','decision_cap','borg_stopped','harness_failure','config_error'].includes(row.outcome)||!c||row.suite!==suite.id||row.seed!==c.seed||row.race!==c.race||row.class!==c.class||found.has(row.id)){errors.push(`Unexpected, duplicate or mismatched cell ${row.id}`);continue;}found.set(row.id,row);}
 const cells=suite.cases.map(c=>found.get(c.id)??{...c,suite:suite.id,outcome:'harness_failure',error:'Missing cell record'});
 const counts={};for(const c of cells)counts[c.outcome]=(counts[c.outcome]??0)+1;
 return {schema:'neo-headless-report@1',suite,assigned:cells.length,recorded:found.size,counts,errors,cells};
}
export function portableReport(report,root){return {...report,cells:report.cells.map(({evidencePath,...c})=>({...c,...(evidencePath?{evidencePath:relative(resolve(root),evidencePath)}:{})}))};}
const escape=s=>String(s??'').replace(/[|<>`\r\n\[\]()*!_#@]/g,' ');
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):e.name==='cells.json'?[join(dir,e.name)]:[]);}
export function render(report){
 let text=`# Headless Borg death report: ${report.suite.id}\n\nAssigned: ${report.assigned}; recorded: ${report.recorded}. Every assignment is counted.\n\nProfile: ${report.suite.birthProfile}; cap: ${report.suite.turns} game ticks; per-game watchdog: ${report.suite.wallSeconds} seconds.\n\n| Outcome | Count |\n| --- | ---: |\n`;
 for(const [k,n] of Object.entries(report.counts))text+=`| ${escape(k)} | ${n} |\n`;
 const deaths=report.counts.death??0,caps=report.counts.turn_cap??0;
 text+=`\nDeaths / assigned: ${deaths}/${report.assigned} (${(100*deaths/report.assigned).toFixed(2)}%). Deaths / death-or-cap endpoints: ${deaths}/${deaths+caps} (${deaths+caps?(100*deaths/(deaths+caps)).toFixed(2):'n/a'}%). All other outcomes remain in the assigned denominator.\n`;
 text+='\n## Deaths\n\n| Seed | Race | Class | Turn | Level | Max depth | Cause |\n| --- | --- | --- | ---: | ---: | ---: | --- |\n';
 for(const c of report.cells.filter(c=>c.outcome==='death'))text+=`| ${c.seed} | ${c.race} | ${c.class} | ${c.turn} | ${c.level} | ${c.maxDepth} | ${escape(c.cause)} |\n`;
 text+='\n## By class\n\n| Class | Assigned | Deaths | Caps | Other outcomes |\n| --- | ---: | ---: | ---: | ---: |\n';
 for(const cls of [...new Set(report.cells.map(c=>c.class))]){const cells=report.cells.filter(c=>c.class===cls),deaths=cells.filter(c=>c.outcome==='death').length,caps=cells.filter(c=>c.outcome==='turn_cap').length;text+=`| ${cls} | ${cells.length} | ${deaths} | ${caps} | ${cells.length-deaths-caps} |\n`;}
 const settings=report.cells.find(c=>c.settings)?.settings;
 if(settings)text+='\nMeasured Borg settings (raw run records retain the full birth/options observations):\n\n```json\n'+JSON.stringify(settings,null,2)+'\n```\n';
 text+='\n## Measurement limits\n\nBirth/profile and adapter choices are recorded in the suite and build identities. Seeded-v2 requests C recommended point buy/no-selling/native-menu and GCC coordinate adapters with an exact tick cap; ordinary-rolled-v1 uses engine-default rolled birth and the historical after-loop cap, which can overshoot. Engine behavior depends on the recorded commit; clock equivalence was unresolved in the historical measurements. These counts describe this cohort; they do not establish C parity or improvement over differently configured runs. Stalls, timeouts and harness/configuration failures remain separate outcomes.\n';
 if(report.errors.length)text+='\n## Recording errors\n\n'+report.errors.map(e=>`- ${escape(e)}`).join('\n')+'\n';
 const builds=[...new Map(report.cells.filter(c=>c.build).map(c=>[JSON.stringify(c.build),c.build])).values()];
 text+='\n## Source and bundle identities\n\n'+builds.map(b=>`- Engine: ${escape(b.engine.repository)} @ ${b.engine.commit}; Borg: ${escape(b.borg.repository)} @ ${b.borg.commit}; bundle SHA256: ${b.bundleSha256}; adapters: ${b.appliedPatches.join(', ')}.`).join('\n')+'\n';
 for(const c of report.cells.filter(c=>c.outcome==='death')){
  text+=`\n### Death ${c.id}: ${c.race} ${c.class}\n\nCause: ${escape(c.cause)}. Seed ${c.seed}, turn ${c.turn}, level ${c.level}, maximum depth ${c.maxDepth}.\n\nReproduce after extracting the build artifact:\n\n\`\`\`sh\nnode tools/zoo/run.mjs --bundle build/bundle.mjs --seed ${c.seed} --race '${c.race}' --class '${c.class}' ${report.suite.birthProfile==='ordinary-rolled-v1'?'':`--birth-profile ${report.suite.birthProfile}`} --turns ${report.suite.turns} --out rerun-${c.id}\n\`\`\`\n`;
  for(const [name,label] of [['messages.jsonl','Last messages'],['commands.jsonl','Last commands'],['states.jsonl','Last state observations']]){
   const f=c.evidencePath&&join(c.evidencePath,name);if(f&&existsSync(f)){
    // Bound the Markdown size; full unmodified JSONL remains in the artifact.
    const lines=readFileSync(f,'utf8').trim().split('\n').slice(-8).map(s=>escape(s).slice(0,1200));text+=`\n${label}:\n\n`+lines.map(s=>`- ${s}`).join('\n')+'\n';
   }
  }
 }
 return text;
}
if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url){
 const a=flags(process.argv.slice(2)),suite=loadSuite(resolve(a.suite)),rows=[];
 for(const file of walk(resolve(a.runs)))for(const c of JSON.parse(readFileSync(file,'utf8')))rows.push({...c,evidencePath:join(dirname(file),c.evidence)});
 const report=aggregate(suite,rows),out=resolve(a.out);mkdirSync(out,{recursive:true});const markdown=render(report);writeFileSync(join(out,'report.json'),JSON.stringify(portableReport(report,a.runs),null,2)+'\n');writeFileSync(join(out,'report.md'),markdown);
 if(process.env.GITHUB_STEP_SUMMARY)appendFileSync(process.env.GITHUB_STEP_SUMMARY,markdown.slice(0,900000));
 if(report.errors.length||report.recorded!==report.assigned||['harness_failure','config_error','wall_timeout'].some(k=>report.counts[k]))process.exitCode=1;
}
