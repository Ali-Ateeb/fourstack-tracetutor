// Synthetic, deliberately small training set. No scraped code or private data.
export const lessons = [
  {id:'name', title:'A name has not been defined', language:'Python',
   examples:['NameError name total is not defined', 'NameError variable result is not defined', 'NameError name counter is not defined', 'NameError name student is not defined'],
   cause:'Python could not find a binding for the name at the point where you used it.',
   steps:['Compare the spelling and capitalization with its definition.', 'Make sure the assignment runs before this line.', 'Check whether the name exists only inside another function or conditional branch.'],
   before:'print(total)\ntotal = 12', after:'total = 12\nprint(total)',
   exercise:'A function assigns score = 8 locally. Why can print(score) outside the function fail?', answer:'The name belongs to the function scope. Return the value and assign it outside the function before printing.'},
  {id:'type', title:'Two values have incompatible types', language:'Python',
   examples:['TypeError unsupported operand type types str int', 'TypeError can only concatenate str not int to str', 'TypeError unsupported operand float str', 'TypeError unsupported operand types for plus int NoneType'],
   cause:'The operation expects compatible types, but one operand has a different type.',
   steps:['Inspect type(...) for each operand on the failing line.', 'If the value came from input(), remember that it starts as a string.', 'Convert only when that conversion matches the meaning; validate invalid input.'],
   before:'age = "21"\nprint(age + 1)', after:'age = "21"\nprint(int(age) + 1)',
   exercise:'Why does "3" + "4" produce "34" rather than 7?', answer:'Both values are strings, so + concatenates them. Convert validated numeric text before doing arithmetic.'},
  {id:'index', title:'An index is outside the sequence', language:'Python',
   examples:['IndexError list index out of range', 'IndexError tuple index out of range', 'IndexError string index out of range', 'IndexError list assignment index out of range'],
   cause:'An index points beyond the available elements. Python sequences start at index zero.',
   steps:['Check len(sequence) immediately before access.', 'Check for empty input and off-by-one loop bounds.', 'Prefer iterating over values or enumerate(...) when you do not need arbitrary indices.'],
   before:'items = ["a", "b"]\nprint(items[2])', after:'items = ["a", "b"]\nfor item in items:\n    print(item)',
   exercise:'What is the last positive index of a list containing 5 values?', answer:'4. Valid nonnegative indices run from 0 to len(items) - 1.'},
  {id:'key', title:'A dictionary key is missing', language:'Python',
   examples:['KeyError user_id missing dictionary key', 'KeyError email dictionary lookup', 'KeyError name dict lookup', 'KeyError student_id dictionary record'],
   cause:'The requested dictionary key is absent. The key is not the same thing as a list index.',
   steps:['Inspect the actual keys and spelling in the record.', 'Decide whether this field is required or legitimately optional.', 'Use validation for required fields; use .get(...) with a meaningful fallback for optional fields.'],
   before:'user = {"name": "Demo"}\nprint(user["nickname"])', after:'user = {"name": "Demo"}\nprint(user.get("nickname", user["name"]))',
   exercise:'Should a missing required payment amount silently default to zero?', answer:'No. Required fields need explicit validation and an error; a default can hide invalid data.'},
  {id:'import', title:'A Python module is unavailable', language:'Python',
   examples:['ModuleNotFoundError No module named requests', 'ModuleNotFoundError No module named pandas', 'ImportError cannot import name from module', 'ModuleNotFoundError package module missing environment'],
   cause:'The active interpreter cannot resolve the requested module or import name.',
   steps:['Confirm which Python interpreter and virtual environment are running.', 'Check the project requirements and the exact module/import spelling.', 'For a missing package, install its trusted distribution into that same environment; also check for a local file shadowing the module.'],
   before:'python app.py\n# No module named requests', after:'python -m pip install -r requirements.txt\npython app.py',
   exercise:'Why might pip install succeed while your editor still cannot import the package?', answer:'pip and the editor may be using different Python environments. Check their interpreter paths and use python -m pip for the intended interpreter.'},
  {id:'undefined', title:'A JavaScript value is undefined or null', language:'JavaScript',
   examples:['TypeError Cannot read properties of undefined reading map', 'TypeError Cannot read properties of null reading value', 'Cannot read property length of undefined', 'TypeError undefined is not an object evaluating user name'],
   cause:'The code accesses a property on a value that has not arrived or does not exist.',
   steps:['Inspect the value immediately before the property access.', 'Check asynchronous loading, empty results and the exact object shape.', 'Handle loading/missing states explicitly. Optional chaining is useful only when absence is expected.'],
   before:'const result = undefined;\nresult.items.map(renderItem);', after:'const result = undefined;\nconst items = result?.items ?? [];\nitems.map(renderItem);',
   exercise:'Does optional chaining fix a broken API response schema?', answer:'No. It can prevent a crash but can also hide a bug. Validate required data and show an explicit error when the schema is wrong.'}
];

export function tokens(text) { return String(text).toLowerCase().match(/[a-z_][a-z_0-9]*/g) ?? []; }
const vocabulary = new Set(lessons.flatMap(l => l.examples.flatMap(tokens)));
const classes = lessons.map(lesson => {
  const counts = new Map(); let total = 0;
  for (const sample of lesson.examples) for (const token of tokens(sample)) { counts.set(token, (counts.get(token) ?? 0) + 1); total++; }
  return {lesson, counts, total};
});

export function analyze(text) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('Paste an error message first.');
  if (text.length > 12000) throw new Error('Keep the example under 12,000 characters.');
  const input = tokens(text);
  const known = input.filter(t => vocabulary.has(t));
  const unique = [...new Set(known)];
  if (unique.length < 2) return {status:'unknown', reason:'Too few familiar error terms. Try the actual error line, with any secrets removed.'};
  const scored = classes.map(({lesson, counts, total}) => ({lesson, counts,
    score: known.reduce((s, token) => s + Math.log(((counts.get(token) ?? 0) + 1) / (total + vocabulary.size)), 0)}))
    .sort((a,b) => b.score - a.score);
  const weights = scored.map(x => Math.exp(x.score - scored[0].score));
  const separation = weights[0] / weights.reduce((a,b) => a+b, 0);
  const winner = scored[0];
  // Reject blended/unfamiliar input and vague messages rather than inventing a fix.
  if (separation < .60 || known.length / Math.max(input.length,1) < .25)
    return {status:'unknown', reason:'This small model cannot separate the error families reliably. Reduce to one error line or consult the language documentation.'};
  return {status:'matched', lesson:winner.lesson, separation,
    evidence:unique.filter(t => (winner.counts.get(t) ?? 0) > 0).slice(0,8)};
}
