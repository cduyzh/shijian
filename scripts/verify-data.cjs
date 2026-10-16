'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),context={window:{}};vm.createContext(context);
for(const f of ['data.js','nutrition.js','visuals.js','asset-layout.js'])vm.runInContext(fs.readFileSync(path.join(root,'dist',f),'utf8'),context,{filename:f});
const D=context.window.SHIJIAN_DATA,N=context.window.SHIJIAN_NUTRITION,V=context.window.SHIJIAN_VISUALS,L=context.window.SHIJIAN_ASSET_LAYOUT;
assert.equal(D.ingredients.length,82);assert.equal(D.recipes.length,65);assert.equal(D.ingredients.filter(i=>i.category==='fruit').length,18);
const I=new Map(D.ingredients.map(i=>[i.id,i])),R=new Map(D.recipes.map(r=>[r.id,r]));assert.equal(I.size,D.ingredients.length);assert.equal(R.size,D.recipes.length);
for(const i of I.values()){assert(['grain','protein','vegetable','fruit','seasoning'].includes(i.category),i.id);for(const k of ['name','role','benefit','selection','storage','season','updated','nutritionStatus','priceStatus'])assert(i[k],i.id+'/'+k);assert(i.edible>0&&i.edible<=1);assert(i.pricePerKg>=0);for(const k of N.keys)assert(Number.isFinite(i.nutrition[k])&&i.nutrition[k]>=0,i.id+'/'+k);}
for(const r of R.values()){assert.equal(r.servings,2);assert(['main','veg','staple','soup'].includes(r.type));assert(r.ingredients.length&&r.steps.length&&r.benefit&&r.pairing&&r.storage);for(const row of r.ingredients)assert(I.has(row.id)&&Number.isFinite(row.g)&&row.g>0,r.id+'/'+row.id);const n=N.recipe(r.id,2);for(const k of N.keys){const independent=r.ingredients.reduce((s,x)=>s+I.get(x.id).nutrition[k]*x.g/100,0);assert(Math.abs(n.total[k]-independent)<1e-7,r.id+'/'+k);assert(Math.abs(n.total[k]-n.perPerson[k]*2)<1e-7);}}
for(const m of D.recommendedMeals){for(const k of ['main','veg','staple'])assert.equal(R.get(m[k])?.type,k);}
for(const [kind,records,target]of [['ingredients',D.ingredients,.8],['recipes',D.recipes,.85]]){assert.equal(Object.keys(V[kind]).length,records.length);for(const record of records){const id=record.id,v=V[kind][id],l=L[kind][id];assert(v&&l,id+' mapped');assert(fs.existsSync(path.join(root,'dist/assets',v.file)),v.file);assert(v.sourceRect&&v.sourceSize,id+' frame');const [x,y,w,h]=v.sourceRect,[W,H]=v.sourceSize;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=W&&y+h<=H,id+' frame bounds');const [x0,y0,x1,y1]=l.bounds;assert(x0>0&&y0>0&&x1<w&&y1<h,id+' subject complete');const occupation=Math.max(x1-x0,y1-y0)/Math.max(w,h)*l.scale;assert(Math.abs(occupation-target)<.00002,id+' uniform occupation');}}
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8'),app=fs.readFileSync(path.join(root,'dist/app.js'),'utf8');assert(!html.includes('meal-scene')&&!app.includes('SHJ_SCENE'));for(const file of [...html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)].map(m=>m[1]))assert(fs.existsSync(path.join(root,'dist',file)),file+' bootstrap dependency');
// 运行引用和当前清单必须闭合，防止替换图片后遗留旧图或重新引入旧清单。
const assetRoot=path.join(root,'dist/assets'),crypto=require('node:crypto');
const manifestNames=['ingredients-hires-v8-manifest.json','cooked-spread-v9-manifest.json','meal-photo-v5-manifest.json'];
const usedImages=new Set(Object.values(V).flatMap(records=>Object.values(records).map(v=>v.file)));
for(const source of ['index.html','app.js','styles.css']){
  const text=fs.readFileSync(path.join(root,'dist',source),'utf8');
  for(const match of text.matchAll(/assets\/([\w.-]+\.(?:png|jpe?g|svg|webp|avif|gif))/g))usedImages.add(match[1]);
}
const declaredImages=new Set(['favicon.svg']);
for(const name of manifestNames){
  const manifest=JSON.parse(fs.readFileSync(path.join(assetRoot,name),'utf8'));
  for(const kind of ['ingredients','recipes']){
    if(!manifest[kind])continue;
    assert.deepEqual(Object.keys(manifest[kind]).sort(),Object.keys(V[kind]).sort(),name+' ID coverage');
    for(const [id,entry]of Object.entries(manifest[kind])){
      for(const key of ['file','columns','rows','index','sourceSize','sourceRect']){
        assert.equal(JSON.stringify(entry[key]),JSON.stringify(V[kind][id][key]),name+'/'+id+'/'+key);
      }
    }
  }
  const records=manifest.assets||manifest.atlases;
  for(const record of Object.values(records)){
    assert.equal(path.basename(record.file),record.file,name+' asset filename');
    assert(usedImages.has(record.file),record.file+' must be used');
    assert(!declaredImages.has(record.file),record.file+' has one provenance record');
    declaredImages.add(record.file);
    const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(assetRoot,record.file))).digest('hex');
    assert.equal(hash,record.sha256,record.file+' recorded SHA-256');
  }
}
assert.deepEqual([...declaredImages].sort(),[...usedImages].sort(),'runtime references match current provenance');
const inventory=fs.readdirSync(assetRoot,{withFileTypes:true});
assert(inventory.every(entry=>entry.isFile()),'assets contains only current files; keep archives outside dist');
assert.deepEqual(inventory.map(entry=>entry.name).sort(),[...usedImages,...manifestNames].sort(),'no stale images, manifests or generation plans in dist/assets');
console.log(`PASS: 82 ingredients, 65 two-person recipes, 18 fruits, independent nutrient formula, image frames/coverage, 2D bootstrap; ${usedImages.size} used images, current manifests/SHA-256, no stale assets`);
