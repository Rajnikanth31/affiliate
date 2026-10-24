import {readFile,writeFile,realpath} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {validateGuide} from './service/schema.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const args=process.argv.slice(2);
if(!args[0]||!args.includes('--reviewed'))throw Error('Review the draft first, then use: node automation/review-publish.mjs automation/runtime/drafts/FILE.json --reviewed [--push]');
const draftPath=await realpath(path.resolve(root,args[0]));
const allowed=await realpath(path.join(root,'automation/runtime/drafts'));
if(!draftPath.startsWith(allowed+path.sep))throw Error('Select a JSON file inside automation/runtime/drafts');
const draft=JSON.parse(await readFile(draftPath,'utf8'));
if(draft.status!=='needs_review')throw Error('Draft is not awaiting review');
const guide=validateGuide(draft.guide);
const source=path.join(root,'content/guides.json');
const before=await readFile(source,'utf8');
const guides=JSON.parse(before);
if(guides.some(g=>g.slug===guide.slug))throw Error('Slug exists; existing guides will never be overwritten');
const run=(file,args)=>execFileSync(file,args,{cwd:root,stdio:'inherit'});
if(args.includes('--push')){
  const status=execFileSync('git',['status','--porcelain','--','content/guides.json'],{cwd:root,encoding:'utf8'});
  if(status.trim())throw Error('Commit or review existing content changes before publishing a draft');
}
guides.push(guide);
await writeFile(source,JSON.stringify(guides,null,2)+'\n');
try{run(process.execPath,['scripts/build.mjs']);run(process.execPath,['scripts/check.mjs']);}
catch(error){await writeFile(source,before);run(process.execPath,['scripts/build.mjs']);throw error;}
if(args.includes('--push')){
  // Commit only the reviewed content file; avoid accidentally committing other staged files.
  run('git',['add','--','content/guides.json']);
  run('git',['commit','--only','-m','Publish reviewed guide: '+guide.title,'--','content/guides.json']);
  run('git',['push','origin','main']);
}
draft.status=args.includes('--push')?'published_to_git':'merged_locally';
draft.reviewedAt=new Date().toISOString();
await writeFile(draftPath,JSON.stringify(draft,null,2));
console.log(args.includes('--push')?'Pushed reviewed guide; check Cloudflare deployment.':'Merged locally. Review the local preview; no remote push was performed.');
