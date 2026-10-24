import assert from 'node:assert/strict';
import {validateGuide} from './schema.mjs';
const guide={slug:'example-guide',title:'Example',category:'Home office',time:'3 min read',summary:'A general guide.',intro:'A general introduction.',sections:Array.from({length:3},(_,i)=>({heading:'Step '+i,text:'Check the documentation before making a decision.'})),checklist:['Measure the space','Read the instructions','Check the warranty'],tradeoff:'Choose features you need.'};
assert.equal(validateGuide(guide),guide);
assert.throws(()=>validateGuide({...guide,slug:'../../index'}));
assert.throws(()=>validateGuide({...guide,products:[{url:'https://example.com'}]}));
assert.throws(()=>validateGuide({...guide,sections:[]}));
assert.throws(()=>validateGuide({...guide,category:'Made up'}));
console.log('Draft validation checks passed: valid content accepted; traversal, product injection and malformed guides rejected.');
