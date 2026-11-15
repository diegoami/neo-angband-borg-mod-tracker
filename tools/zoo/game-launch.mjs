// Actual Neo frontend launcher: scratch browser session, recorded turn-0 birth.
import { readFileSync,writeFileSync,mkdirSync,existsSync } from 'node:fs';
import { resolve,join,dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const sha=s=>createHash('sha256').update(s).digest('hex');
export async function launchGame({experiment,caseId,bundle,engine,out,prepareOnly=false}) {
 const root=resolve(experiment),buildPath=resolve(bundle),engineRoot=resolve(engine),output=resolve(out);
 const manifest=JSON.parse(readFileSync(join(root,'experiment.json'))),suite=JSON.parse(readFileSync(join(root,'suite.json')));
 if(!/^\d+-\d+$/.test(caseId))throw Error('Invalid case identifier');
 const index=Number(caseId.split('-')[0]),c=suite.cases[index];
 if(!c||String(c.seed)!==caseId.split('-')[1])throw Error('Case differs from frozen assignment');
 const worker=index%Math.min(manifest.workers,suite.cases.length),raw=join(root,'runs',`worker-${worker}`,caseId,'run');
 const original=JSON.parse(readFileSync(join(raw,'run.json'))),build=JSON.parse(readFileSync(join(dirname(buildPath),'build.json')));
 if(sha(readFileSync(buildPath))!==original.provenance.bundleSha256)throw Error('Use the original recorded bundle');
 const git=(...a)=>execFileSync('git',['-C',engineRoot,...a],{encoding:'utf8'}).trim();
 if(git('rev-parse','HEAD')!==build.engine.commit)throw Error('Engine checkout differs from recorded pin');
 for(const [file,hash] of Object.entries(build.contentFiles))if(sha(readFileSync(join(engineRoot,'packages/content/pack',file)))!==hash)throw Error('Engine content differs from retained build');
 mkdirSync(output,{recursive:false});
 let birth;const captured={};
 const runtime=await import(pathToFileURL(buildPath));
 try {
  await runtime.run({...original.inputs,packDir:join(dirname(buildPath),'pack'),manifest:build.borg.manifest.data,
   exactTickCap:build.exactTickCap,cSeedStartup:build.cSeedStartup,
   onState:()=>{},onCommand:()=>{},onMessage:()=>{},onSave:(stage,save)=>{if(stage==='birth'){birth=save;throw captured;}},
   truthIdentity:{id:'borg',version:build.borg.manifest.data.version,digest:build.bundleSha256,installation:'headless:'+build.bundleSha256}});
 } catch(error){if(error!==captured)throw error;}
 if(!birth)throw Error('This retained bundle cannot export its initial birth; use its source to rebuild the recorded host');
 const states=readFileSync(join(raw,'states.jsonl'),'utf8').split('\n').filter(Boolean).map(s=>JSON.parse(s));
 const initial=states.find(s=>s.kind==='alignment'),active=states.find(s=>s.kind==='alignment-active');
 const options=active?.options?.values??{};
 const config={seed:c.seed,birth:original.birth,options,birthRng:initial?.worldRng??null,borgSeed:active?.seededBorgSeed??null,
  seeded:build.cSeedStartup===true,truth:!!original.truthUse?.capabilityUse?.entries?.length,settings:original.settings,engine:build.engine,borg:build.borg};
 writeFileSync(join(output,'birth.save.json'),JSON.stringify(birth));writeFileSync(join(output,'launch.json'),JSON.stringify(config,null,2));
 const borgRoot=resolve(dirname(new URL(import.meta.url).pathname),'../..');
 let plugin=execFileSync('git',['-C',borgRoot,'show',`${build.borg.commit}:plugin.js`],{encoding:'utf8',maxBuffer:8*1024*1024});
 if(config.seeded){const needle='createBorg({ resolvers:';if(plugin.split(needle).length!==2)throw Error('Unsupported Borg startup site');plugin=plugin.replace(needle,'createBorg({ rngSeed: globalThis.__neoReportBorgSeed(), resolvers:');}
 writeFileSync(join(output,'recorded-borg.mjs'),plugin);writeFileSync(join(output,'manifest.json'),JSON.stringify(build.borg.manifest.data));
 if(prepareOnly)return {output,config};
 if(!existsSync(join(engineRoot,'packages/linoleum/dist/targets.js')))execFileSync('pnpm',['--dir',engineRoot,'exec','tsc','-b','packages/linoleum'],{stdio:'inherit'});
 const {createServer}=await import(createRequire(join(engineRoot,'packages/web/package.json')).resolve('vite'));
 const imports=`import __reportDefinition from ${JSON.stringify(join(output,'recorded-borg.mjs'))};\nimport __reportManifest from ${JSON.stringify(join(output,'manifest.json'))};\nimport __reportBirth from ${JSON.stringify(join(output,'birth.save.json'))};\nimport {api2Plugin as __reportShim} from './mod-api2-shim';\nconst __reportConfig=${JSON.stringify(config)};\n`;
 const append=`
// FORK diagnostic launcher only: keep the normal screen, input gate and Borg pump.
const __reportStart = async () => {
  if(!gameScreenLive || birthPending) {setTimeout(__reportStart,50);return;}
  if(state.turn!==0)throw Error('Replay must begin at turn zero');
  for(const [name,value] of Object.entries(__reportConfig.options))state.options.set(name,value);
  if(__reportConfig.birthRng)state.rng.setState(__reportConfig.birthRng);
  globalThis.__neoReportBorgSeed=()=>{const seed=state.rng.randint1(0x10000000);if(__reportConfig.borgSeed!==null&&seed!==__reportConfig.borgSeed)throw Error('Recorded Borg startup RNG mismatch');return seed;};
  const caps={has:(name)=>name==='engine:access'||__reportManifest.capabilities.includes(name)};
  // Reuse the real synchronous save writer and retain the original host contract.
  setTruthSaveWriter(__reportConfig.truth?(id,cap,current)=>{
    if(id!=='borg'||cap!=='state:monsters-actual.read'||current!==state||!caps.has(cap))return false;
    recordTruthUse(game.manifest,state.actor.player,{id:'borg',version:__reportManifest.version,digest:${JSON.stringify(build.bundleSha256)},installation:'report-game'},cap,{turn:state.turn,depth:state.chunk.depth});
    return persistSave(false,true);
  }:undefined);
  const ctx={...modPluginContext('borg',__reportConfig.settings,state,{}, {newCharacter:true,capabilities:caps,snapshotSource:modSnapshotSource}),controllerArmed:true};
  const opts=()=>({grants:caps,tier:'first-party',execution:'in-process',developerInProcess:true,firstParty:{truth:true}});
  const api=createApi2Host(ctx,{...opts(),viewDeps:modSnapshotSource.viewDeps()});
  await __reportDefinition.start?.(api);
  const wrapper=__reportShim(__reportDefinition,opts),answer=wrapper.controller?.(ctx);
  if(!answer)throw Error('Recorded Borg refused to start');
  window.__neoReport={seed:__reportConfig.seed,startTurn:state.turn,started:false,actualBirth:{turn:state.turn,race:state.actor.player.race.name,class:state.actor.player.cls.name,hp:state.actor.player.chp,sp:state.actor.player.csp,gold:state.actor.player.au,stats:[...state.actor.player.statBirth],grid:{...state.actor.grid}},speed:(value)=>installedControllerSpeed?.(value),birth:__reportConfig.birth,hostTruth:__reportConfig.truth};
  panelCues.setEnabled(false);
  for(const id of ['inventory','equipment','messages','monsters'])setSubwindowEnabledLive(id,true);
  render();
  setTimeout(()=>{finishAutoplayerInstall({id:'borg',api:2,manifest:__reportManifest,plugin:wrapper,tier:{trust:'first-party',execution:'in-process'}},controllerInstallOf(answer));window.__neoReport.started=installedController?.id==='borg';},1000);
};
void __reportStart().catch(error=>{console.error(error);document.body.insertAdjacentHTML('beforeend','<pre id="report-launch-error"></pre>');document.querySelector('#report-launch-error').textContent=String(error);});
`;
 let sites=0;
 const server=await createServer({root:join(engineRoot,'packages/web'),configFile:false,define:{__NEO_BUILD_ID__:JSON.stringify('recorded-borg-run'),__NEO_LAB_BUILD__:'false'},
  server:{host:'127.0.0.1',port:0,strictPort:true,fs:{allow:[engineRoot,output]}},plugins:[{name:'recorded-birth-borg-launch',enforce:'pre',transform(code,id){
   if(id.split('?')[0]!==join(engineRoot,'packages/web/src/main.ts'))return;
   const needle='function bootGame(): ReturnType<typeof startGame> {';if(code.split(needle).length!==2)throw Error('Unsupported normal-game boot site');sites++;
   code=code.replace(needle,needle+`\nlookStore.choose('Vanilla');bootedNew=true;setActiveId(newCharId());attachSlot(getActiveId());reloadStorage.setItem(SKIP_TITLE_KEY,'1');reloadStorage.setItem(BIRTH_DONE_KEY,'1');return loadGame(pack,__reportBirth);\n`);
   return imports+code+append;
  }}]});
 await server.listen();const address=server.httpServer.address(),url=`http://127.0.0.1:${address.port}/?new=1&seed=${c.seed}`;
 console.log(`Open the actual Neo game: ${url}\nSeed ${c.seed}; ${c.race} ${c.class}; turn 0. The recorded Borg starts automatically. Escape stops it. Ctrl-C closes this isolated server.\nRetained launch: ${output}`);
 const stop=()=>server.close();process.once('SIGINT',stop);process.once('SIGTERM',stop);return {server,url,output};
}
