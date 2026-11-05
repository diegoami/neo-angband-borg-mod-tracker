from pathlib import Path
import subprocess, json
p=Path('src/api2/controller.ts')
s=p.read_text()
assert s.count(', afflictions, monsters]')==1
try:
    p.write_text(s.replace(', afflictions, monsters]', ', monsters]'))
    with open('/tmp/neo-borg-controller-before.log','w') as out:
        before=subprocess.run(['pnpm','exec','vitest','run','src/api2/controller.test.ts'],stdout=out,stderr=subprocess.STDOUT).returncode
finally:
    p.write_text(s)
with open('/tmp/neo-borg-controller-restored.log','w') as out:
    restored=subprocess.run(['pnpm','exec','vitest','run','src/api2/controller.test.ts'],stdout=out,stderr=subprocess.STDOUT).returncode
Path('/tmp/neo-borg-controller-control-exits.json').write_text(json.dumps({'without_status_key':before,'restored':restored})+'\n')
assert before==1 and restored==0
