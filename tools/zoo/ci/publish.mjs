// FORK: optional durable summary, only invoked on trusted default-branch dispatch.
import { readFileSync } from 'node:fs';
const issue=process.env.REPORT_ISSUE,repo=process.env.GITHUB_REPOSITORY;
if(!/^[1-9][0-9]*$/.test(issue??'')||!/^[-\w]+\/[-\w.]+$/.test(repo??''))throw Error('Invalid report destination');
const md=readFileSync('report/report.md','utf8');
const summary=md.split('\n### Death ')[0];
const url=`https://github.com/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}`;
const body=`${summary}\n\nFull death narratives, raw traces, build and reproduction artifacts: ${url} (90-day artifact retention).\n\nReproduce any table row using tools/zoo/run.mjs, the archived build/bundle.mjs, its seed/race/class, the report profile and cap.\n`;
if(body.length>60000)throw Error('Report summary exceeds issue-comment budget');
const response=await fetch(`https://api.github.com/repos/${repo}/issues/${issue}/comments`,{method:'POST',headers:{Authorization:`Bearer ${process.env.GITHUB_TOKEN}`,'Content-Type':'application/json',Accept:'application/vnd.github+json'},body:JSON.stringify({body})});
if(!response.ok)throw Error(`Report comment failed: ${response.status}`);
