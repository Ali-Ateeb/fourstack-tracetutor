# TraceTutor

A small student error explainer for GLITCHATHON's **Glitch Detective** track. Focus a Python/JavaScript traceback, see the words the model recognized, learn the likely cause, then try a checked practice question.

[Open the working demo](https://ali-ateeb.github.io/fourstack-tracetutor/). This is a prototype, not a submitted hackathon entry.

[Watch the narrated walkthrough](https://ali-ateeb.github.io/fourstack-tracetutor/demo.html) or download [the MP4](media/demo.mp4). This uses actual browser captures with synthetic narration; it is an edited walkthrough, not a continuous recording.

## Run

No installation, API key, account or paid service is required. Serve this directory with Python 3:

```sh
python -m http.server 8771 --bind 127.0.0.1
```

Open http://127.0.0.1:8771/. ES modules require an HTTP server rather than opening index.html directly.

## Verify

With Node 18 or later: `node --test model.test.mjs`.

Twenty-one tests check ten held-out error lines, unknown-error abstention, input bounds, non-execution and complete learning material. This tiny fixture suite is not evidence of general diagnostic accuracy.

## What actually works

- A multinomial Naive Bayes classifier, with Laplace smoothing and extra weighting for an explicit exception-class token, trained in the browser on 40 synthetic examples across ten error families.
- Full Python/JavaScript trace focus and reported source location; chained exceptions focus on the final exception.
- Curated causes, investigation steps, before/after examples and checked practice answers per family.
- A downloadable learning worksheet that deliberately omits pasted error text, code and paths.
- Recognized-token evidence, a clearly uncalibrated model score, and abstention for ambiguous/unfamiliar inputs.
- All processing stays in the browser; the app neither transmits, stores nor executes pasted text. Hosting providers still process ordinary page requests.
- Responsive layout, keyboard controls and status announcements. User text is never inserted as HTML.

## Limits

This is a classical text-classification teaching prototype, **not an LLM**, a code runner, a debugger or an automated patch generator. It has not been evaluated on a representative real-world dataset. Matching an error family does not establish the root cause of a particular program. Examples are synthetic; suggestions can be inappropriate. Users should remove secrets before pasting and verify everything against their own program and official documentation.

## Provenance and AI disclosure

Created October 20 and extended October 21, 2026, during the published October 18–25 build period, using Codex for planning, code, synthetic examples, tests and documentation. No previous winning project or ReliefBoard code was reused. There is no external training corpus, hosted model, paid API or personal teammate data in this repository. Team members must review and understand the implementation before presenting it; no claim is made that they manually authored these files.

See [SUBMISSION.md](SUBMISSION.md) for the real delivery state and official rules.

MIT licensed.
