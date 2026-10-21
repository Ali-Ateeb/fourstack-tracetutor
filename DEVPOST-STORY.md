## Track

Glitch Detective — GLITCHATHON. Project: **TraceTutor**. Team: FourStack.

## Inspiration

A copied fix can make an error disappear without teaching the student why it happened. TraceTutor is a focused learning prototype: identify a familiar Python or JavaScript error family, explain what to inspect, and practice the underlying concept.

## What it does

Paste an error line or full traceback. The parser focuses the final exception and reports a source location when available. A local text classifier suggests one of ten supported families, showing recognized terms and an explicitly uncalibrated score. Curated investigation steps and synthetic before/after examples lead into a checked practice question. The learner can download a worksheet that omits pasted input and private paths. Unsupported exception classes receive an explicit “not sure.”

The product does not execute, upload or persist pasted code. It requires no account, API key or paid service. The hosting provider handles ordinary page requests.

## How it was built and how AI was used

The app uses plain JavaScript, HTML and CSS. Its classical multinomial Naive Bayes classifier uses Laplace smoothing, with extra weighting for an explicit exception-class token, and 40 clearly synthetic training examples. Trace parsing and quiz checking are deterministic. Suggestions are curated learning content; no hosted LLM is called by the product.

Codex assisted with planning, implementation, synthetic examples, tests, documentation and demo preparation. The product was created October 20 and extended October 21, 2026, within the published hacking period. No prior winning project or pre-event product code was reused. Team members' personal authorship or learning outcomes are not invented; the team must review the implementation and describe its actual contributions honestly before presentation.

## Challenges and implementation lessons

Adding error families weakened short-message classification, so exception-class token weighting was made explicit. Full traces required separating deterministic exception/source extraction from statistical classification. Unsupported exception classes now abstain even when their messages contain familiar words. Editing the input invalidates old results so the UI cannot show a stale diagnosis.

The central limitation remains: identifying an error family does not establish a program's root cause. A high separation score is not a calibrated correctness probability. This model has not been evaluated on representative real-world student errors.

## What works now

Twenty-one core tests pass. Real browser checks on the public deployment verified a full Python traceback and source line 18, JavaScript stack context, checked practice, worksheet downloads and unsupported-error abstention. The captioned 81-second demo is an edited walkthrough of actual browser captures with synthetic narration and fabricated examples, not a continuous recording.

## What's next

Evaluate on a larger consented error dataset, measure errors and abstention, improve explanations with student feedback, and expand supported families only after evaluation. These are future plans, not implemented features.

## Links

- Working app: https://ali-ateeb.github.io/fourstack-tracetutor/
- Source and run instructions: https://github.com/Ali-Ateeb/fourstack-tracetutor
- Walkthrough/transcript: https://ali-ateeb.github.io/fourstack-tracetutor/demo.html

## Registration timing disclosure

The overview lists an October 16 registration cutoff, while Devpost accepted two members on October 20/21. Platform acceptance does not resolve that organizer-rule discrepancy. This is retained in our submission preparation; no final eligibility guarantee or submission receipt is claimed.
