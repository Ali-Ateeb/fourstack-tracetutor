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
   exercise:'Does optional chaining fix a broken API response schema?', answer:'No. It can prevent a crash but can also hide a bug. Validate required data and show an explicit error when the schema is wrong.'},
  {id:'syntax',title:'Python cannot parse this statement',language:'Python',
   examples:['SyntaxError expected colon', 'SyntaxError invalid syntax', 'SyntaxError closing parenthesis does not match opening parenthesis', 'IndentationError expected an indented block after if statement'],
   cause:'The parser cannot turn this source into a valid program. The actual mistake can be just before the reported location.',
   steps:['Read the caret and the preceding line, including unmatched brackets or quotes.', 'Check colons after compound statements and consistent indentation.', 'Fix one syntax error and parse again before investigating runtime behavior.'],
   before:'if ready\nprint("Go")',after:'if ready:\n    print("Go")',exercise:'Why can a parser point at the line after a missing closing parenthesis?',answer:'It keeps reading to complete the earlier expression. The next line is where the mismatch becomes impossible to parse.'},
  {id:'value',title:'A value has the right type but the wrong format',language:'Python',
   examples:['ValueError invalid literal for int with base ten', 'ValueError could not convert string to float', 'ValueError not enough values to unpack expected got', 'ValueError too many values to unpack expected two'],
   cause:'The operation accepts this type of input, but this particular value does not satisfy its format or shape.',
   steps:['Inspect the exact input value, including whitespace and delimiters.', 'Validate the expected format or number of fields before conversion/unpacking.', 'Report invalid input explicitly rather than silently replacing it with a plausible value.'],
   before:'count = int("three")',after:'text = "three"\ntry:\n    count = int(text)\nexcept ValueError:\n    print("Enter a whole number")',exercise:'Should invalid numeric input silently become zero?',answer:'No. Zero is a valid measurement. Reject invalid input or request a correction so missing and valid zero remain distinct.'},
  {id:'division',title:'The denominator is zero',language:'Python',
   examples:['ZeroDivisionError division by zero', 'ZeroDivisionError integer division or modulo by zero', 'ZeroDivisionError float division by zero', 'ZeroDivisionError complex division by zero'],
   cause:'A division or remainder operation reached a zero denominator. The useful fix depends on what an empty or zero-valued input means.',
   steps:['Inspect the denominator at the failing line.', 'Trace how empty input or a count of zero reached this operation.', 'Handle the empty/undefined result explicitly; do not invent a denominator or misleading result.'],
   before:'values = []\naverage = sum(values) / len(values)',after:'values = []\nif values:\n    average = sum(values) / len(values)\nelse:\n    average = None',exercise:'Is replacing a zero denominator with 1 always a valid fix?',answer:'No. It avoids an exception while potentially changing the meaning of the result. Handle the missing/undefined case explicitly.'},
  {id:'reference',title:'JavaScript cannot resolve this binding',language:'JavaScript',
   examples:['ReferenceError student is not defined', 'ReferenceError cannot access total before initialization', 'ReferenceError result is not defined', 'ReferenceError cannot access variable before initialization'],
   cause:'A JavaScript identifier is missing from the accessible scope, or a let/const binding is used before initialization.',
   steps:['Check the exact identifier spelling and its scope.', 'For let/const, move the use after initialization and check circular imports.', 'Check script/module loading order; do not solve a missing import by creating an unrelated global.'],
   before:'console.log(total);\nconst total = 12;',after:'const total = 12;\nconsole.log(total);',exercise:'Does declaring a let variable later make it usable earlier in the same block?',answer:'No. The binding is in its temporal dead zone before initialization. Move the access after initialization.'}
];

export const quizzes = {
  name:{question:'A helper creates score locally. What should its caller do?',choices:['Read score as a global automatically','Return the value and bind it in the caller','Rename the helper'],correct:1},
  type:{question:'input() returned "21". What should precede arithmetic?',choices:['Validate and convert the numeric text','Append another string','Ignore the type'],correct:0},
  index:{question:'A list has five values. Which is its last nonnegative index?',choices:['5','6','4'],correct:2},
  key:{question:'A required dictionary field is missing. What is the useful response?',choices:['Always replace it with zero','Validate and report the missing field','Delete a different field'],correct:1},
  import:{question:'Installation succeeded but the editor cannot import it. Check:',choices:['Whether both use the same interpreter/environment','Your monitor resolution','Whether every file is named app.py'],correct:0},
  undefined:{question:'A required API field is absent. Is optional chaining sufficient?',choices:['Yes, it repairs the server schema','No, validate and show an explicit data error','Only if the property is named items'],correct:1},
  syntax:{question:'A missing closing bracket can be reported:',choices:['Only exactly where it was omitted','Only in the last line of a file','On a later line where parsing fails'],correct:2},
  value:{question:'Invalid numeric text should:',choices:['Silently become zero','Be rejected or corrected explicitly','Always be rounded'],correct:1},
  division:{question:'An average over an empty list should:',choices:['Handle the undefined result explicitly','Divide by 1 regardless of meaning','Invent an extra measurement'],correct:0},
  reference:{question:'A let/const binding can be read:',choices:['Anywhere before initialization','After initialization in its accessible scope','Only outside its block'],correct:1}
};

export function checkAnswer(id, choice) {
  const quiz=quizzes[id];
  if(!quiz || !Number.isInteger(choice) || choice<0 || choice>=quiz.choices.length) throw new Error('Choose one answer first.');
  return {correct:choice===quiz.correct, explanation:quiz.choices[quiz.correct]+'.'};
}

// Trace parsing is deterministic; the probabilistic model classifies the focused error text.
export function focusError(text) {
  const lines=text.split(/\r?\n/);
  const signatures=lines.map((line,index)=>({line:line.trim(),index,match:line.trim().match(/^((?:[\w]+\.)?(?:[A-Za-z]\w*)?(?:Error|Exception))\s*:\s*(.*)$/)})).filter(x=>x.match);
  const last=signatures.at(-1);
  const signature=last?.line ?? text.trim();
  const exception=last?.match[1].split('.').at(-1) ?? null;
  const pythonFrames=[...text.matchAll(/File "([^"\n]+)", line (\d+)(?:, in ([^\n]+))?/g)];
  const jsFrames=[...text.matchAll(/\bat\s+(?:[^\n(]*\()?([^\s()]+):(\d+):(\d+)\)?/g)];
  const frame=pythonFrames.at(-1) ?? jsFrames[0];
  const location=frame ? {file:frame[1].replaceAll('\\','/').split('/').at(-1),line:Number(frame[2])}:null;
  return {signature,exception,location,exceptionCount:signatures.length,focused:!!last};
}

export function worksheet(result) {
  if(result.status!=='matched') throw new Error('A supported diagnosis is needed before export.');
  const l=result.lesson;
  return `# TraceTutor: ${l.title}\n\nLanguage: ${l.language}\n\n## Likely cause\n${l.cause}\n\n## Investigation\n${l.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n## Practice\n${l.exercise}\n\n${l.answer}\n\n## Limits\nA small model trained on synthetic examples, not a verified diagnosis. No pasted code, error text or private paths are included in this worksheet. Built with AI assistance.\n`;
}

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
  const focus=focusError(text);
  const supported=new Set(['NameError','TypeError','IndexError','KeyError','ModuleNotFoundError','ImportError','SyntaxError','IndentationError','ValueError','ZeroDivisionError','ReferenceError']);
  if(focus.exception && !supported.has(focus.exception)) return {status:'unknown',reason:`${focus.exception} is outside the supported families. Consult the relevant library documentation.`,focus};
  const input = tokens(focus.signature);
  // The reported exception class is a stronger feature than a user-chosen key/name.
  if(focus.exception) input.push(...Array(2).fill(focus.exception.toLowerCase()));
  const known = input.filter(t => vocabulary.has(t));
  const unique = [...new Set(known)];
  if (unique.length < 2 && !focus.exception) return {status:'unknown', reason:'Too few familiar error terms. Try the actual error line, with any secrets removed.'};
  const scored = classes.map(({lesson, counts, total}) => ({lesson, counts,
    score: known.reduce((s, token) => s + Math.log(((counts.get(token) ?? 0) + 1) / (total + vocabulary.size)), 0)}))
    .sort((a,b) => b.score - a.score);
  const weights = scored.map(x => Math.exp(x.score - scored[0].score));
  const separation = weights[0] / weights.reduce((a,b) => a+b, 0);
  const winner = scored[0];
  // Reject blended/unfamiliar input and vague messages rather than inventing a fix.
  if (separation < .60 || known.length / Math.max(input.length,1) < .25)
    return {status:'unknown', reason:'This small model cannot separate the error families reliably. Reduce to one error line or consult the language documentation.'};
  return {status:'matched', lesson:winner.lesson, separation,focus,
    evidence:unique.filter(t => (winner.counts.get(t) ?? 0) > 0).slice(0,8)};
}
