# Submission preparation — not a submitted entry

Event: https://glitchathon.devpost.com/
Rules: https://glitchathon.devpost.com/rules
Reviewed October 21, 2026. Team track: Glitch Detective. One team/one project.

The official rules allow AI coding assistants with transparent disclosure and require project code to be created during the hackathon. The overview says hacking begins October 18. The platform's deadline is October 25, 2026 at 16:30 Pakistan time. This project was created October 20 and extended October 21.

**Registration discrepancy:** the overview says registration closes October 16, but the platform accepted Ali Ateeb's registration October 20. The receipt is preserved in the private Scout workspace. It does not guarantee organizer eligibility; do not conceal the discrepancy or register duplicate accounts.

## Description draft

TraceTutor helps students turn a Python or JavaScript error into a learning exercise. A deterministic parser focuses the final exception in a full traceback and reports its source location. A local multinomial Naive Bayes classifier assigns a likely family using 40 synthetic examples across ten families. The interface shows recognized terms, curated investigation steps, before/after examples and checked practice answers. A downloadable worksheet omits the pasted input and private paths. Unsupported exception classes get explicit abstention. All analysis stays in the browser, without an API key or code execution.

The main challenge was keeping a tiny model honest: classification scores are not calibrated correctness probabilities, and an error family is not a verified root cause. We expose the limited training data and test held-out wording and unknown errors. Future work would evaluate a larger consented dataset and improve abstention before expanding supported languages.

AI assistance: Codex produced planning, implementation, synthetic examples, tests and documentation. No hosted LLM is called by the product. No pre-event product code or prior winning project was reused. Actual member contributions should be recorded by each teammate after review.

## Required deliverables

- Working source and README: published at https://github.com/Ali-Ateeb/fourstack-tracetutor .
- Public GitHub repository: publication confirmed October 20, 2026.
- Working demo: https://ali-ateeb.github.io/fourstack-tracetutor/ ; public browser inference verified October 20.
- A real narrated MP4 is complete: `media/demo.mp4`, 81.44 seconds, 1280×720, H.264/AAC. It is an edited walkthrough of actual browser captures with synthetic narration. Captions and transcript are included. Review player: `demo.html`.
- Required public YouTube/Vimeo link <=3 minutes with embedding enabled: still pending. A GitHub-hosted MP4 does not replace this requirement.
- Current screenshots from the tested app: `screenshots/04-traceback-practice.png`, `screenshots/05-javascript-trace.png`, `screenshots/06-unsupported-error.png`. Earlier screenshots remain as historical version captures.
- Built with: JavaScript, HTML, CSS, multinomial Naive Bayes, Codex.
- Ali Ateeb and Ali Zulfikar are registered; Anas and Obaidullah still need their own registrations. All four must be added to the project as applicable. A registration receipt is not project membership.
- Final Devpost project submission: NOT SUBMITTED. Only record a submission after an actual platform receipt.
- Devpost draft creation was attempted October 21 under Ali Ateeb's account after confirming no existing project. Create project opened a CAPTCHA; no project draft was created. The browser page is left for the user to complete it.
- YouTube was checked October 21 and shows Sign in. No upload is claimed.

## Verification recorded October 21

Twenty-one tests passed. Browser checks covered full Python traceback focus, source line 18, incorrect/correct practice feedback, a real worksheet download, JavaScript source line 42, unsupported exceptions and stale-result invalidation after editing. The video decoded in the browser with a duration of 81.44 seconds and played successfully. These are narrow prototype checks, not a general accuracy study.

## Completed walkthrough content

1. Open the app and describe the student learning problem.
2. Focus a full Python traceback and inspect the reported source location.
3. Show a checked practice answer and the worksheet action.
4. Show a JavaScript stack trace with source context.
5. Show explicit abstention on an unsupported exception.
6. Explain synthetic training data, local processing, AI assistance and limits.
