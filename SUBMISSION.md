# Submission preparation — not a submitted entry

Event: https://glitchathon.devpost.com/
Rules: https://glitchathon.devpost.com/rules
Reviewed October 20, 2026. Team track: Glitch Detective. One team/one project.

The official rules allow AI coding assistants with transparent disclosure and require project code to be created during the hackathon. The overview says hacking begins October 18. The platform's deadline is October 25, 2026 at 16:30 Pakistan time. This project was created October 20.

**Registration discrepancy:** the overview says registration closes October 16, but the platform accepted Ali Ateeb's registration October 20. The receipt is preserved in the private Scout workspace. It does not guarantee organizer eligibility; do not conceal the discrepancy or register duplicate accounts.

## Description draft

TraceTutor helps students turn a familiar Python or JavaScript error into a small learning exercise. A local multinomial Naive Bayes text classifier assigns a likely error family from synthetic examples. The interface shows recognized terms, curated investigation steps, a before/after example and a practice question. It abstains when its limited vocabulary cannot support a useful diagnosis. All analysis stays in the browser, without an API key or code execution.

The main challenge was keeping a tiny model honest: classification scores are not calibrated correctness probabilities, and an error family is not a verified root cause. We expose the limited training data and test held-out wording and unknown errors. Future work would evaluate a larger consented dataset and improve abstention before expanding supported languages.

AI assistance: Codex produced planning, implementation, synthetic examples, tests and documentation. No hosted LLM is called by the product. No pre-event product code or prior winning project was reused. Actual member contributions should be recorded by each teammate after review.

## Required deliverables

- Working source and README: implemented locally; public URL recorded separately once publishing succeeds.
- Public GitHub repository: pending verified publication.
- Working demo: local HTTP preview; public demo pending verified deployment.
- Public YouTube/Vimeo demo video <=3 minutes with embedding enabled: pending; a script or screenshots are not a video.
- At least two screenshots: capture from the actual tested app, pending.
- Built with: JavaScript, HTML, CSS, multinomial Naive Bayes, Codex.
- Other three members: each needs their own platform account/registration and team-project joining as applicable.
- Final Devpost project submission: NOT SUBMITTED. Only record a submission after an actual platform receipt.

## Suggested 90-second video walkthrough

1. Open the app and describe the student learning problem.
2. Select Missing name, explain it and show the evidence and example.
3. Reveal the practice explanation.
4. Try the JavaScript undefined example.
5. Paste an unsupported error and show the explicit abstention.
6. Explain synthetic training data, local processing, AI assistance and limits.
