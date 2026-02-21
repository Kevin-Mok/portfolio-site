# ChatGPT Prompt: Rewrite Resume Bullets for HR Clarity

Use this prompt to make resume bullets less jargony, more human, and easier for a general HR recruiter to scan quickly.

## Attach These Files First

Required:
- `/home/kevin/coding/portfolio-site/lib/resume-data.ts`
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`

Optional but helpful:
- `/home/kevin/coding/portfolio-site/docs/resume/README_RESUME.md`
- `/home/kevin/coding/portfolio-site/app/styles/13-resume-latex.css`

## Copy/Paste Prompt

```text
You are editing my resume bullets to improve clarity for non-technical HR recruiters.

I attached:
- lib/resume-data.ts
- docs/resume/RESUME_VARIANT_POSITIONING.md
- (optional) docs/resume/README_RESUME.md
- (optional) app/styles/13-resume-latex.css

Goal:
Rewrite existing bullet points so they sound plain, human, and outcome-focused while staying fully accurate.

Audience:
General HR recruiter with limited technical depth.

Editing scope:
- Required: lib/resume-data.ts
- Optional (only if absolutely needed for one-page fit): app/styles/13-resume-latex.css

Hard constraints:
2) Keep all existing resume variant IDs, labels, file names, and TypeScript structure unchanged.
3) Preserve role targeting from RESUME_VARIANT_POSITIONING.md.
5) Use clear language first; include technical terms only when they add hiring value.
6) Prefer direct action + context + outcome wording.
7) Remove stacked adjectives, and unnecessary jargon.

Style rules:
- Write in plain English with strong verbs.
- Prioritize business/user impact over implementation detail.
- Keep a confident, factual tone.
- Avoid vague filler like "leveraged", "synergized", "cutting-edge", or "world-class".
- Keep consistent punctuation and tense across bullets.

Before/after quality checks for each rewritten bullet:
- Would an HR recruiter understand this in under 8 seconds?
- Does it clearly show what I did and why it mattered?

Acceptance checks to run and report:
- npm run build
- npm run verify:resume-layout
- npm run validate-resume-pdfs

If any check fails:
- explain the failing variant(s),
- update diffs to fix,
- rerun checks until passing.
```

## Notes

- This prompt rewrites language only; it should not change the factual core of each bullet.
- If bullet length grows and causes overflow, reduce wording before changing print layout variables.
