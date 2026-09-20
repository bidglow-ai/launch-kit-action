import {appendFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {pathToFileURL} from 'node:url';

export async function prepare(url,fetcher=fetch) {
  const target=new URL(url);
  if(!['https:','http:'].includes(target.protocol)||target.username||target.password||target.search||target.hash||url.length>2048)throw new Error('A public URL without credentials or parameters is required.');
  const response=await fetcher('https://bidglow.ai/api/launch-kit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:target.href}),redirect:'error',signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw new Error(`Launch kit unavailable (HTTP ${response.status}). No publication was attempted.`);
  const data=await response.json();
  if(typeof data.name!=='string'||typeof data.description!=='string'||data.published!==false)throw new Error('Unexpected launch kit response');
  return `${data.name.slice(0,80)}\n\n${data.description.slice(0,220)}\n\n${target.href}`;
}
async function main(){
  try{
    const copy=await prepare(process.env.BIDGLOW_PUBLIC_URL||'');
    if(!process.env.GITHUB_OUTPUT)throw new Error('GitHub output file is required');
    const marker=randomUUID();await appendFile(process.env.GITHUB_OUTPUT,`copy<<${marker}\n${copy}\n${marker}\n`);
    console.log('Launch draft prepared. Review before sharing. No listing or payment created.');
  }catch{console.error('Launch kit could not be prepared. Check your public URL and retry later. No listing or payment created.');process.exitCode=1;}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
