import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../',import.meta.url));
const dist = path.join(root,'dist');
const config = JSON.parse(await readFile(path.join(root,'site.config.json'),'utf8'));
async function walk(dir) { const entries = await readdir(dir,{withFileTypes:true}); return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat(); }
const pages = (await walk(dist)).filter(f=>f.endsWith('.html'));
for (const file of pages) {
  if (path.basename(file) === 'googlee21064feecf10b96.html') {
    assert.equal(await readFile(file,'utf8'), await readFile(path.join(root,'googlee21064feecf10b96.html'),'utf8'), 'Verification file must be unchanged');
    continue;
  }
  const html = await readFile(file,'utf8');
  assert.match(html,/<meta name="description" content="[^"]+">/);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`One h1: ${file}`);
  assert.match(html,/<html lang="en-IN">/);
  assert.match(html, /name="viewport"/);
  if (!config.affiliateEnabled) assert.doesNotMatch(html,/href="https:\/\/(?:www\.)?(?:amazon\.|amzn\.to)/);
  for (const [,href] of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const target = path.join(dist,href.endsWith('/') ? href+'index.html' : href);
    assert.ok((await stat(target)).isFile(),`Broken local link: ${href} in ${file}`);
  }
}
const robots = await readFile(path.join(dist,'robots.txt'),'utf8');
assert.ok(config.url ? robots.includes('Sitemap:') : robots.includes('Disallow: /'));
console.log(`Passed: ${pages.length} pages, local links/assets, headings, metadata and affiliate safety.`);
