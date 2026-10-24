const fields=['slug','title','category','time','summary','intro','sections','checklist','tradeoff'];
export function validateGuide(guide) {
  if(!guide || typeof guide!=='object' || Array.isArray(guide)) throw Error('Guide must be an object');
  if(Object.keys(guide).some(k=>!fields.includes(k))) throw Error('Unexpected guide fields; product links and images must be curated separately');
  for(const field of fields.filter(f=>!['sections','checklist'].includes(f))) {
    if(typeof guide[field]!=='string'||!guide[field].trim()||guide[field].length>6000)throw Error('Invalid '+field);
  }
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(guide.slug)||guide.slug.length>80)throw Error('Invalid slug');
  if(!['Home office','Home & cleaning','Kitchen','Tech essentials','Personal care','Travel'].includes(guide.category))throw Error('Invalid category');
  if(!Array.isArray(guide.sections)||guide.sections.length<3||guide.sections.length>6)throw Error('Use 3–6 sections');
  for(const s of guide.sections)if(!s||Object.keys(s).some(k=>!['heading','text'].includes(k))||typeof s.heading!=='string'||!s.heading.trim()||typeof s.text!=='string'||s.text.length<30||s.text.length>6000)throw Error('Invalid section');
  if(!Array.isArray(guide.checklist)||guide.checklist.length<3||guide.checklist.length>8||guide.checklist.some(x=>typeof x!=='string'||!x.trim()||x.length>1000))throw Error('Invalid checklist');
  return guide;
}
export const outputSchema={type:'object',additionalProperties:false,required:fields,properties:{...Object.fromEntries(fields.filter(f=>!['sections','checklist'].includes(f)).map(f=>[f,{type:'string'}])),sections:{type:'array',minItems:3,maxItems:6,items:{type:'object',additionalProperties:false,required:['heading','text'],properties:{heading:{type:'string'},text:{type:'string'}}}},checklist:{type:'array',minItems:3,maxItems:8,items:{type:'string'}}}};
