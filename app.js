import {analyze,quizzes,checkAnswer,worksheet} from './model.js';
const $ = id => document.getElementById(id);
const samples = {name:'NameError: name total is not defined', type:'TypeError: unsupported operand type(s) for +: str and int', undefined:"TypeError: Cannot read properties of undefined (reading 'map')",trace:'Traceback (most recent call last):\n  File "student_app.py", line 18, in summarize\n    average = sum(values) / len(values)\nZeroDivisionError: division by zero'};
let current, currentResult;
function invalidate(){current=null;currentResult=null;$('result').hidden=true;$('empty').hidden=false;$('feedback').textContent='';}
document.querySelectorAll('[data-sample]').forEach(button => button.addEventListener('click', () => {invalidate();$('error').value = samples[button.dataset.sample]; $('error').focus(); }));
$('error').addEventListener('input',invalidate);
$('analyze').addEventListener('click', () => {
  invalidate();
  try {
    const result = analyze($('error').value);
    if (result.status === 'unknown') { $('feedback').textContent = 'Not sure yet. ' + result.reason; return; }
    current = result.lesson; currentResult=result;
    for (const key of ['title','cause','language','before','after','question','answer']) {
      $(key).textContent = current[key === 'question' ? 'exercise' : key];
    }
    $('terms').replaceChildren(...result.evidence.map(token => {const span = document.createElement('span'); span.textContent = token; return span;}));
    $('steps').replaceChildren(...current.steps.map(step => {const li = document.createElement('li'); li.textContent = step; return li;}));
    $('model-note').textContent = `Demo model score: ${Math.round(result.separation * 100)}% class separation, not a probability that this diagnosis is correct. Suggestions are curated learning material.`;
    $('answer').hidden = true; $('reveal').textContent = 'Reveal explanation';
    $('trace-info').hidden=!result.focus.focused;
    $('signature').textContent=result.focus.signature;
    $('location').textContent=result.focus.location ? `Reported location: ${result.focus.location.file}, line ${result.focus.location.line}. Inspect this context; it is not a verified root cause.` : 'No source location found; start with the failing operation.';
    $('focus-note').textContent=result.focus.exceptionCount>1?'Multiple exception lines found. This explanation focuses on the final exception.':'';
    const quiz=quizzes[current.id]; $('quiz-title').textContent=quiz.question;
    $('quiz-choices').replaceChildren(...quiz.choices.map((choice,index)=>{const label=document.createElement('label');const radio=document.createElement('input');radio.type='radio';radio.name='quiz';radio.value=String(index);label.append(radio,document.createTextNode(choice));return label;}));
    $('quiz-feedback').textContent='';
    $('empty').hidden = true; $('result').hidden = false;
    $('feedback').textContent = 'Explanation ready. Check the evidence and try the practice question.';
  } catch (error) { $('feedback').textContent = error.message; }
});
$('check-answer').addEventListener('click',()=>{
  try{const selected=document.querySelector('input[name="quiz"]:checked');const result=checkAnswer(current.id,selected?Number(selected.value):null);$('quiz-feedback').textContent=(result.correct?'Correct. ':'Try again. ')+result.explanation;}catch(error){$('quiz-feedback').textContent=error.message;}
});
$('download').addEventListener('click',()=>{
  if(!currentResult)return; const url=URL.createObjectURL(new Blob([worksheet(currentResult)],{type:'text/markdown;charset=utf-8'})); const a=document.createElement('a');a.href=url;a.download=`tracetutor-${current.id}.md`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
$('reveal').addEventListener('click', () => {
  if (!current) return;
  $('answer').hidden = !$('answer').hidden;
  $('reveal').textContent = $('answer').hidden ? 'Reveal explanation' : 'Hide explanation';
});
