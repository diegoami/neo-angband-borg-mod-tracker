// FORK: audit the extra game workflow without weakening the main full-CI gate.
export function assertHeadlessWorkflow(text){
 const line=text.split('\n').find(s=>s.startsWith('on: '));const events=JSON.parse(line.slice(4));
 if(JSON.stringify(Object.keys(events).sort())!==JSON.stringify(['pull_request','workflow_dispatch']))throw Error('Unexpected headless trigger');
 if(!text.includes('permissions:\n  contents: read')||text.includes('pull_request_target'))throw Error('Untrusted jobs must be read-only');
 const publish=text.slice(text.indexOf('\n  publish:'));
 if(!publish.includes("github.event_name == 'workflow_dispatch'")||!publish.includes("github.ref == format('refs/heads/{0}', github.event.repository.default_branch)")||!publish.includes('permissions: {contents: read, issues: write}'))throw Error('Unsafe report publisher');
 if(text.slice(0,text.indexOf('\n  publish:')).includes('issues: write'))throw Error('Issue writes outside trusted publisher');
 if(!text.includes('max-parallel: 4')||!text.includes("timeout-minutes: ${{ needs.build.outputs.suite == 'death-survey-v1' && 240 || 15 }}")||!text.includes('persist-credentials: false'))throw Error('Missing run/resource controls');
}
