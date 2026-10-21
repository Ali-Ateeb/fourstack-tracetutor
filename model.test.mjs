import test from 'node:test';
import assert from 'node:assert/strict';
import {analyze, lessons, focusError,checkAnswer,quizzes,worksheet} from './model.js';

const heldout = [
 ['NameError: name subtotal is not defined', 'name'],
 ['TypeError: unsupported operand type(s) for -: str and int', 'type'],
 ['IndexError: deque index out of range', 'index'],
 ["KeyError: 'email'", 'key'],
 ["ModuleNotFoundError: No module named 'fastapi'", 'import'],
 ["TypeError: Cannot read properties of undefined (reading 'filter')", 'undefined'],
 ["SyntaxError: '(' was never closed",'syntax'],
 ["ValueError: invalid literal for int() with base 10: 'n/a'",'value'],
 ['ZeroDivisionError: float division by zero','division'],
 ["ReferenceError: Cannot access 'summary' before initialization",'reference']
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
test('full Python traceback focuses the final exception and last source frame',()=>{
  const result=analyze('Traceback (most recent call last):\n  File "main.py", line 2, in main\n    run()\n  File "maths.py", line 19, in run\n    average = sum(data) / len(data)\nZeroDivisionError: division by zero');
  assert.equal(result.lesson.id,'division');assert.deepEqual(result.focus.location,{file:'maths.py',line:19});
});
test('JavaScript source location selects the first frame, not a wrapper',()=>{
  const result=analyze("TypeError: Cannot read properties of undefined (reading 'map')\n    at render (https://example.com/app.js:42:7)\n    at wrapper (https://example.com/vendor.js:100:1)");
  assert.equal(result.lesson.id,'undefined'); assert.deepEqual(result.focus.location,{file:'app.js',line:42});
});
test('unsupported explicit exception is never guessed from familiar words',()=>{
  const result=analyze('ConnectionError: name is not defined in remote dictionary');
  assert.equal(result.status,'unknown');assert.match(result.reason,/outside/);
});
test('chained errors use the final exception and explain that focus',()=>{
  const focused=focusError('ValueError: invalid literal\nDuring handling of the above exception:\nKeyError: missing_field');
  assert.equal(focused.exception,'KeyError');assert.equal(focused.exceptionCount,2);
});
test('minimal supported error can identify a new missing key',()=>{
  assert.equal(analyze("KeyError: 'unseen_column_482'").lesson.id,'key');
});
test('practice marks correct and incorrect answers and rejects no selection',()=>{
  for(const lesson of lessons){const q=quizzes[lesson.id];assert.ok(checkAnswer(lesson.id,q.correct).correct);assert.equal(checkAnswer(lesson.id,(q.correct+1)%3).correct,false);}
  assert.throws(()=>checkAnswer('name',null),/Choose/);
});
test('export omits pasted secrets and private source paths',()=>{
  const text='Traceback (most recent call last):\n  File "C:\\private-user\\SECRET_TOKEN.py", line 3\nKeyError: PRIVATE_SECRET_VALUE';
  const result=analyze(text);const output=worksheet(result);
  assert.ok(output.includes('dictionary'));assert.ok(!output.includes('PRIVATE_SECRET_VALUE'));assert.ok(!output.includes('private-user'));assert.ok(!output.includes('SECRET_TOKEN'));
});
