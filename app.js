import {analyze} from './model.js';
const $ = id => document.getElementById(id);
const samples = {name:'NameError: name total is not defined', type:'TypeError: unsupported operand type(s) for +: str and int', undefined:"TypeError: Cannot read properties of undefined (reading 'map')"};
document.querySelectorAll('[data-sample]').forEach(button => button.addEventListener('click', () => { $('error').value = samples[button.dataset.sample]; $('error').focus(); }));
let current;
$('analyze').addEventListener('click', () => {
  $('feedback').textContent = ''; $('result').hidden = true; $('empty').hidden = false;
  try {
    const result = analyze($('error').value);
    if (result.status === 'unknown') { $('feedback').textContent = 'Not sure yet. ' + result.reason; return; }
    current = result.lesson;
    for (const key of ['title','cause','language','before','after','question','answer']) {
      $(key).textContent = current[key === 'question' ? 'exercise' : key];
    }
    $('terms').replaceChildren(...result.evidence.map(token => {const span = document.createElement('span'); span.textContent = token; return span;}));
    $('steps').replaceChildren(...current.steps.map(step => {const li = document.createElement('li'); li.textContent = step; return li;}));
    $('model-note').textContent = `Demo model score: ${Math.round(result.separation * 100)}% class separation, not a probability that this diagnosis is correct. Suggestions are curated learning material.`;
    $('answer').hidden = true; $('reveal').textContent = 'Reveal explanation';
    $('empty').hidden = true; $('result').hidden = false;
    $('feedback').textContent = 'Explanation ready. Check the evidence and try the practice question.';
  } catch (error) { $('feedback').textContent = error.message; }
});
$('reveal').addEventListener('click', () => {
  if (!current) return;
  $('answer').hidden = !$('answer').hidden;
  $('reveal').textContent = $('answer').hidden ? 'Reveal explanation' : 'Hide explanation';
});
