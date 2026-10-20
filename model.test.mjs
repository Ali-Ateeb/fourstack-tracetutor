import test from 'node:test';
import assert from 'node:assert/strict';
import {analyze, lessons} from './model.js';

const heldout = [
 ['NameError: name subtotal is not defined', 'name'],
 ['TypeError: unsupported operand type(s) for -: str and int', 'type'],
 ['IndexError: deque index out of range', 'index'],
 ["KeyError: 'email'", 'key'],
 ["ModuleNotFoundError: No module named 'fastapi'", 'import'],
 ["TypeError: Cannot read properties of undefined (reading 'filter')", 'undefined']
];
for (const [input, expected] of heldout) test('held-out error: ' + expected, () => {
  const result=analyze(input); assert.equal(result.status,'matched'); assert.equal(result.lesson.id,expected);
});
test('empty and excessive input is rejected',()=>{
  assert.throws(()=>analyze(' '),/Paste/); assert.throws(()=>analyze('x'.repeat(12001)),/12,000/);
});
test('unfamiliar error abstains',()=>{
  assert.equal(analyze('Segmentation fault SIGSEGV invalid pointer 0x001').status,'unknown');
  assert.equal(analyze('something failed').status,'unknown');
});
test('input is never executed and cannot alter curated explanations',()=>{
  const injected='NameError name total is not defined <script>globalThis.hacked=true</script>';
  assert.equal(analyze(injected).lesson.id,'name'); assert.equal(globalThis.hacked,undefined);
  assert.ok(lessons.every(l=>!l.cause.includes('<script>')));
});
test('practice and explanation exist for every supported error family',()=>{
  for(const l of lessons){assert.equal(l.examples.length,4); assert.equal(l.steps.length,3); assert.ok(l.exercise&&l.answer&&l.before&&l.after);}
});
