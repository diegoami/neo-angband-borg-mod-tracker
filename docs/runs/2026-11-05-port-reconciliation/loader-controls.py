from pathlib import Path
import subprocess, os, json
link=Path('node_modules/@rpgm-tools/neo-angband-content')
hidden=link.with_name('neo-angband-content.negative-control')
assert link.is_symlink() and not hidden.exists()
cmd=['pnpm','exec','vitest','run','src/play.test.ts','src/rest-and-store-verification.test.ts']
base=dict(os.environ)
base.pop('NEO_ANGBAND_REPO',None);base.pop('NEO_ANGBAND_LOCAL_CORE',None)
exits={}
try:
    link.rename(hidden)
    for ci,name in [('1','missing-ci'),('','missing-local')]:
        env=dict(base)
        if ci: env['CI']=ci
        else: env.pop('CI',None)
        with open('/tmp/neo-borg-loader-'+name+'.log','w') as out:
            exits[name]=subprocess.run(cmd,env=env,stdout=out,stderr=subprocess.STDOUT).returncode
finally:
    hidden.rename(link)
with open('/tmp/neo-borg-loader-installed-notespot.log','w') as out:
    env=dict(base,CI='1',NEO_ANGBAND_REPO='/tmp/neo-borg-notespot-runtime',NEO_ANGBAND_LOCAL_CORE='1')
    exits['installed-notespot']=subprocess.run(cmd,env=env,stdout=out,stderr=subprocess.STDOUT).returncode
Path('/tmp/neo-borg-loader-control-exits.json').write_text(json.dumps(exits)+'\n')
assert exits=={'missing-ci':1,'missing-local':0,'installed-notespot':0}
