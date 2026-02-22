# ChatGPT Prompt: Regenerate All Resume Variants From Revised Bullets

Use this prompt when the project README bullet sets are already revised and you want ChatGPT to rebuild every resume variant with the strongest role-fit points.

## Attach These Files

Core resume context:
- `/home/kevin/coding/portfolio-site/docs/archive/UPDATED_README_PATHS.md`
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`
- `/home/kevin/coding/portfolio-site/docs/resume/resume-generation-spec.md`
- `/home/kevin/coding/portfolio-site/lib/resume-data.ts`
- `/home/kevin/coding/portfolio-site/app/styles/13-resume-latex.css`

Source content:
- All project README/MD files listed in `docs/archive/UPDATED_README_PATHS.md`

## Copy/Paste Prompt

```text
You are regenerating all resume variants in portfolio-site from revised README bullets.

Attached files include:
- docs/archive/UPDATED_README_PATHS.md
- docs/resume/RESUME_VARIANT_POSITIONING.md
- docs/resume/resume-generation-spec.md
- lib/resume-data.ts
- app/styles/13-resume-latex.css
- all project README/MD files listed in UPDATED_README_PATHS.md

Goal:
Regenerate every resume variant in lib/resume-data.ts using the revised "Resume-ready points by variant" bullets, selecting the strongest project points for each target role while preserving one-page US Letter output.

Canonical variant IDs (must remain unchanged):
- web-dev
- aws
- python
- aws-web-dev
- aws-python
- web-dev-django
- it-support
- it-support-aws
- sales
- call-centre

Primary source rule:
For each project file, only use evidence from:
1) that file's revised "Resume-ready points by variant" section,
2) existing verified facts already present in lib/resume-data.ts.
Do not invent new claims, metrics, timelines, employers, tools, or outcomes.

Selection policy (strict):
1) For each variant, select only projects that best match the variant positioning.
2) Within each selected project, choose the strongest bullets for that variant from revised source bullets.
3) Prioritize quantified impact, ownership, and technical depth.
4) Keep each variant focused; do not force every project into every variant.
5) Remove weaker or repetitive bullets even if they are recent.
6) Keep language recruiter-friendly, concise, and defensible.

Scoring rubric for bullet selection:
- 40% role relevance to variant positioning
- 30% impact strength (metrics/outcomes)
- 20% ownership/complexity
- 10% clarity/scannability

Edit scope:
- Required: lib/resume-data.ts
- Optional (last resort only): app/styles/13-resume-latex.css print variables
  - --resume-print-scale
  - --resume-print-leading
  - --resume-print-top-offset
- Do not modify other files.

One-page fit workflow (strict order):
1) Select strongest projects/bullets per variant.
2) Reduce project count and bullet count where needed.
3) Only if overflow remains, tune per-variant print variables.

Formatting and data constraints:
- Preserve TypeScript structure and all variant IDs.
- Keep Computer Modern print style, white background, and black text behavior.
- Preserve existing date ranges and factual history unless source evidence requires correction.
- Keep bullets specific and non-generic.

Output requirements:
1) Return unified diffs only.
2) Include diffs only for files you changed.
3) Before diffs, include:
   - variant-by-variant project selection summary,
   - bullet count per project in each variant,
   - any softened or removed claims due to weak proof.

Acceptance checks to run and report:
- npm run build
- npm run verify:resume-layout
- npm run validate-resume-pdfs

Failure handling:
If any check fails, update diffs, rerun checks, and report final passing status.
```

## Validation Checklist

- All 10 canonical variant IDs remain present and unchanged.
- Each variant reflects the strongest revised bullets for its target role.
- No invented or inflated claims beyond source evidence.
- One-page and layout validation checks are run and passing.
- CSS print variable edits are only used when content pruning is insufficient.
