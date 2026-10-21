# TraceTutor: The denominator is zero

Language: Python

## Likely cause
A division or remainder operation reached a zero denominator. The useful fix depends on what an empty or zero-valued input means.

## Investigation
1. Inspect the denominator at the failing line.
2. Trace how empty input or a count of zero reached this operation.
3. Handle the empty/undefined result explicitly; do not invent a denominator or misleading result.

## Practice
Is replacing a zero denominator with 1 always a valid fix?

No. It avoids an exception while potentially changing the meaning of the result. Handle the missing/undefined case explicitly.

## Limits
A small model trained on synthetic examples, not a verified diagnosis. No pasted code, error text or private paths are included in this worksheet. Built with AI assistance.
